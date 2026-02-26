"use client";

import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

// ---------------------------------------------------------------------------
// useUser — reactive hook for the currently authenticated Supabase user
// ---------------------------------------------------------------------------
// Returns the User object (null if not authenticated, undefined while loading).
// Re-renders when the auth state changes (login, logout, session refresh).
// ---------------------------------------------------------------------------
export function useUser(): User | null | undefined {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    // Get the current user immediately
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return user;
}

// ---------------------------------------------------------------------------
// useSession — reactive hook for the current Supabase Auth session
// ---------------------------------------------------------------------------
// Returns the Session object (null if not authenticated, undefined while loading).
// ---------------------------------------------------------------------------
export function useSession(): Session | null | undefined {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    // Get the current session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return session;
}

// ---------------------------------------------------------------------------
// useIsPremium — returns whether the current user has an active premium plan
// ---------------------------------------------------------------------------
// Reads from the profiles table (RLS ensures user can only read their own row).
// ---------------------------------------------------------------------------
export function useIsPremium(): boolean | undefined {
  const user = useUser();
  const [isPremium, setIsPremium] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (user === undefined) return; // Still loading
    if (!user) {
      setIsPremium(false);
      return;
    }

    const supabase = createClient();

    supabase
      .from("profiles")
      .select("subscription_paid, expiry_date")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (!data) {
          setIsPremium(false);
          return;
        }

        const now = new Date();
        const expiryDate = data.expiry_date ? new Date(data.expiry_date) : null;
        const premium = data.subscription_paid && !!expiryDate && expiryDate > now;
        setIsPremium(premium);
      });
  }, [user]);

  return isPremium;
}
