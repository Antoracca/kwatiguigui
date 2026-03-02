import { BarChart3 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statistiques",
};

export default function AnalyticsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <BarChart3 className="text-primary-500" />
                    Statistiques de Recrutement
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Analysez la performance de vos annonces et votre taux de conversion.
                </p>
            </div>

            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                <BarChart3 size={32} className="text-neutral-300 mb-4" />
                <h2 className="text-heading-sm font-bold text-neutral-700 dark:text-neutral-300">Tableau de bord de performance</h2>
                <p className="text-body-sm text-neutral-500 mt-1 text-center max-w-sm">Découvrez l'origine de vos candidats et optimisez votre budget Recrutement.</p>
            </div>
        </div>
    );
}
