import { Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Candidathèque",
};

export default function CandidatesPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <Users className="text-primary-500" />
                    Candidathèque
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Recherchez et filtrez directement parmi des milliers de profils qualifiés.
                </p>
            </div>

            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                <Users size={32} className="text-neutral-300 mb-4" />
                <h2 className="text-heading-sm font-bold text-neutral-700 dark:text-neutral-300">Recherche de CV en cours de développement</h2>
                <p className="text-body-sm text-neutral-500 mt-1 max-w-md text-center">Vous pourrez très bientôt sourcer des talents directement dans notre base de données.</p>
            </div>
        </div>
    );
}
