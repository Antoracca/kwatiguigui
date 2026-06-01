import { redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleDashed, FileEdit, LineChart, Target, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
    title: "Analyse de Profil — Conseils Carrière",
    description: "Évaluez l'attractivité de votre profil et découvrez comment l'améliorer pour les recruteurs.",
};

export default async function ProfileAnalysisPage() {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) redirect("/login");

    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const profile = data as Database["public"]["Tables"]["profiles"]["Row"] | null;

    if (!profile) redirect("/login");

    // Profile completion weight logic
    const SCORING_RULES = [
        { key: "avatar_url", label: "Photo de profil", pts: 20, tip: "Les profils avec photo sont vus 3x plus. Assurez-vous qu'elle soit professionnelle." },
        { key: "job_type", label: "Poste recherché / Secteur", pts: 15, tip: "Permet aux recruteurs de vous trouver lors des recherches ciblées." },
        { key: "experience", label: "Expérience professionnelle", pts: 15, tip: "L'information n°1 regardée par les recruteurs après votre titre." },
        { key: "city", label: "Ville", pts: 10, tip: "Essentiel pour les offres d'emploi locales et en présentiel." },
        { key: "email_verified", label: "Email vérifié", pts: 10, tip: "Prouve que vous êtes joignable et actif." },
        { key: "phone", label: "Téléphone", pts: 8, tip: "Pour les entretiens téléphoniques rapides." },
        { key: "first_name", label: "Prénom", pts: 8, tip: "La base de toute présentation professionnelle." },
        { key: "whatsapp", label: "WhatsApp", pts: 7, tip: "Outil de communication préféré de nombreux recruteurs en RCA." },
        { key: "last_name", label: "Nom de famille", pts: 4, tip: "Permet de décliner votre identité complète." },
        { key: "date_of_birth", label: "Date de naissance", pts: 3, tip: "Donne une indication sur votre stade de carrière." },
        { key: "linkedin_url", label: "Lien LinkedIn", pts: 4, tip: "Votre vitrine professionnelle en ligne étendue." },
        { key: "social", label: "Facebook ou Instagram", pts: 3, tip: "Montre votre ancrage local si utilisé professionnellement." },
        { key: "github_url", label: "GitHub / Portfolio", pts: 1, tip: "Le must-have pour les développeurs et créatifs." },
    ];

    // Compute states
    const emailVerified = !!user.email_confirmed_at;
    const hasSocial = !!profile.facebook_url || !!profile.instagram_url;

    let score = 0;
    const missingItems: { label: string; pts: number; tip: string; link: string }[] = [];
    const completedItems: { label: string; pts: number }[] = [];

    SCORING_RULES.forEach((rule) => {
        let isCompleted = false;

        if (rule.key === "email_verified") isCompleted = emailVerified;
        else if (rule.key === "social") isCompleted = hasSocial;
        else isCompleted = !!(profile as any)[rule.key];

        if (isCompleted) {
            score += rule.pts;
            completedItems.push({ label: rule.label, pts: rule.pts });
        } else {
            missingItems.push({ label: rule.label, pts: rule.pts, tip: rule.tip, link: "/dashboard/profile" });
        }
    });

    // Ensure score doesn't exceed 100 realistically, or cap it just in case
    score = Math.min(score, 100);

    let healthStatus = { msg: "", color: "", bg: "", icon: <CircleDashed /> };
    if (score < 50) {
        healthStatus = { msg: "Profil Incomplet", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950", icon: <AlertCircle className="w-6 h-6 text-red-600" /> };
    } else if (score < 80) {
        healthStatus = { msg: "Profil Intermédiaire", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950", icon: <RefreshCw className="w-6 h-6 text-amber-600" /> };
    } else {
        healthStatus = { msg: "Profil Excellent", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950", icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" /> };
    }

    return (
        <div className="mx-auto w-full max-w-5xl space-y-8 animate-in fade-in duration-500">
            {/* Header / Breadcrumb navigation */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link
                        href="/dashboard/advice"
                        className="inline-flex items-center text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux conseils
                    </Link>
                    <h1 className="font-heading text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                        <LineChart className="text-primary-500 h-8 w-8" />
                        Analyse d'attractivité
                    </h1>
                </div>
                <Button asChild className="hidden sm:flex rounded-full bg-primary-600 font-bold hover:bg-primary-700 text-white">
                    <Link href="/dashboard/profile">
                        Mettre à jour mon profil <FileEdit className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>

            <p className="max-w-3xl text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                Les recruteurs utilisent des filtres spécifiques pour trouver des candidats. Notre algorithme analyse
                votre profil KUSSALA pour vous dire exactement ce qui vous manque pour apparaître en tête de liste.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Score & Missing fields */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Score Card */}
                    <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm relative overflow-hidden">
                        {/* Decorative background glow based on score */}
                        <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none ${score < 50 ? 'bg-red-500' : score < 80 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            {/* Radial Progress Simulation */}
                            <div className="relative flex items-center justify-center shrink-0">
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                        className="text-neutral-100 dark:text-neutral-800" />
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                        strokeDasharray="439.8" strokeDashoffset={439.8 - (score / 100) * 439.8}
                                        className={`${score < 50 ? 'text-red-500' : score < 80 ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`} />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-heading font-extrabold tracking-tight dark:text-white">{score}</span>
                                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">/ 100</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${healthStatus.bg} ${healthStatus.color}`}>
                                    {healthStatus.icon}
                                    {healthStatus.msg}
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300">
                                    {score < 50
                                        ? "Votre profil est actuellement invisible pour la plupart des recruteurs. Remplissez les champs prioritaires pour recevoir des opportunités."
                                        : score < 80
                                            ? "Vous êtes en bonne voie ! Ajoutez quelques détails supplémentaires pour vous démarquer de la concurrence."
                                            : "Excellent ! Votre profil est parfaitement optimisé. Gardez-le à jour dès qu'il y a un changement."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Plan */}
                    {(missingItems.length > 0) ? (
                        <div className="space-y-6">
                            <h2 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                <Target className="text-amber-500 h-5 w-5" />
                                Actions prioritaires recommandées
                            </h2>
                            <div className="grid gap-4">
                                {missingItems.map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-neutral-900 dark:text-neutral-100">{item.label}</h3>
                                                <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                    +{item.pts} points
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                {item.tip}
                                            </p>
                                        </div>
                                        <Button asChild variant="outline" size="sm" className="shrink-0 rounded-full font-semibold border-neutral-200 dark:border-neutral-700">
                                            <Link href={item.link}>Compléter</Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20">
                            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
                            <h3 className="font-heading text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                                Votre profil est complet à 100% !
                            </h3>
                            <p className="text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                                Vous avez mis toutes les chances de votre côté. Pensez à vérifier régulièrement s'il faut mettre à jour vos expériences professionnelles.
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar - Completed items & Tips */}
                <div className="space-y-6">
                    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <h3 className="font-heading font-bold text-lg mb-4 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 pb-3 dark:border-neutral-800">
                            Vos forces existantes
                        </h3>
                        {completedItems.length > 0 ? (
                            <ul className="space-y-3">
                                {completedItems.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                        <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-neutral-500 italic">
                                Rien de complété pour le moment.
                            </p>
                        )}
                    </div>

                    {/* Pro Tip Card */}
                    <div className="rounded-3xl bg-primary-600 p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <LineChart className="w-24 h-24" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-heading font-bold text-lg mb-2">Conseil d'Expert</h3>
                            <p className="text-primary-100 text-sm leading-relaxed mb-4">
                                L'algorithme KUSSALA donne une pondération extrêmement élevée à votre photo de profil (+20 pts). Dans le domaine du BTP et du service, montrer son visage renforce considérablement le sentiment de confiance.
                            </p>
                            <Button asChild variant="secondary" className="w-full font-bold rounded-full bg-white text-primary-700 hover:bg-neutral-50">
                                <Link href="/dashboard/cv-builder">
                                    Aller au Créateur de CV
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden pt-4 pb-12 w-full">
                <Button asChild className="w-full rounded-full bg-primary-600 py-6 font-bold text-lg shadow-lg text-white">
                    <Link href="/dashboard/profile">
                        Mettre à jour mon profil
                    </Link>
                </Button>
            </div>
        </div>
    );
}
