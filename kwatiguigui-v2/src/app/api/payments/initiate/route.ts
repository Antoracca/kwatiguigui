import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generatePaymentReference } from "@/lib/utils";
import { PRICING } from "@/lib/constants";
import {
  initiateOrangePayment,
} from "@/lib/payments/orange-money";
import {
  initiateTelecelPayment,
} from "@/lib/payments/telecel-money";

const initiateSchema = z.object({
  userId: z.string().uuid("userId invalide"),
  plan: z.enum(["monthly", "biannual", "annual"]),
  method: z.enum(["orange", "telecel"]),
  phoneNumber: z
    .string()
    .min(8, "Numero trop court")
    .regex(/^\+?\d[\d\s-]{6,}$/, "Format de numero invalide"),
  amount: z.number().positive().optional(),
});

const PLAN_AMOUNTS: Record<"monthly" | "biannual" | "annual", number> = {
  monthly: PRICING.PREMIUM_MONTHLY,
  biannual: PRICING.PREMIUM_BIANNUAL,
  annual: PRICING.PREMIUM_ANNUAL,
};

const PLAN_DAYS: Record<"monthly" | "biannual" | "annual", number> = {
  monthly: 30,
  biannual: 183,
  annual: 365,
};

/**
 * POST /api/payments/initiate
 *
 * Security:
 * - Requires authenticated Supabase session (httpOnly cookie).
 * - userId in body must match the authenticated user (prevent spoofing).
 * - Amount is derived server-side from the plan, NOT trusted from client.
 * - Status is NEVER set to "completed" here — only webhooks can do that.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify user session
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    // 2. Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Corps de requete invalide" }, { status: 400 });
    }

    const parsed = initiateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Parametres invalides", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // 3. Security: userId must match authenticated user
    if (parsed.data.userId !== user.id) {
      return NextResponse.json(
        { error: "Identite non autorisee" },
        { status: 403 },
      );
    }

    // 4. Derive amount server-side (NEVER trust client amount)
    const amount = PLAN_AMOUNTS[parsed.data.plan];
    const durationDays = PLAN_DAYS[parsed.data.plan];

    // 5. Generate reference
    const reference = generatePaymentReference();

    // 6. Insert payment record with status "pending"
    const { error: insertError } = await supabaseAdmin.from("payments").insert({
      user_id: user.id,
      amount,
      method: parsed.data.method,
      status: "pending",
      reference,
    });

    if (insertError) {
      console.error("[payments/initiate] DB insert error:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de la creation du paiement. Reessayez." },
        { status: 500 },
      );
    }

    // 7. Call operator API
    const phone = parsed.data.phoneNumber.replace(/\D/g, "");
    let operatorResponse;

    if (parsed.data.method === "orange") {
      operatorResponse = await initiateOrangePayment({
        phone,
        amount,
        reference,
        description: `Abonnement KWATIGUIGUI Premium (${durationDays} jours)`,
      });
    } else {
      operatorResponse = await initiateTelecelPayment({
        phone,
        amount,
        reference,
        description: `Abonnement KWATIGUIGUI Premium (${durationDays} jours)`,
      });
    }

    if (!operatorResponse.success) {
      // Update payment to failed
      await supabaseAdmin
        .from("payments")
        .update({ status: "failed" })
        .eq("reference", reference);

      return NextResponse.json(
        { error: operatorResponse.message },
        { status: 502 },
      );
    }

    // 8. Store transactionId if available
    if (operatorResponse.transactionId) {
      await supabaseAdmin
        .from("payments")
        .update({ transaction_id: operatorResponse.transactionId })
        .eq("reference", reference);
    }

    return NextResponse.json({
      reference,
      status: "pending",
      mock: operatorResponse.mock,
      instructions: operatorResponse.message,
    });
  } catch (error) {
    console.error("[payments/initiate] Unexpected error:", error);
    return NextResponse.json(
      { error: "Erreur interne. Veuillez reessayer." },
      { status: 500 },
    );
  }
}
