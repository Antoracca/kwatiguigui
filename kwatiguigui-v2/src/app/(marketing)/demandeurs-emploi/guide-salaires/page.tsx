import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Banknote,
  Briefcase,
  Calculator,
  CheckCircle2,
  FileText,
  Scale,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide des salaires en RCA - Methodes et repères",
  description:
    "Comprendre les niveaux de remuneration en République centrafricaine: facteurs, méthodes de calcul, negotiation et points de vigilance.",
  alternates: { canonical: "/demandeurs-emploi/guide-salaires" },
};

const factors = [
  "Niveau de compétence et rarete du profil",
  "Localisation (Bangui / province) et contraintes terrain",
  "Type de contrat (CDI, CDD, mission ponctuelle)",
  "Niveau de responsabilité et pression opérationnelle",
  "Stabilit? de l'employeur et capacit? de paiement",
  "Disponibilité du profil sur le marché local",
] as const;

const negotiation = [
  "Arriver avec une fourchette argumentée, pas un montant isolé",
  "Présenter vos preuves de valeur (résultats, références, portfolio)",
  "Discuter aussi des avantages non monétaires utiles",
  "Valider le net perçu, la périodicité et les conditions de paiement",
  "Demander un point d'ajustement apres période d'essai ou objectifs atteints",
] as const;

export default function GuideSalairesPage() {
  return (
    <>
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-4 py-2 text-fluid-sm font-medium text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-500">
              Repères de rémunération en contexte RCA
            </div>
            <h1 className="font-heading text-fluid-5xl font-bold text-neutral-900 dark:text-neutral-100">
              Guide des salaires:
              <span className="text-gradient-primary"> mieux ?valuer votre valeur</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-400">
              En RCA, il n'existe pas toujours une grille unique par métier. Cette page vous donne une méthode fiable
              pour estimer une fourchette cohérente et négocier avec plus de maîtrise.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/jobs" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-fluid-sm font-semibold text-accent-950 hover:bg-accent-600">
                Voir les offres
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#méthodes" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                Méthodes d'estimation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">Ce qui influence un salaire en RCA</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {factors.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-500">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="méthodes" className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-6 dark:border-primary-800 dark:bg-primary-950/20">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">Méthode simple en 3 étapes</h3>
              <ol className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>1. Relever 5 à 10 offres proches (poste, ville, niveau).</li>
                <li>2. Identifier la fourchette basse, médiane et haute.</li>
                <li>3. Positionner votre profil avec preuves (expérience, impact, fiabilité).</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/60 p-6 dark:border-secondary-800 dark:bg-secondary-950/20">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">Négociation responsable</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                {negotiation.map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-warning-200 bg-warning-50 px-5 py-4 dark:border-warning-800 dark:bg-warning-950/20">
            <p className="flex items-start gap-2 text-fluid-sm text-warning-800 dark:text-warning-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              Attention: ce guide propose des méthodes et non une grille salariale officielle unique. Les montants varient selon secteur, employeur et contexte économique.
            </p>
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">Sources en ligne fiables</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "Banque mondiale - Page pays RCA", href: "https://www.worldbank.org/en/country/centralafricanrepublic" },
              { title: "Banque mondiale - Emploi et résilience en RCA", href: "https://www.worldbank.org/fr/news/press-release/2023/12/06/central-african-republic-prioritizing-agriculture-can-help-build-resilience-and-protect-jobs" },
              { title: "OIT - Fiche pays RCA", href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm" },
              { title: "Code du travail RCA (Loi n° 09.004)", href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:border-accent-300 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="flex items-start gap-3">
                  
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{s.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 group-hover:text-accent-500" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

