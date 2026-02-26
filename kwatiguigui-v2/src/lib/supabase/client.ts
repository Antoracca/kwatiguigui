import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for browser/client-side usage.
 * Uses the ANON key (public).
 *
 * IMPORTANT: This client has LIMITED permissions.
 * All sensitive operations MUST go through API Routes.
 * The anon key is public — RLS policies enforce access control.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
