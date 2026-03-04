"use client";

import { useState } from "react";
import type { Provider } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { FullScreenLoader } from "@/components/ui/full-screen-loader";

// ---------------------------------------------------------------------------
// SVG Icons — couleurs officielles de chaque provider
// ---------------------------------------------------------------------------
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4 24H0V12.6h11.4V24z" fill="#00a4ef" />
    <path d="M24 24H12.6V12.6H24V24z" fill="#ffb900" />
    <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#f25022" />
    <path d="M24 11.4H12.6V0H24v11.4z" fill="#7fba00" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 384 512" className="h-5 w-5 text-black dark:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.96 3.63 9.08 8.4 9.82v-6.94H7.9V12h2.53V9.52c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.84h-2.33v6.94c4.77-.74 8.4-4.86 8.4-9.82 0-5.5-4.46-9.96-9.96-9.96z" fill="#1877F2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Liste des providers — dans l'ordre d'affichage
// ---------------------------------------------------------------------------
type ProviderConfig = {
  id: Provider;
  name: string;
  icon: React.ComponentType;
  enabled: boolean; // passer à false si non encore configuré dans Supabase
};

const PROVIDERS: ProviderConfig[] = [
  { id: "google",    name: "Google",    icon: GoogleIcon,    enabled: true  },
  { id: "azure",     name: "Microsoft", icon: MicrosoftIcon, enabled: false },
  { id: "facebook",  name: "Facebook",  icon: FacebookIcon,  enabled: false },
  { id: "apple",     name: "Apple",     icon: AppleIcon,     enabled: false },
  { id: "linkedin_oidc", name: "LinkedIn", icon: LinkedInIcon, enabled: false },
];


function normalizeNextPath(value: string | null): string {
  if (!value) return "/dashboard";
  if (!value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
}
// ---------------------------------------------------------------------------
// SocialAuth
// ---------------------------------------------------------------------------
export function SocialAuth() {
  const [loading, setLoading] = useState<Provider | null>(null);
  const [oauthError, setOauthError] = useState<string | null>(null);

  async function handleOAuth(provider: Provider) {
    if (loading) return;
    setOauthError(null);
    setLoading(provider);

    const supabase = createClient();

    const query = new URLSearchParams(window.location.search);
    const next = normalizeNextPath(query.get("callbackUrl"));
    const callbackUrl = new URL("/api/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", next);
    sessionStorage.setItem("kwt-post-oauth-next", next);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // Supabase redirige ici après authentification
        redirectTo: callbackUrl.toString(),
        // Demander l'accès à l'email (nécessaire pour créer le profil)
        scopes: provider === "google" ? "openid email profile" : undefined,
        // Forcer l'affichage du sélecteur de compte Google
        queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
      },
    });

    if (error) {
      sessionStorage.removeItem("kwt-post-oauth-next");
      setOauthError(`Erreur ${error.message}`);
      setLoading(null);
    }
    // En cas de succès, Supabase redirige automatiquement — pas besoin de setLoading(null)
  }

  return (
    <>
    <FullScreenLoader
      isVisible={loading !== null}
      text={loading ? `Connexion avec ${PROVIDERS.find(p => p.id === loading)?.name ?? loading}...` : ""}
    />
    <div className="mt-8">
      {/* Séparateur */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
        </div>
        <div className="relative flex justify-center text-body-sm">
          <span className="bg-white px-4 text-neutral-500 dark:bg-neutral-950 font-medium tracking-wide">
            Ou continuer avec
          </span>
        </div>
      </div>

      {/* Erreur OAuth globale */}
      {oauthError && (
        <p className="mt-3 text-center text-body-xs text-error-600 dark:text-error-400">
          {oauthError}
        </p>
      )}

      {/* Grille des boutons */}
      <div className="mt-6 grid grid-cols-5 gap-3">
        {PROVIDERS.map(({ id, name, icon: Icon, enabled }) => (
          <div key={id} className="relative group">
            <Button
              variant="outline"
              type="button"
              onClick={() => enabled && handleOAuth(id)}
              disabled={!enabled || loading !== null}
              aria-label={`Continuer avec ${name}`}
              className={[
                "w-full h-12 flex items-center justify-center",
                "bg-white dark:bg-neutral-900",
                "border-neutral-200 dark:border-neutral-800",
                "hover:bg-neutral-50 dark:hover:bg-neutral-800",
                "hover:border-neutral-300 dark:hover:border-neutral-700",
                "transition-all shadow-sm hover:shadow",
                !enabled && "opacity-40 cursor-not-allowed",
                loading === id && "opacity-70 cursor-wait",
              ].filter(Boolean).join(" ")}
            >
              {loading === id ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
              ) : (
                <Icon />
              )}
            </Button>

            {/* Tooltip au survol */}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:bg-neutral-700 whitespace-nowrap">
              {enabled ? name : `${name} (bientôt)`}
              <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
