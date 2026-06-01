"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    Hammer,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CAROUSEL_CATEGORIES = [
    {
        title: "Tech, Ingénierie & Bâtiment",
        description: "L'avant-garde technologique et les bâtisseurs de demain.",
        macroIcon: MonitorSmartphone,
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
        domains: [
            { name: "Agriculture", icon: Leaf, href: "/jobs?q=agriculture", color: "text-green-600", bg: "bg-green-600/10" },
            { name: "Artisanat & Manuels", icon: Wrench, href: "/jobs?q=metiers", color: "text-slate-600", bg: "bg-slate-600/10" },
            { name: "Services Proximité", icon: ShieldAlert, href: "/jobs?q=securite", color: "text-zinc-800", bg: "bg-zinc-800/10" }
        ]
    }
];

export function DomainCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: scrollContainerRef });
    
    // Animate the progress bar width based on scroll position
    const progressBarWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-neutral-950 py-24 sm:py-32 relative z-10 overflow-hidden">
            <div className="mx-auto max-w-[1400px]">
                
                {/* Header with Logo */}
                <div className="px-4 sm:px-6 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Image 
                                src="/images/Favicon.png" 
                                alt="Kussala Logo" 
                                width={48} 
                                height={48} 
                                className="w-10 h-10 object-contain drop-shadow-sm filter brightness-0 invert opacity-90"
                            />
                            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white tracking-tight leading-tight">
                                Explorez par domaine
                            </h2>
                        </div>
                        <p className="text-xl text-neutral-400 font-medium mt-4">
                            Glissez horizontalement pour découvrir tous nos secteurs.
                        </p>
                    </motion.div>

                    {/* Navigation Buttons (Desktop) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="hidden md:flex items-center gap-3"
                    >
                        <button 
                            onClick={scrollLeft}
                            className="w-14 h-14 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-white hover:text-black hover:border-white flex items-center justify-center text-neutral-400 transition-all duration-300"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={scrollRight}
                            className="w-14 h-14 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-white hover:text-black hover:border-white flex items-center justify-center text-neutral-400 transition-all duration-300"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </motion.div>
                </div>

                {/* Horizontal Scroll Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 sm:px-6 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                >
                    {CAROUSEL_CATEGORIES.map((category, idx) => {
                        const MacroIcon = category.macroIcon;
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "100px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="snap-center shrink-0 w-[85vw] sm:w-[420px] bg-neutral-900 rounded-[2.5rem] p-8 border border-neutral-800 flex flex-col group hover:border-primary-500/50 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.2)] transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <div className="flex items-start gap-5 mb-8 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-800 text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-primary-600 transition-all duration-500 shadow-sm">
                                        <MacroIcon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-neutral-400 mt-2 text-sm font-medium leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-4 mt-auto relative z-10">
                                    {category.domains.map((domain, dIdx) => {
                                        const DomainIcon = domain.icon;
                                        return (
                                            <Link 
                                                key={dIdx}
                                                href={domain.href}
                                                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950/50 hover:bg-white hover:shadow-sm border border-transparent hover:border-neutral-200 transition-all duration-300 group/link"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover/link:scale-110", domain.bg, domain.color)}>
                                                        <DomainIcon size={24} strokeWidth={1.5} />
                                                    </div>
                                                    <span className="font-bold text-neutral-300 group-hover/link:text-neutral-900 transition-colors">
                                                        {domain.name}
                                                    </span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-neutral-800 group-hover/link:bg-primary-50 flex items-center justify-center text-neutral-400 group-hover/link:text-primary-600 transition-colors">
                                                    <ArrowRight size={18} className="-rotate-45 group-hover/link:rotate-0 transition-transform duration-300" />
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="mx-4 sm:mx-6 lg:mx-12 h-1 bg-neutral-800 rounded-full overflow-hidden mt-4">
                    <motion.div 
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: progressBarWidth }}
                    />
                </div>
            </div>
            
            {/* Background Decorative Blurs */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary-600/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
