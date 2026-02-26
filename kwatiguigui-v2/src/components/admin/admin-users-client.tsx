"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Download,
  Ban,
  Trash2,
  Eye,
  Filter,
  X,
} from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { maskWhatsApp, formatRelativeDate } from "@/lib/utils";
import { RCA_REGIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination";

interface AdminUser {
  id: string;
  first_name: string | null;
  whatsapp: string | null;
  region: string | null;
  user_type: string | null;
  subscription_paid: boolean | null;
  is_active: boolean | null;
  created_at: string | null;
}

interface AdminUsersClientProps {
  users: AdminUser[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  filters: {
    q: string;
    user_type: string;
    subscription: string;
    region: string;
  };
}

export function AdminUsersClient({
  users,
  totalUsers,
  currentPage,
  totalPages,
  filters,
}: AdminUsersClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(filters.q);
  const [isPending, startTransition] = useTransition();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams();
    if (key !== "q" && filters.q) params.set("q", filters.q);
    if (key !== "user_type" && filters.user_type)
      params.set("user_type", filters.user_type);
    if (key !== "subscription" && filters.subscription)
      params.set("subscription", filters.subscription);
    if (key !== "region" && filters.region) params.set("region", filters.region);
    if (value) params.set(key, value);
    params.delete("page");
    router.push(`/admin/users?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateFilter("q", search);
  }

  function exportCSV() {
    const headers = ["ID", "Prenom", "WhatsApp", "Region", "Type", "Abonnement", "Actif", "Inscription"];
    const rows = users.map((u) => [
      u.id,
      u.first_name ?? "",
      u.whatsapp ?? "",
      u.region ?? "",
      u.user_type ?? "",
      u.subscription_paid ? "Premium" : "Gratuit",
      u.is_active ? "Oui" : "Non",
      u.created_at ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kwatiguigui-utilisateurs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasFilters =
    filters.q || filters.user_type || filters.subscription || filters.region;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Utilisateurs
          </h1>
          <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
            {totalUsers.toLocaleString("fr-FR")} utilisateur{totalUsers !== 1 ? "s" : ""} au total
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV}>
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-1 min-w-[200px] gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher nom, WhatsApp..."
                className="min-h-[44px] w-full rounded-full border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-fluid-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-400 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
            <Button type="submit" variant="primary" size="sm">
              Chercher
            </Button>
          </form>

          {/* Type filter */}
          <select
            value={filters.user_type}
            onChange={(e) => updateFilter("user_type", e.target.value)}
            className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-4 text-fluid-sm text-neutral-700 focus:border-primary-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            <option value="">Tous les types</option>
            <option value="seeker">Chercheurs</option>
            <option value="employer">Employeurs</option>
          </select>

          {/* Subscription filter */}
          <select
            value={filters.subscription}
            onChange={(e) => updateFilter("subscription", e.target.value)}
            className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-4 text-fluid-sm text-neutral-700 focus:border-primary-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            <option value="">Tous abonnements</option>
            <option value="premium">Premium</option>
            <option value="free">Gratuit</option>
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin/users")}
            >
              <X className="h-4 w-4" />
              Effacer
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-fluid-sm">
            <thead className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <tr>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Utilisateur
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:table-cell">
                  WhatsApp
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 md:table-cell">
                  Region
                </th>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Type
                </th>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Abonnement
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 lg:table-cell">
                  Inscription
                </th>
                <th className="px-5 py-3 text-right font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-400">
                    Aucun utilisateur trouve.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className={[
                      "transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                      !user.is_active ? "opacity-50" : "",
                    ].join(" ")}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                          {user.first_name?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {user.first_name ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 font-mono text-xs text-neutral-500 dark:text-neutral-400 sm:table-cell">
                      {user.whatsapp ? maskWhatsApp(user.whatsapp) : "—"}
                    </td>
                    <td className="hidden px-5 py-3 text-neutral-600 dark:text-neutral-400 md:table-cell">
                      {user.region ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-neutral-500">
                        {user.user_type === "seeker" ? "Chercheur" : "Employeur"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {user.subscription_paid ? (
                        <Badge variant="accent" className="text-xs">
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Gratuit
                        </Badge>
                      )}
                    </td>
                    <td className="hidden px-5 py-3 text-xs text-neutral-400 lg:table-cell">
                      {user.created_at
                        ? formatRelativeDate(user.created_at)
                        : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          title="Voir le profil"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          title={user.is_active ? "Bannir" : "Debannir"}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-warning-50 hover:text-warning-600 dark:hover:bg-warning-950/30"
                        >
                          <Ban className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Supprimer"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-error-50 hover:text-error-500 dark:hover:bg-error-950/30"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
            <PaginationWithLinks
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/admin/users"
            />
          </div>
        )}
      </div>
    </div>
  );
}
