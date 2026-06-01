// ===========================================================================
// KUSSALA V2 — Business Constants
// Single source of truth for all business data
// ===========================================================================

// ---------------------------------------------------------------------------
// Regions of the Central African Republic (20 prefectures)
// ---------------------------------------------------------------------------
export const RCA_REGIONS = [
  "Bangui",
  "Bamingui-Bangoran",
  "Basse-Kotto",
  "Haute-Kotto",
  "Haut-Mbomou",
  "Kemo",
  "Lobaye",
  "Mambere-Kadei",
  "Mbomou",
  "Nana-Grebizi",
  "Nana-Mambere",
  "Ombella-Mpoko",
  "Ouaka",
  "Ouham",
  "Ouham-Pende",
  "Sangha-Mbaere",
  "Vakaga",
  "Mambere",
  "Ouham-Fafa",
  "Sangha",
] as const;

export type RcaRegion = (typeof RCA_REGIONS)[number];

// ---------------------------------------------------------------------------
// Job types (17 + Autre)
// ---------------------------------------------------------------------------
export const JOB_TYPES = [
  "Aide menagere",
  "Chauffeur",
  "Gardien",
  "Cuisinier",
  "Nounous",
  "Ouvrier",
  "Secretaire",
  "Comptable",
  "Vendeur",
  "Technicien",
  "Infirmier",
  "Enseignant",
  "Mecanicien",
  "Electricien",
  "Plombier",
  "Macon",
  "Agent de securite",
  "Coiffeur",
  "Jardinier",
  "Autre",
] as const;

export type JobType = (typeof JOB_TYPES)[number];

// ---------------------------------------------------------------------------
// Sectors
// ---------------------------------------------------------------------------
export const SECTORS = [
  "Administration & Bureau",
  "Agriculture, Pêche & Élevage",
  "Artisanat & Métiers",
  "Banque, Assurance & Finance",
  "Bâtiment & Travaux Publics (BTP)",
  "Commerce, Vente & Distribution",
  "Communication, Médias & Marketing",
  "Culture, Art & Divertissement",
  "Droit & Juridique",
  "Éducation, Formation & Enseignement",
  "Énergie & Environnement",
  "Hôtellerie, Restauration & Tourisme",
  "Immobilier",
  "Industrie, Ingénierie & Production",
  "Informatique, Tech & Télécoms",
  "Logistique, Transport & Achat",
  "Mécanique & Maintenance",
  "Ménage, Entretien & Services domestiques",
  "Santé, Médecine & Pharmacie",
  "Sécurité & Gardiennage",
  "Services à la personne",
  "Autre secteur",
] as const;

export type Sector = (typeof SECTORS)[number];

// ---------------------------------------------------------------------------
// Experience levels
// ---------------------------------------------------------------------------
export const EXPERIENCE_LEVELS = [
  { value: "none", label: "Aucune expérience" },
  { value: "1+", label: "1 an +" },
  { value: "3+", label: "3 ans +" },
  { value: "5+", label: "5 ans +" },
  { value: "10+", label: "10 ans +" },
  { value: "15+", label: "15 ans +" },
  { value: "20+", label: "20 ans +" },
  { value: "other", label: "Autres / Préciser" },
] as const;

export const EXPERIENCE_VALUES = EXPERIENCE_LEVELS.map((e) => e.value) as [
  "none", "1+", "3+", "5+", "10+", "15+", "20+", "other"
];

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]["value"];

// ---------------------------------------------------------------------------
// User types
// ---------------------------------------------------------------------------
export const USER_TYPES = ["seeker", "employer"] as const;
export type UserType = (typeof USER_TYPES)[number];

export const USER_TYPE_LABELS: Record<UserType, string> = {
  seeker: "Chercheur d'emploi",
  employer: "Employeur",
};

// ---------------------------------------------------------------------------
// Publication status
// ---------------------------------------------------------------------------
export const PUBLICATION_STATUSES = [
  "draft",
  "pending",
  "published",
  "rejected",
] as const;
export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];

export const PUBLICATION_STATUS_LABELS: Record<PublicationStatus, string> = {
  draft: "Brouillon",
  pending: "En attente",
  published: "Publiee",
  rejected: "Rejetee",
};

// ---------------------------------------------------------------------------
// Payment
// ---------------------------------------------------------------------------
export const PAYMENT_METHODS = ["orange", "telecel"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  orange: "Orange Money",
  telecel: "Telecel Money",
};

