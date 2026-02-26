import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

// ---------------------------------------------------------------------------
// Route classification
// ---------------------------------------------------------------------------
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const DASHBOARD_PREFIX = "/dashboard";
const ADMIN_PREFIX = "/admin";
const API_PREFIX = "/api";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (per IP, per window)
// Replace with Redis/Upstash in production for multi-instance deployments.
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 100; // requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Rate limiting on API routes
  if (pathname.startsWith(API_PREFIX)) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de requetes. Veuillez reessayer dans une minute." },
        { status: 429 },
      );
    }
  }

  // 2. Refresh Supabase Auth session (MUST happen before any auth checks).
  //    updateSession() validates the JWT with Supabase Auth servers and
  //    sets refreshed session cookies on the response.
  const { supabaseResponse, user } = await updateSession(request);
  const isAuthenticated = !!user;

  // 3. Protect admin routes (separate auth: custom JWT in kwt-admin-session cookie).
  //    Admin check happens BEFORE dashboard check.
  if (pathname.startsWith(ADMIN_PREFIX)) {
    // /admin/login is always public
    if (pathname === "/admin/login") {
      return supabaseResponse;
    }

    const adminToken = request.cookies.get("kwt-admin-session")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return supabaseResponse;
  }

  // 4. Redirect authenticated users away from auth pages → dashboard
  if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5. Protect dashboard routes — redirect to login if not authenticated
  if (pathname.startsWith(DASHBOARD_PREFIX) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 6. Add security headers to all responses
  // IMPORTANT: We mutate `supabaseResponse` (not a new NextResponse) so
  // the refreshed session cookies set by updateSession() are not lost.
  supabaseResponse.headers.set("X-Frame-Options", "DENY");
  supabaseResponse.headers.set("X-Content-Type-Options", "nosniff");
  supabaseResponse.headers.set("X-XSS-Protection", "1; mode=block");
  supabaseResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public assets: /images, /fonts, /favicon
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|fonts|favicon).*)",
  ],
};
