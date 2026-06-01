"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

// ---------------------------------------------------------------------------
// Context type
// ---------------------------------------------------------------------------
interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  isLoading: true,
});

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;
    const consumePendingOAuthNext = (): string | null => {
      try {
        const raw = sessionStorage.getItem("kwt-post-oauth-next");
        if (!raw) return null;
        sessionStorage.removeItem("kwt-post-oauth-next");
        if (!raw.startsWith("/") || raw.startsWith("//")) return null;
        return raw;
      } catch {
        return null;
      }
    };

    const redirectIfPendingOAuthNext = () => {
      const next = consumePendingOAuthNext();
      if (!next) return;
      // Ne JAMAIS court-circuiter l'onboarding : si le serveur a placé
      // l'utilisateur sur /onboarding (profil incomplet), on l'y laisse.
      // Sinon on provoquait un aller-retour /onboarding → /dashboard visible
      // (flash de 2 s) au lieu d'enchaîner directement sur l'onboarding.
      if (window.location.pathname.startsWith("/onboarding")) return;
      const current = `${window.location.pathname}${window.location.search}`;
      if (current !== next) {
        window.location.replace(next);
      }
    };
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    // Fallback: if OAuth lands on a non-callback URL with ?code=, forward to callback route.
    if (code && !url.pathname.startsWith("/api/auth/callback")) {
      const nextRaw =
        url.searchParams.get("next") ??
        url.searchParams.get("callbackUrl") ??
        "/dashboard";
      const next =
        nextRaw.startsWith("/") && !nextRaw.startsWith("//")
          ? nextRaw
          : "/dashboard";
      const callbackUrl = new URL("/api/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("code", code);
      callbackUrl.searchParams.set("next", next);
      window.location.replace(callbackUrl.toString());
      return;
    }

    const bootstrapAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (session?.user) {
        setSession(session);
        setUser(session.user);
        setIsLoading(false);
        redirectIfPendingOAuthNext();
        return;
      }

      // Fallback to server-known auth via cookies (covers OAuth callback race conditions).
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!cancelled && response.ok) {
          const payload = (await response.json()) as { user: User | null };
          setUser(payload.user ?? null);
          if (payload.user) {
            redirectIfPendingOAuthNext();
          }
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void bootstrapAuth();

    // Subscribe to subsequent auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (session?.user) {
        redirectIfPendingOAuthNext();
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useAuthContext(): AuthContextValue {
  return useContext(AuthContext);
}
