import { NextResponse, type NextRequest } from "next/server";

import { searchJobsSchema } from "@/lib/validations/jobs";

/**
 * GET /api/jobs — Search and list job postings.
 *
 * Public endpoint. Sensitive fields (whatsapp, phone) are
 * masked for non-premium users.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const params = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const parsed = searchJobsSchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: "Parametres de recherche invalides",
            code: "VALIDATION_ERROR",
            status: 400,
            details: parsed.error.flatten(),
          },
        },
        { status: 400 },
      );
    }

    // TODO: Query Supabase via server client with RLS
    // const supabase = await createClient();
    // const { data, count, error } = await supabase
    //   .from('jobs')
    //   .select('*', { count: 'exact' })
    //   .eq('is_active', true)
    //   .eq('publication_status', 'published')
    //   .order(parsed.data.sortBy, { ascending: parsed.data.sortOrder === 'asc' })
    //   .range(offset, offset + parsed.data.perPage - 1);

    return NextResponse.json({
      data: [],
      pagination: {
        page: parsed.data.page,
        perPage: parsed.data.perPage,
        total: 0,
        totalPages: 0,
      },
    });
  } catch {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Erreur interne du serveur",
          code: "INTERNAL_ERROR",
          status: 500,
        },
      },
      { status: 500 },
    );
  }
}
