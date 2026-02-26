import type { Metadata } from "next";
import {
  Globe,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { MISSION, VALUES, TIMELINE, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "A propos",
  description:
    "Decouvrez la mission, les valeurs et l'histoire de KWATIGUIGUI, la premiere plateforme d'emploi de la Republique Centrafricaine.",
  alternates: { canonical: "/about" },
};

const VALUE_ICONS = [Globe, Heart, Zap, Shield, Sparkles, Users] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-heading-xl font-heading text-neutral-900 sm:text-display-lg dark:text-neutral-100">
          A propos de KWATIGUIGUI
        </h1>
        <p className="mt-6 text-body-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {MISSION}
        </p>
      </div>

      {/* Values */}
      <section className="mt-20">
        <h2 className="mb-8 text-center text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Nos valeurs
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, index) => {
            const Icon = VALUE_ICONS[index] ?? Target;
            return (
              <Card key={value.title} interactive>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-950">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-heading-sm text-neutral-900 dark:text-neutral-100">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-neutral-500">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-20">
        <h2 className="mb-8 text-center text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Notre histoire
        </h2>
        <div className="mx-auto max-w-2xl">
          {TIMELINE.map((event, index) => (
            <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Line */}
              {index < TIMELINE.length - 1 && (
                <div className="absolute left-[15px] top-8 h-full w-px bg-primary-200 dark:bg-primary-800" />
              )}
              {/* Dot */}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-body-xs font-bold text-white">
                {event.year.slice(-2)}
              </div>
              {/* Content */}
              <div>
                <p className="font-heading text-body-sm font-semibold text-primary-500">
                  {event.year}
                </p>
                <p className="mt-1 text-body-md text-neutral-700 dark:text-neutral-300">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="mb-8 text-center text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Questions frequentes
        </h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ_ITEMS.map((faq) => (
            <Card key={faq.question}>
              <CardContent className="pt-6">
                <h3 className="font-heading text-heading-sm text-neutral-900 dark:text-neutral-100">
                  {faq.question}
                </h3>
                <p className="mt-2 text-body-sm text-neutral-500">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-20 text-center">
        <h2 className="mb-4 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Contactez-nous
        </h2>
        <p className="mb-6 text-body-md text-neutral-500">
          Une question ? N'hesitez pas a nous contacter sur WhatsApp.
        </p>
        <a
          href="https://wa.me/23674143434"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-6 py-3 font-heading text-body-sm font-semibold text-white transition-colors hover:bg-secondary-600"
        >
          <MessageCircle size={18} />
          WhatsApp : +236 74 14 34 34
        </a>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
