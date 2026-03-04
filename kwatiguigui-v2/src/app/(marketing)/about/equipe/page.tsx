import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UserCircle, HandHeart, Briefcase } from "lucide-react";

export const metadata: Metadata = {
    title: "Notre Équipe | KWATIGUIGUI RCA",
    description: "Découvrez les fondateurs et l'équipe derrière KWATIGUIGUI, la plateforme d'emploi numéro 1 en République Centrafricaine.",
    alternates: { canonical: "/about/equipe" },
};

export default function EquipePage() {
    return (
        <>
            <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,64,175,0.2),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#050816_0%,#0a0f1f_55%)]">
                <div className="container-main relative text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-primary-700 shadow-sm dark:border-primary-800 dark:bg-neutral-900/80 dark:text-primary-300">
                        <UserCircle className="h-4 w-4" />
                        L'équipe KWATIGUIGUI
                    </div>

                    <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                        Rencontrez les futurs <span className="text-gradient-primary">bâtisseurs</span> de la RCA
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                        Une équipe passionnée, alliant expertise technique et connaissance approfondie du contexte centrafricain pour digitaliser et sécuriser l'emploi.
                    </p>
                </div>
            </section>

            <section className="section-padding section-alt border-b border-neutral-100 dark:border-neutral-900">
                <div className="container-main">
                    {/* PLACEHOLDER POUR L'EQUIPE */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                                <div className="h-64 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                    <UserCircle className="h-20 w-20 text-neutral-300 dark:text-neutral-600" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white">
                                        Membre Fondateur {i}
                                    </h3>
                                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">Pôle Stratégie & Développement</p>
                                    <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                                        S'assure de l'alignement entre le produit digital et les nécessités locales pour fournir un matching optimal.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-narrow text-center">
                    <h2 className="mb-6 font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white text-center">Envie de nous rejoindre ?</h2>
                    <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                        Nous recrutons également pour renforcer notre propre équipe. Si vous êtes motivé à transformer le paysage professionnel centrafricain, regardez nos offres.
                    </p>
                    <Link
                        href="/jobs?company=Kwatiguigui"
                        className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-fluid-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                    >
                        <Briefcase className="h-4 w-4" />
                        Voir nos offres en interne
                    </Link>
                </div>
            </section>
        </>
    );
}
