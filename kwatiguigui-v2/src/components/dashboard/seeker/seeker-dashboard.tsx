import {
    ArrowRight,
    BookOpen,
    Briefcase,
    FileText,
    Crown,
    TrendingUp,
    ChevronRight,
    CheckCircle2,
    Target,
    LineChart,
    FileSignature,
    Zap,
    Compass,
    PlayCircle
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DynamicRoadmap } from "./DynamicRoadmap";
import type { Database } from "@/types/database";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function SeekerDashboard({
    profile,
    isPremium,
}: {
    profile: Profile | null;
    isPremium: boolean;
}) {
    const firstName = profile?.first_name ?? "Candidat";
    const todayCapitalized = new Date()
        .toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .replace(/^./, (str) => str.toUpperCase());

    // ── Complétude du profil — formule UNIQUE partagée (profile-form, dashboard, recommendations) ──
    // Total max = 100 points.
    let cvCompletion = 0;
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
        cvCompletion = Math.min(100, completionPoints);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">

            {/* ── 1. Hero Section (High-Tech & Lottie) ── */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#a4d3f8] px-6 py-10 text-sky-950 shadow-xl sm:px-12 sm:py-16 border border-sky-300">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.05]" />

                {/* Subtle Lottie Background */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] sm:w-[500px] lg:w-[600px] h-auto opacity-50 mix-blend-darken pointer-events-none">
                    <DotLottieReact
                        src="/images/BusinessAnalysis.lottie"
                        loop
                        autoplay
                    />
                </div>

                {/* Decorative glows (Placed OVER the Lottie to ensure perfectly seamless edges) */}
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/60 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100/50 blur-[100px] pointer-events-none" />

                {/* Left content (Text) */}
                <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl min-h-[300px] justify-center space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#85a8c9]/40 bg-white/50 px-3 py-1 text-xs font-bold text-sky-900 shadow-sm backdrop-blur-md">
                        <Compass size={14} className="text-primary-700" />
                        <span>{todayCapitalized}</span>
                    </div>

                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-sky-950">
                        Prêt à accélérer,<br />
                        <span className="text-primary-700">
                            {firstName} ?
                        </span>
                    </h1>

                    <p className="text-lg text-sky-900/90 leading-relaxed font-medium max-w-lg">
                        Votre tableau de bord centralise toutes les données et outils dont vous avez besoin pour dominer votre recherche d'emploi en RCA.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                        <Button asChild size="lg" className="w-full sm:w-auto rounded-full bg-primary-600 text-white hover:bg-primary-700 font-bold shadow-md border-0">
                            <Link href="/dashboard/cv-builder">
                                <FileSignature size={18} className="mr-2" />
                                Créer mon CV gagnant
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-[#85a8c9] bg-white/70 hover:bg-white text-sky-950 font-bold shadow-sm">
                            <Link href="/dashboard/jobs">
                                <Target size={18} className="mr-2 text-primary-700" />
                                Voir les offres
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── 2. Premium Upsell (Clean UI) ── */}
            {!isPremium && (
                <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800 dark:bg-neutral-900 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400">
                            <Crown size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                Passez en mode VIP <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/50 dark:text-amber-300">Essai Gratuit</Badge>
                            </h3>
                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                                Multipliez vos chances par 10 : Messagerie directe avec les recruteurs, numéros WhatsApp, mise en avant instantanée.
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 sm:text-right">
                        <Button asChild className="w-full sm:w-auto bg-amber-500 text-white hover:bg-amber-600 shadow-none font-bold">
                            <Link href="/dashboard/payment">
                                Activer mes 3 mois gratuits
                                <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            {/* ── 3. KPIs & Stats (Clean UI) ── */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* CV Progress */}
                <Card className="col-span-1 lg:col-span-2 border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl">
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                                    <Target size={20} />
                                </div>
                                <div>
                                    <p className="font-heading font-bold text-neutral-900 dark:text-neutral-100">
                                        Potentiel du Profil
                                    </p>
                                    <p className="text-xs text-neutral-500 font-medium">Objectif : 100%</p>
                                </div>
                            </div>
                            <span className="font-heading text-3xl font-black text-primary-600 dark:text-primary-400">
                                {cvCompletion}%
                            </span>
                        </div>

                        <div>
                            <Progress
                                value={cvCompletion}
                                className="h-2.5 mb-3 bg-neutral-100 dark:bg-neutral-800 rounded-full"
                                indicatorClassName={cvCompletion >= 90 ? "bg-emerald-500 rounded-full" : "bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"}
                            />
                            <div className="flex justify-between items-center text-xs font-semibold">
                                {cvCompletion >= 90 ? (
                                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12} /> Complet</span>
                                ) : (
                                    <>
                                        <span className="text-neutral-500 flex items-center gap-1"><CheckCircle2 size={12} /> Incomplet</span>
                                        <Link href="/dashboard/profile" className="text-primary-600 hover:underline dark:text-primary-400">
                                            Compléter maintenant &rarr;
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications Stats */}
                <Card className="border-neutral-200/60 shadow-sm hover:border-primary-300 transition-all dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl group">
                    <Link href="/dashboard/applications" className="block h-full">
                        <CardContent className="p-6 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="rounded-xl bg-neutral-100 p-2.5 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                    <FileSignature size={20} />
                                </div>
                                <ArrowRight size={16} className="text-neutral-300 dark:text-neutral-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div className="mt-4">
                                <p className="font-heading text-4xl font-black text-neutral-900 dark:text-neutral-100">0</p>
                                <p className="text-sm font-medium text-neutral-500 mt-1">Candidatures envoyées</p>
                            </div>
                        </CardContent>
                    </Link>
                </Card>

                {/* Profile Views */}
                <Card className="border-neutral-200/60 shadow-sm transition-all dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-accent-500/10 to-transparent rounded-bl-full pointer-events-none" />
                    <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="rounded-xl bg-accent-50 p-2.5 dark:bg-accent-950/30 text-accent-600 dark:text-accent-400">
                                <LineChart size={20} />
                            </div>
                            <Badge variant="outline" className="text-[10px] font-bold tracking-wider uppercase border-accent-200 text-accent-600 dark:border-accent-800 dark:text-accent-400">Stats</Badge>
                        </div>
                        <div className="mt-4">
                            <p className="font-heading text-4xl font-black text-neutral-300 dark:text-neutral-700">—</p>
                            <p className="text-sm font-medium text-neutral-500 mt-1">Vues de votre profil</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── 4. Main Content Area (Tools & Actions) ── */}
            <div className="grid gap-8 lg:grid-cols-3 items-start">

                {/* Left Col: Main Call to action / Missing steps */}
                <div className="lg:col-span-2">
                    <DynamicRoadmap />
                </div>

                {/* Right Col: Quick Tools Sidebar */}
                <div className="space-y-6">
                    <h2 className="font-heading text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Outils Rapides
                    </h2>

                    <div className="grid gap-3">
                        {/* Tool 1 */}
                        <Link href="/dashboard/cv-builder" className="group p-4 rounded-2xl border border-neutral-200/80 bg-white hover:border-primary-300 hover:shadow-md transition-all dark:border-neutral-800 dark:bg-neutral-900 flex items-center gap-4">
                            <div className="rounded-xl bg-primary-50 p-2.5 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                <FileSignature size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">Créateur de CV</p>
                                <p className="text-xs text-neutral-500">Modèles pro & design</p>
                            </div>
                            <ChevronRight size={16} className="text-neutral-400 group-hover:text-primary-500" />
                        </Link>

                        {/* Tool 2 */}
                        <Link href="/dashboard/advice/profile-analysis" className="group p-4 rounded-2xl border border-neutral-200/80 bg-white hover:border-violet-300 hover:shadow-md transition-all dark:border-neutral-800 dark:bg-neutral-900 flex items-center gap-4">
                            <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 group-hover:scale-110 transition-transform">
                                <Target size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">Analyse de Profil</p>
                                <p className="text-xs text-neutral-500">Score de visibilité</p>
                            </div>
                            <ChevronRight size={16} className="text-neutral-400 group-hover:text-violet-500" />
                        </Link>

                        {/* Tool 3 */}
                        <Link href="/dashboard/advice" className="group p-4 rounded-2xl border border-neutral-200/80 bg-white hover:border-rose-300 hover:shadow-md transition-all dark:border-neutral-800 dark:bg-neutral-900 flex items-center gap-4">
                            <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 group-hover:scale-110 transition-transform">
                                <PlayCircle size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">Coaching Vidéo</p>
                                <p className="text-xs text-neutral-500">Astuces d'experts RH</p>
                            </div>
                            <ChevronRight size={16} className="text-neutral-400 group-hover:text-rose-500" />
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}
