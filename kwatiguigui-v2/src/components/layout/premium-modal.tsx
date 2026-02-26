"use client";

import { Check, Crown, Lock, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}

const PREMIUM_FEATURES = [
  "Acces aux numeros WhatsApp de tous les profils",
  "Annonces illimitees (vs 5 en gratuit)",
  "Messages directs illimites",
  "Badge Premium visible sur votre profil",
  "Support prioritaire 7j/7",
];

export function PremiumModal({ open, onClose }: PremiumModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal
        aria-labelledby="premium-modal-title"
        className="fixed inset-x-4 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-neutral-900 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-500 shadow-lg shadow-accent-500/30">
            <Crown size={32} className="text-white" />
          </div>
        </div>

        {/* Header */}
        <h2
          id="premium-modal-title"
          className="text-center font-heading text-heading-md text-neutral-900 dark:text-neutral-100"
        >
          Passez Premium
        </h2>
        <p className="mt-2 text-center text-body-sm text-neutral-500">
          Pour voir les coordonnees WhatsApp et contacter directement.
        </p>

        {/* Contact blocked illustration */}
        <div className="my-4 flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-neutral-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700">
            <Lock size={16} className="text-neutral-500" />
          </div>
          <div>
            <p className="text-body-xs font-medium text-neutral-700 dark:text-neutral-300">
              Numero WhatsApp masque
            </p>
            <p className="font-mono text-body-xs text-neutral-400">
              +236 •• •• •• ••
            </p>
          </div>
          <div className="ml-auto">
            <MessageCircle size={18} className="text-neutral-300" />
          </div>
        </div>

        {/* Features */}
        <ul className="mb-6 space-y-2">
          {PREMIUM_FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check size={16} className="mt-0.5 shrink-0 text-secondary-500" />
              <span className="text-body-sm text-neutral-700 dark:text-neutral-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="space-y-3">
          <Link href="/dashboard/payment" onClick={onClose} className="block">
            <Button variant="accent" size="lg" className="w-full">
              <Crown size={18} />
              Passer Premium — 2 500 FCFA/mois
            </Button>
          </Link>
          <button
            onClick={onClose}
            className="w-full text-center text-body-xs text-neutral-400 transition-colors hover:text-neutral-600"
          >
            Non merci, rester en gratuit
          </button>
        </div>
      </div>
    </>
  );
}
