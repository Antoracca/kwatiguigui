import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { PRICING } from "@/lib/constants";
import { MyJobsClient } from "@/components/dashboard/my-jobs-client";

export const metadata: Metadata = {
  title: "Mes annonces — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

export default async function MyJobsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Fetch profile for subscription status
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_paid, expiry_date")
    .eq("id", user.id)
    .single();

  // Fetch user jobs
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, job_type, city, publication_status, is_active, created_at, expires_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const userProfile = profile as any;
  const isPremium =
    (userProfile?.subscription_paid ?? false) &&
    !!userProfile?.expiry_date &&
    new Date(userProfile.expiry_date) > new Date();

  const activeJobs = ((jobs as any[]) ?? []).filter((j) => j.is_active);
  const freeJobsUsed = isPremium
    ? 0
    : Math.min(activeJobs.length, PRICING.FREE_JOB_LIMIT);

  return (
    <div className="max-w-3xl">
      <MyJobsClient
        jobs={(jobs as any[]) ?? []}
        isPremium={isPremium}
        freeJobsUsed={freeJobsUsed}
        freeJobLimit={PRICING.FREE_JOB_LIMIT}
      />
    </div>
  );
}
