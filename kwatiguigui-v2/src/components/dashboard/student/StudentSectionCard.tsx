"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Target,
  ClipboardList,
  Repeat2,
  ListChecks,
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Save,
  Check,
  BrainCircuit,
  FileText,
  X,
  Bell,
  Search,
  Crown,
  Pencil,
  RefreshCw,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { toggleStudentMode, updateStudentProfile, getProfileCompleteness } from "@/lib/actions/student";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface StudentProfileValues {
  is_student: boolean;
  school_name: string;
  field_of_study: string;
  study_level: string;
  school_year: string;
  internship_open: boolean;
  alternance_open: boolean;
  internship_start: string | null;
  internship_duration: string;
  internship_mode: string;
  student_description: string;
}

export interface StudentProfileData {
  first_name: string;
  last_name: string;
  city: string;
  phone: string | null;
  whatsapp: string;
  avatar_url: string | null;
  email: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STUDY_LEVELS = ["BEPC", "CAP/BEP", "Bac", "BTS", "Licence", "Master", "Doctorat", "Formation pro"] as const;
const SCHOOL_YEARS = ["1ère année", "2ème année", "3ème année", "4ème année", "5ème +"] as const;
const INTERNSHIP_DURATIONS = ["1 mois", "2 mois", "3 mois", "6 mois", "Flexible"] as const;
const INTERNSHIP_MODES = ["Présentiel", "Distanciel", "Hybride"] as const;

const SESSION_KEY = "kwg_student_saved";
const SESSION_TTL_MS = 10 * 60 * 1000; // 10 minutes

// ---------------------------------------------------------------------------
// SearchMode
// ---------------------------------------------------------------------------
type SearchMode = "stage" | "alternance" | "les-deux" | "";

function getSearchMode(io: boolean, ao: boolean): SearchMode {
  if (io && ao) return "les-deux";
  if (io) return "stage";
  if (ao) return "alternance";
  return "";
}

function applySearchMode(mode: SearchMode): { internship_open: boolean; alternance_open: boolean } {
  return {
    internship_open: mode === "stage" || mode === "les-deux",
    alternance_open: mode === "alternance" || mode === "les-deux",
  };
}

// ---------------------------------------------------------------------------
// sessionStorage helpers
// ---------------------------------------------------------------------------
function persistSaved() {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() })); } catch { }
}
function clearSaved() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { }
}
function isSavedSession(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw) as { ts: number };
    if (Date.now() - ts > SESSION_TTL_MS) { sessionStorage.removeItem(SESSION_KEY); return false; }
    return true;
  } catch { return false; }
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const SLIDE = {
  enter: (dir: number) => ({ x: dir > 0 ? 52 : -52, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -52 : 52, opacity: 0, transition: { duration: 0.2 } }),
};

const COLLAPSE = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: { opacity: 1, height: "auto", overflow: "visible", transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.22 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const } },
};

