import type { Metadata } from "next";
import { UserPlus } from "lucide-react";
import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Creez votre compte KWATIGUIGUI gratuitement. Trouvez un emploi ou recrutez en Republique Centrafricaine.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-50 dark:bg-secondary-950">
          <UserPlus size={28} className="text-secondary-500" />
        </div>
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Inscription
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Creez votre compte gratuitement en quelques etapes.
        </p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-body-sm text-neutral-500">
        Deja inscrit ?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Se connecter
        </Link>
      </p>
    </>
  );
}
