"use client";

import { useCallback } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

export function AuthBackgroundLotties() {
    const lottieRefCallback = useCallback((dotLottie: DotLottie | null) => {
        if (dotLottie) {
            dotLottie.setMode("bounce");
        }
    }, []);

    return (
        <>
            {/* Lottie 1: Female connecting (e.g. Login.lottie) - Bottom Left */}
            <div className="absolute left-0 bottom-0 w-[450px] h-[450px] -translate-x-16 translate-y-16 opacity-90 pointer-events-none z-0 hidden lg:block drop-shadow-2xl">
                <DotLottieReact src="/images/Login.lottie" loop autoplay dotLottieRefCallback={lottieRefCallback} />
            </div>

            {/* Lottie 2: Simulating data mapping (Login and Sign up.lottie) - Top Right */}
            <div className="absolute right-0 top-0 w-[450px] h-[450px] translate-x-16 -translate-y-16 opacity-90 pointer-events-none z-0 hidden lg:block drop-shadow-2xl">
                <DotLottieReact src="/images/Login and Sign up.lottie" loop autoplay dotLottieRefCallback={lottieRefCallback} />
            </div>
        </>
    );
}
