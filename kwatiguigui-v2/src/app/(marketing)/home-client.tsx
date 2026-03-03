"use client";

import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle,
    CheckCircle2,
    ChevronDown,
    Edit,
    GraduationCap,
    HardHat,
    Heart,
    Home,
    MapPin,
    MessageCircle,
    Search,
    Send,
    Shield,
    Star,
    Activity,
    UserPlus,
    TrendingUp,
    Truck,
    Users,
    UtensilsCrossed,
    Wrench,
    Zap,
    Rocket,
    Gift,
    Handshake,
    ShieldCheck,
    Lock,
    EyeOff,
    CheckSquare,
    BadgeAlert,
    Ban,
    BriefcaseBusiness,
    ArrowRightLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { PricingCarousel } from "@/components/marketing/pricing-carousel";
import { HeroGlobe } from "@/components/marketing/hero-globe";
import { RcaMapBg } from "@/components/ui/rca-map-bg";

import { JobCard } from "@/components/jobs/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { CONTACT } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Demo job data for homepage (static, no DB needed)
// ---------------------------------------------------------------------------
const DEMO_JOBS: any[] = [];

// ---------------------------------------------------------------------------
// Options for Advanced Search
// ---------------------------------------------------------------------------
const FUNCTIONS_OPTIONS = [
    { value: "comptabilite", label: "Comptabilité, audit et finance" },
    { value: "administration", label: "Administration et bureaux" },
    { value: "design", label: "Création et design" },
    { value: "batiment", label: "Bâtiment et architecture" },
    { value: "conseil", label: "Conseils et stratégies" },
    { value: "service_client", label: "Services clients et assistance" },
    { value: "ingenierie", label: "Ingénierie et technologie" },
    { value: "agriculture", label: "Agriculture" },
    { value: "restauration", label: "Services et restauration, traiteur" },
    { value: "hotellerie", label: "Hôtellerie et loisirs" },
    { value: "informatique", label: "Logiciels et données" },
    { value: "juridique", label: "Services juridiques" },
    { value: "marketing", label: "Marketing et communication" },
    { value: "medical", label: "Médical et pharmaceutique" },
    { value: "gestion_projet", label: "Gestion des produits et projets" },
    { value: "immobilier", label: "Agents immobiliers, gestion de biens" },
    { value: "qualite", label: "Contrôle et assurance qualité" },
    { value: "rh", label: "Ressources humaines" },
    { value: "commercial", label: "Gestion et développement commercial" },
    { value: "social", label: "Services communautaires et sociaux" },
    { value: "vente", label: "Vente" },
    { value: "logistique", label: "Chaînes d'approvisionnement" },
    { value: "enseignement", label: "Recherche et enseignement" },
    { value: "formation", label: "Formation" },
    { value: "metiers", label: "Métiers et services" },
    { value: "transport", label: "Services de transport" },
    { value: "securite", label: "Santé et sécurité" },
];

const SECTORS_OPTIONS = [
    { value: "agriculture", label: "Agriculture, pêche, foresterie" },
    { value: "construction", label: "Construction et Bâtiment" },
    { value: "finance", label: "Banques, finances et assurances" },
    { value: "education", label: "Éducation et Recherche" },
    { value: "gouvernement", label: "Gouvernement et Secteur Public" },
    { value: "sante", label: "Soins de santé" },
    { value: "hotellerie", label: "Hôtellerie et restauration" },
    { value: "recrutement", label: "Recrutement et RH" },
    { value: "it", label: "Informatique et télécommunication" },
    { value: "juridique", label: "Loi et conformité" },
    { value: "logistique", label: "Expédition et logistique" },
    { value: "industrie", label: "Fabrication et entreposage" },
    { value: "medias", label: "Publicité, médias et communications" },
    { value: "mines", label: "Exploitation minière, énergie et métaux" },
    { value: "ong", label: "ONG, OSBL et œuvres de bienfaisance" },
    { value: "retail", label: "Commerce de détail" },
    { value: "fmcg", label: "Monde et biens de consommation courante" },
    { value: "securite_publique", label: "Application de la loi et sécurité" },
    { value: "immobilier", label: "Immobiliers" },
    { value: "tourisme", label: "Tourisme et voyages" },
    { value: "automobile", label: "Automobiles et aviation" },
    { value: "divertissement", label: "Divertissements et événements" },
    { value: "sports", label: "Sports" },
];

