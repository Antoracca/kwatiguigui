import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Partenariats PME & Agences - KWATIGUIGUI RCA",
  description:
    "Développez vos collaborations avec les entreprises via des programmes de stage, de mission et de co-exécution.",
  alternates: { canonical: "/partenariats/pme-agences" },
};

const models = [
  "Programme de stages supervisés avec objectifs opérationnels.",
  "Missions ponctuelles externalisées pour pics d’activité.",
  "Co-traitance sur appels d’offres et projets multisites.",
  "Appui recrutement sur profils métiers difficiles à sourcer.",
] as const;

const gains = [
  "Pipeline d’opportunités plus régulier.",
  "Références clients renforcées.",
  "Montée en compétence des équipes terrain.",
  "Positionnement plus crédible face aux grands comptes.",
] as const;

export default function PmeAgencesPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(16,185,129,0.2),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.18),transparent_35%),linear-gradient(180deg,#f4fff9_0%,#ffffff_56%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(16,185,129,0.14),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.14),transparent_35%),linear-gradient(180deg,#070d16_0%,#0b1424_56%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-neutral-900/80 dark:text-emerald-300">
                <Sparkles className="h-4 w-4" />
                Verticale PME & Agences
              </div>
              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Passez de prestataire local
                <span className="text-gradient-primary"> à partenaire de croissance.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Mettez vos équipes et vos capacités au service de besoins réels : missions, stages, co-exécution,
                sourcing et support opérationnel.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-emerald-700">
                  Rejoindre cette verticale
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Discuter d’un partenariat
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_lk80fpsm.json"
              fallbackSrc="/images/annonces.lottie"
              badge="Croissance PME pilotée"
              glowClassName="bg-emerald-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Modèles de collaboration</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {models.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-6 dark:border-primary-800 dark:bg-primary-950/25">
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Gains business attendus</h3>
              <ul className="mt-4 space-y-2">
                {gains.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-800 dark:bg-emerald-950/25">
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Cadre 30 jours recommandé</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Semaine 1 : cadrage offre partenaire + cibles.</li>
                <li>- Semaine 2 : activation visibilité et dossier commercial.</li>
                <li>- Semaine 3 : premiers échanges opérationnels.</li>
                <li>- Semaine 4 : revue résultats et plan de montée en charge.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              Références : Banque mondiale, OIT, IFC, OHADA.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Passez à l’action</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Activez votre partenariat PME avec un cadre clair et des objectifs mesurables.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-emerald-700">
              Candidater
              <Rocket className="h-4 w-4" />
            </Link>
            <Link href="/partenariats" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              Retour à l’espace partenariats
              <Building2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
