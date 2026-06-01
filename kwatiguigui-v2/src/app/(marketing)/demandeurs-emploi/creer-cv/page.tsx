import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Créer un CV efficace en RCA - Guide pratique KUSSALA",
  description:
    "Construisez un CV clair, credible et adapte aux réalités du marche de l'emploi en République centrafricaine.",
  alternates: { canonical: "/demandeurs-emploi/creer-cv" },
};

const sections = [
  "Identité et contacts actifs (téléphone et WhatsApp)",
  "Titre de profil clair (poste cible)",
  "Résumé professionnel en 3-4 lignes",
  "Expériences avec résultats concrets",
  "Compétences techniques et soft skills",
  "Formations, certifications, langues",
] as const;

const mistakes = [
  "CV trop long sans information décisive",
  "Postes listes sans missions ni resultats",
  "Coordonnées injoignables ou obsolètes",
  "Un seul CV pour tous les types de postes",
  "Fautes nombreuses ou mise en page confuse",
  "Informations non verifiables ou contradictoires",
] as const;

const variants = [
  {
    title: "Version emploi formel",
    detail: "Structure classique, experiences detaillees, stabilité et responsabilites mises en avant.",
  },
  {
    title: "Version missions/informel",
    detail: "Orientation execution terrain, rapidite, fiabilite, preuves de travaux realises.",
  },
  {
    title: "Version freelance",
    detail: "Focus livrables, portefeuille, mission type, cadre de prestation et references clients.",
  },
] as const;

export default function CreerCvPage() {
  return (
    <>
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-fluid-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
              Guide CV adapt? au marché RCA
            </div>
            <h1 className="font-heading text-fluid-5xl font-bold text-neutral-900 dark:text-neutral-100">
              Créer un CV qui vous fait
              <span className="text-gradient-primary"> passer à l'entretien</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-400">
              Un bon CV en RCA doit être lisible, factuel et directement utile au recruteur.
              Cette page vous donne un cadre concret pour produire un CV performant.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/jobs" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-primary-700">
                Voir les offres
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/register" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                Créer mon compte
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">Les blocs indispensables</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((item) => (
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
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/60 p-6 dark:border-secondary-800 dark:bg-secondary-950/20">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">3 versions de CV selon votre cible</h3>
              <div className="mt-4 space-y-2">
                {variants.map((v) => (
                  <div key={v.title} className="rounded-xl border border-secondary-200 bg-white p-3 dark:border-secondary-800 dark:bg-neutral-900">
                    <p className="text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">{v.title}</p>
                    <p className="mt-1 text-fluid-sm text-neutral-600 dark:text-neutral-400">{v.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-warning-200 bg-warning-50/70 p-6 dark:border-warning-800 dark:bg-warning-950/20">
              
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">Erreurs à éviter</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                {mistakes.map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-warning-500" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
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
              { title: "OIT - Fiche pays République centrafricaine", href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm" },
              { title: "Banque mondiale - Page pays RCA", href: "https://www.worldbank.org/en/country/centralafricanrepublic" },
              { title: "Code du travail RCA (Loi n° 09.004 du 29 janvier 2009)", href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:border-primary-300 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="flex items-start gap-3">
                  
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{s.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 group-hover:text-primary-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center dark:border-primary-800 dark:bg-primary-950/30">
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-neutral-100">Prochain module à venir</h2>
            <p className="mt-3 text-fluid-base text-neutral-600 dark:text-neutral-400">Modèles CV par métier + assistant de personnalisation par secteur.</p>
            <div className="mt-6">
              <Link href="/jobs" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-primary-700">
                Candidater maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

