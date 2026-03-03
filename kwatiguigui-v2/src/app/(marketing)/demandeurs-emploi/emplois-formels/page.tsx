import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardCheck,
  FileText,
  Gavel,
  Landmark,
  Layers,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emplois formels en RCA - CDI, CDD, secteur privé et public",
  description:
    "Guide pratique KWATIGUIGUI pour comprendre les emplois formels en République centrafricaine: CDI, CDD, secteur prive, secteur public, droits essentiels et pistes concretes.",
  alternates: { canonical: "/demandeurs-emploi/emplois-formels" },
};

const privateSectors = [
  {
    title: "BTP & infrastructures",
    detail:
      "Postes terrain et encadrement: conducteur de travaux, chef d'équipe, magasinier, maintenance.",
  },
  {
    title: "Commerce & distribution",
    detail:
      "Vente, gestion de point de vente, approvisionnement, relation client, caisse et supervision.",
  },
  {
    title: "Services & support entreprise",
    detail:
      "Assistants administratifs, comptabilité, secrétariat, RH, support client, back-office.",
  },
  {
    title: "Transport & logistique",
    detail:
      "Chauffeurs, planification, suivi de flotte, manutention, gestion dépôt, distribution.",
  },
  {
    title: "Sant?, ?ducation, ONG",
    detail:
      "Fonctions administratives, techniques et operationnelles selon projets et etablissements.",
  },
  {
    title: "Telecom, energie, numérique",
    detail:
      "Techniciens reseau, support IT, commerciaux terrain, fonctions qualité et operations.",
  },
] as const;

const publicTracks = [
  {
    step: "1. Veille des ouvertures",
    detail:
      "Suivre les canaux institutionnels et les communiqués de recrutement de la fonction publique.",
  },
  {
    step: "2. Dossier administratif",
    detail:
      "Preparer des pieces propres, lisibles et a jour: identite, diplômes, justificatifs requis.",
  },
  {
    step: "3. Concours / selection",
    detail:
      "Respecter strictement les conditions du texte d'appel (délais, format, centre, frais eventuels).",
  },
  {
    step: "4. Nomination et prise de poste",
    detail:
      "Suivre les actes administratifs jusqu'à affectation et intégration effective.",
  },
] as const;

const upcomingModules = [
  {
    title: "Calendrier concours secteur public",
    detail: "Suivi des publications, périodes de dépôt, rappels et checklists.",
  },
  {
    title: "Fiches métiers formels",
    detail: "Missions, compétences, salaires indicatifs, évolution de carriere.",
  },
  {
    title: "Modèles dossier candidature",
    detail: "CV, lettre, attestation et trames de presentation adaptées RCA.",
  },
  {
    title: "Comparateur CDI / CDD par secteur",
    detail: "Duree, stabilité, progression, points de vigilance avant signature.",
  },
] as const;

