import { GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stages & Alternance",
};

export default function StudentJobsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <GraduationCap className="text-primary-500" />
                    Stages & Alternance
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Espace réservé aux étudiants et jeunes diplômés à la recherche d'une première opportunité.
                </p>
            </div>

            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                <GraduationCap size={32} className="text-neutral-300 mb-4" />
                <h2 className="text-heading-sm font-bold text-neutral-700 dark:text-neutral-300">Pôle Étudiant en cours d'intégration</h2>
                <p className="text-body-sm text-neutral-500 mt-1 text-center">Les offres orientées formation et apprentissage apparaitront ici.</p>
            </div>
        </div>
    );
}
