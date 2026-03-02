import type { Metadata } from "next";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const metadata: Metadata = {
    title: "Mes Candidatures",
};

export default function ApplicationsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <Image src="/images/candidature.png" alt="Candidatures" width={28} height={28} />
                    Mes Candidatures
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Suivez l'état de vos candidatures envoyées et gérez vos entretiens.
                </p>
            </div>

            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50 p-6 text-center">
                <DotLottieReact
                    src="/images/search.lottie"
                    loop
                    autoplay
                    className="w-24 h-24 mb-2 object-contain"
                />
                <h2 className="text-heading-sm font-bold text-neutral-700 dark:text-neutral-300">Aucune candidature pour le moment</h2>
                <p className="text-body-sm text-neutral-500 mt-1 max-w-sm text-center">Vous n'avez pas encore postulé à des offres. Remplissez votre profil et explorez les recommandations !</p>
            </div>
        </div>
    );
}
