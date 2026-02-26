import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const statusQuerySchema = z.object({
  reference: z.string().min(1, "Reference requise"),
});

/**
 * GET /api/payments/status?reference=KWT-xxx — Check payment status.
 *
 * Used by the frontend to poll payment status after initiation.
 * Returns: pending | completed | failed
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const parsed = statusQuerySchema.safeParse({
      reference: searchParams.get("reference"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: "Reference de paiement invalide",
            code: "VALIDATION_ERROR",
            status: 400,
          },
        },
        { status: 400 },
      );
    }

    // TODO: Query payment status from Supabase
    // const supabase = createAdminClient();
    // const { data } = await supabase
    //   .from('payments')
    //   .select('status, amount, method, created_at')
    //   .eq('reference', parsed.data.reference)
    //   .single();

    return NextResponse.json({
      data: {
        reference: parsed.data.reference,
        status: "pending",
        message: "Paiement en attente de confirmation",
      },
    });
  } catch {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Erreur lors de la verification du paiement",
          code: "INTERNAL_ERROR",
          status: 500,
        },
      },
      { status: 500 },
    );
  }
}
