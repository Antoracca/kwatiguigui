"use client";

import { ThemeProvider } from "next-themes";
import * as React from "react";
import { Toaster } from "sonner";

import { AuthProvider } from "@/components/providers/auth-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Configure le chemin du fichier WASM de DotLottie (browser uniquement).
  // IMPORTANT: dynamic import — le static import de @lottiefiles/dotlottie-react
  // au niveau module corrompt React pendant le prerender Next.js (React devient null).
  // Le dynamic import garantit que le package n'est jamais chargé côté serveur.
  React.useEffect(() => {
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