const LOCATIONS_OPTIONS = [
    { value: "bangui", label: "Bangui" },
    { value: "bimbo", label: "Bimbo" },
    { value: "bambari", label: "Bambari" },
    { value: "bouar", label: "Bouar" },
    { value: "bossangoa", label: "Bossangoa" },
    { value: "boali", label: "Boali" },
    { value: "boda", label: "Boda" },
];

const LEVELS_OPTIONS = [
    { value: "jeune", label: "Stages et jeunes diplômés" },
    { value: "entree", label: "Niveau d'entrée" },
    { value: "intermediaire", label: "Niveau intermédiaire" },
    { value: "superieur", label: "Niveau supérieur" },
    { value: "executif", label: "Niveau exécutif" },
    { value: "aucune", label: "Aucune expérience" },
];

// ---------------------------------------------------------------------------
// Job type categories with icons
// ---------------------------------------------------------------------------
const JOB_CATEGORIES = [
    { name: "Aide menagere", icon: Home, count: "0" },
    { name: "Chauffeur", icon: Truck, count: "0" },
    { name: "Cuisinier", icon: UtensilsCrossed, count: "0" },
    { name: "Enseignant", icon: GraduationCap, count: "0" },
    { name: "Technicien", icon: Wrench, count: "0" },
    { name: "Ouvrier", icon: HardHat, count: "0" },
    { name: "Infirmier", icon: Heart, count: "0" },
    { name: "Vendeur", icon: TrendingUp, count: "0" },
];

// ---------------------------------------------------------------------------
// Announcement Ticker
// ---------------------------------------------------------------------------
const TICKER_MESSAGES = [
    { text: "Sécurité garantie : Kwatiguigui ne demandera jamais d'argent aux candidats.", icon: ShieldCheck },
    { text: "Transparence totale : aucun frais caché lors de vos recrutements.", icon: CheckSquare },
    { text: "Confidentialité de vos données personnelles et professionnelles assurée.", icon: Lock },
    { text: "Trouvez un emploi, un stage, ou une mission freelance de qualité.", icon: Search },
    { text: "Solution complète de recrutement structuré pour les entreprises.", icon: Building2 },
    { text: "Fiabilité et accompagnement dédié pour propulser votre carrière.", icon: TrendingUp },
    { text: "Protection anti-fraude déployée sur toutes les annonces (Zéro Scam).", icon: Ban }
];

