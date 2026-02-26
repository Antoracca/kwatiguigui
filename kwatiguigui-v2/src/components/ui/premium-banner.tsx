"use client";

import { Crown, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "kwt-premium-banner-dismissed";

interface PremiumBannerProps {
  className?: string;
}

/**
 * PremiumBanner — horizontal gradient banner urging free users to upgrade.
 * Dismissable: stores dismissal in localStorage so it doesn't re-appear.
 * Shown on /jobs for non-premium authenticated users.
 *
 * Usage (Server Component wrapper decides whether to render):
 *   {!isPremium && <PremiumBanner />}
 */
export function PremiumBanner({ className }: PremiumBannerProps) {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const wasDismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setDismissed(wasDismissed);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  }

  // Not mounted yet or dismissed — render nothing
  if (!mounted || dismissed) return null;

  return (
    <div
      role="banner"
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700",
        "px-4 py-3 text-white shadow-lg shadow-primary-600/20",
        className,
      )}
    >
      {/* Background shimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 50%, white 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between gap-4">
        {/* Left: message */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
            <Crown className="h-4 w-4 text-accent-300" />
          </div>
          <p className="truncate text-sm font-medium text-white">
            <span className="font-bold text-accent-300">Passez Premium</span>
            {" "}pour voir les contacts WhatsApp
            <span className="hidden sm:inline"> • 2 500 FCFA/mois</span>
          </p>
        </div>

        {/* Right: CTA + dismiss */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/dashboard/payment"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-primary-700 transition-all hover:bg-primary-50"
          >
            S&apos;abonner
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={dismiss}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Fermer la banniere"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
