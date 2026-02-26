import { NextResponse, type NextRequest } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { PRICING } from "@/lib/constants";
import {
  verifyOrangeWebhookSignature,
} from "@/lib/payments/orange-money";
import {
  verifyTelecelWebhookSignature,
} from "@/lib/payments/telecel-money";

/**
 * POST /api/payments/webhook
 *
 * Security architecture:
 * - Reads raw body as text (required for HMAC signature verification).
 * - Verifies HMAC-SHA256 before ANY database operations.
 * - Payment status "completed" is ONLY set here — NEVER in the initiate route.
 * - All webhooks are logged to the audit webhooks table.
 * - Returns HTTP 200 quickly to acknowledge receipt (operators retry on 5xx).
 */
export async function POST(request: NextRequest) {
  // Read raw body as text FIRST (before any parsing) for HMAC
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Body read error" }, { status: 400 });
  }

  const operator =
    request.headers.get("x-operator") ??
    request.nextUrl.searchParams.get("operator") ??
    "unknown";

  // Determine signature header by operator
  const orangeSig = request.headers.get("x-orange-signature") ?? "";
  const telecelSig = request.headers.get("x-telecel-signature") ?? "";

  // Log webhook to audit table (best-effort — never block on this)
  const logWebhook = async (status: "valid" | "invalid") => {
    try {
      await supabaseAdmin.from("webhooks").insert({
        event: `payment.${operator}.${status}`,
        payload: rawBody.slice(0, 4000), // Trim large payloads
        signature: operator === "orange" ? orangeSig : telecelSig,
        processed: status === "valid",
      });
    } catch (logErr) {
      console.error("[webhook] Failed to log webhook:", logErr);
    }
  };

  // Verify signature
  let signatureValid = false;
  if (operator === "orange") {
    signatureValid = verifyOrangeWebhookSignature(rawBody, orangeSig);
  } else if (operator === "telecel") {
    signatureValid = verifyTelecelWebhookSignature(rawBody, telecelSig);
  } else {
    console.error("[webhook] Unknown operator:", operator);
    await logWebhook("invalid");
    return NextResponse.json({ error: "Operateur inconnu" }, { status: 400 });
  }

  if (!signatureValid) {
    console.error(`[webhook] Invalid HMAC signature for operator: ${operator}`);
    await logWebhook("invalid");
    // Return 401 — operator will stop retrying for bad signature
    return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
  }

  // Parse payload
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    await logWebhook("invalid");
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  await logWebhook("valid");

  // Extract reference and status
  const reference = (
    payload["reference"] ??
    payload["order_id"] ??
    payload["kwt_reference"]
  ) as string | undefined;

  const rawStatus = (
    payload["status"] ??
    payload["transaction_status"]
  ) as string | undefined;

  if (!reference || !rawStatus) {
    console.error("[webhook] Missing reference or status in payload");
    return NextResponse.json({ received: true }); // Acknowledge — don't retry
  }

  // Normalize status
  const isSuccess =
    rawStatus === "SUCCESS" ||
    rawStatus === "completed" ||
    rawStatus === "COMPLETED";
  const isFailed =
    rawStatus === "FAILED" ||
    rawStatus === "failed" ||
    rawStatus === "CANCELLED";

  if (!isSuccess && !isFailed) {
    // Intermediate state — acknowledge without DB update
    return NextResponse.json({ received: true });
  }

  // Find payment record
  const { data: payment, error: fetchError } = await supabaseAdmin
    .from("payments")
    .select("id, user_id, amount, status")
    .eq("reference", reference)
    .single();

  if (fetchError || !payment) {
    console.error("[webhook] Payment not found for reference:", reference);
    return NextResponse.json({ received: true }); // Don't retry — reference not found
  }

  // Idempotency: skip if already processed
  if (payment.status === "completed" || payment.status === "failed") {
    return NextResponse.json({ received: true, already_processed: true });
  }

  const newStatus = isSuccess ? "completed" : "failed";

  // Update payment status
  const { error: updateError } = await supabaseAdmin
    .from("payments")
    .update({
      status: newStatus,
      transaction_id:
        (payload["txnid"] ?? payload["transaction_id"]) as string | undefined,
    })
    .eq("id", payment.id);

  if (updateError) {
    console.error("[webhook] Failed to update payment:", updateError);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }

  // If payment completed — activate subscription
  if (isSuccess && payment.user_id) {
    const amount = payment.amount ?? 0;

    // Calculate expiry based on amount
    let daysToAdd = 30;
    if (amount >= PRICING.PREMIUM_ANNUAL) daysToAdd = 365;
    else if (amount >= PRICING.PREMIUM_BIANNUAL) daysToAdd = 183;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysToAdd);

    await supabaseAdmin
      .from("profiles")
      .update({
        subscription_paid: true,
        expiry_date: expiryDate.toISOString(),
      })
      .eq("id", payment.user_id);

    console.log(
      `[webhook] Subscription activated for user ${payment.user_id} until ${expiryDate.toISOString()}`,
    );
  }

  return NextResponse.json({ received: true, status: newStatus });
}
