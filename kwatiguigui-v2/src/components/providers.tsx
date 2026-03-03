"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import { AuthProvider } from "@/components/providers/auth-provider";

// sonner and next-themes are dynamically imported (ssr: false) because their
// static imports cause React to become null in the Next.js 16 / Turbopack
// SSR prerender bundle — they call React.useEffect / React.useContext at
// module-level via namespace imports, which crashes the prerender worker.
//
// ssr: false is safe for both:
//   - Toaster: toasts are always browser-only, no SSR value
//   - ThemeProvider: next-themes handles suppressHydrationWarning on <html>
//     so no visible flash occurs even without SSR theme rendering

const ThemeProvider = dynamic(
  () => import("next-themes").then((m) => ({ default: m.ThemeProvider })),
  { ssr: false },
);

const Toaster = dynamic(
  () => import("sonner").then((m) => ({ default: m.Toaster })),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  // Load DotLottie WASM URL only in the browser — dynamic import prevents
  // @lottiefiles/dotlottie-react from ever loading during SSR/prerender.
  useEffect(() => {
    import("@lottiefiles/dotlottie-react").then(({ setWasmUrl }) => {
      setWasmUrl("/dotlottie-player.wasm");
    });
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AuthProvider>
        {children}
      </AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          classNames: {
            toast:
              "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl",
            title: "font-heading font-semibold text-neutral-900 dark:text-neutral-100",
            description: "text-body-sm text-neutral-500 dark:text-neutral-400",
          },
        }}
      />
    </ThemeProvider>
  );
}
