"use client";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Lock,
  MapPin,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { useActionState, useState } from "react";

import { signUp } from "@/lib/auth/actions";
import { RCA_REGIONS, JOB_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------
const STEPS = [
  { label: "Profil" },
  { label: "Informations" },
  { label: "Localisation" },
  { label: "Securite" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {STEPS.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-body-xs font-bold transition-all ${
                index < current
                  ? "bg-secondary-500 text-white"
                  : index === current
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : "bg-neutral-200 text-neutral-400 dark:bg-neutral-700"
              }`}
            >
              {index < current ? <Check size={14} /> : index + 1}
            </div>
            <span
              className={`hidden text-[10px] font-medium sm:block ${
                index === current
                  ? "text-primary-500"
                  : index < current
                    ? "text-secondary-500"
                    : "text-neutral-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`mx-2 h-px w-8 transition-all sm:w-12 ${
                index < current ? "bg-secondary-500" : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// RegisterForm
// ---------------------------------------------------------------------------
const initialState = { success: false };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Local form state (controlled) — persists across step navigation
  const [formData, setFormData] = useState({
    userType: "" as "seeker" | "employer" | "",
    firstName: "",
    age: "",
    whatsapp: "",
    phone: "",
    region: "",
    city: "",
    neighborhood: "",
    jobType: "",
    experience: "",
    password: "",
    confirmPassword: "",
  });

  const update = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return formData.userType !== "";
      case 1:
        return (
          formData.firstName.length >= 2 &&
          Number(formData.age) >= 18 &&
          formData.whatsapp.length >= 8 &&
          formData.jobType !== ""
        );
      case 2:
        return formData.region !== "" && formData.city.length >= 2;
      case 3:
        return (
          formData.password.length >= 8 &&
          formData.password === formData.confirmPassword
        );
      default:
        return false;
    }
  };

  // Password strength
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;

  return (
    <>
      <StepIndicator current={step} />

      {/* Global error */}
      {state.error && (
        <div className="mb-4 rounded-lg border border-error-200 bg-error-50 px-4 py-3 dark:border-error-800 dark:bg-error-950">
          <p className="text-body-sm text-error-700 dark:text-error-300">
            {state.error}
          </p>
        </div>
      )}

      {/* The hidden form that will be submitted on step 4 */}
      <form action={formAction}>
        {/* Hidden fields carry all form data to the server action */}
        <input type="hidden" name="userType" value={formData.userType} />
        <input type="hidden" name="firstName" value={formData.firstName} />
        <input type="hidden" name="age" value={formData.age} />
        <input type="hidden" name="whatsapp" value={formData.whatsapp} />
        <input type="hidden" name="phone" value={formData.phone} />
        <input type="hidden" name="region" value={formData.region} />
        <input type="hidden" name="city" value={formData.city} />
        <input type="hidden" name="neighborhood" value={formData.neighborhood} />
        <input type="hidden" name="jobType" value={formData.jobType} />
        <input type="hidden" name="experience" value={formData.experience} />
        <input type="hidden" name="password" value={formData.password} />
        <input type="hidden" name="confirmPassword" value={formData.confirmPassword} />

        {/* ---------------------------------------------------------------- */}
        {/* Step 0: User type                                                */}
        {/* ---------------------------------------------------------------- */}
        {step === 0 && (
          <div className="space-y-4">
            <p className="text-center text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
              Quel est votre profil ?
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => update("userType", "seeker")}
                className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                  formData.userType === "seeker"
                    ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950"
                    : "border-neutral-200 hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-500 dark:hover:bg-primary-950"
                }`}
              >
                {formData.userType === "seeker" ? (
                  <div className="relative">
                    <User size={32} className="text-primary-500" />
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500">
                      <Check size={10} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <User size={32} className="text-neutral-400" />
                )}
                <span className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Je cherche
                </span>
                <Badge variant={formData.userType === "seeker" ? "primary" : "neutral"}>
                  Employe
                </Badge>
              </button>

              <button
                type="button"
                onClick={() => update("userType", "employer")}
                className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                  formData.userType === "employer"
                    ? "border-secondary-500 bg-secondary-50 dark:border-secondary-400 dark:bg-secondary-950"
                    : "border-neutral-200 hover:border-secondary-300 hover:bg-secondary-50 dark:border-neutral-700 dark:hover:border-secondary-500 dark:hover:bg-secondary-950"
                }`}
              >
                {formData.userType === "employer" ? (
                  <div className="relative">
                    <Briefcase size={32} className="text-secondary-500" />
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500">
                      <Check size={10} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <Briefcase size={32} className="text-neutral-400" />
                )}
                <span className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Je recrute
                </span>
                <Badge variant={formData.userType === "employer" ? "secondary" : "neutral"}>
                  Employeur
                </Badge>
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Step 1: Personal info                                            */}
        {/* ---------------------------------------------------------------- */}
        {step === 1 && (
          <div className="space-y-4">
            <Input
              label="Prenom"
              type="text"
              placeholder="Votre prenom"
              leftIcon={<User size={18} />}
              value={formData.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              required
              autoComplete="given-name"
              error={state.fieldErrors?.firstName?.[0]}
            />

            <Input
              label="Age"
              type="number"
              placeholder="Ex: 25"
              value={formData.age}
              onChange={(e) => update("age", e.target.value)}
              required
              min={18}
              max={99}
              error={state.fieldErrors?.age?.[0]}
            />

            <Input
              label="Numero WhatsApp"
              type="tel"
              placeholder="+236 74 XX XX XX"
              leftIcon={<Phone size={18} />}
              value={formData.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              required
              autoComplete="tel"
              error={state.fieldErrors?.whatsapp?.[0]}
            />

            <Input
              label="Autre numero (optionnel)"
              type="tel"
              placeholder="+236 76 XX XX XX"
              leftIcon={<Phone size={18} />}
              value={formData.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              error={state.fieldErrors?.phone?.[0]}
            />

            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Metier / Domaine <span className="text-error-500">*</span>
              </label>
              <select
                value={formData.jobType}
                onChange={(e) => update("jobType", e.target.value)}
                className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-body-sm text-neutral-900 shadow-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                required
              >
                <option value="">Selectionnez un metier</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {state.fieldErrors?.jobType?.[0] && (
                <p className="text-body-xs text-error-500">
                  {state.fieldErrors.jobType[0]}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Experience / Motivation (optionnel)
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => update("experience", e.target.value)}
                placeholder="Decrivez votre experience ou votre motivation..."
                rows={3}
                maxLength={500}
                className="block w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-body-sm text-neutral-900 shadow-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
              <p className="text-right text-body-xs text-neutral-400">
                {formData.experience.length}/500
              </p>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Step 2: Location                                                 */}
        {/* ---------------------------------------------------------------- */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Prefecture / Region <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <select
                  value={formData.region}
                  onChange={(e) => update("region", e.target.value)}
                  className="block w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-body-sm text-neutral-900 shadow-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                  required
                >
                  <option value="">Selectionnez une region</option>
                  {RCA_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              {state.fieldErrors?.region?.[0] && (
                <p className="text-body-xs text-error-500">
                  {state.fieldErrors.region[0]}
                </p>
              )}
            </div>

            <Input
              label="Ville"
              type="text"
              placeholder="Ex: Bangui"
              leftIcon={<MapPin size={18} />}
              value={formData.city}
              onChange={(e) => update("city", e.target.value)}
              required
              error={state.fieldErrors?.city?.[0]}
            />

            <Input
              label="Quartier (optionnel)"
              type="text"
              placeholder="Ex: Lakouanga"
              leftIcon={<MapPin size={18} />}
              value={formData.neighborhood}
              onChange={(e) => update("neighborhood", e.target.value)}
              error={state.fieldErrors?.neighborhood?.[0]}
            />
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Step 3: Password                                                 */}
        {/* ---------------------------------------------------------------- */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Mot de passe <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
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

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          passwordStrength >= level
                            ? level <= 1
                              ? "bg-error-500"
                              : level <= 2
                                ? "bg-warning-500"
                                : level <= 3
                                  ? "bg-accent-500"
                                  : "bg-secondary-500"
                            : "bg-neutral-200 dark:bg-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <ul className="space-y-1">
                    {[
                      { key: "length", label: "Au moins 8 caracteres" },
                      { key: "uppercase", label: "Au moins une majuscule" },
                      { key: "number", label: "Au moins un chiffre" },
                      { key: "special", label: "Au moins un caractere special" },
                    ].map(({ key, label }) => (
                      <li
                        key={key}
                        className={`flex items-center gap-2 text-body-xs ${
                          passwordChecks[key as keyof typeof passwordChecks]
                            ? "text-secondary-600 dark:text-secondary-400"
                            : "text-neutral-400"
                        }`}
                      >
                        <div
                          className={`h-3 w-3 rounded-full border ${
                            passwordChecks[key as keyof typeof passwordChecks]
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
            </div>

            <div className="space-y-1">
              <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                Confirmer le mot de passe <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repetez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className={`block w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-body-sm text-neutral-900 shadow-sm transition-all focus:outline-none focus:ring-2 dark:bg-neutral-900 dark:text-neutral-100 ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
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
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-body-xs text-error-500">
                    Les mots de passe ne correspondent pas.
                  </p>
                )}
            </div>

            <p className="rounded-xl bg-neutral-50 p-3 text-body-xs text-neutral-500 dark:bg-neutral-900">
              En creant votre compte, vous acceptez nos{" "}
              <a
                href="/terms"
                target="_blank"
                className="underline hover:text-primary-500"
              >
                Conditions d'utilisation
              </a>
              .
            </p>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Navigation buttons                                               */}
        {/* ---------------------------------------------------------------- */}
        <div className={`mt-6 flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={isPending}
            >
              <ArrowLeft size={18} />
              Retour
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={step === 0 ? "w-full" : ""}
            >
              Continuer
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={isPending || !canProceed()}
            >
              {isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creation du compte...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Creer mon compte
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
