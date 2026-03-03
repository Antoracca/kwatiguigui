import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stages et alternances en RCA - Guide candidat",
  description:
    "Comprendre et réussir vos candidatures de stage et d'alternance en République centrafricaine: preparation, dossier, suivi et progression vers l'emploi.",
  alternates: { canonical: "/demandeurs-emploi/stages-alternances" },
};

const stageKit = [
  "CV cible stage/alternance (1 page propre)",
  "Lettre courte orientée motivation et apprentissage",
  "Pièces académiques utiles (attestation, relevés, diplôme)",
  "Disponibilités claires (dates, rythme, mobilit?)",
  "Contact joignable et réponse rapide",
] as const;

const targets = [
  "PME locales en croissance",
  "Entreprises structurées (services, commerce, BTP)",
  "ONG et projets de développement",
  "?tablissements techniques et structures publiques ouvertes à l'accueil",
] as const;

const progression = [
  "Démarrer sur une mission stage bien encadrée",
  "Livrer avec régularité et documenter vos resultats",
  "Transformer l'encadrement en référence professionnelle",
  "Construire un profil employable pour CDD/CDI ou mission freelance",
] as const;

export default function StagesAlternancesPage() {
  return (
    <>
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-100 bg-secondary-50 px-4 py-2 text-fluid-sm font-medium text-secondary-700 dark:border-secondary-800 dark:bg-secondary-950 dark:text-secondary-300">
              <Sparkles className="h-4 w-4" />
              Focus jeunes talents - RCA
            </div>
            <h1 className="font-heading text-fluid-5xl font-bold text-neutral-900 dark:text-neutral-100">
              Stages et alternances:
              <span className="text-gradient-primary"> transformer l'apprentissage en opportunit?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-400">
              Cette page vous aide à préparer un dossier solide, à cibler les bons employeurs et convertir votre stage
              en tremplin vers un emploi formel en République centrafricaine.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/jobs" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-secondary-700">
                Explorer les opportunités
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/register" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                Créer mon profil
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">Kit candidature stage/alternance</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {stageKit.map((k) => (
              <div key={k} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-6 dark:border-primary-800 dark:bg-primary-950/20">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-600 dark:bg-neutral-900 dark:text-primary-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">Où candidater en priorité</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                {targets.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-accent-200 bg-accent-50/60 p-6 dark:border-accent-800 dark:bg-accent-950/20">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent-700 dark:bg-neutral-900 dark:text-accent-500">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">Comment se démarquer</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />Montrer une vraie motivation métier.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />Arriver avec un mini plan d'apprentissage.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />être ponctuel et communiquer clairement.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />Documenter vos contributions pendant la mission.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">De stage à emploi: trajectoire recommandée</h2>
          </div>
          <div className="space-y-3">
            {progression.map((p, i) => (
              <div key={p} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400 text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">Sources en ligne fiables</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "OIT - Fiche pays RCA", href: "https://www.ilo.org/africa/countries-covered/central-african-republic/lang--en/index.htm" },
              { title: "Banque mondiale - Page pays RCA", href: "https://www.worldbank.org/en/country/centralafricanrepublic" },
              { title: "Code du travail RCA (Loi n° 09.004)", href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:border-secondary-300 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{s.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 group-hover:text-secondary-500" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

