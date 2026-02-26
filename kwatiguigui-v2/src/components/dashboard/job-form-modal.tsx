"use client";

import { useActionState, useEffect, useRef } from "react";
import { X, Plus, AlertCircle, CheckCircle } from "lucide-react";

import { createJob } from "@/lib/actions/jobs";
import { RCA_REGIONS, JOB_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface JobFormModalProps {
  open: boolean;
  onClose: () => void;
}

const initialState = { success: false };

export function JobFormModal({ open, onClose }: JobFormModalProps) {
  const [state, action, isPending] = useActionState(createJob, initialState);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on success
  useEffect(() => {
    if (state.success) {
      const t = setTimeout(onClose, 1200);
      return () => clearTimeout(t);
    }
  }, [state.success, onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 max-h-none max-w-none bg-transparent p-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" aria-hidden />

      {/* Modal */}
      <div className="fixed inset-0 flex items-end justify-center sm:items-center">
        <div className="relative w-full max-h-[90dvh] overflow-y-auto rounded-t-3xl bg-white shadow-xl dark:bg-neutral-900 sm:max-w-lg sm:rounded-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                <Plus className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="font-heading text-fluid-lg font-bold text-neutral-900 dark:text-neutral-100">
                Nouvelle annonce
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form action={action} className="space-y-5 p-6">
            {state.success && (
              <div className="flex items-center gap-2 rounded-xl border border-secondary-200 bg-secondary-50 p-3 text-secondary-800 dark:border-secondary-800 dark:bg-secondary-950/30 dark:text-secondary-300">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="text-fluid-sm font-medium">Annonce creee et soumise pour moderation.</span>
              </div>
            )}

            {state.error && (
              <div className="flex items-start gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-fluid-sm">{state.error}</span>
              </div>
            )}

            <Select name="job_type">
              <SelectTrigger
                label="Type d'emploi"
                error={state.fieldErrors?.job_type?.[0]}
              >
                <SelectValue placeholder="Selectionner un type d'emploi" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select name="region">
              <SelectTrigger
                label="Region"
                error={state.fieldErrors?.region?.[0]}
              >
                <SelectValue placeholder="Selectionner une region" />
              </SelectTrigger>
              <SelectContent>
                {RCA_REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                name="city"
                label="Ville"
                placeholder="Votre ville"
                error={state.fieldErrors?.city?.[0]}
                required
              />
              <Input
                name="neighborhood"
                label="Quartier"
                placeholder="Optionnel"
                error={state.fieldErrors?.neighborhood?.[0]}
              />
            </div>

            <Textarea
              name="experience"
              label="Description / Experience"
              placeholder="Decrivez le poste ou votre profil (optionnel)"
              rows={3}
              maxLength={500}
              showCount
              error={state.fieldErrors?.experience?.[0]}
            />

            <p className="rounded-lg bg-neutral-50 px-3 py-2 text-fluid-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              Votre annonce sera soumise a notre equipe de moderation avant publication. Delai moyen : 24h.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isPending}
              >
                <Plus className="h-4 w-4" />
                Publier
              </Button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
