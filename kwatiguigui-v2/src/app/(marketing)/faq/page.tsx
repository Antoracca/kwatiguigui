import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, MessagesSquare, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
    title: "Centre d'aide & FAQ | KUSSALA",
    description: "Trouvez les réponses à vos questions sur l'utilisation de KUSSALA : création de compte, publication d'offres de recrutement, tarifications, etc.",
    alternates: { canonical: "/faq" },
};

const FAQS = [
    {
        question: "Combien coûte la création d'un compte candidat ?",
        answer: "La création d'un profil standart est 100% gratuite. Vous pouvez postuler aux offres, utiliser notre générateur de CV basique et accéder aux conseils carrière sans aucun frais. Nous proposons également un Pack PRO VIP pour ceux qui veulent maximiser leur visibilité.",
    },
    {
        question: "Comment puis-je publier une offre d'emploi ?",
        answer: "Pour publier une offre, vous devez créer un compte 'Entreprise'. Une fois connecté, vous pourrez accéder à votre tableau de bord et cliquer sur 'Publier une offre'. Suivez ensuite les étapes pour détailler le profil recherché.",
    },
    {
        question: "Sécurisez-vous les offres contre les arnaques ?",
        answer: "Absolument. La sécurité est une priorité majeure en RCA. Chaque offre commerciale est modérée, et nous bloquons les entreprises qui demandent de l'argent aux candidats pour passer des entretiens ou obtenir un job.",
    },
    {
        question: "Qu'est-ce que le Pack VIP Entrepreneur ?",
        answer: "C'est un module payant qui permet aux entreprises d'accéder à notre CVthèque avec un vivier riche, de mettre leurs annonces en tête d'affiche, et de gérer leurs recrutements via un outil dédié (Kussala ATS).",
    },
    {
        question: "Puis-je modifier mon CV après l'avoir publié ?",
        answer: "Oui, vous pouvez mettre à jour votre profil et votre CV en ligne à tout moment depuis votre tableau de bord Candidat.",
    }
];

export default function FAQPage() {
    return (
        <>
            <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,64,175,0.2),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#050816_0%,#0a0f1f_55%)]">
                <div className="container-main relative text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-primary-700 shadow-sm dark:border-primary-800 dark:bg-neutral-900/80 dark:text-primary-300">
                        <HelpCircle className="h-4 w-4" />
                        Centre d'assistance
                    </div>

                    <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                        Foire aux <span className="text-gradient-primary">Questions</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                        Tout ce qu'il faut savoir sur KUSSALA, son fonctionnement et ses services.
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-narrow">
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <details key={i} className="group rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between p-6 font-heading text-lg font-bold text-neutral-900 dark:text-white">
                                    {faq.question}
                                    <span className="ml-4 shrink-0 transition duration-300 group-open:-rotate-180">
                                        <ChevronDown className="h-5 w-5 text-neutral-500" />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-16 rounded-3xl border border-secondary-200 bg-secondary-50 p-10 text-center dark:border-secondary-800 dark:bg-secondary-950/30">
                        <h2 className="font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-white">
                            Vous n'avez pas trouvé votre réponse ?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-fluid-base text-neutral-600 dark:text-neutral-300">
                            Notre équipe est prête à vous aider, que vous soyez un chercheur d'emploi ou une entreprise souhaitant recruter.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-secondary-600 px-6 py-2.5 text-fluid-sm font-semibold text-white transition-colors hover:bg-secondary-700"
                            >
                                <MessagesSquare className="h-4 w-4" />
                                Contactez le support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
