export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "@/components/auth/onboarding-form";

export const metadata = {
  title: "Finaliser votre profil — KWATIGUIGUI",
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
    .select("first_name, last_name, city, job_type")
    .eq("id", user.id)
    .maybeSingle();

  // If city and job_type are already set → onboarding already done
  if (profile?.city?.trim() && profile?.job_type?.trim()) {
    redirect("/dashboard");
  }

  return (
    <OnboardingForm
      firstName={profile?.first_name ?? ""}
      lastName={profile?.last_name ?? ""}
      email={user.email ?? ""}
    />
  );
}
