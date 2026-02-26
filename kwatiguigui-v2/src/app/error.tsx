"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary for Next.js App Router.
 * Catches unhandled runtime errors in the root layout subtree.
 * Must be a Client Component (receives Error and reset() from Next.js).
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to console for development debugging
    // In production this would also send to Sentry via captureException
    console.error("[GlobalErrorBoundary]", error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-error-50 dark:bg-error-950"
        aria-hidden="true"
      >
        <AlertTriangle className="h-10 w-10 text-error-500" />
      </div>

      {/* Heading */}
      <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Une erreur est survenue
      </h1>
      <p className="mt-4 max-w-md text-fluid-base leading-relaxed text-neutral-500 dark:text-neutral-400">
        Nous sommes desoles, quelque chose s&apos;est mal passe.
        L&apos;erreur a ete enregistree et notre equipe technique en est informee.
        Vous pouvez essayer de recharger la page ou retourner a l&apos;accueil.
      </p>

      {/* Development error details */}
      {isDevelopment && error.message && (
        <div className="mt-6 max-w-lg overflow-hidden rounded-xl border border-error-200 bg-error-50 text-left dark:border-error-800 dark:bg-error-950/30">
          <div className="border-b border-error-200 px-4 py-2 dark:border-error-800">
            <p className="font-heading text-fluid-xs font-semibold text-error-700 dark:text-error-400">
              Erreur de developpement (masquee en production)
            </p>
          </div>
          <pre className="overflow-x-auto px-4 py-3 text-xs text-error-700 dark:text-error-300">
            {error.message}
            {error.digest ? `\nDigest: ${error.digest}` : ""}
          </pre>
        </div>
      )}

      {/* Error digest (production — safe to display) */}
      {!isDevelopment && error.digest && (
        <p className="mt-4 font-mono text-fluid-xs text-neutral-400">
          Code d&apos;erreur : {error.digest}
        </p>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white shadow-md shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          <RefreshCw className="h-4 w-4" />
          Reessayer
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          <Home className="h-4 w-4" />
          Retour a l&apos;accueil
        </Link>
      </div>

      {/* Support link */}
      <p className="mt-8 text-fluid-sm text-neutral-400">
        Si le probleme persiste,{" "}
        <a
          href="https://wa.me/23674143434"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          contactez notre support WhatsApp
        </a>
      </p>
    </div>
  );
}
