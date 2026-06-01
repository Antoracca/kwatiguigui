import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  FileText,
  Layers,
  Medal,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Espace Entreprises RCA - Recrutement, marque employeur et performance",
  description:
    "Espace Entreprises KUSSALA: CVthèque africaine, gestion des offres, marque employeur et solutions de recrutement adaptées à la République centrafricaine.",
  alternates: { canonical: "/entreprises" },
};

const pillars = [
  {
    title: "CVthèque Africaine",
    description: "Identifiez vite les profils adaptés par secteur, niveau et disponibilité.",
    href: "/entreprises/cvtheque-africaine",
    icon: SearchCheck,
  },
  {
    title: "Tarifs & Solutions",
    description: "Choisissez une formule claire selon votre volume de recrutement.",
    href: "/entreprises/tarifs-solutions",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Marque Employeur",
    description: "Renforcez la confiance des candidats avec une présence entreprise premium.",
    href: "/entreprises/marque-employeur",
    icon: Medal,
  },
  {
    title: "Gestion des Offres",
    description: "Pilotez vos campagnes, suivez les candidatures et accélérez vos décisions.",
    href: "/entreprises/gestion-offres",
    icon: BriefcaseBusiness,
  },
] as const;

const workflow = [
  "Définir précisément les profils cibles (hard skills, soft skills, urgence).",
  "Publier des offres lisibles avec un process de sélection transparent.",
  "Activer la CVthèque pour sourcer en parallèle des candidatures entrantes.",
  "Qualifier rapidement les candidats avec une grille d’évaluation commune.",
  "Conduire les entretiens avec un calendrier court et une communication propre.",
  "Transformer les meilleurs profils en recrutements effectifs et mesurables.",
] as const;

export default function EntreprisesPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,64,175,0.2),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#050816_0%,#0a0f1f_55%)]">
        <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-secondary-400/20 blur-3xl" />

        <div className="container-main relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-primary-700 shadow-sm dark:border-primary-800 dark:bg-neutral-900/80 dark:text-primary-300">
                Espace Entreprises - Version premium
              </div>

              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Recrutez plus vite, mieux,
                <span className="text-gradient-primary"> et avec une vraie méthode.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                KUSSALA accompagne les entreprises en République centrafricaine avec un système complet:
                sourcing, publication, sélection et conversion des candidats en recrutements effectifs.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/register?type=employer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-bold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
                >
                  Ouvrir un compte entreprise
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/entreprises/tarifs-solutions"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  Voir les solutions
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_bh69rwvr.json"
              fallbackSrc="/images/entreprisesearch.lottie"
              badge="Lottie réseau + fallback local"
              glowClassName="bg-secondary-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-white">
              Les 4 piliers de l'espace Entreprises
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-600 dark:text-neutral-300">
              Chaque module répond à un enjeu concret: trouver les talents, structurer le process et sécuriser vos recrutements.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-fluid-sm font-semibold text-primary-700 transition-transform group-hover:translate-x-0.5 dark:text-primary-300">
                  Ouvrir le module
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">
              Framework opérationnel en 6 étapes
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step, index) => (
              <div key={step} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700 text-xs font-bold dark:bg-secondary-950 dark:text-secondary-400">
                  {index + 1}
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50/70 p-5 dark:border-primary-800 dark:bg-primary-950/25">
            <p className="flex items-start gap-2 text-fluid-sm text-primary-900 dark:text-primary-200">
              Bon standard d’équipe: un délai court de feedback candidat, une grille d’évaluation commune et une décision tracée.
            </p>
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Sources fiables (RCA)</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Banque mondiale - Page pays République centrafricaine",
                href: "https://www.worldbank.org/en/country/centralafricanrepublic",
              },
              {
                title: "OIT - Fiche pays République centrafricaine",
                href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm",
              },
              {
                title: "Code du travail RCA (Loi n° 09.004 du 29 janvier 2009)",
                href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf",
              },
              {
                title: "OHADA - Portail officiel",
                href: "https://www.ohada.org/",
              },
              {
                title: "IFC - Annual Report 2024",
                href: "https://www.ifc.org/en/about/ifc-annual-report",
              },
            ].map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-primary-300 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-3">
                  
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{source.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-primary-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-3xl border border-secondary-200 bg-secondary-50 p-8 text-center dark:border-secondary-800 dark:bg-secondary-950/30">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-100 dark:bg-secondary-900">
              <Building2 className="h-7 w-7 text-secondary-700 dark:text-secondary-400" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Activez votre croissance RH</h2>
            <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
              Déployez un recrutement plus lisible, plus rapide et plus fiable avec un espace pensé pour les entreprises en RCA.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/entreprises/cvtheque-africaine"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white transition-colors hover:bg-secondary-700"
              >
                Explorer la CVthèque
              </Link>
              <Link
                href="/entreprises/gestion-offres"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              >
                Structurer mes offres
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
