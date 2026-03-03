"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

// All providers are dynamically imported (ssr: false) because their
// static imports corrupt React in the Next.js 16 / Turbopack SSR prerender
// bundle — they call React hooks or access browser APIs at module level,
// which crashes the prerender worker.

const AuthProvider = dynamic(
  () =>
    import("@/components/providers/auth-provider").then((m) => ({
      default: m.AuthProvider,
    })),
  { ssr: false },
);

const ThemeProvider = dynamic(
  () => import("next-themes").then((m) => ({ default: m.ThemeProvider })),
  { ssr: false },
);

const Toaster = dynamic(
  () => import("sonner").then((m) => ({ default: m.Toaster })),
  { ssr: false },
);

// Lottie WASM loader — must also be ssr: false to avoid useEffect null crash
// during /_not-found static prerender.
const LottieWasmLoader = dynamic(
  () =>
    import("@/components/providers/lottie-wasm-loader").then((m) => ({
      default: m.LottieWasmLoader,
    })),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
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
      <LottieWasmLoader />
    </ThemeProvider>
  );
}