const AnnouncementTicker = () => {
    // Duplicate messages so the loop is seamless: animate x from 0% to -50%
    const doubled = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

    return (
        <div className="w-full overflow-hidden border-b border-neutral-100 dark:border-neutral-900 bg-transparent py-3 flex items-center relative z-20">
            {/* Gradient masks for smooth fade effect at edges */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap gap-20 sm:gap-24 px-4 w-max items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 50,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                {doubled.map((msg, i) => {
                    const Icon = msg.icon;
                    return (
                        <div key={i} className="flex-none text-sm font-semibold text-neutral-800 dark:text-neutral-200 tracking-wide flex items-center gap-3">
                            <Icon size={16} className="text-secondary-500" />
                            {msg.text}
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Animated Custom Search Icon
// ---------------------------------------------------------------------------
const AnimatedSearchJobIcon = () => (
    <div className="relative flex items-center justify-center w-6 h-6 text-primary-600 dark:text-primary-400">
        <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: [0, 20, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </motion.svg>
        <span className="text-[6px] font-black absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 text-neutral-900 dark:text-white">
            JOB
        </span>
    </div>
);

// ---------------------------------------------------------------------------
export default function HomeClient() {
    // Motion variants for staggered intro
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    };

    return (
        <>
            {/* ==================================================================
          HERO SECTION (Asymmetric 12-col Grid B2B/B2C)
          ================================================================== */}
            <section className="relative overflow-hidden bg-white dark:bg-neutral-950 pb-0">
                <AnnouncementTicker />

                {/* Subtle soft background nuance */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none mt-12" aria-hidden="true">
                    <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-[120px]" />
                </div>

                <motion.div
                    className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 pt-16 sm:pt-24"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* LEFT COLUMN: Copywriting & CTAs (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left relative">
                            {/* RCA Map Background Watermark */}
                            <div className="absolute top-[40%] left-[45%] w-[130%] sm:w-[110%] -translate-x-1/2 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.05] pointer-events-none -z-10 text-primary-900 dark:text-primary-100 drop-shadow-sm">
                                <RcaMapBg />
                            </div>

                            {/* Pre-title credibility tag */}
                            <motion.div variants={itemVariants} className="mb-8 w-fit overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600/10 to-transparent p-[1px] dark:from-primary-400/20 backdrop-blur-sm">
                                <div className="flex items-center gap-3 rounded-[15px] bg-white/60 px-4 py-2.5 dark:bg-neutral-950/60 transition-all hover:bg-white/80 dark:hover:bg-neutral-950/80">
                                    <div className="flex items-center justify-center rounded-lg bg-primary-100 p-2 dark:bg-primary-900/40 border border-primary-200/50 dark:border-primary-800/50">
                                        <ShieldCheck className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <p className="text-sm font-bold text-neutral-900 dark:text-white sm:text-base">
                                        Lancement Exclusif <span className="mx-2 hidden sm:inline-block font-normal text-neutral-300 dark:text-neutral-700">|</span> <span className="font-medium text-primary-600 dark:text-primary-400 block sm:inline">100% Sécurisé & Vérifié</span>
                                    </p>
                                </div>
                            </motion.div>

                            {/* Massive H1 Typography */}
                            <motion.h1
                                variants={itemVariants}
                                className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-neutral-900 dark:text-white"
                            >
                                La plateforme qui connecte <br className="hidden sm:block" />
                                <span className="text-primary-600 dark:text-primary-400">
                                    talents et entreprises
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="mt-6 max-w-xl text-[clamp(1.125rem,2vw,1.25rem)] leading-relaxed text-neutral-500 dark:text-neutral-400 font-medium"
                            >
                                Emplois, Stages, Prestations. Rejoignez nos 100+ membres fondateurs et participez à la structuration du grand réseau professionnel de la République Centrafricaine.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div variants={itemVariants} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center w-full">
                                <Link href="/jobs" className="w-full sm:w-auto">
                                    <Button
                                        size="xl"
                                        className="w-full sm:w-auto h-14 px-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 text-base font-bold transition-all shadow-lg shadow-neutral-900/10"
                                    >
                                        Trouver un emploi
                                    </Button>
                                </Link>
                                <Link href="/register?type=employer" className="w-full sm:w-auto">
                                    <Button
                                        size="xl"
                                        variant="outline"
                                        className="w-full sm:w-auto h-14 px-8 rounded-xl border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900/50 text-base font-bold transition-all"
                                    >
                                        Publier une offre
                                    </Button>
                                </Link>
                                <Link href="#comment-ca-marche" className="w-full sm:w-auto hidden md:block ml-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 h-14"
                                    >
                                        Découvrir comment ça fonctionne
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Trust snippet underneath CTAs */}
                            <motion.div variants={itemVariants} className="mt-8 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                                <div className="flex -space-x-2">
                                    {['A', 'K', 'J'].map((initial, i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-neutral-950 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 dark:text-neutral-500">
                                            {initial}
                                        </div>
                                    ))}
                                </div>
                                <span className="font-medium">Créons ensemble l'écosystème de demain.</span>
                            </motion.div>

                        </div>

                        {/* RIGHT COLUMN: Globe 3D (5 cols) */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-full lg:mt-0 mt-8"
                        >
                            <HeroGlobe />
                        </motion.div>
                    </div>

                    {/* QUICK SEARCH BAR (Floating) */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 sm:mt-24 w-full"
                    >
                        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-2 sm:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-100 dark:border-neutral-800">
                            <form action="/jobs" className="flex flex-col sm:flex-row items-center gap-2">
                                <div className="flex-1 w-full relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <AnimatedSearchJobIcon />
                                    </div>
                                    <input type="text" name="q" placeholder="Quel poste recherchez-vous ?" className="w-full h-14 sm:h-16 pl-14 pr-4 bg-transparent border-none text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-0 font-medium" />
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-neutral-200 dark:bg-neutral-700" />
                                <div className="flex-1 w-full relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <input type="text" name="q" placeholder="Ville ou quartier..." className="w-full h-14 sm:h-16 pl-14 pr-4 bg-transparent border-none text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-0 font-medium" />
                                </div>
                                <Button type="submit" size="xl" className="w-full sm:w-auto h-14 sm:h-16 px-10 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-transform hover:scale-105 shadow-lg shadow-primary-600/20">
                                    Rechercher
                                </Button>
                            </form>
                        </div>
                        {/* Popular searches */}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-500 font-medium">
                            <span>Recherches fréquentes :</span>
                            <Link href="/jobs?q=Chauffeur" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Chauffeur</Link>
                            <Link href="/jobs?q=Menagere" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Aide ménagère</Link>
                            <Link href="/jobs?q=Comptable" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Comptable</Link>
                            <Link href="/jobs?q=Macon" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Maçon</Link>
                        </div>

                        {/* Hero Lottie Animation */}
                        <motion.div
                            className="mt-6 sm:mt-12 flex justify-center w-[120%] sm:w-full max-w-[320px] sm:max-w-[600px] lg:max-w-[700px] mx-auto -ml-[10%] sm:ml-auto mb-8 sm:mb-16"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <DotLottieReact
                                src="/images/Searching.lottie"
                                loop
                                autoplay
                                className="w-full h-auto object-contain transform scale-110 sm:scale-125"
                            />
                        </motion.div>
                    </motion.div>

                </motion.div>
            </section>

            {/* ==================================================================
          CATEGORIES SECTION (Minimalist / No Cards)
          ================================================================== */}
            <section className="bg-white pt-16 pb-32 sm:pt-24 dark:bg-neutral-950 relative z-10">
                <motion.div
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
                                Explorez par domaine
                            </h2>
                            <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400">
                                Du secteur formel à l'artisanat, trouvez la mission qui correspond à votre expertise.
                            </p>
                        </div>
                        <Link
                            href="/jobs"
                            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                        >
                            Voir toutes les catégories
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                        {JOB_CATEGORIES.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                >
                                    <Link
                                        href={`/jobs?job_type=${encodeURIComponent(cat.name)}`}
                                        className="group flex flex-col items-start gap-4 p-5 rounded-2xl border border-transparent bg-transparent transition-all duration-300 hover:border-neutral-200 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:border-neutral-800 dark:hover:bg-neutral-900/50"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-white dark:group-hover:text-neutral-900">
                                            <Icon size={22} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-heading text-lg font-bold text-neutral-900 dark:text-neutral-50 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                                {cat.name}
                                            </p>
                                            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-500">
                                                <span className="inline-flex items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 font-mono tracking-widest">{cat.count}</span> {cat.count === "0" || cat.count === "1" ? "offre" : "offres"}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
          HOW IT WORKS (Transversal Diagonal Design B2B / B2C)
          ================================================================== */}
            <section id="comment-ca-marche" className="relative w-full overflow-hidden">

                {/* --- B2B SECTION (Top, Dark, Skewed Background) --- */}
                <div className="relative bg-neutral-950 pt-24 pb-32 lg:pb-40 z-10 
                                [clip-path:polygon(0_0,100%_0,100%_95%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
                        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 text-center lg:text-left">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-sm font-semibold text-neutral-400">
                                    <Building2 size={16} className="text-secondary-400" />
                                    <span>Vous êtes une entreprise ?</span>
                                </div>
                                <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white tracking-tight leading-none mt-2">
                                    {"Recrutez efficacement".split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.03, delay: index * 0.04 + 0.3 }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.03, delay: "Recrutez efficacement".length * 0.04 + 0.3 }}
                                        className="text-secondary-400"
                                    >
                                        .
                                    </motion.span>
                                </h2>
                                <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto lg:mx-0">
                                    Trouvez les meilleurs talents en République Centrafricaine grâce à une méthode ciblée en 4 étapes simples.
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <Button asChild size="xl" className="h-14 px-8 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-white font-bold transition-all shadow-lg shadow-secondary-500/20">
                                        <Link href="/register?type=employer">
                                            Commencer à recruter
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Creative Lottie Integration B2B */}
                            <motion.div
                                className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto"
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                {/* Glowing neon backdrop */}
                                <div className="absolute inset-0 bg-secondary-500/20 dark:bg-secondary-500/10 rounded-full blur-3xl scale-90 animate-pulse" />
                                <div className="absolute inset-4 bg-gradient-to-tr from-neutral-900 to-neutral-800 rounded-full border border-neutral-700/50 shadow-2xl overflow-hidden shadow-secondary-500/10 flex items-center justify-center">
                                    <DotLottieReact
                                        src="/images/entreprisesearch.lottie"
                                        loop
                                        autoplay
                                        className="w-3/4 h-3/4 object-contain"
                                    />
                                </div>
                                {/* Floating decorative badges */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 p-3 rounded-2xl shadow-xl flex items-center justify-center border border-neutral-100 dark:border-neutral-700 text-secondary-500 z-20"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <CheckCircle2 size={24} />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* B2B Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                            {[
                                { title: "Créez votre profil", desc: "Renseignez votre marque employeur.", icon: Building2 },
                                { title: "Publiez l'offre", desc: "Détaillez vos besoins techniques.", icon: Edit },
                                { title: "Recevez les CVs", desc: "Consultez les candidatures en un clic.", icon: Users },
                                { title: "Embauchez", desc: "Prenez contact avec les meilleurs.", icon: CheckCircle },
                            ].map((s, idx) => {
                                const Icon = s.icon;
                                return (
                                    <motion.div
                                        key={s.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 + 1.2, duration: 0.6 }}
                                        className="group relative p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                                        <div className="relative z-10">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/80 text-secondary-400 mb-6 transition-transform group-hover:scale-110">
                                                <Icon size={24} strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{s.title}</h3>
                                            <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center lg:hidden">
                            <Button asChild size="xl" className="w-full h-14 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-white font-bold transition-all">
                                <Link href="/register?type=employer">
                                    Commencer à recruter
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- B2C SECTION (Bottom, Light) --- */}
                <div className="relative bg-neutral-50 dark:bg-neutral-900 pt-32 lg:pt-40 pb-24 -mt-20 lg:-mt-24 z-0">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
                        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Creative Lottie Integration B2C (Left Side) */}
                            <motion.div
                                className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto order-2 lg:order-1"
                                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                {/* Soft glowing backdrop */}
                                <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/10 rounded-[3rem] blur-3xl scale-90" />
                                <div className="absolute inset-4 bg-white dark:bg-neutral-800 rounded-[3rem] border border-neutral-100 dark:border-neutral-700 shadow-2xl overflow-hidden flex items-center justify-center p-8">
                                    <DotLottieReact
                                        src="/images/annonces.lottie"
                                        loop
                                        autoplay
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {/* Floating decorative badges */}
                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-800 p-4 rounded-full shadow-xl flex items-center justify-center border border-neutral-100 dark:border-neutral-700 text-primary-500 z-20"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Zap size={24} className="fill-primary-500/20" />
                                </motion.div>
                            </motion.div>

                            <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700 dark:border-primary-900/50 dark:bg-primary-900/20 dark:text-primary-400">
                                    <Search size={16} />
                                    <span>Vous êtes un particulier ?</span>
                                </div>
                                <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-neutral-900 dark:text-white sm:text-4xl tracking-tight leading-none mt-2">
                                    Décrochez <br className="hidden lg:block" />
                                    <span className="text-primary-600 dark:text-primary-400">l'opportunité idéale.</span>
                                </h2>
                                <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
                                    Valorisez vos compétences et accédez à des dizaines d'offres qualifiées, vérifiées par nos équipes, grâce à une démarche guidée en 4 étapes simples.
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <Button asChild size="xl" className="h-14 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20">
                                        <Link href="/register">
                                            Créer mon profil
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* B2C Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                            {[
                                { title: "Créez votre CV", desc: "Mettez en avant vos diplômes et expériences.", icon: UserPlus },
                                { title: "Explorez", desc: "Parcourez les offres de votre secteur.", icon: Search },
                                { title: "Postulez", desc: "Envoyez votre profil en un seul clic sécurisé.", icon: Send },
                                { title: "Suivez l'avancée", desc: "Restez informé de vos démarches.", icon: Activity },
                            ].map((s, idx) => {
                                const Icon = s.icon;
                                return (
                                    <motion.div
                                        key={s.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 + 0.5, duration: 0.6 }}
                                        className="group relative p-8 rounded-3xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 hover:shadow-xl hover:shadow-neutral-200/40 dark:hover:shadow-none transition-all duration-300"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                                        <div className="relative z-10">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-neutral-800 text-primary-600 dark:text-primary-400 mb-6 transition-transform group-hover:scale-110">
                                                <Icon size={24} strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">{s.title}</h3>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center lg:hidden">
                            <Button asChild size="xl" className="w-full h-14 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all">
                                <Link href="/register">
                                    Créer mon profil
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================================================================
          MEMBERS & VISION SECTION (Stats Equivalent)
          ================================================================== */}
            <section className="bg-neutral-950 py-24 relative overflow-hidden">
                {/* Deep tech glowing effect */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-2 gap-8 sm:grid-cols-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {[
                            { value: "Amorçage", label: "Phase de lancement" },
                            { value: "100+", label: "Premiers pionniers" },
                            { value: "Vision 26", label: "Structuration nationale" },
                            { value: "100%", label: "Focus qualité & expérience" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                className="text-center group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                            >
                                <p className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white tracking-tight group-hover:text-primary-400 transition-colors duration-500">
                                    {stat.value}
                                </p>
                                <p className="mt-3 text-sm font-medium uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================================================================
          RECENT LISTINGS (Soft Edition)
          ================================================================== */}
            <section className="bg-white py-32 dark:bg-neutral-950 relative">
                <motion.div
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
                                Offres du moment
                            </h2>
                            <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400">
                                Les dernières annonces publiées par nos partenaires et recruteurs actifs.
                            </p>
                        </div>
                        <Link
                            href="/jobs"
                            className="group hidden items-center gap-2 font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors sm:flex"
                        >
                            Parcourir toutes les annonces
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* ADVANCED SEARCH BAR (Relocated to Recent Listings) */}
                    <div className="mb-16 w-full relative z-20">
                        <div className="rounded-[2rem] bg-neutral-50 p-2 sm:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:bg-neutral-900/80 border border-neutral-100 dark:border-neutral-800">
                            <form action="/jobs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
                                {/* Dropdown 1: Fonctions */}
                                <div className="w-full relative">
                                    <SearchableSelect
                                        name="function"
                                        options={FUNCTIONS_OPTIONS}
                                        placeholder="Toutes les fonctions"
                                        searchPlaceholder="Rechercher une fonction..."
                                        icon={
                                            <motion.div
                                                className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 p-2 rounded-xl"
                                                animate={{
                                                    boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(var(--color-primary-500), 0.5)", "0px 0px 0px rgba(0,0,0,0)"]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <BriefcaseBusiness className="h-5 w-5" strokeWidth={2.5} />
                                            </motion.div>
                                        }
                                        className="h-14 sm:h-16 pl-2 bg-transparent hover:bg-white dark:hover:bg-neutral-950/50 border-none font-semibold text-neutral-900 dark:text-white"
                                    />
                                </div>

                                {/* Dropdown 2: Secteurs */}
                                <div className="w-full relative">
                                    <SearchableSelect
                                        name="sector"
                                        options={SECTORS_OPTIONS}
                                        placeholder="Tous les secteurs"
                                        searchPlaceholder="Rechercher un secteur..."
                                        icon={<Building2 className="h-5 w-5" />}
                                        className="h-14 sm:h-16 bg-transparent hover:bg-white dark:hover:bg-neutral-950/50 border-none text-neutral-700 dark:text-neutral-300"
                                    />
                                </div>

                                {/* Dropdown 3: Lieux */}
                                <div className="w-full relative">
                                    <SearchableSelect
                                        name="location"
                                        options={LOCATIONS_OPTIONS}
                                        placeholder="N'importe quel lieu"
                                        searchPlaceholder="Rechercher une ville..."
                                        icon={<MapPin className="h-5 w-5" />}
                                        className="h-14 sm:h-16 bg-transparent hover:bg-white dark:hover:bg-neutral-950/50 border-none text-neutral-700 dark:text-neutral-300"
                                    />
                                </div>

                                {/* Dropdown 4: Niveaux */}
                                <div className="w-full relative">
                                    <SearchableSelect
                                        name="level"
                                        options={LEVELS_OPTIONS}
                                        placeholder="Tous niveaux"
                                        searchPlaceholder="Rechercher un niveau..."
                                        icon={<GraduationCap className="h-5 w-5" />}
                                        className="h-14 sm:h-16 bg-transparent hover:bg-white dark:hover:bg-neutral-950/50 border-none text-neutral-700 dark:text-neutral-300"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" size="xl" className="w-full h-14 sm:h-16 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-transform lg:col-span-1 shadow-lg shadow-primary-600/20 text-lg">
                                    Trouver
                                </Button>
                            </form>
                        </div>

                        {/* Popular searches */}
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 px-2">
                            <span className="text-sm font-medium text-neutral-400 whitespace-nowrap">Recherches populaires :</span>
                            <div className="flex flex-wrap items-center gap-2 w-full">
                                <Link href="/jobs?q=Bangui" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                                    <Search size={12} className="text-neutral-400" /> Bangui
                                </Link>
                                <Link href="/jobs?q=Contractuel" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                                    <Search size={12} className="text-neutral-400" /> Contractuel
                                </Link>
                                <Link href="/jobs?q=IT" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                                    <Search size={12} className="text-neutral-400" /> Informatique Et Télécommunications
                                </Link>
                                <Link href="/jobs?q=Temps+Plein" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                                    <Search size={12} className="text-neutral-400" /> À Temps Plein
                                </Link>
                                <Link href="/jobs?q=Banque" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                                    <Search size={12} className="text-neutral-400" /> Banque, Finance Et Assurance
                                </Link>
                                <Link href="/jobs?q=ONG" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                                    <Search size={12} className="text-neutral-400" /> ONG
                                </Link>
                            </div>
                        </div>
                    </div>

                    {DEMO_JOBS.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {DEMO_JOBS.map((job) => (
                                <div key={job.id} className="transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 rounded-2xl">
                                    <JobCard job={job} isPremium={false} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                            <div className="h-20 w-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-neutral-400">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">0 offre actuellement</h3>
                            <p className="mt-3 text-neutral-500 max-w-md">
                                Soyez le premier à publier une annonce dans cette catégorie ! Notre plateforme est en plein lancement.
                            </p>
                            <Button asChild className="mt-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-md shadow-primary-600/20">
                                <Link href="/register?type=employer">
                                    Publier une annonce
                                </Link>
                            </Button>
                        </div>
                    )}

                    <div className="mt-12 flex justify-center sm:hidden">
                        <Button asChild variant="outline" size="xl" className="w-full h-14 rounded-xl border-neutral-200 text-neutral-700">
                            <Link href="/jobs" className="w-full flex items-center justify-center">
                                Parcourir toutes les annonces
                                <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
          PRICING SECTION (SaaS 4-Tier Model)
          ================================================================== */}
            <section className="bg-neutral-50 py-32 dark:bg-neutral-900/40 relative overflow-hidden" id="tarifs">
                <motion.div
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-24 text-center max-w-3xl mx-auto">
                        <Badge variant="outline" className="mb-6 px-4 py-2 border-primary-500/30 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                            Tarification Flexible
                        </Badge>
                        <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-none">
                            Investissez dans votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-300">succès</span>
                        </h2>
                        <p className="mt-6 text-xl text-neutral-500 dark:text-neutral-400">
                            Des forfaits ultra-complets, pensés pour maximiser votre visibilité professionnelle et optimiser vos recrutements.
                        </p>
                    </div>

                    {/* PRICING CAROUSEL */}
                    <PricingCarousel whatsapp={CONTACT.WHATSAPP} />

                    {/* PAYMENT METHODS & ANNOUNCEMENTS BANNER */}
                    <div className="mt-20 max-w-5xl mx-auto">
                        {/* Guarantees Banner */}
                        <div className="bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-600 p-1 mb-8 rounded-[2rem] shadow-2xl shadow-primary-500/20">
                            <div className="bg-white dark:bg-neutral-950 rounded-[1.8rem] px-6 py-8 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Gagnez à tous les coups</h4>
                                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">Profitez de nos offres exceptionnelles de lancement</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full md:w-auto text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                    <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Satisfaction remboursée</div>
                                    <div className="flex items-center gap-2"><Gift size={18} className="text-primary-500" /> 3 mois d'essai offerts</div>
                                    <div className="flex items-center gap-2"><Lock size={18} className="text-neutral-400" /> Sans engagement</div>
                                    <div className="flex items-center gap-2"><Handshake size={18} className="text-indigo-500" /> Parrainage & Codes promo</div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex flex-col items-center justify-center pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60">
                            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Paiements 100% sécurisés supportés</p>
                            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                                {/* Badges for Payment Methods */}
                                {/* Mobile Money (Orange) */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center gap-3 transition-all duration-300 hover:scale-105">
                                    <Image src="/images/orange-money.png" alt="Mobile Money" width={40} height={40} className="object-contain" />
                                    <span className="font-bold text-sm text-neutral-700 dark:text-neutral-300">Mobile Money</span>
                                </div>

                                {/* Mastercard */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.2 46.8" className="h-6"><path fill="#EB001B" d="M23.4 46.8C10.5 46.8 0 36.3 0 23.4S10.5 0 23.4 0c7.8 0 14.7 3.9 18.9 9.8C38 13.8 35.1 18.4 35.1 23.4s2.8 9.6 7.3 13.6c-4.3 5.9-11.2 9.8-19 9.8z" /><path fill="#F79E1B" d="M52.8 46.8C45 46.8 38.1 42.9 33.9 37c4.4-4 7.3-8.6 7.3-13.6s-2.9-9.6-7.3-13.6C38.1 3.9 45 0 52.8 0 65.7 0 76.2 10.5 76.2 23.4S65.7 46.8 52.8 46.8z" /><path fill="#FF5F00" d="M42.4 23.4c0-4.9-2.9-9.6-7.3-13.6-4.4 4-7.3 8.6-7.3 13.6s2.8 9.6 7.3 13.6c4.5-4 7.3-8.6 7.3-13.6z" /></svg>
                                </div>

                                {/* Visa */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105">
                                    <Image src="/images/png-clipart-logo-visa-credit-card-wordmark-atm-card-visa-blue-text.png" alt="Visa" width={44} height={16} className="object-contain" />
                                </div>

                                {/* PayPal */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105">
                                    <Image src="/images/png-clipart-logo-paypal-graphics-product-computer-icons-paypal-blue-angle-thumbnail.png" alt="PayPal" width={44} height={16} className="object-contain" />
                                </div>

                                {/* GIMAC */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105">
                                    <Image src="/images/gimac.png" alt="GIMAC" width={64} height={20} className="object-contain" />
                                </div>

                                {/* Virement Bancaire */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center gap-3 transition-all duration-300 hover:scale-105">
                                    <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <ArrowRightLeft className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                    </div>
                                    <span className="font-bold text-sm text-neutral-700 dark:text-neutral-300">Virement</span>
                                </div>

                                {/* Ticket Cash */}
                                <div className="px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center gap-3 transition-all duration-300 hover:scale-105">
                                    <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    <span className="font-bold text-sm text-neutral-700 dark:text-neutral-300">Ticket Cash</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
          FINAL CTA (Massive Footer Intro)
          ================================================================== */}
            <section className="relative overflow-hidden bg-neutral-900 py-32 dark:bg-neutral-950">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <motion.div
                    className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight text-white leading-none">
                        Prêt à accélérer ?
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-400">
                        Rejoignez l'écosystème professionnel le plus dynamique de RCA.
                        L'inscription prend littéralement 2 minutes.
                    </p>
                    <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                        <Button asChild size="xl" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white text-neutral-950 font-bold hover:bg-neutral-200 transition-all hover:scale-105">
                            <Link href="/register" className="flex items-center">
                                Créer mon compte gratuit
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
