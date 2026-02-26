import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface EmptyStateProps {
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Main heading */
  title: string;
  /** Descriptive text below the title */
  description?: string;
  /** Optional CTA button */
  action?: EmptyStateAction;
  className?: string;
}

/**
 * EmptyState — reusable empty state component for lists, tables, search results.
 *
 * Usage:
 *   <EmptyState
 *     icon={Briefcase}
 *     title="Aucune annonce"
 *     description="Publiez votre premiere annonce pour etre visible."
 *     action={{ label: "Publier", href: "/dashboard/jobs" }}
 *   />
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        className,
      )}
    >
      {/* Icon circle */}
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          <Icon className="h-8 w-8 text-neutral-400 dark:text-neutral-500" />
        </div>
      )}

      {/* Text */}
      <h3 className="font-heading text-base font-semibold text-neutral-800 dark:text-neutral-200">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div className="mt-5">
          {action.href ? (
            <a
              href={action.href}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              {action.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
