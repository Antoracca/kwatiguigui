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
    <div className="relative flex min-h-screen flex-col items-center justify-center pt-8 pb-12 px-4 overflow-hidden">
      {/* Bouton Retour Accueil */}
      <div className="absolute top-6 left-6 z-50">
        <Button asChild variant="ghost" className="rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-neutral-700 hover:bg-white hover:text-primary-600 dark:bg-neutral-900/50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-primary-400 transition-all px-4">
          <Link href="/">
            <Home size={18} className="mr-2" />
            Accueil
          </Link>
        </Button>
      </div>

      {/* Gradient background — dégradé doux pour faire ressortir les particules */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-[#020617] dark:via-neutral-950 dark:to-[#020617] -z-10" />

      {/* Blur halos décoratifs */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-16 translate-x-1/3 rounded-full bg-primary-400/20 blur-[120px] -z-10 dark:bg-primary-600/10" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/3 -translate-x-1/3 rounded-full bg-secondary-400/20 blur-[120px] -z-10 dark:bg-secondary-600/10" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/10 blur-[80px] -z-10 dark:bg-accent-600/5" />

      {/* Animation de lotties background */}
      <AuthBackgroundLotties />

      {/* Animation constellation interactive (tsParticles) */}
      <ParticlesBackground />

      {/* Form card — glassmorphism par-dessus les particules */}
      <div className="w-full max-w-[440px] z-10">
        <div className="rounded-[24px] border border-white/60 bg-white/75 backdrop-blur-2xl p-8 shadow-2xl shadow-primary-900/10 dark:border-white/8 dark:bg-neutral-900/70 dark:shadow-black/60 sm:p-10">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-12 text-center text-body-xs text-neutral-400 font-medium z-10">
        &copy; {new Date().getFullYear()} KWATIGUIGUI. Tous droits réservés.
      </p>
    </div>
  );
}
