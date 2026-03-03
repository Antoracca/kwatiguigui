"use client";

import { useState } from "react";
import { Moon, TrendingUp, ScrollText, Users, ChevronRight } from "lucide-react";

import { AdviceHero } from "@/components/dashboard/advice/AdviceHero";
import { DailyTipCard } from "@/components/dashboard/advice/DailyTipCard";
import { AdviceCategoryTabs, CategoryTab } from "@/components/dashboard/advice/AdviceCategoryTabs";
import { ArticleCard, Article } from "@/components/dashboard/advice/ArticleCard";
import { VideoCard, VideoClass } from "@/components/dashboard/advice/VideoCard";
import { ToolsPromoSection } from "@/components/dashboard/advice/ToolsPromoSection";
import { CoachingBooking } from "@/components/dashboard/advice/CoachingBooking";
import { motion, AnimatePresence } from "framer-motion";

// ── Mock Data ─────────────────────────────────────────────────────────────

const CATEGORIES: CategoryTab[] = [
    { id: "all", label: "À la une", icon: <Moon size={16} /> },
    { id: "cv", label: "CV & Lettres", icon: <ScrollText size={16} /> },
    { id: "interview", label: "Entretiens", icon: <Users size={16} /> },
    { id: "market", label: "Marché & Salaires", icon: <TrendingUp size={16} /> },
];

const ARTICLES: Article[] = [
    {
        id: "a1",
        title: "Comment justifier un « trou » dans son CV sans mentir ?",
        excerpt: "Les périodes d'inactivité font peur, mais elles peuvent être présentées comme des opportunités d'apprentissage. Voici 3 techniques approuvées par les recruteurs.",
        category: "CV & Lettres",
        readTime: "4",
        views: "1.2k",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
        isNew: true,
    },
    {
        id: "a2",
        title: "Les 5 soft skills les plus recherchées en Centrafrique en 2024",
        excerpt: "Au-delà des diplômes, les employeurs locaux misent de plus en plus sur le savoir-être. Découvrez les compétences comportementales qui font la différence.",
        category: "Marché & Salaires",
        readTime: "6",
        views: "3.4k",
        imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
    },
    {
        id: "a3",
        title: "« Parlez-moi de vous » : la formule exacte pour réussir cette question",
        excerpt: "C'est souvent la première question de l'entretien. Ne racontez pas votre vie personnelle ; utilisez plutôt la méthode Présent-Passé-Futur.",
        category: "Entretiens",
        readTime: "5",
        views: "5.1k",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    },
    {
        id: "a4",
        title: "L'art de la lettre de motivation (sans faire un copier-coller de ChatGPT)",
        excerpt: "Comment utiliser l'IA pour vous aider sans perdre la touche humaine qui convaincra le manager que vous êtes le candidat idéal.",
        category: "CV & Lettres",
        readTime: "7",
        views: "850",
        imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80",
    },
    {
        id: "a5",
        title: "Comment relancer une entreprise après un entretien sans paraître lourd",
        excerpt: "Le suivi est souvent négligé. Apprenez à rédiger un email de remerciement et de relance qui renforce votre candidature.",
        category: "Entretiens",
        readTime: "3",
        views: "2.1k",
        imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
    },
    {
        id: "a6",
        title: "Les secteurs qui recrutent massivement à Bangui ce mois-ci",
        excerpt: "Une analyse détaillée des tendances de recrutement actuelles : tech, BTP, ONG et services administratifs en tête.",
        category: "Marché & Salaires",
        readTime: "5",
        views: "4.7k",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        isNew: true,
    },
];

const VIDEOS: VideoClass[] = [
    {
        id: "v1",
        title: "Masterclass : Négocier son premier salaire",
        speaker: "Marie-Claire K.",
        role: "DRH Senior",
        duration: "14:20",
        thumbnailUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    },
    {
        id: "v2",
        title: "Réussir les tests psychotechniques",
        speaker: "Jean-Paul Y.",
        role: "Consultant Recrutement",
        duration: "08:45",
        thumbnailUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    },
    {
        id: "v3",
        title: "Atelier CV : les erreurs éliminatoires",
        speaker: "Sarah T.",
        role: "Coach Carrière",
        duration: "22:15",
        thumbnailUrl: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=800&q=80",
    },
    {
        id: "v4",
        title: "Comment construire son réseau professionnel de zéro",
        speaker: "Michel D.",
        role: "Expert LinkedIn",
        duration: "18:30",
        thumbnailUrl: "https://images.unsplash.com/photo-1521737604893-[…]", // Corrected partial URL for valid test if needed, let's use a safe one
    },
];

// Fix broken image URL for v4 just in case
if (VIDEOS[3]) {
    VIDEOS[3].thumbnailUrl = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80";
}

// ── Component ─────────────────────────────────────────────────────────────

export default function AdvicePage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredArticles = activeCategory === "all"
        ? ARTICLES
        : ARTICLES.filter((a) => {
            // Simple mapping just for the mock data filtering
            if (activeCategory === "cv") return a.category === "CV & Lettres";
            if (activeCategory === "interview") return a.category === "Entretiens";
            if (activeCategory === "market") return a.category === "Marché & Salaires";
            return true;
        });

    return (
        <div className="space-y-10 pb-16">

            {/* ── 1. Hero Section ── */}
            <AdviceHero />

            {/* ── 2. Tip of the Day & Outils ── */}
            <div className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <DailyTipCard />
                </div>
                <CoachingBooking />
            </div>

            {/* ── 3. Articles & Guides ── */}
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        Articles & Guides Pratiques
                    </h2>
                    <AdviceCategoryTabs
                        tabs={CATEGORIES}
                        activeTab={activeCategory}
                        onChange={setActiveCategory}
                    />
                </div>

                <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredArticles.map((article) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                                key={article.id}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredArticles.length === 0 && (
                    <div className="py-12 text-center text-neutral-500">
                        Aucun article trouvé pour cette catégorie.
                    </div>
                )}
            </div>

            {/* ── 4. Video Masterclasses (Horizontal Scroll) ── */}
            <div className="pt-8 pb-10">
                <div className="px-2 mb-6 flex items-end justify-between">
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                            Masterclasses & Vidéos
                        </h2>
                        <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Apprenez en regardant nos experts en action.
                        </p>
                    </div>
                    <button className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                        Tout voir <ChevronRight size={14} />
                    </button>
                </div>

                {/* Scrollable Container */}
                <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide">
                    {VIDEOS.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>

            {/* ── 5. Tools Promo ── */}
            <ToolsPromoSection />

        </div>
    );
}
