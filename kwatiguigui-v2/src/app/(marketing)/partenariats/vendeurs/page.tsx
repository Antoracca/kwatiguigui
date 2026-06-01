import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  Sparkles,
  Store,
  Target,
  Wallet,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Vendeurs & Commerçants - Partenariats KUSSALA RCA",
  description:
    "Intégrez votre offre de produits et services à un réseau de demande professionnelle structuré en RCA.",
  alternates: { canonical: "/partenariats/vendeurs" },
};

const blocks = [
  "Catalogue produit/service clair avec conditions commerciales lisibles.",
  "Disponibilités, délais de livraison et zones couvertes explicites.",
  "Politique de qualité et de retour définie.",
  "Canal de traitement rapide des demandes clients.",
] as const;

const performance = [
  "Taux de réponse aux demandes",
  "Respect des délais de livraison",
  "Taux de conformité produit/service",
  "Satisfaction des clients partenaires",
] as const;

export default function VendeursPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(234,88,12,0.24),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.2),transparent_35%),linear-gradient(180deg,#fff8f1_0%,#ffffff_56%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(234,88,12,0.16),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.14),transparent_35%),linear-gradient(180deg,#0a0d17_0%,#101826_56%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-orange-700 shadow-sm dark:border-orange-900 dark:bg-neutral-900/80 dark:text-orange-300">
                Verticale Vendeurs & Commerçants
              </div>
              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Faites passer votre commerce
                <span className="text-gradient-primary"> au niveau réseau professionnel.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Connectez votre offre aux besoins entreprises avec un positionnement clair,
                une exécution fiable et des standards commerciaux solides.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-orange-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-orange-700">
                  Rejoindre comme vendeur
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Contacter l’équipe
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_lk80fpsm.json"
              fallbackSrc="/images/search.lottie"
              badge="Réseau d’achats professionnels"
              glowClassName="bg-orange-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Fondations commerciales attendues</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {blocks.map((item) => (
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-800 dark:bg-emerald-950/25">
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Indicateurs de performance</h3>
              <ul className="mt-4 space-y-2">
                {performance.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-6 dark:border-orange-800 dark:bg-orange-950/25">
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Discipline commerciale recommandée</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Offres et tarifs mis à jour en continu.</li>
                <li>- Validation rapide des demandes entrantes.</li>
                <li>- Gestion proactive des écarts de livraison.</li>
                <li>- Traçabilité des transactions et des engagements.</li>
              </ul>
              <div className="mt-4 rounded-xl border border-orange-200 bg-white p-4 dark:border-orange-800 dark:bg-neutral-900">
                <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                  Plus votre qualité de service est stable, plus votre positionnement partenaire devient prioritaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Intégrez le réseau vendeurs</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Passez d’un flux de ventes irrégulier à un pipeline de demandes plus qualifiées.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-orange-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-orange-700">
              Candidater
              <Wallet className="h-4 w-4" />
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
