import type { Metadata } from "next";
import { EmployerDashboard } from "@/components/dashboard/employer/employer-dashboard";
import { SeekerDashboard } from "@/components/dashboard/seeker/seeker-dashboard";
import { createClient } from "@/lib/supabase/server";
import { PRICING } from "@/lib/constants";
import type { Database } from "@/types/database";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Auth guard (defensive, middleware already handles this)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch profile
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  const profile = data as Database["public"]["Tables"]["profiles"]["Row"] | null;

  // Fetch user jobs
  const { data: userJobsData } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);
  const userJobs = userJobsData as Database["public"]["Tables"]["jobs"]["Row"][] | null;

  // Fetch unread messages count
  const { count: unreadCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("to_user_id", user.id)
    .eq("is_read", false);

  // Fetch recent messages
  const { data: recentMessagesData } = await supabase
    .from("messages")
    .select("*")
    .eq("to_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);
  const recentMessages = recentMessagesData as Database["public"]["Tables"]["messages"]["Row"][] | null;

  // Fetch active jobs count
  const { count: activeJobsCount } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_active", true)
    .eq("publication_status", "published");

  const firstName = profile?.first_name ?? "Utilisateur";
  const isPremium =
    (profile?.subscription_paid ?? false) &&
    profile?.expiry_date != null &&
    new Date(profile.expiry_date) > new Date();
  const freeJobsUsed = Math.min(activeJobsCount ?? 0, PRICING.FREE_JOB_LIMIT);
  const freeJobsProgress = Math.round((freeJobsUsed / PRICING.FREE_JOB_LIMIT) * 100);

  // Format jobs for JobCard
  const formattedJobs = (userJobs ?? []).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    age: row.age,
    whatsapp: isPremium ? row.whatsapp : null,
    city: row.city,
    neighborhood: row.neighborhood ?? null,
    jobType: row.job_type,
    experience: row.experience ?? null,
    userType: row.user_type as "seeker" | "employer",
    isActive: row.is_active,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  }));

  // Today in French
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  // Filter to ensure correct types
  const parsedUserType = profile?.user_type as "seeker" | "employer" | "company" | null;

  return (
    <>
      {parsedUserType === "seeker" ? (
        <SeekerDashboard
          profile={profile}
          isPremium={isPremium}
        />
      ) : (
        <EmployerDashboard
          profile={profile}
          isPremium={isPremium}
          activeJobsCount={activeJobsCount ?? 0}
          unreadCount={unreadCount ?? 0}
          userJobs={formattedJobs as any[]}
          recentMessages={recentMessages ?? []}
        />
      )}
    </>
  );
}
