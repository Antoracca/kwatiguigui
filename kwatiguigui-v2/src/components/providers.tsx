"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { AuthProvider } from "@/components/providers/auth-provider";

// Named imports instead of "import * as React" — prevents the namespace
// import from resolving to null in certain Next.js / Turbopack SSR bundles.

export function Providers({ children }: { children: ReactNode }) {
  // Dynamic import of @lottiefiles/dotlottie-react — the static import
  // at module level corrupts the React instance during Next.js prerendering
  // (React becomes null). Dynamic import ensures it only loads in the browser.
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
