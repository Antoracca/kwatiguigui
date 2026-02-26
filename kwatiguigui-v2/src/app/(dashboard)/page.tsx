import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Crown,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { JobCard } from "@/components/jobs/job-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/server";
import { PRICING, PUBLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate, formatRelativeDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Auth guard (defensive, middleware already handles this)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch user jobs
  const { data: userJobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // Fetch unread messages count
  const { count: unreadCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("to_user_id", user.id)
    .eq("is_read", false);

  // Fetch recent messages
  const { data: recentMessages } = await supabase
    .from("messages")
    .select("*")
    .eq("to_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // Fetch active jobs count
  const { count: activeJobsCount } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_active", true)
    .eq("publication_status", "published");

  const firstName = profile?.first_name ?? "Utilisateur";
  const isPremium =
    (profile?.subscription_paid ?? false) &&
    profile?.expiry_date != null &&
    new Date(profile.expiry_date) > new Date();
  const freeJobsUsed = Math.min(activeJobsCount ?? 0, PRICING.FREE_JOB_LIMIT);
  const freeJobsProgress = Math.round((freeJobsUsed / PRICING.FREE_JOB_LIMIT) * 100);

  // Format jobs for JobCard
  const formattedJobs = (userJobs ?? []).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    age: row.age,
    whatsapp: isPremium ? row.whatsapp : null,
    region: row.region,
    city: row.city,
    neighborhood: row.neighborhood ?? null,
    jobType: row.job_type,
    experience: row.experience ?? null,
    userType: row.user_type as "seeker" | "employer",
    isActive: row.is_active,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  }));

  // Today in French
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-body-sm text-neutral-400">{todayCapitalized}</p>
          <h1 className="mt-1 font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
            Bonjour, {firstName}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {isPremium ? (
            <Badge variant="premium">
              <Crown size={12} />
              Premium actif
            </Badge>
          ) : (
            <Link href="/dashboard/payment">
              <Button variant="accent" size="sm">
                <Crown size={14} />
                Passer Premium
              </Button>
            </Link>
          )}
          <Link href="/dashboard/jobs?new=1">
            <Button variant="primary" size="sm">
              <Plus size={14} />
              Nouvelle annonce
            </Button>
          </Link>
        </div>
      </div>

      {/* Premium upsell banner (freemium only) */}
      {!isPremium && (
        <div className="relative overflow-hidden rounded-2xl bg-primary-500 p-6 text-white">
          <div
            className="absolute right-0 top-0 h-full w-1/2 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Crown size={18} className="text-accent-400" />
                <span className="font-heading text-body-sm font-bold text-accent-300">
                  Debloquez tout le potentiel
                </span>
              </div>
              <h2 className="font-heading text-heading-sm font-bold">
                Passez Premium pour 2 500 FCFA/mois
              </h2>
              <p className="mt-1 text-body-sm text-primary-200">
                Acces aux contacts WhatsApp, annonces illimitees, messages directs.
              </p>
            </div>
            <Link href="/dashboard/payment" className="shrink-0">
              <Button
                variant="accent"
                size="md"
                className="whitespace-nowrap"
              >
                Passer Premium
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active jobs */}
        <Card>
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-xl bg-primary-50 p-3 dark:bg-primary-950">
              <Briefcase size={20} className="text-primary-500" />
            </div>
            <div>
              <p className="text-body-xs text-neutral-400">Annonces actives</p>
              <p className="mt-0.5 font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                {activeJobsCount ?? 0}
              </p>
              {!isPremium && (
                <p className="mt-1 text-body-xs text-neutral-400">
                  {freeJobsUsed}/{PRICING.FREE_JOB_LIMIT} en gratuit
                </p>
              )}
            </div>
          </CardContent>
          {!isPremium && (
            <div className="px-5 pb-4">
              <Progress
                value={freeJobsProgress}
                indicatorClassName={
                  freeJobsProgress >= 80 ? "bg-warning-500" : undefined
                }
              />
            </div>
          )}
        </Card>

        {/* Unread messages */}
        <Card>
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-xl bg-accent-50 p-3 dark:bg-accent-950">
              <MessageSquare size={20} className="text-accent-600" />
            </div>
            <div>
              <p className="text-body-xs text-neutral-400">Messages non lus</p>
              <p className="mt-0.5 font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                {unreadCount ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile views placeholder */}
        <Card>
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-xl bg-secondary-50 p-3 dark:bg-secondary-950">
              <Eye size={20} className="text-secondary-600" />
            </div>
            <div>
              <p className="text-body-xs text-neutral-400">Vues du profil</p>
              <p className="mt-0.5 font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                —
              </p>
              <p className="text-body-xs text-neutral-400">Bientot disponible</p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardContent className="flex items-start gap-4 p-5">
            <div
              className={`rounded-xl p-3 ${isPremium ? "bg-accent-50 dark:bg-accent-950" : "bg-neutral-100 dark:bg-neutral-800"}`}
            >
              <Crown
                size={20}
                className={isPremium ? "text-accent-600" : "text-neutral-400"}
              />
            </div>
            <div>
              <p className="text-body-xs text-neutral-400">Abonnement</p>
              <p className="mt-0.5 font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                {isPremium ? "Premium" : "Gratuit"}
              </p>
              {isPremium && profile?.expiry_date && (
                <p className="text-body-xs text-neutral-400">
                  Expire le{" "}
                  {formatDate(profile.expiry_date, { day: "numeric", month: "short" })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent jobs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Mes annonces recentes
          </h2>
          <Link
            href="/dashboard/jobs"
            className="flex items-center gap-1 text-body-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Voir tout
            <ArrowRight size={14} />
          </Link>
        </div>

        {formattedJobs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formattedJobs.map((job) => (
              <JobCard key={job.id} job={job} isPremium={isPremium} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center py-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Briefcase size={24} className="text-neutral-400" />
              </div>
              <h3 className="font-heading text-body-md font-semibold text-neutral-700 dark:text-neutral-300">
                Aucune annonce publiee
              </h3>
              <p className="mt-1 text-body-sm text-neutral-400">
                Publiez votre premiere annonce pour etre visible par des milliers
                d'utilisateurs.
              </p>
              <Link href="/dashboard/jobs?new=1" className="mt-4">
                <Button variant="primary" size="sm">
                  <Plus size={14} />
                  Publier une annonce
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent messages */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Messages recents
          </h2>
          <Link
            href="/dashboard/messages"
            className="flex items-center gap-1 text-body-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Voir tout
            <ArrowRight size={14} />
          </Link>
        </div>

        {(recentMessages ?? []).length > 0 ? (
          <div className="space-y-3">
            {(recentMessages ?? []).map((msg) => (
              <Link key={msg.id} href={`/dashboard/messages?id=${msg.id}`}>
                <Card
                  interactive
                  className={msg.is_read ? "" : "border-primary-200 bg-primary-50/30 dark:border-primary-800 dark:bg-primary-950/20"}
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <div
                      className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${msg.is_read ? "bg-neutral-300" : "bg-primary-500"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {msg.subject}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-body-xs text-neutral-500">
                        {msg.content}
                      </p>
                    </div>
                    <span className="shrink-0 text-body-xs text-neutral-400">
                      {formatRelativeDate(msg.created_at)}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center py-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <MessageSquare size={24} className="text-neutral-400" />
              </div>
              <h3 className="font-heading text-body-md font-semibold text-neutral-700 dark:text-neutral-300">
                Aucun message
              </h3>
              <p className="mt-1 text-body-sm text-neutral-400">
                Vos messages apparaitront ici.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
