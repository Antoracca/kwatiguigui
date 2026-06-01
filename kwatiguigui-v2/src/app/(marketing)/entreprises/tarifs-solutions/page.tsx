import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ChartNoAxesCombined,
  CheckCircle2,
  CreditCard,
  FileText,
  Gem,
  Sparkles,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Tarifs & Solutions Entreprises - KUSSALA RCA",
  description:
    "Découvrez des formules de recrutement adaptées aux PME, agences et grandes entreprises en République centrafricaine.",
  alternates: { canonical: "/entreprises/tarifs-solutions" },
};

type Plan = {
  name: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};
const plans: Plan[] = [
  {
    name: "Lancement",
    price: "0 FCFA",
    note: "Pour démarrer et tester la plateforme",
    features: ["Profil entreprise", "1 offre active", "Support standard"],
    cta: "Commencer",
    href: "/register?type=employer",
  },
  {
    name: "Croissance",
    price: "Sur abonnement",
    note: "Pour PME en phase de recrutement régulier",
    features: ["Offres multiples", "Tri avancé candidatures", "Suivi pipeline"],
    cta: "Demander un plan",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    note: "Pour groupes, multisites et gros volumes",
    features: ["Accompagnement dédié", "Sourcing prioritaire", "Pilotage KPI recrutement"],
    cta: "Parler à l'équipe",
    href: "/contact",
  },
 ];

const roiSignals = [
  "Réduction du temps moyen de recrutement",
  "Qualité de short-list plus homogène",
  "Meilleure conversion candidatures -> entretiens",
  "Décisions plus rapides avec process standardisé",
 ];

export default function TarifsSolutionsPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(56,189,248,0.2),transparent_36%),linear-gradient(180deg,#f8fdff_0%,#ffffff_58%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(56,189,248,0.16),transparent_36%),linear-gradient(180deg,#050913_0%,#091224_58%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-accent-700 shadow-sm dark:border-accent-800 dark:bg-neutral-900/80 dark:text-accent-400">
                Tarifs & Solutions Entreprises
              </div>

              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Investir juste.
                <span className="text-gradient-primary"> Recruter mieux.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Choisissez une formule alignée à votre maturité recrutement. Notre approche est simple:
                valeur mesurable, process clair et montée en puissance progressive.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-fluid-sm font-bold text-accent-950 shadow-lg shadow-accent-500/30 transition-colors hover:bg-accent-600"
                >
                  Demander une proposition
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/entreprises"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  Retour espace entreprises
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_bh69rwvr.json"
              fallbackSrc="/images/annonces.lottie"
              badge="Projection ROI recrutement"
              glowClassName="bg-accent-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-white">Formules lisibles et évolutives</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border p-6 ${plan.highlight ? "border-primary-300 bg-white shadow-xl dark:border-primary-700 dark:bg-neutral-900" : "border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"}`}
              >
                {plan.highlight && (
                  <span className="mb-3 inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                    Recommandé
                  </span>
                )}
                <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-2xl font-black text-neutral-900 dark:text-white">{plan.price}</p>
                <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">{plan.note}</p>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-fluid-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/70 p-6 dark:border-secondary-800 dark:bg-secondary-950/25">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Comment calculer votre retour</h3>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">
                Suivez les indicateurs qui impactent vraiment votre coût de recrutement et votre vitesse d’exécution.
              </p>
              <ul className="mt-4 space-y-2">
                {roiSignals.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-6 dark:border-primary-800 dark:bg-primary-950/25">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Cadre commercial recommandé</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Objectifs de recrutement clarifiés dès le départ.</li>
                <li>- Période pilote et revue de performance à 30 jours.</li>
                <li>- Ajustement de la formule selon vos volumes réels.</li>
                <li>- Gouvernance et points de suivi mensuels.</li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                Les prix finaux dépendent du volume, du niveau de sourcing et de l’accompagnement attendu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Construisons votre plan entreprise</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Nous vous aidons à cadrer une stratégie de recrutement rentable, adaptée à votre réalité opérationnelle en RCA.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-fluid-sm font-semibold text-accent-950 hover:bg-accent-600">
              Prendre rendez-vous
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/entreprises/marque-employeur" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              Travailler la marque employeur
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 text-left dark:border-neutral-700 dark:bg-neutral-900">
            <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
              Références: Banque mondiale, OIT, IFC, Code du travail RCA, OHADA.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

