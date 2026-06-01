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
    ArrowRightLeft,
    UserCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
    Buildings, PencilSimple, Users as UsersPhosphor, 
    Handshake as HandshakePhosphor, Desktop, 
    UserCirclePlus, MagnifyingGlass, PaperPlaneRight, ChartLineUp,
    Network, Brain, Robot, CheckCircle as CheckCirclePhosphor
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ModernPricingPage, PricingCardProps } from "@/components/ui/animated-glassy-pricing";
import { HeroSection } from "@/components/marketing/hero-section";
import { DomainFusion } from "@/components/marketing/domain-fusion";
import { CommunityNetwork } from "@/components/marketing/community-network";
import { QuickSearchForm } from "@/components/marketing/quick-search";
import { AnnouncementTicker } from "@/components/marketing/announcement-ticker";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { JobCard } from "@/components/jobs/job-card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { CONTACT } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Pricing Plans Data
// ---------------------------------------------------------------------------
const myPricingPlans: PricingCardProps[] = [
    {
        planName: 'Découverte',
        description: 'L\'essentiel pour démarrer',
        price: '0',
        features: [
            'Création de profil basique',
            'Postulation illimitée',
            'Alertes emplois standards',
            'Support par email'
        ],
        buttonText: 'Commencer gratuitement',
        buttonLink: '/register',
        buttonVariant: 'secondary'
    },
    {
        planName: 'Standard',
        description: 'Pour particuliers premium',
        price: '2 500',
        features: [
            'Mise en avant du profil',
            'Accès prioritaire aux offres',
            'Outil CV optimisé IA',
            'Statut "Profil Vérifié"'
        ],
        buttonText: 'Choisir Standard',
        buttonLink: '/register',
        isPopular: true,
        buttonVariant: 'primary'
    },
    {
        planName: 'Pro',
        description: 'Pour PME et agences',
        price: '7 500',
        features: [
            'Publications illimitées',
            'Gestion des candidatures (ATS)',
            'Accès restreint Base CV',
            'Marque employeur basique'
        ],
        buttonText: 'Choisir Pro',
        buttonLink: '/register?type=employer',
        buttonVariant: 'secondary'
    }
];

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



function EnterpriseTypewriterHeading() {
    const enterpriseHeadline = "Recrutez efficacement";
    const [visibleChars, setVisibleChars] = useState(0);
    const [typingStarted, setTypingStarted] = useState(false);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const node = headingRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setTypingStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!typingStarted) return;

        let frameId = 0;
        const charsPerSecond = 12;
        const startAt = performance.now();

        const step = (now: number) => {
            const elapsed = (now - startAt) / 1000;
            const next = Math.min(
                enterpriseHeadline.length,
                Math.floor(elapsed * charsPerSecond),
            );

            setVisibleChars((prev) => (next > prev ? next : prev));

            if (next < enterpriseHeadline.length) {
                frameId = window.requestAnimationFrame(step);
            }
        };

        frameId = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(frameId);
    }, [enterpriseHeadline.length, typingStarted]);

    const typedText = enterpriseHeadline.slice(0, visibleChars);
    const completed = visibleChars >= enterpriseHeadline.length;

    return (
        <h2
            ref={headingRef}
            className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.08] mt-2"
        >
            <span className="sr-only">{enterpriseHeadline}.</span>
            <span aria-hidden="true" className="inline-flex items-baseline flex-wrap">
                <span className="inline-block">
                    <span>{typedText}</span>
                    {completed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.12 }}
                            className="inline text-secondary-500"
                        >
                            .
                        </motion.span>
                    )}
                    <span
                        className={cn(
                            "ml-0.5 inline-block h-[0.95em] w-[2px] rounded-full translate-y-[2px] bg-secondary-500",
                            completed ? "opacity-0" : "animate-pulse",
                        )}
                    />
                </span>
            </span>
        </h2>
    );
}
interface HomeClientProps {
    isLoggedIn?: boolean;
    userType?: string | null;
}

