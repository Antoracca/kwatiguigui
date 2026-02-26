import { createClient } from "@supabase/supabase-js";

/**
 * Supabase ADMIN client — SERVICE ROLE KEY.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! DANGER: This client BYPASSES all RLS policies.              !!
 * !! NEVER import this file from client-side code.               !!
 * !! NEVER expose the service role key to the browser.           !!
 * !! ONLY use in: API Route Handlers, Server Actions, scripts.   !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. " +
        "This key is required for admin operations. " +
        "Set it in .env.local (NEVER prefix with NEXT_PUBLIC_).",
    );
  }
  return key;
}

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }
  return url;
}

/**
 * Create a Supabase admin client that bypasses RLS.
 * Each call creates a fresh client to avoid state leaks.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "createAdminClient() was called from client-side code. " +
        "This is a critical security violation. " +
        "The service role key must NEVER be exposed to the browser.",
    );
  }

  return createClient(getSupabaseUrl(), getServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
