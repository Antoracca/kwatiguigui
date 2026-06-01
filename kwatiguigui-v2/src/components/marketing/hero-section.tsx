"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RcaMapBg } from "@/components/ui/rca-map-bg";
import { HeroGlobe } from "@/components/marketing/hero-globe";

export function HeroSection() {
    const [titleNumber, setTitleNumber] = useState(0);
    const pairs = useMemo(
        () => [
            { left: "talents", right: "entreprises" },
            { left: "indépendants", right: "agences" },
            { left: "prestataires", right: "PME" },
            { left: "candidats", right: "recruteurs" },
            { left: "experts", right: "porteurs de projets" },
            { left: "freelances", right: "clients" },
            { left: "compétences", right: "opportunités" },
        ],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === pairs.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, pairs]);

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: Copywriting & CTAs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left relative">
                {/* RCA Map Background Watermark */}
                <div className="absolute top-[40%] left-[45%] w-[130%] sm:w-[110%] -translate-x-1/2 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.05] pointer-events-none -z-10 text-primary-900 dark:text-primary-100 drop-shadow-sm">
                    <RcaMapBg />
                </div>

                {/* Massive Animated H1 Typography */}
                <motion.h1
                    variants={itemVariants}
                    className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-neutral-900 dark:text-white break-words mt-4"
                >
                    <span className="block mb-2 sm:mb-4">La plateforme qui connecte</span>
                    <span className="relative flex w-full justify-start overflow-hidden pb-4 pt-1">
                        {/* Invisible spacer to reserve height and width for the longest wrapped string */}
                        <span className="opacity-0 pointer-events-none select-none flex flex-wrap gap-x-[0.3em]">
                            <span className="font-semibold">experts</span>
                            <span className="font-extrabold text-neutral-300">et</span>
                            <span className="font-semibold">porteurs de projets</span>
                        </span>
                        {pairs.map((pair, index) => (
                            <motion.span
                                key={index}
                                className="absolute left-0 flex flex-wrap gap-x-[0.3em] w-full"
                                initial={{ opacity: 0, y: index % 2 === 0 ? "150%" : "-150%" }}
                                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                animate={
                                    titleNumber === index
                                        ? { y: 0, opacity: 1 }
                                        : { 
                                            y: titleNumber > index 
                                                ? (index % 2 === 0 ? "-150%" : "150%") 
                                                : (index % 2 === 0 ? "150%" : "-150%"), 
                                            opacity: 0 
                                          }
                                }
                            >
                                <span className="font-semibold text-primary-600 dark:text-primary-400">{pair.left}</span>
                                <span className="font-extrabold text-neutral-300 dark:text-neutral-700">et</span>
                                <span className="font-semibold text-secondary-500 dark:text-secondary-400">{pair.right}</span>
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mt-6 max-w-xl text-[clamp(1.125rem,2vw,1.25rem)] leading-relaxed text-neutral-500 dark:text-neutral-400 font-medium"
                >
                    Emplois, Stages, Prestations. Rejoignez nos membres fondateurs et participez à la structuration du grand réseau professionnel de la République Centrafricaine.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:flex-wrap w-full">
                    <Link href="/register?type=employer" className="w-full sm:w-auto">
                        <Button
                            size="xl"
                            className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white text-base font-bold transition-all shadow-lg shadow-primary-600/20 group relative overflow-hidden"
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
                            Publier une annonce
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
                        </Button>
                    </Link>
                    <Link href="#comment-ca-marche" className="w-full sm:w-auto">
                        <Button
                            size="xl"
                            variant="outline"
                            className="w-full sm:w-auto h-14 px-8 rounded-xl border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 text-base font-bold transition-all group shadow-sm hover:border-primary-200 dark:hover:border-primary-800"
                        >
                            <Play className="mr-2 w-5 h-5 fill-neutral-400 group-hover:fill-primary-500 transition-colors" />
                            Découvrez comment ça fonctionne
                        </Button>
                    </Link>
                </motion.div>
            </div>
            
            {/* RIGHT COLUMN: Globe 3D */}
            <motion.div
                variants={itemVariants}
                className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-full lg:mt-0 mt-8"
            >
                <HeroGlobe />
            </motion.div>
        </div>
    );
}
