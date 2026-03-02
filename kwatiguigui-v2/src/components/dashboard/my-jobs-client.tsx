"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  MapPin,
  Briefcase,
  Calendar,
  MoreHorizontal,
  Trash2,
  EyeOff,
  Eye,
  AlertCircle,
} from "lucide-react";

import { deleteJob, toggleJobActive } from "@/lib/actions/jobs";
import {
  PUBLICATION_STATUS_LABELS,
  type PublicationStatus,
} from "@/lib/constants";
import { formatRelativeDate, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobFormModal } from "@/components/dashboard/job-form-modal";

interface Job {
  id: string;
  job_type: string;
  city: string;
  publication_status: string;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}

interface MyJobsClientProps {
  jobs: Job[];
  isPremium: boolean;
  freeJobsUsed: number;
  freeJobLimit: number;
}

const STATUS_VARIANT: Record<PublicationStatus, "success" | "warning" | "primary" | "error"> = {
  published: "success",
  pending: "warning",
  draft: "primary",
  rejected: "error",
};

export function MyJobsClient({
  jobs,
  isPremium,
  freeJobsUsed,
  freeJobLimit,
}: MyJobsClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const freeProgress = Math.round((freeJobsUsed / freeJobLimit) * 100);
  const isAtLimit = !isPremium && freeJobsUsed >= freeJobLimit;

  function handleDelete(jobId: string) {
    setError(null);
    startTransition(async () => {
      const result = await deleteJob(jobId);
      if (!result.success) {
        setError(result.error ?? "Erreur lors de la suppression.");
      }
      setConfirmDeleteId(null);
    });
  }

  function handleToggle(jobId: string, isActive: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await toggleJobActive(jobId, isActive);
      if (!result.success) {
        setError(result.error ?? "Erreur lors de la mise a jour.");
      }
    });
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Mes annonces
            </h1>
            <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
              {jobs.length} annonce{jobs.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setModalOpen(true)}
            disabled={isAtLimit}
          >
            <Plus className="h-4 w-4" />
            Nouvelle annonce
          </Button>
        </div>

        {/* Freemium progress */}
        {!isPremium && (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-fluid-sm font-medium text-neutral-700 dark:text-neutral-300">
                Annonces utilisees (plan gratuit)
              </span>
              <span
                className={[
                  "text-fluid-sm font-bold",
                  freeProgress >= 100
                    ? "text-error-600 dark:text-error-400"
                    : freeProgress >= 80
                      ? "text-warning-600 dark:text-warning-400"
                      : "text-neutral-700 dark:text-neutral-300",
                ].join(" ")}
              >
                {freeJobsUsed}/{freeJobLimit}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                className={[
                  "h-full rounded-full transition-all duration-500",
                  freeProgress >= 100
                    ? "bg-error-500"
                    : freeProgress >= 80
                      ? "bg-warning-500"
                      : "bg-secondary-500",
                ].join(" ")}
                style={{ width: `${Math.min(freeProgress, 100)}%` }}
              />
            </div>
            {isAtLimit && (
              <div className="mt-3 flex items-center justify-between">
                <p className="text-fluid-xs text-error-600 dark:text-error-400">
                  Limite atteinte. Passez a Premium pour des annonces illimitees.
                </p>
                <a
                  href="/dashboard/payment"
                  className="inline-flex min-h-[36px] items-center rounded-full bg-accent-500 px-4 py-1.5 text-fluid-xs font-semibold text-accent-950 transition-all hover:bg-accent-600"
                >
                  Passer Premium
                </a>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="text-fluid-sm">{error}</span>
          </div>
        )}

        {/* Jobs list */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-16 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900">
              <Briefcase className="h-7 w-7 text-primary-500" />
            </div>
            <p className="mt-4 font-heading text-fluid-lg font-semibold text-neutral-700 dark:text-neutral-300">
              Aucune annonce
            </p>
            <p className="mt-1 max-w-xs text-center text-fluid-sm text-neutral-500 dark:text-neutral-400">
              Publiez votre premiere annonce pour etre visible par les{" "}
              {" "}employeurs et chercheurs d&apos;emploi.
            </p>
            <Button
              variant="primary"
              size="md"
              className="mt-6"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Creer une annonce
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const status = job.publication_status as PublicationStatus;
              const expiresAt = job.expires_at ? new Date(job.expires_at) : null;
              const isExpired = expiresAt ? expiresAt < new Date() : false;
              const daysLeft = expiresAt
                ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : null;

              return (
                <div
                  key={job.id}
                  className={[
                    "rounded-2xl border bg-white p-4 transition-all dark:bg-neutral-900",
                    !job.is_active
                      ? "border-neutral-200 opacity-60 dark:border-neutral-800"
                      : "border-neutral-200 hover:border-primary-200 hover:shadow-sm dark:border-neutral-700",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {/* Status + type */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={STATUS_VARIANT[status] ?? "default"} className="text-xs">
                          {PUBLICATION_STATUS_LABELS[status] ?? status}
                        </Badge>
                        <span className="font-heading text-fluid-base font-semibold text-neutral-900 dark:text-neutral-100">
                          {job.job_type}
                        </span>
                        {!job.is_active && (
                          <Badge variant="outline" className="text-xs">
                            Desactivee
                          </Badge>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="mt-1.5 flex flex-wrap gap-3 text-fluid-sm text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatRelativeDate(job.created_at)}
                        </span>
                        {expiresAt && (
                          <span
                            className={[
                              "flex items-center gap-1",
                              isExpired
                                ? "text-error-500"
                                : daysLeft !== null && daysLeft <= 5
                                  ? "text-warning-600"
                                  : "text-neutral-500 dark:text-neutral-400",
                            ].join(" ")}
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            {isExpired
                              ? "Expiree"
                              : daysLeft !== null && daysLeft <= 5
                                ? `Expire dans ${daysLeft}j`
                                : `Expire le ${formatDate(expiresAt, { day: "numeric", month: "short" })}`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                          aria-label="Actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem
                          onClick={() => handleToggle(job.id, job.is_active)}
                          disabled={isPending}
                        >
                          {job.is_active ? (
                            <>
                              <EyeOff className="h-4 w-4" />
                              Desactiver
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4" />
                              Activer
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {confirmDeleteId === job.id ? (
                          <DropdownMenuItem
                            className="text-error-600 focus:bg-error-50 focus:text-error-700 dark:text-error-400"
                            onClick={() => handleDelete(job.id)}
                            disabled={isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                            Confirmer la suppression
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-error-600 focus:bg-error-50 focus:text-error-700 dark:text-error-400"
                            onClick={() => setConfirmDeleteId(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create job modal */}
      <JobFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
