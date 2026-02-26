import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