export const PAYMENT_STATUSES = ["pending", "completed", "failed"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------
export const PRICING = {
  FREE_JOB_LIMIT: 5,
  PREMIUM_MONTHLY: 2_500,
  PREMIUM_BIANNUAL: 12_500,
  PREMIUM_ANNUAL: 25_000,
  SEEKER_STANDARD_MONTHLY: 2_499,
  SEEKER_PRO_MONTHLY: 4_900,
  CURRENCY: "FCFA",
  CURRENCY_ISO: "XAF",
  JOB_EXPIRY_DAYS: 30,
} as const;

export const PRICING_PLANS = [
  {
    name: "Gratuit",
    price: 0,
    period: null,
    description: "Pour commencer sur KUSSALA",
    featured: false,
    features: [
      "Creer un profil",
      "Publier jusqu'a 5 annonces",
      "Apparaitre dans les resultats",
      "Acces aux formations et conseils",
    ],
    cta: "Commencer gratuitement",
  },
  {
    name: "Premium",
    price: 2_500,
    period: "mois",
    description: "Debloquez tout le potentiel de KUSSALA",
    featured: true,
    features: [
      "Annonces illimitees",
      "Contact WhatsApp direct",
      "Messages illimites",
      "Support prioritaire",
      "Visibilite maximale",
      "Badge Premium sur le profil",
    ],
    cta: "Passer a Premium",
  },
] as const;

export const SEEKER_PRICING_PLANS = [
  {
    name: "Gratuit",
    price: 0,
    period: null,
    description: "Le strict minimum pour débuter.",
    featured: false,
    features: [
      "Création de profil basique",
      "Visibilité standard",
      "Accès aux Masterclasses"
    ],
    cta: "Inclus",
  },
  {
    name: "Standard",
    price: 2_499,
    period: "mois",
    description: "Multipliez vos chances par 5.",
    featured: false,
    features: [
      "3 mois gratuits, puis 2 499 FCFA après (sans engagement)",
      "Mise en avant Prioritaire",
      "Support WhatsApp 24/7",
      "Recommandations d'offres prioritaires"
    ],
    cta: "Débuter mon essai de 3 mois",
  },
  {
    name: "VIP / PRO",
    price: 4_900,
    period: "mois",
    description: "L'arme absolue pour être recruté.",
    featured: true,
    features: [
      "3 mois gratuits, puis 4 900 FCFA après (sans engagement)",
      "Messagerie Directe (in-app) avec les recruteurs",
      "Mise en avant instantanée absolue",
      "Analyse avancée de Profil & CV"
    ],
    cta: "Débuter mon essai de 3 mois",
  },
] as const;

// ---------------------------------------------------------------------------
// Stats (marketing)
// ---------------------------------------------------------------------------
export const STATS = [
  { value: "1 200+", label: "Offres publiees" },
  { value: "3 500+", label: "Utilisateurs" },
  { value: "20", label: "Regions couvertes" },
  { value: "800+", label: "Mises en relation" },
] as const;

// ---------------------------------------------------------------------------
// Features (marketing)
// ---------------------------------------------------------------------------
export const FEATURES = [
  {
    title: "Couverture nationale",
    description:
      "Presente dans les 20 regions de la RCA, de Bangui aux zones les plus reculees.",
    icon: "globe",
  },
  {
    title: "Contact direct",
    description:
      "Contactez employeurs et chercheurs d'emploi directement via WhatsApp.",
    icon: "message",
  },
  {
    title: "Profils verifies",
    description:
      "Moderation active pour garantir des annonces authentiques et fiables.",
    icon: "shield",
  },
  {
    title: "Tous les secteurs",
    description:
      "Du formel a l'informel, chaque metier a sa place sur KUSSALA.",
    icon: "users",
  },
] as const;

// ---------------------------------------------------------------------------
// Mission & Values
// ---------------------------------------------------------------------------
export const MISSION =
  "KUSSALA a pour mission de revolutionner le marche de l'emploi en Republique Centrafricaine en creant un pont numerique entre les employeurs et les chercheurs d'emploi. Nous croyons que chaque Centrafricain merite d'avoir acces aux opportunites professionnelles, peu importe sa localisation ou son secteur d'activite.";

export const VALUES = [
  {
    title: "Accessibilite",
    description:
      "Rendre l'emploi accessible a tous, peu importe la localisation, le niveau d'instruction ou les moyens technologiques.",
  },
  {
    title: "Inclusion",
    description:
      "Accueillir tous les types d'emplois, du formel a l'informel, valorisant chaque metier.",
  },
  {
    title: "Simplicite",
    description:
      "Interface intuitive et processus simplifies, meme pour les moins familiers avec le numerique.",
  },
  {
    title: "Confiance",
    description:
      "Securite des donnees personnelles et connexions authentiques entre utilisateurs.",
  },
  {
    title: "Excellence",
    description:
      "Service de qualite superieure avec amelioration continue de la plateforme.",
  },
  {
    title: "Communaute",
    description:
      "Communaute professionnelle contribuant au developpement economique de la RCA.",
  },
] as const;

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------
export const TIMELINE = [
  {
    year: "2023",
    description:
      "Genese du projet. Etude de marche, conception du modele economique.",
  },
  {
    year: "2024",
    description:
      "Lancement officiel a Bangui. Integration Orange Money et Telecel Money.",
  },
  {
    year: "2024",
    description:
      "Expansion nationale aux 20 regions. Nouvelles categories, support WhatsApp.",
  },
  {
    year: "2025",
    description:
      "3 500+ utilisateurs. Lancement des abonnements Premium. Amelioration continue.",
  },
] as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const FAQ_ITEMS = [
  {
    question: "KUSSALA est-il uniquement disponible a Bangui ?",
    answer:
      "Non, KUSSALA couvre l'ensemble du territoire centrafricain, soit les 20 regions du pays. Que vous soyez a Bangui, Berberati, Bambari ou ailleurs, vous pouvez utiliser la plateforme.",
  },
  {
    question: "La plateforme est-elle reservee aux diplomes ?",
    answer:
      "Absolument pas. KUSSALA accueille tous les profils, du travailleur informel au cadre superieur. Chaque metier a sa place sur notre plateforme.",
  },
  {
    question:
      "Comment KUSSALA assure-t-il la fiabilite des annonces ?",
    answer:
      "Chaque annonce est soumise a un processus de moderation avant publication. Les utilisateurs peuvent egalement signaler les annonces suspectes.",
  },
  {
    question: "Peut-on utiliser la plateforme sans smartphone ?",
    answer:
      "Oui, KUSSALA est accessible depuis tout navigateur web, sur telephone, tablette ou ordinateur. Pas besoin d'application a installer.",
  },
] as const;

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const CONTACT = {
  WHATSAPP: "+236 74 14 34 34",
  WHATSAPP_LINK: "https://wa.me/23674143434",
  ORANGE_MONEY: "74 14 34 34",
  TELECEL_MONEY: "76 16 90 90",
  EMAIL: "support@kussala.org",
  ADDRESS: "Bangui, Republique Centrafricaine",
} as const;
