import {
    ArrowRight,
    Briefcase,
    Crown,
    Eye,
    MessageSquare,
    Plus,
    Users,
    Target,
    TrendingUp,
    Calendar,
    UserPlus,
    MapPin,
    Search
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JobCard } from "@/components/jobs/job-card";
import { PRICING } from "@/lib/constants";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Job = Database["public"]["Tables"]["jobs"]["Row"];
type Message = Database["public"]["Tables"]["messages"]["Row"];

export function EmployerDashboard({
    profile,
    isPremium,
    activeJobsCount,
    unreadCount,
    userJobs,
    recentMessages,
}: {
    profile: Profile | null;
    isPremium: boolean;
    activeJobsCount: number;
    unreadCount: number;
    userJobs: Job[];
    recentMessages: Message[];
}) {
    const firstName = profile?.first_name ?? "Employeur";
    const freeJobsUsed = Math.min(activeJobsCount ?? 0, PRICING.FREE_JOB_LIMIT);
    const freeJobsProgress = Math.round((freeJobsUsed / PRICING.FREE_JOB_LIMIT) * 100);

    const formattedJobs = (userJobs ?? []).map((row) => ({
        id: row.id,
        firstName: row.first_name,
        age: row.age,
        whatsapp: isPremium ? row.whatsapp : null,
        city: row.city,
        neighborhood: row.neighborhood ?? null,
        jobType: row.job_type,
        experience: row.experience ?? null,
        userType: row.user_type as "seeker" | "employer",
        isActive: row.is_active,
        createdAt: row.created_at,
        expiresAt: row.expires_at,
    }));

    const todayCapitalized = new Date()
        .toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .replace(/^./, (str) => str.toUpperCase());

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div>
                    <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 p-0 m-0 leading-tight">
                        Bonjour, {firstName}
                    </h1>
                    <p className="text-body-sm text-neutral-500 mt-1 flex items-center gap-2">
                        <Calendar size={14} className="text-neutral-400" />
                        {todayCapitalized}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {isPremium ? (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 dark:bg-accent-900/20 dark:border-accent-800 text-accent-700 dark:text-accent-400 text-sm font-semibold">
                            <Crown size={16} />
                            <span>Abonnement Premium Actif</span>
                        </div>
                    ) : (
                        <Link href="/dashboard/payment">
                            <Button variant="accent" size="md" className="hidden sm:flex">
                                <Crown size={16} />
                                Devenir Premium
                            </Button>
                        </Link>
                    )}
                    <Link href="/dashboard/candidates">
                        <Button variant="ghost" size="md" className="border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50">
                            <Search size={16} />
                            CVthèque
                        </Button>
                    </Link>
                    <Link href="/dashboard/jobs?new=1">
                        <Button variant="primary" size="md">
                            <Plus size={16} />
                            Nouvelle annonce
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Premium upsell banner (freemium only) */}
            {!isPremium && (
                <div className="relative overflow-hidden rounded-3xl bg-accent-500 p-8 text-white shadow-lg">
                    <div
                        className="absolute right-0 top-0 h-full w-1/2 opacity-10"
                        style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }}
                        aria-hidden
                    />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between z-10">
                        <div className="max-w-xl">
                            <div className="mb-2 flex items-center gap-2">
                                <Crown size={20} className="text-accent-200" />
                                <span className="font-heading text-body-sm font-bold text-accent-100 uppercase tracking-wider">
                                    Débloquez le recrutement accéléré
                                </span>
                            </div>
                            <h2 className="font-heading text-heading-md font-bold text-white mb-2">
                                Recrutez plus vite pour seulement 2 500 FCFA / mois
                            </h2>
                            <p className="text-body-md text-accent-100">
                                Consultez les contacts WhatsApp illimités, affichez la vitrine de votre entreprise,
                                et démarquez-vous des autres recruteurs avec le badge <strong className="text-white">Marque Employeur.</strong>
                            </p>
                        </div>
                        <Link href="/dashboard/payment" className="shrink-0">
                            <Button variant="primary" size="lg" className="bg-white text-accent-700 hover:bg-neutral-50 border-0 whitespace-nowrap shadow-xl">
                                Activer mon Pack Pro
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Core Stats Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Active jobs */}
                <Card className="rounded-2xl border-neutral-100 dark:border-neutral-800 hover:border-primary-300 transition-colors shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
                                <Briefcase size={22} />
                            </div>
                            {!isPremium && (
                                <span className="text-xs font-medium text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                                    {freeJobsUsed}/{PRICING.FREE_JOB_LIMIT} gratuit
                                </span>
                            )}
                        </div>
                        <p className="text-body-sm text-neutral-500 font-medium">Annonces actives</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
                                {activeJobsCount}
                            </h3>
                            {activeJobsCount > 0 && (
                                <span className="text-xs text-success-600 font-semibold flex items-center">+1 cette semaine</span>
                            )}
                        </div>
                        {!isPremium && (
                            <div className="mt-4">
                                <Progress value={freeJobsProgress} indicatorClassName={freeJobsProgress >= 80 ? "bg-warning-500" : "bg-primary-500"} className="h-1.5" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Applications Received (Mocked Metric) */}
                <Card className="rounded-2xl border-neutral-100 dark:border-neutral-800 hover:border-secondary-300 transition-colors shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-secondary-50 p-3 text-secondary-600 dark:bg-secondary-950/50 dark:text-secondary-400">
                                <Users size={22} />
                            </div>
                            <span className="text-xs font-medium text-success-600 bg-success-50 dark:bg-success-900/30 px-2 py-1 rounded-full flex items-center gap-1">
                                <TrendingUp size={10} /> +12%
                            </span>
                        </div>
                        <p className="text-body-sm text-neutral-500 font-medium">Candidatures reçues</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
                                0
                            </h3>
                        </div>
                        <p className="mt-2 text-xs text-neutral-400">Global sur 30 jours (Bientôt)</p>
                    </CardContent>
                </Card>

                {/* Profile views */}
                <Card className="rounded-2xl border-neutral-100 dark:border-neutral-800 hover:border-accent-300 transition-colors shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-accent-50 p-3 text-accent-600 dark:bg-accent-950/30 dark:text-accent-400">
                                <Eye size={22} />
                            </div>
                        </div>
                        <p className="text-body-sm text-neutral-500 font-medium">Vues des annonces</p>
                        <h3 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
                            —
                        </h3>
                        <p className="mt-2 text-xs text-neutral-400">Activer analytiques avancées</p>
                    </CardContent>
                </Card>

                {/* Response Rate / Unread Messages */}
                <Card className="rounded-2xl border-neutral-100 dark:border-neutral-800 hover:border-warning-300 transition-colors shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-warning-50 p-3 text-warning-600 dark:bg-warning-950/30 dark:text-warning-500">
                                <MessageSquare size={22} />
                            </div>
                            {unreadCount > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error-500 text-[10px] font-bold text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <p className="text-body-sm text-neutral-500 font-medium">Messages non lus</p>
                        <h3 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
                            {unreadCount}
                        </h3>
                        {unreadCount > 0 ? (
                            <Link href="/dashboard/messages" className="text-xs text-primary-600 mt-2 block font-medium hover:underline">
                                Répondre maintenant
                            </Link>
                        ) : (
                            <p className="mt-2 text-xs text-neutral-400">Vous êtes à jour, bravo !</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* MAIN TWO-COLUMN LAYOUT */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* LEFT COLUMN (Span 2): Active Jobs & Pipeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Jobs Section */}
                    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="font-heading text-heading-sm font-bold text-neutral-900 dark:text-neutral-100 inline-flex items-center gap-2">
                                    <Briefcase className="text-primary-500" />
                                    Performances de mes annonces
                                </h2>
                                <p className="text-body-sm text-neutral-500 mt-1">Gérez la publication et examinez vos besoins actuels.</p>
                            </div>
                            <Link href="/dashboard/jobs" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
                                Tout gérer
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {formattedJobs.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {formattedJobs.slice(0, 4).map((job) => (
                                    <JobCard key={job.id} job={job} isPremium={isPremium} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-sm">
                                    <Target size={28} className="text-neutral-400" />
                                </div>
                                <h3 className="font-heading text-heading-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Aucune annonce en cours
                                </h3>
                                <p className="mt-2 text-body-sm text-neutral-500 text-center max-w-sm mb-6">
                                    Créez facilement une demande de personnel et touchez des milliers de candidats locaux.
                                </p>
                                <Link href="/dashboard/jobs?new=1">
                                    <Button variant="primary" size="lg">
                                        <Plus size={16} />
                                        Rédiger une annonce
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Messages Section (Moved inside main column to keep layout clean) */}
                    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-heading text-heading-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                <MessageSquare className="text-primary-500 text-opacity-80" />
                                Boîte de Réception
                            </h2>
                            <Link href="/dashboard/messages" className="text-body-sm font-medium text-neutral-500 hover:text-primary-600 transition-colors">
                                Afficher tous
                            </Link>
                        </div>
                        {recentMessages.length > 0 ? (
                            <div className="space-y-3">
                                {recentMessages.slice(0, 3).map((msg) => (
                                    <Link key={msg.id} href={`/dashboard/messages?id=${msg.id}`}>
                                        <Card interactive className={`rounded-xl ${msg.is_read ? "border-neutral-200" : "border-primary-200 bg-primary-50/50 dark:border-primary-800 dark:bg-primary-950/20"}`}>
                                            <CardContent className="flex items-center gap-4 p-4">
                                                <div className={`shrink-0 h-3 w-3 rounded-full ${msg.is_read ? "bg-neutral-200" : "bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"}`} />
                                                <div className="min-w-0 flex-1">
                                                    <p className={`truncate font-heading text-body-sm ${msg.is_read ? "font-medium text-neutral-700 dark:text-neutral-300" : "font-bold text-neutral-900 dark:text-neutral-100"}`}>
                                                        {msg.subject}
                                                    </p>
                                                    <p className="mt-0.5 line-clamp-1 text-body-xs text-neutral-500">
                                                        {msg.content}
                                                    </p>
                                                </div>
                                                <span className="shrink-0 text-xs font-medium text-neutral-400">
                                                    {formatRelativeDate(msg.created_at)}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-8 text-center bg-neutral-50 rounded-xl dark:bg-neutral-900/50">
                                <MessageSquare className="mb-2 text-neutral-300" size={24} />
                                <p className="text-body-sm font-medium text-neutral-600 dark:text-neutral-400">Boîte vide</p>
                                <p className="text-xs text-neutral-500">Les candidats vous contacteront ici.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN (Span 1): Interviews & Suggested Candidates */}
                <div className="space-y-6">

                    {/* Upcoming Interviews (Mock Feature) */}
                    <Card className="rounded-3xl border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                            <h3 className="font-heading text-body-md font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                <Calendar size={18} className="text-neutral-500" />
                                Prochains Entretiens
                            </h3>
                        </div>
                        <CardContent className="p-0">
                            {/* Empty state for now since the feature is coming soon */}
                            <div className="p-8 text-center flex flex-col items-center justify-center">
                                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full mb-3">
                                    <Calendar className="text-neutral-400" size={20} />
                                </div>
                                <p className="text-body-sm font-semibold text-neutral-700 dark:text-neutral-300">Agenda synchronisé</p>
                                <p className="text-xs text-neutral-500 mt-1 mb-4 leading-relaxed">
                                    Bientôt, synchronisez Google Agenda pour planifier des entrevues d'un clic.
                                </p>
                                <Badge variant="secondary" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 text-[10px] uppercase font-bold tracking-wider">
                                    En développement
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Suggested Candidates (Premium Teaser Feature) */}
                    <Card className="rounded-3xl border-accent-200 overflow-hidden shadow-sm dark:border-accent-900/50">
                        <div className="bg-gradient-to-r from-accent-50 to-white dark:from-accent-950/20 dark:to-neutral-900 p-4 border-b border-accent-100 dark:border-accent-900/50 flex flex-col">
                            <h3 className="font-heading text-body-md font-bold text-accent-800 dark:text-accent-300 flex items-center gap-2">
                                <Users size={18} />
                                Candidats Suggérés
                            </h3>
                            <p className="text-xs text-neutral-500 mt-1">L'IA vous recommande ces talents</p>
                        </div>
                        <CardContent className="p-0">
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {/* MOCK CANDIDATE 1 */}
                                <div className="p-4 flex gap-3 items-start hover:bg-neutral-50 transition-colors dark:hover:bg-neutral-900/50 cursor-pointer">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-lg">
                                        M
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-heading text-body-sm font-bold text-neutral-900 dark:text-neutral-100">Mathieu D.</p>
                                        <p className="text-xs font-medium text-primary-600 mt-0.5">Chauffeur • 4 ans d'exp.</p>
                                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                                            <MapPin size={10} /> Bangui, Centre-ville
                                        </p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-accent-600 hover:bg-accent-50 rounded-full">
                                        <UserPlus size={16} />
                                    </Button>
                                </div>

                                {/* MOCK CANDIDATE 2 */}
                                <div className="p-4 flex gap-3 items-start hover:bg-neutral-50 transition-colors dark:hover:bg-neutral-900/50 cursor-pointer">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center font-bold text-lg">
                                        S
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-heading text-body-sm font-bold text-neutral-900 dark:text-neutral-100">Sarah B.</p>
                                        <p className="text-xs font-medium text-primary-600 mt-0.5">Secrétaire • 2 ans d'exp.</p>
                                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                                            <MapPin size={10} /> Miskine
                                        </p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-accent-600 hover:bg-accent-50 rounded-full">
                                        <UserPlus size={16} />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-3 bg-neutral-50 dark:bg-neutral-900/80 text-center border-t border-neutral-100 dark:border-neutral-800">
                                <Link href="/dashboard/candidates" className="text-xs font-bold text-accent-600 hover:text-accent-700">
                                    Voir les 24 autres talents ciblés
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Simple Help/Contact Card */}
                    <div className="rounded-2xl bg-neutral-50 p-5 dark:bg-neutral-900 flex items-start gap-4">
                        <div className="bg-white rounded-full p-2 shadow-sm text-primary-500 dark:bg-neutral-800">
                            <Target size={20} />
                        </div>
                        <div>
                            <p className="text-body-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1">Besoin d'aide au sourcing ?</p>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                Kwatiguigui peut sourcer des profils rares (ingénieurs, managers) sur-mesure pour vous.
                            </p>
                            <button className="text-xs font-bold text-primary-600 mt-2 underline">Nous contacter</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
