"use client";

import { useActionState, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  AtSign,
  Briefcase,
  Building2,
  CheckCircle2,
  Layers,
  MapPin,
  User,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { completeOnboarding } from "@/lib/actions/onboarding";
import type { ActionResult } from "@/lib/auth/actions";
import { JOB_TYPES, SECTORS, EXPERIENCE_LEVELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";
import { SearchableSelect } from "@/components/ui/searchable-select";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Max date of birth (must be at least 18 years old today)
const MAX_DOB = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
})();

const JOB_OPTIONS = JOB_TYPES.map((j) => ({ value: j, label: j }));
const SECTOR_OPTIONS = SECTORS.map((s) => ({ value: s, label: s }));

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
// Props
// ---------------------------------------------------------------------------
interface OnboardingFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function OnboardingForm({ firstName, lastName, email }: OnboardingFormProps) {
  const router = useRouter();

  // ── Multi-step state ──────────────────────────────────────────────────────
  const [step, setStep] = useState<0 | 1>(0);
  const [userType, setUserType] = useState<"seeker" | "employer" | "">("");

  // ── Controlled fields (require hidden inputs for FormData) ─────────────────
  const [username, setUsername]       = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone]             = useState("+236 ");
  const [city, setCity]               = useState("");
  const [jobType, setJobType]         = useState("");
  const [experience, setExperience]   = useState("");

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

    // Poste / secteur
    if (!jobType) {
      errs.jobType =
        userType === "employer"
          ? "Le secteur d'activité est requis"
          : "Le poste recherché est requis";
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

        {/* Identité Google — lecture seule */}
        <div className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50/60 px-4 py-3 dark:border-primary-900/30 dark:bg-primary-950/20">
          <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-primary-500 font-heading text-body-md font-bold text-white">
            {avatarLetter}
          </div>
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

        {/* Sélection du type */}
        <div className="space-y-3">
          <p className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
            Je suis <span className="text-error-500">*</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* Candidat */}
            <button
              type="button"
              onClick={() => setUserType("seeker")}
              className={[
                "flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all",
                userType === "seeker"
                  ? "border-primary-500 bg-primary-50/60 dark:border-primary-400 dark:bg-primary-950/30"
                  : "border-neutral-200 bg-white hover:border-primary-200 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600",
              ].join(" ")}
            >
              <div
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                  userType === "seeker"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800",
                ].join(" ")}
              >
                <User size={24} />
              </div>
              <div>
                <p className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Candidat
                </p>
                <p className="mt-0.5 text-body-xs text-neutral-500">
                  Je cherche du travail
                </p>
              </div>
            </button>

            {/* Employeur */}
            <button
              type="button"
              onClick={() => setUserType("employer")}
              className={[
                "flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all",
                userType === "employer"
                  ? "border-secondary-500 bg-secondary-50/60 dark:border-secondary-400 dark:bg-secondary-950/30"
                  : "border-neutral-200 bg-white hover:border-secondary-200 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600",
              ].join(" ")}
            >
              <div
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                  userType === "employer"
                    ? "bg-secondary-500 text-white"
                    : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800",
                ].join(" ")}
              >
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Employeur
                </p>
                <p className="mt-0.5 text-body-xs text-neutral-500">
                  Je recrute du personnel
                </p>
              </div>
            </button>
          </div>
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

      {/* Hidden inputs — valeurs contrôlées envoyées via FormData */}
      <input type="hidden" name="userType" value={userType} />
      <input type="hidden" name="dateOfBirth" value={dateOfBirth} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="experience" value={experience} />

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

      {/* Poste recherché (candidat) OU secteur d'activité (employeur) */}
      {userType === "seeker" ? (
        <>
          <SearchableSelect
            label="Poste recherché"
            name="jobType"
            options={JOB_OPTIONS}
            value={jobType}
            onChange={setJobType}
            placeholder="Sélectionner un poste"
            required
            icon={<Briefcase size={16} />}
            error={clientErrors.jobType || state.fieldErrors?.jobType?.[0]}
          />

          {/* Expérience — pills, optionnel */}
          <div className="space-y-2">
            <p className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
              Expérience{" "}
              <span className="font-normal text-neutral-400">(optionnel)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setExperience(experience === value ? "" : value)}
                  className={[
                    "rounded-full border px-3.5 py-1.5 text-body-xs font-medium transition-all",
                    experience === value
                      ? "border-primary-500 bg-primary-500 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-primary-700",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <SearchableSelect
          label="Secteur d'activité"
          name="jobType"
          options={SECTOR_OPTIONS}
          value={jobType}
          onChange={setJobType}
          placeholder="Sélectionner un secteur"
          required
          icon={<Layers size={16} />}
          error={clientErrors.jobType || state.fieldErrors?.jobType?.[0]}
        />
      )}

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
