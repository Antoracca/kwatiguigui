import type { Metadata } from "next";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — KWATIGUIGUI",
  description:
    "Conditions generales d'utilisation de la plateforme KWATIGUIGUI — service d'emploi de la Republique Centrafricaine.",
  alternates: { canonical: "/terms" },
};

const TOC = [
  { id: "presentation", label: "Presentation du service" },
  { id: "inscription", label: "Inscription et compte" },
  { id: "utilisation", label: "Regles d'utilisation" },
  { id: "premium", label: "Offre Premium et paiements" },
  { id: "moderation", label: "Contenu et moderation" },
  { id: "donnees", label: "Protection des donnees" },
  { id: "responsabilite", label: "Responsabilite" },
  { id: "resiliation", label: "Resiliation" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="lg:flex lg:gap-12">
          {/* Sticky ToC (desktop) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-500" />
                  <p className="font-heading text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Table des matieres
                  </p>
                </div>
                <nav>
                  <ul className="space-y-1">
                    {TOC.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-primary-400"
                        >
                          <span className="text-xs text-neutral-400">{i + 1}.</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Header */}
            <div className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-700">
              <h1 className="font-heading text-fluid-5xl font-bold text-neutral-900 dark:text-neutral-100">
                Conditions d&apos;utilisation
              </h1>
              <p className="mt-3 text-fluid-sm text-neutral-500">
                Derniere mise a jour : 26 fevrier 2026 — Version 2.0
              </p>
              <div className="mt-4 rounded-xl border border-primary-100 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-950/30">
                <p className="text-fluid-sm text-primary-700 dark:text-primary-300">
                  En utilisant KWATIGUIGUI, vous acceptez les presentes conditions dans leur integralite.
                  Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              <Section id="presentation" title="1. Presentation du service">
                <p>
                  KWATIGUIGUI (ci-apres &ldquo;le Service&rdquo;, &ldquo;la Plateforme&rdquo;) est une plateforme
                  numerique de mise en relation entre employeurs et chercheurs d&apos;emploi en
                  Republique Centrafricaine, editee et exploitee depuis Bangui, RCA.
                </p>
                <p className="mt-3">
                  L&apos;utilisation de KWATIGUIGUI implique l&apos;acceptation pleine et entiere des
                  presentes conditions generales d&apos;utilisation (CGU). Ces conditions peuvent etre
                  modifiees a tout moment par l&apos;editeur ; les utilisateurs seront notifies des
                  changements significatifs.
                </p>
              </Section>

              <Section id="inscription" title="2. Inscription et compte utilisateur">
                <p>
                  L&apos;inscription est gratuite et ouverte a toute personne physique agee d&apos;au
                  moins 18 ans residant ou ayant des interets professionnels en Republique Centrafricaine.
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Chaque utilisateur ne peut posseder qu'un seul compte actif.",
                    "Les informations fournies lors de l'inscription doivent etre exactes, completes et tenues a jour.",
                    "L'utilisateur est responsable de la confidentialite de ses identifiants de connexion.",
                    "Le numero WhatsApp sert d'identifiant unique — il ne peut pas etre modifie apres inscription.",
                    "KWATIGUIGUI se reserve le droit de suspendre tout compte dont les informations seraient fausses ou trompeuses.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="utilisation" title="3. Regles d'utilisation">
                <p>L&apos;utilisateur s&apos;engage a ne pas :</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Publier des annonces fictives, frauduleuses ou trompeuses.",
                    "Utiliser la plateforme a des fins illegales ou contraires a l'ordre public centrafricain.",
                    "Harcel, insulter ou menacer d'autres utilisateurs.",
                    "Tenter de contourner les mesures de securite de la plateforme.",
                    "Partager ou vendre les donnees de contact d'autres utilisateurs a des tiers.",
                    "Utiliser des robots ou scripts automatises pour acceder au service.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-error-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="premium" title="4. Offre Premium et paiements">
                <p>
                  KWATIGUIGUI propose un abonnement Premium payant donnant acces a des
                  fonctionnalites avancees.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <table className="w-full text-fluid-sm">
                    <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Plan</th>
                        <th className="px-4 py-3 text-left font-semibold">Tarif</th>
                        <th className="px-4 py-3 text-left font-semibold">Duree</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                      <tr>
                        <td className="px-4 py-3">Mensuel</td>
                        <td className="px-4 py-3 font-semibold">2 500 FCFA</td>
                        <td className="px-4 py-3">30 jours</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Semestriel</td>
                        <td className="px-4 py-3 font-semibold">12 500 FCFA</td>
                        <td className="px-4 py-3">6 mois</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Annuel</td>
                        <td className="px-4 py-3 font-semibold">25 000 FCFA</td>
                        <td className="px-4 py-3">12 mois</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "Le paiement s'effectue exclusivement via Orange Money ou Telecel Money.",
                    "L'abonnement n'est pas renouvelable automatiquement.",
                    "Aucun remboursement n'est possible apres activation de l'abonnement.",
                    "En cas d'echec de paiement, aucun montant n'est debite.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="moderation" title="5. Contenu et moderation">
                <p>
                  Toute annonce publiee sur KWATIGUIGUI est soumise a une verification manuelle
                  avant publication. L&apos;equipe de moderation peut, sans preavis ni indemnisation :
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Refuser ou supprimer toute annonce jugee inappropriee, frauduleuse ou contraire aux bonnes moeurs.",
                    "Suspendre le compte de tout utilisateur en violation des CGU.",
                    "Modifier les informations d'une annonce en cas d'erreur manifeste.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3">
                  Les annonces sont publiees pour une duree maximale de 30 jours, a l&apos;issue
                  desquels elles sont automatiquement desactivees.
                </p>
              </Section>

              <Section id="donnees" title="6. Protection des donnees personnelles">
                <p>
                  KWATIGUIGUI collecte et traite les donnees personnelles de ses utilisateurs
                  conformement a la legislation en vigueur en Republique Centrafricaine.
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Les numeros de telephone et contacts WhatsApp ne sont visibles que par les utilisateurs Premium.",
                    "Les donnees ne sont jamais vendues a des tiers.",
                    "L'utilisateur peut demander la suppression de son compte et de ses donnees par WhatsApp.",
                    "Les donnees sont stockees sur des serveurs securises avec chiffrement en transit (HTTPS/TLS).",
                    "Les mots de passe sont haches avec un algorithme securise (Argon2) — KWATIGUIGUI n'a pas acces aux mots de passe en clair.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="responsabilite" title="7. Limitation de responsabilite">
                <p>
                  KWATIGUIGUI agit en tant qu&apos;intermediaire technique et ne peut etre tenu
                  responsable :
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Des engagements, contrats ou transactions conclus entre utilisateurs via la plateforme.",
                    "De la veracite des informations fournies par les utilisateurs.",
                    "Des dommages indirects lies a l'utilisation ou l'interruption du service.",
                    "Des contenus de sites tiers auxquels des liens peuvent pointer.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="resiliation" title="8. Resiliation">
                <p>
                  L&apos;utilisateur peut a tout moment desactiver son compte depuis les parametres
                  ou en contactant le support. La desactivation entraine la disparition du profil
                  et des annonces des resultats publics.
                </p>
                <p className="mt-3">
                  KWATIGUIGUI se reserve le droit de resilier tout compte en cas de violation
                  grave des presentes CGU, sans preavis et sans remboursement de l&apos;abonnement
                  en cours.
                </p>
              </Section>

              <Section id="contact" title="9. Contact et support">
                <p>
                  Pour toute question, reclamation ou demande relative aux presentes conditions :
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 text-fluid-base">
                    <span className="font-medium">WhatsApp :</span>
                    <a
                      href="https://wa.me/23674143434"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400"
                    >
                      +236 74 14 34 34
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-fluid-base">
                    <span className="font-medium">Email :</span>
                    <a
                      href="mailto:support@kwatiguigui.org"
                      className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400"
                    >
                      support@kwatiguigui.org
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-fluid-base">
                    <span className="font-medium">Adresse :</span>
                    <span>Bangui, Republique Centrafricaine</span>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 font-heading text-fluid-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <div className="text-fluid-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </section>
  );
}
