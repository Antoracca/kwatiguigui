"use client";

import { useEffect } from "react";

/**
 * Loads the DotLottie WASM URL once in the browser.
 * This component MUST be dynamically imported with { ssr: false }
 * to avoid corrupting React during Next.js static prerender.
 */
export function LottieWasmLoader() {
    useEffect(() => {
        import("@lottiefiles/dotlottie-react").then(({ setWasmUrl }) => {
            setWasmUrl("/dotlottie-player.wasm");
        });
    }, []);

    return null;
}
