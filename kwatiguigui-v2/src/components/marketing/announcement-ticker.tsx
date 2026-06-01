"use client";

import { motion } from "framer-motion";
import { Search, Building2, TrendingUp, ShieldCheck, CheckSquare, Lock, Ban } from "lucide-react";

const TICKER_MESSAGES = [
    { text: "Sécurité garantie : Kussala ne demandera jamais d'argent aux candidats.", icon: ShieldCheck },
    { text: "Transparence totale : aucun frais caché lors de vos recrutements.", icon: CheckSquare },
    { text: "Confidentialité de vos données personnelles et professionnelles assurée.", icon: Lock },
    { text: "Trouvez un emploi, un stage, ou une mission freelance de qualité.", icon: Search },
    { text: "Solution complète de recrutement structuré pour les entreprises.", icon: Building2 },
    { text: "Fiabilité et accompagnement dédié pour propulser votre carrière.", icon: TrendingUp },
    { text: "Protection anti-fraude déployée sur toutes les annonces (Zéro Scam).", icon: Ban }
];

export function AnnouncementTicker() {
    // Duplicate messages so the loop is seamless: animate x from 0% to -50%
    const doubled = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

    return (
        <div className="w-full overflow-hidden border-b border-neutral-100 dark:border-neutral-900 bg-transparent py-3 flex items-center relative z-20">
            {/* Gradient masks for smooth fade effect at edges */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap gap-8 sm:gap-12 lg:gap-20 px-4 w-max items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 50,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                {doubled.map((msg, i) => {
                    const Icon = msg.icon;
                    return (
                        <div key={i} className="flex-none text-sm font-semibold text-neutral-800 dark:text-neutral-200 tracking-wide flex items-center gap-3">
                            <Icon size={16} className="text-secondary-500" />
                            {msg.text}
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
