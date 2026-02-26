import { createHmac } from "crypto";

// ---------------------------------------------------------------------------
// Orange Money RCA — Payment Service
//
// Docs: Orange Money API RCA uses USSD push payments.
// In production: ORANGE_MONEY_CLIENT_ID + ORANGE_MONEY_CLIENT_SECRET required.
// If env vars are missing → returns a deterministic mock response.
// ---------------------------------------------------------------------------

export interface OrangeInitiatePaymentParams {
  phone: string;       // Recipient phone (MSISDN) — e.g. "23674143434"
  amount: number;      // Amount in FCFA
  reference: string;   // Internal reference KWT-{ts}-{rand}
  description?: string;
}

export interface OrangeInitiatePaymentResponse {
  success: boolean;
  reference: string;
  transactionId?: string;
  payToken?: string;
  status: "pending" | "failed";
  message: string;
  mock: boolean;
}

export interface OrangeStatusResponse {
  reference: string;
  transactionId?: string;
  status: "pending" | "completed" | "failed";
  amount?: number;
  mock: boolean;
}

/**
 * Initiate an Orange Money RCA payment (USSD push).
 * The customer receives a USSD prompt on their phone to confirm.
 */
export async function initiateOrangePayment(
  params: OrangeInitiatePaymentParams,
): Promise<OrangeInitiatePaymentResponse> {
  const clientId = process.env.ORANGE_MONEY_CLIENT_ID;
  const clientSecret = process.env.ORANGE_MONEY_CLIENT_SECRET;
  const merchantKey = process.env.ORANGE_MONEY_MERCHANT_KEY;

  // MOCK MODE — env vars not set
  if (!clientId || !clientSecret || !merchantKey) {
    console.warn(
      "[OrangeMoney] Running in MOCK mode — ORANGE_MONEY_CLIENT_ID not set.",
    );
    return {
      success: true,
      reference: params.reference,
      transactionId: `OM-MOCK-${Date.now()}`,
      payToken: `tok_mock_${Math.random().toString(36).slice(2, 11)}`,
      status: "pending",
      message: "Paiement initie (mode simulation). Aucune transaction reelle effectuee.",
      mock: true,
    };
  }

  try {
    // Step 1: Get access token
    const tokenRes = await fetch(
      "https://api.orange.com/oauth/v3/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      },
    );

    if (!tokenRes.ok) {
      throw new Error(`Orange token error: ${tokenRes.status}`);
    }

    const tokenData = await tokenRes.json() as { access_token: string };

    // Step 2: Initiate payment
    const paymentRes = await fetch(
      "https://api.orange.com/orange-money-webpay/rca/v1/webpayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          merchant_key: merchantKey,
          currency: "XAF",
          order_id: params.reference,
          amount: params.amount,
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payment?ref=${params.reference}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payment?cancelled=1`,
          notif_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
          lang: "fr",
          reference: params.reference,
        }),
      },
    );

    if (!paymentRes.ok) {
      throw new Error(`Orange payment error: ${paymentRes.status}`);
    }

    const paymentData = await paymentRes.json() as {
      pay_token?: string;
      status?: string;
    };

    return {
      success: true,
      reference: params.reference,
      payToken: paymentData.pay_token,
      status: "pending",
      message: "Validation attendue sur votre telephone Orange Money.",
      mock: false,
    };
  } catch (error) {
    console.error("[OrangeMoney] initiatePayment error:", error);
    return {
      success: false,
      reference: params.reference,
      status: "failed",
      message: "Erreur lors de la communication avec Orange Money. Reessayez.",
      mock: false,
    };
  }
}

/**
 * Check the status of an Orange Money payment.
 */
export async function checkOrangePaymentStatus(
  reference: string,
): Promise<OrangeStatusResponse> {
  const clientId = process.env.ORANGE_MONEY_CLIENT_ID;
  const clientSecret = process.env.ORANGE_MONEY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    // Mock: return "pending" to simulate waiting
    return {
      reference,
      status: "pending",
      mock: true,
    };
  }

  try {
    const tokenRes = await fetch("https://api.orange.com/oauth/v3/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    const { access_token } = await tokenRes.json() as { access_token: string };

    const statusRes = await fetch(
      `https://api.orange.com/orange-money-webpay/rca/v1/orderstatus?order_id=${reference}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    const statusData = await statusRes.json() as { status?: string; txnid?: string; amount?: number };

    const mapped =
      statusData.status === "SUCCESS"
        ? "completed"
        : statusData.status === "FAILED"
          ? "failed"
          : "pending";

    return {
      reference,
      transactionId: statusData.txnid,
      status: mapped,
      amount: statusData.amount,
      mock: false,
    };
  } catch (error) {
    console.error("[OrangeMoney] checkStatus error:", error);
    return { reference, status: "pending", mock: false };
  }
}

/**
 * Verify the HMAC-SHA256 signature of an Orange Money webhook.
 */
export function verifyOrangeWebhookSignature(
  rawBody: string,
  signature: string,
): boolean {
  const secret = process.env.ORANGE_MONEY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[OrangeMoney] ORANGE_MONEY_WEBHOOK_SECRET not set.");
    return false;
  }
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  // Constant-time comparison to prevent timing attacks
  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  let mismatch = 0;
  for (let i = 0; i < sigBuf.length; i++) {
    mismatch |= sigBuf[i]! ^ expBuf[i]!;
  }
  return mismatch === 0;
}
