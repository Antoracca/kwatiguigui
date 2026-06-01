import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileText,
  Shield,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Sous-traitance & Prestations - Partenariats KUSSALA RCA",
  description:
    "Positionnez votre expertise technique sur des projets structurés avec des standards de qualité et de livraison clairs.",
  alternates: { canonical: "/partenariats/sous-traitance" },
};

const standards = [
  "Périmètre de mission documenté dès le lancement.",
  "Livrables, jalons et critères qualité définis.",
  "Planning d’intervention validé et traçable.",
  "Process d’escalade opérationnelle en cas de blocage.",
  "Clôture de mission avec preuve de livraison.",
] as const;

const riskControls = [
  "Validation technique préalable avant engagement.",
  "Contrôle des capacités de ressources et équipements.",
  "Suivi hebdomadaire des avancements et des écarts.",
  "Documentation des incidents et actions correctives.",
] as const;

export default function SousTraitancePage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(244,63,94,0.2),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(14,165,233,0.18),transparent_35%),linear-gradient(180deg,#fff5f7_0%,#ffffff_56%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(244,63,94,0.14),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(14,165,233,0.14),transparent_35%),linear-gradient(180deg,#0a0c18_0%,#0d1326_56%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-rose-700 shadow-sm dark:border-rose-900 dark:bg-neutral-900/80 dark:text-rose-300">
                Verticale Sous-traitance & Prestations
              </div>
              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Exécuter fort,
                <span className="text-gradient-primary"> livrer propre, rester sélectionné.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Cette verticale connecte les experts techniques aux projets exigeants avec un cadre d’exécution précis,
                pour transformer votre savoir-faire en références majeures.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-rose-700">
                  Candidater comme prestataire
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Échanger avec l’équipe projet
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_bh69rwvr.json"
              fallbackSrc="/images/searchforemploye.lottie"
              badge="Pilotage de mission et qualité"
              glowClassName="bg-rose-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Standards d’exécution attendus</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {standards.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                
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
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Contrôle des risques opérationnels</h3>
              <ul className="mt-4 space-y-2">
                {riskControls.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 dark:border-rose-800 dark:bg-rose-950/25">
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Positionnement gagnant</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Spécialité claire plutôt qu’offre trop large.</li>
                <li>- Dossier de preuves actualisé (projets, photos, témoignages).</li>
                <li>- Respect strict des délais et des engagements.</li>
                <li>- Communication proactive avec les équipes de pilotage.</li>
              </ul>
              <div className="mt-4 rounded-xl border border-rose-200 bg-white p-4 dark:border-rose-800 dark:bg-neutral-900">
                <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                  Les partenaires les plus demandés sont ceux qui livrent avec constance, pas ceux qui promettent le plus.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
              Références : Banque mondiale, OIT, IFC, OHADA, Code du travail RCA.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Passez en mode sous-traitance premium</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Activez des missions plus solides, mieux cadrées et à plus forte valeur.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-rose-700">
              Rejoindre la verticale
              <Wrench className="h-4 w-4" />
            </Link>
            <Link href="/partenariats" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              Retour à l’espace partenariats
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
