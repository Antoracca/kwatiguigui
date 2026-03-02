"use client";

import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Briefcase,
  Building2,
  Check,
  Eye,
  EyeOff,
  Lock,
  MapPin,
  Phone,
  User,
  UserSearch,
  UserPlus,
  Mail,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { useActionState, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FullScreenLoader } from "@/components/ui/full-screen-loader";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { SocialAuth } from "@/components/auth/social-auth";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";

import { signUp } from "@/lib/auth/actions";
import type { ActionResult } from "@/lib/auth/actions";
import { JOB_TYPES, EXPERIENCE_LEVELS, SECTORS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type UserTypeChoice = "seeker" | "employer" | "company" | "";

// ---------------------------------------------------------------------------
// Step labels — differ by profile type
// ---------------------------------------------------------------------------
function getSteps(userType: UserTypeChoice) {
  const step2Label =
    userType === "company" ? "Entreprise" :
      userType === "employer" ? "Recrutement" :
        "Informations";

  return [
    { label: "Profil" },
    { label: step2Label },
    { label: "Localisation" },
    { label: "Sécurité" },
  ];
}

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------
function StepIndicator({ current, userType }: { current: number; userType: UserTypeChoice }) {
  const steps = getSteps(userType);
  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-body-xs font-bold transition-all ${index < current
                ? "bg-secondary-500 text-white"
                : index === current
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : "bg-neutral-200 text-neutral-400 dark:bg-neutral-700"
                }`}
            >
              {index < current ? <Check size={14} /> : index + 1}
            </div>
            <span
              className={`hidden text-[10px] font-medium sm:block ${index === current
                ? "text-primary-500"
                : index < current
                  ? "text-secondary-500"
                  : "text-neutral-400"
                }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-2 h-px w-8 transition-all sm:w-12 ${index < current ? "bg-secondary-500" : "bg-neutral-200 dark:bg-neutral-700"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline field error component
// ---------------------------------------------------------------------------
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1.5 text-body-xs text-error-600 dark:text-error-400">
      <AlertCircle size={13} className="shrink-0" />
      {message}
    </p>
  );
}

// ---------------------------------------------------------------------------
// ExperienceSelect — premium pill-chip experience level selector
// ---------------------------------------------------------------------------
function ExperienceSelect({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accentClass?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label} <span className="text-error-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {EXPERIENCE_LEVELS.map(({ value: v, label: l }) => {
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              className={[
                "relative flex flex-col items-center justify-center rounded-xl border-2 px-3 py-3 text-center text-body-xs font-semibold transition-all duration-200 select-none",
                selected
                  ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-500/20 dark:border-primary-400 dark:bg-primary-950/30 dark:text-primary-300"
                  : "border-neutral-100 bg-white text-neutral-500 hover:border-primary-200 hover:bg-primary-50/40 hover:text-primary-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 dark:hover:border-primary-800 dark:hover:bg-primary-950/20",
              ].join(" ")}
            >
              {selected && (
                <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </span>
              )}
              {l}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}


// ---------------------------------------------------------------------------
// AvailabilityStatus — feedback temps réel email / username
// ---------------------------------------------------------------------------
type CheckStatus = "idle" | "checking" | "available" | "taken" | "error";

function AvailabilityStatus({ status }: { status: CheckStatus }) {
  if (status === "idle" || status === "error") return null;
  return (
    <p
      className={[
        "mt-1 flex items-center gap-1.5 text-body-xs",
        status === "checking"  ? "text-neutral-400 dark:text-neutral-500" :
        status === "available" ? "text-secondary-600 dark:text-secondary-400" :
                                 "text-error-600 dark:text-error-400",
      ].join(" ")}
    >
      {status === "checking"  && <span className="h-3 w-3 shrink-0 animate-spin rounded-full border border-neutral-400 border-t-transparent" />}
      {status === "available" && <CheckCircle2 size={13} className="shrink-0" />}
      {status === "taken"     && <AlertCircle  size={13} className="shrink-0" />}
      {status === "checking"  ? "Vérification..."
       : status === "available" ? "Disponible"
       : "Déjà utilisé"}
    </p>
  );
}

// ---------------------------------------------------------------------------
// RegisterForm
// ---------------------------------------------------------------------------
const initialState: ActionResult = { success: false };

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [attemptedNext, setAttemptedNext] = useState(false);

  // ── Disponibilité email / username en temps réel ──────────────────────────
  const [emailStatus, setEmailStatus]       = useState<CheckStatus>("idle");
  const [usernameStatus, setUsernameStatus] = useState<CheckStatus>("idle");
  const [phoneStatus, setPhoneStatus]       = useState<CheckStatus>("idle");
  const emailTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const usernameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phoneTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  function checkEmailAvailability(value: string) {
    setEmailStatus("idle");
    if (emailTimer.current) clearTimeout(emailTimer.current);
    if (!value || !value.includes("@") || !value.includes(".") || value.length < 5) return;
    setEmailStatus("checking");
    emailTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/check-availability?type=email&value=${encodeURIComponent(value)}`,
        );
        const data = await res.json() as { available?: boolean };
        setEmailStatus(data.available ? "available" : "taken");
      } catch {
        setEmailStatus("error");
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

  const [countdown, setCountdown] = useState(15);

  // Force cache invalidation on successful register
  useEffect(() => {
    if (state.success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "/dashboard";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.success]);

  // Controlled form state — persists across step navigation
  const [formData, setFormData] = useState({
    userType: "" as UserTypeChoice,
    firstName: "",      // Prénom (ou Nom d'entreprise pour company)
    lastName: "",       // Nom de famille (pas pour company)
    username: "",       // Identifiant unique
    dateOfBirth: "",    // Date de naissance (pas pour company)
    email: "",
    phone: "",
    city: "",
    neighborhood: "",
    jobType: "",
    experience: "",     // Niveau d'expérience (enum)
    companyName: "",    // Nom de l'entreprise ou d'agence (Optionnel)
    password: "",
    confirmPassword: "",
  });

  const update = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (attemptedNext) setAttemptedNext(false);
    if (field === "email")    checkEmailAvailability(value);
    if (field === "username") checkUsernameAvailability(value);
    if (field === "phone")    checkPhoneAvailability(value);
  };

  // ── Client-side validation per step ────────────────────────────────────────
  function getStepErrors(): Record<string, string> {
    const e: Record<string, string> = {};
    const isCompany = formData.userType === "company";

    if (step === 1) {
      // firstName / Nom entreprise
      const nameLabel = isCompany ? "Le nom de l'entreprise" : "Le prénom";
      if (formData.firstName.trim().length < 2)
        e.firstName = `${nameLabel} doit contenir au moins 2 caractères.`;

      // lastName (individuel seulement)
      if (!isCompany && formData.lastName.trim().length < 2)
        e.lastName = "Le nom de famille doit contenir au moins 2 caractères.";

      // username
      if (formData.username.trim().length < 3)
        e.username = "L'identifiant doit contenir au moins 3 caractères.";
      else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim()))
        e.username = "Lettres, chiffres et _ uniquement (sans espaces).";

      // dateOfBirth (individuel seulement)
      if (!isCompany) {
        if (!formData.dateOfBirth) {
          e.dateOfBirth = "Veuillez entrer votre date de naissance.";
        } else {
          const dob = new Date(formData.dateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const m = today.getMonth() - dob.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
          if (age < 18) e.dateOfBirth = "Vous devez avoir au moins 18 ans.";
          if (age > 99) e.dateOfBirth = "Date de naissance invalide.";
        }
      }

      // email
      if (!formData.email.trim() || !formData.email.includes("@") || !formData.email.includes("."))
        e.email = "Veuillez entrer une adresse e-mail valide.";

      // phone (obligatoire pour tous les types)
      if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 7)
        e.phone = "Veuillez entrer un numéro de téléphone valide.";

      // jobType
      if (!formData.jobType) {
        if (isCompany || formData.userType === "employer")
          e.jobType = "Veuillez sélectionner votre secteur d'activité.";
        else
          e.jobType = "Veuillez sélectionner le métier que vous recherchez.";
      }

      // experience (uniquement pour les chercheurs d'emploi)
      if (formData.userType === "seeker" && !formData.experience)
        e.experience = "Veuillez sélectionner le niveau d'expérience.";
    }

    if (step === 2) {
      if (formData.city.trim().length < 2)
        e.city = "Veuillez entrer votre ville (champ obligatoire).";
    }

    return e;
  }

  const stepErrors: Record<string, string> = attemptedNext ? getStepErrors() : {};

  function canProceed(): boolean {
    switch (step) {
      case 0: return formData.userType !== "";
      case 1: return Object.keys(getStepErrors()).length === 0
        && emailStatus    !== "taken"
        && usernameStatus !== "taken"
        && phoneStatus    !== "taken";
      case 2: return formData.city.trim().length >= 2;
      case 3: return (
        formData.password.length >= 8 &&
        formData.password === formData.confirmPassword
      );
      default: return false;
    }
  }

  function tryProceed() {
    if (step === 0) {
      if (formData.userType) setStep(1);
      return;
    }
    setAttemptedNext(true);
    if (canProceed()) {
      setAttemptedNext(false);
      setStep(step + 1);
    }
  }

  // Password strength
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;

  // "company" → "employer" in DB
  const dbUserType = formData.userType === "company" ? "employer" : formData.userType;

  // Max date for date-of-birth input (must be ≥ 18 years old)
  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);
  const maxDobStr = maxDob.toISOString().split("T")[0];

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="relative w-48 h-48 mx-auto -mt-6">
          <DotLottieReact
            src="/images/Success animation.lottie"
            loop={false}
            autoplay
          />
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle2 size={28} className="text-secondary-500" />
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 break-words">
              Inscription réussie !
            </h2>
          </div>
          <p className="text-body text-neutral-600 dark:text-neutral-400 max-w-[400px] mx-auto">
            Vous avez reçu un e-mail de confirmation. Veuillez cliquer sur le lien qu'il contient pour activer votre compte.
          </p>
        </div>

        <div className="rounded-2xl border border-warning-200 bg-warning-50 p-4 w-full text-left flex items-start gap-3 mt-4 dark:border-warning-900/50 dark:bg-warning-900/20">
          <div className="text-warning-600 dark:text-warning-500 shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          </div>
          <p className="text-sm font-medium text-warning-800 dark:text-warning-300">
            Le lien de confirmation expire dans <span className="font-bold underline">24 heures</span>. Pensez à vérifier vos spams !
          </p>
        </div>

        <div className="pt-4 flex flex-col items-center gap-3 w-full">
          <p className="text-sm text-neutral-500 animate-pulse">
            Redirection automatique vers votre espace dans <strong>{countdown}</strong> secondes...
          </p>
          <Button
            onClick={() => window.location.href = "/dashboard"}
            className="w-full h-auto py-3 px-4 flex flex-wrap items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 font-bold shadow-md text-white border-none leading-tight"
          >
            <span className="text-center">Accéder à mon espace membre maintenant</span>
            <ArrowRight size={18} className="shrink-0" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <FullScreenLoader isVisible={isPending} text="Création de votre compte..." />
      <StepIndicator current={step} userType={formData.userType} />

      {/* Global server error */}
      {state.error && (
        <div className="mb-4 rounded-lg border border-error-200 bg-error-50 px-4 py-3 dark:border-error-800 dark:bg-error-950">
          <p className="text-body-sm text-error-700 dark:text-error-300">{state.error}</p>
        </div>
      )}

      <form action={formAction}>
        {/* Hidden fields — carry all data to server action on final submit */}
        <input type="hidden" name="userType" value={dbUserType} />
        <input type="hidden" name="firstName" value={formData.firstName} />
        <input type="hidden" name="lastName" value={formData.lastName} />
        <input type="hidden" name="username" value={formData.username} />
        <input type="hidden" name="dateOfBirth" value={formData.dateOfBirth} />
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="phone" value={formData.phone} />
        <input type="hidden" name="city" value={formData.city} />
        <input type="hidden" name="neighborhood" value={formData.neighborhood} />
        <input type="hidden" name="companyName" value={formData.companyName} />
        <input type="hidden" name="jobType" value={formData.jobType} />
        <input type="hidden" name="experience" value={formData.experience} />
        <input type="hidden" name="password" value={formData.password} />
        <input type="hidden" name="confirmPassword" value={formData.confirmPassword} />

        {/* ================================================================ */}
        {/* STEP 0 — Choisir son profil                                      */}
        {/* ================================================================ */}
        {step === 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white">
                Bienvenue sur Kwatiguigui
              </h2>
              <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
                Sélectionnez le type de compte qui correspond à vos besoins :
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Candidat */}
              <button
                type="button"
                onClick={() => update("userType", "seeker")}
                className={`flex flex-col items-start gap-4 rounded-2xl border-2 p-5 transition-all duration-300 relative group overflow-hidden text-left ${formData.userType === "seeker"
                  ? "border-primary-500 bg-primary-50/50 dark:border-primary-400 dark:bg-primary-950/30 shadow-md ring-1 ring-primary-500/20 scale-[1.02]"
                  : "border-neutral-100 bg-white hover:border-primary-300 hover:bg-primary-50/30 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-primary-500/50 dark:hover:bg-primary-950/20"
                  }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`p-3 rounded-xl transition-colors ${formData.userType === "seeker" ? "bg-primary-500 text-white shadow-inner" : "bg-neutral-50 text-neutral-400 group-hover:bg-primary-100 group-hover:text-primary-600 dark:bg-neutral-800 dark:group-hover:bg-primary-900/50 dark:group-hover:text-primary-400"}`}>
                    <UserSearch size={24} />
                  </div>
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${formData.userType === "seeker" ? "bg-primary-500 border-primary-500 dark:border-primary-400 dark:bg-primary-500" : "border-neutral-200 group-hover:border-primary-300 dark:border-neutral-700 dark:group-hover:border-primary-500/50"}`}>
                    {formData.userType === "seeker" && <Check size={12} className="text-white" />}
                  </div>
                </div>

                <div className="space-y-1.5 mt-2">
                  <span className="block font-heading text-body-base font-bold text-neutral-900 dark:text-neutral-100">
                    Candidat
                  </span>
                  <p className="text-body-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                    Je recherche un emploi, une mission ou un stage.
                  </p>
                </div>
              </button>

              {/* Employeur particulier */}
              <button
                type="button"
                onClick={() => update("userType", "employer")}
                className={`flex flex-col items-start gap-4 rounded-2xl border-2 p-5 transition-all duration-300 relative group overflow-hidden text-left ${formData.userType === "employer"
                  ? "border-secondary-500 bg-secondary-50/50 dark:border-secondary-400 dark:bg-secondary-950/30 shadow-md ring-1 ring-secondary-500/20 scale-[1.02]"
                  : "border-neutral-100 bg-white hover:border-secondary-300 hover:bg-secondary-50/30 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-secondary-500/50 dark:hover:bg-secondary-950/20"
                  }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`p-3 rounded-xl transition-colors ${formData.userType === "employer" ? "bg-secondary-500 text-white shadow-inner" : "bg-neutral-50 text-neutral-400 group-hover:bg-secondary-100 group-hover:text-secondary-600 dark:bg-neutral-800 dark:group-hover:bg-secondary-900/50 dark:group-hover:text-secondary-400"}`}>
                    <UserPlus size={24} />
                  </div>
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${formData.userType === "employer" ? "bg-secondary-500 border-secondary-500 dark:border-secondary-400 dark:bg-secondary-500" : "border-neutral-200 group-hover:border-secondary-300 dark:border-neutral-700 dark:group-hover:border-secondary-500/50"}`}>
                    {formData.userType === "employer" && <Check size={12} className="text-white" />}
                  </div>
                </div>

                <div className="space-y-1.5 mt-2">
                  <span className="block font-heading text-body-base font-bold text-neutral-900 dark:text-neutral-100">
                    Employeur
                  </span>
                  <p className="text-body-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                    Je recrute pour mes besoins domestiques ou personnels.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 1 — Informations (contenu différent par type)               */}
        {/* ================================================================ */}
        {step === 1 && (
          <div className="space-y-4">

            {/* ── SEEKER ──────────────────────────────────────────────── */}
            {formData.userType === "seeker" && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Prénom(s)"
                    type="text"
                    placeholder="Ex : Marie"
                    leftIcon={<User size={18} />}
                    value={formData.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    required
                    autoComplete="given-name"
                    error={state.fieldErrors?.firstName?.[0] ?? stepErrors.firstName}
                  />
                  <Input
                    label="Nom(s) de famille"
                    type="text"
                    placeholder="Ex : Ngbangui"
                    leftIcon={<User size={18} />}
                    value={formData.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    required
                    autoComplete="family-name"
                    error={state.fieldErrors?.lastName?.[0] ?? stepErrors.lastName}
                  />
                </div>

                <div>
                  <Input
                    label="Identifiant (username)"
                    type="text"
                    placeholder="Ex : marie_ngb (lettres, chiffres, _)"
                    leftIcon={<AtSign size={18} />}
                    value={formData.username}
                    onChange={(e) => update("username", e.target.value.toLowerCase())}
                    required
                    autoComplete="username"
                    error={state.fieldErrors?.username?.[0] ?? stepErrors.username}
                  />
                  <AvailabilityStatus status={usernameStatus} />
                </div>

                <DatePickerInput
                  label="Date de naissance"
                  max={maxDobStr}
                  value={formData.dateOfBirth}
                  onChange={(v) => update("dateOfBirth", v)}
                  required
                  error={state.fieldErrors?.dateOfBirth?.[0] ?? stepErrors.dateOfBirth}
                />

                <div>
                  <Input
                    label="Adresse e-mail"
                    type="email"
                    placeholder="exemple@gmail.com"
                    leftIcon={<Mail size={18} className="text-neutral-400" />}
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    autoComplete="email"
                    error={state.fieldErrors?.email?.[0] ?? stepErrors.email}
                  />
                  <AvailabilityStatus status={emailStatus} />
                </div>

                <div>
                  <PhoneNumberInput
                    label="Téléphone"
                    required
                    value={formData.phone}
                    onChange={(v) => update("phone", v)}
                    error={state.fieldErrors?.phone?.[0] ?? stepErrors.phone}
                  />
                  <AvailabilityStatus status={phoneStatus} />
                </div>

                {/* Métier recherché */}
                <SearchableSelect
                  label="Emploi recherché"
                  required
                  options={JOB_TYPES.map((t) => ({ value: t, label: t }))}
                  value={formData.jobType}
                  onChange={(v) => update("jobType", v)}
                  placeholder="Sélectionnez le type d'emploi"
                  searchPlaceholder="Rechercher un métier..."
                  icon={<UserSearch size={17} />}
                  error={state.fieldErrors?.jobType?.[0] ?? stepErrors.jobType}
                />

                {/* Niveau d'expérience */}
                <ExperienceSelect
                  label="Niveau d'expérience"
                  value={formData.experience}
                  onChange={(v) => update("experience", v)}
                  accentClass="focus:border-primary-500 focus:ring-primary-500/20"
                  error={state.fieldErrors?.experience?.[0] ?? stepErrors.experience}
                />
              </>
            )}

            {/* ── EMPLOYER ────────────────────────────────────────────── */}
            {formData.userType === "employer" && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Prénom(s)"
                    type="text"
                    placeholder="Ex : Jean"
                    leftIcon={<User size={18} />}
                    value={formData.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    required
                    autoComplete="given-name"
                    error={state.fieldErrors?.firstName?.[0] ?? stepErrors.firstName}
                  />
                  <Input
                    label="Nom(s) de famille"
                    type="text"
                    placeholder="Ex : Mbitikon"
                    leftIcon={<User size={18} />}
                    value={formData.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    required
                    autoComplete="family-name"
                    error={state.fieldErrors?.lastName?.[0] ?? stepErrors.lastName}
                  />
                </div>

                <div>
                  <Input
                    label="Identifiant (username)"
                    type="text"
                    placeholder="Ex : jean_mbit (lettres, chiffres, _)"
                    leftIcon={<AtSign size={18} />}
                    value={formData.username}
                    onChange={(e) => update("username", e.target.value.toLowerCase())}
                    required
                    autoComplete="username"
                    error={state.fieldErrors?.username?.[0] ?? stepErrors.username}
                  />
                  <AvailabilityStatus status={usernameStatus} />
                </div>

                <DatePickerInput
                  label="Date de naissance"
                  max={maxDobStr}
                  value={formData.dateOfBirth}
                  onChange={(v) => update("dateOfBirth", v)}
                  required
                  error={state.fieldErrors?.dateOfBirth?.[0] ?? stepErrors.dateOfBirth}
                />

                <div>
                  <Input
                    label="Adresse e-mail"
                    type="email"
                    placeholder="exemple@gmail.com"
                    leftIcon={<Mail size={18} className="text-neutral-400" />}
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    autoComplete="email"
                    error={state.fieldErrors?.email?.[0] ?? stepErrors.email}
                  />
                  <AvailabilityStatus status={emailStatus} />
                </div>

                <div>
                  <PhoneNumberInput
                    label="Téléphone"
                    required
                    value={formData.phone}
                    onChange={(v) => update("phone", v)}
                  />
                  <AvailabilityStatus status={phoneStatus} />
                </div>

                {/* Secteur de l'employeur */}
                <SearchableSelect
                  label="Votre secteur d'activité"
                  required
                  options={SECTORS.map((t) => ({ value: t, label: t }))}
                  value={formData.jobType}
                  onChange={(v) => update("jobType", v)}
                  placeholder="Sélectionnez votre secteur"
                  searchPlaceholder="Rechercher un secteur..."
                  icon={<Briefcase size={17} />}
                  error={state.fieldErrors?.jobType?.[0] ?? stepErrors.jobType}
                />
              </>
            )}

            {/* ── COMPANY ─────────────────────────────────────────────── */}
            {formData.userType === "company" && (
              <>
                <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 dark:border-accent-900 dark:bg-accent-950/30">
                  <p className="text-body-xs font-medium text-accent-800 dark:text-accent-300">
                    Compte Entreprise — Gérez vos recrutements depuis un tableau de bord dédié.
                  </p>
                </div>

                <Input
                  label="Nom de l'entreprise"
                  type="text"
                  placeholder="Ex : SOCA, ENERCA, Cabinet X..."
                  leftIcon={<Building2 size={18} />}
                  value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  required
                  error={state.fieldErrors?.firstName?.[0] ?? stepErrors.firstName}
                />

                <div>
                  <Input
                    label="Identifiant (username)"
                    type="text"
                    placeholder="Ex : soca_rca (lettres, chiffres, _)"
                    leftIcon={<AtSign size={18} />}
                    value={formData.username}
                    onChange={(e) => update("username", e.target.value.toLowerCase())}
                    required
                    autoComplete="username"
                    error={state.fieldErrors?.username?.[0] ?? stepErrors.username}
                  />
                  <AvailabilityStatus status={usernameStatus} />
                </div>

                <div>
                  <Input
                    label="E-mail de contact"
                    type="email"
                    placeholder="contact@entreprise.com"
                    leftIcon={<Mail size={18} className="text-neutral-400" />}
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    autoComplete="email"
                    error={state.fieldErrors?.email?.[0] ?? stepErrors.email}
                  />
                  <AvailabilityStatus status={emailStatus} />
                </div>

                <div>
                  <PhoneNumberInput
                    label="Téléphone de l'entreprise"
                    required
                    value={formData.phone}
                    onChange={(v) => update("phone", v)}
                    error={state.fieldErrors?.phone?.[0] ?? stepErrors.phone}
                  />
                  <AvailabilityStatus status={phoneStatus} />
                </div>

                {/* Secteur d'activité */}
                <div className="space-y-1">
                  <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Secteur d'activité principal <span className="text-error-500">*</span>
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => update("jobType", e.target.value)}
                    className={`block w-full rounded-xl border px-4 py-3 text-body-sm shadow-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 ${stepErrors.jobType
                      ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
                      : "border-neutral-200 dark:border-neutral-700 focus:border-accent-500 focus:ring-accent-500/20"
                      }`}
                    required
                  >
                    <option value="">Sélectionnez votre secteur d'activité</option>
                    {SECTORS.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <FieldError message={state.fieldErrors?.jobType?.[0] ?? stepErrors.jobType} />
                </div>
              </>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 2 — Localisation                                            */}
        {/* ================================================================ */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Ville — OBLIGATOIRE */}
            <Input
              label="Ville"
              type="text"
              placeholder="Ex : Bangui"
              leftIcon={<MapPin size={18} />}
              value={formData.city}
              onChange={(e) => update("city", e.target.value)}
              required
              error={state.fieldErrors?.city?.[0] ?? stepErrors.city}
            />

            {/* Quartier — OPTIONNEL */}
            <Input
              label="Quartier (optionnel)"
              type="text"
              placeholder="Ex : Lakouanga, Boeing, Boy-Rabé..."
              leftIcon={<MapPin size={18} />}
              value={formData.neighborhood}
              onChange={(e) => update("neighborhood", e.target.value)}
              error={state.fieldErrors?.neighborhood?.[0]}
            />

            {/* Nom d'entreprise — OPTIONNEL (Uniquement Employeur / Entreprise) */}
            {(formData.userType === "employer" || formData.userType === "company") && (
              <Input
                label="Nom de société, agence ou entreprise (facultatif)"
                type="text"
                placeholder="Ex : Agence XYZ, Cabinet X, Mon Entreprise..."
                leftIcon={<Building2 size={18} />}
                value={formData.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 3 — Sécurité / Mot de passe                                 */}
        {/* ================================================================ */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Mot de passe <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Choisissez un mot de passe fort"
                  value={formData.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="block w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-12 text-body-sm text-neutral-900 shadow-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${passwordStrength >= level
                          ? level <= 1 ? "bg-error-500"
                            : level <= 2 ? "bg-warning-500"
                              : level <= 3 ? "bg-accent-500"
                                : "bg-secondary-500"
                          : "bg-neutral-200 dark:bg-neutral-700"
                          }`}
                      />
                    ))}
                  </div>
                  <ul className="space-y-1">
                    {[
                      { key: "length", label: "Au moins 8 caractères" },
                      { key: "uppercase", label: "Au moins une majuscule" },
                      { key: "number", label: "Au moins un chiffre" },
                      { key: "special", label: "Au moins un caractère spécial" },
                    ].map(({ key, label }) => (
                      <li
                        key={key}
                        className={`flex items-center gap-2 text-body-xs ${passwordChecks[key as keyof typeof passwordChecks]
                          ? "text-secondary-600 dark:text-secondary-400"
                          : "text-neutral-400"
                          }`}
                      >
                        <div
                          className={`h-3 w-3 rounded-full border ${passwordChecks[key as keyof typeof passwordChecks]
                            ? "border-secondary-500 bg-secondary-500"
                            : "border-neutral-300 dark:border-neutral-600"
                            }`}
                        />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {state.fieldErrors?.password?.[0] && (
                <FieldError message={state.fieldErrors.password[0]} />
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Confirmer le mot de passe <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Répétez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className={`block w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-body-sm text-neutral-900 shadow-sm transition-all focus:outline-none focus:ring-2 dark:bg-neutral-900 dark:text-neutral-100 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
                    : "border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-neutral-700"
                    }`}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <FieldError message="Les mots de passe ne correspondent pas." />
              )}
              {state.fieldErrors?.confirmPassword?.[0] && (
                <FieldError message={state.fieldErrors.confirmPassword[0]} />
              )}
            </div>

            <p className="rounded-xl bg-neutral-50 p-3 text-body-xs text-neutral-500 dark:bg-neutral-900">
              En créant votre compte, vous acceptez nos{" "}
              <a href="/terms" target="_blank" className="underline hover:text-primary-500">
                Conditions d'utilisation
              </a>.
            </p>
          </div>
        )}

        {/* ================================================================ */}
        {/* Navigation                                                        */}
        {/* ================================================================ */}
        <div className={`mt-6 flex flex-col gap-4 ${step > 0 ? "" : ""}`}>
          <div className={`flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => { setAttemptedNext(false); setStep(step - 1); }}
                disabled={isPending}
              >
                <ArrowLeft size={18} />
                Retour
              </Button>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={tryProceed}
                disabled={step === 0 && !formData.userType}
                className={[
                  step === 0 ? "w-full" : "",
                  formData.userType === "employer"
                    ? "bg-secondary-500 hover:bg-secondary-600 text-white border-none shadow-md"
                    : formData.userType === "company"
                      ? "bg-accent-500 hover:bg-accent-600 text-white border-none shadow-md font-bold"
                      : "bg-primary-500 hover:bg-primary-600 text-white border-none shadow-md",
                ].filter(Boolean).join(" ")}
              >
                Continuer
                <ArrowRight size={18} />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 border-none shadow-md font-bold tracking-wide"
                disabled={isPending || !canProceed()}
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Veuillez patienter...
                  </>
                ) : (
                  <>
                    <UserPlus size={18} className="mr-2" />
                    Créer mon compte
                  </>
                )}
              </Button>
            )}
          </div>

          {step === 0 && (
            <div className="flex justify-center mt-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <button
                type="button"
                onClick={() => {
                  update("userType", "company");
                  setAttemptedNext(false);
                  setStep(1);
                }}
                className="group flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-400"
              >
                <span>Vous êtes une entreprise ?</span>
                <span className="flex items-center text-accent-600 dark:text-accent-400 font-bold decoration-accent-500/30 underline-offset-4 group-hover:underline">
                  Rejoignez-nous <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          )}
        </div>
      </form>

      <SocialAuth />

      <p className="mt-8 text-center text-body-sm text-neutral-500">
        Déjà inscrit ?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Se connecter
        </Link>
      </p>
    </>
  );
}
