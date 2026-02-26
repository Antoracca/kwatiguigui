import type { Metadata } from "next";
import { LogIn, Phone } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous a votre compte KWATIGUIGUI.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-950">
          <LogIn size={28} className="text-primary-500" />
        </div>
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Connexion
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Entrez vos identifiants pour acceder a votre compte.
        </p>
      </div>

      <LoginForm />

      <p className="mt-6 text-center text-body-sm text-neutral-500">
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Inscription gratuite
        </Link>
      </p>

      <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
        <p className="text-center text-body-xs text-neutral-400">
          En vous connectant, vous acceptez nos{" "}
          <Link href="/terms" className="underline hover:text-neutral-600">
            Conditions d'utilisation
          </Link>
          .
        </p>
      </div>
    </>
  );
}
