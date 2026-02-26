import type { Metadata } from "next";
import {
  Globe,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
  Zap,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

import { MISSION, VALUES, TIMELINE, FAQ_ITEMS, CONTACT } from "@/lib/constants";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

export const metadata: Metadata = {
  title: "A propos — KWATIGUIGUI",
  description:
    "Decouvrez la mission, les valeurs et l'histoire de KWATIGUIGUI, la premiere plateforme d'emploi de la Republique Centrafricaine.",
  openGraph: {
    title: "A propos de KWATIGUIGUI",
    description: "La premiere plateforme d'emploi de RCA.",
    type: "website",
  },
  alternates: { canonical: "/about" },
};

const VALUE_ICONS = [Globe, Heart, Zap, Shield, Sparkles, Users] as const;
const VALUE_COLORS = [
  "bg-primary-50 text-primary-500 dark:bg-primary-950",
  "bg-secondary-50 text-secondary-500 dark:bg-secondary-950",
  "bg-accent-50 text-accent-600 dark:bg-accent-950",
  "bg-purple-50 text-purple-500 dark:bg-purple-950",
  "bg-pink-50 text-pink-500 dark:bg-pink-950",
  "bg-teal-50 text-teal-500 dark:bg-teal-950",
] as const;

export default function AboutPage() {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KWATIGUIGUI",
    url: "https://kwatiguigui.org",
    description: MISSION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangui",
      addressCountry: "CF",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+236-74-14-34-34",
      contactType: "customer service",
      availableLanguage: "French",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Hero */}
      <section className="section-padding hero-gradient">
        <div className="container-main">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-fluid-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
              <Globe className="h-4 w-4" />
              La premiere plateforme emploi de la RCA
            </div>
            <h1 className="mt-4 font-heading text-fluid-6xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
              A propos de{" "}
              <span className="text-gradient-primary">KWATIGUIGUI</span>
            </h1>
            <p className="mt-6 text-fluid-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              {MISSION}
            </p>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              {[
                { value: "3 500+", label: "Utilisateurs" },
                { value: "1 200+", label: "Offres publiees" },
                { value: "20", label: "Regions" },
                { value: "800+", label: "Mises en relation" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-fluid-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </p>
                  <p className="text-fluid-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding section-alt">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Notre mission
          </h2>
          <p className="mt-4 text-fluid-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Connecter chaque Centrafricain — des villes aux villages — avec les opportunites
            professionnelles qui correspondent a ses competences et ses aspirations.
            KWATIGUIGUI est plus qu&apos;une plateforme : c&apos;est un moteur de developpement economique
            pour la Republique Centrafricaine.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Portee nationale",
                desc: "Presente dans les 20 regions de la RCA",
              },
              {
                icon: Shield,
                title: "Confiance",
                desc: "Annonces moderees et utilisateurs verifies",
              },
              {
                icon: Heart,
                title: "Impact social",
                desc: "Emploi accessible a tous, sans discrimination",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950">
                  <Icon className="h-5 w-5 text-primary-500" />
                </div>
                <p className="font-heading text-fluid-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </p>
                <p className="mt-1 text-fluid-sm text-neutral-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Nos valeurs
            </h2>
            <p className="mt-3 text-fluid-lg text-neutral-500 dark:text-neutral-400">
              Les principes qui guident chaque decision que nous prenons
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => {
              const Icon = VALUE_ICONS[index] ?? Globe;
              const colorClass = VALUE_COLORS[index] ?? VALUE_COLORS[0];
              return (
                <div
                  key={value.title}
                  className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-fluid-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Notre histoire
            </h2>
            <p className="mt-3 text-fluid-lg text-neutral-500 dark:text-neutral-400">
              De l&apos;idee au service national
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary-300 via-primary-400 to-transparent dark:from-primary-700 dark:via-primary-800" />

            <div className="space-y-8">
              {TIMELINE.map((event, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Dot */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 shadow-md shadow-primary-500/30 font-heading text-xs font-bold text-white">
                    {event.year.slice(-2)}
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    <p className="font-heading text-fluid-sm font-bold text-primary-600 dark:text-primary-400">
                      {event.year}
                    </p>
                    <p className="mt-1 text-fluid-base text-neutral-700 dark:text-neutral-300">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Questions frequentes
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-fluid-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Contactez-nous
            </h2>
            <p className="mt-3 text-fluid-lg text-neutral-500 dark:text-neutral-400">
              Notre equipe est disponible pour repondre a vos questions
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={CONTACT.WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex flex-col items-center gap-3 rounded-2xl border border-secondary-200 bg-secondary-50 p-6 text-center transition-all dark:border-secondary-800 dark:bg-secondary-950/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-100 dark:bg-secondary-900">
                <MessageCircle className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <p className="font-heading text-fluid-sm font-semibold text-secondary-800 dark:text-secondary-300">
                WhatsApp
              </p>
              <p className="text-fluid-sm text-secondary-600 dark:text-secondary-400">
                {CONTACT.WHATSAPP}
              </p>
            </a>

            <a
              href={`mailto:${CONTACT.EMAIL}`}
              className="card-hover flex flex-col items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50 p-6 text-center transition-all dark:border-primary-800 dark:bg-primary-950/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900">
                <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="font-heading text-fluid-sm font-semibold text-primary-800 dark:text-primary-300">
                Email
              </p>
              <p className="text-fluid-sm text-primary-600 dark:text-primary-400">
                {CONTACT.EMAIL}
              </p>
            </a>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <MapPin className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
              </div>
              <p className="font-heading text-fluid-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Adresse
              </p>
              <p className="text-fluid-sm text-neutral-500">
                {CONTACT.ADDRESS}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
