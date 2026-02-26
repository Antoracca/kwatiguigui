import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Globe,
  MessageCircle,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { STATS, FEATURES, PRICING_PLANS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
  description:
    "Trouvez un emploi ou recrutez en Republique Centrafricaine. Plus de 1 200 offres, 3 500 utilisateurs, 20 regions couvertes.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white dark:from-primary-950/30 dark:via-neutral-950 dark:to-neutral-950">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="primary" className="mb-6">
              <Star size={14} />
              Premiere plateforme d'emploi en RCA
            </Badge>

            <h1 className="text-display-lg font-heading font-bold tracking-tight text-neutral-900 sm:text-display-xl dark:text-neutral-100">
              Trouvez votre emploi en{" "}
              <span className="text-gradient-primary">
                Republique Centrafricaine
              </span>
            </h1>

            <p className="mt-6 text-body-lg text-neutral-600 dark:text-neutral-400">
              KWATIGUIGUI connecte employeurs et chercheurs d'emploi dans les
              20 regions du pays. Du formel a l'informel, chaque metier compte.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" variant="primary">
                  Commencer gratuitement
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline">
                  <Briefcase size={18} />
                  Voir les offres
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <p className="font-heading text-heading-lg text-primary-500">
                  {stat.value}
                </p>
                <p className="mt-1 text-body-sm text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURES SECTION
          ================================================================ */}
      <section className="bg-white py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
              Pourquoi choisir KWATIGUIGUI ?
            </h2>
            <p className="mt-4 text-body-lg text-neutral-500">
              Une plateforme concue pour le marche centrafricain.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title} interactive>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-950">
                    {feature.icon === "globe" && <Globe size={24} />}
                    {feature.icon === "message" && <MessageCircle size={24} />}
                    {feature.icon === "shield" && <Shield size={24} />}
                    {feature.icon === "users" && <Users size={24} />}
                  </div>
                  <h3 className="font-heading text-heading-sm text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-neutral-500">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRICING SECTION
          ================================================================ */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
              Tarifs simples et transparents
            </h2>
            <p className="mt-4 text-body-lg text-neutral-500">
              Commencez gratuitement. Passez Premium pour debloquer tout le
              potentiel.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.name}
                featured={plan.featured}
                className="p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-heading-md text-neutral-900 dark:text-neutral-100">
                    {plan.name}
                  </h3>
                  {plan.featured && <Badge variant="premium">Populaire</Badge>}
                </div>

                <div className="mt-4">
                  <span className="text-display-lg font-heading font-bold text-neutral-900 dark:text-neutral-100">
                    {formatPrice(plan.price)}
                  </span>
                  {plan.period && (
                    <span className="text-body-md text-neutral-500">
                      /{plan.period}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-body-sm text-neutral-500">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-body-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-secondary-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href={plan.featured ? "/register" : "/register"}>
                    <Button
                      variant={plan.featured ? "primary" : "outline"}
                      size="lg"
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA SECTION
          ================================================================ */}
      <section className="bg-primary-500 py-20 dark:bg-primary-900">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-heading-xl font-heading text-white">
            Pret a trouver votre prochain emploi ?
          </h2>
          <p className="mt-4 text-body-lg text-primary-100">
            Rejoignez plus de 3 500 utilisateurs sur KWATIGUIGUI.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" variant="accent">
                Inscription gratuite
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a
              href="https://wa.me/23674143434"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <MessageCircle size={18} />
                Contactez-nous sur WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
