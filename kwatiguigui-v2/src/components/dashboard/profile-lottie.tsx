"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function ProfileLottie() {
    return (
        <div className="w-full flex justify-center">
            <DotLottieReact
                src="/images/Login5.lottie"
                loop
                autoplay
                className="w-full h-auto max-w-[450px] object-contain transform scale-110"
            />
        </div>
    );
}
