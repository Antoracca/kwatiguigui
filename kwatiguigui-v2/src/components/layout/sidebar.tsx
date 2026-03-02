"use client";

import {
  Briefcase,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  User,
  GraduationCap,
  FileText,
  BellRing,
  Sparkles,
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Building2
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";

const CandidatureIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <Image src="/images/candidature.png" alt="Candidatures" width={size} height={size} className={className} />
);

const OffresIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <Image src="/images/offres.png" alt="Offres" width={size} height={size} className={className} />
);

// ---------------------------------------------------------------------------
// Employeur / Entreprise Menu
// ---------------------------------------------------------------------------
const EMPLOYER_NAV = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/profile", label: "Mon profil recruteur", icon: User, exact: false },
  { href: "/dashboard/jobs", label: "Gérer mes annonces", icon: Briefcase, exact: false },
  { href: "/dashboard/candidates", label: "Candidathèque (CV)", icon: Users, exact: false },
  { href: "/dashboard/interviews", label: "Entretiens", icon: Calendar, exact: false },
  { href: "/dashboard/messages", label: "Messagerie", icon: MessageSquare, exact: false },
  { href: "/dashboard/analytics", label: "Statistiques", icon: BarChart3, exact: false },
  { href: "/dashboard/company", label: "Page Entreprise", icon: Building2, exact: false },
  { href: "/dashboard/payment", label: "Abonnements", icon: CreditCard, exact: false },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings, exact: false },
] as const;

// ---------------------------------------------------------------------------
// Chercheur d'emploi (Seeker) Menu
// ---------------------------------------------------------------------------
const SEEKER_NAV = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/profile", label: "Mon CV & Profil", icon: User, exact: false },
  { href: "/dashboard/applications", label: "Mes candidatures", icon: CandidatureIcon, exact: false },
  { href: "/dashboard/cv-builder", label: "Créateur de CV", icon: FileText, exact: false },
  { href: "/dashboard/recommendations", label: "Offres & Recommandations", icon: OffresIcon, exact: false },
  { href: "/dashboard/alerts", label: "Alertes emploi", icon: BellRing, exact: false },
  { href: "/dashboard/student", label: "Stages & Alternance", icon: GraduationCap, exact: false },
  { href: "/dashboard/advice", label: "Conseils Carrière", icon: BookOpen, exact: false },
  { href: "/dashboard/messages", label: "Messagerie", icon: MessageSquare, exact: false },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings, exact: false },
] as const;

export function DashboardSidebar({ userType }: { userType: "seeker" | "employer" | "company" | null }) {
  const pathname = usePathname();
  const navItems = userType === "seeker" ? SEEKER_NAV : EMPLOYER_NAV;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-neutral-900">
      <nav className="flex flex-col gap-1 p-4 h-full">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-body-sm font-medium transition-all",
                isActive
                  ? "bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-950 dark:text-primary-400 font-bold"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
              )}
            >
              <item.icon size={18} className={isActive ? "text-primary-600 dark:text-primary-400" : "text-neutral-400"} />
              {item.label}
            </Link>
          );
        })}

        {/* Upsell Banner (Free Trial 3 Months) for Seekers */}
        {userType === "seeker" && (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-4 border border-primary-200 shadow-sm dark:from-primary-950/40 dark:to-neutral-900 dark:border-primary-900/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <p className="font-heading font-bold text-primary-800 dark:text-primary-300 text-body-sm">
                Accélerez votre carrière !
              </p>
            </div>
            <p className="text-xs text-primary-700 dark:text-primary-400 mb-3 leading-relaxed">
              Le Pack Standard ou VIP vous rend 10x plus visible. Période d'<strong>Essai de 3 mois Gratuits</strong> disponibles.
            </p>
            <Link href="/dashboard/payment">
              <button type="button" className="w-full rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-3 text-xs transition-colors shadow-sm">
                Découvrir l'essai
              </button>
            </Link>
          </div>
        )}

        {/* Upsell Banner for Employers */}
        {userType !== "seeker" && (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-accent-50 to-neutral-50 p-4 border border-accent-200 shadow-sm dark:from-accent-950/40 dark:to-neutral-900 dark:border-accent-900/50">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              <p className="font-heading font-bold text-accent-800 dark:text-accent-300 text-body-sm">
                Marque Employeur
              </p>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              Attirez les meilleurs talents en personnalisant votre page entreprise.
            </p>
            <Link href="/dashboard/company">
              <button type="button" className="w-full rounded-lg bg-white border border-accent-300 hover:bg-accent-50 text-accent-700 font-bold py-2 px-3 text-xs transition-colors shadow-sm dark:bg-neutral-800 dark:border-accent-800 dark:text-accent-400 dark:hover:bg-neutral-700">
                Créer ma vitrine
              </button>
            </Link>
          </div>
        )}
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
