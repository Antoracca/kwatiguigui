import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { SettingsClient } from "@/components/dashboard/settings-client";

export const metadata: Metadata = {
  title: "Paramètres — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Detect Google OAuth users (no "email" identity = can't change password here)
  const providers = user?.identities?.map((i) => i.provider) ?? [];
  const isGoogleUser =
    providers.includes("google") && !providers.includes("email");

  return <SettingsClient isGoogleUser={isGoogleUser} />;
}
