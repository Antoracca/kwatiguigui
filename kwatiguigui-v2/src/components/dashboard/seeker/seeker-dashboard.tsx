import { ArrowRight, BookOpen, Briefcase, FileText, Sparkles, TrendingUp, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Database } from "@/types/database";

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

    // FIXME: Fetch real completion dynamically later
    const cvCompletion = 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-body-sm text-neutral-400">{todayCapitalized}</p>
                    <h1 className="mt-1 font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Bonjour, {firstName}
                    </h1>
                    <p className="text-body-sm text-neutral-500 mt-1">
                        Prêt à décrocher votre prochaine opportunité ?
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/cv-builder">
                        <Button variant="primary" size="sm" className="shadow-sm">
                            <FileText size={14} className="mr-2" />
                            Créer mon CV
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Premium Upsell — design épuré fond blanc */}
            {!isPremium && (
                <div className="flex flex-col gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-primary-900/30 dark:bg-neutral-900">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                Pack VIP — 3 mois d&apos;essai gratuit
                            </p>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Visibilité x10, messagerie directe, accès aux contacts WhatsApp des entreprises.
                            </p>
                            <div className="mt-2 flex flex-wrap gap-3">
                                {["Visibilité x10", "Messagerie directe", "Accès Contacts"].map((f) => (
                                    <span key={f} className="flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400">
                                        <CheckCircle2 size={12} />
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <Link href="/dashboard/payment">
                            <Button size="sm" className="whitespace-nowrap bg-primary-600 text-white hover:bg-primary-700">
                                Essai gratuit
                                <ArrowRight size={14} className="ml-1.5" />
                            </Button>
                        </Link>
                        <p className="mt-1 text-center text-[10px] text-neutral-400">Ensuite 5 000 FCFA / mois</p>
                    </div>
                </div>
            )}

            {/* Stats & Tools Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* CV Progress */}
                <Card className="col-span-1 lg:col-span-2 border-primary-100 dark:border-primary-900/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-bg-white dark:from-primary-950/20 dark:to-neutral-950 pointer-events-none" />
                    <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                    <FileText size={16} className="text-primary-500" />
                                    Profil & CV
                                </p>
                                <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">
                                    Un CV complet a 80% plus de chances d'être repéré.
                                </p>
                            </div>
                            <span className="font-heading text-heading-md font-bold text-primary-600 dark:text-primary-400">
                                {cvCompletion}%
                            </span>
                        </div>

                        <div>
                            <Progress value={cvCompletion} className="h-2 mb-2 bg-neutral-100 dark:bg-neutral-800" indicatorClassName="bg-primary-500" />
                            <p className="text-xs text-neutral-400 font-medium">Aucun CV importé pour le moment.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications */}
                <Card className="hover:border-primary-200 transition-colors">
                    <Link href="/dashboard/applications" className="block h-full">
                        <CardContent className="p-6 flex flex-col h-full justify-between">
                            <div className="rounded-xl bg-secondary-50 p-3 w-fit dark:bg-secondary-950/40 mb-3">
                                <Briefcase size={20} className="text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <div>
                                <p className="mt-0.5 font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                                    0
                                </p>
                                <p className="text-body-sm text-neutral-500 font-medium">Candidatures</p>
                            </div>
                        </CardContent>
                    </Link>
                </Card>

                {/* Profile Views */}
                <Card className="hover:border-primary-200 transition-colors">
                    <CardContent className="p-6 flex flex-col h-full justify-between">
                        <div className="rounded-xl bg-accent-50 p-3 w-fit dark:bg-accent-950/40 mb-3">
                            <TrendingUp size={20} className="text-accent-600 dark:text-accent-400" />
                        </div>
                        <div>
                            <p className="mt-0.5 font-heading text-heading-md font-bold text-neutral-900 dark:text-neutral-100">
                                —
                            </p>
                            <p className="text-body-sm text-neutral-500 font-medium flex items-center gap-1">Vues <Badge variant="default" className="px-1.5 py-0 text-[10px]">Bientôt</Badge></p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Two columns layout for Recommendations & Advice */}
            <div className="grid gap-6 lg:grid-cols-3 items-start">
                {/* Recommendated Jobs */}
                <div className="lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                            <Sparkles size={18} className="text-accent-500" />
                            Offres recommandées
                        </h2>
                        <Link
                            href="/dashboard/recommendations"
                            className="flex items-center gap-1 text-body-sm font-medium text-primary-500 hover:text-primary-600"
                        >
                            Voir tout
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <Card className="border-dashed border-2 bg-neutral-50/50 dark:bg-neutral-900/20">
                        <CardContent className="flex flex-col items-center py-12 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-neutral-900 shadow-sm border border-neutral-100 dark:border-neutral-800">
                                <Briefcase size={28} className="text-neutral-300 dark:text-neutral-600" />
                            </div>
                            <h3 className="font-heading text-body-lg font-semibold text-neutral-800 dark:text-neutral-200">
                                Complétez votre profil
                            </h3>
                            <p className="mt-2 text-body-sm text-neutral-500 max-w-sm leading-relaxed">
                                Importez votre CV ou remplissez votre profil pour que nous puissions vous recommander des offres (Emplois, Stages, Alternances) adaptées.
                            </p>
                            <Link href="/dashboard/profile" className="mt-6">
                                <Button variant="outline" size="md" className="font-semibold shadow-sm">
                                    Mettre à jour mon profil
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Resources Sidebar */}
                <div className="space-y-4">
                    <h2 className="font-heading text-heading-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <BookOpen size={18} className="text-secondary-500" />
                        Ressources
                    </h2>

                    <Card className="hover:border-primary-300 transition-colors group cursor-pointer overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-50/50 dark:to-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-5 flex items-start gap-4 h-full relative z-10">
                            <div className="rounded-lg bg-primary-50 p-2.5 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shrink-0">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Notre Générateur de CV</p>
                                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Créez un CV professionnel en 5 minutes avec nos modèles exclusifs.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-accent-300 transition-colors group cursor-pointer overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent-50/50 dark:to-accent-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-5 flex items-start gap-4 h-full relative z-10">
                            <div className="rounded-lg bg-accent-50 p-2.5 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 shrink-0">
                                <Briefcase size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">Préparer ses entretiens</p>
                                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Les 30 questions les plus posées par les recruteurs en RCA.</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
