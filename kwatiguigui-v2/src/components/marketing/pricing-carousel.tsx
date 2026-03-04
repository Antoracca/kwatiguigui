"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingPlan {
    id: string;
    name: string;
    target: string;
    price: string | number;
    suffix?: string;
    freeBadge?: string;
    popularBadge?: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    gradient?: string;
    border?: string;
    buttonClass?: string;
}

const PLANS: PricingPlan[] = [
    {
        id: "plan0",
        name: "Découverte",
        target: "L'essentiel pour démarrer",
        price: "0",
        features: [
            "Création de profil basique",
            "Postulation illimitée",
            "Alertes emplois standards",
            "Support par email",
        ],
        ctaText: "Commencer gratuitement",
        ctaLink: "/register",
        freeBadge: "Gratuit à vie"
    },
    {
        id: "standard",
        name: "Standard",
        target: "Pour particuliers premium",
        price: "2 500",
        suffix: "/ mois",
        popularBadge: "Recommandé",
        gradient: "from-white to-primary-50/30 dark:from-neutral-950 dark:to-primary-950/20",
        border: "border-primary-200 dark:border-primary-900/50",
        features: [
            "Mise en avant du profil",
            "Accès prioritaire aux offres",
            "Outil CV optimisé IA",
            "Statut \"Profil Vérifié\"",
        ],
        ctaText: "Choisir Standard",
        ctaLink: "/register",
        buttonClass: "bg-primary-100 hover:bg-primary-200 text-primary-900 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 dark:text-primary-100",
        freeBadge: "3 mois gratuits"
    },
    {
        id: "independant",
        name: "Indépendant",
        target: "Freelancers et experts",
        price: "5 000",
        suffix: "/ mois",
        features: [
            "Portfolio illimité interactif",
            "Badge Spécialiste premium",
            "Réception ciblée de clients",
            "Mise en relation directe",
            "Support WhatsApp prioritaire"
        ],
        ctaText: "Choisir Indépendant",
        ctaLink: "/register",
        freeBadge: "3 mois gratuits"
    },
    {
        id: "pro",
        name: "Pro",
        target: "Pour PME et agences",
        price: "7 500",
        suffix: "/ mois",
        features: [
            "Publications illimitées",
            "Gestion des candidatures (ATS)",
            "Accès restreint Base CV",
            "Marque employeur basique",
        ],
        ctaText: "Choisir Pro",
        ctaLink: "/register?type=employer",
        freeBadge: "3 mois gratuits"
    },
    {
        id: "enterprise",
        name: "Enterprise",
        target: "Grandes entreprises",
        price: "Sur Devis",
        features: [
            "Publications sur-mesure",
            "Outils ATS complets",
            "Accès illimité Base CV",
            "Intégration API & SSO",
        ],
        ctaText: "Contactez-nous",
        ctaLink: "https://wa.me/23675000000", // Will be overridden in parent if needed
        freeBadge: "Accompagnement VIP",
        buttonClass: "border-2 border-neutral-200 bg-transparent text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
    }
];

