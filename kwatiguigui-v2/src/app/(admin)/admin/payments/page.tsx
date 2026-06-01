import type { Metadata } from "next";
import { CreditCard, TrendingUp, Clock } from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { formatPrice, formatDate, formatRelativeDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Paiements — Admin KUSSALA",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ method?: string; status?: string; page?: string }>;
}

const PAGE_SIZE = 30;

export default async function AdminPaymentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // Summary stats
  const [
    { data: monthPayments },
    { count: pendingCount },
    { data: orangePayments },
    { data: telecelPayments },
  ] = await Promise.all([
    supabaseAdmin
      .from("payments")
      .select("amount")
      .eq("status", "completed")
      .gte("created_at", monthStart),
    supabaseAdmin
      .from("payments")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabaseAdmin
      .from("payments")
      .select("amount")
      .eq("method", "orange")
      .eq("status", "completed")
      .gte("created_at", monthStart),
    supabaseAdmin
      .from("payments")
      .select("amount")
      .eq("method", "telecel")
      .eq("status", "completed")
      .gte("created_at", monthStart),
  ]);

  const monthRevenue = ((monthPayments as any[]) ?? []).reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0,
  );
  const orangeRevenue = ((orangePayments as any[]) ?? []).reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0,
  );
  const telecelRevenue = ((telecelPayments as any[]) ?? []).reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0,
  );

  // Payments table
  let query = supabaseAdmin
    .from("payments")
    .select(
      `id, amount, method, status, reference, created_at, user_id,
       user:profiles!user_id(first_name)`,
      { count: "exact" },
    );

  if (params.method && ["orange", "telecel"].includes(params.method)) {
    query = query.eq("method", params.method as "orange" | "telecel");
  }
  if (params.status && ["pending", "completed", "failed"].includes(params.status)) {
    query = query.eq("status", params.status as "pending" | "completed" | "failed");
  }

  const { data: payments, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  const statusBadge = (status: string) => {
    if (status === "completed")
      return (
        <span className="inline-flex items-center rounded-full bg-secondary-100 px-2.5 py-0.5 text-xs font-semibold text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400">
          Confirme
        </span>
      );
    if (status === "pending")
      return (
        <span className="inline-flex items-center rounded-full bg-warning-100 px-2.5 py-0.5 text-xs font-semibold text-warning-700 dark:bg-warning-900/30 dark:text-warning-400">
          En attente
        </span>
      );
    return (
      <span className="inline-flex items-center rounded-full bg-error-100 px-2.5 py-0.5 text-xs font-semibold text-error-700 dark:bg-error-900/30 dark:text-error-400">
        Echoue
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Paiements
        </h1>
        <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
          Suivi des transactions et revenus de la plateforme
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Total this month */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/30">
            <TrendingUp className="h-5 w-5 text-primary-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(monthRevenue)}
          </p>
          <p className="mt-0.5 text-sm text-neutral-500">Revenus ce mois</p>
        </div>

        {/* Orange Money */}
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/20">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/50">
            <span className="text-sm font-bold text-orange-600">OM</span>
          </div>
          <p className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(orangeRevenue)}
          </p>
          <p className="mt-0.5 text-sm text-orange-700 dark:text-orange-400">
            Orange Money ce mois
          </p>
        </div>

        {/* Telecel Money */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/50">
            <span className="text-sm font-bold text-red-600">TM</span>
          </div>
          <p className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(telecelRevenue)}
          </p>
          <p className="mt-0.5 text-sm text-red-700 dark:text-red-400">
            Telecel Money ce mois
          </p>
        </div>
      </div>

      {/* Pending alert */}
      {(pendingCount ?? 0) > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-950/30">
          <Clock className="h-5 w-5 shrink-0 text-warning-500" />
          <p className="text-sm font-medium text-warning-800 dark:text-warning-300">
            {pendingCount} paiement{(pendingCount ?? 0) > 1 ? "s" : ""} en attente de confirmation
          </p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="border-b border-neutral-100 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-heading text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Historique ({count ?? 0} transactions)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <tr>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Reference
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 md:table-cell">
                  Utilisateur
                </th>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Montant
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:table-cell">
                  Methode
                </th>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Statut
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
              {(payments ?? []).length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-neutral-400">
                    Aucune transaction.
                  </td>
                </tr>
              ) : (
                (payments ?? []).map((p: Record<string, unknown>) => (
                  <tr
                    key={p.id as string}
                    className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-neutral-500">
                      {(p.reference as string)?.slice(0, 20)}...
                    </td>
                    <td className="hidden px-5 py-3 text-neutral-700 dark:text-neutral-300 md:table-cell">
                      {((p.user as { first_name: string } | null)?.first_name) ?? "—"}
                    </td>
                    <td className="px-5 py-3 font-heading font-semibold text-neutral-900 dark:text-neutral-100">
                      {formatPrice(p.amount as number ?? 0)}
                    </td>
                    <td className="hidden px-5 py-3 text-neutral-600 dark:text-neutral-400 sm:table-cell">
                      {p.method === "orange" ? "Orange Money" : "Telecel Money"}
                    </td>
                    <td className="px-5 py-3">
                      {statusBadge(p.status as string ?? "")}
                    </td>
                    <td className="hidden px-5 py-3 text-xs text-neutral-400 lg:table-cell">
                      {p.created_at ? formatRelativeDate(p.created_at as string) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
