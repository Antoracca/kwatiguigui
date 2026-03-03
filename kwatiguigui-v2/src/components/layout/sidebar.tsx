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
  Building2,
  Rocket,
  Crown
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

const StudentIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 bg-purple-500/20 blur-sm rounded-full dark:bg-purple-500/40" />
    <Rocket size={size} className="relative z-10 drop-shadow-md text-purple-600 dark:text-purple-400 -rotate-12" />
  </div>
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
  { href: "/dashboard/student", label: "Stages & Alternance", icon: StudentIcon, exact: false },
  { href: "/dashboard/advice", label: "Conseils Carrière", icon: BookOpen, exact: false },
  { href: "/dashboard/messages", label: "Messagerie", icon: MessageSquare, exact: false },
  { href: "/dashboard/payment", label: "Abonnement VIP", icon: Crown, exact: false },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings, exact: false },
] as const;

export function DashboardSidebar({ userType }: { userType: "seeker" | "employer" | "company" | null }) {
  const pathname = usePathname();
  const navItems = userType === "seeker" ? SEEKER_NAV : EMPLOYER_NAV;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-neutral-900">
      <nav className="flex flex-col gap-1 p-4 min-h-full">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-body-sm font-medium transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800",
                isActive
                  ? "bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-950 dark:text-primary-400 font-bold"
                  : "text-neutral-600 dark:text-neutral-400",
              )}
            >
              <item.icon size={18} className={isActive ? "text-primary-600 dark:text-primary-400" : "text-neutral-400"} />
              {item.label}
            </Link>
          );
        })}

        <div className="flex-1" />

        {/* Upsell Banner (Free Trial 3 Months) for Seekers */}
        {userType === "seeker" && (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm dark:border-amber-900/30 dark:bg-amber-950/20">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" strokeWidth={2.5} />
              <p className="font-heading text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Passez VIP
              </p>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Démarquez-vous et contactez les recruteurs en direct avec 3 mois offerts.
            </p>
            <Link href="/dashboard/payment" className="block">
              <button
                type="button"
                className="w-full rounded-lg bg-amber-500 py-2 text-xs font-bold text-white transition-colors hover:bg-amber-600"
              >
                Activer l'essai
              </button>
            </Link>
          </div>
        )}

        {/* Upsell Banner for Employers */}
        {userType !== "seeker" && (
          <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-800/50">
            <div className="mb-2 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
              <p className="font-heading text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Marque Employeur
              </p>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Attirez les meilleurs talents en personnalisant votre page entreprise.
            </p>
            <Link href="/dashboard/company" className="block">
              <button
                type="button"
                className="w-full rounded-lg border border-neutral-300 bg-white py-2 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              >
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
