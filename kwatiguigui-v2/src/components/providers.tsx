"use client";

import { ThemeProvider } from "next-themes";
import * as React from "react";
import { Toaster } from "sonner";
import { setWasmUrl } from "@lottiefiles/dotlottie-react";

import { AuthProvider } from "@/components/providers/auth-provider";

// ---------------------------------------------------------------------------
// Configure le chemin du fichier WASM de DotLottie avant tout rendu.
// Sans ça, @lottiefiles/dotlottie-react essaie de charger le .wasm depuis
// node_modules (inaccessible en prod) → erreur sur iOS Safari.
// Le fichier est copié dans /public/dotlottie-player.wasm via postinstall.
// ---------------------------------------------------------------------------
setWasmUrl("/dotlottie-player.wasm");

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
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
