import { createHmac } from "crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * POST /api/payments/webhook — Receive payment notifications from operators.
 *
 * CRITICAL SECURITY:
 * - Verify HMAC signature on every webhook
 * - Never trust the payload without signature verification
 * - Log all webhooks for audit trail
 * - Only this handler can set payment status to "completed"
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-webhook-signature") ?? "";

    // Determine the operator from a custom header or URL param
    const operator = request.headers.get("x-operator") ?? "unknown";

    // Verify HMAC signature
    let secret: string | undefined;
    if (operator === "orange") {
      secret = process.env.ORANGE_MONEY_WEBHOOK_SECRET;
    } else if (operator === "telecel") {
      secret = process.env.TELECEL_MONEY_WEBHOOK_SECRET;
    }

    if (!secret) {
      console.error(`[WEBHOOK] Unknown operator or missing secret: ${operator}`);
      return NextResponse.json(
        { error: "Operateur inconnu" },
        { status: 400 },
      );
    }

    // HMAC-SHA256 verification
    const expectedSignature = createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("[WEBHOOK] Invalid HMAC signature");
      return NextResponse.json(
        { error: "Signature invalide" },
        { status: 401 },
      );
    }

    // Parse and validate payload
    const payload = JSON.parse(body) as Record<string, unknown>;

    // TODO: Log webhook to webhooks table for audit
    // TODO: Find the payment record by reference
    // TODO: Update payment status based on operator response
    // TODO: If "completed", activate user subscription
    // TODO: Send confirmation notification

    console.error("[WEBHOOK] Received valid webhook", {
      operator,
      reference: payload["reference"] ?? payload["order_id"],
    });

    return NextResponse.json({ received: true });
  } catch {
    console.error("[WEBHOOK] Error processing webhook");
    return NextResponse.json(
      { error: "Erreur de traitement" },
      { status: 500 },
    );
  }
}
