import type { MetadataRoute } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kwatiguigui.org";
  const now = new Date();

  // ---------------------------------------------------------------------------
  // Static pages
  // ---------------------------------------------------------------------------
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/info`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ---------------------------------------------------------------------------
  // Dynamic job pages — fetch published, active, non-expired jobs
  // ---------------------------------------------------------------------------
  let jobPages: MetadataRoute.Sitemap = [];

  try {
    const { data: jobs, error } = await supabaseAdmin
      .from("jobs")
      .select("id, created_at, expires_at")
      .eq("publication_status", "published")
      .eq("is_active", true)
      .gt("expires_at", now.toISOString())
      .order("created_at", { ascending: false })
      .limit(5000); // safety cap

    if (error) {
      console.error("[sitemap] Supabase error:", error.message);
    } else {
      jobPages = (jobs ?? []).map((job) => ({
        url: `${baseUrl}/jobs/${job.id}`,
        lastModified: new Date(job.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    // Sitemap generation must never throw — degrade gracefully
    console.error("[sitemap] Unexpected error:", err);
  }

  return [...staticPages, ...jobPages];
}
