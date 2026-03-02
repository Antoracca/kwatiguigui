"use client";

import { useActionState, useState, useTransition } from "react";
import { useTheme } from "next-themes";
import { Lock, Bell, Sun, Moon, Monitor, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

import { changePassword, deactivateAccount } from "@/lib/actions/settings";
import type { ActionResult } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialPwState: ActionResult = { success: false };

// ---------------------------------------------------------------------------
// Toggle Switch component (Radix-free, accessible)
// ---------------------------------------------------------------------------
interface ToggleSwitchProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSwitch({ id, label, description, checked, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="cursor-pointer text-fluid-sm font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-fluid-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          checked
            ? "bg-primary-500"
            : "bg-neutral-300 dark:bg-neutral-600",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function SettingsClient() {
  const { theme, setTheme } = useTheme();
  const [pwState, pwAction, isPwPending] = useActionState(changePassword, initialPwState);
  const [notifications, setNotifications] = useState({
    messages: true,
    jobApplications: true,
    premiumExpiry: true,
    newsletter: false,
  });
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [deactivateError, setDeactivateError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDeactivate() {
    setDeactivateError(null);
    startTransition(async () => {
      const result = await deactivateAccount();
      if (!result.success) {
        setDeactivateError(result.error ?? "Erreur lors de la desactivation.");
      } else {
        window.location.href = "/";
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Parametres
        </h1>
        <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
          Gerez votre compte, vos preferences et votre securite
        </p>
      </div>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-fluid-lg">
            <Lock className="h-5 w-5 text-primary-500" />
            Changer le mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={pwAction} className="space-y-4">
            {pwState.success && (
              <div className="flex items-center gap-2 rounded-xl border border-secondary-200 bg-secondary-50 p-3 text-secondary-800 dark:border-secondary-800 dark:bg-secondary-950/30 dark:text-secondary-300">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="text-fluid-sm font-medium">Mot de passe mis a jour avec succes.</span>
              </div>
            )}
            {pwState.error && (
              <div className="flex items-center gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-fluid-sm">{pwState.error}</span>
              </div>
            )}

            <Input
              name="currentPassword"
              label="Mot de passe actuel"
              type="password"
              error={pwState.fieldErrors?.currentPassword?.[0]}
              required
            />
            <Input
              name="newPassword"
              label="Nouveau mot de passe"
              type="password"
              helperText="Minimum 8 caracteres, 1 majuscule, 1 chiffre, 1 caractere special"
              error={pwState.fieldErrors?.newPassword?.[0]}
              required
            />
            <Input
              name="confirmNewPassword"
              label="Confirmer le nouveau mot de passe"
              type="password"
              error={pwState.fieldErrors?.confirmNewPassword?.[0]}
              required
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isPwPending}
              >
                <Lock className="h-4 w-4" />
                Mettre a jour
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-fluid-lg">
            <Monitor className="h-5 w-5 text-primary-500" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme */}
          <div>
            <p className="mb-3 text-fluid-sm font-medium text-neutral-700 dark:text-neutral-300">
              Apparence
            </p>
            <div className="flex gap-2">
              {(
                [
                  { id: "light", label: "Clair", icon: Sun },
                  { id: "dark", label: "Sombre", icon: Moon },
                  { id: "system", label: "Systeme", icon: Monitor },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={[
                    "flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-fluid-sm font-medium transition-all",
                    theme === id
                      ? "border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-400",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <div>
              <p className="text-fluid-sm font-medium text-neutral-800 dark:text-neutral-200">
                Langue
              </p>
              <p className="text-fluid-xs text-neutral-500 dark:text-neutral-400">
                Francais uniquement pour l&apos;instant
              </p>
            </div>
            <span className="rounded-full bg-neutral-200 px-3 py-1 text-fluid-xs font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
              FR
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-fluid-lg">
            <Bell className="h-5 w-5 text-primary-500" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <ToggleSwitch
            id="notif-messages"
            label="Nouveaux messages"
            description="Etre notifie quand vous recevez un message"
            checked={notifications.messages}
            onChange={(v) => setNotifications((prev) => ({ ...prev, messages: v }))}
          />
          <div className="border-t border-neutral-100 dark:border-neutral-800" />
          <ToggleSwitch
            id="notif-jobs"
            label="Candidatures"
            description="Nouvelles candidatures ou offres d'emploi"
            checked={notifications.jobApplications}
            onChange={(v) => setNotifications((prev) => ({ ...prev, jobApplications: v }))}
          />
          <div className="border-t border-neutral-100 dark:border-neutral-800" />
          <ToggleSwitch
            id="notif-premium"
            label="Expiration Premium"
            description="Rappel 7 jours avant l'expiration de votre abonnement"
            checked={notifications.premiumExpiry}
            onChange={(v) => setNotifications((prev) => ({ ...prev, premiumExpiry: v }))}
          />
          <div className="border-t border-neutral-100 dark:border-neutral-800" />
          <ToggleSwitch
            id="notif-newsletter"
            label="Nouvelles et conseils"
            description="Actualites et conseils emploi de KWATIGUIGUI"
            checked={notifications.newsletter}
            onChange={(v) => setNotifications((prev) => ({ ...prev, newsletter: v }))}
          />

          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm">
              Enregistrer les preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-error-200 dark:border-error-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-fluid-lg text-error-600 dark:text-error-400">
            <AlertTriangle className="h-5 w-5" />
            Zone de danger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-fluid-sm text-neutral-600 dark:text-neutral-400">
            Desactiver votre compte masquera votre profil et vos annonces. Vous pourrez
            reactivervotre compte en vous reconnectant. Cette action n&apos;est pas irreversible.
          </p>

          {deactivateError && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="text-fluid-sm">{deactivateError}</span>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            {!showDeactivateConfirm ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeactivateConfirm(true)}
              >
                <AlertTriangle className="h-4 w-4" />
                Desactiver mon compte
              </Button>
            ) : (
              <div className="flex flex-col gap-3 rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-950/30 sm:flex-row sm:items-center">
                <p className="text-fluid-sm font-medium text-error-800 dark:text-error-300">
                  Etes-vous sur de vouloir desactiver votre compte ?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeactivateConfirm(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    loading={isPending}
                    onClick={handleDeactivate}
                  >
                    Confirmer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
