import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database";

/**
 * updateSession — refreshes the Supabase Auth session on every request.
 *
 * This MUST be called from middleware.ts on every route so that:
 * 1. The session JWT is refreshed before it expires (Supabase uses short-lived JWTs).
 * 2. The auth.uid() in RLS policies always resolves to the current user.
 * 3. The updated session cookies are forwarded to both the request and response.
 *
 * Returns:
 * - supabaseResponse: the NextResponse with refreshed session cookies set.
 * - user: the authenticated Supabase user (null if not logged in).
 *
 * Usage in middleware.ts:
 *   const { supabaseResponse, user } = await updateSession(request);
 *   // Use `user` to protect routes, then return `supabaseResponse`.
 */
export async function updateSession(request: NextRequest) {
  // Start with a passthrough response — we will mutate its cookies below.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request (so Server Components see them immediately).
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Create a fresh response with the updated request cookies.
          supabaseResponse = NextResponse.next({ request });
          // Set cookies on the response (so the browser receives them).
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() is used (not getSession()) because getUser() validates
  // the JWT with the Supabase Auth server, preventing spoofed session cookies.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
