"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, AlertCircle } from "lucide-react";

import { adminLogin } from "@/lib/auth/admin-actions";
import type { ActionResult } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = { success: false };

export function AdminLoginForm() {
  const [state, action, isPending] = useActionState(adminLogin, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [totp, setTotp] = useState("");
  const [showTotp, setShowTotp] = useState(false);
  const totpRef = useRef<HTMLInputElement>(null);

  // Auto-show TOTP field after first failed attempt with TOTP-related error
  useEffect(() => {
    if (state.error?.includes("TOTP") || state.fieldErrors?.totpCode) {
      setShowTotp(true);
      setTimeout(() => totpRef.current?.focus(), 100);
    }
  }, [state]);

  // Auto-submit when 6 digits entered
  function handleTotpChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setTotp(value);
  }

  return (
    <form action={action} className="space-y-5">
      {/* Global error */}
      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-800 bg-red-950/50 p-4 text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="admin-email"
          className="mb-1.5 block text-sm font-medium text-neutral-300"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@kussala.org"
            className={[
              "block min-h-[48px] w-full rounded-xl border bg-neutral-800 pl-11 pr-4 text-sm text-white placeholder-neutral-600 transition-all",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-neutral-900",
              state.fieldErrors?.email
                ? "border-red-700"
                : "border-neutral-700 hover:border-neutral-600",
            ].join(" ")}
          />
        </div>
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs text-red-400">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="admin-password"
          className="mb-1.5 block text-sm font-medium text-neutral-300"
        >
          Mot de passe
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className={[
              "block min-h-[48px] w-full rounded-xl border bg-neutral-800 pl-11 pr-11 text-sm text-white placeholder-neutral-600 transition-all",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-neutral-900",
              state.fieldErrors?.password
                ? "border-red-700"
                : "border-neutral-700 hover:border-neutral-600",
            ].join(" ")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            aria-label={showPassword ? "Masquer" : "Afficher"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {state.fieldErrors?.password && (
          <p className="mt-1 text-xs text-red-400">{state.fieldErrors.password[0]}</p>
        )}
      </div>

      {/* TOTP field — always present for form submission but visually toggled */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="admin-totp"
            className="mb-1.5 block text-sm font-medium text-neutral-300"
          >
            Code d&apos;authentification (TOTP)
          </label>
          <button
            type="button"
            onClick={() => setShowTotp(!showTotp)}
            className="mb-1.5 text-xs text-neutral-500 hover:text-neutral-300"
          >
            {showTotp ? "Masquer" : "Afficher"}
          </button>
        </div>
        <div className={showTotp ? "block" : "hidden"}>
          <div className="relative">
            <ShieldCheck className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              ref={totpRef}
              id="admin-totp"
              name="totpCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoComplete="one-time-code"
              value={totp}
              onChange={handleTotpChange}
              placeholder="000000"
              className={[
                "block min-h-[48px] w-full rounded-xl border bg-neutral-800 pl-11 pr-4 text-center font-mono text-xl tracking-[0.5em] text-white placeholder-neutral-600 transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-neutral-900",
                state.fieldErrors?.totpCode
                  ? "border-red-700"
                  : "border-neutral-700 hover:border-neutral-600",
              ].join(" ")}
            />
          </div>
          {state.fieldErrors?.totpCode && (
            <p className="mt-1 text-xs text-red-400">
              {state.fieldErrors.totpCode[0]}
            </p>
          )}
          <p className="mt-1.5 text-xs text-neutral-600">
            Code a 6 chiffres depuis votre application d&apos;authentification (Google Authenticator, Authy...)
          </p>
        </div>
        {/* Hidden input when TOTP panel is collapsed — sends empty string,
            server will show TOTP error only if MFA is enabled */}
        {!showTotp && (
          <input type="hidden" name="totpCode" value={totp || "000000"} />
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-2 w-full"
        loading={isPending}
      >
        Se connecter
      </Button>
    </form>
  );
}
