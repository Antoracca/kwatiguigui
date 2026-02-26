import type { Metadata } from "next";
import { LogIn, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous a votre compte KWATIGUIGUI.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Connexion
        </h1>
        <p className="mt-2 text-body-sm text-neutral-500">
          Entrez vos identifiants pour acceder a votre compte.
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

        <Input
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-body-sm text-neutral-600 dark:text-neutral-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
            />
            Se souvenir de moi
          </label>
          <Link
            href="/forgot-password"
            className="text-body-sm text-primary-500 hover:text-primary-600"
          >
            Mot de passe oublie ?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          <LogIn size={18} />
          Se connecter
        </Button>
      </form>

      <p className="mt-6 text-center text-body-sm text-neutral-500">
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Inscription gratuite
        </Link>
      </p>
    </>
  );
}
