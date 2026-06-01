import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  FileText,
  Megaphone,
  Medal,
  MessageCircle,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Marque Employeur - Attirer les talents en RCA",
  description:
    "Construisez une marque employeur crédible et attractive pour améliorer vos recrutements en République centrafricaine.",
  alternates: { canonical: "/entreprises/marque-employeur" },
};

const pillars = [
  {
    title: "Positionnement employeur clair",
    detail: "Expliquez qui vous êtes, ce que vous construisez et ce que vous attendez d’un talent.",
  },
  {
    title: "Promesse candidat réaliste",
    detail: "Mettez en avant ce que le candidat vivra réellement dans vos équipes.",
  },
  {
    title: "Preuves visibles",
    detail: "Projets livrés, environnement de travail, management, montée en compétences.",
  },
  {
    title: "Communication régulière",
    detail: "Publiez un rythme éditorial stable au lieu de communiquer uniquement en urgence.",
  },
] as const;

const assets = [
  "Page entreprise enrichie (mission, culture, métiers).",
  "Bibliothèque visuelle: photos terrain, équipes, projets.",
  "Témoignages collaborateurs et managers.",
  "FAQ candidat pour réduire les frictions de candidature.",
  "Calendrier éditorial sur 90 jours.",
] as const;

export default function MarqueEmployeurPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.16),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(14,165,233,0.18),transparent_36%),linear-gradient(180deg,#fff9fd_0%,#ffffff_58%)] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.12),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(14,165,233,0.14),transparent_36%),linear-gradient(180deg,#060914_0%,#0a1324_58%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-pink-700 shadow-sm dark:border-pink-900 dark:bg-neutral-900/80 dark:text-pink-300">
                Module Marque Employeur
              </div>

              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Faites choisir votre entreprise,
                <span className="text-gradient-primary"> pas seulement votre offre.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Une marque employeur forte réduit le coût d’acquisition candidat, augmente la qualité des candidatures
                et améliore la conversion entre short-list et embauche.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-pink-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-pink-700">
                  Lancer ma marque employeur
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/entreprises" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Retour espace entreprises
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_nlxdl6ly.json"
              fallbackSrc="/images/annonces.lottie"
              badge="Storytelling visuel + branding RH"
              glowClassName="bg-pink-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Les piliers qui font la différence</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <h3 className="font-heading text-fluid-base font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-6 dark:border-primary-800 dark:bg-primary-950/25">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Assets à produire</h3>
              <ul className="mt-4 space-y-2">
                {assets.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/70 p-6 dark:border-secondary-800 dark:bg-secondary-950/25">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Plan d’exécution 30 jours</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Semaine 1: cadrage du message employeur.</li>
                <li>- Semaine 2: production des contenus de base.</li>
                <li>- Semaine 3: publication multi-canaux et offres enrichies.</li>
                <li>- Semaine 4: mesure des retours et ajustements.</li>
              </ul>
              <div className="mt-4 rounded-xl border border-secondary-200 bg-white p-4 dark:border-secondary-800 dark:bg-neutral-900">
                <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600 dark:text-secondary-400" />
                  Une marque employeur crédible se construit dans la durée, avec cohérence entre promesse et réalité.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <Camera className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              <p className="mt-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">Visuels authentiques de vos équipes et de vos projets.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <MessageCircle className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              <p className="mt-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">Ton de marque constant dans vos offres, mails et entretiens.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <Medal className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              <p className="mt-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">Preuves de progression interne et de reconnaissance des talents.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Faites rayonner votre entreprise</h2>
          <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
            Nous construisons avec vous une présence employeur différenciante, crédible et orientée résultats.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-pink-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-pink-700">
              Discuter du projet
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/entreprises/gestion-offres" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              Structurer le pipeline candidats
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 text-left dark:border-neutral-700 dark:bg-neutral-900">
            <p className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
              Références: Banque mondiale, OIT, IFC, Code du travail RCA.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
