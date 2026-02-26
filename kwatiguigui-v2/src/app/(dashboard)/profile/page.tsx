import { redirect } from "next/navigation";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Crown,
  Calendar,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/forms/profile-form";

export const metadata: Metadata = {
  title: "Mon profil — KWATIGUIGUI",
  description: "Modifiez vos informations personnelles et votre profil professionnel.",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "first_name, age, whatsapp, phone, region, city, neighborhood, job_type, experience, user_type, subscription_paid, expiry_date",
    )
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  const isPremium =
    profile.subscription_paid &&
    profile.expiry_date &&
    new Date(profile.expiry_date) > new Date();

  const expiresAt = profile.expiry_date ? new Date(profile.expiry_date) : null;
  const daysLeft = expiresAt
    ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="max-w-3xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Mon profil
        </h1>
        <p className="mt-1 text-fluid-base text-neutral-500 dark:text-neutral-400">
          Gerez vos informations personnelles et professionnelles
        </p>
      </div>

      {/* Subscription status card */}
      <div
        className={[
          "rounded-2xl border p-5",
          isPremium
            ? "border-accent-200 bg-accent-50 dark:border-accent-800 dark:bg-accent-950/30"
            : "border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900",
        ].join(" ")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                isPremium
                  ? "bg-accent-100 text-accent-600 dark:bg-accent-900 dark:text-accent-400"
                  : "bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400",
              ].join(" ")}
            >
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Statut abonnement
                </span>
                {isPremium ? (
                  <Badge variant="accent" className="text-xs">
                    PREMIUM
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    GRATUIT
                  </Badge>
                )}
              </div>

              {isPremium && expiresAt && (
                <div className="mt-1 flex items-center gap-1.5 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    Expire le{" "}
                    <strong className="text-neutral-800 dark:text-neutral-200">
                      {formatDate(expiresAt)}
                    </strong>
                    {daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && (
                      <span className="ml-1 text-warning-600 dark:text-warning-400">
                        (dans {daysLeft} jour{daysLeft > 1 ? "s" : ""})
                      </span>
                    )}
                  </span>
                </div>
              )}

              {!isPremium && (
                <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
                  Passez Premium pour des annonces illimitees et le contact WhatsApp direct
                </p>
              )}

              {isPremium && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Annonces illimitees", "Contact WhatsApp direct", "Messages illimites"].map(
                    (feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-1 text-xs text-secondary-700 dark:text-secondary-400"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>{feature}</span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          {!isPremium ? (
            <a
              href="/dashboard/payment"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent-500 px-5 py-2.5 font-heading text-fluid-sm font-semibold text-accent-950 transition-all hover:bg-accent-600 hover:shadow-md active:scale-[0.98]"
            >
              <Crown className="mr-2 h-4 w-4" />
              Passer Premium
            </a>
          ) : (
            <a
              href="/dashboard/payment"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-accent-500 px-5 py-2.5 font-heading text-fluid-sm font-semibold text-accent-600 transition-all hover:bg-accent-50 active:scale-[0.98] dark:text-accent-400 dark:hover:bg-accent-950"
            >
              Renouveler
            </a>
          )}
        </div>
      </div>

      {/* Profile identity banner */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 font-heading text-2xl font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-400">
            {profile.first_name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
              {profile.first_name}
              {isPremium && (
                <Badge variant="accent" className="ml-2 text-xs">
                  Premium
                </Badge>
              )}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3 text-fluid-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-neutral-400" />
                {profile.whatsapp}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                {profile.city}, {profile.region}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-neutral-400" />
                {profile.job_type}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-neutral-400" />
                {profile.user_type === "seeker" ? "Chercheur d'emploi" : "Employeur"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <ProfileForm
        initialValues={{
          first_name: profile.first_name ?? "",
          age: profile.age ?? 18,
          phone: profile.phone ?? "",
          region: profile.region ?? "",
          city: profile.city ?? "",
          neighborhood: profile.neighborhood ?? "",
          job_type: profile.job_type ?? "",
          experience: profile.experience ?? "",
          whatsapp: profile.whatsapp ?? "",
        }}
      />
    </div>
  );
}
