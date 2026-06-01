import type { Metadata } from "next";
import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { JobCard } from "@/components/jobs/job-card";
import { JobCardSkeletonGrid } from "@/components/jobs/job-card-skeleton";
import { JobFilters } from "@/components/jobs/job-filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Offres d'emploi",
  description:
    "Parcourez les offres d'emploi disponibles en Republique Centrafricaine. Filtrez par ville, type d'emploi et profil.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Offres d'emploi | KUSSALA",
    description:
      "Parcourez les offres d'emploi disponibles en Republique Centrafricaine.",
  },
};

// ---------------------------------------------------------------------------
// Search params
// ---------------------------------------------------------------------------
interface SearchParams {
  q?: string;
  job_type?: string;
  user_type?: string;
  sort?: string;
  page?: string;
}

const PER_PAGE = 12;

// ---------------------------------------------------------------------------
// Server-side data fetch
// ---------------------------------------------------------------------------
async function getJobs(params: SearchParams) {
  const supabase = await createClient();
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  let query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .eq("publication_status", "published")
    .eq("is_active", true)
    .gt("expires_at", new Date().toISOString());

  // Filters
  if (params.q) {
    query = query.or(
      `job_type.ilike.%${params.q}%,city.ilike.%${params.q}%`,
    );
  }
  if (params.job_type) query = query.eq("job_type", params.job_type);
  if (params.user_type) query = query.eq("user_type", params.user_type as "seeker" | "employer");

  // Sorting
  switch (params.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "expiry":
      query = query.order("expires_at", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) {
    console.error("[jobs] Supabase error:", error.message);
    return { jobs: [], total: 0, page, totalPages: 0 };
  }

  const resultData = data as Database["public"]["Tables"]["jobs"]["Row"][] | null;

  const jobs = (resultData ?? []).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    age: row.age,
    whatsapp: null as null, // never expose to unauthenticated viewers
    city: row.city,
    neighborhood: row.neighborhood ?? null,
    jobType: row.job_type,
    experience: row.experience ?? null,
    userType: row.user_type as "seeker" | "employer",
    isActive: row.is_active,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  }));

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PER_PAGE);

  return { jobs, total, page, totalPages };
}

// ---------------------------------------------------------------------------
// Jobs list component (with Suspense boundary)
// ---------------------------------------------------------------------------
async function JobsList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { jobs, total, page, totalPages } = await getJobs(searchParams);
  const currentUrl = buildUrl(searchParams);

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Search size={32} className="text-neutral-300" />
        </div>
        <h3 className="font-heading text-heading-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Aucune annonce trouvee
        </h3>
        <p className="mt-2 max-w-xs text-body-sm text-neutral-500">
          Essayez de modifier vos filtres ou votre recherche pour trouver des
          annonces disponibles.
        </p>
        <Link href="/jobs" className="mt-6">
          <Button variant="outline" size="sm">
            Reinitialiser les filtres
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Result count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-body-sm text-neutral-500">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {total}
          </span>{" "}
          annonce{total > 1 ? "s" : ""} trouvee{total > 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} isPremium={false} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <PaginationWithLinks
            currentPage={page}
            totalPages={totalPages}
            baseUrl={currentUrl}
          />
        </div>
      )}
    </>
  );
}

function buildUrl(params: SearchParams): string {
  const base = "/jobs";
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.job_type) query.set("job_type", params.job_type);
  if (params.user_type) query.set("user_type", params.user_type);
  if (params.sort) query.set("sort", params.sort);
  const qs = query.toString();
  return qs ? `${base}?${qs}` : base;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function JobListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <Badge variant="primary" className="mb-3">
          <SlidersHorizontal size={12} />
          Offres d'emploi
        </Badge>
        <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
          Trouvez votre emploi
        </h1>
        <p className="mt-2 text-body-md text-neutral-500">
          Parcourez les offres disponibles partout en Republique Centrafricaine.
        </p>
      </div>

      {/* Search bar */}
      <form
        method="GET"
        action="/jobs"
        className="mb-8 flex gap-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Rechercher un metier, une ville..."
            className="h-11 w-full rounded-xl border-0 bg-neutral-50 pl-11 pr-4 text-body-md text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
        {/* Preserve other filters */}
        {params.job_type && <input type="hidden" name="job_type" value={params.job_type} />}
        {params.user_type && <input type="hidden" name="user_type" value={params.user_type} />}
        <Button type="submit" variant="primary" size="md">
          <Search size={18} />
          <span className="hidden sm:inline">Rechercher</span>
        </Button>
      </form>

      {/* Layout: sidebar + content */}
      <div className="flex gap-8">
        {/* Sidebar filters — desktop only */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <Suspense fallback={null}>
              <JobFilters />
            </Suspense>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <Suspense fallback={<JobCardSkeletonGrid count={PER_PAGE} />}>
            <JobsList searchParams={params} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
