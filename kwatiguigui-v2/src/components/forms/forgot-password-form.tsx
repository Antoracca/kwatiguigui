"use client";

import { ArrowLeft, CheckCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { forgotPassword } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = { success: false };

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState,
  );

  if (state.success) {
    return (
      <div className="space-y-4 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-950">
          <CheckCircle size={32} className="text-secondary-500" />
        </div>
        <div>
          <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Lien envoye !
          </h2>
          <p className="mt-2 text-body-sm text-neutral-500">
            Si un compte est associe a ce numero, vous recevrez un lien de
            reinitialisation. Verifiez votre messagerie.
          </p>
        </div>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft size={18} />
            Retour a la connexion
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 dark:border-error-800 dark:bg-error-950">
          <p className="text-body-sm text-error-700 dark:text-error-300">
            {state.error}
          </p>
        </div>
      )}

      <Input
        label="Numero WhatsApp"
        name="whatsapp"
        type="tel"
        placeholder="+236 74 XX XX XX"
        leftIcon={<Phone size={18} />}
        required
        autoComplete="tel"
        error={state.fieldErrors?.whatsapp?.[0]}
        disabled={isPending}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={18} />
            Envoyer le lien
          </>
        )}
      </Button>
    </form>
  );
}
