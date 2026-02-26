"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useAuthContext } from "@/components/providers/auth-provider";

// ---------------------------------------------------------------------------
// usePremium
// ---------------------------------------------------------------------------
// Checks whether the current user has an active Premium subscription.
// Returns:
//   isPremium      — true if subscription_paid AND expiry_date > now
//   daysLeft       — calendar days remaining, or null if not premium
//   isExpiringSoon — true if <= 7 days left
// ---------------------------------------------------------------------------
interface PremiumState {
  isPremium: boolean;
  daysLeft: number | null;
  isExpiringSoon: boolean;
  isLoading: boolean;
}

export function usePremium(): PremiumState {
  const { user, isLoading: authLoading } = useAuthContext();
  const [state, setState] = useState<PremiumState>({
    isPremium: false,
    daysLeft: null,
    isExpiringSoon: false,
    isLoading: true,
  });

  useEffect(() => {
    // Still waiting for auth to resolve
    if (authLoading) return;

    // Not logged in — definitely not premium
    if (!user) {
      setState({ isPremium: false, daysLeft: null, isExpiringSoon: false, isLoading: false });
      return;
    }

    const supabase = createClient();

    supabase
      .from("profiles")
      .select("subscription_paid, expiry_date")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (!data || !data.subscription_paid || !data.expiry_date) {
          setState({ isPremium: false, daysLeft: null, isExpiringSoon: false, isLoading: false });
          return;
        }

        const now = new Date();
        const expiry = new Date(data.expiry_date);

        if (expiry <= now) {
          // Subscription expired
          setState({ isPremium: false, daysLeft: 0, isExpiringSoon: false, isLoading: false });
          return;
        }

        const msLeft = expiry.getTime() - now.getTime();
        const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
        const isExpiringSoon = daysLeft <= 7;

        setState({ isPremium: true, daysLeft, isExpiringSoon, isLoading: false });
      });
  }, [user, authLoading]);

  return state;
}
