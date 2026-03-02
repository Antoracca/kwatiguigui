import { Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Entretiens",
};

export default function InterviewsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <Calendar className="text-primary-500" />
                    Entretiens & Planification
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Organisez vos rendez-vous et relances avec les candidats shortlistés.
                </p>
            </div>

            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                <Calendar size={32} className="text-neutral-300 mb-4" />
                <h2 className="text-heading-sm font-bold text-neutral-700 dark:text-neutral-300">Agenda synchronisé bientôt disponible</h2>
                <p className="text-body-sm text-neutral-500 mt-1">Vous pourrez connecter votre calendrier (Google, Outlook).</p>
            </div>
        </div>
    );
}
