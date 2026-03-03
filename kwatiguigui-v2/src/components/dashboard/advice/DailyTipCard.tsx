"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lightbulb, ThumbsUp, BookmarkPlus, BookmarkCheck, ArrowRight, Share2 } from "lucide-react";

export function DailyTipCard() {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        setIsSaved(!isSaved);
        if (!isSaved) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50/50 p-6 shadow-sm transition-all hover:shadow-md dark:border-amber-900/30 dark:from-amber-950/20 dark:via-neutral-900 dark:to-orange-950/10 sm:p-8">

            {/* Decorative background blur */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-600/10" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">

                {/* Icon & Label */}
                <div className="flex flex-col items-center shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/20">
                        <Lightbulb size={32} />
                    </div>
                    <span className="mt-3 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
                        Le conseil du jour
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-2xl leading-tight">
                        La règle des 3 secondes pour votre CV
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
                        Un recruteur passe en moyenne <strong>3 à 6 secondes</strong> sur un CV lors de la première lecture.
                        Placez vos compétences clés et votre dernier poste en haut, dans le "Triangle d'Or" (en haut à gauche).
                        Utilisez des listes à puces plutôt que de longs paragraphes pour maximiser l'impact visuel.
                    </p>

                    <Link href="/dashboard/advice/article/a7" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400">
                        Lire le guide complet de l'optimisation CV
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2 md:flex-col self-end md:self-stretch md:justify-center border-t md:border-t-0 md:border-l border-amber-100 pt-4 md:pt-0 md:pl-6 dark:border-amber-900/30 w-full md:w-auto mt-2 md:mt-0">
                    <button
                        type="button"
                        onClick={() => setIsLiked(!isLiked)}
                        className={`group flex h-10 w-10 items-center justify-center rounded-full border transition-all ${isLiked
                            ? "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
                            : "border-neutral-200 bg-white text-neutral-400 hover:border-orange-300 hover:text-orange-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-700"
                            }`}
                        title="Utile"
                    >
                        <ThumbsUp size={18} className={`transition-transform ${isLiked ? "scale-110 fill-current" : "group-hover:scale-110"}`} />
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className={`group flex h-10 w-10 items-center justify-center rounded-full border transition-all ${isSaved
                            ? "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400"
                            : "border-neutral-200 bg-white text-neutral-400 hover:border-amber-300 hover:text-amber-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-amber-700"
                            }`}
                        title="Sauvegarder"
                    >
                        {isSaved ? (
                            <BookmarkCheck size={18} className="scale-110 transition-transform" />
                        ) : (
                            <BookmarkPlus size={18} className="transition-transform group-hover:scale-110" />
                        )}
                    </button>

                    <button
                        type="button"
                        className="group flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 transition-all hover:border-blue-300 hover:text-blue-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700"
                        title="Partager"
                    >
                        <Share2 size={16} className="transition-transform group-hover:scale-110" />
                    </button>
                </div>
            </div>

            {/* Floating Toast for Save Action */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-lg dark:border-amber-800/50 dark:bg-neutral-800 dark:text-amber-400"
                    >
                        <BookmarkCheck size={14} />
                        Conseil sauvegardé dans votre espace
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
