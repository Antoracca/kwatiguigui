"use client";

import { motion } from "framer-motion";
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
    Cpu,
    MonitorSmartphone,
    Landmark as AdminIcon,
    Stethoscope,
    ShoppingCart,
    Hammer
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Données avec une icône globale pour le Macro-Domaine
const BENTO_CATEGORIES = [
    {
        title: "Tech, Ingénierie & Bâtiment",
        description: "L'avant-garde technologique et les bâtisseurs de demain.",
        macroIcon: MonitorSmartphone,
        colSpan: "lg:col-span-2",
        domains: [
            { name: "Informatique & Logiciels", icon: Laptop, href: "/jobs?q=informatique", color: "text-blue-600", bg: "bg-blue-600/10" },
            { name: "Ingénierie & Architecture", icon: Cpu, href: "/jobs?q=ingenierie", color: "text-indigo-600", bg: "bg-indigo-600/10" },
            { name: "Bâtiment & Construction", icon: Building2, href: "/jobs?q=construction", color: "text-sky-600", bg: "bg-sky-600/10" }
        ]
    },
    {
        title: "Administration & Tertiaire",
        description: "Les fonctions qui structurent les entreprises.",
        macroIcon: AdminIcon,
        colSpan: "lg:col-span-1",
        domains: [
            { name: "Finance & Assurances", icon: LineChart, href: "/jobs?q=finance", color: "text-emerald-600", bg: "bg-emerald-600/10" },
            { name: "Marketing & Com", icon: Megaphone, href: "/jobs?q=marketing", color: "text-rose-600", bg: "bg-rose-600/10" },
            { name: "RH & Gestion", icon: BriefcaseBusiness, href: "/jobs?q=rh", color: "text-purple-600", bg: "bg-purple-600/10" }
        ]
    },
    {
        title: "Santé, Éducation & Public",
        description: "Ceux qui soignent, instruisent et accompagnent.",
        macroIcon: Stethoscope,
        colSpan: "lg:col-span-1",
        domains: [
            { name: "Santé & Médical", icon: HeartPulse, href: "/jobs?q=sante", color: "text-red-500", bg: "bg-red-500/10" },
            { name: "Éducation", icon: GraduationCap, href: "/jobs?q=education", color: "text-amber-600", bg: "bg-amber-600/10" },
            { name: "Secteur Public", icon: Landmark, href: "/jobs?q=ong", color: "text-teal-600", bg: "bg-teal-600/10" }
        ]
    },
    {
        title: "Commerce & Logistique",
        description: "L'économie réelle en mouvement, du commerce au fret.",
        macroIcon: ShoppingCart,
        colSpan: "lg:col-span-1",
        domains: [
            { name: "Vente & Commerce", icon: Store, href: "/jobs?q=vente", color: "text-orange-500", bg: "bg-orange-500/10" },
            { name: "Transport & Logistique", icon: Truck, href: "/jobs?q=logistique", color: "text-cyan-600", bg: "bg-cyan-600/10" },
            { name: "Hôtellerie & Loisirs", icon: UtensilsCrossed, href: "/jobs?q=hotellerie", color: "text-yellow-600", bg: "bg-yellow-600/10" }
        ]
    },
    {
        title: "Métiers Pratiques & Artisanat",
        description: "Le savoir-faire de terrain et l'artisanat essentiel.",
        macroIcon: Hammer,
        colSpan: "lg:col-span-1",
        domains: [
            { name: "Agriculture", icon: Leaf, href: "/jobs?q=agriculture", color: "text-green-600", bg: "bg-green-600/10" },
            { name: "Artisanat & Manuels", icon: Wrench, href: "/jobs?q=metiers", color: "text-slate-600", bg: "bg-slate-600/10" },
            { name: "Services Proximité", icon: ShieldAlert, href: "/jobs?q=securite", color: "text-zinc-800", bg: "bg-zinc-800/10" }
        ]
    }
];

export function DomainBento() {
    return (
        <section className="bg-neutral-50/30 py-24 sm:py-32 relative z-10 border-t border-neutral-100 dark:bg-neutral-950 dark:border-neutral-900 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
                
                {/* Header with Logo */}
                <motion.div 
                    className="mb-16 flex flex-col items-center text-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 justify-center bg-white dark:bg-neutral-900 px-6 py-3 rounded-full border border-neutral-100 dark:border-neutral-800 shadow-sm mb-4">
                        <Image 
                            src="/images/Favicon.png" 
                            alt="Kussala Logo" 
                            width={32} 
                            height={32} 
                            className="w-8 h-8 object-contain"
                        />
                        <span className="font-bold text-neutral-900 dark:text-white tracking-wide uppercase text-sm">
                            Kussala Secteurs
                        </span>
                    </div>
                    <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-none">
                        Explorez par domaine
                    </h2>
                    <p className="max-w-2xl text-xl text-neutral-500 font-medium dark:text-neutral-400 mt-4">
                        Découvrez notre classification en mosaïque. Survolez chaque univers pour révéler ses spécialités.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BENTO_CATEGORIES.map((category, idx) => {
                        const MacroIcon = category.macroIcon;
                        const isWide = category.colSpan === "lg:col-span-2";
                        
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={cn(
                                    "group relative bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] hover:border-primary-200 dark:hover:border-primary-900/50 flex flex-col",
                                    category.colSpan
                                )}
                            >
                                {/* Glowing ambient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Card Header (Macro Domain) */}
                                <div className="p-8 pb-6 relative z-10 flex flex-col flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm">
                                        <MacroIcon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 mt-3 text-base leading-relaxed font-medium">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800 relative z-10" />

                                {/* Sub-domains List (Reveals & Highlights on hover) */}
                                <div className={cn(
                                    "p-6 relative z-10 bg-neutral-50/50 dark:bg-neutral-950/50 group-hover:bg-transparent transition-colors duration-500",
                                    isWide ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "flex flex-col gap-3"
                                )}>
                                    {category.domains.map((domain, dIdx) => {
                                        const DomainIcon = domain.icon;
                                        return (
                                            <Link 
                                                key={dIdx}
                                                href={domain.href}
                                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-neutral-900 hover:shadow-sm border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-all duration-300 group/link"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover/link:scale-110", domain.bg, domain.color)}>
                                                        <DomainIcon size={20} strokeWidth={2} />
                                                    </div>
                                                    <span className="font-semibold text-neutral-700 dark:text-neutral-300 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 text-sm">
                                                        {domain.name}
                                                    </span>
                                                </div>
                                                <ArrowRight size={16} className="text-neutral-300 dark:text-neutral-700 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 -translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            {/* Background Decorative Blurs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
