import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Globe,
  GraduationCap,
  HardHat,
  Heart,
  Home,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { JobCard } from "@/components/jobs/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { STATS, PRICING_PLANS, CONTACT } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
  description:
    "Trouvez un emploi ou recrutez en Republique Centrafricaine. Plus de 1 200 offres, 3 500 utilisateurs, 20 regions couvertes. Inscription gratuite.",
  alternates: { canonical: "/" },
};

// ---------------------------------------------------------------------------
// Demo job data for homepage (static, no DB needed)
// ---------------------------------------------------------------------------
const DEMO_JOBS = [
  {
    id: "demo-1",
    firstName: "Marie",
    age: 28,
    whatsapp: null,
    region: "Bangui",
    city: "Bangui",
    neighborhood: "Lakouanga",
    jobType: "Aide menagere",
    experience: "5 ans d'experience en menage et garde d'enfants. Serieuse et ponctuelle.",
    userType: "seeker" as const,
    isActive: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-2",
    firstName: "Jean-Pierre",
    age: 35,
    whatsapp: null,
    region: "Bangui",
    city: "Bangui",
    neighborhood: "PK5",
    jobType: "Chauffeur",
    experience: "Chauffeur experience, permis B et C, connaissance de Bangui et environs.",
    userType: "seeker" as const,
    isActive: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-3",
    firstName: "Famille Kamara",
    age: 45,
    whatsapp: null,
    region: "Bangui",
    city: "Bangui",
    neighborhood: "Combattant",
    jobType: "Cuisinier",
    experience: "Recherche un cuisinier pour villa familiale, 5 personnes. Repas midi et soir.",
    userType: "employer" as const,
    isActive: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-4",
    firstName: "Sophie",
    age: 24,
    whatsapp: null,
    region: "Ombella-Mpoko",
    city: "Bimbo",
    neighborhood: null,
    jobType: "Secretaire",
    experience: "BTS comptabilite, maitrise Word et Excel, bilingue francais-sango.",
    userType: "seeker" as const,
    isActive: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-5",
    firstName: "Entreprise BTP+",
    age: 40,
    whatsapp: null,
    region: "Bangui",
    city: "Bangui",
    neighborhood: "Aviation",
    jobType: "Macon",
    experience: "Recherche 3 macons confirmes pour chantier construction. Debut immediat.",
    userType: "employer" as const,
    isActive: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-6",
    firstName: "Patrick",
    age: 31,
    whatsapp: null,
    region: "Mambere-Kadei",
    city: "Berberati",
    neighborhood: null,
    jobType: "Electricien",
    experience: "Electricien diplome, installation et depannage residentiel et commercial.",
    userType: "seeker" as const,
    isActive: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ---------------------------------------------------------------------------
// Job type categories with icons
// ---------------------------------------------------------------------------
const JOB_CATEGORIES = [
  { name: "Aide menagere", icon: Home, count: 124 },
  { name: "Chauffeur", icon: Truck, count: 87 },
  { name: "Cuisinier", icon: UtensilsCrossed, count: 96 },
  { name: "Enseignant", icon: GraduationCap, count: 73 },
  { name: "Technicien", icon: Wrench, count: 58 },
  { name: "Ouvrier", icon: HardHat, count: 112 },
  { name: "Infirmier", icon: Heart, count: 45 },
  { name: "Vendeur", icon: TrendingUp, count: 89 },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
const TESTIMONIALS = [
  {
    name: "Aminata D.",
    role: "Aide menagere, Bangui",
    text: "Grace a KWATIGUIGUI, j'ai trouve un emploi stable en seulement 3 jours apres mon inscription. La plateforme est simple et vraiment efficace.",
    initial: "A",
  },
  {
    name: "Marcel K.",
    role: "Employeur, Mbaiki",
    text: "J'ai recrute mon jardinier et mon chauffeur via KWATIGUIGUI. Le contact WhatsApp direct est tres pratique. Je recommande vivement.",
    initial: "M",
  },
  {
    name: "Sylvie N.",
    role: "Secretaire, Bangui",
    text: "Tres bonne plateforme. Mon profil est visible par de nombreux employeurs. J'ai deja eu plusieurs propositions depuis que je suis Premium.",
    initial: "S",
  },
];

// ---------------------------------------------------------------------------
// How it works steps
// ---------------------------------------------------------------------------
const HOW_STEPS = [
  {
    step: "01",
    title: "Creez votre profil",
    description:
      "Inscription gratuite en 3 minutes. Renseignez votre metier, votre region et votre experience.",
    icon: Users,
  },
  {
    step: "02",
    title: "Publiez ou trouvez",
    description:
      "Publiez votre annonce ou parcourez les offres disponibles dans votre region et votre domaine.",
    icon: Briefcase,
  },
  {
    step: "03",
    title: "Contactez directement",
    description:
      "Avec un abonnement Premium, contactez via WhatsApp sans intermediaire. Immediatement.",
    icon: MessageCircle,
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      {/* ==================================================================
          HERO SECTION
          ================================================================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle radial gradient background */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,49,137,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Animated badge */}
            <div className="mb-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-4 py-1.5 text-body-xs font-semibold text-secondary-700 dark:border-secondary-800 dark:bg-secondary-950 dark:text-secondary-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
                </span>
                <Sparkles size={12} />
                Nouvelle version disponible — Plus rapide, plus securisee
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight text-neutral-900 dark:text-neutral-50">
              Trouvez votre emploi en{" "}
              <span className="text-gradient-primary">
                Republique Centrafricaine
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-body-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              La premiere plateforme d'emploi numerique de RCA. Connectez-vous
              avec des milliers d'employeurs et de candidats dans les 20 regions
              du pays.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" variant="primary" className="min-w-[200px]">
                  Publier une annonce
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  <Briefcase size={18} />
                  Parcourir les offres
                </Button>
              </Link>
            </div>

            {/* Trust stats inline */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                "1 200+ offres",
                "3 500+ utilisateurs",
                "20 regions",
                "800+ mises en relation",
              ].map((stat) => (
                <span
                  key={stat}
                  className="flex items-center gap-1.5 text-body-sm text-neutral-500"
                >
                  <CheckCircle2 size={14} className="text-secondary-500" />
                  {stat}
                </span>
              ))}
            </div>

            {/* Payment trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Orange Money", color: "bg-orange-50 border-orange-200 text-orange-700" },
                { label: "Telecel Money", color: "bg-purple-50 border-purple-200 text-purple-700" },
                { label: "100% Securise", color: "bg-secondary-50 border-secondary-200 text-secondary-700" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-body-xs font-semibold ${badge.color}`}
                >
                  <Shield size={11} />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          CATEGORIES SECTION
          ================================================================== */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">
              <Globe size={12} />
              Tous les metiers
            </Badge>
            <h2 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
              Explorez par categorie
            </h2>
            <p className="mt-3 text-body-md text-neutral-500">
              Du formel a l'informel, chaque metier a sa place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {JOB_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={`/jobs?job_type=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-all duration-200 group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-950">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {cat.name}
                    </p>
                    <p className="mt-0.5 text-body-xs text-neutral-400">
                      {cat.count} offres
                    </p>
                  </div>
                </Link>
              );
            })}

            {/* "Voir tout" tile */}
            <Link
              href="/jobs"
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 bg-white/50 p-5 text-center transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-900/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-400 group-hover:bg-primary-100 group-hover:text-primary-500 dark:bg-neutral-800">
                <ArrowRight size={22} />
              </div>
              <div>
                <p className="font-heading text-body-sm font-semibold text-neutral-600 group-hover:text-primary-600 dark:text-neutral-400">
                  Voir tous
                </p>
                <p className="mt-0.5 text-body-xs text-neutral-400">
                  +12 categories
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          HOW IT WORKS
          ================================================================== */}
      <section className="bg-white py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap size={12} />
              Simple et rapide
            </Badge>
            <h2 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
              Comment ca marche ?
            </h2>
            <p className="mt-3 text-body-md text-neutral-500">
              En 3 etapes, commencez a trouver ou a offrir un emploi.
            </p>
          </div>

          <div className="relative grid gap-8 sm:grid-cols-3">
            {/* Connecting line (desktop only) */}
            <div
              className="absolute left-[16.67%] right-[16.67%] top-10 hidden h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent sm:block dark:via-neutral-700"
              aria-hidden
            />

            {HOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  {/* Step number background */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 rounded-full bg-primary-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-primary-950" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-500 shadow-lg shadow-primary-500/30">
                      <Icon size={32} className="text-white" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 font-heading text-body-xs font-bold text-white shadow-sm">
                      {step.step.replace("0", "")}
                    </span>
                  </div>

                  <h3 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/register">
              <Button size="lg" variant="primary">
                Commencer maintenant — C'est gratuit
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          STATS SECTION (dark, with CountUp animation)
          ================================================================== */}
      <section className="bg-primary-500 py-20 dark:bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-heading-xl font-bold text-white">
              KWATIGUIGUI en chiffres
            </h2>
            <p className="mt-3 text-body-md text-primary-200">
              Une plateforme en pleine croissance, au service de la RCA.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { end: 1200, suffix: "+", label: "Offres publiees" },
              { end: 3500, suffix: "+", label: "Utilisateurs" },
              { end: 20, suffix: "", label: "Regions couvertes" },
              { end: 800, suffix: "+", label: "Mises en relation" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-[clamp(2rem,5vw,3rem)] font-extrabold text-white">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </p>
                <p className="mt-1 text-body-sm text-primary-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          RECENT LISTINGS
          ================================================================== */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Badge variant="primary" className="mb-3">
                <Star size={12} />
                Annonces recentes
              </Badge>
              <h2 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
                Offres du moment
              </h2>
              <p className="mt-2 text-body-md text-neutral-500">
                Les dernieres annonces publiees sur la plateforme.
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden items-center gap-1 text-body-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 sm:flex"
            >
              Voir toutes les offres
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEMO_JOBS.map((job) => (
              <JobCard key={job.id} job={job} isPremium={false} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/jobs">
              <Button variant="outline" size="lg">
                Voir toutes les offres
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          PRICING SECTION
          ================================================================== */}
      <section className="bg-white py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="accent" className="mb-4">
              <TrendingUp size={12} />
              Tarification
            </Badge>
            <h2 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
              Simple et transparent
            </h2>
            <p className="mt-3 text-body-md text-neutral-500">
              Commencez gratuitement. Passez Premium pour debloquer tout le
              potentiel de la plateforme.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-2">
            {/* Gratuit */}
            <Card className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                  Gratuit
                </h3>
                <Badge variant="default">Actuel</Badge>
              </div>

              <div className="mt-4">
                <span className="font-heading text-[3rem] font-extrabold leading-none text-neutral-900 dark:text-neutral-100">
                  0
                </span>
                <span className="ml-1 text-body-md text-neutral-500">FCFA</span>
              </div>
              <p className="mt-1 text-body-sm text-neutral-500">Pour commencer</p>

              <ul className="mt-6 space-y-3">
                {[
                  { label: "Creer un profil", ok: true },
                  { label: "Publier jusqu'a 5 annonces", ok: true },
                  { label: "Apparaitre dans les resultats", ok: true },
                  { label: "Contact WhatsApp direct", ok: false },
                  { label: "Messages illimites", ok: false },
                  { label: "Badge Premium", ok: false },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-body-sm">
                    {item.ok ? (
                      <CheckCircle2 size={16} className="shrink-0 text-secondary-500" />
                    ) : (
                      <X size={16} className="shrink-0 text-neutral-300 dark:text-neutral-600" />
                    )}
                    <span
                      className={
                        item.ok
                          ? "text-neutral-700 dark:text-neutral-300"
                          : "text-neutral-400 dark:text-neutral-600"
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/register">
                  <Button variant="outline" size="lg" className="w-full">
                    Commencer gratuitement
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Premium */}
            <Card className="relative overflow-hidden border-2 border-primary-500 p-8 shadow-xl shadow-primary-500/10">
              {/* Popular badge */}
              <div className="absolute right-0 top-0">
                <div className="bg-accent-500 px-4 py-1 text-body-xs font-bold text-accent-950">
                  POPULAIRE
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                  Premium
                </h3>
                <Badge variant="premium">Recommande</Badge>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-[3rem] font-extrabold leading-none text-primary-500">
                  2 500
                </span>
                <div>
                  <p className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300">FCFA</p>
                  <p className="text-body-xs text-neutral-400">/mois</p>
                </div>
              </div>
              <p className="mt-1 text-body-sm text-neutral-500">
                Ou 12 500 FCFA / 6 mois — Economisez 2 500 FCFA
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Annonces illimitees",
                  "Contact WhatsApp direct",
                  "Messages illimites",
                  "Badge Premium visible",
                  "Support prioritaire",
                  "Visibilite maximale dans les resultats",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-sm">
                    <CheckCircle2 size={16} className="shrink-0 text-secondary-500" />
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/register">
                  <Button variant="primary" size="lg" className="w-full">
                    Passer a Premium
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Payment methods */}
          <p className="mt-8 text-center text-body-sm text-neutral-400">
            Paiement par Orange Money ({CONTACT.ORANGE_MONEY}) ou Telecel Money ({CONTACT.TELECEL_MONEY})
          </p>
        </div>
      </section>

      {/* ==================================================================
          TESTIMONIALS
          ================================================================== */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
              Ils nous font confiance
            </h2>
            <p className="mt-3 text-body-md text-neutral-500">
              Ce que disent nos utilisateurs partout en RCA.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="mb-4 flex text-accent-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-body-sm italic leading-relaxed text-neutral-600 dark:text-neutral-400">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 font-heading text-body-sm font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {t.name}
                    </p>
                    <p className="text-body-xs text-neutral-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          FINAL CTA
          ================================================================== */}
      <section className="relative overflow-hidden py-24">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #003189 0%, #289728 100%)",
          }}
        />
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-heading-xl font-extrabold text-white">
            Rejoignez des milliers de Centrafricains
          </h2>
          <p className="mt-4 text-body-lg text-white/80">
            Inscription gratuite en 3 minutes. Trouvez ou offrez un emploi des
            aujourd'hui dans toute la RCA.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="min-w-[240px] bg-white text-primary-600 hover:bg-neutral-50 hover:shadow-xl"
              >
                S'inscrire maintenant — C'est gratuit
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a
              href={CONTACT.WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="min-w-[220px] border-white/50 text-white hover:bg-white/10"
              >
                <Phone size={18} />
                Nous contacter
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
