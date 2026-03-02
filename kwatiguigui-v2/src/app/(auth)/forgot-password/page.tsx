import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import Link from "next/link";

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description: "Pas de panique ! Réinitialiser votre mot de passe KWATIGUIGUI.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-warning-50 dark:bg-warning-950">
          <KeyRound size={28} className="text-warning-500" />
        </div>
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Mot de passe oublié ?
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
         Pas de panique ! Entrez votre e-mail ou numéro de téléphone pour recevoir les instructions de réinitialisation.
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-body-sm text-primary-500 hover:text-primary-600"
        >
          Retour a la connexion
        </Link>
      </div>
    </>
  );
}
