import { Briefcase, ArrowRight, RefreshCw, Layers } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Offres Recommandées",
};

export default async function RecommendationsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    // Fetch the necessary profile fields to calculate completion
    const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, username, job_type, city, avatar_url, experience, cv_path, phone, whatsapp, date_of_birth, linkedin_url")
        .eq("id", user.id)
        .single();

    // ── Complétude du profil — formule UNIQUE partagée (profile-form, dashboard, recommendations) ──
    // Total max = 100 points.
    let completionPercentage = 0;
    if (profile) {
        const expFilled = !!profile.experience && profile.experience !== "";
        const completionPoints =
            (!!profile.avatar_url ? 15 : 0)          // Photo de profil
            + (!!profile.cv_path ? 15 : 0)           // CV uploadé
            + (!!profile.job_type ? 12 : 0)          // Poste/secteur
            + (expFilled ? 12 : 0)                   // Expérience
            + 8                                       // Email vérifié (toujours vrai ici)
            + (!!profile.city ? 8 : 0)               // Ville
            + (!!profile.first_name ? 5 : 0)         // Prénom
            + (!!profile.last_name ? 5 : 0)          // Nom
            + (!!profile.phone ? 5 : 0)              // Téléphone
            + (!!profile.whatsapp ? 5 : 0)           // WhatsApp
            + (!!profile.linkedin_url ? 5 : 0)       // LinkedIn
            + (!!profile.date_of_birth ? 3 : 0)      // Date de naissance
            + (!!profile.username ? 2 : 0);           // Username
        completionPercentage = Math.min(100, completionPoints);
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <Image src="/images/offres.png" alt="Offres" width={32} height={32} className="dark:invert opacity-80" />
                    Offres Recommandées
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Des offres soigneusement sélectionnées selon votre profil et vos compétences.
                </p>
            </div>

            {/* ── ETAT: PROFIL INCOMPLET (< 90%) - AVERTISSEMENT NON BLOQUANT ── */}
            {completionPercentage < 90 && (
                <div className="flex items-start gap-4 rounded-2xl border border-warning-200 bg-warning-50 px-5 py-4 dark:border-warning-900/40 dark:bg-warning-950/20">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning-100 text-warning-600 dark:bg-warning-900/50 dark:text-warning-500">
                        <Image src="/images/offres.png" alt="Avertissement" width={20} height={20} className="opacity-70 dark:invert" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            Plus vous complétez votre profil, meilleures sont nos recommandations
                        </h2>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                            Mettez à jour vos expériences pour commencer à matcher de manière optimale.
                        </p>
                    </div>
                    <Button asChild variant="secondary" size="sm" className="shrink-0 font-bold">
                        <Link href="/dashboard/profile">
                            Mettre à jour mon profil
                        </Link>
                    </Button>
                </div>
            )}

            {/* ── ETAT: CONTENU PRINCIPAL (Toujours affiché) ── */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-16 text-center dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <Image src="/images/offres.png" alt="Aucune offre" width={32} height={32} className="opacity-40 select-none grayscale dark:invert" />
                </div>
                <h2 className="mt-5 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Aucune offre et recommandation disponible en ce moment.
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
                    Veuillez revenir plus tard ou actualiser cette page.
                </p>
                <Button asChild variant="outline" className="mt-6">
                    <a href="/dashboard/recommendations">
                        <RefreshCw size={14} className="mr-2" />
                        Actualiser la page
                    </a>
                </Button>
            </div>
        </div>
    );
}
