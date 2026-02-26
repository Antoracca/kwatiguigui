import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Confirmation email",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    code?: string;
    error?: string;
    error_description?: string;
  }>;
}

/**
 * /auth/confirm
 *
 * Handles the Supabase Auth email confirmation callback.
 * Supabase sends users here after clicking the confirmation link in their email.
 * The URL contains a PKCE `code` parameter that must be exchanged for a session.
 *
 * Flow:
 *   1. code present → exchangeCodeForSession → redirect to /dashboard
 *   2. error present → render error card with retry link
 *   3. no params    → redirect to / (direct access, nothing to confirm)
 */
export default async function ConfirmPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { code, error, error_description } = params;

  // Supabase returned an error in the URL
  if (error) {
    return (
      <ErrorCard
        title="Lien invalide ou expire"
        message={
          error_description ??
          "Le lien de confirmation est invalide ou a expire. Veuillez faire une nouvelle demande."
        }
        action={{ label: "Retour a la connexion", href: "/login" }}
      />
    );
  }

  // No code at all — direct access, nothing to do
  if (!code) {
    redirect("/");
  }

  // Exchange code for session
  const supabase = await createClient();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return (
      <ErrorCard
        title="Confirmation echouee"
        message={
          exchangeError.message.includes("expired") || exchangeError.message.includes("code")
            ? "Le lien de confirmation a expire. Les liens sont valides 24 heures. Veuillez en demander un nouveau."
            : "Une erreur s'est produite lors de la confirmation de votre adresse. Veuillez reessayer."
        }
        action={{ href: "/login?error=expired", label: "Retour a la connexion" }}
      />
    );
  }

  // Success — redirect to dashboard
  redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ErrorCardProps {
  title: string;
  message: string;
  action: { label: string; href: string };
}

function ErrorCard({ title, message, action }: ErrorCardProps) {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-error-50 dark:bg-error-950">
          <XCircle className="h-8 w-8 text-error-500" />
        </div>
      </div>

      <h1 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {message}
      </p>

      <div className="mt-6">
        <Link
          href={action.href}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-600/25 transition-all hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          {action.label}
        </Link>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        Besoin d&apos;aide ?{" "}
        <a
          href="https://wa.me/23674143434"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400"
        >
          Contactez le support
        </a>
      </p>
    </div>
  );
}
