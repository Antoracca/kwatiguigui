import type { Metadata } from "next";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  Copy,
  Download,
  FileText,
  MapPin,
  MessageCircle,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JobCard } from "@/components/jobs/job-card";
import { JobAvatar } from "@/components/jobs/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import type { Database } from "@/types/database";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

// ---------------------------------------------------------------------------
// Data fetch helpers
// ---------------------------------------------------------------------------
async function getJob(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("publication_status", "published")
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data as Database["public"]["Tables"]["jobs"]["Row"];
}

async function getCvInfo(userId: string) {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("cv_public, cv_path, cv_filename")
    .eq("id", userId)
    .single();

  if (!data?.cv_public || !data.cv_path) return null;
  return { cv_filename: data.cv_filename ?? "cv.pdf", isPdf: data.cv_path.endsWith(".pdf") };
}

async function getSimilarJobs(jobType: string, excludeId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("publication_status", "published")
    .eq("is_active", true)
    .eq("job_type", jobType)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(3);

  const jobs = data as Database["public"]["Tables"]["jobs"]["Row"][] | null;

  return (jobs ?? []).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    age: row.age,
    whatsapp: null as null,
    city: row.city,
    neighborhood: row.neighborhood ?? null,
    jobType: row.job_type,
    experience: row.experience ?? null,
    userType: row.user_type as "seeker" | "employer",
    isActive: row.is_active,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  }));
}

