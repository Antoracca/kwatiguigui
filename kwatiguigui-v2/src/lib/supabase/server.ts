import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/database";

/**
 * Supabase client for server-side usage (Server Components, Route Handlers, Server Actions).
 * Uses the ANON key with cookie-based auth (user session from Supabase Auth).
 *
 * This client RESPECTS RLS policies and acts as the authenticated user.
 * The RLS policies use auth.uid() which resolves from the Supabase Auth JWT
 * stored in cookies and refreshed by the middleware on every request.
 *
 * For admin operations that bypass RLS, use supabaseAdmin from ./admin.ts.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from a Server Component — safe to ignore.
            // The middleware handles session refreshes.
          }
        },
      },
    },
  );
}
