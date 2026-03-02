"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Phone, Send, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


// UI Only Mock implementation of the new Auth requirement
export function ForgotPasswordForm() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [step, setStep] = useState<"request" | "otp" | "success">("request");
  const [isPending, setIsPending] = useState(false);

  // Mock submit function since backend will be handled later
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      if (method === "email") {
        setStep("success");
      } else {
        setStep("otp");
      }
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      // In a real app we would redirect to Reset Password page here
      setStep("success");
    }, 1000);
  };

  if (step === "success") {
    return (
      <div className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-950">
          <CheckCircle className="h-8 w-8 text-secondary-500" />
        </div>
        <div>
          <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {method === "email" ? "Lien envoyé !" : "Code vérifié !"}
          </h2>
          <p className="mt-2 text-body-sm text-neutral-500">
            {method === "email"
              ? "Si un compte est associé à cette adresse, vous recevrez un lien de réinitialisation. Vérifiez votre messagerie."
              : "Votre numéro a été vérifié. Vous allez être redirigé vers la page de création d'un nouveau mot de passe."}
          </p>
        </div>
        <Link href="/login" className="block mt-4">
          <Button variant="outline" className="w-full">
            <ArrowLeft size={18} />
            Retour à la connexion
          </Button>
        </Link>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-6">
          <h3 className="text-heading-xs font-heading font-semibold">Vérification OTP</h3>
          <p className="text-body-sm text-neutral-500 mt-1">
            Entrez le code à 6 chiffres envoyé sur votre téléphone.
          </p>
        </div>

        <Input
          label="Code de vérification"
          name="otp"
          type="text"
          placeholder="123456"
          maxLength={6}
          className="text-center text-lg tracking-[0.5em] font-medium"
          required
          disabled={isPending}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 border-none shadow-md transition-all font-medium tracking-wide"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Vérification...
            </>
          ) : (
            "Vérifier le code"
          )}
        </Button>

        <button
          type="button"
          onClick={() => setStep("request")}
          className="w-full text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Annuler
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setMethod("email")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${method === "email"
            ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            }`}
        >
          Par E-mail
        </button>
        <button
          onClick={() => setMethod("phone")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${method === "phone"
            ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            }`}
        >
          Par Téléphone
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-300">
        {method === "email" ? (
          <Input
            label="Adresse E-mail"
            name="email"
            type="email"
            placeholder="maelis@gmail.com"
            leftIcon={<Mail size={18} className="text-neutral-400" />}
            required
            autoComplete="email"
            disabled={isPending}
          />
        ) : (
          <Input
            label="Numéro de téléphone"
            name="phone"
            type="tel"
            placeholder="+236 74 XX XX XX"
            leftIcon={<Phone size={18} className="text-neutral-400" />}
            required
            autoComplete="tel"
            disabled={isPending}
          />
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 border-none shadow-md transition-all font-medium tracking-wide mt-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <div className="h-10 w-24 -ml-4 flex items-center justify-center">
                <DotLottieReact src="/images/chargementloader.lottie" loop autoplay />
              </div>
              <span>Traitement...</span>
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              {method === "email" ? "Envoyer le lien" : "Recevoir un code OTP"}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
