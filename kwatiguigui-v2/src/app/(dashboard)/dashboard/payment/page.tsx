import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { PaymentClient } from "@/components/dashboard/payment-client";
import type { Database } from "@/types/database";

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

  const { data } = await supabase
    .from("profiles")
    .select("whatsapp, subscription_paid, expiry_date, user_type")
    .eq("id", user.id)
    .single();
  const profile = data as Database["public"]["Tables"]["profiles"]["Row"] | null;

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
      userType={(profile?.user_type as "seeker" | "employer" | "company") || "employer"}
      isPremium={isPremium}
      expiryDate={profile?.expiry_date ?? null}
      whatsapp={profile?.whatsapp ?? null}
      paymentHistory={payments ?? []}
    />
  );
}
