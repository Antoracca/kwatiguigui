"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    FileText,
    Briefcase,
    BellRing,
    BookOpen,
    MessageSquare,
    Crown,
    GraduationCap,
    ArrowRight,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ROADMAP_STEPS = [
    {
        id: "profile",
        title: "Mon CV & Profil",
        description: "Mettez en valeur votre parcours, vos compétences et vos expériences pour attirer les meilleurs recruteurs de la RCA.",
        icon: User,
        color: "from-blue-500 to-indigo-600",
        bgLight: "bg-blue-50 dark:bg-blue-950/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        href: "/dashboard/profile",
        action: "Mettre à jour mon profil"
    },
    {
        id: "applications",
        title: "Mes candidatures",
        description: "Suivez l'état d'avancement de toutes vos requêtes. Voyez qui a consulté votre profil et qui souhaite vous rencontrer.",
        icon: Briefcase,
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        href: "/dashboard/applications",
        action: "Suivre mes candidatures"
    },
    {
        id: "cv-builder",
        title: "Créateur de CV Pro",
        description: "Utilisez notre outil intelligent pour générer un CV au format professionnel, prêt à être téléchargé ou envoyé.",
        icon: FileText,
        color: "from-purple-500 to-fuchsia-600",
        bgLight: "bg-purple-50 dark:bg-purple-950/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        href: "/dashboard/cv-builder",
        action: "Créer mon CV"
    },
    {
        id: "alerts",
        title: "Alertes emploi",
        description: "Ne manquez aucune opportunité. Configurez des alertes personnalisées pour recevoir les offres qui vous correspondent.",
        icon: BellRing,
        color: "from-amber-500 to-orange-600",
        bgLight: "bg-amber-50 dark:bg-amber-950/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        href: "/dashboard/alerts",
        action: "Gérer mes alertes"
    },
    {
        id: "student",
        title: "Stages & Alternance",
        description: "Un espace dédié aux étudiants pour trouver leur première expérience professionnelle ou un contrat d'apprentissage.",
        icon: GraduationCap,
        color: "from-rose-500 to-pink-600",
        bgLight: "bg-rose-50 dark:bg-rose-950/30",
        iconColor: "text-rose-600 dark:text-rose-400",
        href: "/dashboard/student",
        action: "Découvrir les stages"
    },
    {
        id: "advice",
        title: "Conseils Carrière",
        description: "Des astuces, des guides et des masterclasses pour réussir vos entretiens et négocier votre salaire.",
        icon: BookOpen,
        color: "from-cyan-500 to-sky-600",
        bgLight: "bg-cyan-50 dark:bg-cyan-950/30",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        href: "/dashboard/advice",
        action: "Parcourir les conseils"
    },
    {
        id: "messages",
        title: "Messagerie",
        description: "Échangez directement avec les recruteurs et les entreprises intéressées par votre profil.",
        icon: MessageSquare,
        color: "from-slate-500 to-gray-600",
        bgLight: "bg-slate-50 dark:bg-slate-900/50",
        iconColor: "text-slate-600 dark:text-slate-400",
        href: "/dashboard/messages",
        action: "Ouvrir la messagerie"
    },
    {
        id: "vip",
        title: "Abonnement VIP",
        description: "Démarquez-vous de la concurrence. Mise en avant de votre profil, contact direct WhatsApp et plus encore.",
        icon: Crown,
        color: "from-amber-400 to-yellow-600",
        bgLight: "bg-amber-50/80 dark:bg-amber-950/40",
        iconColor: "text-amber-500 dark:text-amber-400",
        href: "/dashboard/payment",
        action: "Devenir VIP"
    }
];

const AUTO_PLAY_DELAY = 5000; // 5 seconds per slide

export function DynamicRoadmap() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-play logic
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ROADMAP_STEPS.length);
        }, AUTO_PLAY_DELAY);

        return () => clearInterval(timer);
    }, [isPaused]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % ROADMAP_STEPS.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + ROADMAP_STEPS.length) % ROADMAP_STEPS.length);
    };

    const activeStep = ROADMAP_STEPS[currentIndex];

    if (!activeStep) return null;

    const Icon = activeStep.icon;

    return (
        <div
            className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Votre Feuille de Route
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Découvrez toutes les fonctionnalités de votre espace
                    </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={goToPrev}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-white"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-white"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="relative min-h-[160px] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                    >
                        {/* Animated Icon Box */}
                        <div className={cn(
                            "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/50 shadow-sm transition-colors",
                            activeStep.bgLight
                        )}>
                            <Icon size={32} className={activeStep.iconColor} strokeWidth={1.5} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="mb-2 font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                {activeStep.title}
                                {activeStep.id === "vip" && (
                                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] uppercase font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                                        Pro
                                    </span>
                                )}
                            </h3>
                            <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl">
                                {activeStep.description}
                            </p>
                            <Button asChild variant="outline" size="sm" className="group rounded-xl border-neutral-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-neutral-700 dark:hover:border-primary-800 dark:hover:bg-primary-950/50 dark:hover:text-primary-400 transition-all font-semibold">
                                <Link href={activeStep.href}>
                                    {activeStep.action}
                                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="mt-6 flex justify-center gap-2">
                {ROADMAP_STEPS.map((step, idx) => (
                    <button
                        key={step.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            idx === currentIndex
                                ? `w-8 bg-gradient-to-r ${step.color}`
                                : "w-1.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                        )}
                        aria-label={`Aller à l'étape ${step.title}`}
                    />
                ))}
            </div>
        </div>
    );
}
