"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Durée minimale d'affichage (même si la page est déjà prête)
const MIN_MS = 1600;

// DotLottie a besoin du WASM côté navigateur uniquement
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((m) => ({
      default: m.DotLottieReact,
    })),
  { ssr: false },
);

export function NavigationLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Horodatage du clic pour calculer le temps restant à afficher
  const startRef   = useRef<number>(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Flag : une navigation est en cours (clic détecté, page pas encore chargée)
  const pendingRef = useRef(false);

  // ── 1. Écoute TOUS les clics sur les liens internes ─────────────────────
  // Phase de capture (true) → on intercepte avant que Next.js déclenche
  // la navigation, donc le loader s'affiche au même instant que le clic.
  useEffect(() => {
    function handleLinkClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      // Ignorer : liens externes, ancres pures, liens de téléchargement
      if (!href.startsWith("/") || href.startsWith("//")) return;

      // Déterminer le chemin cible (sans query ni hash)
      let targetPath: string;
      try {
        targetPath = new URL(href, window.location.href).pathname;
      } catch {
        targetPath = href.split("?")[0]?.split("#")[0] ?? href;
      }

      // Ne pas afficher si on est déjà sur cette page
      if (targetPath === window.location.pathname) return;

      pendingRef.current = true;
      startRef.current   = Date.now();
      clearTimeout(timerRef.current);
      setVisible(true);
    }

    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, []);

  // ── 2. Quand le pathname change → la nouvelle page est prête ────────────
  // On cache le loader seulement après avoir respecté le délai minimum.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;

    const elapsed   = Date.now() - startRef.current;
    const remaining = Math.max(0, MIN_MS - elapsed);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), remaining);

    return () => clearTimeout(timerRef.current);
  }, [pathname]);

  // ── 3. Sécurité : auto-fermeture après 8 s si la page ne répond pas ────
  useEffect(() => {
    if (!visible) return;
    const safety = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(safety);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-white/75 dark:bg-neutral-950/80"
      aria-live="polite"
      aria-label="Chargement de la page"
    >
      <DotLottieReact
        src="/images/loading.lottie"
        loop
        autoplay
        style={{ width: 180, height: 180 }}
      />
    </div>
  );
}
