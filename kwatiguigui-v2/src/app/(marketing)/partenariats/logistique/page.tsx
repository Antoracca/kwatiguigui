import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  Sparkles,
  Target,
  Truck,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Flotte & Logistique - Partenariats KWATIGUIGUI RCA",
  description:
    "Positionnez vos capacités logistiques dans un réseau d’opérations professionnelles : transport, livraison et support terrain.",
  alternates: { canonical: "/partenariats/logistique" },
};

const capacities = [
  "Transport urbain et interurbain.",
  "Livraison planifiée et tournée multi-points.",
  "Appui logistique pour projets et chantiers.",
  "Capacité de mobilisation rapide sur pics d’activité.",
] as const;

const sla = [
  "Ponctualité et respect des fenêtres horaires.",
  "Traçabilité des livraisons et preuves d’exécution.",
  "Sécurité des biens transportés.",
  "Communication proactive en cas d’aléas.",
] as const;

export default function LogistiquePage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(59,130,246,0.22),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.2),transparent_35%),linear-gradient(180deg,#f3f8ff_0%,#ffffff_56%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(59,130,246,0.16),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.14),transparent_35%),linear-gradient(180deg,#081020_0%,#0c1628_56%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-sky-700 shadow-sm dark:border-sky-900 dark:bg-neutral-900/80 dark:text-sky-300">
                <Sparkles className="h-4 w-4" />
                Verticale Flotte & Logistique
              </div>
              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Faites de votre flotte
                <span className="text-gradient-primary"> un avantage compétitif réseau.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Nous connectons vos capacités logistiques à des besoins professionnels réels, avec des standards
                de service mesurables et un pilotage orienté fiabilité.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-sky-700">
                  Rejoindre comme logisticien
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Contacter l’équipe opération
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_lk80fpsm.json"
              fallbackSrc="/images/search.lottie"
              badge="Capacité logistique connectée"
              glowClassName="bg-sky-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Capacités attendues</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {capacities.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  <Truck className="h-4 w-4" />
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
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">SLA recommandés</h3>
              <ul className="mt-4 space-y-2">
                {sla.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-6 dark:border-sky-800 dark:bg-sky-950/25">
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Discipline opérationnelle</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Planning partagé et mis à jour en continu.</li>
                <li>- Affectation claire des ressources par mission.</li>
                <li>- Process de remontée incident en temps réel.</li>
                <li>- Clôture de tournée avec preuves de livraison.</li>
              </ul>
              <div className="mt-4 rounded-xl border border-sky-200 bg-white p-4 dark:border-sky-800 dark:bg-neutral-900">
                <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-300" />
                  La fiabilité d’exécution est la base de la confiance et de la reconduction des missions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Déployez votre logistique à plus grande échelle</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Intégrez un flux d’opportunités mieux cadré et montez en puissance avec des standards professionnels.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-sky-700">
              Rejoindre la verticale
              <Truck className="h-4 w-4" />
            </Link>
            <Link href="/partenariats" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              Retour à l’espace partenariats
              <Target className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
