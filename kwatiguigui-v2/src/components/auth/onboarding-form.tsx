"use client";

import { useActionState, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  AtSign,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  UserSearch,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { completeOnboarding } from "@/lib/actions/onboarding";
import type { ActionResult } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";
import { InterestsSelect } from "@/components/forms/interests-select";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Max date of birth (must be at least 18 years old today)
const MAX_DOB = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
})();

const initialState: ActionResult = { success: false };

// ---------------------------------------------------------------------------
// Feedback disponibilité username en temps réel
// ---------------------------------------------------------------------------
type CheckStatus = "idle" | "checking" | "available" | "taken" | "error";

function AvailabilityStatus({ status }: { status: CheckStatus }) {
  if (status === "idle" || status === "error") return null;
  return (
    <p className={[
      "mt-1 flex items-center gap-1.5 text-body-xs",
      status === "checking"  ? "text-neutral-400 dark:text-neutral-500" :
      status === "available" ? "text-secondary-600 dark:text-secondary-400" :
                               "text-error-600 dark:text-error-400",
    ].join(" ")}>
      {status === "checking"  && <span className="h-3 w-3 shrink-0 animate-spin rounded-full border border-neutral-400 border-t-transparent" />}
      {status === "available" && <CheckCircle2 size={13} className="shrink-0" />}
      {status === "taken"     && <AlertCircle  size={13} className="shrink-0" />}
      {status === "checking"  ? "Vérification..." : status === "available" ? "Disponible" : "Déjà utilisé"}
    </p>
  );
}

// ---------------------------------------------------------------------------
// AccountTypeAccordion — sélecteur fin horizontal (candidat / employeur)
// ---------------------------------------------------------------------------
type UserTypeValue = "seeker" | "employer";

