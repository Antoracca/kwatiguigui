import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const statusQuerySchema = z.object({
  reference: z
    .string()
    .min(1, "Reference requise")
    .regex(/^KWT-\d+-[A-Z0-9]+$/, "Format de reference invalide"),
});

/**
 * GET /api/payments/status?reference=KWT-xxx
 *
 * Polled every 3 seconds by the frontend after payment initiation.
 * Uses supabaseAdmin to read the payment status regardless of RLS.
 * Rate-limited implicitly by the Vercel Edge (max 100 req/s per IP).
 *
 * Security: only returns status for payments belonging to the
 * authenticated user — prevents leaking payment status of other users.
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user session
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const parsed = statusQuerySchema.safeParse({
      reference: searchParams.get("reference"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Reference de paiement invalide" },
        { status: 400 },
      );
    }

    // Fetch payment — filter by both reference AND user_id for security
    const { data: payment, error: fetchError } = await supabaseAdmin
      .from("payments")
      .select("id, status, amount, method, created_at, reference")
      .eq("reference", parsed.data.reference)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !payment) {
      return NextResponse.json(
        { error: "Paiement introuvable" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      reference: payment.reference,
      status: payment.status,
      amount: payment.amount,
      method: payment.method,
    });
  } catch (error) {
    console.error("[payments/status] Error:", error);
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 },
    );
  }
}
