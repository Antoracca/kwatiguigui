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

  // Validate session with Supabase Auth servers (not just cookie parsing)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated or session invalid
  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 bg-neutral-50 p-4 sm:p-6 lg:p-8 dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
