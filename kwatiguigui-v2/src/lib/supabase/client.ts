import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/database";

/**
 * Supabase client for browser/client-side usage.
 * Uses the ANON key (public) with the typed Database schema.
 *
 * IMPORTANT: This client has LIMITED permissions.
 * All sensitive operations MUST go through API Routes or Server Actions.
 * The anon key is public — RLS policies enforce access control.
 *
 * Auth state is managed by Supabase Auth (not NextAuth).
 * Sessions are stored in cookies, refreshed by middleware on every request.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
