"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Trash2, MapPin, Calendar } from "lucide-react";

import { formatRelativeDate } from "@/lib/utils";
import {
  PUBLICATION_STATUS_LABELS,
  type PublicationStatus,
} from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { PaginationWithLinks } from "@/components/ui/pagination";

interface AdminJob {
  id: string;
  job_type: string | null;
  city: string | null;
  user_type: string | null;
  publication_status: string | null;
  is_active: boolean | null;
  created_at: string | null;
  expires_at: string | null;
  author_name: string | null;
}

interface AdminJobsModerationClientProps {
  jobs: AdminJob[];
  statusFilter: string;
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  pendingCount: number;
}

const STATUS_VARIANT: Record<string, "success" | "warning" | "primary" | "error"> = {
  published: "success",
  pending: "warning",
  draft: "primary",
  rejected: "error",
};

const TABS = [
  { id: "all", label: "Toutes" },
  { id: "pending", label: "En attente", hasBadge: true },
  { id: "published", label: "Publiees" },
  { id: "rejected", label: "Rejetees" },
  { id: "draft", label: "Brouillons" },
] as const;

export function AdminJobsModerationClient({
  jobs,
  statusFilter,
  currentPage,
  totalPages,
  totalJobs,
  pendingCount,
}: AdminJobsModerationClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(tab: string) {
    const params = new URLSearchParams();
    if (tab !== "all") params.set("status", tab);
    router.push(`/admin/jobs?${params.toString()}`);
  }

  async function handleAction(jobId: string, action: "publish" | "reject" | "delete") {
    startTransition(async () => {
      const res = await fetch("/api/admin/jobs/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, action }),
      });
      if (res.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Moderation des annonces
        </h1>
        <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
          {totalJobs} annonce{totalJobs !== 1 ? "s" : ""} au total
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleStatusChange(tab.id)}
            className={[
              "relative flex min-h-[36px] items-center gap-2 rounded-full px-4 py-1.5 text-fluid-sm font-medium transition-all",
              statusFilter === tab.id
                ? "bg-primary-500 text-white shadow-sm"
                : "border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800",
            ].join(" ")}
          >
            {tab.label}
            {"hasBadge" in tab && tab.hasBadge && pendingCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-error-500 px-1.5 text-[10px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-fluid-sm">
            <thead className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <tr>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Annonce
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 md:table-cell">
                  Auteur
                </th>
                <th className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Statut
                </th>
                <th className="hidden px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:table-cell">
                  Date
                </th>
                <th className="px-5 py-3 text-right font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-neutral-400">
                    Aucune annonce dans cette categorie.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const status = (job.publication_status as PublicationStatus) ?? "draft";
                  return (
                    <tr
                      key={job.id}
                      className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="px-5 py-3">
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">
                          {job.job_type ?? "—"}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-neutral-400">
                          <MapPin className="h-3 w-3" />
                          {job.city}
                          <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] dark:bg-neutral-800">
                            {job.user_type === "seeker" ? "Chercheur" : "Employeur"}
                          </span>
                        </div>
                      </td>
                      <td className="hidden px-5 py-3 text-neutral-600 dark:text-neutral-400 md:table-cell">
                        {job.author_name ?? "—"}
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant={STATUS_VARIANT[status] ?? "default"}
                          className="text-xs"
                        >
                          {PUBLICATION_STATUS_LABELS[status] ?? status}
                        </Badge>
                      </td>
                      <td className="hidden px-5 py-3 text-xs text-neutral-400 sm:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {job.created_at ? formatRelativeDate(job.created_at) : "—"}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {status !== "published" && (
                            <button
                              type="button"
                              title="Publier"
                              disabled={isPending}
                              onClick={() => handleAction(job.id, "publish")}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-secondary-50 hover:text-secondary-600 dark:hover:bg-secondary-950/30"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          {status !== "rejected" && (
                            <button
                              type="button"
                              title="Rejeter"
                              disabled={isPending}
                              onClick={() => handleAction(job.id, "reject")}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-warning-50 hover:text-warning-600 dark:hover:bg-warning-950/30"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            title="Supprimer"
                            disabled={isPending}
                            onClick={() => handleAction(job.id, "delete")}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-error-50 hover:text-error-500 dark:hover:bg-error-950/30"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
            <PaginationWithLinks
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/admin/jobs"
              pageParam="page"
            />
          </div>
        )}
      </div>
    </div>
  );
}
