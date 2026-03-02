import type { Metadata } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { AdminJobsModerationClient } from "@/components/admin/admin-jobs-moderation-client";

export const metadata: Metadata = {
  title: "Annonces — Admin KWATIGUIGUI",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

const PAGE_SIZE = 25;

export default async function AdminJobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status ?? "all";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  // Count pending for badge
  const { count: pendingCount } = await supabaseAdmin
    .from("jobs")
    .select("id", { count: "exact", head: true })
    .eq("publication_status", "pending");

  let query = supabaseAdmin
    .from("jobs")
    .select(
      `id, job_type, city, user_type, publication_status, is_active,
       created_at, expires_at,
       author:profiles!user_id(first_name)`,
      { count: "exact" },
    );

  if (statusFilter !== "all") {
    query = query.eq("publication_status", statusFilter as "draft" | "pending" | "published" | "rejected");
  }

  const { data: jobs, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <AdminJobsModerationClient
      jobs={(jobs ?? []).map((j: Record<string, unknown>) => ({
        ...(j as {
          id: string;
          job_type: string | null;
          city: string | null;
          user_type: string | null;
          publication_status: string | null;
          is_active: boolean | null;
          created_at: string | null;
          expires_at: string | null;
        }),
        author_name: (j.author as { first_name: string } | null)?.first_name ?? null,
      }))}
      statusFilter={statusFilter}
      currentPage={page}
      totalPages={totalPages}
      totalJobs={count ?? 0}
      pendingCount={pendingCount ?? 0}
    />
  );
}
