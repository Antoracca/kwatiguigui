"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Desktop, Buildings, Cpu, ChartLine, Megaphone, 
    Briefcase, Heartbeat, GraduationCap, Bank, 
    Storefront, Truck, ForkKnife, Plant, Wrench, 
    ShieldCheck, ArrowRight 
} from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FUSION_CATEGORIES = [
    {
        title: "Tech, Ingénierie & Bâtiment",
        domains: [
            { name: "Informatique & Logiciels", icon: Desktop, href: "/jobs?q=informatique" },
            { name: "Ingénierie & Architecture", icon: Cpu, href: "/jobs?q=ingenierie" },
            { name: "Bâtiment & Construction", icon: Buildings, href: "/jobs?q=construction" }
        ]
    },
    {
        title: "Administration & Tertiaire",
        domains: [
            { name: "Finance & Assurances", icon: ChartLine, href: "/jobs?q=finance" },
            { name: "Marketing & Com", icon: Megaphone, href: "/jobs?q=marketing" },
            { name: "RH & Gestion", icon: Briefcase, href: "/jobs?q=rh" }
        ]
    },
    {
        title: "Santé, Éducation & Public",
        domains: [
            { name: "Santé & Médical", icon: Heartbeat, href: "/jobs?q=sante" },
            { name: "Éducation & Recherche", icon: GraduationCap, href: "/jobs?q=education" },
            { name: "Secteur Public", icon: Bank, href: "/jobs?q=ong" }
        ]
    },
    {
        title: "Commerce & Logistique",
        domains: [
            { name: "Vente & Commerce", icon: Storefront, href: "/jobs?q=vente" },
            { name: "Transport & Logistique", icon: Truck, href: "/jobs?q=logistique" },
            { name: "Hôtellerie & Loisirs", icon: ForkKnife, href: "/jobs?q=hotellerie" }
        ]
    },
    {
        title: "Métiers Pratiques & Artisanat",
        domains: [
            { name: "Agriculture", icon: Plant, href: "/jobs?q=agriculture" },
            { name: "Artisanat & Manuels", icon: Wrench, href: "/jobs?q=metiers" },
            { name: "Services de Proximité", icon: ShieldCheck, href: "/jobs?q=securite" }
        ]
    }
];

export function DomainFusion() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-white py-24 sm:py-32 relative z-10 border-t border-neutral-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header with Logo */}
                <div className="mb-20 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <Image 
                                src="/images/Favicon.png" 
                                alt="Kussala Logo" 
                                width={48} 
                                height={48} 
                                className="w-10 h-10 object-contain drop-shadow-sm"
                            />
                            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-neutral-900 tracking-tight leading-none">
                                Explorez par domaine
                            </h2>
                        </div>
                    </div>
                </div>

                {/* PC Split Screen Vertical Accordion */}
                <div className="hidden lg:grid grid-cols-12 gap-16 min-h-[500px]">
                    
                    {/* Left Column: Vertical List (No Cards, just lines) */}
                    <div className="col-span-5 flex flex-col border-t border-neutral-200 mt-2">
                        {FUSION_CATEGORIES.map((cat, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <button 
                                    key={idx}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    className="group relative flex items-center justify-between py-8 border-b border-neutral-200 text-left outline-none"
                                >
                                    <h3 className={cn(
                                        "text-[1.75rem] font-medium tracking-tight transition-all duration-300",
                                        isActive ? "text-neutral-900 translate-x-3" : "text-neutral-400 group-hover:text-neutral-600"
                                    )}>
                                        {cat.title}
                                    </h3>
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeArrow" 
                                            className="text-primary-600"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            <ArrowRight size={28} weight="bold" />
                                        </motion.div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Column: Sliding Content Left-to-Right */}
                    <div className="col-span-7 relative">
                        <AnimatePresence mode="wait">
                            {(() => {
                                const activeCategory = FUSION_CATEGORIES[activeIndex];
                                if (!activeCategory) return null;

                                return (
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="grid grid-cols-2 gap-6 h-full content-start"
                                    >
                                        {activeCategory.domains.map((domain, dIdx) => (
                                            <Link 
                                                key={dIdx}
                                                href={domain.href}
                                                className={cn(
                                                    "group flex flex-col justify-between transition-all duration-500",
                                                    dIdx === 0 ? "col-span-2 border-b border-neutral-200 pb-12 min-h-[220px]" : "col-span-1 pt-8 min-h-[180px]",
                                                    dIdx === 1 && "border-r border-neutral-200 pr-8",
                                                    dIdx === 2 && "pl-8"
                                                )}
                                            >
                                                <div className="w-16 h-16 rounded-full bg-neutral-50 group-hover:bg-secondary-50 flex items-center justify-center text-neutral-900 group-hover:text-secondary-500 transition-all duration-500">
                                                    <domain.icon size={32} weight="duotone" />
                                                </div>
                                                <div className="mt-8 flex items-end justify-between">
                                                    <h4 className={cn(
                                                        "font-bold transition-colors duration-500 leading-tight pr-4",
                                                        dIdx === 0 ? "text-4xl" : "text-2xl",
                                                        "text-neutral-900 group-hover:text-secondary-500"
                                                    )}>
                                                        {domain.name}
                                                    </h4>
                                                    <div className="w-12 h-12 rounded-full bg-neutral-50 group-hover:bg-secondary-50 flex items-center justify-center shrink-0 transition-colors duration-500">
                                                        <ArrowRight size={20} className="text-neutral-400 group-hover:text-secondary-500 transform -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                );
                            })()}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile View: Vertical Accordion without cards */}
                <div className="lg:hidden flex flex-col border-t border-neutral-200">
                    {FUSION_CATEGORIES.map((cat, idx) => {
                        const isActive = activeIndex === idx;
                        return (
                            <div key={idx} className="border-b border-neutral-200">
                                <button 
                                    onClick={() => setActiveIndex(isActive ? -1 : idx)}
                                    className="w-full flex items-center justify-between py-6 text-left outline-none"
                                >
                                    <h3 className={cn(
                                        "text-xl font-bold transition-colors duration-300 tracking-tight",
                                        isActive ? "text-neutral-900" : "text-neutral-500"
                                    )}>
                                        {cat.title}
                                    </h3>
                                    <div className={cn(
                                        "text-neutral-400 transition-transform duration-300",
                                        isActive ? "rotate-90 text-primary-600" : ""
                                    )}>
                                        <ArrowRight size={20} weight="bold" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {cat.domains.map((domain, dIdx) => (
                                                    <Link 
                                                        key={dIdx}
                                                        href={domain.href}
                                                        className={cn(
                                                            "group flex items-center justify-between py-4 transition-colors duration-300",
                                                            dIdx !== cat.domains.length - 1 && "border-b border-neutral-100"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-neutral-50 group-hover:bg-secondary-50 flex items-center justify-center text-neutral-900 group-hover:text-secondary-500 transition-all duration-300">
                                                                <domain.icon size={24} weight="duotone" />
                                                            </div>
                                                            <h4 className="font-semibold text-neutral-900 group-hover:text-secondary-500 transition-colors">
                                                                {domain.name}
                                                            </h4>
                                                        </div>
                                                        <ArrowRight size={16} className="text-neutral-400 group-hover:text-secondary-500 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
