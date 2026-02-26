"use client";

import { LogIn, Phone } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { signIn } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = { success: false };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Global error */}
      {state.error && (
        <div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 dark:border-error-800 dark:bg-error-950">
          <p className="text-body-sm text-error-700 dark:text-error-300">
            {state.error}
          </p>
        </div>
      )}

      <Input
        label="Numero WhatsApp"
        name="whatsapp"
        type="tel"
        placeholder="+236 74 XX XX XX"
        leftIcon={<Phone size={18} />}
        required
        autoComplete="tel"
        error={state.fieldErrors?.whatsapp?.[0]}
        disabled={isPending}
      />

      <Input
        label="Mot de passe"
        name="password"
        type="password"
        placeholder="Votre mot de passe"
        required
        autoComplete="current-password"
        error={state.fieldErrors?.password?.[0]}
        disabled={isPending}
      />

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-body-sm text-neutral-600 dark:text-neutral-400">
          <input
            type="checkbox"
            name="rememberMe"
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Connexion en cours...
          </>
        ) : (
          <>
            <LogIn size={18} />
            Se connecter
          </>
        )}
      </Button>
    </form>
  );
}
