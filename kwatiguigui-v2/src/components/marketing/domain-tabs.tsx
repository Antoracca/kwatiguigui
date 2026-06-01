"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowRight, 
    Laptop, 
    Building2, 
    BriefcaseBusiness, 
    LineChart, 
    Megaphone, 
    HeartPulse, 
    GraduationCap, 
    Landmark, 
    Store, 
    Truck, 
    UtensilsCrossed, 
    Leaf, 
    Wrench, 
    ShieldAlert,
    Cpu
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DOMAIN_CATEGORIES = [
    {
        title: "Tech, Ingénierie & Bâtiment",
        description: "L'avant-garde technologique et les bâtisseurs de demain.",
        domains: [
            {
                name: "Informatique & Logiciels",
                desc: "Développement web, Data, Intelligence Artificielle et solutions IT pour propulser l'innovation numérique.",
                icon: Laptop,
                href: "/jobs?q=informatique",
                color: "text-blue-600",
                bg: "bg-blue-600/10"
            },
            {
                name: "Ingénierie & Architecture",
                desc: "Génie civil, conception et technologie.",
                icon: Cpu,
                href: "/jobs?q=ingenierie",
                color: "text-indigo-600",
                bg: "bg-indigo-600/10"
            },
            {
                name: "Bâtiment & Construction",
                desc: "Maçonnerie, BTP, et infrastructures.",
                icon: Building2,
                href: "/jobs?q=construction",
                color: "text-sky-600",
                bg: "bg-sky-600/10"
            }
        ]
    },
    {
        title: "Administration & Tertiaire",
        description: "Les fonctions clés qui structurent et propulsent les entreprises.",
        domains: [
            {
                name: "Finance & Assurances",
                desc: "Banque, comptabilité, audit financier et gestion des risques pour les grandes institutions.",
                icon: LineChart,
                href: "/jobs?q=finance",
                color: "text-emerald-600",
                bg: "bg-emerald-600/10"
            },
            {
                name: "Marketing & Communication",
                desc: "Stratégie digitale, médias et publicité.",
                icon: Megaphone,
                href: "/jobs?q=marketing",
                color: "text-rose-600",
                bg: "bg-rose-600/10"
            },
            {
                name: "RH & Gestion d'Entreprise",
                desc: "Recrutement, secrétariat et administration.",
                icon: BriefcaseBusiness,
                href: "/jobs?q=rh",
                color: "text-purple-600",
                bg: "bg-purple-600/10"
            }
        ]
    },
    {
        title: "Santé, Éducation & Public",
        description: "Ceux qui soignent, instruisent et accompagnent la société.",
        domains: [
            {
                name: "Santé & Secteur Médical",
                desc: "Soins cliniques, infirmerie, médecine spécialisée et recherche pharmaceutique.",
                icon: HeartPulse,
                href: "/jobs?q=sante",
                color: "text-red-500",
                bg: "bg-red-500/10"
            },
            {
                name: "Éducation & Recherche",
                desc: "Enseignement académique et formation.",
                icon: GraduationCap,
                href: "/jobs?q=education",
                color: "text-amber-600",
                bg: "bg-amber-600/10"
            },
            {
                name: "ONG & Secteur Public",
                desc: "Gouvernement, humanitaire et associations.",
                icon: Landmark,
                href: "/jobs?q=ong",
                color: "text-teal-600",
                bg: "bg-teal-600/10"
            }
        ]
    },
    {
        title: "Commerce, Logistique & Services",
        description: "L'économie réelle en mouvement, du commerce à la livraison.",
        domains: [
            {
                name: "Vente & Commerce",
                desc: "Commerce de détail, grande distribution, import-export et gestion immobilière.",
                icon: Store,
                href: "/jobs?q=vente",
                color: "text-orange-500",
                bg: "bg-orange-500/10"
            },
            {
                name: "Transport & Logistique",
                desc: "Chaînes d'approvisionnement et fret.",
                icon: Truck,
                href: "/jobs?q=logistique",
                color: "text-cyan-600",
                bg: "bg-cyan-600/10"
            },
            {
                name: "Hôtellerie & Restauration",
                desc: "Tourisme, loisirs et services d'accueil.",
                icon: UtensilsCrossed,
                href: "/jobs?q=hotellerie",
                color: "text-yellow-600",
                bg: "bg-yellow-600/10"
            }
        ]
    },
    {
        title: "Métiers Pratiques & Artisanat",
        description: "Le savoir-faire de terrain et l'artisanat essentiel.",
        domains: [
            {
                name: "Agriculture & Foresterie",
                desc: "Exploitation agricole, élevage, techniques de pêche et gestion forestière durable.",
                icon: Leaf,
                href: "/jobs?q=agriculture",
                color: "text-green-600",
                bg: "bg-green-600/10"
            },
            {
                name: "Artisanat & Métiers Manuels",
                desc: "Menuiserie, plomberie et mécanique.",
                icon: Wrench,
                href: "/jobs?q=metiers",
                color: "text-slate-600",
                bg: "bg-slate-600/10"
            },
            {
                name: "Services de Proximité",
                desc: "Aide à domicile, nettoyage et sécurité.",
                icon: ShieldAlert,
                href: "/jobs?q=securite",
                color: "text-zinc-800",
                bg: "bg-zinc-800/10"
            }
        ]
    }
];

