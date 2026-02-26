import type { Metadata } from "next";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  BookOpen,
  CreditCard,
  UserCircle,
  Briefcase,
  Shield,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import { CONTACT, FAQ_ITEMS, PRICING } from "@/lib/constants";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

export const metadata: Metadata = {
  title: "Centre d'aide — KWATIGUIGUI",
  description:
    "Trouvez des reponses a vos questions sur l'inscription, les annonces, l'abonnement Premium et les paiements Mobile Money.",
  alternates: { canonical: "/help" },
};

// ---------------------------------------------------------------------------
// Help categories with topic links
// ---------------------------------------------------------------------------
const HELP_CATEGORIES = [
  {
    icon: UserCircle,
    title: "Compte et inscription",
    color: "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400",
    borderColor: "border-primary-100 dark:border-primary-800",
    topics: [
      "Comment creer mon compte ?",
      "Quel numero utiliser pour s'inscrire ?",
      "J'ai oublie mon mot de passe",
      "Comment modifier mon profil ?",
      "Comment supprimer mon compte ?",
    ],
  },
  {
    icon: Briefcase,
    title: "Annonces d'emploi",
    color: "bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400",
    borderColor: "border-secondary-100 dark:border-secondary-800",
    topics: [
      "Comment publier une annonce ?",
      "Combien d'annonces puis-je publier ?",
      "Pourquoi mon annonce est 'En attente' ?",
      "Quelle est la duree de validite d'une annonce ?",
      "Comment modifier ou supprimer une annonce ?",
    ],
  },
  {
    icon: CreditCard,
    title: "Abonnement Premium",
    color: "bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-600",
    borderColor: "border-accent-100 dark:border-accent-800",
    topics: [
      "Quels sont les avantages du Premium ?",
      `Combien coute l'abonnement ? (${PRICING.PREMIUM_MONTHLY.toLocaleString()} FCFA/mois)`,
      "Comment payer avec Orange Money ?",
      "Comment payer avec Telecel Money ?",
      "L'abonnement se renouvelle-t-il automatiquement ?",
    ],
  },
  {
    icon: Shield,
    title: "Securite et confidentialite",
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    borderColor: "border-purple-100 dark:border-purple-800",
    topics: [
      "Mes informations sont-elles en securite ?",
      "Qui peut voir mon numero WhatsApp ?",
      "Comment signaler une annonce suspecte ?",
      "Comment bloquer un utilisateur ?",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Extended FAQ for Help page (combines FAQ_ITEMS + payment topics)
// ---------------------------------------------------------------------------
const HELP_FAQ = [
  ...FAQ_ITEMS,
  {
    question: "Comment fonctionne le paiement par Orange Money ?",
    answer: `Pour payer par Orange Money, allez dans votre tableau de bord > Paiement, choisissez le plan souhaite, selectionnez Orange Money et entrez votre numero. Composez ensuite *144# depuis votre telephone Orange Money, selectionnez 'Paiement marchand', entrez le numero 74 14 34 34 et le montant indique. Votre abonnement sera active automatiquement dans les quelques minutes suivantes.`,
  },
  {
    question: "Comment fonctionne le paiement par Telecel Money ?",
    answer: `Pour payer par Telecel Money, choisissez ce mode de paiement dans votre tableau de bord > Paiement. Composez *111# depuis votre telephone Telecel, selectionnez 'Transfer d'argent', entrez le numero 76 16 90 90 et le montant. La confirmation arrive par SMS et votre Premium est active immediatement.`,
  },
  {
    question: "Puis-je obtenir un remboursement si je ne suis pas satisfait ?",
    answer:
      "Conformement a nos conditions d'utilisation, aucun remboursement n'est possible apres activation de l'abonnement. En cas de probleme technique, contactez notre support WhatsApp dans les 24 heures suivant le paiement.",
  },
  {
    question: "Mon annonce a ete rejetee, que faire ?",
    answer:
      "Si votre annonce a ete rejetee, c'est generalement parce qu'elle ne respecte pas nos regles de publication (annonces fictives, contenu inapproprie, coordonnees incompletes). Corrigez les elements signales et republichez-la. En cas de doute, contactez notre support.",
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HelpPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-fluid-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
              <HelpCircle className="h-4 w-4" />
              Centre d&apos;aide
            </div>
            <h1 className="mt-4 font-heading text-fluid-5xl font-bold text-neutral-900 dark:text-neutral-100">
              Comment pouvons-nous{" "}
              <span className="text-gradient-primary">vous aider ?</span>
            </h1>
            <p className="mt-4 text-fluid-lg text-neutral-600 dark:text-neutral-400">
              Retrouvez toutes les reponses sur l&apos;utilisation de KWATIGUIGUI,
              les paiements Mobile Money et la gestion de votre compte.
            </p>
          </div>
        </div>
      </section>

      {/* Help categories */}
      <section className="section-padding section-alt">
        <div className="container-main">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Parcourir par categorie
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HELP_CATEGORIES.map(
              ({ icon: Icon, title, color, borderColor, topics }) => (
                <div
                  key={title}
                  className={`rounded-2xl border bg-white p-5 dark:bg-neutral-900 ${borderColor}`}
                >
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 font-heading text-fluid-base font-bold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {topics.map((topic) => (
                      <li key={topic}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-1.5 text-left text-fluid-sm text-neutral-600 transition-colors hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                        >
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                          <span>{topic}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How it works quick guide */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Guide de demarrage rapide
            </h2>
            <p className="mt-3 text-fluid-base text-neutral-500 dark:text-neutral-400">
              Pret a trouver un emploi ou a recruter ? Suivez ces etapes simples.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Seekers */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950">
                  <UserCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Chercheurs d&apos;emploi
                </h3>
              </div>
              <ol className="space-y-3">
                {[
                  "Creez votre compte avec votre numero WhatsApp",
                  "Completez votre profil (region, competences, experience)",
                  "Publiez votre annonce de recherche d'emploi",
                  "Attendez qu'un employeur vous contacte directement",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 font-heading text-xs font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                      {i + 1}
                    </span>
                    <span className="text-fluid-sm text-neutral-600 dark:text-neutral-400">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Employers */}
            <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-800 dark:bg-neutral-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 dark:bg-secondary-950">
                  <Briefcase className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Employeurs
                </h3>
              </div>
              <ol className="space-y-3">
                {[
                  "Creez votre compte employeur avec votre WhatsApp",
                  "Publiez votre offre d'emploi (type, region, salaire)",
                  "Attendez la validation de l'equipe KWATIGUIGUI",
                  "Contactez les candidats via leur profil (Premium)",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-100 font-heading text-xs font-bold text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300">
                      {i + 1}
                    </span>
                    <span className="text-fluid-sm text-neutral-600 dark:text-neutral-400">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Premium explainer */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Comprendre l&apos;offre Premium
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-fluid-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                    Fonctionnalite
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-neutral-700 dark:text-neutral-300">
                    Gratuit
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-600 dark:text-primary-400">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {[
                  ["Creer un profil", true, true],
                  ["Publier des annonces", "5 max", "Illimitees"],
                  ["Apparaitre dans les resultats", true, true],
                  ["Voir les contacts WhatsApp", false, true],
                  ["Messagerie interne", "3/jour", "Illimitee"],
                  ["Support prioritaire", false, true],
                  ["Badge Premium visible", false, true],
                ].map(([feature, free, premium]) => (
                  <tr
                    key={String(feature)}
                    className="bg-white dark:bg-neutral-900"
                  >
                    <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                      {feature}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {free === true ? (
                        <span className="text-secondary-500">Oui</span>
                      ) : free === false ? (
                        <span className="text-error-500">Non</span>
                      ) : (
                        <span className="text-neutral-500">{free}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {premium === true ? (
                        <span className="font-medium text-primary-600 dark:text-primary-400">
                          Oui
                        </span>
                      ) : premium === false ? (
                        <span className="text-error-500">Non</span>
                      ) : (
                        <span className="font-medium text-primary-600 dark:text-primary-400">
                          {premium}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white shadow-md shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              <BookOpen className="h-4 w-4" />
              Creer un compte gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Questions frequentes
            </h2>
            <p className="mt-3 text-fluid-base text-neutral-500 dark:text-neutral-400">
              Les questions les plus posees par nos utilisateurs
            </p>
          </div>
          <FaqAccordion items={HELP_FAQ} />
        </div>
      </section>

      {/* Support CTA */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center dark:border-primary-800 dark:bg-primary-950/30">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900">
              <MessageCircle className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Vous n&apos;avez pas trouve votre reponse ?
            </h2>
            <p className="mt-3 text-fluid-base text-neutral-600 dark:text-neutral-400">
              Notre equipe de support est disponible 7j/7 via WhatsApp pour
              repondre a toutes vos questions.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CONTACT.WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white shadow-md shadow-secondary-600/20 transition-all hover:bg-secondary-700 hover:shadow-lg dark:bg-secondary-500 dark:hover:bg-secondary-400"
              >
                <MessageCircle className="h-4 w-4" />
                Contacter via WhatsApp
              </a>
              <a
                href={`tel:${CONTACT.WHATSAPP.replace(/\s/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Phone className="h-4 w-4" />
                {CONTACT.WHATSAPP}
              </a>
            </div>

            <p className="mt-4 text-fluid-xs text-neutral-500">
              Reponse garantie en moins de 24 heures
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
