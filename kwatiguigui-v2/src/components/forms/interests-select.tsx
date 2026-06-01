"use client";

import { useState } from "react";
import {
  Stethoscope,
  Laptop,
  Music,
  Rocket,
  Sprout,
  GraduationCap,
  Palette,
  Landmark,
  Scale,
  HardHat,
  ShoppingBag,
  Truck,
  Megaphone,
  ChefHat,
  Scissors,
  Shield,
  Dumbbell,
  Plane,
  Leaf,
  FlaskConical,
  Hammer,
  HeartHandshake,
  Check,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

import { INTEREST_DOMAINS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Mapping domaine → icône appropriée (jamais d'icône générique "Sparkles")
// ---------------------------------------------------------------------------
const ICONS: Record<string, LucideIcon> = {
  sante: Stethoscope,
  tech: Laptop,
  musique: Music,
  entrepreneuriat: Rocket,
  agriculture: Sprout,
  education: GraduationCap,
  art: Palette,
  finance: Landmark,
  droit: Scale,
  btp: HardHat,
  commerce: ShoppingBag,
  transport: Truck,
  communication: Megaphone,
  cuisine: ChefHat,
  mode: Scissors,
  securite: Shield,
  sport: Dumbbell,
  tourisme: Plane,
  energie: Leaf,
  science: FlaskConical,
  artisanat: Hammer,
  social: HeartHandshake,
};

interface InterestsSelectProps {
  /** Valeurs sélectionnées (tableau de `value`) */
  value: string[];
  onChange: (next: string[]) => void;
  /** Limite optionnelle du nombre de domaines sélectionnables */
  max?: number;
}

// Nombre de domaines affichés avant le bouton "Voir plus"
const COLLAPSED_COUNT = 10;

export function InterestsSelect({ value, onChange, max }: InterestsSelectProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      if (max && value.length >= max) return;
      onChange([...value, v]);
    }
  };

  // On affiche les 10 premiers + ceux déjà sélectionnés (pour ne jamais les cacher),
  // sauf si l'utilisateur a déroulé la liste complète.
  const visible = expanded
    ? INTEREST_DOMAINS
    : INTEREST_DOMAINS.filter(
        (d, i) => i < COLLAPSED_COUNT || value.includes(d.value),
      );

  const hiddenCount = INTEREST_DOMAINS.length - visible.length;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
          Centres d&rsquo;intérêt{" "}
          <span className="font-normal text-neutral-400">(facultatif)</span>
        </label>
        {value.length > 0 && (
          <span className="text-body-xs font-medium text-primary-600 dark:text-primary-400">
            {value.length} sélectionné{value.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <p className="text-body-xs text-neutral-400 dark:text-neutral-500">
        Choisissez les domaines qui vous passionnent.
      </p>

      <div className="flex flex-wrap gap-2 pt-0.5">
        {visible.map(({ value: v, label }) => {
          const Icon = ICONS[v] ?? Rocket;
          const selected = value.includes(v);
          return (
            <button
              key={v}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(v)}
              className={[
                "group inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-body-xs font-medium transition-all duration-200 select-none",
                selected
                  ? "border-primary-500 bg-primary-500 text-white shadow-sm"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-primary-700 dark:hover:bg-primary-950/30",
              ].join(" ")}
            >
              {selected ? (
                <Check size={14} className="shrink-0" strokeWidth={2.5} />
              ) : (
                <Icon size={14} className="shrink-0" />
              )}
              {label}
            </button>
          );
        })}

        {/* Bouton dérouler / replier */}
        {(hiddenCount > 0 || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-primary-300 px-3 py-2 text-body-xs font-semibold text-primary-600 transition-all hover:border-primary-400 hover:bg-primary-50/50 dark:border-primary-700 dark:text-primary-400 dark:hover:bg-primary-950/30"
          >
            {expanded ? "Voir moins" : `Voir plus (${hiddenCount})`}
            <ChevronDown
              size={14}
              className={["shrink-0 transition-transform", expanded ? "rotate-180" : ""].join(" ")}
            />
          </button>
        )}
      </div>
    </div>
  );
}
