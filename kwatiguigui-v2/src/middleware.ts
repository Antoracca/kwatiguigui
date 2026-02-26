import { type NextRequest, NextResponse } from "next/server";

// -------------------------------------------------------------------
// Route classification
// -------------------------------------------------------------------
const PUBLIC_ROUTES = [
  "/",
  "/jobs",
  "/about",
  "/info",
  "/terms",
  "/help",
  "/blog",
  "/login",
  "/register",
  "/forgot-password",
];

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const DASHBOARD_PREFIX = "/dashboard";
const ADMIN_PREFIX = "/admin";
const API_PREFIX = "/api";

// -------------------------------------------------------------------
// Simple in-memory rate limiter (per IP, per window)
// In production, replace with Redis-backed solution
// -------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 100; // requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// -------------------------------------------------------------------
// Middleware
// -------------------------------------------------------------------
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

  // 2. Auth check for protected routes
  // NextAuth session token is in cookies
  const sessionToken =
    request.cookies.get("__Secure-next-auth.session-token")?.value ??
    request.cookies.get("next-auth.session-token")?.value;

  const isAuthenticated = !!sessionToken;

  // 3. Redirect authenticated users away from auth pages
  if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. Protect dashboard routes
  if (pathname.startsWith(DASHBOARD_PREFIX) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Protect admin routes
  if (pathname.startsWith(ADMIN_PREFIX)) {
    // Admin auth uses a separate cookie (not NextAuth)
    const adminToken = request.cookies.get("kwt-admin-session")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 6. Add security headers to all responses
  const response = NextResponse.next();

  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public assets in /images, /fonts, /favicon
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|fonts|favicon).*)",
  ],
};
