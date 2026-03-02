import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const metadata: Metadata = {
    title: "Créateur de CV",
};

export default function CvBuilderPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] max-w-2xl mx-auto space-y-6 text-center animate-in fade-in duration-500">
            <div className="w-full max-w-sm">
                <DotLottieReact
                    src="/images/generatecv.lottie"
                    loop
                    autoplay
                    className="w-full h-auto"
                />
            </div>

            <div className="space-y-3">
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center gap-3">
                    <FileText className="text-primary-500 hidden sm:block" />
                    Créateur de CV IA
                </h1>
                <p className="text-body-lg text-neutral-500 max-w-md mx-auto">
                    Générez un CV professionnel et sur mesure en quelques clics grâce à notre agent IA.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 dark:bg-primary-950/30 dark:text-primary-400">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                    </span>
                    Outil en cours de développement
                </div>
            </div>
        </div>
    );
}
