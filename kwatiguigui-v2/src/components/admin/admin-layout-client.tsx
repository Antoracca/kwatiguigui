"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  FileText,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
} from "lucide-react";

import { adminLogout } from "@/lib/auth/admin-actions";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminEmail: string;
  adminRole: "superadmin" | "moderator";
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/jobs", label: "Annonces", icon: Briefcase },
  { href: "/admin/payments", label: "Paiements", icon: CreditCard },
  { href: "/admin/content", label: "Contenu", icon: FileText },
  { href: "/admin/job-types", label: "Types d'emploi", icon: Tag },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Parametres", icon: Settings },
] as const;

export function AdminLayoutClient({
  children,
  adminEmail,
  adminRole,
}: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function isActive(item: (typeof NAV_ITEMS)[number]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    await adminLogout();
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-neutral-800 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 font-heading text-sm font-bold text-white">
          K
        </div>
        <div>
          <p className="font-heading text-sm font-bold text-white">
            KWATIGUIGUI
          </p>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500">
            Administration
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={[
                    "flex min-h-[44px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary-600 text-white"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin profile + logout */}
      <div className="border-t border-neutral-800 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-neutral-800 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
            {adminEmail.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-neutral-200">
              {adminEmail}
            </p>
            <div className="mt-0.5 flex items-center gap-1">
              <Shield className="h-2.5 w-2.5 text-accent-400" />
              <span className="text-[10px] uppercase tracking-wide text-accent-400">
                {adminRole === "superadmin" ? "Super Admin" : "Moderateur"}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex min-h-[40px] w-full items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Deconnexion..." : "Se deconnecter"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-neutral-900 shadow-xl lg:flex">
        <NavContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-neutral-900 shadow-xl transition-transform duration-300 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <NavContent />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 lg:hidden"
              aria-label="Menu"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="font-heading text-sm font-semibold text-neutral-500 dark:text-neutral-400 lg:hidden">
              KWATIGUIGUI Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              ADMIN
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
