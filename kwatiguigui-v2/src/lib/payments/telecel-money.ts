import { createHmac } from "crypto";

// ---------------------------------------------------------------------------
// Telecel Money RCA — Payment Service
// ---------------------------------------------------------------------------

export interface TelecelInitiatePaymentParams {
  phone: string;
  amount: number;
  reference: string;
  description?: string;
}

export interface TelecelInitiatePaymentResponse {
  success: boolean;
  reference: string;
  transactionId?: string;
  status: "pending" | "failed";
  message: string;
  mock: boolean;
}

export interface TelecelStatusResponse {
  reference: string;
  transactionId?: string;
  status: "pending" | "completed" | "failed";
  amount?: number;
  mock: boolean;
}

/**
 * Initiate a Telecel Money RCA payment.
 * Falls back to mock mode if TELECEL_MONEY_API_KEY is not set.
 */
export async function initiateTelecelPayment(
  params: TelecelInitiatePaymentParams,
): Promise<TelecelInitiatePaymentResponse> {
  const apiKey = process.env.TELECEL_MONEY_API_KEY;
  const merchantId = process.env.TELECEL_MONEY_MERCHANT_ID;

  if (!apiKey || !merchantId) {
    console.warn(
      "[TelecelMoney] Running in MOCK mode — TELECEL_MONEY_API_KEY not set.",
    );
    return {
      success: true,
      reference: params.reference,
      transactionId: `TM-MOCK-${Date.now()}`,
      status: "pending",
      message: "Paiement initie (mode simulation). Aucune transaction reelle effectuee.",
      mock: true,
    };
  }

  try {
    // Generate HMAC signature for the request
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const payload = JSON.stringify({
      merchant_id: merchantId,
      phone: params.phone.replace(/\D/g, ""),
      amount: params.amount,
      currency: "XAF",
      reference: params.reference,
      description: params.description ?? "Abonnement KWATIGUIGUI Premium",
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
      timestamp,
    });

    const signature = createHmac("sha256", apiKey)
      .update(payload)
      .digest("hex");

    const res = await fetch(
      "https://api.telecel.cf/v1/payment/initiate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
          "X-Signature": signature,
          "X-Timestamp": timestamp,
        },
        body: payload,
      },
    );

    if (!res.ok) {
      throw new Error(`Telecel payment error: ${res.status}`);
    }

    const data = await res.json() as { transaction_id?: string; status?: string };

    return {
      success: true,
      reference: params.reference,
      transactionId: data.transaction_id,
      status: "pending",
      message: "Validation attendue sur votre telephone Telecel Money.",
      mock: false,
    };
  } catch (error) {
    console.error("[TelecelMoney] initiatePayment error:", error);
    return {
      success: false,
      reference: params.reference,
      status: "failed",
      message: "Erreur lors de la communication avec Telecel Money. Reessayez.",
      mock: false,
    };
  }
}

/**
 * Check the status of a Telecel Money payment.
 */
export async function checkTelecelPaymentStatus(
  reference: string,
): Promise<TelecelStatusResponse> {
  const apiKey = process.env.TELECEL_MONEY_API_KEY;

  if (!apiKey) {
    return { reference, status: "pending", mock: true };
  }

  try {
    const res = await fetch(
      `https://api.telecel.cf/v1/payment/status?reference=${reference}`,
      {
        headers: { "X-API-Key": apiKey },
      },
    );

    const data = await res.json() as { status?: string; transaction_id?: string; amount?: number };

    const mapped =
      data.status === "completed"
        ? "completed"
        : data.status === "failed"
          ? "failed"
          : "pending";

    return {
      reference,
      transactionId: data.transaction_id,
      status: mapped,
      amount: data.amount,
      mock: false,
    };
  } catch {
    return { reference, status: "pending", mock: false };
  }
}

/**
 * Verify the HMAC-SHA256 signature of a Telecel Money webhook.
 * Telecel uses header 'X-Telecel-Signature'.
 */
export function verifyTelecelWebhookSignature(
  rawBody: string,
  signature: string,
): boolean {
  const secret = process.env.TELECEL_MONEY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[TelecelMoney] TELECEL_MONEY_WEBHOOK_SECRET not set.");
    return false;
  }
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  let mismatch = 0;
  for (let i = 0; i < sigBuf.length; i++) {
    mismatch |= sigBuf[i]! ^ expBuf[i]!;
  }
  return mismatch === 0;
}
