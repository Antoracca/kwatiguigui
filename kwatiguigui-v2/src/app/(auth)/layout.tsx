import Link from "next/link";
import { Home } from "lucide-react";

import { ParticlesBackground } from "@/components/auth/particles-background";
import { AuthBackgroundLotties } from "@/components/auth/auth-background-lotties";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * overflow-y-auto → le contenu peut scroller si l'écran est petit
     * justify-start + pt-20 sur mobile (laisse de la place pour le bouton Accueil)
     * sm:justify-center → centré verticalement sur les écrans plus grands
     * Le container croit avec le contenu grâce à min-h-screen
     */
    <div className="relative flex min-h-screen flex-col items-center justify-start px-4 pt-20 pb-10 overflow-y-auto sm:justify-center sm:pt-12 sm:pb-12">

      {/* Bouton Retour Accueil — fixé dans le coin pour rester visible lors du scroll mobile */}
      <div className="fixed top-4 left-4 z-50 sm:top-6 sm:left-6">
        <Button
          asChild
          variant="ghost"
          className="rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-neutral-700 hover:bg-white hover:text-primary-600 dark:bg-neutral-900/50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-primary-400 transition-all px-3 sm:px-4"
        >
          <Link href="/">
            <Home size={16} className="mr-1.5 sm:mr-2 sm:h-[18px] sm:w-[18px]" />
            <span className="text-sm sm:text-base">Accueil</span>
          </Link>
        </Button>
      </div>

      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-[#020617] dark:via-neutral-950 dark:to-[#020617] -z-10" />

      {/* Blur halos décoratifs — réduits sur mobile pour éviter le surpoids visuel */}
      <div className="fixed top-0 right-0 h-[180px] w-[180px] sm:h-[350px] sm:w-[350px] lg:h-[500px] lg:w-[500px] -translate-y-16 translate-x-1/3 rounded-full bg-primary-400/20 blur-[80px] sm:blur-[120px] -z-10 dark:bg-primary-600/10" />
      <div className="fixed bottom-0 left-0 h-[180px] w-[180px] sm:h-[350px] sm:w-[350px] lg:h-[500px] lg:w-[500px] translate-y-1/3 -translate-x-1/3 rounded-full bg-secondary-400/20 blur-[80px] sm:blur-[120px] -z-10 dark:bg-secondary-600/10" />
      <div className="fixed top-1/2 left-1/2 h-40 w-40 sm:h-64 sm:w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/10 blur-[60px] sm:blur-[80px] -z-10 dark:bg-accent-600/5" />

      {/* Animation de lotties background */}
      <AuthBackgroundLotties />

      {/* Animation constellation interactive */}
      <ParticlesBackground />

      {/* Form card — glassmorphism */}
      <div className="w-full max-w-[440px] z-10">
        <div className="rounded-[20px] sm:rounded-[24px] border border-white/60 bg-white/75 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-primary-900/10 dark:border-white/8 dark:bg-neutral-900/70 dark:shadow-black/60 sm:p-10">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 sm:mt-12 text-center text-body-xs text-neutral-400 font-medium z-10">
        &copy; {new Date().getFullYear()} KWATIGUIGUI. Tous droits réservés.
      </p>
    </div>
  );
}
