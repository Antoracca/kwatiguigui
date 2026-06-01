import type { Metadata } from "next";
import Image from "next/image";
import { LogIn } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";
import { SocialAuth } from "@/components/auth/social-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte KUSSALA.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center flex flex-col items-center">
        <div className="relative h-20 w-20 mb-4 drop-shadow-md">
          <Image
            src="/images/Favicon.png"
            alt="Kussala Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="flex items-center gap-3 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Connexion
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Entrez vos identifiants pour accéder à votre compte.
        </p>
      </div>

      <LoginForm />
      <SocialAuth />

      <p className="mt-8 text-center text-body-sm text-neutral-500">
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
