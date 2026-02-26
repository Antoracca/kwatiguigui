import type { Metadata } from "next";
import { ArrowRight, Briefcase, Phone, User, UserPlus } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Creez votre compte KWATIGUIGUI gratuitement. Trouvez un emploi ou recrutez en Republique Centrafricaine.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  // TODO: Implement multi-step form with React Hook Form + Zod
  // Step 1: User type (seeker/employer)
  // Step 2: Personal info (name, age, whatsapp, phone)
  // Step 3: Location (region, city, neighborhood)
  // Step 4: Job info (job type, experience/motivation)
  // Step 5: Credentials (password, confirm)

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Inscription
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Creez votre compte gratuitement en quelques etapes.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-body-xs font-bold ${
                step === 1
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-200 text-neutral-500 dark:bg-neutral-700"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-700" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: User type selection */}
      <div className="space-y-4">
        <p className="text-center text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
          Quel est votre profil ?
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-neutral-200 p-6 transition-all hover:border-primary-500 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-400 dark:hover:bg-primary-950"
          >
            <User size={32} className="text-primary-500" />
            <span className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Chercheur d'emploi
            </span>
            <Badge variant="primary">Je cherche</Badge>
          </button>

          <button
            type="button"
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-neutral-200 p-6 transition-all hover:border-secondary-500 hover:bg-secondary-50 dark:border-neutral-700 dark:hover:border-secondary-400 dark:hover:bg-secondary-950"
          >
            <Briefcase size={32} className="text-secondary-500" />
            <span className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Employeur
            </span>
            <Badge variant="secondary">Je recrute</Badge>
          </button>
        </div>

        <Button variant="primary" size="lg" className="w-full" disabled>
          Continuer
          <ArrowRight size={18} />
        </Button>
      </div>

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
