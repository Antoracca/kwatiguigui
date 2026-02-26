"use client";

import {
  Briefcase,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const DASHBOARD_NAV = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/profile", label: "Mon profil", icon: User, exact: false },
  { href: "/dashboard/jobs", label: "Mes annonces", icon: Briefcase, exact: false },
  { href: "/dashboard/messages", label: "Messagerie", icon: MessageSquare, exact: false },
  { href: "/dashboard/payment", label: "Abonnement", icon: CreditCard, exact: false },
  { href: "/dashboard/settings", label: "Parametres", icon: Settings, exact: false },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-neutral-900">
      <nav className="flex flex-col gap-1 p-4">
        {DASHBOARD_NAV.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-body-sm font-medium transition-all",
                isActive
                  ? "bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-950 dark:text-primary-400"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Utilisateurs", icon: User, exact: false },
  { href: "/admin/jobs", label: "Annonces", icon: Briefcase, exact: false },
  { href: "/admin/payments", label: "Paiements", icon: CreditCard, exact: false },
  { href: "/admin/content", label: "Contenu", icon: MessageSquare, exact: false },
  { href: "/admin/job-types", label: "Types d'emploi", icon: Briefcase, exact: false },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, exact: false },
  { href: "/admin/settings", label: "Parametres", icon: Settings, exact: false },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 p-4 dark:border-neutral-800">
        <p className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Administration
        </p>
        <p className="text-body-xs text-neutral-500">KWATIGUIGUI</p>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {ADMIN_NAV.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-body-sm font-medium transition-all",
                isActive
                  ? "bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-950 dark:text-primary-400"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
