import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  ListChecks,
  Sparkles,
  Timer,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Gestion des offres - Pipeline recrutement entreprise",
  description:
    "Pilotez vos offres d'emploi, vos candidatures et vos décisions de recrutement avec une méthode opérationnelle claire.",
  alternates: { canonical: "/entreprises/gestion-offres" },
};

const statuses = [
  { title: "Brouillon", desc: "Offre en préparation et validation interne." },
  { title: "Publiée", desc: "Offre active visible par les candidats." },
  { title: "En qualification", desc: "Tri des candidatures selon une grille commune." },
  { title: "Entretiens", desc: "Sessions planifiées avec short-list validée." },
  { title: "Proposition", desc: "Finalisation salariale et conditions d’entrée." },
  { title: "Pourvue", desc: "Recrutement confirmé et onboarding lancé." },
] as const;

const checklist = [
  "Titre de poste clair et niveau attendu explicite",
  "Missions concrètes orientées résultats",
  "Compétences obligatoires vs souhaitées",
  "Rémunération ou fourchette transparente si possible",
  "Étapes de sélection et délais annoncés",
  "Contact candidat et canal de suivi"
] as const;

export default function GestionOffresPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_15%_10%,rgba(20,184,166,0.2),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(16,185,129,0.2),transparent_36%),linear-gradient(180deg,#f7fffb_0%,#ffffff_58%)] dark:bg-[radial-gradient(circle_at_15%_10%,rgba(20,184,166,0.16),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(16,185,129,0.16),transparent_36%),linear-gradient(180deg,#060c14_0%,#091827_58%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-neutral-900/80 dark:text-emerald-300">
                <Sparkles className="h-4 w-4" />
                Module Gestion des Offres
              </div>

              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                De l'offre publiée à l'embauche,
                <span className="text-gradient-primary"> sans perdre le contrôle.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Standardisez votre pipeline de recrutement pour réduire les délais, améliorer la qualité de décision
                et offrir une expérience candidat plus professionnelle.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/register?type=employer" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-emerald-700">
                  Publier une offre
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/entreprises/cvtheque-africaine" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Activer la CVthèque
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_bh69rwvr.json"
              fallbackSrc="/images/search.lottie"
              badge="Pipeline recrutement animé"
              glowClassName="bg-emerald-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Pipeline recommandé</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statuses.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold dark:bg-emerald-950 dark:text-emerald-400">
                  {index + 1}
                </div>
                <h3 className="font-heading text-fluid-base font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-6 dark:border-primary-800 dark:bg-primary-950/25">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-600 dark:bg-neutral-900 dark:text-primary-400">
                <ListChecks className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Checklist offre performante</h3>
              <ul className="mt-4 space-y-2">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/70 p-6 dark:border-secondary-800 dark:bg-secondary-950/25">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-secondary-700 dark:bg-neutral-900 dark:text-secondary-400">
                <Timer className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">SLA recrutement conseillé</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Feedback candidature sous 72h quand possible.</li>
                <li>- Qualification initiale dans les 5 jours ouvrés.</li>
                <li>- Entretien dans les 10 jours pour profils prioritaires.</li>
                <li>- Décision finale tracée et communiquée proprement.</li>
              </ul>

              <div className="mt-4 rounded-xl border border-secondary-200 bg-white p-4 dark:border-secondary-800 dark:bg-neutral-900">
                <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600 dark:text-secondary-400" />
                  Un pipeline clair améliore aussi l’image employeur et la fidélisation des talents recrutés.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <ClipboardCheck className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              <p className="mt-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">Évitez les offres vagues: elles produisent des candidatures hors cible.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <CalendarCheck className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              <p className="mt-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">Programmez vos points d’évaluation au lieu de traiter au fil de l’eau.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <BriefcaseBusiness className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              <p className="mt-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">Connectez publication, sourcing, entretien et décision dans une seule logique.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Passez à un recrutement piloté</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Mettez en place un workflow fiable pour réduire les erreurs, les délais et les coûts cachés.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register?type=employer" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-emerald-700">
              Démarrer maintenant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/entreprises/tarifs-solutions" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              Voir les solutions
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 text-left dark:border-neutral-700 dark:bg-neutral-900">
            <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              Références: OIT, Banque mondiale, Code du travail RCA, OHADA.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
