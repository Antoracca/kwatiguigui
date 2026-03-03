"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// All three providers are dynamically imported (ssr: false) because their
// static imports corrupt React in the Next.js 16 / Turbopack SSR prerender
// bundle — they call React hooks or access browser APIs at module level,
// which crashes the prerender worker.
//
// ssr: false is safe for all three:
//   - AuthProvider: auth state is inherently client-side; server components
//     read auth directly from Supabase cookies, not via AuthProvider
//   - Toaster: toasts are always browser-only, no SSR value
//   - ThemeProvider: next-themes handles suppressHydrationWarning on <html>
//     so no visible flash occurs even without SSR theme rendering

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