export default function HomeClient({ isLoggedIn = false, userType = null }: HomeClientProps) {
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
                    <HeroSection />
                    <div className="relative z-30 -mt-24 sm:-mt-32 lg:mt-0">
                        <QuickSearchForm />
                    </div>

                    {/* Hero Lottie Animation */}
                    <motion.div
                        className="mt-6 sm:mt-12 flex justify-center w-full max-w-[320px] sm:max-w-[600px] lg:max-w-[700px] mx-auto mb-8 sm:mb-16"
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
            </section>

            {/* ==================================================================
          EXPLORE BY DOMAIN (Fusion Vertical & Bento)
          ================================================================== */}
            <DomainFusion />

            {/* ==================================================================
          COMMUNITY NETWORK (3D Marquee)
          ================================================================== */}
            <CommunityNetwork />

            {/* ==================================================================
          HOW IT WORKS (Transversal Diagonal Design B2B / B2C)
          ================================================================== */}
            <section id="comment-ca-marche" className="relative w-full overflow-hidden">

                {/* Wrapper for the drop shadow since clip-path cuts off shadows */}
                <div className="relative w-full drop-shadow-[0_15px_15px_rgba(0,0,0,0.03)] dark:drop-shadow-none">
                {/* --- B2B SECTION (Top, Light, Skewed Background) --- */}
                <div className="relative bg-white dark:bg-neutral-950 pt-24 pb-32 lg:pb-40 z-10 
                                [clip-path:polygon(0_0,100%_0,100%_95%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
                        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 text-center lg:text-left">
                                <div className="mb-8 inline-flex flex-col items-center lg:items-start">
                                    <span className="tracking-[0.25em] text-[11px] sm:text-xs font-black text-secondary-600 dark:text-secondary-400 uppercase">Espace Entreprise</span>
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-0.5 bg-gradient-to-r from-secondary-500 to-transparent mt-1.5" />
                                </div>
                                <EnterpriseTypewriterHeading />
                                <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
                                    Trouvez les meilleurs talents en République Centrafricaine grâce à une méthode ciblée en 4 étapes simples.
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <Button asChild size="xl" className="h-14 px-8 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-white font-bold transition-all shadow-lg shadow-secondary-500/20">
                                        <Link href="/entreprises">
                                            Commencer à recruter
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Creative Lottie Integration B2B */}
                            <motion.div
                                className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                {/* Glowing neon backdrop */}
                                <div className="absolute inset-0 bg-secondary-500/20 dark:bg-secondary-500/10 rounded-full blur-3xl scale-90 animate-pulse" />
                                <DotLottieReact
                                    src="/images/entreprisesearch.lottie"
                                    loop
                                    autoplay
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </motion.div>
                        </div>

                        {/* B2B Steps (Zigzag Roadmap) */}
                        <div className="mt-24 lg:mt-32 flex flex-col gap-8 md:gap-16 relative lg:max-w-5xl lg:mx-auto">
                            {[
                                { title: "Créez votre profil", desc: "Renseignez votre marque employeur.", icon: Buildings },
                                { title: "Publiez l'offre", desc: "Détaillez vos besoins techniques.", icon: PencilSimple },
                                { title: "Recevez les CVs", desc: "Consultez les candidatures en un clic.", icon: UsersPhosphor },
                                { title: "Embauchez", desc: "Prenez contact avec les meilleurs.", icon: HandshakePhosphor },
                                { title: "Gérez tout au même endroit", desc: "Centralisez vos recrutements sur un seul espace.", icon: Desktop },
                            ].map((s, idx) => {
                                const Icon = s.icon;
                                const isLeft = idx % 2 === 0;
                                return (
                                    <motion.div
                                        key={s.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: 0.1, duration: 0.6 }}
                                        className={cn("relative flex w-full", isLeft ? "md:justify-start" : "md:justify-end")}
                                    >
                                        <div className="md:bg-white md:dark:bg-neutral-900 md:rounded-[2rem] p-0 md:p-8 sm:p-10 md:border border-neutral-100 dark:border-neutral-800 md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] md:w-[60%] w-full relative z-10 bg-transparent shadow-none border-none pl-6 border-l-[3px] border-secondary-200 dark:border-secondary-800/30 md:border-l-0 md:pl-0">
                                            <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 mb-6 border border-secondary-100 dark:border-secondary-800/50">
                                                <Icon size={32} weight="duotone" />
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2 md:mb-3 tracking-tight flex items-center">
                                               <span className="md:hidden text-secondary-500 mr-3 font-black text-2xl">0{idx + 1}</span>{s.title}
                                            </h3>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed">{s.desc}</p>
                                        </div>

                                        {/* Zigzag SVG Arrow connecting to next card */}
                                        {idx < 4 && (
                                            <div className={cn("hidden md:block absolute top-[80%] w-40 h-32 pointer-events-none z-0", isLeft ? "left-[55%]" : "right-[55%] -scale-x-100")}>
                                                <svg viewBox="0 0 100 100" className="w-full h-full text-secondary-200 dark:text-secondary-900/30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6">
                                                    <path d="M 0 0 C 50 0, 50 100, 100 100" />
                                                    <polygon points="95,95 100,100 95,105" fill="currentColor" stroke="none" />
                                                </svg>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center lg:hidden">
                            <Button asChild size="xl" className="w-full h-14 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-white font-bold transition-all">
                                <Link href="/entreprises">
                                    Commencer à recruter
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                </div> {/* End of drop-shadow wrapper */}

                {/* --- B2C SECTION (Bottom, Light) --- */}
                <div className="relative bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 pt-32 lg:pt-40 pb-24 -mt-20 lg:-mt-24 z-0">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
                        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Creative Lottie Integration B2C (Left Side) */}
                            <motion.div
                                className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto order-2 lg:order-1 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                {/* Soft glowing backdrop */}
                                <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl scale-90" />
                                <DotLottieReact
                                    src="/images/annonces.lottie"
                                    loop={false}
                                    autoplay
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </motion.div>

                            <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">
                                <div className="mb-8 inline-flex flex-col items-center lg:items-start">
                                    <span className="tracking-[0.25em] text-[11px] sm:text-xs font-black text-primary-600 dark:text-primary-400 uppercase">Espace Particulier</span>
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-0.5 bg-gradient-to-r from-primary-500 to-transparent mt-1.5" />
                                </div>
                                <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-neutral-900 dark:text-white sm:text-4xl tracking-tight leading-none mt-2">
                                    Décrochez <br className="hidden lg:block" />
                                    <span className="text-primary-600 dark:text-primary-400">l'opportunité idéale.</span>
                                </h2>
                                <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
                                    Valorisez vos compétences et accédez à des dizaines d'offres qualifiées, vérifiées par nos équipes, grâce à une démarche guidée en 4 étapes simples.
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    {isLoggedIn ? (
                                        <Button asChild size="xl" className="h-14 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20">
                                            <Link href="/dashboard">
                                                Accéder à mon espace
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button asChild size="xl" className="h-14 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20">
                                            <Link href="/register">
                                                Créer mon profil
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* B2C Steps (Zigzag Roadmap) */}
                        <div className="mt-24 lg:mt-32 flex flex-col gap-8 md:gap-16 relative lg:max-w-5xl lg:mx-auto">
                            {[
                                { title: "Créez votre profil", desc: "Mettez en avant vos compétences et expériences.", icon: UserCirclePlus },
                                { title: "Explorez", desc: "Parcourez les offres pertinentes de votre secteur.", icon: MagnifyingGlass },
                                { title: "Postulez", desc: "Envoyez votre candidature en un seul clic sécurisé.", icon: PaperPlaneRight },
                                { title: "Suivez l'avancée", desc: "Restez informé du traitement de vos démarches.", icon: ChartLineUp },
                            ].map((s, idx) => {
                                const Icon = s.icon;
                                const isLeft = idx % 2 === 0;
                                return (
                                    <motion.div
                                        key={s.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: 0.1, duration: 0.6 }}
                                        className={cn("relative flex w-full", isLeft ? "md:justify-start" : "md:justify-end")}
                                    >
                                        <div className={cn(
                                            "w-full relative z-10 flex flex-col p-4",
                                            isLeft ? "md:items-start md:text-left items-center text-center" : "md:items-end md:text-right items-center text-center"
                                        )}>
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 border border-primary-100 dark:border-primary-800/50">
                                                <Icon size={32} weight="duotone" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">{s.title}</h3>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-sm">{s.desc}</p>
                                        </div>

                                        {/* Zigzag SVG Arrow connecting to next card */}
                                        {idx < 3 && (
                                            <div className={cn("hidden md:block absolute top-[80%] w-40 h-32 pointer-events-none z-0", isLeft ? "left-[55%]" : "right-[55%] -scale-x-100")}>
                                                <svg viewBox="0 0 100 100" className="w-full h-full text-primary-200 dark:text-primary-900/30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6">
                                                    <path d="M 0 0 C 50 0, 50 100, 100 100" />
                                                    <polygon points="95,95 100,100 95,105" fill="currentColor" stroke="none" />
                                                </svg>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center lg:hidden">
                            {isLoggedIn ? (
                                <Button asChild size="xl" className="w-full h-14 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all">
                                    <Link href="/dashboard">
                                        Accéder à mon espace
                                    </Link>
                                </Button>
                            ) : (
                                <Button asChild size="xl" className="w-full h-14 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all">
                                    <Link href="/register">
                                        Créer mon profil
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================================================================
          KUSSALA AI ENGINE (V3 - Split Layout with Lottie)
          ================================================================== */}
            <section className="relative overflow-hidden z-10 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
                {/* Magic Color Flux Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-secondary-100/40 blur-[120px] rounded-full" 
                    />
                    <motion.div 
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] right-[0%] w-[400px] h-[400px] bg-accent-100/30 blur-[100px] rounded-full" 
                    />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 lg:pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center lg:items-start relative">
                        
                        {/* Left Column: Typography & Open Features */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10 pt-8 lg:pt-24">
                            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-neutral-900 tracking-tight leading-[1.05]">
                                L'Intelligence Artificielle. <br/>
                                <span className="text-neutral-400">Le cœur de l'écosystème.</span>
                            </h2>
                            <p className="mt-6 text-xl text-neutral-500 max-w-2xl leading-relaxed">
                                Notre algorithme propriétaire lit, trie et connecte les exigences avec une précision chirurgicale, sans que vous n'ayez à faire le moindre effort.
                            </p>

                            <div className="mt-16 flex flex-col gap-12">
                                {[
                                    {
                                        title: "Analyse intelligente des profils",
                                        desc: "Le système lit les documents comme un humain. Il repère immédiatement les profils qualifiés qui correspondent exactement à ce que cherche l'employeur."
                                    },
                                    {
                                        title: "Mise en avant automatique",
                                        desc: "Fini d'attendre. L'algorithme propose directement les profils pertinents sur le tableau de bord des recruteurs au moment même où ils expriment un besoin."
                                    },
                                    {
                                        title: "Réponses et suivis automatiques",
                                        desc: "La plateforme gère les retours à votre place. Elle génère et envoie des messages personnalisés et courtois aux personnes non retenues, protégeant ainsi votre image."
                                    },
                                    {
                                        title: "Recommandations sur mesure",
                                        desc: "Recevez en permanence de nouvelles suggestions d'opportunités ou de talents basées sur vos précédentes actions, pour toujours avoir un coup d'avance."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="relative">
                                        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Interactive Lottie */}
                        <div className="absolute inset-0 z-0 opacity-15 scale-150 pointer-events-none lg:relative lg:opacity-100 lg:scale-100 lg:col-span-5 lg:w-full lg:min-h-[500px] lg:h-[900px] lg:flex lg:items-center lg:justify-center lg:sticky lg:top-24">
                            <DotLottieReact
                                src="/ialotties.lottie"
                                loop
                                autoplay
                                className="w-full h-full object-contain relative z-20 mix-blend-multiply"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* ==================================================================
          RECENT LISTINGS (Soft Edition)
          ================================================================== */}
            <section className="bg-white pt-24 pb-12 lg:pt-32 lg:pb-32 dark:bg-neutral-950 relative">
                {/* Cloud / Wave Separator from previous section */}
                <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180 -translate-y-full">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-neutral-950"></path>
                    </svg>
                </div>
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
                            <span className="text-sm font-medium text-neutral-400">Recherches populaires :</span>
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
          PRICING SECTION (Animated Glassy WebGL)
          ================================================================== */}
            <ModernPricingPage
                title={
                    <>
                        Investissez dans votre <span className="bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">succès</span>
                    </>
                }
                subtitle="Des forfaits ultra-complets, pensés pour maximiser votre visibilité professionnelle et optimiser vos recrutements."
                plans={myPricingPlans}
                showAnimatedBackground={true}
            />

            {/* PAYMENT METHODS & ANNOUNCEMENTS BANNER */}
            <section className="bg-neutral-50 dark:bg-neutral-950 pb-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        {/* Payment Methods */}
                        <div className="flex flex-col items-center justify-center pt-2 sm:pt-4">
                            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:mb-6 sm:text-sm">Paiements 100% sécurisés supportés</p>
                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 lg:gap-8">
                                {/* Badges for Payment Methods */}
                                {/* Mobile Money (Orange) */}
                                <div className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:gap-3 sm:rounded-xl sm:px-5 sm:py-3 md:hover:scale-105">
                                    <Image src="/images/orange-money.png" alt="Mobile Money" width={32} height={32} className="object-contain sm:h-10 sm:w-10" />
                                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 sm:text-sm">Mobile Money</span>
                                </div>

                                {/* Mastercard */}
                                <div className="flex items-center justify-center rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-xl sm:px-5 sm:py-3 md:hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.2 46.8" className="h-5 sm:h-6"><path fill="#EB001B" d="M23.4 46.8C10.5 46.8 0 36.3 0 23.4S10.5 0 23.4 0c7.8 0 14.7 3.9 18.9 9.8C38 13.8 35.1 18.4 35.1 23.4s2.8 9.6 7.3 13.6c-4.3 5.9-11.2 9.8-19 9.8z" /><path fill="#F79E1B" d="M52.8 46.8C45 46.8 38.1 42.9 33.9 37c4.4-4 7.3-8.6 7.3-13.6s-2.9-9.6-7.3-13.6C38.1 3.9 45 0 52.8 0 65.7 0 76.2 10.5 76.2 23.4S65.7 46.8 52.8 46.8z" /><path fill="#FF5F00" d="M42.4 23.4c0-4.9-2.9-9.6-7.3-13.6-4.4 4-7.3 8.6-7.3 13.6s2.8 9.6 7.3 13.6c4.5-4 7.3-8.6 7.3-13.6z" /></svg>
                                </div>

                                {/* Visa */}
                                <div className="flex items-center justify-center rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-xl sm:px-5 sm:py-3 md:hover:scale-105">
                                    <Image src="/images/png-clipart-logo-visa-credit-card-wordmark-atm-card-visa-blue-text.png" alt="Visa" width={36} height={14} className="object-contain sm:h-4 sm:w-11" />
                                </div>

                                {/* PayPal */}
                                <div className="flex items-center justify-center rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-xl sm:px-5 sm:py-3 md:hover:scale-105">
                                    <Image src="/images/png-clipart-logo-paypal-graphics-product-computer-icons-paypal-blue-angle-thumbnail.png" alt="PayPal" width={36} height={14} className="object-contain sm:h-4 sm:w-11" />
                                </div>

                                {/* GIMAC */}
                                <div className="flex items-center justify-center rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-xl sm:px-5 sm:py-3 md:hover:scale-105">
                                    <Image src="/images/gimac.png" alt="GIMAC" width={52} height={18} className="object-contain sm:h-5 sm:w-16" />
                                </div>

                                {/* Virement Bancaire */}
                                <div className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:gap-3 sm:rounded-xl sm:px-5 sm:py-3 md:hover:scale-105">
                                    <div className="h-7 w-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center sm:h-8 sm:w-8">
                                        <ArrowRightLeft className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400 sm:h-4 sm:w-4" />
                                    </div>
                                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 sm:text-sm">Virement</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            {/* ==================================================================
          FINAL CTA (Massive Footer Intro - Smart auth-aware)
          ================================================================== */}
            <section className="relative overflow-hidden bg-[#F5F2EB] py-32 dark:bg-neutral-950">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)]" />
                </div>

                <motion.div
                    className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {!isLoggedIn ? (
                        /* === Non-connecté : CTA standard === */
                        <>
                            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight text-neutral-900 dark:text-white leading-none">
                                Prêt à accélérer ?
                            </h2>
                            <div className="flex justify-center w-full mt-4">
                                <TypewriterEffectSmooth 
                                    words={[
                                        { text: "Rejoignez" },
                                        { text: "le" },
                                        { text: "réseau." },
                                        { text: "Ça" },
                                        { text: "prend" },
                                        { text: "2" },
                                        { text: "minutes.", className: "text-primary-600 dark:text-primary-400" }
                                    ]}
                                    className="my-0"
                                    textClassName="text-xl sm:text-2xl font-medium text-neutral-600 dark:text-neutral-400"
                                    cursorClassName="h-6 sm:h-8"
                                />
                            </div>
                            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button asChild size="xl" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-neutral-950 text-white font-bold hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all hover:scale-105">
                                    <Link href="/register" className="flex items-center">
                                        Créer mon compte gratuit
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-neutral-300 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white transition-all">
                                    <Link href="/register?type=employer" className="flex items-center">
                                        Je suis recruteur
                                    </Link>
                                </Button>
                            </div>
                        </>
                    ) : userType === "employer" ? (
                        /* === Connecté en tant qu'Employeur === */
                        <>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-500/40 bg-secondary-500/10 px-5 py-2 text-sm font-semibold text-secondary-300">
                                <Building2 className="h-4 w-4" /> Espace Employeur actif
                            </div>
                            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight text-neutral-900 dark:text-white leading-none">
                                Tout est prêt pour votre prochain recrutement.
                            </h2>
                            <div className="flex justify-center w-full mt-4">
                                <TypewriterEffectSmooth 
                                    words={[
                                        { text: "Publiez," },
                                        { text: "explorez," },
                                        { text: "recrutez.", className: "text-secondary-600 dark:text-secondary-400" }
                                    ]}
                                    className="my-0"
                                    textClassName="text-xl sm:text-2xl font-medium text-neutral-600 dark:text-neutral-400"
                                    cursorClassName="h-6 sm:h-8 bg-secondary-500"
                                />
                            </div>
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button asChild size="xl" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-secondary-500 text-white font-bold hover:bg-secondary-400 transition-all hover:scale-105">
                                    <Link href="/dashboard" className="flex items-center">
                                        Accéder à mon dashboard
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-neutral-300 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-primary-500 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-all">
                                    <Link href="/register" className="flex items-center gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        Créer un profil Candidat aussi
                                    </Link>
                                </Button>
                            </div>
                            <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-500">Vous pouvez avoir un compte employeur <strong className="text-neutral-900 dark:text-neutral-400">+ un profil candidat</strong> en parallèle.</p>
                        </>
                    ) : (
                        /* === Connecté en tant que Candidat / Seeker === */
                        <>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-5 py-2 text-sm font-semibold text-primary-300">
                                <UserCircle className="h-4 w-4" /> Profil Candidat actif
                            </div>
                            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight text-neutral-900 dark:text-white leading-none">
                                Votre prochaine opportunité est à portée de clic.
                            </h2>
                            <div className="flex justify-center w-full mt-4">
                                <TypewriterEffectSmooth 
                                    words={[
                                        { text: "Postulez" },
                                        { text: "et" },
                                        { text: "suivez" },
                                        { text: "vos" },
                                        { text: "candidatures.", className: "text-primary-600 dark:text-primary-400" }
                                    ]}
                                    className="my-0"
                                    textClassName="text-xl sm:text-2xl font-medium text-neutral-600 dark:text-neutral-400"
                                    cursorClassName="h-6 sm:h-8"
                                />
                            </div>
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button asChild size="xl" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all hover:scale-105">
                                    <Link href="/dashboard" className="flex items-center">
                                        Mon espace candidat
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-neutral-300 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-secondary-500 dark:hover:bg-secondary-950 dark:hover:text-secondary-300 transition-all">
                                    <Link href="/register?type=employer" className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Créer un espace Entreprise aussi
                                    </Link>
                                </Button>
                            </div>
                            <p className="mt-6 text-sm text-neutral-500">Vous êtes aussi décideur ou dirigeant ? Ouvrez un espace entreprise <strong className="text-neutral-400">gratuitement</strong>.</p>
                        </>
                    )}
                </motion.div>
            </section>
        </>
    );
}

