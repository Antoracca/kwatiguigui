"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  GraduationCap,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Star,
  Sparkles,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  MailCheck,
  AlertCircle,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

import { bookCoachingSession, type BookingFormData } from "@/lib/actions/coaching";

// ── Constants ────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "08h00 – 08h30",
  "09h00 – 09h30",
  "10h00 – 10h30",
  "11h00 – 11h30",
  "14h00 – 14h30",
  "15h00 – 15h30",
  "16h00 – 16h30",
  "17h00 – 17h30",
];

const TOPICS = [
  "Audit de CV & Profil",
  "Préparation à l'entretien",
  "Orientation professionnelle",
  "Stratégie de recherche d'emploi",
  "Négociation salariale",
  "Autre",
];

// ── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  full_name:           z.string().min(2, "Le nom est requis (2 caractères min.)"),
  email:               z.string().email("Adresse email invalide"),
  phone:               z.string().optional(),
  preferred_date:      z.string().min(1, "Sélectionnez une date"),
  preferred_time_slot: z.string().min(1, "Sélectionnez un créneau horaire"),
  topic:               z.string().min(1, "Choisissez un sujet de session"),
  message:             z.string().max(500, "500 caractères maximum").optional(),
});

type FormValues = z.infer<typeof schema>;

// ── Helpers ──────────────────────────────────────────────────────────────────

function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-primary-400 dark:focus:bg-neutral-800/80";

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
      <AlertCircle size={11} />
      {message}
    </p>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
      {children}
    </p>
  );
}

// ── Success view ─────────────────────────────────────────────────────────────

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.45 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="space-y-3 w-full max-w-sm"
      >
        <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Demande envoyée !
        </h3>
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          Votre demande de session coaching a été transmise à notre équipe RH Kwatiguigui.
        </p>

        <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-left dark:border-green-800/40 dark:bg-green-900/20">
          <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">
              Email de confirmation sous 24 h
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-green-700 dark:text-green-400">
              Notre expert vous contactera pour valider le créneau selon vos disponibilités.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-neutral-700 active:scale-[0.98] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
      >
        Fermer
      </motion.button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function CoachingBooking() {
  const [open, setOpen]           = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedTopic = watch("topic");

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setTimeout(() => {
        setSubmitted(false);
        setServerError(null);
        reset();
      }, 300);
    }
  }

  async function onSubmit(data: FormValues) {
    setServerError(null);
    const result = await bookCoachingSession(data as BookingFormData);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <div className="flex flex-col rounded-[2rem] border border-neutral-200 bg-white px-6 py-8 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <GraduationCap size={20} />
        </div>
        <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Coaching Personnalisé
        </h3>
      </div>

      {/* Feature pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { icon: <Clock size={11} />,    label: "30 min" },
          { icon: <Star size={11} />,     label: "Expert RH" },
          { icon: <Sparkles size={11} />, label: "Sur mesure" },
        ].map(({ icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          >
            {icon}
            {label}
          </span>
        ))}
      </div>

      <p className="mb-6 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        Besoin d&apos;aller plus loin ? Réservez une session de 30 minutes avec un expert RH
        Kwatiguigui pour auditer votre profil.
      </p>

      {/* Dialog */}
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <button className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-700 active:scale-[0.98] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100">
            Prendre rendez-vous
            <ChevronRight size={16} />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

          {/* Panel */}
          <Dialog.Content
            aria-describedby="coaching-desc"
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none dark:bg-neutral-900"
          >
            {submitted ? (
              <SuccessView onClose={() => handleOpenChange(false)} />
            ) : (
              <>
                {/* Dialog header */}
                <div className="sticky top-0 z-10 flex items-start justify-between border-b border-neutral-100 bg-white px-6 py-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <Dialog.Title className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        Réserver votre session
                      </Dialog.Title>
                      <p id="coaching-desc" className="text-xs text-neutral-400">
                        Session de 30 min · Expert RH Kwatiguigui
                      </p>
                    </div>
                  </div>
                  <Dialog.Close className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-200">
                    <X size={18} />
                  </Dialog.Close>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {/* 1 — Infos personnelles */}
                  <section className="px-6 py-5 space-y-4">
                    <SectionLabel>Informations personnelles</SectionLabel>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("full_name")}
                          placeholder="Jean Dupont"
                          className={inputClass}
                        />
                        <FieldError message={errors.full_name?.message} />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          Adresse email <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="jean@exemple.com"
                          className={inputClass}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          Téléphone{" "}
                          <span className="ml-1 text-xs font-normal text-neutral-400">(optionnel)</span>
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+236 70 00 00 00"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </section>

                  {/* 2 — Créneau */}
                  <section className="px-6 py-5 space-y-4">
                    <SectionLabel>
                      <span className="flex items-center gap-2">
                        <Calendar size={12} />
                        Choisissez votre créneau
                      </span>
                    </SectionLabel>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          Date souhaitée <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("preferred_date")}
                          type="date"
                          min={getMinDate()}
                          className={`${inputClass} dark:[color-scheme:dark]`}
                        />
                        <FieldError message={errors.preferred_date?.message} />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          Heure <span className="text-red-500">*</span>
                        </label>
                        <select {...register("preferred_time_slot")} className={inputClass}>
                          <option value="">Sélectionner un créneau</option>
                          {TIME_SLOTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <FieldError message={errors.preferred_time_slot?.message} />
                      </div>
                    </div>
                  </section>

                  {/* 3 — Sujet */}
                  <section className="px-6 py-5 space-y-3">
                    <SectionLabel>
                      <span className="flex items-center gap-2">
                        <Sparkles size={12} />
                        Sujet de la session <span className="text-red-500 normal-case font-semibold ml-0.5">*</span>
                      </span>
                    </SectionLabel>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {TOPICS.map((topic) => {
                        const active = selectedTopic === topic;
                        return (
                          <label
                            key={topic}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              active
                                ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/30 dark:text-primary-300"
                                : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300 hover:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-700/50"
                            }`}
                          >
                            <input
                              type="radio"
                              value={topic}
                              className="sr-only"
                              {...register("topic")}
                            />
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition ${
                                active
                                  ? "border-primary-500 dark:border-primary-400"
                                  : "border-neutral-300 dark:border-neutral-600"
                              }`}
                            >
                              {active && (
                                <span className="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                              )}
                            </span>
                            {topic}
                          </label>
                        );
                      })}
                    </div>
                    <FieldError message={errors.topic?.message} />
                  </section>

                  {/* 4 — Message */}
                  <section className="px-6 py-5 space-y-3">
                    <SectionLabel>
                      Message{" "}
                      <span className="ml-1 normal-case font-normal">(optionnel)</span>
                    </SectionLabel>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Décrivez brièvement votre situation ou vos objectifs…"
                      className={`${inputClass} resize-none`}
                    />
                    <FieldError message={errors.message?.message} />
                  </section>

                  {/* Footer / submit */}
                  <div className="px-6 py-5 space-y-3">
                    {serverError && (
                      <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle size={15} className="mt-0.5 shrink-0" />
                        {serverError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-400"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          Confirmer ma réservation
                          <ChevronRight size={15} />
                        </>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
                      <ShieldCheck size={12} />
                      Confirmation par email sous 24 h · Aucun paiement requis
                    </p>
                  </div>
                </form>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
