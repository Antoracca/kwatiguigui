import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Actualités & Conseils | KWATIGUIGUI",
  description: "Lisez nos derniers articles sur les tendances du marché de l'emploi en République Centrafricaine, des astuces pour votre CV, et des conseils pour les recruteurs.",
  alternates: { canonical: "/blog" },
};

const ARTICLES = [
  {
    title: "Comment optimiser votre CV pour les recruteurs en RCA",
    excerpt: "Découvrez les 5 éléments indispensables pour faire ressortir votre candidature face à la concurrence croissante à Bangui.",
    date: "12 Mar 2026",
    category: "Candidats",
    readTime: "4 min",
  },
  {
    title: "Les secteurs qui recrutent le plus cette année",
    excerpt: "BTP, Télécoms, ONG... Analyse détaillée des tendances de l'emploi et des compétences les plus recherchées par les entreprises.",
    date: "28 Fév 2026",
    category: "Marché",
    readTime: "6 min",
  },
  {
    title: "Attirer et retenir les talents : guide pour les PME",
    excerpt: "Comment les petites entreprises peuvent concurrencer les grandes structures grâce à une marque employeur forte.",
    date: "15 Fév 2026",
    category: "Entreprises",
    readTime: "5 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,64,175,0.2),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#050816_0%,#0a0f1f_55%)]">
        <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-secondary-400/20 blur-3xl" />

        <div className="container-main relative text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-primary-700 shadow-sm dark:border-primary-800 dark:bg-neutral-900/80 dark:text-primary-300">
            <Newspaper className="h-4 w-4" />
            Actualités & Conseils
          </div>

          <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
            Le blog de l'emploi <span className="text-gradient-primary">en RCA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
            Toutes les ressources dont vous avez besoin pour réussir votre carrière ou structurer votre recrutement.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article, i) => (
              <article key={i} className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800">
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur dark:bg-neutral-900/90 dark:text-white">
                    {article.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{article.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readTime}</span>
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
                    Lire l'article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-full">
              Charger plus d'articles
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt border-t border-neutral-100 dark:border-neutral-800">
        <div className="container-narrow text-center">
          <h2 className="mb-4 font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Ne manquez aucune opportunité</h2>
          <p className="mx-auto mb-8 max-w-xl text-neutral-600 dark:text-neutral-400">Abonnez-vous à notre newsletter pour recevoir les offres d'emploi VIP et nos meilleures astuces de recrutement.</p>
          <form className="mx-auto flex max-w-md items-center gap-2">
            <input type="email" placeholder="Votre adresse email" className="h-12 flex-1 rounded-full border border-neutral-300 bg-white px-5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-primary-500" />
            <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-primary-600 px-6 font-bold text-white transition-colors hover:bg-primary-700">
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

// Needed local Button mock to keep it clean if components/ui/button is missing in import:
function Button({ children, variant, size, className, ...props }: any) {
  return (
    <button className={`inline-flex items-center justify-center font-bold transition-colors ${variant === 'outline' ? 'border border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800' : ''} ${size === 'lg' ? 'h-12 px-8' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
}
