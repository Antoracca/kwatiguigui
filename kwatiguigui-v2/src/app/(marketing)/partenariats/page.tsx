import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  FileText,
  Handshake,
  Lightbulb,
  Rocket,
  Sparkles,
  Store,
  Truck,
  Wrench,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Partenariats RCA - Développez votre activité avec KWATIGUIGUI",
  description:
    "Espace Partenariats KWATIGUIGUI : PME, agences, sous-traitance, vendeurs et logistique pour accélérer la croissance en République centrafricaine.",
  alternates: { canonical: "/partenariats" },
};

const verticals = [
  {
    title: "PME & Agences",
    description: "Programmes de stage, missions ponctuelles et collaborations commerciales structurées.",
    href: "/partenariats/pme-agences",
    icon: Lightbulb,
  },
  {
    title: "Sous-traitance & Prestations",
    description: "Mobilisez des experts opérationnels BTP, services et digital sur vos chantiers et projets.",
    href: "/partenariats/sous-traitance",
    icon: Wrench,
  },
  {
    title: "Vendeurs & Commerçants",
    description: "Intégrez votre offre de produits et services dans un réseau d’acheteurs professionnels.",
    href: "/partenariats/vendeurs",
    icon: Store,
  },
  {
    title: "Flotte & Logistique",
    description: "Déployez vos capacités de transport et de livraison au service des opérations partenaires.",
    href: "/partenariats/logistique",
    icon: Truck,
  },
] as const;

const levers = [
  "Accès à des opportunités qualifiées plutôt qu’à des demandes dispersées.",
  "Process de collaboration standardisés pour accélérer l’exécution.",
  "Visibilité renforcée auprès d’entreprises actives en RCA.",
  "Réduction des frictions opérationnelles grâce à des standards clairs.",
  "Montée en valeur de vos services via une vitrine crédible.",
] as const;

export default function PartenariatsPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.24),transparent_38%),radial-gradient(circle_at_85%_0%,rgba(14,165,233,0.2),transparent_34%),linear-gradient(180deg,#fffaf2_0%,#ffffff_56%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_38%),radial-gradient(circle_at_85%_0%,rgba(14,165,233,0.14),transparent_34%),linear-gradient(180deg,#090a13_0%,#0b1224_56%)]">
        <div className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-12 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="container-main relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-amber-700 shadow-sm dark:border-amber-900 dark:bg-neutral-900/80 dark:text-amber-300">
                <Sparkles className="h-4 w-4" />
                Espace Partenariats - Niveau stratégique
              </div>

              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Des partenariats qui
                <span className="text-gradient-primary"> transforment les opportunités en résultats.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                KWATIGUIGUI connecte les acteurs de terrain aux besoins réels des entreprises :
                sous-traitants, fournisseurs, logisticiens, PME et agences. Objectif : exécuter plus vite,
                mieux et avec plus de valeur.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/partenariats/rejoindre"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-fluid-sm font-bold text-amber-950 shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 hover:bg-amber-600"
                >
                  Devenir partenaire
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  Parler à l’équipe
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_nlxdl6ly.json"
              fallbackSrc="/images/entreprisesearch.lottie"
              badge="Écosystème partenarial en mouvement"
              glowClassName="bg-amber-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-white">
              4 verticales de partenariat à fort impact
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-600 dark:text-neutral-300">
              Choisissez votre voie d’entrée et activez un cadre de collaboration plus lisible, plus rentable et plus durable.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {verticals.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-fluid-sm font-semibold text-amber-700 transition-transform group-hover:translate-x-0.5 dark:text-amber-300">
                  Ouvrir la verticale
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">
              5 leviers qui rendent le partenariat rentable
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {levers.map((lever, index) => (
              <div key={lever} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-700 text-xs font-bold dark:bg-sky-950 dark:text-sky-300">
                  {index + 1}
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{lever}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-800 dark:bg-amber-950/20">
            <p className="flex items-start gap-2 text-fluid-sm text-amber-900 dark:text-amber-200">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Une règle simple : partenariat fort = attentes claires + engagement mesurable + communication continue.
            </p>
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Sources fiables (RCA et région)</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "Banque mondiale - Page pays République centrafricaine", href: "https://www.worldbank.org/en/country/centralafricanrepublic" },
              { title: "IFC - Annual Report 2024", href: "https://www.ifc.org/en/about/ifc-annual-report" },
              { title: "OIT - Fiche pays République centrafricaine", href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm" },
              { title: "OHADA - Portail officiel", href: "https://www.ohada.org/" },
            ].map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-amber-300 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{source.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-amber-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-800 dark:bg-amber-950/25">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900">
              <Handshake className="h-7 w-7 text-amber-700 dark:text-amber-300" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Passez au niveau partenariat premium</h2>
            <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
              Ouvrez des collaborations plus solides, plus visibles et plus profitables dès maintenant.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/partenariats/rejoindre" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-fluid-sm font-semibold text-amber-950 hover:bg-amber-600">
                Rejoindre le réseau
                <Rocket className="h-4 w-4" />
              </Link>
              <Link href="/partenariats/pme-agences" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                Explorer les modules
                <Building2 className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
