import { Briefcase, Calendar, Clock, Lock, MapPin, MessageCircle, User } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface JobCardData {
  id: string;
  firstName: string;
  age: number;
  whatsapp: string | null; // null = non-premium viewer cannot see it
  city: string;
  neighborhood: string | null;
  jobType: string;
  experience: string | null;
  userType: "seeker" | "employer";
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}

interface JobCardProps {
  job: JobCardData;
  isPremium?: boolean;
  featured?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Avatar with initial — deterministic color from first name
// ---------------------------------------------------------------------------
const AVATAR_COLORS = [
  "bg-primary-100 text-primary-700",
  "bg-secondary-100 text-secondary-700",
  "bg-accent-100 text-accent-700",
  "bg-purple-100 text-purple-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];

function getAvatarColor(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length] ?? AVATAR_COLORS[0]!;
}

function JobAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const color = getAvatarColor(name);
  const sizeClass = size === "sm" ? "h-8 w-8 text-body-xs" : size === "lg" ? "h-14 w-14 text-heading-md" : "h-10 w-10 text-body-sm";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-heading font-bold",
        sizeClass,
        color,
      )}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Expiry indicator
// ---------------------------------------------------------------------------
function ExpiryBadge({ expiresAt }: { expiresAt: string }) {
  const daysLeft = Math.ceil(
    (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  if (daysLeft > 5) return null;
  return (
    <Badge variant="error" className="text-body-xs">
      <Clock size={12} />
      Expire dans {daysLeft}j
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// JobCard
// ---------------------------------------------------------------------------
export function JobCard({ job, isPremium = false, featured = false, className }: JobCardProps) {
  const whatsappNumber = isPremium && job.whatsapp ? job.whatsapp : null;
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
    : null;

  return (
    <Card
      interactive
      featured={featured}
      className={cn(
        "group relative overflow-hidden transition-all duration-200",
        featured && "border-l-4 border-l-primary-500",
        className,
      )}
    >
      <CardContent className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <JobAvatar name={job.firstName} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-body-md font-semibold text-neutral-900 dark:text-neutral-100">
                {job.firstName}, {job.age} ans
              </h3>
              <ExpiryBadge expiresAt={job.expiresAt} />
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge
                variant={job.userType === "seeker" ? "primary" : "secondary"}
                className="text-body-xs"
              >
                {job.userType === "seeker" ? (
                  <>
                    <User size={10} />
                    Chercheur
                  </>
                ) : (
                  <>
                    <Briefcase size={10} />
                    Employeur
                  </>
                )}
              </Badge>
              <Badge variant="default" className="text-body-xs">
                {job.jobType}
              </Badge>
            </div>
          </div>

          {/* Date */}
          <span className="shrink-0 text-body-xs text-neutral-400">
            {formatRelativeDate(job.createdAt)}
          </span>
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-body-sm text-neutral-500">
          <MapPin size={14} className="shrink-0 text-neutral-400" />
          <span>
            {job.city}
            {job.neighborhood ? `, ${job.neighborhood}` : ""}
          </span>
        </div>

        {/* Experience / motivation */}
        {job.experience && (
          <p className="mt-3 line-clamp-2 text-body-sm text-neutral-600 dark:text-neutral-400">
            {job.experience}
          </p>
        )}

        {/* WhatsApp contact */}
        <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary-500 px-4 py-2 text-body-sm font-semibold text-white transition-all duration-200 hover:bg-secondary-600 hover:shadow-md active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              Contacter via WhatsApp
            </a>
          ) : (
            <div className="relative">
              {/* Blurred contact info */}
              <div className="flex items-center gap-2 rounded-full bg-neutral-50 px-4 py-2 dark:bg-neutral-800">
                <MessageCircle size={16} className="text-neutral-300" />
                <span className="select-none text-body-sm text-neutral-300">
                  +236 •• •• •• ••
                </span>
              </div>
              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-neutral-900/5 backdrop-blur-[2px] dark:bg-neutral-900/40">
                <Lock size={14} className="text-neutral-500" />
                <Link
                  href="/dashboard/payment"
                  className="text-body-xs font-semibold text-primary-500 hover:underline"
                >
                  Abonnement requis
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Link to detail page — subtle */}
        <Link
          href={`/jobs/${job.id}`}
          className="mt-2 block text-center text-body-xs text-neutral-400 transition-colors hover:text-primary-500"
        >
          Voir le detail
        </Link>
      </CardContent>
    </Card>
  );
}

// Export avatar for reuse
export { JobAvatar };