function AccountTypeRow({
  active,
  accent,
  icon,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  accent: "primary" | "secondary";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  const ring =
    accent === "primary"
      ? "border-primary-500 bg-primary-50/70 dark:border-primary-400 dark:bg-primary-950/30"
      : "border-secondary-500 bg-secondary-50/70 dark:border-secondary-400 dark:bg-secondary-950/30";
  const iconActive =
    accent === "primary" ? "bg-primary-500 text-white" : "bg-secondary-500 text-white";
  const dotActive =
    accent === "primary"
      ? "border-primary-500 bg-primary-500"
      : "border-secondary-500 bg-secondary-500";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
        active
          ? ring
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
          active ? iconActive : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800",
        ].join(" ")}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </span>
        <span className="block truncate text-body-xs text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </span>
      </span>
      <span
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          active ? dotActive : "border-neutral-300 dark:border-neutral-600",
        ].join(" ")}
      >
        {active && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Avatar — photo Google si disponible, sinon initiale
// ---------------------------------------------------------------------------
function ProfileAvatar({
  avatarUrl,
  letter,
  size = 40,
}: {
  avatarUrl: string;
  letter: string;
  size?: number;
}) {
  const [broken, setBroken] = useState(false);
  if (avatarUrl && !broken) {
    return (
      <Image
        src={avatarUrl}
        alt="Photo de profil"
        width={size}
        height={size}
        unoptimized
        onError={() => setBroken(true)}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex shrink-0 select-none items-center justify-center rounded-full bg-primary-500 font-heading font-bold text-white"
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface OnboardingFormProps {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function OnboardingForm({ firstName, lastName, email, avatarUrl = "" }: OnboardingFormProps) {
  const router = useRouter();

  // ── Multi-step state ──────────────────────────────────────────────────────
  const [step, setStep] = useState<0 | 1>(0);
  const [userType, setUserType] = useState<UserTypeValue | "">("");

  // ── Controlled fields (require hidden inputs for FormData) ─────────────────
  const [username, setUsername]       = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone]             = useState("+236 ");
  const [city, setCity]               = useState("");
  const [interests, setInterests]     = useState<string[]>([]);

  // ── Disponibilité username + phone en temps réel ─────────────────────────
  const [usernameStatus, setUsernameStatus] = useState<CheckStatus>("idle");
  const [phoneStatus,    setPhoneStatus]    = useState<CheckStatus>("idle");
  const usernameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phoneTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  function checkPhoneAvailability(value: string) {
    setPhoneStatus("idle");
    if (phoneTimer.current) clearTimeout(phoneTimer.current);
    const digits = value.replace(/\D/g, "");
    if (digits.length < 7) return;
    setPhoneStatus("checking");
    phoneTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/check-availability?type=phone&value=${encodeURIComponent(value)}`,
        );
        const data = await res.json() as { available?: boolean };
        setPhoneStatus(data.available ? "available" : "taken");
      } catch {
        setPhoneStatus("error");
      }
    }, 600);
  }

  function checkUsernameAvailability(value: string) {
    setUsernameStatus("idle");
    if (usernameTimer.current) clearTimeout(usernameTimer.current);
    if (!value || value.length < 3 || !/^[a-zA-Z0-9_]+$/.test(value)) return;
    setUsernameStatus("checking");
    usernameTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/check-availability?type=username&value=${encodeURIComponent(value)}`,
        );
        const data = await res.json() as { available?: boolean };
        setUsernameStatus(data.available ? "available" : "taken");
      } catch {
        setUsernameStatus("error");
      }
    }, 600);
  }

  // ── Client-side validation ─────────────────────────────────────────────────
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  // ── Server action ──────────────────────────────────────────────────────────
  const [state, formAction, isPending] = useActionState(
    completeOnboarding,
    initialState,
  );

  // ── Derived ───────────────────────────────────────────────────────────────
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || email;
  const avatarLetter = (firstName.charAt(0) || email.charAt(0) || "K").toUpperCase();

  // ── Validation ────────────────────────────────────────────────────────────
  function validateStep1(): boolean {
    const errs: Record<string, string> = {};

    // Username
    const usernameClean = username.trim();
    if (usernameClean.length < 3) {
      errs.username = "L'identifiant doit contenir au moins 3 caractères";
    } else if (!/^[a-zA-Z0-9_]+$/.test(usernameClean)) {
      errs.username = "Lettres, chiffres et _ uniquement (sans espaces)";
    } else if (usernameStatus === "taken") {
      errs.username = "Cet identifiant est déjà utilisé";
    }

    // Date de naissance
    const parts = dateOfBirth.split("-");
    const dobOk =
      parts.length === 3 &&
      (parts[0]?.length ?? 0) === 4 &&
      (parts[1]?.length ?? 0) >= 1 &&
      (parts[2]?.length ?? 0) >= 1 &&
      dateOfBirth <= MAX_DOB;
    if (!dobOk) {
      errs.dateOfBirth = "Date invalide — vous devez avoir au moins 18 ans";
    }

    // Téléphone — au moins 7 chiffres (hors indicatif)
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      errs.phone = "Numéro invalide (+236 XX XX XX XX)";
    } else if (phoneStatus === "taken") {
      errs.phone = "Ce numéro est déjà utilisé par un autre compte";
    }

    // Ville
    if (!city.trim() || city.trim().length < 2) {
      errs.city = "La ville est requise (2 caractères minimum)";
    }

    setClientErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-6 py-2 text-center">
        <div className="h-44 w-44">
          <DotLottieReact
            src="/images/Success animation.lottie"
            loop={false}
            autoplay
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-h3 font-heading font-bold text-neutral-900 dark:text-neutral-100">
            Bienvenue{firstName ? `, ${firstName}` : ""}&nbsp;!
          </h2>
          <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
            Votre profil est prêt. Explorez les offres d&rsquo;emploi
            disponibles en Centrafrique.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          size="lg"
          className="w-full"
        >
          Accéder à mon tableau de bord
          <ArrowRight size={18} />
        </Button>
      </div>
    );
  }

  // ── Step 0 — Choix du type de compte ─────────────────────────────────────
  if (step === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-h3 font-heading font-bold text-neutral-900 dark:text-neutral-100">
            Finalisez votre profil
          </h1>
          <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
            Quelques informations pour activer votre compte
          </p>
        </div>

        {/* Identité Google — lecture seule (avec photo si disponible) */}
        <div className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50/60 px-4 py-3 dark:border-primary-900/30 dark:bg-primary-950/20">
          <ProfileAvatar avatarUrl={avatarUrl} letter={avatarLetter} size={40} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {displayName}
            </p>
            <p className="truncate text-body-xs text-neutral-500 dark:text-neutral-400">
              {email}
            </p>
          </div>
          <CheckCircle2
            size={18}
            className="shrink-0 text-secondary-500"
            aria-label="Email vérifié par Google"
          />
        </div>

        {/* Sélection du type — accordéons fins horizontaux */}
        <div className="space-y-2.5">
          <p className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
            Je suis <span className="text-error-500">*</span>
          </p>
          <AccountTypeRow
            active={userType === "seeker"}
            accent="primary"
            icon={<UserSearch size={20} />}
            title="Candidat"
            subtitle="Je cherche du travail"
            onClick={() => setUserType("seeker")}
          />
          <AccountTypeRow
            active={userType === "employer"}
            accent="secondary"
            icon={<BriefcaseBusiness size={20} />}
            title="Employeur"
            subtitle="Je recrute du personnel"
            onClick={() => setUserType("employer")}
          />
        </div>

        <Button
          onClick={() => { if (userType) setStep(1); }}
          disabled={!userType}
          size="lg"
          className="w-full"
        >
          Continuer
          <ArrowRight size={18} />
        </Button>
      </div>
    );
  }

  // ── Step 1 — Informations personnelles ────────────────────────────────────
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!validateStep1()) e.preventDefault();
      }}
      noValidate
      className="space-y-5"
    >
      {/* Header */}
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => {
            setClientErrors({});
            setStep(0);
          }}
          className="mb-1 flex items-center gap-1.5 text-body-xs text-neutral-500 transition-colors hover:text-primary-600"
        >
          <ArrowLeft size={14} />
          Retour
        </button>
        <h1 className="text-h3 font-heading font-bold text-neutral-900 dark:text-neutral-100">
          Vos informations
        </h1>
        <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
          {userType === "employer"
            ? "Complétez votre profil employeur"
            : "Complétez votre profil candidat"}
        </p>
      </div>

      {/* Identité + photo Google */}
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-900/40">
        <ProfileAvatar avatarUrl={avatarUrl} letter={avatarLetter} size={36} />
        <p className="min-w-0 flex-1 truncate text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
          {displayName}
        </p>
      </div>

      {/* Hidden inputs — valeurs contrôlées envoyées via FormData */}
      <input type="hidden" name="userType" value={userType} />
      <input type="hidden" name="dateOfBirth" value={dateOfBirth} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="interests" value={JSON.stringify(interests)} />

      {/* Erreur serveur globale */}
      {state.error && (
        <div className="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-body-xs text-error-700 dark:border-error-800 dark:bg-error-950/30 dark:text-error-400">
          {state.error}
        </div>
      )}

      {/* Identifiant (username) */}
      <div className="space-y-1.5">
        <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
          Identifiant <span className="text-error-500">*</span>
          <span className="ml-2 font-normal text-neutral-400">(visible par les recruteurs)</span>
        </label>
        <div className="relative">
          <AtSign
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            name="username"
            value={username}
            onChange={(e) => {
              const v = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
              setUsername(v);
              checkUsernameAvailability(v);
            }}
            placeholder="Ex: jean_bangui (lettres, chiffres, _)"
            autoComplete="username"
            maxLength={30}
            className={[
              "flex h-12 w-full rounded-xl border pl-9 pr-4 text-body-sm shadow-sm transition-all",
              "bg-white text-neutral-900 placeholder:text-neutral-400 outline-none",
              "dark:text-neutral-100 dark:bg-neutral-900",
              "focus:ring-2",
              clientErrors.username || state.fieldErrors?.username?.[0]
                ? "border-error-400 bg-error-50/30 focus:border-error-500 focus:ring-error-500/20 dark:bg-error-950/10"
                : "border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-neutral-700",
            ].join(" ")}
          />
        </div>
        {(clientErrors.username || state.fieldErrors?.username?.[0]) ? (
          <p className="flex items-center gap-1.5 text-body-xs text-error-600 dark:text-error-400">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-error-500" />
            {clientErrors.username || state.fieldErrors?.username?.[0]}
          </p>
        ) : (
          <AvailabilityStatus status={usernameStatus} />
        )}
      </div>

      {/* Date de naissance */}
      <DatePickerInput
        label="Date de naissance"
        value={dateOfBirth}
        onChange={setDateOfBirth}
        max={MAX_DOB}
        required
        error={clientErrors.dateOfBirth || state.fieldErrors?.dateOfBirth?.[0]}
      />

      {/* Téléphone */}
      <div>
        <PhoneNumberInput
          label="Téléphone"
          value={phone}
          onChange={(v) => { setPhone(v); checkPhoneAvailability(v); }}
          required
          error={clientErrors.phone || state.fieldErrors?.phone?.[0]}
        />
        {!(clientErrors.phone || state.fieldErrors?.phone?.[0]) && (
          <AvailabilityStatus status={phoneStatus} />
        )}
      </div>

      {/* Ville — input stylisé à la main pour cohérence h-12 / rounded-xl */}
      <div className="space-y-1.5">
        <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
          Ville <span className="text-error-500">*</span>
        </label>
        <div className="relative">
          <MapPin
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ex: Bangui, Berbérati..."
            autoComplete="address-level2"
            className={[
              "flex h-12 w-full rounded-xl border pl-9 pr-4 text-body-sm shadow-sm transition-all",
              "bg-white text-neutral-900 placeholder:text-neutral-400 outline-none",
              "dark:text-neutral-100 dark:bg-neutral-900",
              "focus:ring-2",
              clientErrors.city || state.fieldErrors?.city?.[0]
                ? "border-error-400 bg-error-50/30 focus:border-error-500 focus:ring-error-500/20 dark:bg-error-950/10"
                : "border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-neutral-700",
            ].join(" ")}
          />
        </div>
        {(clientErrors.city || state.fieldErrors?.city?.[0]) && (
          <p className="flex items-center gap-1.5 text-body-xs text-error-600 dark:text-error-400">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-error-500" />
            {clientErrors.city || state.fieldErrors?.city?.[0]}
          </p>
        )}
      </div>

      {/* Centres d'intérêt — facultatif */}
      <InterestsSelect value={interests} onChange={setInterests} />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isPending}
      >
        Finaliser mon inscription
        <ArrowRight size={18} />
      </Button>
    </form>
  );
}
