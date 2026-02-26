import { NextResponse, type NextRequest } from "next/server";

import { initiatePaymentSchema } from "@/lib/validations/payments";
import { generatePaymentReference } from "@/lib/utils";

/**
 * POST /api/payments/initiate — Start a payment via Orange Money or Telecel Money.
 *
 * Protected: requires authenticated user session.
 * Flow:
 * 1. Validate input (plan, method, phone number)
 * 2. Create payment record in DB with status "pending"
 * 3. Call operator API (Orange Money or Telecel Money)
 * 4. Return payment reference for tracking
 *
 * The status is NEVER set to "completed" here.
 * Only the webhook handler can set status to "completed".
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = initiatePaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: "Donnees de paiement invalides",
            code: "VALIDATION_ERROR",
            status: 400,
            details: parsed.error.flatten(),
          },
        },
        { status: 400 },
      );
    }

    // TODO: Check user is authenticated
    // TODO: Generate payment reference
    const reference = generatePaymentReference();

    // TODO: Create payment record in Supabase with status "pending"
    // TODO: Call Orange Money or Telecel Money API
    // TODO: Return reference for polling

    return NextResponse.json({
      data: {
        reference,
        status: "pending",
        message: "Paiement initie. Veuillez confirmer sur votre telephone.",
      },
    });
  } catch {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Erreur lors de l'initiation du paiement",
          code: "PAYMENT_ERROR",
          status: 500,
        },
      },
      { status: 500 },
    );
  }
}
