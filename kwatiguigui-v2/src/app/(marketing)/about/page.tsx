import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Globe2,
  Users,
  ShieldCheck,
  Building2,
  Rocket
} from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de KUSSALA - Notre mission en RCA",
  description:
    "Découvrez KUSSALA, la première plateforme de recrutement et d'opportunités en République Centrafricaine. Notre mission, nos valeurs et notre vision pour l'emploi.",
  alternates: { canonical: "/about" },
};

const valeurs = [
  {
    title: "Transparence",
    description: "Des offres claires, des profils vérifiés, aucune mauvaise surprise pour les entreprises ni pour les candidats.",
    icon: ShieldCheck,
  },
  {
    title: "Inclusion",
    description: "Nous digitalisons l'accès à l'emploi pour tous, des jeunes diplômés aux profils très expérimentés.",
    icon: Users,
  },
  {
    title: "Impact Local",
    description: "Conçu spécifiquement pour le marché centrafricain, en comprenant les réalités économiques et sociales locales.",
    icon: Target,
  },
  {
    title: "Innovation",
    description: "Des outils modernes (CVthèque, Matching IA) pour accélérer le développement professionnel en RCA.",
    icon: Rocket,
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,64,175,0.2),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#050816_0%,#0a0f1f_55%)]">
        <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-secondary-400/20 blur-3xl" />

        <div className="container-main relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-primary-700 shadow-sm dark:border-primary-800 dark:bg-neutral-900/80 dark:text-primary-300">
              <Globe2 className="h-4 w-4" />
              À propos de nous
            </div>

            <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
              Structurer le marché de l'emploi en
              <span className="text-gradient-primary"> République Centrafricaine.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
              KUSSALA n'est pas qu'un simple site d'annonces. C'est l'écosystème numérique central qui reconnecte le talent local aux véritables opportunités professionnelles et entrepreneuriales du pays.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-bold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
              >
                Rejoignez le mouvement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NOTRE VISION */}
      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 relative h-64 sm:h-80 lg:h-[400px] rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
              <Building2 className="h-24 w-24 text-neutral-400 dark:text-neutral-600" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent" />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-white">
                Notre Vision
              </h2>
              <p className="mt-4 text-fluid-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Jusqu'à présent, le marché centrafricain a manqué d'infrastructures digitales pour fluidifier le recrutement. Les talents peinent à se rendre visibles, et les employeurs perdent un temps précieux à chercher les bons profils.
              </p>
              <p className="mt-4 text-fluid-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <strong className="text-neutral-900 dark:text-white">Notre objectif :</strong> centraliser, sécuriser et moderniser ce processus. Nous voulons offrir la même qualité de service numérique que n'importe quelle autre plateforme globale, mais 100% pensée pour le tissu socio-économique de Bangui et des provinces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-white">
              Nos piliers fondamentaux
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valeurs.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-fluid-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ALIGNMENT */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-3xl border border-secondary-200 bg-secondary-50 p-10 text-center dark:border-secondary-800 dark:bg-secondary-950/30">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Faites partie de l'histoire</h2>
            <p className="mx-auto mt-4 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Que vous soyez une entreprise cherchant à dénicher son prochain cadre, ou un jeune talent prêt à prouver sa valeur, KUSSALA est votre nouveau point de départ.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/about/equipe"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              >
                Découvrir l'équipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
