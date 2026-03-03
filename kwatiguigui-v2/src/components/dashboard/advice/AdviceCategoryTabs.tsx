"use client";

import { motion } from "framer-motion";

export type CategoryTab = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

interface AdviceCategoryTabsProps {
    tabs: CategoryTab[];
    activeTab: string;
    onChange: (id: string) => void;
}

export function AdviceCategoryTabs({ tabs, activeTab, onChange }: AdviceCategoryTabsProps) {
    return (
        <div className="flex w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-2 rounded-2xl bg-neutral-100 p-1.5 dark:bg-neutral-800/50">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none whitespace-nowrap ${isActive
                                    ? "text-purple-700 dark:text-purple-300"
                                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                                }`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className={`${isActive ? "text-purple-600 dark:text-purple-400" : "opacity-70"}`}>
                                    {tab.icon}
                                </span>
                                {tab.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTabAdvice"
                                    className="absolute inset-0 z-0 rounded-xl bg-white shadow-sm dark:bg-neutral-700"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
