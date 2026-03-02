"use client";

import { LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FullScreenLoader } from "@/components/ui/full-screen-loader";

import { signIn } from "@/lib/auth/actions";
import type { ActionResult } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: ActionResult = { success: false };

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  // Force cache invalidation on successful login
  useEffect(() => {
    if (state.success) {
      window.location.href = "/dashboard";
    }
  }, [state.success]);

  return (
    <>
      <FullScreenLoader isVisible={isPending} text="Connexion en cours..." />
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
          label="E-mail ou nom d'utilisateur"
          name="email"
          type="email"
          placeholder="ex: maelis@gmail.com ou nom d'utilisateur..."
          leftIcon={<Mail size={18} className="text-neutral-400" />}
          required
          autoComplete="email"
          error={state.fieldErrors?.email?.[0]}
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
          <label className="flex cursor-pointer items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <input
              type="checkbox"
              name="rememberMe"
              className="shrink-0 rounded-sm border-neutral-300 bg-white checked:bg-neutral-900 checked:border-neutral-900 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:checked:bg-white dark:checked:border-white transition-all cursor-pointer accent-neutral-900"
              style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }}
            />
            <span className="text-body-sm select-none font-medium">Se souvenir de moi</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-body-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 border-none shadow-md transition-all font-medium tracking-wide mt-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Veuillez patienter...
            </>
          ) : (
            <>
              Se connecter
            </>
          )}
        </Button>
      </form>
    </>
  );
}
