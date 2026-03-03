import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Handshake,
  Layers,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Freelance et indépendants en RCA - Missions, revenus et structuration",
  description:
    "Guide KWATIGUIGUI pour réussir en freelance en République centrafricaine: réalités terrain, secteurs porteurs, cadre de prestation, paiement, et évolution vers une activité stable.",
  alternates: { canonical: "/demandeurs-emploi/freelance-independants" },
};

const sectors = [
  {
    title: "BTP et travaux techniques",
    detail:
      "Maçonnerie, électricité, plomberie, maintenance, finition, petits et moyens chantiers.",
  },
  {
    title: "Services numériques",
    detail:
      "Design, community management, photo/video, support digital, saisie, communication visuelle.",
  },
  {
    title: "Transport et logistique",
    detail:
      "Livraison, convoyage, manutention, appui distribution, services ponctuels de mobilit?.",
  },
  {
    title: "Réparation et artisanat",
    detail:
      "Mécanique, menuiserie, soudure, couture, coiffure, services de proximité à forte demande locale.",
  },
  {
    title: "Support enmètreprise",
    detail:
      "Comptabilit? externe, secrétariat, assistance administrative, appui commercial missionnel.",
  },
  {
    title: "Formation et appui projet",
    detail:
      "Animation, formation terrain, collecte de donnees, suivi d'activités pour ONG et programmes.",
  },
] as const;

const models = [
  {
    title: "Mission courte",
    detail:
      "Objectif unique, délai court, paiement rapide. Ideal pour demarrer et construire des references.",
  },
  {
    title: "Prestation récurrente",
    detail:
      "Intervention chaque semaine ou chaque mois. Permet d'installer un revenu plus prévisible.",
  },
  {
    title: "Forfait projet",
    detail:
      "Prix global avec livrables clairs. Recommandé pour éviter les incompréhensions sur le périmêmètre.",
  },
  {
    title: "Régie / intervention à la demande",
    detail:
      "Facturation au temps ou a la journee. A encadrer par un accord écrit simple.",
  },
] as const;

const roadmap = [
  {
    step: "1. Choisir une offre claire",
    detail:
      "Une compétence principale + une promesse concrete + un format de mission simple.",
  },
  {
    step: "2. Construire la preuve",
    detail:
      "Portfolio court, photos avant/après, témoignages clients, mini références vérifiables.",
  },
  {
    step: "3. Standardiser vos documents",
    detail:
      "Modèle de proposition, bon de commande, reçu/facture, conditions de paiement.",
  },
  {
    step: "4. Stabiliser le revenu",
    detail:
      "Mixer missions courtes et clients recurrents pour lisser les périodes faibles.",
  },
  {
    step: "5. Structurer l'activité",
    detail:
      "Formalisation progressive selon vomètre volume d'affaires et vos obligations administratives.",
  },
] as const;

