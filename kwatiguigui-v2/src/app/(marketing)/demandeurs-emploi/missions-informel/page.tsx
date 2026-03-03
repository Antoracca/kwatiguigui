import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Hammer,
  MapPin,
  Shield,
  Sparkles,
  Store,
  Target,
  Truck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Missions et informel en RCA - Opportunités terrain et progression",
  description:
    "Guide KWATIGUIGUI pour les missions et l'activité informelle en République centrafricaine: réalités terrain, secteurs actifs, securisation des paiements, et progression vers plus de stabilité.",
  alternates: { canonical: "/demandeurs-emploi/missions-informel" },
};

const activities = [
  {
    title: "Commerce de proximité",
    detail:
      "Vente, approvisionnement, tenue de point, relation client, activités de marche et quartier.",
    icon: Store,
  },
  {
    title: "Services manuels et artisanat",
    detail:
      "Maçonnerie, plomberie, électricité, menuiserie, mécanique, coiffure, couture, réparation.",
    icon: Wrench,
  },
  {
    title: "Transport et livraison",
    detail:
      "Courses, distribution urbaine, appui logistique local, manutention et convoyage.",
    icon: Truck,
  },
  {
    title: "Services ponctuels",
    detail:
      "Main d'oeuvre journalière, assistance evenementielle, appui operationnel selon les besoins.",
    icon: Hammer,
  },
] as const;

const fieldRules = [
  "Toujours clarifier la mission avant de commencer (tache, durée, livrable).",
  "Fixer un prix total ou un tarif journalier par écrit (meme simple).",
  "Demander un acompte si la mission engage du matériel ou plusieurs jours.",
  "Conserver les preuves: messages, photos avant/apres, recu de paiement.",
  "Travailler en binôme de confiance sur les prestations sensibles ou tardives.",
  "éviter les engagements vagues sans point de validation intermédiaire.",
] as const;

const progression = [
  {
    step: "1. Stabiliser une compétence principale",
    detail:
      "êmètre reconnu pour une spécialité claire augmente vos chances de recommandation locale.",
  },
  {
    step: "2. Construire un mini portefeuille",
    detail:
      "Photos de travaux, temoignages clients, liste de missions réussies, references contactables.",
  },
  {
    step: "3. Standardiser prix et documents",
    detail:
      "Avoir un modèle de devis, un reçu type et des conditions de paiement simples.",
  },
  {
    step: "4. Passer de missions uniques a clients recurrents",
    detail:
      "Objectif: revenu plus régulier grace a des prestations mensuelles ou hebdomadaires.",
  },
  {
    step: "5. Envisager la formalisation progressive",
    detail:
      "Selon vomètre niveau d'activité, vous pouvez évoluer vers un cadre plus structure.",
  },
] as const;

export default function MissionsInformelPage() {
  return (
    <>
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-4 py-2 text-fluid-sm font-medium text-accent-700 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-500">
              <Sparkles className="h-4 w-4" />
              Réalités terrain - Missions et informel en RCA
            </div>

            <h1 className="font-heading text-fluid-5xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
              Missions et informel:
              <span className="text-gradient-primary"> mieux organiser son activité pour gagner en stabilité</span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-400">
              Le secteur informel reste une réalité majeure du travail en République centrafricaine.
              Cette page vous aide à structurer vos missions, à protéger vos paiements et progresser vers
              des opportunites plus régulières.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-fluid-sm font-semibold text-accent-950 shadow-md shadow-accent-500/25 transition-all hover:bg-accent-600"
              >
                Voir les missions disponibles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#terrain"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                Conseils terrain
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
                Clart? de mission
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Une mission bien définie protège vomètre temps et limite les litiges de fin de prestation.
              </p>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-800 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                <Banknote className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Paiement plus sûr
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Acompte, jalons, reçu: des gestes simples qui réduisent le risque d'impayé.
              </p>
            </div>

            <div className="rounded-2xl border border-accent-200 bg-white p-6 dark:border-accent-800 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-500">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Réputation locale
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                La confiance (qualité + ponctualit? + preuve) est vomètre principal moteur de bouche-?-oreille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="activités" className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Activités informelles fréquentes en RCA
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              Ces activités couvrent une grande partie des opportunités missionnelles urbaines et peri-urbaines.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-fluid-base font-bold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="terrain" className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Règles pratiques terrain pour mieux se protéger
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {fieldRules.map((rule) => (
              <div key={rule} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{rule}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-warning-200 bg-warning-50 px-5 py-4 dark:border-warning-800 dark:bg-warning-950/20">
            <p className="flex items-start gap-2 text-fluid-sm text-warning-800 dark:text-warning-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              Ne commencez pas une mission lourde sans accord clair sur le prix, le périmêmètre et le délai. C'est la première cause de conflit en prestation informelle.
            </p>
          </div>
        </div>
      </section>

      <section id="progression" className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Progression: de mission journalière a activité durable
            </h2>
          </div>

          <div className="space-y-3">
            {progression.map((item) => (
              <div key={item.step} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.step}</p>
                  <p className="mt-1 text-fluid-sm text-neutral-600 dark:text-neutral-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <p className="mb-2 text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">Bon signal client</p>
              <p className="text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Client qui valide les détails en amont, accepte des points de contrôle et paie selon un schéma fixe.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
              <p className="mb-2 text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">Signal risque</p>
              <p className="text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Demande urgente sans détails, changement continu du périmêmètre, refus d'acompte ou de preuve écrite.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Sources en ligne fiables (RCA)
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Code du travail de la République centrafricaine (Loi n° 09.004 du 29 janvier 2009)",
                href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf",
              },
              {
                title: "OIT - Fiche pays République centrafricaine",
                href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm",
              },
              {
                title: "Banque mondiale - Page pays RCA",
                href: "https://www.worldbank.org/en/country/centralafricanrepublic",
              },
              {
                title: "Banque mondiale - Prioriser l'agriculture pour proteger les emplois (RCA)",
                href: "https://www.worldbank.org/fr/news/press-release/2023/12/06/central-african-republic-prioritizing-agriculture-can-help-build-resilience-and-protect-jobs",
              },
              {
                title: "GSMA - State of the Industry Report on Mobile Money 2025",
                href: "https://www.gsma.com/mobilefordevelopment/resources/state-of-the-industry-report-on-mobile-money-2025/",
              },
            ].map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-accent-300 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{source.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-accent-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center dark:border-accent-800 dark:bg-accent-950/30">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 dark:bg-accent-900">
              <Briefcase className="h-7 w-7 text-accent-700 dark:text-accent-500" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Passez à l'?tape suivante
            </h2>
            <p className="mt-3 text-fluid-base text-neutral-600 dark:text-neutral-400">
              Trouvez des missions mieux cadrées et développez une réputation professionnelle durable.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-fluid-sm font-semibold text-accent-950 transition-all hover:bg-accent-600"
              >
                Voir les missions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                <MapPin className="h-4 w-4" />
                Créer mon profil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

