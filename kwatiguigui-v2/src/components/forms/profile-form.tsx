"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  X,
  Check,
  Save,
  Phone,
  MessageSquare,
  MapPin,
  Map,
  Briefcase,
  Calendar,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Upload,
  FileText,
  Trash2,
  Crown,
  CheckCircle,
  User,
  Users,
  AtSign,
  Camera,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

function WhatsappIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function GitHubIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.058 1.278.262 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.148-.262 2.913-.558.788-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.058-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

import { updateProfile, resendVerificationEmail, updateExperience, updateAvatar, updateCV, deleteCV, updateCvPublic } from "@/lib/actions/profile";
import type { ActionResult } from "@/lib/auth/actions";
import { JOB_TYPES, EXPERIENCE_LEVELS, EXPERIENCE_VALUES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ProfileFormProps {
  initialValues: {
    first_name: string;
    last_name: string;
    username: string;
    date_of_birth: string;
    phone: string;
    whatsapp: string;
    city: string;
    neighborhood: string;
    job_type: string;
    experience: string;
    linkedin_url: string;
    facebook_url: string;
    instagram_url: string;
    github_url: string;
    cv_path: string | null;
    cv_filename: string | null;
    cv_size: number | null;
    cv_public: boolean;
  };
  email: string;
  emailVerified: boolean;
  userType: "seeker" | "employer";
  isPremium: boolean;
  avatarUrl: string | null;
  cvSignedUrl: string | null;
}

const initialState: ActionResult = { success: false };

// ---------------------------------------------------------------------------
// Email verification row (read-only + resend button)
// ---------------------------------------------------------------------------
function EmailVerificationRow({
  email,
  emailVerified,
}: {
  email: string;
  emailVerified: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  async function handleResend() {
    setSending(true);
    setResendError(null);
    const result = await resendVerificationEmail();
    setSending(false);
    if (result.success) setSent(true);
    else setResendError(result.error ?? "Erreur inconnue");
  }

  return (
    <div className="flex items-start gap-3 border-b border-neutral-100 py-3.5 dark:border-neutral-800">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
        <Mail size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          Adresse email
        </p>
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {email}
        </p>
        {!emailVerified && (
          <div className="mt-2">
            {sent ? (
              <p className="text-xs text-secondary-600 dark:text-secondary-400">
                Email de vérification envoyé — vérifiez votre boite mail.
              </p>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={sending}
                  className="text-xs font-medium text-primary-600 underline underline-offset-2 transition hover:text-primary-700 disabled:opacity-50 dark:text-primary-400"
                >
                  {sending ? "Envoi en cours…" : "Renvoyer l'email de vérification"}
                </button>
                {resendError && (
                  <p className="mt-1 text-xs text-error-500">{resendError}</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {emailVerified ? (
        <span className="mt-1 flex shrink-0 items-center gap-1 rounded-full bg-secondary-50 px-2.5 py-1 text-xs font-semibold text-secondary-700 dark:bg-secondary-950/30 dark:text-secondary-400">
          <ShieldCheck size={12} />
          Vérifié
        </span>
      ) : (
        <span className="mt-1 flex shrink-0 items-center gap-1 rounded-full bg-warning-50 px-2.5 py-1 text-xs font-semibold text-warning-700 dark:bg-warning-950/30 dark:text-warning-400">
          <ShieldAlert size={12} />
          Non vérifié
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Editable field row
// ---------------------------------------------------------------------------
function EditableRow({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  icon,
  isEditing,
  onToggle,
  error,
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode;
  isEditing: boolean;
  onToggle: () => void;
  error?: string;
  hint?: string; // affiché uniquement quand le champ est vide et non en édition
}) {
  const filled = !!defaultValue;
  return (
    <div className="group flex items-start gap-3 border-b border-neutral-100 py-3.5 last:border-0 dark:border-neutral-800">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          {label}
        </p>
        {isEditing ? (
          <input
            name={name}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoFocus
            className="w-full rounded-lg border border-primary-300 bg-white px-3 py-1.5 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-primary-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        ) : (
          <input
            name={name}
            type={type}
            defaultValue={defaultValue}
            readOnly
            tabIndex={-1}
            className="w-full cursor-default border-0 bg-transparent p-0 text-sm font-medium text-neutral-900 outline-none dark:text-neutral-100"
          />
        )}
        {error && (
          <p className="mt-1 text-xs text-error-500">{error}</p>
        )}
        {hint && !filled && !isEditing && (
          <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-primary-500 dark:text-primary-400">
            <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary-300 text-[8px] font-bold leading-none text-primary-500 dark:border-primary-700 dark:text-primary-400">
              i
            </span>
            {hint}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onToggle}
        title={isEditing ? "Annuler" : `Modifier ${label.toLowerCase()}`}
        className={[
          "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all",
          isEditing
            ? "bg-error-50 text-error-500 hover:bg-error-100 dark:bg-error-950/30 dark:text-error-400"
            : "opacity-0 group-hover:opacity-100 bg-neutral-100 text-neutral-400 hover:bg-primary-50 hover:text-primary-600 dark:bg-neutral-800 dark:hover:bg-primary-950/30 dark:hover:text-primary-400",
        ].join(" ")}
      >
        {isEditing ? <X size={13} /> : <Pencil size={13} />}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section card
// ---------------------------------------------------------------------------
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-100 px-5 py-3.5 dark:border-neutral-800">
        <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </h2>
      </div>
      <div className="px-5 py-1">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function ProfileForm({
  initialValues,
  email,
  emailVerified,
  userType,
  isPremium,
  avatarUrl,
  cvSignedUrl,
}: ProfileFormProps) {
  const [state, action, isPending] = useActionState(updateProfile, initialState);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const skipConfirmRef = useRef(false);

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state.success]);

  // Track which fields are in edit mode
  const [editing, setEditing] = useState<Set<string>>(new Set());

  // Job type + experience controlled state (for select/pills)
  const [jobType, setJobType] = useState(initialValues.job_type);
  const [experience, setExperience] = useState(initialValues.experience);
  // Controls whether the custom numeric input is visible (user clicked "Autres / Préciser")
  const [customInputVisible, setCustomInputVisible] = useState(false);

  // ── Avatar upload state ────────────────────────────────────────────────
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  async function handleSaveAvatar() {
    if (!avatarFile) return;
    setAvatarSaving(true);
    setAvatarError(null);
    const fd = new FormData();
    fd.set("avatar", avatarFile);
    const result = await updateAvatar(fd);
    setAvatarSaving(false);
    if (result.success) {
      setAvatarFile(null);
      window.location.reload();
    } else {
      setAvatarError(result.error ?? "Erreur inconnue");
    }
  }

  // ── Experience mini-save state ─────────────────────────────────────────
  const [expSaving, setExpSaving] = useState(false);
  const [expError, setExpError] = useState<string | null>(null);

  async function handleSaveExperience() {
    if (!experience.trim()) return;
    setExpSaving(true);
    setExpError(null);
    const result = await updateExperience(experience);
    setExpSaving(false);
    if (result.success) {
      setCustomInputVisible(false);
      window.location.reload();
    } else {
      setExpError(result.error ?? "Erreur inconnue");
    }
  }

  // ── CV upload state ────────────────────────────────────────────────────
  const [cvFile, setCvFile]         = useState<File | null>(null);
  const [cvDragging, setCvDragging] = useState(false);
  const [cvSaving, setCvSaving]     = useState(false);
  const [cvDeleting, setCvDeleting] = useState(false);
  const [cvError, setCvError]       = useState<string | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Derive whether the saved CV is a PDF (to know if we can show the iframe)
  const savedCvIsPDF = initialValues.cv_path?.endsWith(".pdf") ?? false;
  // Derive for the newly selected (not yet uploaded) file
  const pendingCvIsPDF = cvFile?.type === "application/pdf";

  // ── CV public sharing toggle ───────────────────────────────────────────
  const [cvPublic, setCvPublic]         = useState(initialValues.cv_public);
  const [cvPublicSaving, setCvPublicSaving] = useState(false);
  const [cvPublicError, setCvPublicError]   = useState<string | null>(null);

  async function handleToggleCvPublic(next: boolean) {
    setCvPublicSaving(true);
    setCvPublicError(null);
    const result = await updateCvPublic(next);
    setCvPublicSaving(false);
    if (result.success) {
      setCvPublic(next);
    } else {
      setCvPublicError(result.error ?? "Erreur inconnue");
    }
  }

  async function handleSaveCV() {
    if (!cvFile) return;
    setCvSaving(true);
    setCvError(null);
    const fd = new FormData();
    fd.set("cv", cvFile);
    const result = await updateCV(fd);
    setCvSaving(false);
    if (result.success) {
      setCvFile(null);
      window.location.reload();
    } else {
      setCvError(result.error ?? "Erreur inconnue");
    }
  }

  async function handleDeleteCV() {
    setCvDeleting(true);
    setCvError(null);
    const result = await deleteCV();
    setCvDeleting(false);
    if (result.success) {
      window.location.reload();
    } else {
      setCvError(result.error ?? "Erreur inconnue");
    }
  }

  // Format bytes → human-readable size
  function formatSize(bytes: number): string {
    if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
    return `${Math.round(bytes / 1024)} Ko`;
  }

  const toggle = (field: string) =>
    setEditing((prev) => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });

  // ── Complétude du profil (pondérée par importance métier) ────────────────
  // Règle : "rempli" = l'utilisateur a fait un choix, quelle que soit la valeur.
  // "Aucune expérience" (none) = champ rempli — la complétude ne juge pas le niveau.
  // Total max = 100 points.
  const expFilled = experience !== "";  // "" = jamais touché | "none" = choix honnête ✓
  const completionPoints =
    (!!avatarPreview ? 20 : 0)  // Photo — signal #1 de confiance
    + (!!jobType ? 15 : 0)  // Poste / secteur — critère de recherche #1
    + (expFilled ? 15 : 0)  // Expérience — rempli si l'utilisateur a choisi
    + (emailVerified ? 10 : 0)  // Email vérifié — crédibilité identité
    + (!!initialValues.city ? 10 : 0)  // Ville — matching géographique
    + (!!initialValues.first_name ? 8 : 0)  // Prénom — identité de base
    + (!!initialValues.phone ? 8 : 0)  // Téléphone — contact principal
    + (!!initialValues.whatsapp ? 7 : 0)  // WhatsApp — contact secondaire (RCA)
    + (!!initialValues.last_name ? 4 : 0)  // Nom — identité complète
    + (!!initialValues.date_of_birth ? 3 : 0); // Date de naissance — qualification âge
  // → Maximum : 100 points

  const completionPercentage = Math.min(100, completionPoints);

  // ── Niveau d'expérience (aligné exactement sur les valeurs prédéfinies) ──
  // Borne custom "X ans +" → même découpage que les pills :
  //   1-2 ans → Junior (≡ "1+"),  3-4 → Confirmé (≡ "3+"),
  //   5-9    → Senior  (≡ "5+"),  10-14 → Expert  (≡ "10+"), 15+ → Vétéran
  const { expLevel, expLabel } = (() => {
    const exp = experience;
    if (!exp || exp === "none") return { expLevel: 0, expLabel: "Débutant" };
    if (exp === "1+") return { expLevel: 1, expLabel: "Junior" };
    if (exp === "3+") return { expLevel: 2, expLabel: "Confirmé" };
    if (exp === "5+") return { expLevel: 3, expLabel: "Senior" };
    if (exp === "10+") return { expLevel: 4, expLabel: "Expert" };
    if (exp === "15+" || exp === "20+") return { expLevel: 5, expLabel: "Vétéran" };
    // Valeur custom "X ans +" — bornes identiques aux pills prédéfinies
    const y = parseInt(exp.replace(/\D/g, ""), 10);
    if (!y || y === 0) return { expLevel: 0, expLabel: "Débutant" };
    if (y <= 2) return { expLevel: 1, expLabel: "Junior" }; // 1-2 ≡ "1+"
    if (y <= 4) return { expLevel: 2, expLabel: "Confirmé" }; // 3-4 ≡ "3+"
    if (y <= 9) return { expLevel: 3, expLabel: "Senior" }; // 5-9 ≡ "5+"
    if (y <= 14) return { expLevel: 4, expLabel: "Expert" }; // 10-14 ≡ "10+"
    return { expLevel: 5, expLabel: "Vétéran" };          // 15+ ≡ "15+"
  })();

  // ── Score d'attractivité (indépendant de la complétude) ──────────────────
  // Formule de base : complétude (55%) + expérience (35%) + bonus honnêteté (10%)
  // + bonus présence en ligne (plafonné à +10 pts, purement additif)
  //
  // Barème réseau :
  //   LinkedIn  +4 pts — signal professionnel fort
  //   GitHub    +4 pts — signal dev/IT fort
  //   Facebook  +1 pt  — présence basique
  //   Instagram +1 pt  — présence basique
  //   Max : 10 pts. Score final plafonné à 100.
  const expScore = (expLevel / 5) * 100;
  const honestyBonus = expFilled ? 100 : 0;
  const baseScore = Math.round(
    completionPercentage * 0.55
    + expScore * 0.35
    + honestyBonus * 0.10,
  );
  // Bonus réseau (purement additif, plafonné 8 pts) :
  //   LinkedIn 4 pts — réseau professionnel fort
  //   Facebook 1,5 + Instagram 1,5 = 3 pts — présence sociale
  //   GitHub 1 pt — signal dev/IT (pas universel → faible poids)
  const socialBonus = Math.min(
    8,
    (initialValues.linkedin_url ? 4 : 0)
    + (initialValues.facebook_url ? 1.5 : 0)
    + (initialValues.instagram_url ? 1.5 : 0)
    + (initialValues.github_url ? 1 : 0),
  );
  const attractivityScore = Math.min(100, Math.round(baseScore + socialBonus));
  const attractivityLabel =
    attractivityScore >= 90 ? "Excellent" :
      attractivityScore >= 80 ? "Très bon" :
        attractivityScore >= 65 ? "Bon" :
          attractivityScore >= 45 ? "Moyen" : "Faible";
  const attractivityColor =
    attractivityScore >= 80 ? "#16A34A" :
      attractivityScore >= 65 ? "#2563EB" :
        attractivityScore >= 45 ? "#D97706" : "#EF4444";

  // ── Cohérence âge / expérience (détection fraude frontend) ──────────────
  // Âge légal minimum de travail en RCA (Code du Travail, Art. 259)
  const MIN_WORK_AGE = 15;

  const ageFromDob = (() => {
    const dob = initialValues.date_of_birth;
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age >= 0 ? age : null;
  })();

  const claimedExpYears = (() => {
    const exp = experience;
    if (!exp || exp === "none") return 0;
    const MAP: Record<string, number> = {
      "1+": 1, "3+": 3, "5+": 5, "10+": 10, "15+": 15, "20+": 20,
    };
    if (exp in MAP) return MAP[exp] ?? 0;
    const y = parseInt(exp.replace(/\D/g, ""), 10);
    return isNaN(y) ? 0 : y;
  })();

  const maxPossibleExp = ageFromDob !== null ? Math.max(0, ageFromDob - MIN_WORK_AGE) : null;

  // "impossible" = mathématiquement impossible (fraude certaine)
  // "unknown"    = pas assez de données (DOB ou expérience manquante)
  // "ok"         = combinaison cohérente
  const coherenceState: "ok" | "impossible" | "unknown" =
    ageFromDob === null || claimedExpYears === 0
      ? "unknown"
      : claimedExpYears > maxPossibleExp!
        ? "impossible"
        : "ok";

  // ── Cercle SVG (avatar w-24 = 96px, SVG w-28 = 112px, cx=cy=56) ─────────
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (completionPercentage / 100) * circleCircumference;
  const strokeColor =
    completionPercentage >= 80 ? "#22C55E" :
      completionPercentage >= 50 ? "#F59E0B" : "#EF4444";

  const avatarLetter =
    (initialValues.first_name.charAt(0) || "K").toUpperCase();
  const fullName = [initialValues.first_name, initialValues.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <form
      ref={formRef}
      action={action}
      className="space-y-6"
      onSubmit={(e) => {
        if (!skipConfirmRef.current) {
          e.preventDefault();
          setShowConfirmModal(true);
        }
      }}
    >
      {/* ── Confirm Modal ─────────────────────────────────────── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">Confirmer la sauvegarde</h3>
              <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                Voulez-vous vraiment enregistrer ces informations ? Vos données seront écrasées et mises à jour.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmModal(false);
                    if (formRef.current) {
                      skipConfirmRef.current = true;
                      formRef.current.requestSubmit();
                    }
                  }}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition"
                >
                  Oui, enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Success / Error banner ─────────────────────────────────────── */}
      {state.success && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-secondary-200 bg-secondary-50 p-4 text-secondary-800 dark:border-secondary-800 dark:bg-secondary-950/30 dark:text-secondary-300"
        >
          <Check className="h-5 w-5 shrink-0 text-secondary-500" />
          <p className="text-sm font-medium">Profil mis à jour avec succès.</p>
        </div>
      )}
      {state.error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-error-200 bg-error-50 p-4 text-error-700 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300"
        >
          <X className="h-5 w-5 shrink-0 text-error-500" />
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      {/* ── Hero : avatar + identité + indicateurs de performance ─────────── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

        {/* Top — avatar + identity */}
        <div className="flex flex-col items-center gap-6 p-5 sm:flex-row sm:items-start sm:p-6">

          {/* ── Avatar zone ────────────────────────────────────────────────── */}
          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="relative">
              {/* SVG progress ring (w-28 = 112px, avatar inside is w-24 = 96px) */}
              <svg
                className="absolute -inset-2 h-28 w-28 -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="56" cy="56" r={circleRadius}
                  stroke="currentColor" strokeWidth="4" fill="transparent"
                  className="text-neutral-100 dark:text-neutral-800"
                />
                <circle
                  cx="56" cy="56" r={circleRadius}
                  stroke={strokeColor} strokeWidth="4" fill="transparent"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Clickable avatar — full hover overlay */}
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="group relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                title="Changer la photo de profil"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Photo de profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-primary-100 dark:bg-primary-900">
                    <span className="font-heading text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {avatarLetter}
                    </span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Camera size={20} className="text-white" />
                  <span className="text-[10px] font-semibold text-white">Modifier</span>
                </div>
              </button>

              {/* Completion % badge */}
              <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-200 bg-white px-2 py-0.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                <span className="text-[10px] font-bold" style={{ color: strokeColor }}>
                  {completionPercentage}%
                </span>
              </div>

              {/* Hidden file input */}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                  setAvatarError(null);
                }}
              />
            </div>

            {/* CTA text — only when no pending file */}
            {!avatarFile && (
              <div className="mt-1 flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="text-xs font-medium text-primary-600 transition hover:underline dark:text-primary-400"
                >
                  {avatarPreview ? "Changer la photo" : "+ Ajouter une photo"}
                </button>
                {!avatarPreview && (
                  <p className="flex items-center gap-1 text-[11px] font-medium text-primary-500 dark:text-primary-400">
                    <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary-300 text-[8px] font-bold leading-none text-primary-500 dark:border-primary-700 dark:text-primary-400">
                      i
                    </span>
                    Une photo inspire confiance aux recruteurs · +20 pts de complétude
                  </p>
                )}
              </div>
            )}

            {/* Save / Cancel after selection */}
            {avatarFile && (
              <div className="mt-1 flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSaveAvatar}
                  disabled={avatarSaving}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-secondary-700 disabled:opacity-50"
                >
                  <Save size={12} />
                  {avatarSaving ? "Enregistrement…" : "Enregistrer la photo"}
                </button>
                <button
                  type="button"
                  onClick={() => { setAvatarFile(null); setAvatarPreview(avatarUrl); setAvatarError(null); }}
                  className="text-xs text-neutral-400 transition hover:text-neutral-600"
                >
                  Annuler
                </button>
                {avatarError && (
                  <p className="max-w-[160px] text-center text-xs text-error-500">{avatarError}</p>
                )}
              </div>
            )}
          </div>

          {/* ── Identity summary ──────────────────────────────────────────── */}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {fullName || "Votre nom complet"}
              </h1>
              {isPremium && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700 dark:bg-accent-900/40 dark:text-accent-400">
                  <Crown size={11} />
                  Premium
                </span>
              )}
            </div>

            {completionPercentage === 100 ? (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-xs font-semibold text-success-700 dark:bg-success-950/30 dark:text-success-400">
                <CheckCircle size={12} />
                Profil complet
              </span>
            ) : (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-error-50 px-2 py-0.5 text-xs font-semibold text-error-700 dark:bg-error-950/30 dark:text-error-400">
                <X size={12} />
                Profil incomplet
              </span>
            )}

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-neutral-500 sm:justify-start dark:text-neutral-400">
              {initialValues.job_type && (
                <span className="flex items-center gap-1.5">
                  <Image src="/images/job.png" alt="Métier" width={13} height={13} className="opacity-60 dark:invert" />
                  {initialValues.job_type}
                </span>
              )}
              {initialValues.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-neutral-400" />
                  {initialValues.city}
                  {initialValues.neighborhood ? `, ${initialValues.neighborhood}` : ""}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-neutral-400" />
                {userType === "seeker" ? "Chercheur d'emploi" : "Employeur"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Performance indicators panel ─────────────────────────────────── */}
        <div className="grid grid-cols-3 divide-x divide-neutral-100 border-t border-neutral-100 bg-neutral-50/70 px-5 py-4 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-white/[0.02]">

          {/* 1. Complétude du profil */}
          <div className="flex flex-col gap-2 pr-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Complétude
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${completionPercentage}%`, backgroundColor: strokeColor }}
                />
              </div>
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {completionPercentage}%
              </span>
            </div>
          </div>

          {/* 2. Niveau d'expérience — 5 blocs + label + indicateur cohérence */}
          <div className="flex flex-col gap-2 px-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Expérience
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={[
                      "h-2 w-4 rounded-sm transition-all duration-500",
                      i <= expLevel
                        ? coherenceState === "impossible"
                          ? "bg-error-500"
                          : "bg-primary-500"
                        : "bg-neutral-200 dark:bg-neutral-700",
                    ].join(" ")}
                  />
                ))}
              </div>
              <span className={[
                "whitespace-nowrap text-xs font-semibold",
                coherenceState === "impossible"
                  ? "text-error-600 dark:text-error-400"
                  : "text-primary-600 dark:text-primary-400",
              ].join(" ")}>
                {expLabel}
              </span>
              {coherenceState === "impossible" && (
                <AlertTriangle size={12} className="shrink-0 text-error-500" />
              )}
            </div>
            {coherenceState === "impossible" && ageFromDob !== null && (
              <p className="text-[10px] font-medium text-error-500">
                Max. {maxPossibleExp} an(s) à {ageFromDob} ans
              </p>
            )}
          </div>

          {/* 3. Score d'attractivité employeur */}
          <div className="flex flex-col gap-1.5 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Attractivité
            </p>
            <div className="flex items-end gap-1.5">
              <span
                className="text-2xl font-black leading-none tabular-nums"
                style={{ color: attractivityColor }}
              >
                {attractivityScore}
              </span>
              <div className="mb-0.5 flex flex-col leading-none">
                <span className="text-[9px] text-neutral-400">/100</span>
                <span
                  className="mt-0.5 text-[10px] font-bold"
                  style={{ color: attractivityColor }}
                >
                  {attractivityLabel}
                </span>
              </div>
            </div>
            <a
              href="/aide/algorithme"
              className="mt-0.5 text-[9px] text-neutral-400 underline-offset-2 transition-colors hover:text-primary-500 hover:underline"
            >
              Comment ce score est calculé &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* ── Identité personnelle ──────────────────────────────────────────── */}
      <SectionCard title="Identité personnelle">
        <EditableRow
          label="Prénom(s)"
          name="first_name"
          defaultValue={initialValues.first_name}
          placeholder="Votre prénom"
          icon={<User size={15} />}
          isEditing={editing.has("first_name")}
          onToggle={() => toggle("first_name")}
          error={state.fieldErrors?.first_name?.[0]}
          hint="Votre prénom est indispensable pour être identifié · +8 pts de complétude"
        />
        <EditableRow
          label="Nom de famille"
          name="last_name"
          defaultValue={initialValues.last_name}
          placeholder="Votre nom de famille"
          icon={<Users size={15} />}
          isEditing={editing.has("last_name")}
          onToggle={() => toggle("last_name")}
          error={state.fieldErrors?.last_name?.[0]}
          hint="Un nom complet renforce votre crédibilité · +4 pts de complétude"
        />
        <EditableRow
          label="Nom d'utilisateur"
          name="username"
          defaultValue={initialValues.username}
          placeholder="ex: KwatiguiguiUser99"
          icon={<AtSign size={15} />}
          isEditing={editing.has("username")}
          onToggle={() => toggle("username")}
          error={state.fieldErrors?.username?.[0]}
        />
        <EditableRow
          label="Date de naissance"
          name="date_of_birth"
          defaultValue={initialValues.date_of_birth}
          type="date"
          icon={<Calendar size={15} />}
          isEditing={editing.has("date_of_birth")}
          onToggle={() => toggle("date_of_birth")}
          error={state.fieldErrors?.date_of_birth?.[0]}
          hint="Votre âge qualifie votre profil auprès des recruteurs · +3 pts de complétude"
        />
      </SectionCard>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <SectionCard title="Contact">
        {/* Email — lecture seule + statut vérification + renvoi */}
        <EmailVerificationRow email={email} emailVerified={emailVerified} />

        <EditableRow
          label="Téléphone principal"
          name="phone"
          defaultValue={initialValues.phone}
          placeholder="+236 XX XX XX XX"
          type="tel"
          icon={<Phone size={15} />}
          isEditing={editing.has("phone")}
          onToggle={() => toggle("phone")}
          error={state.fieldErrors?.phone?.[0]}
          hint="Votre numéro principal permet aux recruteurs de vous joindre · +8 pts de complétude"
        />
        <EditableRow
          label="Numéro WhatsApp"
          name="whatsapp"
          defaultValue={initialValues.whatsapp}
          placeholder="+236 XX XX XX XX (optionnel)"
          type="tel"
          icon={<WhatsappIcon size={16} className="text-[#25D366]" />}
          isEditing={editing.has("whatsapp")}
          onToggle={() => toggle("whatsapp")}
          error={state.fieldErrors?.whatsapp?.[0]}
          hint="WhatsApp est le moyen de contact privilégié en RCA · +7 pts de complétude"
        />
      </SectionCard>

      {/* ── Localisation ─────────────────────────────────────────────────── */}
      <SectionCard title="Localisation">
        <EditableRow
          label="Ville"
          name="city"
          defaultValue={initialValues.city}
          placeholder="Bangui, Berbérati…"
          icon={<MapPin size={15} />}
          isEditing={editing.has("city")}
          onToggle={() => toggle("city")}
          error={state.fieldErrors?.city?.[0]}
          hint="Votre ville active le matching géographique avec les recruteurs · +10 pts de complétude"
        />
        <EditableRow
          label="Quartier"
          name="neighborhood"
          defaultValue={initialValues.neighborhood}
          placeholder="Votre quartier (optionnel)"
          icon={<Map size={15} />}
          isEditing={editing.has("neighborhood")}
          onToggle={() => toggle("neighborhood")}
          error={state.fieldErrors?.neighborhood?.[0]}
        />
      </SectionCard>

      {/* ── Profil professionnel ──────────────────────────────────────────── */}
      <SectionCard title="Profil professionnel">
        {/* Job type */}
        <div className="group flex items-start gap-3 border-b border-neutral-100 py-3.5 dark:border-neutral-800">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Image src="/images/job.png" alt="Métier" width={16} height={16} className="opacity-70 dark:invert" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
              {userType === "employer" ? "Secteur d'activité" : "Poste recherché"}
            </p>
            {/* Hidden input for jobType */}
            <input type="hidden" name="job_type" value={jobType} />
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-neutral-900 outline-none dark:text-neutral-100"
            >
              <option value="">— Sélectionner —</option>
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {state.fieldErrors?.job_type?.[0] && (
              <p className="mt-1 text-xs text-error-500">
                {state.fieldErrors.job_type[0]}
              </p>
            )}
            {!jobType && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-primary-500 dark:text-primary-400">
                <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary-300 text-[8px] font-bold leading-none text-primary-500 dark:border-primary-700 dark:text-primary-400">
                  i
                </span>
                Votre poste est le critère de recherche n°1 des recruteurs · +15 pts de complétude
              </p>
            )}
          </div>
          <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 opacity-0 transition group-hover:opacity-100 dark:bg-neutral-800">
            <Pencil size={13} />
          </div>
        </div>

        {/* Experience pills */}
        <div className="flex items-start gap-3 py-3.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
            <GraduationCap size={15} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
              Expérience
            </p>

            {/* Pills row — standard values + injected custom pill when one is saved */}
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map(({ value, label }) => {
                const isActive =
                  value === "other"
                    ? customInputVisible
                    : !customInputVisible && experience === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      if (value === "other") {
                        setCustomInputVisible(true);
                        setExperience("");
                      } else {
                        setCustomInputVisible(false);
                        setExperience(value);
                      }
                    }}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                      isActive
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}

              {/* Injected custom pill — shown after standard pills when a non-standard value
                  is saved (e.g. "5 ans +") and the user is not currently editing */}
              {!customInputVisible &&
                experience !== "" &&
                !EXPERIENCE_VALUES.includes(experience as any) && (
                  <button
                    type="button"
                    title="Cliquez pour modifier"
                    onClick={() => {
                      setCustomInputVisible(true);
                      // Pre-populate input with the digit portion of the saved value
                      setExperience(experience.replace(/[^0-9]/g, ""));
                    }}
                    className="rounded-full border border-primary-500 bg-primary-500 px-3 py-1 text-xs font-medium text-white"
                  >
                    {experience}
                  </button>
                )}
            </div>

            {/* Hint — visible seulement si aucune expérience sélectionnée */}
            {!experience && (
              <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary-500 dark:text-primary-400">
                <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary-300 text-[8px] font-bold leading-none text-primary-500 dark:border-primary-700 dark:text-primary-400">
                  i
                </span>
                Indiquez votre niveau d'expérience pour affiner votre profil · +15 pts de complétude
              </p>
            )}

            {/* Alerte cohérence âge / expérience — visible dès sélection d'une pill */}
            {coherenceState === "impossible" && ageFromDob !== null && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-error-200 bg-error-50 px-3 py-2.5 dark:border-error-800 dark:bg-error-950/30">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-error-500" />
                <div>
                  <p className="text-xs font-semibold text-error-700 dark:text-error-300">
                    Expérience impossible à votre âge
                  </p>
                  <p className="mt-0.5 text-xs text-error-600 dark:text-error-400">
                    À <strong>{ageFromDob} ans</strong>, l'expérience maximale possible est de{" "}
                    <strong>{maxPossibleExp} an(s)</strong> (âge légal de travail en RCA : {MIN_WORK_AGE} ans).
                    Déclarer <strong>{claimedExpYears} an(s)</strong> d'expérience sera refusé à l'enregistrement.
                  </p>
                </div>
              </div>
            )}

            {/* Custom numeric input + dedicated save — only when "Autres / Préciser" is active */}
            {customInputVisible ? (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  name="experience"
                  value={experience}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                    setExperience(onlyNums);
                  }}
                  placeholder="Années d'expérience (ex: 3)"
                  className={[
                    "w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition",
                    coherenceState === "impossible"
                      ? "border-error-400 bg-error-50 text-error-900 focus:ring-2 focus:ring-error-400/20 dark:border-error-700 dark:bg-error-950/20 dark:text-error-100"
                      : "border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
                  ].join(" ")}
                  autoFocus
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveExperience}
                    disabled={expSaving || !experience.trim() || coherenceState === "impossible"}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-secondary-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Check size={12} />
                    {expSaving ? "Enregistrement…" : "Enregistrer l'expérience"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomInputVisible(false);
                      setExperience(initialValues.experience);
                    }}
                    className="text-xs text-neutral-400 transition hover:text-neutral-600"
                  >
                    Annuler
                  </button>
                </div>
                {expError && (
                  <p className="text-xs text-error-500">{expError}</p>
                )}
              </div>
            ) : (
              <input type="hidden" name="experience" value={experience} />
            )}
          </div>
        </div>
      </SectionCard>

      {/* ── Liens sociaux ─────────────────────────────────────────────────── */}
      <SectionCard title="Liens sociaux">
        <EditableRow
          label="LinkedIn"
          name="linkedin_url"
          defaultValue={initialValues.linkedin_url}
          placeholder="https://linkedin.com/in/votre-profil ou nom d'utilisateur"
          icon={<LinkedInIcon size={15} className="text-[#0A66C2]" />}
          isEditing={editing.has("linkedin_url")}
          onToggle={() => toggle("linkedin_url")}
          error={state.fieldErrors?.linkedin_url?.[0]}
          hint="LinkedIn est le réseau professionnel n°1 · +4 pts d'attractivité"
        />
        <EditableRow
          label="Facebook"
          name="facebook_url"
          defaultValue={initialValues.facebook_url}
          placeholder="https://facebook.com/votre-page ou nom d'utilisateur"
          icon={<FacebookIcon size={15} className="text-[#1877F2]" />}
          isEditing={editing.has("facebook_url")}
          onToggle={() => toggle("facebook_url")}
          error={state.fieldErrors?.facebook_url?.[0]}
          hint="Votre page Facebook renforce votre présence en ligne · +1,5 pt d'attractivité"
        />
        <EditableRow
          label="Instagram"
          name="instagram_url"
          defaultValue={initialValues.instagram_url}
          placeholder="@votre_pseudo ou https://instagram.com/votre-profil"
          icon={<InstagramIcon size={15} className="text-[#E1306C]" />}
          isEditing={editing.has("instagram_url")}
          onToggle={() => toggle("instagram_url")}
          error={state.fieldErrors?.instagram_url?.[0]}
          hint="Votre compte Instagram élargit votre réseau · +1,5 pt d'attractivité"
        />
        <div className="border-t border-neutral-100 pt-3 pb-1 dark:border-neutral-800">
          <p className="mb-2 text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
            Vous êtes développeur ou IT ? Partagez votre profil.
          </p>
        </div>
        <EditableRow
          label="GitHub"
          name="github_url"
          defaultValue={initialValues.github_url}
          placeholder="https://github.com/votre-profil ou nom d'utilisateur"
          icon={<GitHubIcon size={15} className="text-neutral-700 dark:text-neutral-300" />}
          isEditing={editing.has("github_url")}
          onToggle={() => toggle("github_url")}
          error={state.fieldErrors?.github_url?.[0]}
          hint="Partagez vos projets et contributions open source · +1 pt d'attractivité"
        />
      </SectionCard>

      {/* ── Mon CV ───────────────────────────────────────────────────────── */}
      <SectionCard title="Mon CV">
        <div className="py-3 space-y-4">

          {/* ── Toggle partage employeurs ──────────────────────────────── */}
          <div
            className={[
              "flex items-start gap-4 rounded-2xl border px-4 py-3.5 transition-colors",
              cvPublic
                ? "border-secondary-200 bg-secondary-50 dark:border-secondary-800/40 dark:bg-secondary-950/20"
                : "border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/50",
            ].join(" ")}
          >
            {/* Icone */}
            <div
              className={[
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                cvPublic
                  ? "bg-secondary-100 text-secondary-600 dark:bg-secondary-900/40 dark:text-secondary-400"
                  : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800",
              ].join(" ")}
            >
              <Users size={17} />
            </div>

            {/* Texte */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Autoriser les recruteurs à lire et télécharger mon CV
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                {cvPublic
                  ? "Votre CV est visible par tous les recruteurs, agences et employeurs inscrits sur KWATIGUIGUI."
                  : "Activez cette option pour que les recruteurs et employeurs puissent consulter votre CV directement depuis votre annonce."}
              </p>
              {cvPublicError && (
                <p className="mt-1 text-xs text-error-500">{cvPublicError}</p>
              )}
            </div>

            {/* Toggle switch */}
            <button
              type="button"
              role="switch"
              aria-checked={cvPublic}
              disabled={cvPublicSaving || !initialValues.cv_path}
              onClick={() => handleToggleCvPublic(!cvPublic)}
              title={
                !initialValues.cv_path
                  ? "Importez d'abord un CV avant d'activer le partage"
                  : cvPublic
                  ? "Désactiver le partage"
                  : "Activer le partage"
              }
              className={[
                "relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                "disabled:cursor-not-allowed disabled:opacity-40",
                cvPublic
                  ? "bg-secondary-500 dark:bg-secondary-600"
                  : "bg-neutral-300 dark:bg-neutral-600",
              ].join(" ")}
            >
              <span
                className={[
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                  cvPublic ? "translate-x-5" : "translate-x-0",
                ].join(" ")}
              />
            </button>
          </div>

          {/* ── État 1 : fichier sélectionné, pas encore enregistré ─────── */}
          {cvFile && (
            <div className="space-y-3">
              {/* Barre d'info fichier */}
              <div className="flex items-center gap-3 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 dark:border-primary-800/50 dark:bg-primary-950/20">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {cvFile.name}
                  </p>
                  <p className="text-xs text-neutral-500">{formatSize(cvFile.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setCvFile(null); setCvError(null); }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-error-50 hover:text-error-500 dark:hover:bg-error-950/30"
                  title="Annuler"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Aperçu non disponible avant upload — les blob: URL sont bloquées par la CSP */}
              {pendingCvIsPDF && (
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                  L'aperçu sera disponible après enregistrement.
                </p>
              )}

              {/* Boutons save / cancel */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveCV}
                  disabled={cvSaving}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={14} />
                  {cvSaving ? "Enregistrement…" : "Enregistrer le CV"}
                </button>
                <button
                  type="button"
                  onClick={() => { setCvFile(null); setCvError(null); }}
                  className="text-sm text-neutral-400 transition hover:text-neutral-600"
                >
                  Annuler
                </button>
              </div>
              {cvError && <p className="text-xs text-error-500">{cvError}</p>}
            </div>
          )}

          {/* ── État 2 : CV déjà enregistré, aucun fichier en attente ───── */}
          {!cvFile && initialValues.cv_path && (
            <div className="space-y-3">
              {/* Info fichier sauvegardé */}
              <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-950/30 dark:text-secondary-400">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {initialValues.cv_filename ?? "cv.pdf"}
                  </p>
                  {initialValues.cv_size && (
                    <p className="text-xs text-neutral-500">{formatSize(initialValues.cv_size)}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {/* Téléchargement */}
                  {cvSignedUrl && (
                    <a
                      href={cvSignedUrl}
                      download={initialValues.cv_filename ?? "cv.pdf"}
                      className="flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 transition hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                    >
                      <Upload size={12} className="rotate-180" />
                      Télécharger
                    </a>
                  )}
                  {/* Suppression */}
                  <button
                    type="button"
                    onClick={handleDeleteCV}
                    disabled={cvDeleting}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-error-50 hover:text-error-500 disabled:opacity-40 dark:hover:bg-error-950/30 dark:hover:text-error-400"
                    title="Supprimer le CV"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Lecteur PDF inline — servi via proxy /api/cv/preview pour éviter X-Frame-Options */}
              {savedCvIsPDF && (
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                      Aperçu de votre CV
                    </span>
                    {cvSignedUrl && (
                      <a
                        href={cvSignedUrl}
                        download={initialValues.cv_filename ?? "cv.pdf"}
                        className="text-[11px] font-medium text-primary-600 transition hover:underline dark:text-primary-400"
                      >
                        Télécharger
                      </a>
                    )}
                  </div>
                  <iframe
                    src="/api/cv/preview#toolbar=0&navpanes=0"
                    className="h-80 w-full"
                    title="Votre CV"
                  />
                </div>
              )}

              {/* Avertissement futur algo IA */}
              <div className="flex items-start gap-2 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900/30">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-[9px] font-bold text-neutral-400 dark:border-neutral-600">
                  i
                </span>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  <span className="font-semibold text-neutral-500 dark:text-neutral-400">Vérification IA — bientôt disponible.</span>{" "}
                  Notre algorithme comparera automatiquement les informations de votre CV (nom, prénom, date de naissance) avec celles de votre profil pour détecter toute incohérence.
                </p>
              </div>

              {cvError && <p className="text-xs text-error-500">{cvError}</p>}

              {/* Bouton remplacer */}
              <div>
                <input
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) { setCvFile(file); setCvError(null); }
                  }}
                />
                <button
                  type="button"
                  onClick={() => cvInputRef.current?.click()}
                  className="text-xs font-medium text-primary-600 transition hover:underline dark:text-primary-400"
                >
                  Remplacer le CV
                </button>
              </div>
            </div>
          )}

          {/* ── État 3 : aucun CV, aucun fichier en attente ─────────────── */}
          {!cvFile && !initialValues.cv_path && (
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setCvDragging(true); }}
                onDragLeave={() => setCvDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setCvDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) { setCvFile(file); setCvError(null); }
                }}
                className={[
                  "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 text-center transition-all",
                  cvDragging
                    ? "border-primary-400 bg-primary-50 dark:border-primary-600 dark:bg-primary-950/20"
                    : "border-neutral-200 bg-neutral-50 hover:border-primary-300 hover:bg-primary-50/40 dark:border-neutral-700 dark:bg-neutral-900/50 dark:hover:border-primary-700",
                ].join(" ")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-800">
                  <Upload size={22} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Glissez votre CV ici
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    PDF, DOC ou DOCX — 5 Mo max
                  </p>
                </div>
                <input
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) { setCvFile(file); setCvError(null); }
                  }}
                />
                <button
                  type="button"
                  onClick={() => cvInputRef.current?.click()}
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  <Upload size={14} />
                  Choisir un fichier
                </button>
              </div>
              {cvError && <p className="mt-2 text-xs text-error-500">{cvError}</p>}
            </div>
          )}
        </div>
      </SectionCard>

      {/* ── Bouton Enregistrer ────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          loading={isPending}
          disabled={isPending || coherenceState === "impossible"}
          className="min-w-[200px] bg-primary-600 text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Save size={16} />
          Enregistrer les modifications
        </Button>
        {coherenceState === "impossible" && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-error-600 dark:text-error-400">
            <AlertTriangle size={13} />
            Corrigez l'incohérence âge / expérience avant de sauvegarder.
          </p>
        )}
      </div>
    </form>
  );
}
