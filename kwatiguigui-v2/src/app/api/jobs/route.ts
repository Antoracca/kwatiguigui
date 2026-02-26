import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { maskWhatsApp } from "@/lib/utils";
import { searchJobsSchema } from "@/lib/validations/jobs";

/**
 * GET /api/jobs — Search and list published job postings.
 *
 * Public endpoint with optional authentication.
 * Sensitive fields (whatsapp) are masked for non-premium viewers.
 * Results are paginated.
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

    const {
      query,
      region,
      jobType,
      userType,
      page,
      perPage,
      sortBy,
      sortOrder,
    } = parsed.data;

    const supabase = await createClient();
    const offset = (page - 1) * perPage;
    const now = new Date().toISOString();

    // Build query
    let dbQuery = supabase
      .from("jobs")
      .select(
        "id, first_name, age, whatsapp, region, city, neighborhood, job_type, experience, user_type, is_active, publication_status, created_at, expires_at",
        { count: "exact" },
      )
      .eq("is_active", true)
      .eq("publication_status", "published")
      .gt("expires_at", now);

    if (query) {
      dbQuery = dbQuery.or(
        `first_name.ilike.%${query}%,job_type.ilike.%${query}%,city.ilike.%${query}%,region.ilike.%${query}%`,
      );
    }
    if (region) dbQuery = dbQuery.eq("region", region);
    if (jobType) dbQuery = dbQuery.eq("job_type", jobType);
    if (userType) dbQuery = dbQuery.eq("user_type", userType);

    const { data: jobs, count, error } = await dbQuery
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(offset, offset + perPage - 1);

    if (error) {
      console.error("[GET /api/jobs] Supabase error:", error.message);
      return NextResponse.json(
        { data: null, error: { message: "Erreur base de donnees", code: "DB_ERROR", status: 500 } },
        { status: 500 },
      );
    }

    // Check if the requesting user is premium
    let requesterIsPremium = false;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_paid, expiry_date")
        .eq("id", user.id)
        .single();

      if (profile?.subscription_paid && profile.expiry_date) {
        requesterIsPremium = new Date(profile.expiry_date) > new Date();
      }
    }

    // Mask whatsapp for non-premium viewers
    const sanitizedJobs = (jobs ?? []).map((job) => ({
      id: job.id,
      firstName: job.first_name,
      age: job.age,
      whatsapp: requesterIsPremium ? job.whatsapp : maskWhatsApp(job.whatsapp ?? ""),
      region: job.region,
      city: job.city,
      neighborhood: job.neighborhood,
      jobType: job.job_type,
      experience: job.experience,
      userType: job.user_type,
      isActive: job.is_active,
      publicationStatus: job.publication_status,
      createdAt: job.created_at,
      expiresAt: job.expires_at,
      contactVisible: requesterIsPremium,
    }));

    const total = count ?? 0;
    const totalPages = Math.ceil(total / perPage);

    return NextResponse.json(
      {
        data: sanitizedJobs,
        pagination: {
          page,
          perPage,
          total,
          totalPages,
        },
      },
      {
        headers: {
          // Short cache — jobs change frequently
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15",
        },
      },
    );
  } catch (err) {
    console.error("[GET /api/jobs] Unexpected error:", err);
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
