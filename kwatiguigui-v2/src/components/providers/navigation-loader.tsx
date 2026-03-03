"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Durée minimale d'affichage
const MIN_MS = 1000;

// Pages déjà chargées pendant cette session (module-level = persiste jusqu'au
// rechargement complet de la page / expiration de session).
// Réinitialisé automatiquement à chaque hard-refresh ou nouvelle session.
const visitedPaths = new Set<string>();

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

  const startRef   = useRef<number>(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingRef = useRef(false);

  // Marquer la page initiale comme déjà visitée dès le montage
  useEffect(() => {
    visitedPaths.add(pathname);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 1. Intercepte les clics sur les liens internes ───────────────────────
  useEffect(() => {
    function handleLinkClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("/") || href.startsWith("//")) return;

      let targetPath: string;
      try {
        targetPath = new URL(href, window.location.href).pathname;
      } catch {
        targetPath = href.split("?")[0]?.split("#")[0] ?? href;
      }

      // Même page → rien
      if (targetPath === window.location.pathname) return;

      // Déjà visitée cette session → pas de loader
      if (visitedPaths.has(targetPath)) return;

      pendingRef.current = true;
      startRef.current   = Date.now();
      clearTimeout(timerRef.current);
      setVisible(true);
    }

    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, []);

  // ── 2. Pathname changé → page prête, marquer comme visitée ──────────────
  useEffect(() => {
    // Toujours marquer la page courante comme visitée
    visitedPaths.add(pathname);

    if (!pendingRef.current) return;
    pendingRef.current = false;

    const elapsed   = Date.now() - startRef.current;
    const remaining = Math.max(0, MIN_MS - elapsed);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), remaining);

    return () => clearTimeout(timerRef.current);
  }, [pathname]);

  // ── 3. Sécurité : auto-fermeture à 8 s si la page ne répond pas ─────────
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