export default function FreelanceIndependantsPage() {
  return (
    <>
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-100 bg-secondary-50 px-4 py-2 text-fluid-sm font-medium text-secondary-700 dark:border-secondary-800 dark:bg-secondary-950 dark:text-secondary-300">
              <Sparkles className="h-4 w-4" />
              Réalités freelance en République centrafricaine
            </div>

            <h1 className="font-heading text-fluid-5xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
              Freelance et indépendants:
              <span className="text-gradient-primary"> transformer vos missions en activité solide</span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-400">
              En RCA, beaucoup de professionnels evoluent enmètre opportunites ponctuelles et activité régulière.
              Cette page vous donne un cadre pratique pour mieux vendre vos services, sécuriser vos paiements
              et progresser vers une trajectoire stable.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white shadow-md shadow-secondary-600/25 transition-all hover:bg-secondary-700"
              >
                Explorer les missions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#modele"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                Choisir mon modèle freelance
              </a>
              <a
                href="#sources"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-6 py-2.5 text-fluid-sm font-semibold text-primary-700 transition-all hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-300"
              >
                Sources fiables
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Positionnement clair
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Une offre bien définie vaut mieux que "je fais tout". Clarifiez vomètre service principal.
              </p>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-800 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                <Banknote className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Paiement sécurise
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Acompte, jalons et preuve écrite: indispensable pour proteger vomètre temps et vomètre trésorerie.
              </p>
            </div>

            <div className="rounded-2xl border border-accent-200 bg-white p-6 dark:border-accent-800 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-500">
                <Rocket className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                ?volution progressive
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Passer de mission a mission a une activité structuree est possible avec méthode.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="secteurs" className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Secteurs freelance porteurs en RCA
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              Le marché local est très opérationnel: les profils capables de livrer vite, proprement et de façon fiable sont recherchés.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div
                key={sector.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary-300 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-fluid-base font-bold text-neutral-900 dark:text-neutral-100">
                  {sector.title}
                </h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">{sector.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modele" className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Modèles de missions: lequel vous convient?
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              Le bon modèle dépend de vomètre capacité de production, de vomètre réputation et du type de clients ciblés.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {models.map((model) => (
              <div key={model.title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                  <Briefcase className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-fluid-base font-bold text-neutral-900 dark:text-neutral-100">{model.title}</h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">{model.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="paiement" className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-6 dark:border-primary-800 dark:bg-primary-950/20">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm dark:bg-neutral-900 dark:text-primary-400">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
                Sécuriser vos paiements
              </h2>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Valider le périmêmètre de mission avant de commencer.</li>
                <li>- Obtenir un acompte sur les prestations longues ou matériellement engageantes.</li>
                <li>- Definir des jalons de livraison et une date de paiement claire.</li>
                <li>- Conserver les preuves écrites (message, devis, bon, recu, facture).</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/60 p-6 dark:border-secondary-800 dark:bg-secondary-950/20">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-secondary-600 shadow-sm dark:bg-neutral-900 dark:text-secondary-400">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
                Minimum documentaire recommand?
              </h2>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Proposition de service (objet, délai, prix).</li>
                <li>- Accord de mission ou bon de commande.</li>
                <li>- Pièce de livraison (rapport, photos, livrable final).</li>
                <li>- Recu ou facture de paiement.</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex flex-wrap items-center gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
              <BadgeCheck className="h-4 w-4 text-secondary-600" />
              Astuce terrain RCA: les clients les plus fiables travaillent avec des livrables clairs, des délais fixes et une communication constante.
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Feuille de route independant: de l'opportunite a la stabilité
            </h2>
          </div>

          <div className="space-y-3">
            {roadmap.map((item) => (
              <div key={item.step} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.step}</p>
                  <p className="mt-1 text-fluid-sm text-neutral-600 dark:text-neutral-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="rounded-2xl border border-warning-200 bg-warning-50 px-5 py-4 dark:border-warning-800 dark:bg-warning-950/20">
            <p className="text-fluid-sm text-warning-800 dark:text-warning-300">
              Cette page est informative. Pour les obligations juridiques, fiscales et sociales de vomètre activité,
              vérifiez les textes en vigueur et rapprochez-vous des services compétents.
            </p>
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Sources en ligne fiables (RCA et contexte regional)
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Code du travail de la République centrafricaine (Loi n° 09.004 du 29 janvier 2009)",
                href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf",
              },
              {
                title: "Organisation internationale du Travail (OIT) - fiche pays RCA",
                href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm",
              },
              {
                title: "Banque mondiale - Page pays République centrafricaine",
                href: "https://www.worldbank.org/en/country/centralafricanrepublic",
              },
              {
                title: "Banque mondiale - Priorites économiques et emploi (RCA)",
                href: "https://www.worldbank.org/fr/news/press-release/2023/12/06/central-african-republic-prioritizing-agriculture-can-help-build-resilience-and-protect-jobs",
              },
              {
                title: "GSMA - State of the Industry Report: Mobile Money 2025",
                href: "https://www.gsma.com/mobilefordevelopment/resources/state-of-the-industry-report-on-mobile-money-2025/",
              },
            ].map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-secondary-300 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{source.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-secondary-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-8 text-center dark:border-secondary-800 dark:bg-secondary-950/30">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-100 dark:bg-secondary-900">
              <Handshake className="h-7 w-7 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Passez au niveau supérieur
            </h2>
            <p className="mt-3 text-fluid-base text-neutral-600 dark:text-neutral-400">
              Positionnez-vous sur des missions mieux cadrées, mieux payées et plus récurrentes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white transition-all hover:bg-secondary-700"
              >
                Voir les opportunites
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                <Building2 className="h-4 w-4" />
                Créer mon profil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

