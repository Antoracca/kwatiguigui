import { redirect } from "next/navigation";

import { verifyAdminSession } from "@/lib/auth/admin-actions";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

/**
 * Admin layout — server-side JWT guard.
 * Verifies the kwt-admin-session httpOnly cookie on every request.
 * If absent or expired → redirect to /admin/login.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient adminEmail={session.email} adminRole={session.role}>
      {children}
    </AdminLayoutClient>
  );
}
