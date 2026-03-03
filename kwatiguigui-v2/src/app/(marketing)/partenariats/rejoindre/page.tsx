import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Handshake,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { NetworkLottiePanel } from "@/components/marketing/enterprise/network-lottie-panel";

export const metadata: Metadata = {
  title: "Rejoindre nos partenariats - KWATIGUIGUI RCA",
  description:
    "Déposez votre candidature partenaire et intégrez un réseau orienté performance en République centrafricaine.",
  alternates: { canonical: "/partenariats/rejoindre" },
};

const steps = [
  "Positionner clairement votre offre et votre zone d’intervention.",
  "Soumettre votre dossier de partenariat avec références vérifiables.",
  "Passer une validation opérationnelle (capacités, qualité, fiabilité).",
  "Signer le cadre de collaboration et activer votre visibilité réseau.",
  "Lancer les premières opportunités avec suivi de performance.",
] as const;

const essentials = [
  "Présentation de l’entreprise ou de l’activité.",
  "Liste de services / produits avec preuves de livraison.",
  "Références clients ou projets déjà exécutés.",
  "Capacités logistiques et ressources disponibles.",
  "Canal de contact réactif (téléphone, e-mail, WhatsApp).",
] as const;

export default function RejoindrePartenariatsPage() {
  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(59,130,246,0.2),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(245,158,11,0.2),transparent_35%),linear-gradient(180deg,#f7fbff_0%,#ffffff_56%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(59,130,246,0.16),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(245,158,11,0.14),transparent_35%),linear-gradient(180deg,#090c18_0%,#0b1224_56%)]">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-sky-700 shadow-sm dark:border-sky-900 dark:bg-neutral-900/80 dark:text-sky-300">
                <Sparkles className="h-4 w-4" />
                Rejoindre le réseau partenaire
              </div>
              <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                Votre expertise mérite
                <span className="text-gradient-primary"> plus de visibilité et plus de business.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                Nous sélectionnons des partenaires fiables et orientés exécution.
                Si vous avez une offre solide, on vous aide à convertir votre savoir-faire en opportunités réelles.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-fluid-sm font-bold text-white hover:bg-sky-700">
                  Candidater maintenant
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/partenariats" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                  Retour à l’espace partenariats
                </Link>
              </div>
            </div>

            <NetworkLottiePanel
              remoteSrc="https://assets2.lottiefiles.com/packages/lf20_bh69rwvr.json"
              fallbackSrc="/images/search.lottie"
              badge="Onboarding partenaire simplifié"
              glowClassName="bg-sky-500/25"
            />
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Parcours d’intégration en 5 étapes</h2>
          </div>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 text-xs font-bold dark:bg-sky-950 dark:text-sky-300">
                  {index + 1}
                </div>
                <p className="text-fluid-sm text-neutral-700 dark:text-neutral-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-6 dark:border-primary-800 dark:bg-primary-950/25">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-600 dark:bg-neutral-900 dark:text-primary-400">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Éléments essentiels du dossier</h3>
              <ul className="mt-4 space-y-2">
                {essentials.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 dark:border-amber-800 dark:bg-amber-950/25">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-700 dark:bg-neutral-900 dark:text-amber-300">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-white">Ce qui fait la différence</h3>
              <ul className="mt-4 space-y-2 text-fluid-sm text-neutral-700 dark:text-neutral-300">
                <li>- Qualité constante de livraison.</li>
                <li>- Réactivité sur les demandes opérationnelles.</li>
                <li>- Capacité à documenter vos réalisations.</li>
                <li>- Communication claire et professionnelle.</li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                Le réseau privilégie les partenaires orientés résultat et fiabilité long terme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="rounded-3xl border border-sky-200 bg-sky-50 p-8 text-center dark:border-sky-800 dark:bg-sky-950/20">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-900">
              <Handshake className="h-7 w-7 text-sky-700 dark:text-sky-300" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">Prêt à rejoindre le mouvement ?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
              Faites évaluer votre potentiel partenaire et accédez à des opportunités plus qualifiées.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-fluid-sm font-semibold text-white hover:bg-sky-700">
                Démarrer la candidature
                <Rocket className="h-4 w-4" />
              </Link>
              <Link href="/partenariats/pme-agences" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                Voir les opportunités PME
                <Users className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
