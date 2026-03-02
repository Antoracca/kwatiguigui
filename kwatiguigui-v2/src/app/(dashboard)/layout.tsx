import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/layout/sidebar";

/**
 * Dashboard layout — server-side auth guard.
 *
 * Uses supabase.auth.getUser() (NOT getSession()) because getUser() validates
 * the JWT with the Supabase Auth server, preventing spoofed cookies from
 * gaining unauthorized access to the dashboard.
 *
 * The middleware already handles most auth redirects, but this layout
 * provides a server-side double-check for defense in depth.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated or session invalid
  if (error || !user) {
    redirect("/login");
  }

  // Fetch profile — need user_type (sidebar) + city/job_type (onboarding guard)
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type, city, job_type")
    .eq("id", user.id)
    .single();

  // Guard : si le profil n'existe pas ou est incomplet (utilisateur OAuth ayant
  // abandonné le onboarding), on redirige vers /onboarding pour complétion.
  // NE s'applique PAS aux profils complets — city + job_type remplis = onboarding terminé.
  if (!profile || !profile.city?.trim() || !profile.job_type?.trim()) {
    redirect("/onboarding");
  }

  const userType = (profile?.user_type as "seeker" | "employer" | "company") || null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar userType={userType} />
        <main className="flex-1 bg-white p-4 sm:p-6 lg:p-8 dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
