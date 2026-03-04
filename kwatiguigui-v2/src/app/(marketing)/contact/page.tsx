import type { Metadata } from "next";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Nous contacter | KWATIGUIGUI",
    description: "Contactez l'équipe KWATIGUIGUI. Posez-nous vos questions, suggérez des améliorations, ou réclamez de l'aide pour votre profil candidat ou entreprise.",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return (
        <>
            <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,64,175,0.2),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#050816_0%,#0a0f1f_55%)]">
                <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-primary-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-secondary-400/20 blur-3xl" />

                <div className="container-main relative text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-fluid-sm font-semibold text-primary-700 shadow-sm dark:border-primary-800 dark:bg-neutral-900/80 dark:text-primary-300">
                        <MessageSquare className="h-4 w-4" />
                        Contact
                    </div>

                    <h1 className="font-heading text-fluid-5xl font-black leading-tight text-neutral-900 dark:text-white">
                        Prenez <span className="text-gradient-primary">contact</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-fluid-lg text-neutral-600 dark:text-neutral-300">
                        Une question, une remarque ou un projet de recrutement spécifique ? Laissez-nous un mot et notre équipe à Bangui vous répondra sous 24h.
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-main">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Infos de Contact */}
                        <div>
                            <h2 className="mb-6 font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-white">Nos coordonnées</h2>
                            <p className="mb-10 text-neutral-600 dark:text-neutral-400">
                                Vous préférez discuter de vive voix ou nous envoyer un email directement ? Retrouvez toutes les infos pour nous joindre.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">Bureaux</h3>
                                        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                                            Bangui, RCA<br />
                                            (L'adresse complète sera bientôt disponible)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-600 dark:bg-secondary-950 dark:text-secondary-400">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">Email</h3>
                                        <p className="mt-1">
                                            <a href={`mailto:${CONTACT.EMAIL}`} className="text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300 transition-colors">
                                                {CONTACT.EMAIL}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">Téléphone / WhatsApp</h3>
                                        <p className="mt-1">
                                            <a href={CONTACT.WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors">
                                                {CONTACT.WHATSAPP}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulaire de Contact */}
                        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                            <h3 className="mb-6 font-heading text-2xl font-bold text-neutral-900 dark:text-white">Envoyez-nous un message</h3>
                            <form className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Prénom</label>
                                        <input type="text" className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:text-white" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Nom</label>
                                        <input type="text" className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:text-white" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Email</label>
                                    <input type="email" className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:text-white" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Motif</label>
                                    <select className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:text-neutral-300" required>
                                        <option value="" disabled selected>Sélectionnez un motif</option>
                                        <option value="support_candidat">Support Candidat</option>
                                        <option value="support_entreprise">Support Entreprise</option>
                                        <option value="presse">Presse et Médias</option>
                                        <option value="partenariat">Demande de partenariat</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Message</label>
                                    <textarea rows={5} className="w-full resize-none rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:text-white" required></textarea>
                                </div>

                                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30">
                                    <Send className="h-4 w-4" />
                                    Envoyer le message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
