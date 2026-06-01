"use client";

import { useActionState, useState, useTransition } from "react";
import { useTheme } from "next-themes";
import {
  Lock,
  Bell,
  Sun,
  Moon,
  Monitor,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Globe,
  Eye,
  Shield,
  ExternalLink,
  Mail,
  Send,
} from "lucide-react";

import {
  changePassword,
  deactivateAccount,
  requestPasswordReset,
} from "@/lib/actions/settings";
import type { ActionResult } from "@/lib/auth/actions";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialPwState: ActionResult = { success: false };

// ---------------------------------------------------------------------------
// ToggleSwitch
// ---------------------------------------------------------------------------
function ToggleSwitch({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <label
          htmlFor={id}
          className="cursor-pointer text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
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
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          checked ? "bg-primary-500" : "bg-neutral-300 dark:bg-neutral-600",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-4 w-4 translate-y-[2px] transform rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Divider
// ---------------------------------------------------------------------------
function Divider() {
  return <div className="border-t border-neutral-100 dark:border-neutral-800" />;
}

// ---------------------------------------------------------------------------
// ActionButton — pill, visible en clair et en sombre
// ---------------------------------------------------------------------------
function ActionButton({
  type = "button",
  loading = false,
  onClick,
  children,
  variant = "primary",
}: {
  type?: "button" | "submit";
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "secondary"
      ? "bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600"
      : "bg-primary-600 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400";
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-[0.98] disabled:cursor-wait disabled:opacity-50",
        cls,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// SaveRow — bouton Enregistrer + feedback
// ---------------------------------------------------------------------------
function SaveRow({
  saved,
  loading,
  onClick,
}: {
  saved: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      {saved && (
        <span className="flex items-center gap-1.5 text-xs font-medium text-secondary-600 dark:text-secondary-400">
          <CheckCircle size={12} />
          Enregistré
        </span>
      )}
      <ActionButton variant="secondary" loading={loading} onClick={onClick}>
        Enregistrer
      </ActionButton>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SubLabel
// ---------------------------------------------------------------------------
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// SettingsClient
// ---------------------------------------------------------------------------
export function SettingsClient({ isGoogleUser }: { isGoogleUser: boolean }) {
  const { theme, setTheme } = useTheme();
  const [pwState, pwAction, isPwPending] = useActionState(
    changePassword,
    initialPwState,
  );

  const [notifications, setNotifications] = useState({
    messages:         true,
    jobApplications:  true,
    stageAlternance:  true,
    premiumExpiry:    false,
    newsletter:       false,
  });

  const [visibility, setVisibility] = useState({
    cvAccess: false,
  });

  const [notifSaved,     setNotifSaved]     = useState(false);
  const [visibSaved,     setVisibSaved]     = useState(false);
  const [resetSent,      setResetSent]      = useState(false);
  const [resetError,     setResetError]     = useState<string | null>(null);
  const [resetPending,   setResetPending]   = useState(false);

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [deactivateError, setDeactivateError]             = useState<string | null>(null);
  const [isPending, startTransition]                      = useTransition();

  async function handleRequestReset() {
    setResetPending(true);
    setResetError(null);
    const result = await requestPasswordReset();
    setResetPending(false);
    if (result.success) {
      setResetSent(true);
    } else {
      setResetError(result.error ?? "Erreur inconnue.");
    }
  }

  function handleSaveNotifications() {
    // TODO: persist to DB (user_preferences table)
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  }

  function handleSaveVisibility() {
    // TODO: persist to DB (profiles.cv_public already exists)
    setVisibSaved(true);
    setTimeout(() => setVisibSaved(false), 3000);
  }

  function handleDeactivate() {
    setDeactivateError(null);
    startTransition(async () => {
      const result = await deactivateAccount();
      if (!result.success) {
        setDeactivateError(result.error ?? "Erreur lors de la désactivation.");
      } else {
        window.location.href = "/";
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-8 pb-12 w-full">

      {/* ── En-tête ─────────────────────────────────────────────────────── */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Gérez votre compte, vos préférences et votre sécurité.
        </p>
      </div>

      {/* ── Mot de passe ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="h-5 w-5 text-primary-500" />
            Mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isGoogleUser ? (
            /* ── Compte Google : deux options proposées ────────────────── */
            <div className="space-y-4">

              {/* Option 1 — Continuer avec Google (recommandée) */}
              <div className="flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50/60 p-4 dark:border-primary-900/30 dark:bg-primary-950/20">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary-500 dark:text-primary-400" />
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-primary-900 dark:text-primary-200">
                    Votre compte est géré par Google
                  </p>
                  <p className="text-sm leading-relaxed text-primary-700 dark:text-primary-300">
                    Vous vous êtes inscrit avec Google. Vous n&apos;avez pas
                    besoin de mot de passe — Google gère votre authentification
                    directement. Connectez-vous simplement avec votre compte
                    Google.
                  </p>
                  <a
                    href="https://myaccount.google.com/security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Paramètres de sécurité Google
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Séparateur */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                  ou
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>

              {/* Option 2 — Définir un mot de passe via lien email */}
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400 dark:text-neutral-500" />
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Définir un mot de passe email
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      Vous pouvez demander un lien de réinitialisation envoyé à
                      votre adresse email. Après avoir défini votre mot de
                      passe, vous pourrez vous connecter avec votre email et
                      votre mot de passe en plus de Google.
                    </p>

                    {/* Feedback */}
                    {resetSent ? (
                      <div className="flex items-center gap-2 rounded-lg border border-secondary-200 bg-secondary-50 p-3 dark:border-secondary-800/30 dark:bg-secondary-950/20">
                        <CheckCircle size={15} className="shrink-0 text-secondary-600 dark:text-secondary-400" />
                        <p className="text-sm font-medium text-secondary-800 dark:text-secondary-300">
                          Lien envoyé — vérifiez votre boîte mail. Après avoir
                          défini votre mot de passe, vous pourrez vous
                          reconnecter avec email et mot de passe.
                        </p>
                      </div>
                    ) : (
                      <>
                        {resetError && (
                          <div className="flex items-center gap-2 rounded-lg border border-error-200 bg-error-50 p-3 dark:border-error-800 dark:bg-error-950/30">
                            <AlertCircle size={14} className="shrink-0 text-error-600" />
                            <span className="text-sm text-error-700 dark:text-error-300">{resetError}</span>
                          </div>
                        )}
                        <button
                          type="button"
                          disabled={resetPending}
                          onClick={handleRequestReset}
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:scale-[0.98] disabled:cursor-wait disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                          <Send size={14} />
                          {resetPending
                            ? "Envoi en cours…"
                            : "Recevoir un lien de réinitialisation"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Compte email/mot de passe */
            <form action={pwAction} className="space-y-4">
              {pwState.success && (
                <div className="flex items-center gap-2 rounded-xl border border-secondary-200 bg-secondary-50 p-3 text-secondary-800 dark:border-secondary-800 dark:bg-secondary-950/30 dark:text-secondary-300">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">
                    Mot de passe mis à jour avec succès.
                  </span>
                </div>
              )}
              {pwState.error && (
                <div className="flex items-center gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{pwState.error}</span>
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
                helperText="8 caractères minimum, 1 majuscule, 1 chiffre, 1 caractère spécial."
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

              <div className="flex justify-end pt-1">
                <ActionButton type="submit" loading={isPwPending}>
                  <Lock size={15} />
                  {isPwPending ? "Mise à jour…" : "Mettre à jour"}
                </ActionButton>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* ── Préférences ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Monitor className="h-5 w-5 text-primary-500" />
            Préférences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Apparence */}
          <div>
            <SubLabel>Apparence</SubLabel>
            <div className="flex gap-2">
              {(
                [
                  { id: "light",  label: "Clair",   icon: Sun },
                  { id: "dark",   label: "Sombre",  icon: Moon },
                  { id: "system", label: "Système", icon: Monitor },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={[
                    "flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all",
                    theme === id
                      ? "border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Langue */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Langue
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Français uniquement pour l&apos;instant.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-neutral-400" />
              <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
                FR
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Notifications par email ──────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-5 w-5 text-primary-500" />
            Notifications par email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          <ToggleSwitch
            id="notif-messages"
            label="Nouveaux messages"
            description="Être notifié par email lorsque vous recevez un nouveau message."
            checked={notifications.messages}
            onChange={(v) => setNotifications((p) => ({ ...p, messages: v }))}
          />
          <Divider />

          <ToggleSwitch
            id="notif-jobs"
            label="Candidatures et offres d'emploi"
            description="Être notifié pour les nouvelles candidatures reçues et les offres d'emploi correspondant à votre profil."
            checked={notifications.jobApplications}
            onChange={(v) => setNotifications((p) => ({ ...p, jobApplications: v }))}
          />
          <Divider />

          <ToggleSwitch
            id="notif-stage"
            label="Stages et alternances"
            description="Être notifié pour les nouvelles offres de stage et d'alternance disponibles."
            checked={notifications.stageAlternance}
            onChange={(v) => setNotifications((p) => ({ ...p, stageAlternance: v }))}
          />
          <Divider />

          <ToggleSwitch
            id="notif-premium"
            label="Expiration de l'abonnement Premium"
            description="Recevoir un rappel 7 jours avant l'expiration de votre abonnement."
            checked={notifications.premiumExpiry}
            onChange={(v) => setNotifications((p) => ({ ...p, premiumExpiry: v }))}
          />
          <Divider />

          <ToggleSwitch
            id="notif-newsletter"
            label="Actualités et conseils"
            description="Recevoir les actualités et conseils emploi publiés par KUSSALA."
            checked={notifications.newsletter}
            onChange={(v) => setNotifications((p) => ({ ...p, newsletter: v }))}
          />

          <SaveRow
            saved={notifSaved}
            loading={false}
            onClick={handleSaveNotifications}
          />
        </CardContent>
      </Card>

      {/* ── Visibilité ──────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-5 w-5 text-primary-500" />
            Visibilité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          <ToggleSwitch
            id="vis-cv"
            label="Autoriser l'accès à votre CV"
            description="Permettre aux recruteurs et aux entreprises de consulter et de télécharger votre CV directement depuis votre profil public."
            checked={visibility.cvAccess}
            onChange={(v) => setVisibility((p) => ({ ...p, cvAccess: v }))}
          />

          <SaveRow
            saved={visibSaved}
            loading={false}
            onClick={handleSaveVisibility}
          />
        </CardContent>
      </Card>

      {/* ── Zone de danger ──────────────────────────────────────────────── */}
      <Card className="border-error-200 dark:border-error-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-error-600 dark:text-error-400">
            <AlertTriangle className="h-5 w-5" />
            Zone de danger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Désactiver votre compte masquera votre profil et vos annonces. Vous
            pourrez réactiver votre compte en vous reconnectant. Cette action
            n&apos;est pas irréversible.
          </p>

          {deactivateError && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="text-sm">{deactivateError}</span>
            </div>
          )}

          <div className="mt-4">
            {!showDeactivateConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeactivateConfirm(true)}
                className="inline-flex items-center gap-2 rounded-full border border-error-300 px-5 py-2.5 text-sm font-semibold text-error-600 transition hover:bg-error-50 active:scale-[0.98] dark:border-error-800 dark:text-error-400 dark:hover:bg-error-950/30"
              >
                <AlertTriangle className="h-4 w-4" />
                Désactiver mon compte
              </button>
            ) : (
              <div className="flex flex-col gap-3 rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-950/30 sm:flex-row sm:items-center">
                <p className="flex-1 text-sm font-medium text-error-800 dark:text-error-300">
                  Êtes-vous sûr de vouloir désactiver votre compte ?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeactivateConfirm(false)}
                    className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleDeactivate}
                    className="inline-flex items-center gap-1.5 rounded-full bg-error-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-error-700 active:scale-[0.98] disabled:cursor-wait disabled:opacity-50"
                  >
                    {isPending ? "En cours…" : "Confirmer"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
