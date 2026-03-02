import { redirect } from "next/navigation";
import { Crown, Calendar, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/forms/profile-form";
import { ProfileLottie } from "@/components/dashboard/profile-lottie";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Mon CV et profil — KWATIGUIGUI",
  description: "Gérez vos informations personnelles et votre profil professionnel.",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/login");

  const { data } = await supabase
    .from("profiles")
    .select(
      "first_name, last_name, username, date_of_birth, whatsapp, phone, city, neighborhood, job_type, experience, user_type, subscription_paid, expiry_date, avatar_url, linkedin_url, facebook_url, instagram_url, github_url, cv_path, cv_filename, cv_size, cv_public",
    )
    .eq("id", user.id)
    .single();

  const profile = data as Database["public"]["Tables"]["profiles"]["Row"] | null;

  if (!profile) redirect("/login");

  // Generate a 24h signed URL for the CV (private bucket — no public access)
  let cvSignedUrl: string | null = null;
  if (profile.cv_path) {
    const { data: signedData } = await supabase.storage
      .from("cvs")
      .createSignedUrl(profile.cv_path, 86400); // 24 heures
    cvSignedUrl = signedData?.signedUrl ?? null;
  }

  const isPremium =
    !!profile.subscription_paid &&
    !!profile.expiry_date &&
    new Date(profile.expiry_date) > new Date();

  const expiresAt = profile.expiry_date ? new Date(profile.expiry_date) : null;
  const daysLeft = expiresAt
    ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  // Email verification status from Supabase Auth
  const emailVerified = !!user.email_confirmed_at;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full">
      {/* ── En-tête de page ─────────────────────────────────────────────── */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Mon CV et profil
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Cliquez sur le crayon à côté de chaque champ pour modifier vos informations
        </p>
      </div>

      {/* ── Statut abonnement ────────────────────────────────────────────── */}
      <div
        className={[
          "rounded-2xl border p-4",
          isPremium
            ? "border-accent-200 bg-accent-50 dark:border-accent-800/50 dark:bg-accent-950/20"
            : "border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900",
        ].join(" ")}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={[
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                isPremium
                  ? "bg-accent-100 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400"
                  : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800",
              ].join(" ")}
            >
              <Crown size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Abonnement
                </span>
                {isPremium ? (
                  <Badge variant="accent" className="text-xs">PREMIUM</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">GRATUIT</Badge>
                )}
              </div>
              {isPremium && expiresAt && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <Calendar size={11} />
                  Expire le {formatDate(expiresAt)}
                  {daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && (
                    <span className="ml-1 font-medium text-warning-600">
                      (dans {daysLeft} jour{daysLeft > 1 ? "s" : ""})
                    </span>
                  )}
                </p>
              )}
              {!isPremium && (
                <p className="mt-0.5 text-xs text-neutral-400">
                  Passez Premium pour des annonces illimitées et le contact WhatsApp direct
                </p>
              )}
              {isPremium && (
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {["Annonces illimitées", "Contact WhatsApp", "Messages illimités"].map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1 text-xs text-secondary-700 dark:text-secondary-400"
                    >
                      <CheckCircle size={11} />
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <a
            href="/dashboard/payment"
            className="inline-flex h-9 items-center justify-center rounded-full bg-accent-500 px-4 text-sm font-semibold text-accent-950 transition hover:bg-accent-600"
          >
            <Crown size={14} className="mr-1.5" />
            {isPremium ? "Renouveler" : "Passer Premium"}
          </a>
        </div>
      </div>

      {/* ── Bannière Conseils & Lottie ────────────────────────────────────────── */}
      <div className="rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 shadow-sm overflow-hidden">

        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 sm:p-8 relative">

          {/* Soft decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="flex-1 space-y-5 z-10">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Centralisez vos informations
              </h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                Un profil avec de <b>vraies informations</b> et des données à jour garantit des propositions d'embauche rapides.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 border-l-4 border-l-primary-500 border border-neutral-100 dark:border-neutral-800 p-4 sm:p-5 rounded-2xl shadow-sm">
              <h4 className="text-sm font-bold text-primary-700 dark:text-primary-400 mb-2">
                Débloquez des opportunités
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Ajoutez une <b>photo de profil professionnelle</b>. Les profils vérifiés et complets sont automatiquement propulsés en tête de liste et vus <b>3x plus</b> par les recruteurs !
              </p>
            </div>
          </div>

          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] shrink-0 z-10 flex justify-center -my-6 sm:my-0">
            <ProfileLottie />
          </div>
        </div>

        {/* ── Barre de défilement des points ───────────────────────────────── */}
        <div className="relative border-t border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-neutral-900 overflow-hidden py-2.5">
          {/* Fade gauche */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent" />
          {/* Fade droit */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent" />

          {/* Défilement — contenu dupliqué pour boucle seamless */}
          <div className="flex animate-marquee whitespace-nowrap">
            {[
              { label: "Photo de profil",       pts: "+20 pts",     badge: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"    },
              { label: "Poste / Secteur",        pts: "+15 pts",     badge: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"    },
              { label: "Expérience",             pts: "+15 pts",     badge: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"    },
              { label: "Ville",                  pts: "+10 pts",     badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "Email vérifié",          pts: "+10 pts",     badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "Téléphone",              pts: "+8 pts",      badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "Prénom",                 pts: "+8 pts",      badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "WhatsApp",               pts: "+7 pts",      badge: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-500"        },
              { label: "Nom de famille",         pts: "+4 pts",      badge: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-500"        },
              { label: "Date de naissance",      pts: "+3 pts",      badge: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-500"        },
              { label: "LinkedIn",               pts: "+4 pts ★",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"                },
              { label: "Facebook + Instagram",   pts: "+3 pts ★",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"                },
              { label: "GitHub (dev / IT)",      pts: "+1 pt ★",     badge: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"       },
            ].flatMap((item, i, arr) => [
              <span key={`a-${i}`} className="inline-flex items-center gap-2 px-5">
                <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                  {item.label}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badge}`}>
                  {item.pts}
                </span>
              </span>,
              i < arr.length - 1
                ? <span key={`sep-a-${i}`} className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
                : null,
            ])}
            {/* Duplicate for seamless loop */}
            {[
              { label: "Photo de profil",       pts: "+20 pts",     badge: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"    },
              { label: "Poste / Secteur",        pts: "+15 pts",     badge: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"    },
              { label: "Expérience",             pts: "+15 pts",     badge: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"    },
              { label: "Ville",                  pts: "+10 pts",     badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "Email vérifié",          pts: "+10 pts",     badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "Téléphone",              pts: "+8 pts",      badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "Prénom",                 pts: "+8 pts",      badge: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400" },
              { label: "WhatsApp",               pts: "+7 pts",      badge: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-500"        },
              { label: "Nom de famille",         pts: "+4 pts",      badge: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-500"        },
              { label: "Date de naissance",      pts: "+3 pts",      badge: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-500"        },
              { label: "LinkedIn",               pts: "+4 pts ★",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"                },
              { label: "Facebook + Instagram",   pts: "+3 pts ★",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"                },
              { label: "GitHub (dev / IT)",      pts: "+1 pt ★",     badge: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"       },
            ].flatMap((item, i, arr) => [
              <span key={`b-${i}`} className="inline-flex items-center gap-2 px-5">
                <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                  {item.label}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badge}`}>
                  {item.pts}
                </span>
              </span>,
              i < arr.length - 1
                ? <span key={`sep-b-${i}`} className="text-neutral-300 dark:text-neutral-700 select-none">·</span>
                : null,
            ])}
          </div>
        </div>
      </div>

      {/* ── Formulaire de profil ─────────────────────────────────────────── */}
      <ProfileForm
        initialValues={{
          first_name: profile.first_name ?? "",
          last_name: profile.last_name ?? "",
          username: profile.username ?? "",
          date_of_birth: profile.date_of_birth ?? "",
          phone: profile.phone ?? "",
          whatsapp: profile.whatsapp ?? "",
          city: profile.city ?? "",
          neighborhood: profile.neighborhood ?? "",
          job_type: profile.job_type ?? "",
          experience: profile.experience ?? "",
          linkedin_url: profile.linkedin_url ?? "",
          facebook_url: profile.facebook_url ?? "",
          instagram_url: profile.instagram_url ?? "",
          github_url: profile.github_url ?? "",
          cv_path: profile.cv_path ?? null,
          cv_filename: profile.cv_filename ?? null,
          cv_size: profile.cv_size ?? null,
          cv_public: profile.cv_public ?? false,
        }}
        cvSignedUrl={cvSignedUrl}
        email={user.email ?? ""}
        emailVerified={emailVerified}
        userType={(profile.user_type as "seeker" | "employer") ?? "seeker"}
        isPremium={isPremium}
        avatarUrl={profile.avatar_url ?? null}
      />
    </div>
  );
}