export function DomainTabs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-neutral-50/50 py-24 sm:py-32 relative z-10 border-t border-neutral-100 dark:bg-neutral-950 dark:border-neutral-900 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header with Logo */}
                <motion.div 
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image 
                                src="/images/Favicon.png" 
                                alt="Kussala Logo" 
                                width={48} 
                                height={48} 
                                className="w-10 h-10 object-contain drop-shadow-sm"
                            />
                            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
                                Explorez par domaine
                            </h2>
                        </div>
                        <p className="text-xl text-neutral-500 font-medium dark:text-neutral-400">
                            Naviguez à travers nos secteurs clés. Des métiers de terrain aux postes stratégiques, chaque talent trouve sa place.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* LEFT COLUMN: Tabs Navigation */}
                    <div className="lg:col-span-4 flex flex-col gap-3 relative z-20">
                        {DOMAIN_CATEGORIES.map((cat, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)} 
                                    className={cn(
                                        "w-full text-left p-5 rounded-2xl transition-all duration-300 relative group outline-none",
                                        isActive 
                                            ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800" 
                                            : "hover:bg-white/60 dark:hover:bg-neutral-900/50 border border-transparent"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeTabIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-primary-600 rounded-r-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors",
                                        isActive ? "text-primary-600 dark:text-primary-400" : "text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white"
                                    )}>
                                        {cat.title}
                                    </h3>
                                    <div 
                                        className={cn(
                                            "grid transition-all duration-300 ease-in-out",
                                            isActive ? "grid-rows-[1fr] mt-2 opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                                                {cat.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT COLUMN: Bento Grid Content */}
                    <div className="lg:col-span-8 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {(() => {
                                const activeCategory = DOMAIN_CATEGORIES[activeIndex];
                                if (!activeCategory) return null;
                                const domain0 = activeCategory.domains[0];
                                const domain1 = activeCategory.domains[1];
                                const domain2 = activeCategory.domains[2];
                                if (!domain0 || !domain1 || !domain2) return null;

                                return (
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full"
                                    >
                                        {/* Large Card (Domain 0) */}
                                        <Link 
                                            href={domain0.href} 
                                            className="md:col-span-3 bg-white dark:bg-neutral-900 rounded-[2rem] p-8 flex flex-col justify-between group border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
                                            
                                            <div>
                                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110", domain0.bg, domain0.color)}>
                                                    <domain0.icon size={32} strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-2xl font-bold mt-8 text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                                    {domain0.name}
                                                </h3>
                                                <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-base leading-relaxed font-medium">
                                                    {domain0.desc}
                                                </p>
                                            </div>

                                            <div className="mt-12 flex items-center gap-2 font-bold text-primary-600 dark:text-primary-400 group-hover:gap-3 transition-all">
                                                Consulter ce domaine 
                                                <ArrowRight size={18} />
                                            </div>
                                        </Link>

                                        {/* Stacked Cards (Domain 1 & 2) */}
                                        <div className="md:col-span-2 flex flex-col gap-6">
                                            {[domain1, domain2].map((domain, idx) => {
                                                const Icon = domain.icon;
                                                return (
                                                    <Link 
                                                        key={idx}
                                                        href={domain.href} 
                                                        className="flex-1 bg-white dark:bg-neutral-900 rounded-[2rem] p-6 group border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:border-neutral-200 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3", domain.bg, domain.color)}>
                                                                <Icon size={24} strokeWidth={1.5} />
                                                            </div>
                                                            <div className="w-8 h-8 rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                                                <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-6">
                                                            <h4 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors leading-tight">
                                                                {domain.name}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                    </motion.div>
                                );
                            })()}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
