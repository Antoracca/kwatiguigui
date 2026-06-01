"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Toaster — KUSSALA-themed Sonner wrapper.
 * Already included in src/components/providers.tsx.
 * Export this component if you need to mount it in a sub-layout.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        classNames: {
          toast:
            "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl",
          title:
            "font-heading font-semibold text-neutral-900 dark:text-neutral-100",
          description: "text-sm text-neutral-500 dark:text-neutral-400",
          actionButton:
            "bg-primary-600 text-white rounded-full text-xs font-semibold",
          cancelButton:
            "bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold",
          success:
            "border-secondary-200 dark:border-secondary-800",
          error:
            "border-error-200 dark:border-error-800",
          warning:
            "border-warning-200 dark:border-warning-800",
        },
      }}
    />
  );
}
