"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, KeyRound, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/auth/actions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// ---------------------------------------------------------------------------
// Password strength helpers
// ---------------------------------------------------------------------------
interface StrengthRule {
  label: string;
  test: (v: string) => boolean;
}

const STRENGTH_RULES: StrengthRule[] = [
  { label: "Au moins 8 caracteres", test: (v) => v.length >= 8 },
  { label: "Une lettre majuscule", test: (v) => /[A-Z]/.test(v) },
  { label: "Un chiffre", test: (v) => /[0-9]/.test(v) },
  { label: "Un caractere special", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

function getStrengthLevel(password: string): 0 | 1 | 2 | 3 | 4 {
  const passed = STRENGTH_RULES.filter((r) => r.test(password)).length;
  return passed as 0 | 1 | 2 | 3 | 4;
}

const STRENGTH_COLORS = [
  "",
  "bg-error-500",
  "bg-warning-500",
  "bg-secondary-500",
  "bg-secondary-600",
];

const STRENGTH_LABELS = ["", "Faible", "Moyen", "Bon", "Fort"];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const initialState = { success: false, error: undefined as string | undefined };

export function ResetPasswordForm() {
  const [state, action, isPending] = useActionState(resetPassword, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const strengthLevel = password ? getStrengthLevel(password) : 0;

  if (state.success) {
    return (
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-50 dark:bg-secondary-950">
            <CheckCircle2 className="h-8 w-8 text-secondary-500" />
          </div>
        </div>
        <h1 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Mot de passe modifie
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Votre mot de passe a ete mis a jour avec succes. Vous pouvez maintenant vous connecter.
        </p>
        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-600/25 transition-all hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-950">
            <KeyRound className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <h1 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Nouveau mot de passe
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Choisissez un mot de passe fort pour securiser votre compte.
        </p>
      </div>

      {state.error && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-error-200 bg-error-50 p-4 text-sm text-error-700 dark:border-error-800 dark:bg-error-950/30 dark:text-error-400">
          <X className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      <form action={action} className="space-y-4">
        {/* New password */}
        <div>
          <Input
            label="Nouveau mot de passe"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                aria-label={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          {/* Strength indicator */}
          {password.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={[
                      "h-1.5 flex-1 rounded-full transition-colors",
                      level <= strengthLevel
                        ? STRENGTH_COLORS[strengthLevel]
                        : "bg-neutral-200 dark:bg-neutral-700",
                    ].join(" ")}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-500">
                Force :{" "}
                <span
                  className={
                    strengthLevel <= 1
                      ? "font-medium text-error-500"
                      : strengthLevel === 2
                        ? "font-medium text-warning-500"
                        : "font-medium text-secondary-600"
                  }
                >
                  {STRENGTH_LABELS[strengthLevel] || "Entrez un mot de passe"}
                </span>
              </p>
              <ul className="space-y-1">
                {STRENGTH_RULES.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <li
                      key={rule.label}
                      className={[
                        "flex items-center gap-1.5 text-xs",
                        passed
                          ? "text-secondary-600 dark:text-secondary-400"
                          : "text-neutral-400 dark:text-neutral-500",
                      ].join(" ")}
                    >
                      <CheckCircle2
                        className={["h-3.5 w-3.5", passed ? "opacity-100" : "opacity-40"].join(" ")}
                      />
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <Input
          label="Confirmer le mot de passe"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
          required
          disabled={isPending}
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm((v) => !v)}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              aria-label={showConfirm ? "Masquer" : "Afficher"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isPending || strengthLevel < 3}
        >
          {isPending ? (
            <>
              <div className="h-10 w-24 -ml-4 flex items-center justify-center">
                <DotLottieReact src="/images/chargementloader.lottie" loop autoplay />
              </div>
              <span>Mise à jour...</span>
            </>
          ) : (
            "Changer le mot de passe"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-neutral-400">
        <Link
          href="/login"
          className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400"
        >
          Retour a la connexion
        </Link>
      </p>
    </>
  );
}