export function PricingCarousel({ whatsapp }: { whatsapp: string }) {
    const [activeIndex, setActiveIndex] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isCompact, setIsCompact] = useState(false);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const next = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % PLANS.length);
    }, []);

    const prev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + PLANS.length) % PLANS.length);
    }, []);

    useEffect(() => {
        const syncCompactMode = () => {
            setIsCompact(window.innerWidth < 768);
        };

        syncCompactMode();
        window.addEventListener("resize", syncCompactMode, { passive: true });
        return () => window.removeEventListener("resize", syncCompactMode);
    }, []);

    useEffect(() => {
        if (isCompact) {
            setIsAutoPlaying(false);
        }
    }, [isCompact]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 4200);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, []);

    const handleInteraction = (direction: "next" | "prev" | number) => {
        setIsAutoPlaying(false);

        if (direction === "next") next();
        else if (direction === "prev") prev();
        else setActiveIndex(direction);

        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }

        if (!isCompact) {
            resumeTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 7000);
        }
    };

    const plansToRender = PLANS.map((p) =>
        p.id === "enterprise" ? { ...p, ctaLink: `https://wa.me/${whatsapp}` } : p
    );

    return (
        <div className="relative z-20 mx-auto flex h-[560px] xs:h-[590px] sm:h-[650px] md:h-[600px] w-full max-w-7xl items-center justify-center overflow-hidden pt-6 sm:pt-8 touch-pan-y">
            {plansToRender.map((plan, index) => {
                const offset = (index - activeIndex + plansToRender.length * 2) % plansToRender.length;
                const normalizedOffset = offset > 2 ? offset - plansToRender.length : offset;
                const isCenter = normalizedOffset === 0;
                const isFarOnCompact = isCompact && Math.abs(normalizedOffset) > 1;

                const xPos = isCompact ? normalizedOffset * 136 : normalizedOffset * 240;
                const zIndex = 50 - Math.abs(normalizedOffset) * 10;
                const scale = isCompact ? 1 - Math.abs(normalizedOffset) * 0.1 : 1 - Math.abs(normalizedOffset) * 0.15;
                const opacity = isFarOnCompact
                    ? 0
                    : isCompact
                        ? 1 - Math.abs(normalizedOffset) * 0.42
                        : 1 - Math.abs(normalizedOffset) * 0.3;
                const blur = isCompact ? 0 : Math.abs(normalizedOffset) * 4;

                return (
                    <motion.div
                        key={plan.id}
                        onClick={() => handleInteraction(index)}
                        initial={false}
                        animate={{
                            x: xPos,
                            scale,
                            opacity,
                            zIndex,
                            filter: `blur(${isCenter ? 0 : blur}px)`,
                        }}
                        transition={{
                            duration: isCompact ? 0.42 : 0.6,
                            ease: [0.32, 0.72, 0, 1],
                        }}
                        className={`absolute w-full max-w-[84vw] xs:max-w-[320px] sm:max-w-[340px] md:max-w-[380px] p-5 sm:p-8 xl:p-10 rounded-3xl border ${plan.border || "border-neutral-200 dark:border-neutral-800"} ${plan.gradient || "bg-white/90 dark:bg-neutral-950/90"} backdrop-blur-md flex flex-col shadow-2xl ${isCenter ? "shadow-neutral-400/30 border-2 border-primary-500 scale-100" : "shadow-none cursor-pointer"} ${isFarOnCompact ? "pointer-events-none" : ""} transition-all will-change-transform`}
                        style={{ perspective: 1000 }}
                    >
                        {!isCenter && (
                            <div className="absolute inset-0 bg-white/20 dark:bg-black/30 rounded-3xl z-50 transition-opacity" />
                        )}

                        {plan.popularBadge && isCenter && (
                            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-500/30 flex items-center gap-1.5 sm:gap-2">
                                <Star size={12} className="fill-white" /> {plan.popularBadge}
                            </div>
                        )}

                        <div>
                            <h3 className={`font-heading text-xl sm:text-2xl font-black uppercase tracking-wider ${isCenter && plan.id === "standard" ? "text-primary-600 dark:text-primary-400" : "text-neutral-900 dark:text-white"}`}>
                                {plan.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 sm:mt-2 font-medium">{plan.target}</p>
                            <div className="mt-6 sm:mt-8 flex items-baseline gap-1">
                                <span className={`font-heading text-4xl sm:text-5xl font-black ${isCenter ? "text-neutral-900 dark:text-white" : "text-neutral-800 dark:text-neutral-200"}`}>
                                    {plan.price}
                                </span>
                                {plan.price !== "Sur Devis" && (
                                    <div className="flex flex-col">
                                        <span className="text-sm sm:text-base font-bold text-neutral-400">FCFA</span>
                                        {plan.suffix && <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{plan.suffix}</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {plan.freeBadge && (
                            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 relative z-10">
                                <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm border border-primary-200/50 dark:border-primary-800/50">
                                    <Gift size={14} className="text-primary-500 sm:h-4 sm:w-4" />
                                    {plan.freeBadge}
                                </span>
                            </div>
                        )}

                        <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 flex-1 relative z-10">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
                                    <CheckCircle2 size={isCompact ? 18 : 20} className={`mt-0.5 shrink-0 ${isCenter ? "text-primary-500" : "text-neutral-400"}`} />
                                    <span className="text-neutral-700 dark:text-neutral-300 font-medium leading-tight">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-6 sm:pt-8 flex flex-col gap-3 relative z-10">
                            <Button
                                asChild
                                className={`w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold transition-all text-xs sm:text-base ${plan.buttonClass || "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"}`}
                            >
                                <Link href={plan.ctaLink} className="px-2 text-center whitespace-normal leading-tight">{plan.ctaText}</Link>
                            </Button>
                            {plan.id === "plan0" && (
                                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-500 text-center font-bold">100% sans carte de crédit</p>
                            )}
                        </div>
                    </motion.div>
                );
            })}

            <button
                onClick={() => handleInteraction("prev")}
                aria-label="Plan précédent"
                className="absolute left-1.5 sm:left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/85 dark:bg-neutral-900/85 shadow-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 md:hover:scale-110 transition-all backdrop-blur-md"
            >
                <ChevronLeft size={isCompact ? 18 : 24} />
            </button>
            <button
                onClick={() => handleInteraction("next")}
                aria-label="Plan suivant"
                className="absolute right-1.5 sm:right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/85 dark:bg-neutral-900/85 shadow-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 md:hover:scale-110 transition-all backdrop-blur-md"
            >
                <ChevronRight size={isCompact ? 18 : 24} />
            </button>

            <div className="absolute bottom-2 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 sm:hidden">
                {plansToRender.map((plan, index) => (
                    <button
                        key={plan.id}
                        type="button"
                        onClick={() => handleInteraction(index)}
                        className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-5 bg-primary-600" : "w-2 bg-neutral-300 dark:bg-neutral-700"}`}
                        aria-label={`Afficher le plan ${plan.name}`}
                    />
                ))}
            </div>
        </div>
    );
}
