import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, User } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  // TODO: Fetch job data from API to generate dynamic metadata
  return {
    title: `Offre d'emploi #${id}`,
    description:
      "Consultez cette offre d'emploi en Republique Centrafricaine sur KWATIGUIGUI.",
    alternates: { canonical: `/jobs/${id}` },
    openGraph: {
      title: `Offre d'emploi | KWATIGUIGUI`,
      description:
        "Consultez cette offre d'emploi en Republique Centrafricaine.",
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  // TODO: Fetch job data from API route
  // const job = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs/${id}`).then(r => r.json());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center gap-2 text-body-sm text-neutral-500 transition-colors hover:text-primary-500"
      >
        <ArrowLeft size={16} />
        Retour aux offres
      </Link>

      {/* Job header card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex gap-2">
                <Badge variant="primary">Emploi</Badge>
                <Badge variant="secondary">Publiee</Badge>
              </div>
              <CardTitle className="text-heading-lg">
                {/* Placeholder — replaced with real job title */}
                <Skeleton className="h-8 w-64" />
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" aria-label="Partager">
              <Share2 size={18} />
            </Button>
          </div>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap gap-4 text-body-sm text-neutral-500">
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              <Skeleton className="h-4 w-24" />
            </span>
            <span className="flex items-center gap-1">
              <User size={16} />
              <Skeleton className="h-4 w-20" />
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              <Skeleton className="h-4 w-32" />
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              <Skeleton className="h-4 w-28" />
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Job details */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Details de l'annonce</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — contact info (premium only) */}
        <div>
          <Card featured>
            <CardHeader>
              <CardTitle>Contacter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-body-sm text-neutral-500">
                Les informations de contact sont reservees aux membres Premium.
              </p>
              <Link href="/register">
                <Button variant="accent" size="md" className="w-full">
                  Devenir Premium
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* JSON-LD structured data — generated dynamically from job data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: `Offre d'emploi #${id}`,
            description: "Offre d'emploi en Republique Centrafricaine",
            datePosted: new Date().toISOString(),
            hiringOrganization: {
              "@type": "Organization",
              name: "KWATIGUIGUI",
              sameAs: "https://kwatiguigui.org",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangui",
                addressCountry: "CF",
              },
            },
          }),
        }}
      />
    </div>
  );
}
