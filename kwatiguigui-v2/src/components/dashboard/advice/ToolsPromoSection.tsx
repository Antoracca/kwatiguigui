"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, FileEdit, LineChart } from "lucide-react";

export function ToolsPromoSection() {
    const tools = [
        {
            title: "Créateur de CV Pro",
            description: "Générez un CV design et optimisé ATS en 5 minutes.",
            icon: <FileEdit size={24} />,
            color: "from-blue-500 to-indigo-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            iconColor: "text-blue-600 dark:text-blue-400",
            link: "/dashboard/cv-builder",
        },
        {
            title: "Simulateur de Salaire",
            description: "Découvrez votre valeur sur le marché centrafricain.",
            icon: <Calculator size={24} />,
            color: "from-emerald-500 to-teal-600",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            link: "#",
            badge: "Bientôt",
        },
        {
            title: "Analyse de Profil",
            description: "Évaluez l'attractivité de votre profil pour les recruteurs.",
            icon: <LineChart size={24} />,
            color: "from-violet-500 to-purple-600",
            bg: "bg-violet-50 dark:bg-violet-900/20",
            iconColor: "text-violet-600 dark:text-violet-400",
            link: "/dashboard/advice/profile-analysis",
        },
    ];

    return (
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50 sm:p-10">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Outils pratiques exclusifs
                    </h2>
                    <p className="text-sm font-medium text-neutral-500 mt-1">
                        Gagnez du temps dans vos démarches avec nos solutions intégrées.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50 hover:text-indigo-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-indigo-400"
                >
                    Voir tous les outils
                </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool, i) => (
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        key={tool.title}
                        href={tool.link}
                        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-xl hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900 ${tool.badge ? 'cursor-not-allowed opacity-90' : ''}`}
                        onClick={(e) => tool.badge && e.preventDefault()}
                    >
                        {/* Top gradient border on hover */}
                        <div className={`absolute inset-x-0 top-0 h-1 translate-y-[-100%] bg-gradient-to-r ${tool.color} transition-transform duration-300 group-hover:translate-y-0`} />

                        <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.bg} ${tool.iconColor}`}>
                                {tool.icon}
                            </div>

                            {tool.badge && (
                                <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                                    {tool.badge}
                                </span>
                            )}
                        </div>

                        <h3 className="mb-2 font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            {tool.title}
                        </h3>

                        <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400 flex-1">
                            {tool.description}
                        </p>

                        <div className={`mt-auto flex items-center gap-2 text-sm font-bold transition-colors ${tool.badge ? 'text-neutral-400' : 'text-neutral-900 group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400'}`}>
                            {tool.badge ? 'En développement' : 'Utiliser l\'outil'}
                            {!tool.badge && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
