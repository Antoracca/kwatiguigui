import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Filter,
  Layers,
  SearchCheck,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "CVthèque Africaine - Sourcing candidats en RCA",
  description:
    "Accédez à une CVthèque structurée pour identifier rapidement les talents pertinents en République centrafricaine.",
  alternates: { canonical: "/entreprises/cvtheque-africaine" },
};

const filters = [
  "Métier et famille de postes",
  "Niveau d’expérience et autonomie",
  "Localisation et mobilité",
  "Disponibilité immédiate ou planifiée",
  "Compétences techniques validées",
  "Compétences comportementales observées",
] as const;

const process = [
  "Créer un besoin de poste clair (missions, contexte, niveau attendu).",
  "Filtrer la CVthèque sur 3 à 5 critères strictement utiles.",
  "Préqualifier les profils avec une grille homogène.",
  "Lancer un entretien court orienté preuves concrètes.",
  "Constituer un short-list argumenté pour décision rapide.",
] as const;

export default function CvtHequeAfricainePage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_0%_20%,rgba(2,132,199,0.18),transparent_36%),radial-gradient(circle_at_100%_0%,rgba(20,184,166,0.18),transparent_35%),linear-gradient(180deg,#f7fcff_0%,#ffffff_58%)] dark:bg-[radial-gradient(circle_at_0%_20%,rgba(2,132,199,0.16),transparent_36%),radial-gradient(circle_at_100%_0%,rgba(20,184,166,0.12),transparent_35%),linear-gradient(180deg,#060b17_0%,#0a1324_58%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-secondary-700 shadow-sm dark:border-secondary-800 dark:bg-neutral-900/80 dark:text-secondary-300">
                <Sparkles className="h-4 w-4" />
                Module CVthèque Africaine
              </div>
              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Sourcing intelligent,
                <span className="text-gradient-primary"> décision plus rapide.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Gagnez du temps sur l’identification des profils grâce à une logique de filtres utiles et
                une méthode de qualification homogène pour vos équipes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/register?type=employer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-bold text-white transition-colors hover:bg-secondary-700"
                >
                  Activer la CVthèque
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/entreprises/gestion-offres"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  Voir la gestion des offres
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_nlxdl6ly.json"
              fallbackSrc="/images/searchforemploye.lottie"
              badge="Sourcing visuel en temps réel"
              glowClassName="bg-secondary-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Filter className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-white">Filtres réellement utiles</h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">Évitez la surcharge d’informations, concentrez-vous sur les critères qui influencent la décision.</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-white">Short-list argumentée</h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">Chaque profil retenu doit être défendable avec des preuves observables et comparables.</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-500">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-white">Process maîtrisé</h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">Conservez une logique d’évaluation stable, même avec plusieurs recruteurs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Filtres recommandés pour démarrer</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filters.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <SearchCheck className="h-4 w-4" />
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Méthode opérationnelle</h2>
          </div>
          <div className="space-y-3">
            {process.map((step, index) => (
              <div key={step} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700 text-xs font-bold dark:bg-secondary-950 dark:text-secondary-400">
                  {index + 1}
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50/70 p-5 dark:border-primary-800 dark:bg-primary-950/25">
            <p className="flex items-start gap-2 text-fluid-sm text-primary-900 dark:text-primary-200">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Le gain réel ne vient pas seulement du volume de CV, mais de la qualité de qualification.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-8 text-center dark:border-secondary-800 dark:bg-secondary-950/30">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-100 dark:bg-secondary-900">
              <Users className="h-7 w-7 text-secondary-700 dark:text-secondary-400" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Prêt à accélérer votre sourcing ?</h2>
            <p className="mt-3 text-fluid-base text-neutral-600 dark:text-neutral-300">
              Activez votre espace et structurez vos recrutements avec une CVthèque orientée performance.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/register?type=employer" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-secondary-700">
                Démarrer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/entreprises" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                Retour à l'espace entreprises
                <Layers className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Sources: Banque mondiale, OIT, Code du travail RCA, OHADA.
          </p>
        </div>
      </section>
    </>
  );
}
