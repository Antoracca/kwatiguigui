export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "@/components/auth/onboarding-form";

export const metadata = {
  title: "Finaliser votre profil — KUSSALA",
  robots: { index: false },
};

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Should not happen — proxy.ts already protects this route
  if (authError || !user) redirect("/login");

  // Fetch profile to check completion & pre-fill name
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, city")
    .eq("id", user.id)
    .maybeSingle();

  // Onboarding terminé dès que la ville est renseignée (poste recherché supprimé)
  if (profile?.city?.trim()) {
    redirect("/dashboard");
  }

  // Photo de profil Google récupérée depuis les métadonnées OAuth
  const meta = user.user_metadata ?? {};
  const avatarUrl =
    (meta.avatar_url as string | undefined) ??
    (meta.picture as string | undefined) ??
    "";

  return (
    <OnboardingForm
      firstName={profile?.first_name ?? ""}
      lastName={profile?.last_name ?? ""}
      email={user.email ?? ""}
      avatarUrl={avatarUrl}
    />
  );
}
