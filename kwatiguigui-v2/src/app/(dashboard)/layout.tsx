import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/layout/sidebar";

// All dashboard pages require auth — never prerender any of them.
// This cascades to every child page under (dashboard)/dashboard/*.
export const dynamic = "force-dynamic";

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

  // Fetch profile — need user_type (sidebar) + city (onboarding guard)
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type, city")
    .eq("id", user.id)
    .single();

  // Guard : si le profil n'existe pas ou est incomplet (utilisateur OAuth ayant
  // abandonné le onboarding), on redirige vers /onboarding pour complétion.
  // Critère = la ville (le poste recherché a été supprimé) — DOIT rester
  // identique à celui de la page /onboarding pour éviter toute boucle de redirection.
  if (!profile || !profile.city?.trim()) {
    redirect("/onboarding");
  }

  const userType = (profile?.user_type as "seeker" | "employer" | "company") || null;

  return (
    // h-screen + overflow-hidden: the viewport IS the only scroll container.
    // flex-1 min-h-0 on the row: lets flex children shrink below content size,
    //   which is required for overflow-y-auto to work inside a flex layout.
    // overflow-y-auto on main: main content scrolls independently.
    // The sidebar has its own overflow-y-auto — it scrolls independently too.
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <DashboardSidebar userType={userType} />
        <main className="flex-1 min-h-0 overflow-y-auto bg-white p-4 sm:p-6 lg:p-8 dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
