import type { Metadata } from "next";
import { ArrowLeft, Phone, Send } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Mot de passe oublie",
  description: "Reinitialiser votre mot de passe KWATIGUIGUI.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Mot de passe oublie
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Entrez votre numero WhatsApp. Vous recevrez un code de
          reinitialisation.
        </p>
      </div>

      <form className="space-y-4">
        <Input
          label="Numero WhatsApp"
          type="tel"
          placeholder="+236 74 XX XX XX"
          leftIcon={<Phone size={18} />}
          required
          autoComplete="tel"
        />

        <Button type="submit" variant="primary" size="lg" className="w-full">
          <Send size={18} />
          Envoyer le code
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-body-sm text-primary-500 hover:text-primary-600"
        >
          <ArrowLeft size={16} />
          Retour a la connexion
        </Link>
      </div>
    </>
  );
}
