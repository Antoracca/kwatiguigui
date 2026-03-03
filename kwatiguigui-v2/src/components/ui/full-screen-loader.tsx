"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface FullScreenLoaderProps {
    isVisible: boolean;
    text?: string;
}

export function FullScreenLoader({ isVisible, text = "Chargement en cours..." }: FullScreenLoaderProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/70 backdrop-blur-md dark:bg-neutral-950/70">
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="h-48 w-48 -mb-8">
                    <DotLottieReact src="/images/chargementloader.lottie" loop autoplay />
                </div>
                <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-white drop-shadow-sm">
                    {text}
                </h2>
            </div>
        </div>
    );
}
