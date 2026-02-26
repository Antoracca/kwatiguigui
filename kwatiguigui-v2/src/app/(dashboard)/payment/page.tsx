import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { PaymentClient } from "@/components/dashboard/payment-client";

export const metadata: Metadata = {
  title: "Abonnement Premium — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

export default async function PaymentPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("whatsapp, subscription_paid, expiry_date")
    .eq("id", user.id)
    .single();

  const { data: payments } = await supabase
    .from("payments")
    .select("id, amount, method, status, reference, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const isPremium =
    (profile?.subscription_paid ?? false) &&
    !!profile?.expiry_date &&
    new Date(profile.expiry_date) > new Date();

  return (
    <PaymentClient
      userId={user.id}
      isPremium={isPremium}
      expiryDate={profile?.expiry_date ?? null}
      whatsapp={profile?.whatsapp ?? null}
      paymentHistory={payments ?? []}
    />
  );
}
