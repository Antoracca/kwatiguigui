"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronDown, 
    ArrowRight, 
    Laptop, 
    Building2, 
    BriefcaseBusiness, 
    LineChart, 
    Megaphone, 
    Users, 
    HeartPulse, 
    GraduationCap, 
    Landmark, 
    Store, 
    Truck, 
    UtensilsCrossed, 
    Leaf, 
    Wrench, 
    ShieldAlert,
    Code,
    Cpu,
    BadgePercent
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
                desc: "Développement web, Data, et solutions IT.",
                icon: Laptop,
                href: "/jobs?q=informatique"
            },
            {
                name: "Ingénierie & Architecture",
                desc: "Génie civil, conception et technologie.",
                icon: Cpu,
                href: "/jobs?q=ingenierie"
            },
            {
                name: "Bâtiment & Construction",
                desc: "Maçonnerie, BTP, et infrastructures.",
                icon: Building2,
                href: "/jobs?q=construction"
            }
        ]
    },
    {
        title: "Administration & Services Tertiaires",
        description: "Les fonctions clés qui structurent et propulsent les entreprises.",
        domains: [
            {
                name: "Finance & Assurances",
                desc: "Banque, comptabilité et audit.",
                icon: LineChart,
                href: "/jobs?q=finance"
            },
            {
                name: "Marketing & Communication",
                desc: "Stratégie digitale, médias et publicité.",
                icon: Megaphone,
                href: "/jobs?q=marketing"
            },
            {
                name: "RH & Gestion d'Entreprise",
                desc: "Recrutement, secrétariat et gestion.",
                icon: BriefcaseBusiness,
                href: "/jobs?q=rh"
            }
        ]
    },
    {
        title: "Santé, Éducation & Secteur Public",
        description: "Ceux qui soignent, instruisent et accompagnent la société.",
        domains: [
            {
                name: "Santé & Secteur Médical",
                desc: "Soins cliniques, infirmerie et pharmacie.",
                icon: HeartPulse,
                href: "/jobs?q=sante"
            },
            {
                name: "Éducation & Recherche",
                desc: "Enseignement académique et formation.",
                icon: GraduationCap,
                href: "/jobs?q=education"
            },
            {
                name: "ONG & Secteur Public",
                desc: "Gouvernement, humanitaire et associations.",
                icon: Landmark,
                href: "/jobs?q=ong"
            }
        ]
    },
    {
        title: "Commerce, Logistique & Services",
        description: "L'économie réelle en mouvement, du commerce à la livraison.",
        domains: [
            {
                name: "Vente & Commerce",
                desc: "Commerce de détail, gros et immobilier.",
                icon: Store,
                href: "/jobs?q=vente"
            },
            {
                name: "Transport & Logistique",
                desc: "Chaînes d'approvisionnement et fret.",
                icon: Truck,
                href: "/jobs?q=logistique"
            },
            {
                name: "Hôtellerie & Restauration",
                desc: "Tourisme, loisirs et services d'accueil.",
                icon: UtensilsCrossed,
                href: "/jobs?q=hotellerie"
            }
        ]
    },
    {
        title: "Métiers Pratiques & Artisanat",
        description: "Le savoir-faire de terrain et l'artisanat essentiel.",
        domains: [
            {
                name: "Agriculture & Foresterie",
                desc: "Exploitation agricole, élevage et pêche.",
                icon: Leaf,
                href: "/jobs?q=agriculture"
            },
            {
                name: "Artisanat & Métiers Manuels",
                desc: "Menuiserie, couture, plomberie et mécanique.",
                icon: Wrench,
                href: "/jobs?q=metiers"
            },
            {
                name: "Services de Proximité",
                desc: "Aide à domicile, nettoyage et sécurité.",
                icon: ShieldAlert,
                href: "/jobs?q=securite"
            }
        ]
    }
];

export function DomainAccordion() {
    // Open the first item by default
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-white py-24 sm:py-32 relative z-10 border-t border-neutral-100">
            <motion.div
                className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Header Section */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image 
                                src="/images/Favicon.png" 
                                alt="Kussala" 
                                width={48} 
                                height={48} 
                                className="w-10 h-10 object-contain drop-shadow-sm"
                            />
                            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-900 tracking-tight leading-tight">
                                Explorez par domaine
                            </h2>
                        </div>
                        <p className="text-xl text-neutral-500 font-medium">
                            Découvrez des opportunités classées par macro-secteurs. Du digital à l'artisanat, chaque talent a sa place.
                        </p>
                    </div>
                </div>

                {/* Vertical Accordion */}
                <div className="flex flex-col gap-4">
                    {DOMAIN_CATEGORIES.map((category, index) => {
                        const isOpen = openIndex === index;
                        
                        return (
                            <motion.div 
                                key={index} 
                                initial={false}
                                animate={{ 
                                    backgroundColor: isOpen ? "rgba(255, 255, 255, 1)" : "rgba(250, 250, 250, 1)",
                                    borderColor: isOpen ? "rgba(37, 99, 235, 0.2)" : "rgba(229, 231, 235, 1)",
                                    boxShadow: isOpen ? "0 10px 40px -10px rgba(0,0,0,0.08)" : "0 2px 10px -4px rgba(0,0,0,0.02)"
                                }}
                                className={cn(
                                    "border rounded-[2rem] overflow-hidden transition-all duration-300",
                                    isOpen ? "z-10 relative" : ""
                                )}
                            >
                                {/* Accordion Trigger */}
                                <button 
                                    onClick={() => setOpenIndex(isOpen ? null : index)} 
                                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left outline-none group"
                                >
                                    <div>
                                        <h3 className={cn(
                                            "text-2xl font-bold transition-colors duration-300",
                                            isOpen ? "text-primary-600" : "text-neutral-900 group-hover:text-primary-500"
                                        )}>
                                            {category.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm sm:text-base font-medium mt-1">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4",
                                        isOpen ? "bg-primary-100 text-primary-600 rotate-180" : "bg-neutral-100 text-neutral-400 group-hover:bg-primary-50 group-hover:text-primary-500"
                                    )}>
                                        <ChevronDown size={24} strokeWidth={2.5} />
                                    </div>
                                </button>

                                {/* Accordion Content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }} 
                                            animate={{ height: 'auto', opacity: 1 }} 
                                            exit={{ height: 0, opacity: 0 }} 
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-t border-neutral-100/50 mt-2">
                                                {category.domains.map((domain, dIdx) => {
                                                    const Icon = domain.icon;
                                                    return (
                                                        <Link 
                                                            key={dIdx} 
                                                            href={domain.href}
                                                            className="group flex flex-col gap-4 p-5 rounded-2xl border border-transparent bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-300 hover:shadow-sm"
                                                        >
                                                            {/* Premium Icon Container */}
                                                            <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center text-neutral-700 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-800 group-hover:scale-110 group-hover:-rotate-3">
                                                                <Icon size={26} strokeWidth={1.5} />
                                                            </div>
                                                            
                                                            <div>
                                                                <h4 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                                                    {domain.name}
                                                                </h4>
                                                                <p className="text-sm font-medium text-neutral-500 mt-2 leading-relaxed">
                                                                    {domain.desc}
                                                                </p>
                                                            </div>

                                                            <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-bold text-primary-600 opacity-80 group-hover:opacity-100 transition-opacity">
                                                                Consulter ce domaine 
                                                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
