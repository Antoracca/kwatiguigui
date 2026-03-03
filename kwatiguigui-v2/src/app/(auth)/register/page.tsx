import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";
import { SocialAuth } from "@/components/auth/social-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Créez votre compte KWATIGUIGUI gratuitement. Trouvez un emploi ou recrutez en République Centrafricaine.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6 text-center flex flex-col items-center">
        <div className="relative h-20 w-20 mb-4 drop-shadow-md">
          <Image
            src="/images/Favicon.png"
            alt="Kwatiguigui Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Inscription
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Créez votre compte gratuitement en quelques étapes.
        </p>
      </div>

      <RegisterForm />
    </>
  );
}
