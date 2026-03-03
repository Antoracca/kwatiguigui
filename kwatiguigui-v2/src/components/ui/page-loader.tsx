"use client";

import dynamic from "next/dynamic";

// DotLottie needs WASM initialised in the browser — ssr:false prevents the
// server-render crash and the "WASM not loaded" blank frame.
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((m) => ({
      default: m.DotLottieReact,
    })),
  {
    ssr: false,
    // Pure-CSS fallback while the DotLottie bundle + WASM load
    loading: () => (
      <div
        style={{ width: 56, height: 56 }}
        className="rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"
      />
    ),
  },
);

// ── Fullscreen variant ───────────────────────────────────────────────────────
// Used at root / marketing level — covers the whole viewport.

export function FullscreenLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-neutral-950">
      <DotLottieReact
        src="/images/loading.lottie"
        loop
        autoplay
        style={{ width: 180, height: 180 }}
      />
    </div>
  );
}

// ── Content variant ──────────────────────────────────────────────────────────
// Used inside a layout (dashboard main area, auth card, admin area).
// Fills the available space without covering the surrounding chrome.

export function ContentLoader({ size = 120 }: { size?: number }) {
  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center">
      <DotLottieReact
        src="/images/loading.lottie"
        loop
        autoplay
        style={{ width: size, height: size }}
      />
    </div>
  );
}