// ---------------------------------------------------------------------------
// StepProgress
// ---------------------------------------------------------------------------
function StepProgress({ step }: { step: 2 | 3 }) {
  const label = step === 2 ? "Informations académiques" : "Disponibilités & Pitch";
  return (
    <div className="px-5 pt-4 pb-1 space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{label}</p>
        <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500">Étape {step - 1}/2</p>
      </div>
      <div className="flex gap-1.5">
        <div className="h-1 flex-1 rounded-full bg-purple-500" />
        <div className={["h-1 flex-1 rounded-full transition-colors duration-400", step === 3 ? "bg-purple-500" : "bg-neutral-200 dark:bg-neutral-700"].join(" ")} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormField — toujours visible, icône claire
// ---------------------------------------------------------------------------
function FormField({
  label, value, onChange, placeholder, icon,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; icon: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{label}</p>
      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 transition-all focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20 dark:border-neutral-700 dark:bg-neutral-900/50">
        <span className="shrink-0 text-purple-500 dark:text-purple-400">{icon}</span>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none dark:text-neutral-200" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DateInput — saisie clavier DD/MM/YYYY, sans calendrier pop-up
// ---------------------------------------------------------------------------
function DateInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const toDisplay = (v: string) => {
    if (!v) return "";
    const [y, m, d] = v.split("-");
    return d && m && y ? `${d}/${m}/${y}` : "";
  };
  const [display, setDisplay] = useState(() => toDisplay(value));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 8);
    let fmt = digits;
    if (digits.length > 4) fmt = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    else if (digits.length > 2) fmt = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    setDisplay(fmt);
    const parts = fmt.split("/");
    if (parts.length === 3 && parts[0] && parts[0].length === 2 && parts[1] && parts[1].length === 2 && parts[2] && parts[2].length === 4) {
      onChange(`${parts[2]}-${parts[1]}-${parts[0]}`);
    } else if (!fmt) {
      onChange("");
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 transition-all focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20 dark:border-neutral-700 dark:bg-neutral-900/50">
      <Calendar size={15} className="shrink-0 text-neutral-400" />
      <input type="text" value={display} onChange={handleChange} placeholder="jj/mm/aaaa" inputMode="numeric" maxLength={10} className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 outline-none dark:text-neutral-300" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// PillRow — avec désélection
// ---------------------------------------------------------------------------
function PillRow<T extends string>({
  options, value, onChange, color = "purple",
}: {
  options: readonly T[]; value: string; onChange: (v: T) => void; color?: "purple" | "secondary";
}) {
  const activeClass = color === "secondary"
    ? "border-secondary-500 bg-secondary-500 text-white shadow-sm"
    : "border-purple-500 bg-purple-500 text-white shadow-sm";
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button key={opt} type="button" onClick={() => onChange(value === opt ? ("" as T) : opt)}
          className={["rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 active:scale-95", value === opt ? activeClass : "border-neutral-200 bg-white text-neutral-600 hover:border-purple-300 hover:text-purple-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"].join(" ")}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SearchModeToggles
// ---------------------------------------------------------------------------
const SEARCH_MODES: { value: Exclude<SearchMode, "">; label: string; sublabel: string; icon: React.ReactNode }[] = [
  { value: "stage", label: "Stage", sublabel: "Je cherche un stage", icon: <ClipboardList size={16} /> },
  { value: "alternance", label: "Alternance", sublabel: "Je cherche une alternance", icon: <Repeat2 size={16} /> },
  { value: "les-deux", label: "Les deux", sublabel: "Ouvert au stage et à l'alternance", icon: <ListChecks size={16} /> },
];

function SearchModeToggles({ value, onChange }: { value: SearchMode; onChange: (v: SearchMode) => void }) {
  return (
    <div className="space-y-2">
      {SEARCH_MODES.map((opt) => {
        const active = value === opt.value;
        return (
          <button key={opt.value} type="button" onClick={() => onChange(active ? "" : opt.value)}
            className={["w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 active:scale-[0.99]", active ? "border-purple-200 bg-purple-50/80 dark:border-purple-800/40 dark:bg-purple-950/20" : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700"].join(" ")}>
            <div className="flex items-center gap-3">
              <div className={["flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200", active ? "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800"].join(" ")}>
                {opt.icon}
              </div>
              <div>
                <p className={["text-sm font-semibold", active ? "text-purple-700 dark:text-purple-300" : "text-neutral-800 dark:text-neutral-200"].join(" ")}>{opt.label}</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{opt.sublabel}</p>
              </div>
            </div>
            <div className={["relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200", active ? "bg-purple-500" : "bg-neutral-300 dark:bg-neutral-600"].join(" ")}>
              <span className={["inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200", active ? "translate-x-4" : "translate-x-0"].join(" ")} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SubLabel
// ---------------------------------------------------------------------------
function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{children}</p>;
}

// ---------------------------------------------------------------------------
// PropulserFlat — section plate dans le fond de la page (pas de carte)
// ---------------------------------------------------------------------------
// Criteria UI mapping based on unified score logic (100 pts)
const getUnifiedCriteriaUI = (p: StudentProfileData) => [
  { label: "Photo de profil", pts: 15, present: !!p.avatar_url },
  { label: "CV Uploadé", pts: 15, present: true }, // Not tracked in `profileData` prop directly, but handled by server score
  { label: "Type d'emploi souhaité", pts: 12, present: true },
  { label: "Expérience", pts: 12, present: true },
  { label: "Email", pts: 8, present: !!p.email },
  { label: "Ville", pts: 8, present: !!p.city },
  { label: "LinkedIn", pts: 5, present: true },
  { label: "Nom complet", pts: 10, present: !!p.first_name && !!p.last_name },
  { label: "Contacts (Tél/Whatsapp)", pts: 10, present: !!p.phone || !!p.whatsapp },
  { label: "Infos basiques", pts: 5, present: true },
];

function PropulserFlat({
  profileData, published, onPublish,
}: {
  profileData: StudentProfileData; published: boolean; onPublish: () => void;
}) {
  const [score, setScore] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch true unified score on mount
  useEffect(() => {
    fetchScore();
  }, []);

  async function fetchScore() {
    setIsRefreshing(true);
    try {
      const res = await getProfileCompleteness();
      setScore(res.score);
    } catch (e) {
      console.error("Failed to fetch score", e);
    } finally {
      setIsRefreshing(false);
    }
  }

  // Fallback to local data analysis if score isn't loaded yet
  const criteria = getUnifiedCriteriaUI(profileData);
  const displayScore = score !== null ? score : 0; // Wait for server to give exact score
  const optimized = displayScore >= 90;

  // What to tell the user they are missing based on local quick check
  const missing = criteria.filter((c) => !c.present && c.pts > 0);

  return (
    <motion.div variants={FADE_UP} initial="hidden" animate="visible" className="space-y-7 pt-2">

      {/* ── Séparateur page ───────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-1">
          Dernière étape — Propulser votre profil
        </span>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* ── Titre & score ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
              Complétude de votre profil étudiant
            </h2>
            <button
              onClick={fetchScore}
              disabled={isRefreshing}
              className="inline-flex items-center justify-center rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 disabled:opacity-50"
              title="Actualiser le score"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          </div>
          <span className={["text-2xl font-extrabold shrink-0", optimized ? "text-secondary-600 dark:text-secondary-400" : "text-accent-600 dark:text-accent-400"].join(" ")}>
            {score === null ? "..." : `${displayScore}%`}
          </span>
        </div>

        {/* Barre de progression */}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className={["h-full rounded-full", optimized ? "bg-secondary-500" : "bg-accent-500"].join(" ")}
          />
        </div>

        {/* Message score */}
        {displayScore < 90 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Votre profil est à{" "}
            <span className="font-semibold text-accent-600 dark:text-accent-400">{displayScore}%</span>
            {" "}— en dessous de la recommandation de{" "}
            <span className="font-semibold">90%</span>.
            {" "}Complétez-le pour maximiser votre visibilité auprès des recruteurs.
          </p>
        ) : (
          <p className="text-sm text-secondary-700 dark:text-secondary-400 font-medium">
            Profil optimisé. Vous serez affiché en priorité dans les résultats de recherche des recruteurs.
          </p>
        )}
      </div>

      {/* ── Critères (grille 2 colonnes) ─────────────────────────────── */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {criteria.map((c) => (
          <div key={c.label} className="flex items-center gap-2.5">
            <div className={["flex h-5 w-5 shrink-0 items-center justify-center rounded-full", c.present ? "bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400" : "bg-neutral-100 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-600"].join(" ")}>
              {c.present ? <Check size={11} /> : <X size={11} />}
            </div>
            <span className={["text-sm", c.present ? "text-neutral-800 dark:text-neutral-200" : "text-neutral-400 dark:text-neutral-500"].join(" ")}>
              {c.label}
            </span>
            {!c.present && (
              <span className="ml-auto text-[10px] font-bold text-accent-500">+{c.pts} pts</span>
            )}
          </div>
        ))}
      </div>

      {/* ── Action : compléter ou message optimisé ───────────────────── */}
      {!optimized && (
        <div className="space-y-2.5">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Pour atteindre 90%, vous devez remplir complètement :{" "}
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Votre CV (PDF), Expériences, Type d'emploi souhaité, Photo de profil...
            </span>
          </p>
          <a
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700 active:scale-[0.98]"
          >
            <Pencil size={14} />
            Compléter mon CV & Profil
          </a>
        </div>
      )}

      {/* ── Séparateur ───────────────────────────────────────────────── */}
      <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

      {/* ── Section Premium ──────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 dark:border-amber-800/30 dark:from-amber-950/20 dark:via-neutral-900 dark:to-amber-950/10">

        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-amber-100 px-5 py-4 dark:border-amber-800/20">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <Crown size={17} />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Premium Étudiant</p>
              <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">3× plus de contacts avec les recruteurs</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">2 500 FCFA</p>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">/mois</p>
          </div>
        </div>

        {/* Bénéfices */}
        <div className="space-y-2.5 px-5 py-4">
          {[
            "Apparaître en tête des résultats de stage et alternance",
            "Badge Premium visible sur votre profil public",
            "Notifications prioritaires envoyées aux recruteurs ciblés",
            "Statistiques de visibilité : vues et contacts reçus",
            "Accès aux offres exclusives non publiées en freemium",
          ].map((benefit) => (
            <div key={benefit} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Check size={10} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-5 pb-5">
          <a
            href="/dashboard/payment"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:from-amber-600 hover:to-amber-700 active:scale-[0.99]"
          >
            <Crown size={14} />
            Passer au Premium — 2 500 FCFA/mois
          </a>
        </div>
      </div>

      {/* ── Séparateur ───────────────────────────────────────────────── */}
      <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

      {/* ── Publier ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!published ? (
          <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              type="button"
              disabled={displayScore < 90}
              onClick={onPublish}
              className={["w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition active:scale-[0.99]", displayScore >= 90 ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-neutral-100 text-neutral-400 cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-500"].join(" ")}
            >
              <Search size={15} />
              {displayScore >= 90 ? "Publier mon profil étudiant" : "Atteignez 90% pour publier"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3 rounded-xl border border-secondary-200 bg-secondary-50 p-4 dark:border-secondary-800/30 dark:bg-secondary-950/20">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-600 dark:bg-secondary-900/40 dark:text-secondary-400">
                <Check size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-secondary-800 dark:text-secondary-300">Publication effectuée avec succès</p>
                <p className="mt-0.5 text-xs text-secondary-700 dark:text-secondary-400 leading-relaxed">
                  Votre profil a été ajouté aux flux des entreprises. Vous recevrez bientôt des propositions.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/dashboard/settings"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
              >
                <Bell size={14} />
                Activer les alertes
              </a>
              <a
                href="/jobs"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
              >
                <Search size={14} />
                Voir les opportunités
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function StudentSectionCard({
  initialValues,
  profileData,
  initialStep = "wizard",
}: {
  initialValues: StudentProfileValues;
  profileData: StudentProfileData;
  initialStep?: "wizard" | "propulser";
}) {
  const router = useRouter();

  // ── Form state ────────────────────────────────────────────────────────
  const [isStudent, setIsStudent] = useState(initialValues.is_student);
  const [schoolName, setSchoolName] = useState(initialValues.school_name);
  const [fieldOfStudy, setFieldOfStudy] = useState(initialValues.field_of_study);
  const [studyLevel, setStudyLevel] = useState(initialValues.study_level);
  const [schoolYear, setSchoolYear] = useState(initialValues.school_year);
  const [searchMode, setSearchMode] = useState<SearchMode>(
    getSearchMode(initialValues.internship_open, initialValues.alternance_open),
  );
  const [internshipStart, setInternshipStart] = useState(initialValues.internship_start ?? "");
  const [internshipDuration, setInternshipDuration] = useState(initialValues.internship_duration);
  const [internshipMode, setInternshipMode] = useState(initialValues.internship_mode);
  const [description, setDescription] = useState(initialValues.student_description ?? "");

  // ── Navigation ────────────────────────────────────────────────────────
  const [formStep, setFormStep] = useState<2 | 3>(2);
  const [dir, setDir] = useState(1);
  const [wizardSaved, setWizardSaved] = useState(false);
  const [showPropulser, setShowPropulser] = useState(false);
  const [published, setPublished] = useState(false);

  // ── UI state ──────────────────────────────────────────────────────────
  const [toggling, setToggling] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // ── Restore from sessionStorage and URL routing param ────────────────
  useEffect(() => {
    if (initialValues.is_student) {
      if (initialStep === "propulser" && isSavedSession()) {
        setWizardSaved(true);
        setShowPropulser(true);
      } else if (initialStep === "wizard" && isSavedSession()) {
        // Force the URL to ?step=propulser if we have a valid session but user dropped param
        router.replace("/dashboard/student?step=propulser");
      }
    }
  }, [initialStep, initialValues.is_student, router]);

  // ── Handlers ──────────────────────────────────────────────────────────
  async function handleActivate() {
    setToggling(true);
    setError(null);
    const result = await toggleStudentMode(true);
    setToggling(false);
    if (result.success) {
      setIsStudent(true);
      setDir(1);
      setFormStep(2);
    } else {
      setError(result.error ?? "Erreur inconnue");
    }
  }

  async function handleDeactivate() {
    setToggling(true);
    setError(null);
    const result = await toggleStudentMode(false);
    setToggling(false);
    if (result.success) {
      setIsStudent(false);
      setWizardSaved(false);
      setShowPropulser(false);
      setPublished(false);
      clearSaved();
    } else {
      setError(result.error ?? "Erreur inconnue");
    }
  }

  function openWizardEdit() {
    setWizardSaved(false);
    setShowPropulser(false);
    clearSaved();
    setDir(-1);
    setFormStep(3);
    router.replace("/dashboard/student");
  }

  function goNext() { setDir(1); setFormStep(3); }
  function goBack() { setDir(-1); setFormStep(2); }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    const { internship_open, alternance_open } = applySearchMode(searchMode);
    const result = await updateStudentProfile({
      school_name: schoolName,
      field_of_study: fieldOfStudy,
      study_level: studyLevel,
      school_year: schoolYear,
      internship_open,
      alternance_open,
      internship_start: internshipStart || null,
      internship_duration: internshipDuration,
      internship_mode: internshipMode,
      student_description: description,
    });
    setSaving(false);
    if (result.success) {
      setSaved(true);
      setWizardSaved(true);
      setShowPropulser(true);
      persistSaved();

      // Navigate sequentially using URL step param
      setTimeout(() => {
        setSaved(false);
        router.push("/dashboard/student?step=propulser");
      }, 500);
    } else {
      setError(result.error ?? "Erreur inconnue");
    }
  }

  // ── Derived ───────────────────────────────────────────────────────────
  const hasActivity = searchMode !== "";
  const showDuration = searchMode === "stage" || searchMode === "les-deux";
  const contentKey = !isStudent ? "activation" : wizardSaved ? "saved" : `step-${formStep}`;

  return (
    <>
      {/* ── Wizard card ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

        {/* ── Card header ──────────────────────────────────────────────── */}
        <div className={["relative overflow-hidden border-b border-neutral-100 px-5 py-4 transition-colors duration-300 dark:border-neutral-800", isStudent ? "bg-gradient-to-r from-purple-50 via-white to-purple-50/30 dark:from-purple-950/20 dark:via-neutral-900 dark:to-purple-950/10" : "bg-neutral-50/60 dark:bg-neutral-900"].join(" ")}>
          {isStudent && (
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-100/40 blur-2xl dark:bg-purple-900/20" />
          )}

          <div className="relative flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              {isStudent ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                  <Target size={20} />
                </div>
              ) : (
                <div className="h-10 w-10 overflow-hidden rounded-xl">
                  <DotLottieReact src="/images/studing.lottie" loop autoplay className="h-full w-full scale-125" />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Pôle Étudiant</h2>
                {isStudent && wizardSaved && (
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">Actif</span>
                )}
              </div>
              <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                {isStudent && wizardSaved
                  ? "Profil étudiant enregistré — visible par les recruteurs."
                  : isStudent
                    ? "Renseignez vos informations pour apparaître dans les offres."
                    : "Activer le mode étudiant pour apparaître dans les offres de stage et d'alternance."}
              </p>
            </div>

            {/* Bouton Modifier (compact) + toggle désactiver */}
            {isStudent && wizardSaved && (
              <button
                type="button"
                onClick={openWizardEdit}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
              >
                <Pencil size={11} />
                Modifier
              </button>
            )}

            {isStudent && (
              <button
                type="button"
                role="switch"
                aria-checked={isStudent}
                disabled={toggling}
                onClick={handleDeactivate}
                title="Désactiver le mode étudiant"
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-500 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-wait disabled:opacity-60 dark:bg-purple-600"
              >
                <span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow-md transition-transform duration-200" />
              </button>
            )}
          </div>

          {error && !isStudent && <p className="mt-2 text-xs text-error-500">{error}</p>}
        </div>

        {/* ── Animated content (wizard steps) ──────────────────────────── */}
        <AnimatePresence mode="wait" custom={dir}>
          {/* ── Compact saved state — no body shown ─────────────────── */}
          {wizardSaved && isStudent ? null : (
            <motion.div key={contentKey} custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit">

              {/* STEP 1 — Activation */}
              {!isStudent && (
                <div className="flex flex-col items-center gap-5 px-6 py-8 text-center">
                  <div className="h-48 w-48">
                    <DotLottieReact src="/images/studing.lottie" loop autoplay className="h-full w-full" />
                  </div>
                  <div className="max-w-sm space-y-2">
                    <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">Activer le mode étudiant</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Renseignez votre parcours académique et vos disponibilités pour apparaître dans les recherches de stages et d&apos;alternances.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[{ icon: <ClipboardList size={11} />, label: "Stage" }, { icon: <Repeat2 size={11} />, label: "Alternance" }, { icon: <ListChecks size={11} />, label: "Les deux" }].map(({ icon, label }) => (
                      <span key={label} className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-medium text-purple-600 dark:border-purple-800/40 dark:bg-purple-950/20 dark:text-purple-400">
                        {icon}{label}
                      </span>
                    ))}
                  </div>
                  <button type="button" onClick={handleActivate} disabled={toggling} className="inline-flex h-10 items-center gap-2 rounded-full bg-purple-600 px-7 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 active:scale-[0.98] disabled:opacity-50">
                    {toggling ? "Activation…" : "Activer le mode étudiant"}
                    <ChevronRight size={15} />
                  </button>
                  {error && <p className="text-xs text-error-500">{error}</p>}
                </div>
              )}

              {/* STEP 2 — Infos académiques */}
              {isStudent && formStep === 2 && (
                <div className="space-y-4 px-5 pb-5">
                  <StepProgress step={2} />
                  <FormField label="Établissement" value={schoolName} onChange={setSchoolName} placeholder="Université de Bangui, IFMS, ISGE…" icon={<Building2 size={18} />} />
                  <FormField label="Filière / Domaine d'études" value={fieldOfStudy} onChange={setFieldOfStudy} placeholder="Informatique, Gestion, Droit, Médecine…" icon={<BookOpen size={18} />} />
                  <div>
                    <SubLabel>Niveau d'études</SubLabel>
                    <PillRow options={STUDY_LEVELS} value={studyLevel} onChange={setStudyLevel} color="purple" />
                  </div>
                  <div>
                    <SubLabel>Année en cours</SubLabel>
                    <PillRow options={SCHOOL_YEARS} value={schoolYear} onChange={setSchoolYear} color="purple" />
                  </div>
                  <div className="flex justify-end pt-1">
                    <button type="button" onClick={goNext} className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 active:scale-[0.98]">
                      Suivant <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 — Disponibilités & Pitch */}
              {isStudent && formStep === 3 && (
                <div className="space-y-4 px-5 pb-5">
                  <StepProgress step={3} />

                  <div>
                    <SubLabel>Je recherche</SubLabel>
                    <SearchModeToggles value={searchMode} onChange={setSearchMode} />
                  </div>

                  <AnimatePresence initial={false}>
                    {hasActivity && (
                      <motion.div key="prefs" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto", transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const } }} exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }} className="overflow-hidden">
                        <div className="space-y-4 rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
                          <div>
                            <SubLabel>Disponible à partir de</SubLabel>
                            <DateInput value={internshipStart} onChange={setInternshipStart} />
                          </div>
                          {showDuration && (
                            <div>
                              <SubLabel>Durée souhaitée</SubLabel>
                              <PillRow options={INTERNSHIP_DURATIONS} value={internshipDuration} onChange={setInternshipDuration} color="secondary" />
                            </div>
                          )}
                          <div>
                            <SubLabel>Mode de travail</SubLabel>
                            <PillRow options={INTERNSHIP_MODES} value={internshipMode} onChange={setInternshipMode} color="purple" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pitch */}
                  <div>
                    <SubLabel>Pitch impactant</SubLabel>
                    <p className="mb-2.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                      Présentez vos ambitions aux recruteurs — ce texte apparaît sur votre profil public.
                    </p>
                    <div className="flex items-start gap-2.5 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 transition-all focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20 dark:border-neutral-700 dark:bg-neutral-900/60">
                      <FileText size={15} className="mt-0.5 shrink-0 text-neutral-400" />
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Étudiant en 3e année d'informatique, je cherche un stage de 3 mois pour valider ma licence. Passionné par le développement web, disponible dès juillet…" rows={4} maxLength={600} className="flex-1 resize-none bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none dark:text-neutral-200" />
                    </div>
                    <p className="mt-1 text-right text-[10px] text-neutral-400">{description.length}/600</p>
                    <div className="mt-2 space-y-1">
                      <button type="button" disabled className="w-full inline-flex cursor-not-allowed select-none items-center justify-center gap-2 rounded-xl bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
                        <BrainCircuit size={15} />
                        Générer une description avec l&apos;IA gratuitement
                      </button>
                      <p className="text-center text-[11px] text-neutral-400 dark:text-neutral-500">Bientôt disponible</p>
                    </div>
                  </div>

                  {/* Navigation step 3 */}
                  <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <button type="button" onClick={goBack} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
                      <ChevronLeft size={14} /> Retour
                    </button>
                    <div className="min-w-0 flex-1 text-right">
                      <AnimatePresence mode="wait">
                        {saved && (
                          <motion.span key="ok" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1 text-xs font-medium text-secondary-600 dark:text-secondary-400">
                            <Check size={12} /> Enregistré
                          </motion.span>
                        )}
                        {error && !saved && (
                          <motion.span key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-error-500">{error}</motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">
                      <Save size={14} />
                      {saving ? "Enregistrement…" : "Sauvegarder et continuer"}
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── PropulserFlat — section plate dans le fond de la page ─────────── */}
      <AnimatePresence>
        {showPropulser && (
          <PropulserFlat
            key="propulser"
            profileData={profileData}
            published={published}
            onPublish={() => setPublished(true)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
