import { AdminSidebar } from "@/components/layout/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-neutral-50 p-4 sm:p-6 lg:p-8 dark:bg-neutral-950">
        {children}
      </main>
    </div>
  );
}
