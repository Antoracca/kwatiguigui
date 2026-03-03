import type { Metadata } from "next";
import { Briefcase, CreditCard, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { formatPrice, formatRelativeDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard Admin — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// SVG Mini Bar Chart (CSS-only, no external lib)
// ---------------------------------------------------------------------------
function MiniBarChart({ data, color = "#003189" }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  const width = 300;
  const height = 80;
  const barWidth = Math.floor(width / data.length) - 2;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {data.map((value, i) => {
        const barHeight = Math.max((value / max) * (height - 10), 2);
        const x = i * (barWidth + 2);
        const y = height - barHeight;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={2}
              fill={color}
              opacity={0.15 + (value / max) * 0.65}
            />
            {value > 0 && (
              <text
                x={x + barWidth / 2}
                y={y - 2}
                textAnchor="middle"
                fontSize="7"
                fill={color}
                opacity={0.7}
              >
                {value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default async function AdminDashboardPage() {
  // Fetch all KPI data in parallel
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: totalUsers },
    { count: activeJobs },
    { data: monthPayments },
    { count: premiumUsers },
    { data: recentProfiles },
    { data: recentPayments },
    { data: weeklySignups },
    { count: pendingJobs },
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("publication_status", "published")
      .eq("is_active", true),
    supabaseAdmin
      .from("payments")
      .select("amount")
      .eq("status", "completed")
      .gte("created_at", monthStart),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("subscription_paid", true),
    supabaseAdmin
      .from("profiles")
      .select("id, first_name, user_type, subscription_paid, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
    supabaseAdmin
      .from("payments")
      .select("id, amount, method, status, reference, created_at, user_id")
      .order("created_at", { ascending: false })
      .limit(10),
    supabaseAdmin
      .from("profiles")
      .select("created_at")
      .gte("created_at", weekAgo)
      .order("created_at", { ascending: true }),
    supabaseAdmin
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("publication_status", "pending"),
  ]);

  const monthRevenue = (monthPayments ?? []).reduce(
    (sum, p: any) => sum + (p.amount ?? 0),
    0,
  );

  const conversionRate =
    totalUsers && totalUsers > 0
      ? Math.round(((premiumUsers ?? 0) / totalUsers) * 100)
      : 0;

  // Build weekly signups bar chart data (7 days)
  const dailyCounts = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
    const dayStr = day.toISOString().split("T")[0];
    return ((weeklySignups as any[]) ?? []).filter((p) =>
      p.created_at?.startsWith(dayStr),
    ).length;
  });

  const kpis = [
    {
      label: "Total Utilisateurs",
      value: (totalUsers ?? 0).toLocaleString("fr-FR"),
      icon: Users,
      color: "text-primary-500",
      bg: "bg-primary-50 dark:bg-primary-950/30",
    },
    {
      label: "Annonces Publiees",
      value: (activeJobs ?? 0).toLocaleString("fr-FR"),
      icon: Briefcase,
      color: "text-secondary-500",
      bg: "bg-secondary-50 dark:bg-secondary-950/30",
    },
    {
      label: "Revenus ce mois",
      value: formatPrice(monthRevenue),
      icon: CreditCard,
      color: "text-accent-600",
      bg: "bg-accent-50 dark:bg-accent-950/30",
    },
    {
      label: "Taux conversion",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Dashboard
          </h1>
          <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
            Vue d&apos;ensemble de la plateforme KWATIGUIGUI
          </p>
        </div>
        {(pendingJobs ?? 0) > 0 && (
          <a
            href="/admin/jobs?status=pending"
            className="inline-flex items-center gap-2 rounded-full border border-warning-200 bg-warning-50 px-4 py-2 text-sm font-medium text-warning-700 transition-colors hover:bg-warning-100 dark:border-warning-800 dark:bg-warning-950/30 dark:text-warning-400"
          >
            <Clock className="h-4 w-4" />
            {pendingJobs} annonce{(pendingJobs ?? 0) > 1 ? "s" : ""} en attente
          </a>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${kpi.bg}`}
              >
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <p className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {kpi.value}
              </p>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                {kpi.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts + recent tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly signups bar chart */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <h2 className="mb-4 font-heading text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Inscriptions (7 derniers jours)
          </h2>
          <div className="h-24">
            <MiniBarChart data={dailyCounts} color="#003189" />
          </div>
          <div className="mt-2 flex justify-between">
            {Array.from({ length: 7 }, (_, i) => {
              const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
              return (
                <span key={i} className="text-[10px] text-neutral-400">
                  {d.toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 3)}
                </span>
              );
            })}
          </div>
        </div>

        {/* Recent payments */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <h2 className="mb-4 font-heading text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Derniers paiements
          </h2>
          {((recentPayments as any[]) ?? []).length === 0 ? (
            <p className="text-sm text-neutral-400">Aucun paiement.</p>
          ) : (
            <div className="space-y-2">
              {((recentPayments as any[]) ?? []).slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800"
                >
                  <div>
                    <p className="font-mono text-xs text-neutral-500">
                      {p.reference?.slice(0, 16)}...
                    </p>
                    <p className="text-xs text-neutral-400">
                      {p.method === "orange" ? "Orange Money" : "Telecel Money"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {formatPrice(p.amount ?? 0)}
                    </p>
                    <span
                      className={[
                        "text-xs font-medium",
                        p.status === "completed"
                          ? "text-secondary-600 dark:text-secondary-400"
                          : p.status === "pending"
                            ? "text-warning-600 dark:text-warning-400"
                            : "text-error-600 dark:text-error-400",
                      ].join(" ")}
                    >
                      {p.status === "completed"
                        ? "Confirme"
                        : p.status === "pending"
                          ? "En attente"
                          : "Echoue"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent users table */}
      <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-heading text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Derniers inscrits
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <tr>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Prenom
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:table-cell">
                  Type
                </th>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Abonnement
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 md:table-cell">
                  Inscription
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
              {((recentProfiles as any[]) ?? []).map((p) => (
                <tr
                  key={p.id}
                  className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  <td className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                        {p.first_name?.charAt(0).toUpperCase() ?? "?"}
                      </div>
                      {p.first_name}
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-neutral-500 dark:text-neutral-400 sm:table-cell">
                    {p.user_type === "seeker" ? "Chercheur" : "Employeur"}
                  </td>
                  <td className="px-5 py-3">
                    {p.subscription_paid ? (
                      <Badge variant="accent" className="text-xs">
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Gratuit
                      </Badge>
                    )}
                  </td>
                  <td className="hidden px-5 py-3 text-neutral-400 dark:text-neutral-500 md:table-cell">
                    {formatRelativeDate(p.created_at ?? "")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-neutral-100 px-5 py-3 dark:border-neutral-800">
          <a
            href="/admin/users"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Voir tous les utilisateurs
          </a>
        </div>
      </div>
    </div>
  );
}
