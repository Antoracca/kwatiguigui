import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kwatiguigui.org";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/info`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  // TODO: Dynamically add published job pages from Supabase
  // const supabase = createAdminClient();
  // const { data: jobs } = await supabase
  //   .from('jobs')
  //   .select('id, created_at')
  //   .eq('publication_status', 'published')
  //   .eq('is_active', true);
  //
  // const jobPages = jobs?.map(job => ({
  //   url: `${baseUrl}/jobs/${job.id}`,
  //   lastModified: new Date(job.created_at),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // })) ?? [];

  return [...staticPages];
}
