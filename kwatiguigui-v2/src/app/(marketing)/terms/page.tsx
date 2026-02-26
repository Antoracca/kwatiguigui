import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Conditions generales d'utilisation de la plateforme KWATIGUIGUI.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
        Conditions d'utilisation
      </h1>
      <p className="mt-4 text-body-sm text-neutral-500">
        Derniere mise a jour : 26 fevrier 2026
      </p>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <h2>1. Presentation du service</h2>
        <p>
          KWATIGUIGUI est une plateforme en ligne de mise en relation entre
          employeurs et chercheurs d'emploi en Republique Centrafricaine.
          L'utilisation de la plateforme implique l'acceptation des presentes
          conditions.
        </p>

        <h2>2. Inscription et compte utilisateur</h2>
        <p>
          L'inscription est gratuite et ouverte a toute personne agee d'au
          moins 18 ans. Chaque utilisateur ne peut posseder qu'un seul compte.
          Les informations fournies doivent etre exactes et a jour.
        </p>

        <h2>3. Offre Premium</h2>
        <p>
          L'abonnement Premium au tarif de 2 500 FCFA/mois permet d'acceder
          a des fonctionnalites avancees (contacts directs, annonces
          illimitees, support prioritaire). Le paiement s'effectue via Orange
          Money ou Telecel Money.
        </p>

        <h2>4. Contenu et moderation</h2>
        <p>
          Les annonces publiees sont soumises a moderation. KWATIGUIGUI se
          reserve le droit de supprimer tout contenu inapproprie, frauduleux
          ou contraire aux bonnes moeurs.
        </p>

        <h2>5. Protection des donnees</h2>
        <p>
          Les donnees personnelles des utilisateurs sont protegees
          conformement a la legislation en vigueur en Republique
          Centrafricaine. Les numeros de telephone et contacts ne sont
          partages qu'avec les utilisateurs Premium.
        </p>

        <h2>6. Responsabilite</h2>
        <p>
          KWATIGUIGUI agit en tant qu'intermediaire et ne peut etre tenu
          responsable des engagements pris entre employeurs et chercheurs
          d'emploi via la plateforme.
        </p>

        <h2>7. Contact</h2>
        <p>
          Pour toute question relative aux presentes conditions, contactez-nous
          par WhatsApp au +236 74 14 34 34.
        </p>
      </div>
    </div>
  );
}
