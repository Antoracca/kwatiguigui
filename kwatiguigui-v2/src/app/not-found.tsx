import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* SVG Illustration */}
      <div className="mb-8 select-none" aria-hidden="true">
        <svg
          width="280"
          height="180"
          viewBox="0 0 280 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          {/* Background circles */}
          <circle cx="140" cy="90" r="80" fill="currentColor" className="text-primary-50 dark:text-primary-950" />
          <circle cx="140" cy="90" r="60" fill="currentColor" className="text-primary-100 dark:text-primary-900" />

          {/* 404 large text */}
          <text
            x="140"
            y="115"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="72"
            fill="currentColor"
            className="text-primary-200 dark:text-primary-800"
          >
            404
          </text>

          {/* Floating dots */}
          <circle cx="40" cy="40" r="6" fill="currentColor" className="text-primary-200 dark:text-primary-800" />
          <circle cx="240" cy="50" r="4" fill="currentColor" className="text-secondary-200 dark:text-secondary-800" />
          <circle cx="220" cy="150" r="5" fill="currentColor" className="text-accent-200 dark:text-accent-800" />
          <circle cx="60" cy="145" r="4" fill="currentColor" className="text-primary-300 dark:text-primary-700" />

          {/* Magnifying glass icon */}
          <g transform="translate(110, 52)">
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3.5" fill="none" className="text-primary-400 dark:text-primary-500" />
            <line x1="25" y1="25" x2="34" y2="34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary-400 dark:text-primary-500" />
          </g>
        </svg>
      </div>

      {/* Text */}
      <h1 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-fluid-base leading-relaxed text-neutral-500 dark:text-neutral-400">
        La page que vous recherchez n&apos;existe pas ou a ete deplacee.
        Elle a peut-etre ete supprimee ou l&apos;adresse est incorrecte.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white shadow-md shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          <Home className="h-4 w-4" />
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/jobs"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          <Search className="h-4 w-4" />
          Voir les offres
        </Link>
      </div>

      {/* Help link */}
      <p className="mt-8 text-fluid-sm text-neutral-400">
        Un probleme ?{" "}
        <Link
          href="/help"
          className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Consultez le centre d&apos;aide
        </Link>
      </p>
    </div>
  );
}
