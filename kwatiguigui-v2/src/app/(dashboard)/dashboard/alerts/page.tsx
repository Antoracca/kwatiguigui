import { BellRing } from "lucide-react";
import type { Metadata } from "next";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const metadata: Metadata = {
    title: "Alertes Emploi",
};

export default function AlertsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] max-w-2xl mx-auto space-y-6 text-center animate-in fade-in duration-500">
            <div className="w-full max-w-md">
                <DotLottieReact
                    src="/images/alert.lottie"
                    loop
                    autoplay
                    className="w-full h-auto"
                />
            </div>

            <div className="space-y-3">
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center gap-3">
                    <BellRing className="text-primary-500 hidden sm:block" />
                    Alertes Emploi
                </h1>
                <p className="text-body-lg text-neutral-500 max-w-md mx-auto">
                    Vous n'avez aucune alerte active pour le moment.
                </p>
                <p className="text-body-sm text-neutral-500 mt-1 max-w-sm mx-auto text-center">
                    Vous pouvez créer des alertes directement depuis la page de recherche des offres.
                </p>
            </div>
        </div>
    );
}
