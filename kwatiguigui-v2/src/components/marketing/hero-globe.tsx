"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let phi = 0;

    // Smooth transition between themes
    const isDark = resolvedTheme === "dark";

    // Core styling for an elegant, professional aesthetic
    const colors = isDark
      ? {
        base: [0.15, 0.15, 0.15] as [number, number, number],
        glow: [0.1, 0.1, 0.1] as [number, number, number],
        marker: [1, 1, 1] as [number, number, number],
      }
      : {
        base: [1, 1, 1] as [number, number, number],
        glow: [1, 1, 1] as [number, number, number],
        marker: [0.1, 0.1, 0.1] as [number, number, number],
      };

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 480 * 2,
      height: 480 * 2,
      phi: 0,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isDark ? 1.5 : 6,
      baseColor: colors.base,
      markerColor: colors.marker,
      glowColor: colors.glow,
      markers: [
        // One singular, extremely subtle point in central Africa
        { location: [4.36, 18.56], size: 0.05 },
      ],
      onRender: (state) => {
        // Automatically rotate the globe slowly
        state.phi = phi + 0.5; // Initial offset
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [resolvedTheme]);

  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 480 }}>
      {/* Background Glow effects */}
      <div className="absolute inset-0 bg-primary-100/20 dark:bg-primary-900/10 rounded-full blur-3xl opacity-50 pointer-events-none scale-75" />

      {/* Globe canvas */}
      <motion.canvas
        ref={canvasRef}
        className="block"
        style={{ width: 480, height: 480, maxWidth: "100%", aspectRatio: 1 }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