// ---------------------------------------------------------------------------
// generateMetadata — dynamic SEO
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: "Annonce introuvable",
      robots: { index: false, follow: false },
    };
  }

  const title = `${job.job_type} — ${job.user_type === "seeker" ? "Chercheur" : "Employeur"}, ${job.city}`;
  const description =
    job.experience
      ? `${title}. ${job.experience.slice(0, 150)}`
      : `Annonce d'emploi : ${title}. Publiee sur KUSSALA — Plateforme d'emploi de la RCA.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/${id}` },
    openGraph: {
      title: `${title} | KUSSALA`,
      description,
      type: "article",
      publishedTime: job.created_at,
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD — schema.org JobPosting
// ---------------------------------------------------------------------------
function JobPostingJsonLd({ job }: { job: NonNullable<Awaited<ReturnType<typeof getJob>>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${job.job_type} — ${job.city}`,
    description:
      job.experience ?? `Offre d'emploi : ${job.job_type} a ${job.city}.`,
    datePosted: job.created_at,
    validThrough: job.expires_at,
    employmentType: "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: "KUSSALA",
      sameAs: process.env.NEXT_PUBLIC_APP_URL ?? "https://kussala.org",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: "CF",
      },
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Republique Centrafricaine",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Copy link button (client island)
// ---------------------------------------------------------------------------
function CopyLinkButton({ jobId }: { jobId: string }) {
  // Using a simple form action pattern to avoid "use client" complexity on server page
  // In production, this would be a small client component
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-body-xs font-medium text-neutral-600 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-400"
      title="Copier le lien"
    >
      <Copy size={14} />
      Copier le lien
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  const [similarJobs, cvInfo] = await Promise.all([
    getSimilarJobs(job.job_type, id),
    // Only seekers can share their CV; employers post job offers
    job.user_type === "seeker" ? getCvInfo(job.user_id) : Promise.resolve(null),
  ]);

  const daysLeft = Math.ceil(
    (new Date(job.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  return (
    <>
      <JobPostingJsonLd job={job} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-body-sm text-neutral-400">
          <Link href="/" className="hover:text-primary-500">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-primary-500">
            Offres
          </Link>
          <span>/</span>
          <span className="text-neutral-600 dark:text-neutral-400">{job.job_type}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-body-sm text-neutral-500 transition-colors hover:text-primary-500"
        >
          <ArrowLeft size={16} />
          Retour aux offres
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ---- Main column ---- */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <JobAvatar name={job.first_name} size="lg" />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                        {job.first_name}, {job.age} ans
                      </h1>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge
                        variant={job.user_type === "seeker" ? "primary" : "secondary"}
                      >
                        {job.user_type === "seeker" ? (
                          <><User size={12} /> Chercheur d'emploi</>
                        ) : (
                          <><Briefcase size={12} /> Employeur</>
                        )}
                      </Badge>
                      <Badge variant="default">{job.job_type}</Badge>
                      {daysLeft <= 5 && (
                        <Badge variant="error">
                          <Clock size={12} /> Expire dans {daysLeft}j
                        </Badge>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap gap-4 text-body-sm text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-neutral-400" />
                        {job.city}
                        {job.neighborhood ? `, ${job.neighborhood}` : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={15} className="text-neutral-400" />
                        Publie {formatRelativeDate(job.created_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} className="text-neutral-400" />
                        Expire le {formatDate(job.expires_at, { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Share */}
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Offre d'emploi sur KUSSALA : ${process.env.NEXT_PUBLIC_APP_URL ?? "https://kussala.org"}/jobs/${id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-600 dark:border-neutral-700"
                      title="Partager sur WhatsApp"
                    >
                      <Share2 size={16} />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {job.experience && (
              <Card>
                <CardHeader>
                  <CardTitle>Presentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-body-md leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {job.experience}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Details grid */}
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Metier", value: job.job_type },
                    { label: "Type de profil", value: job.user_type === "seeker" ? "Chercheur d'emploi" : "Employeur" },
                    { label: "Ville", value: job.city },
                    ...(job.neighborhood ? [{ label: "Quartier", value: job.neighborhood }] : []),
                    { label: "Age", value: `${job.age} ans` },
                  ].map((item) => (
                    <div key={item.label} className="space-y-0.5">
                      <dt className="text-body-xs font-medium uppercase tracking-wider text-neutral-400">
                        {item.label}
                      </dt>
                      <dd className="text-body-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* ---- Sidebar ---- */}
          <div className="space-y-4">

            {/* CV card — visible uniquement si cv_public = true */}
            {cvInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>CV du candidat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 dark:border-neutral-700 dark:bg-neutral-900/50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-950/30 dark:text-secondary-400">
                      <FileText size={16} />
                    </div>
                    <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {cvInfo.cv_filename}
                    </p>
                  </div>

                  {/* Lire en ligne */}
                  <a
                    href={`/api/cv/public/${job.user_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-secondary-200 bg-secondary-50 px-4 py-2.5 text-sm font-semibold text-secondary-700 transition hover:bg-secondary-100 dark:border-secondary-800/40 dark:bg-secondary-950/20 dark:text-secondary-400 dark:hover:bg-secondary-950/40"
                  >
                    <FileText size={15} />
                    Lire le CV
                  </a>

                  {/* Télécharger */}
                  <a
                    href={`/api/cv/public/${job.user_id}`}
                    download={cvInfo.cv_filename}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    <Download size={15} />
                    Télécharger
                  </a>

                  <p className="text-center text-[10px] text-neutral-400">
                    Le candidat a autorisé le partage de son CV
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Contact card */}
            <Card featured>
              <CardHeader>
                <CardTitle>Contacter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Masked WhatsApp */}
                <div className="relative">
                  <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-neutral-800">
                    <MessageCircle size={18} className="text-neutral-300" />
                    <div>
                      <p className="text-body-xs text-neutral-400">WhatsApp</p>
                      <p className="font-mono text-body-sm font-medium text-neutral-300">
                        +236 •• •• •• ••
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/dashboard/payment" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    <MessageCircle size={16} />
                    Voir le contact (Premium)
                  </Button>
                </Link>

                <p className="text-center text-body-xs text-neutral-400">
                  Abonnement Premium requis — 2 500 FCFA/mois
                </p>

                <div className="border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  <Link href="/register">
                    <Button variant="ghost" size="sm" className="w-full text-neutral-500">
                      Pas encore inscrit ? S'inscrire
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Similar jobs */}
            {similarJobs.length > 0 && (
              <div>
                <h2 className="mb-3 font-heading text-body-sm font-semibold text-neutral-500">
                  Annonces similaires
                </h2>
                <div className="space-y-3">
                  {similarJobs.map((sJob) => (
                    <JobCard
                      key={sJob.id}
                      job={sJob}
                      isPremium={false}
                      className="text-body-xs"
                    />
                  ))}
                </div>
                <Link
                  href={`/jobs?job_type=${encodeURIComponent(job.job_type)}`}
                  className="mt-3 block text-center text-body-xs text-primary-500 hover:underline"
                >
                  Voir toutes les annonces {job.job_type}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
