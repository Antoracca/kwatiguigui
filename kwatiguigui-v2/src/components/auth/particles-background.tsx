"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// ---------------------------------------------------------------------------
// ParticlesBackground — Constellation interactive en couleurs RCA
// Hover : lignes magnétiques vers le curseur (effet "grab")
// Click : explosion de nouvelles particules au point de clic
// ---------------------------------------------------------------------------
export function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="auth-particles"
      className="absolute inset-0"
      style={{ zIndex: 0 }}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: {
              distance: 180,
              links: { opacity: 0.7, color: "#4766F0" },
            },
            push: { quantity: 5 },
          },
        },
        particles: {
          // Couleurs : Bleu prestige, Vert espérance, Or soleil (drapeau RCA)
          color: {
            value: ["#003189", "#289728", "#EAB308", "#4766F0", "#43C643"],
          },
          links: {
            color: "#003189",
            distance: 140,
            enable: true,
            opacity: 0.18,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.9,
            straight: false,
          },
          number: {
            density: { enable: true, width: 1000 },
            value: 75,
          },
          opacity: {
            value: { min: 0.2, max: 0.65 },
            animation: { enable: true, speed: 0.8, sync: false },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1.5, max: 4 },
            animation: { enable: true, speed: 1.5, sync: false },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