export default function EmploisFormelsPage() {
  return (
    <>
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-fluid-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
              <Sparkles className="h-4 w-4" />
              Guide spécial RCA - Emplois formels
            </div>

            <h1 className="font-heading text-fluid-5xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
              Emplois formels en RCA:
              <span className="text-gradient-primary"> CDI, CDD, secteur privé et public</span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-400">
              Cette page regroupe l'essentiel pour comprendre le cadre formel en République centrafricaine,
              comparer les types de contrats, cibler les secteurs qui recrutent et préparer une candidature solide.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white shadow-md shadow-primary-600/25 transition-all hover:bg-primary-700"
              >
                Voir les offres d'emploi
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#cdi-cdd"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                Comprendre CDI et CDD
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
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Cadre légal clair
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                L'emploi formel repose sur un contrat, des obligations de l'employeur et des droits du salari?.
              </p>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-800 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Lecture pratique
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Nous simplifions les notions CDI, CDD, secteur privé et public pour des decisions concretes.
              </p>
            </div>

            <div className="rounded-2xl border border-accent-200 bg-white p-6 dark:border-accent-800 dark:bg-neutral-900">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-500">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Progression continue
              </h2>
              <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                Chaque bloc est prévu pour évoluer progressivement en mini-guides actionnables.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cdi-cdd" className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              CDI et CDD: bien choisir son cadre de contrat
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              En RCA, le Code du travail encadre les contrats a durée determinee et indeterminee.
              L'objectif est d'éviter la précarisation abusive et de protéger les parties.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-6 dark:border-primary-800 dark:bg-primary-950/20">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm dark:bg-neutral-900 dark:text-primary-400">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
                CDI (contrat a durée indeterminee)
              </h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Forme standard et stable de la relation de travail.</li>
                <li>- Peut comporter une période d'essai selon les conditions légales ou conventionnelles.</li>
                <li>- Rupture encadrée (préavis, motifs et procedure).</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-secondary-200 bg-secondary-50/60 p-6 dark:border-secondary-800 dark:bg-secondary-950/20">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-secondary-600 shadow-sm dark:bg-neutral-900 dark:text-secondary-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
                CDD (contrat a durée determinee)
              </h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Doit répondre à un besoin temporaire et être rédigé clairement.</li>
                <li>- La loi encadre strictement sa durée et son renouvellement.</li>
                <li>- Le dépassement des limites légales peut entraîner une requalification en CDI.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-fluid-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">Point de comparaison</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">CDI</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">CDD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                <tr className="bg-white dark:bg-neutral-900">
                  <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Nature</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Relation durable</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Mission ou besoin temporaire</td>
                </tr>
                <tr className="bg-white dark:bg-neutral-900">
                  <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Stabilit?</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Plus élevée</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Limitée dans le temps</td>
                </tr>
                <tr className="bg-white dark:bg-neutral-900">
                  <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Evolution</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Base solide de progression</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Peut servir de tremplin vers CDI</td>
                </tr>
                <tr className="bg-white dark:bg-neutral-900">
                  <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Vigilance candidat</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Verifier fonction, salaire, préavis</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">Verifier durée, motif, renouvellement</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Note: cette page simplifie les principes. Vérifiez toujours le texte légal applicable, les conventions collectives et votre contrat.
          </p>
        </div>
      </section>

      <section id="secteur-prive" className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Secteur privé en RCA: o? se positionner
              </h2>
              <p className="mt-2 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
                Le privé offre des opportunités variées selon vos compétences techniques, commerciales, administratives et terrain.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-secondary-600 px-5 py-2.5 text-fluid-sm font-semibold text-white transition-all hover:bg-secondary-700"
            >
              Voir les offres du prive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {privateSectors.map((sector) => (
              <div
                key={sector.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 dark:border-neutral-700 dark:bg-neutral-900"
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

      <section id="secteur-public" className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Secteur public: logique de parcours et exigences
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              Le parcours public suit une logique administrative plus structuree: appels, dossiers, selection et actes officiels.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-accent-200 bg-accent-50/60 p-6 dark:border-accent-800 dark:bg-accent-950/20">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent-700 shadow-sm dark:bg-neutral-900 dark:text-accent-500">
                <Gavel className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
                Ce qui fait la différence
              </h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Rigueur documentaire et respect strict des délais.</li>
                <li>- Lecture attentive des conditions de candidature.</li>
                <li>- Préparation sûrieuse des épreuves de sélection.</li>
                <li>- Suivi administratif jusqu'à prise de service effective.</li>
              </ul>
            </div>

            <div className="space-y-3">
              {publicTracks.map((item) => (
                <div key={item.step} className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                  <p className="text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.step}</p>
                  <p className="mt-1 text-fluid-sm text-neutral-600 dark:text-neutral-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="droits-travail" className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Droits essentiels à vérifier avant signature
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              Un candidat protege lit son contrat en detail et garde une preuve écrite de chaque element cle.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Intitulé de poste et missions réelles",
              "Type de contrat (CDI / CDD) et durée precise",
              "Lieu de travail, horaires et organisation",
              "Rémunération, primes et périodicité de paiement",
              "Periode d'essai et conditions de rupture",
              "Preavis, congés et obligations disciplinaires",
              "Déclaration et couverture sociale (CNSS)",
              "Procédure en cas de litige ou contestation",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-warning-200 bg-warning-50 px-5 py-4 dark:border-warning-800 dark:bg-warning-950/20">
            <p className="text-fluid-sm text-warning-800 dark:text-warning-300">
              Important: ce contenu est informatif et ne remplace pas un conseil juridique personnalisé. En cas de doute, rapprochez-vous d'un service compétent ou d'un professionnel du droit.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Sous-sections à développer progressivement
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-fluid-base text-neutral-500 dark:text-neutral-400">
              Nous déployons cette verticale en modules pratiques pour accompagner les demandeurs d'emploi sur tout le cycle.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingModules.map((module) => (
              <div key={module.title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  En progression
                </span>
                <h3 className="mt-3 font-heading text-fluid-base font-bold text-neutral-900 dark:text-neutral-100">
                  {module.title}
                </h3>
                <p className="mt-2 text-fluid-sm text-neutral-600 dark:text-neutral-400">{module.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sources" className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Sources en ligne fiables (RCA)
            </h2>
            <p className="mt-2 text-fluid-base text-neutral-500 dark:text-neutral-400">
              Base documentaire utilisee pour cette page. A verifier régulièrement en cas de mise a jour legale.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Code du travail de la République centrafricaine (Loi n° 09.004 du 29 janvier 2009)",
                href: "https://www.refworld.org/sites/default/files/2025-03/code_du_travail_rca_2009.pdf",
              },
              {
                title: "Ministère de la Fonction Publique (RCA): références statutaires et catégories d'agents",
                href: "https://mfpra-rca.net/pageview_serviceusers.php",
              },
              {
                title: "CNSS RCA: information sur le nouveau Code du travail en cours d'adoption",
                href: "https://cnss-rca.org/actualites/337/actes-du-conseil-de-ministres-du-17-avril-2025",
              },
              {
                title: "Banque mondiale - Situation économique RCA (contexte emploi et formalisation)",
                href: "https://www.worldbank.org/fr/news/press-release/2023/12/06/central-african-republic-prioritizing-agriculture-can-help-build-resilience-and-protect-jobs",
              },
              {
                title: "Banque mondiale - Donnees pays RCA",
                href: "https://www.worldbank.org/en/country/centralafricanrepublic",
              },
            ].map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-primary-300 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{source.title}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-primary-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center dark:border-primary-800 dark:bg-primary-950/30">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900">
              <Users className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Prêt à passer à l'action ?
            </h2>
            <p className="mt-3 text-fluid-base text-neutral-600 dark:text-neutral-400">
              Explorez les offres, renforcez votre profil et positionnez-vous sur les opportunités formelles les plus adaptées.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white transition-all hover:bg-primary-700"
              >
                Voir les offres maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                <FileText className="h-4 w-4" />
                Créer mon compte
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

