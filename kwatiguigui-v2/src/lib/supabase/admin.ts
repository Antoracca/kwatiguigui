import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

// ---------------------------------------------------------------------------
// MODULE-LEVEL GUARD — prevents accidental client-side import
// ---------------------------------------------------------------------------
// This check runs at module load time (not at call time), so a mis-import
// will fail loudly during SSR/build rather than silently in production.
if (typeof window !== "undefined") {
  throw new Error(
    "[kwatiguigui] src/lib/supabase/admin.ts a ete importe cote client. " +
      "Ce module expose la SERVICE_ROLE_KEY qui bypass toutes les RLS. " +
      "N'importer ce fichier QUE depuis: API Route Handlers, Server Actions, scripts.",
  );
}

// ---------------------------------------------------------------------------
// Supabase ADMIN client — SERVICE ROLE KEY (bypasses ALL RLS policies)
// ---------------------------------------------------------------------------
// Exported as a singleton to avoid creating multiple clients.
// The service role key is NEVER exposed to the browser (no NEXT_PUBLIC_ prefix).
// ---------------------------------------------------------------------------
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
