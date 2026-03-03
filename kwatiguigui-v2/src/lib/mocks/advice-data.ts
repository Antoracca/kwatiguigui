// src/lib/mocks/advice-data.ts

export const CATEGORIES = [
    { id: "all", label: "À la une" },
    { id: "cv", label: "CV & Lettres" },
    { id: "interview", label: "Entretiens" },
    { id: "market", label: "Marché & Salaires" },
];

export const ARTICLES = [
    {
        id: "a1",
        title: "Comment justifier un « trou » dans son CV sans mentir ?",
        excerpt: "Les périodes d'inactivité font peur, mais elles peuvent être présentées comme des opportunités d'apprentissage. Voici 3 techniques approuvées par les recruteurs.",
        content: `
## L'angoisse du vide sur le CV

Qu'il s'agisse d'un congé sabbatique, d'une période de recherche prolongée ou d'une reconversion, avoir une période sans emploi officiel sur son CV est une situation courante. Pourtant, c'est souvent la source numéro une d'angoisse avant un entretien.

La règle d'or ? **Ne jamais mentir.** Les vérifications de références (Reference Checks) sont de plus en plus fréquentes. Un mensonge découvert est éliminatoire à 100%, tandis qu'un "trou" bien expliqué peut même jouer en votre faveur.

### Technique 1 : Mettre en avant le formatatif

Avez-vous voyagé ? C'est de l'ouverture d'esprit et peut-être des compétences linguistiques.
Avez-vous suivi une formation en ligne (Coursera, Udemy) ? C'est de la proactivité.
Avez-vous fait du bénévolat ou de l'associatif ? C'est de l'engagement social.

*Exemple de formulation sur le CV :*
> "Janvier 2023 - Septembre 2023 : Période de transition active. Auto-formation au langage Python et implication en tant que trésorier au sein de l'association locale XYZ."

### Technique 2 : Regrouper par années plutôt que par mois

Si votre période d'inactivité a duré quelques mois, une astuce visuelle tolérée consiste à indiquer uniquement les années de vos expériences (si vous avez déjà plusieurs années d'expérience).

Au lieu de :
* _Chargé de Projet : Mars 2019 - Juin 2022_
* _(Trou de 8 mois)_
* _Chef de Projet : Février 2023 - Aujourd'hui_

Écrivez :
* _Chargé de Projet : 2019 - 2022_
* _Chef de Projet : 2023 - Présent_

### Technique 3 : Préparer un récit positif pour l'entretien

Si le recruteur pose la question (et il la posera si l'inactivité est récente), soyez prêt. Utilisez la structure : **Constat > Action > Résultat/Prêt pour l'avenir**.

> "Effectivement, après mon dernier poste, j'ai pris le temps de faire le point sur mes objectifs de carrière [Constat]. J'en ai profité pour consolider mon anglais et passer une certification en gestion de projet Agile [Action]. Aujourd'hui, je suis pleinement opérationnel et exactement là où je veux être pour m'investir dans ce nouveau défi avec vous [Résultat]."

En assumant pleinement votre parcours, vous transformez une faiblesse perçue en une démonstration de maturité professionnelle.
    `,
        category: "CV & Lettres",
        categoryId: "cv",
        readTime: "4",
        views: "1.2k",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80",
        isNew: true,
        author: {
            name: "Elvira K.",
            role: "Expert Recrutement",
            avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
        },
        publishedAt: "24 Oct 2023"
    },
    {
        id: "a2",
        title: "Les 5 soft skills les plus recherchées en Centrafrique en 2024",
        excerpt: "Au-delà des diplômes, les employeurs locaux misent de plus en plus sur le savoir-être. Découvrez les compétences comportementales qui font la différence.",
        content: "Le marché centrafricain évolue et les compétences techniques seules ne suffisent plus. Les recruteurs recherchent particulièrement l'adaptabilité, la communication interculturelle, la résolution de problèmes en environnement contraint, le leadership bienveillant et la résilience experte.",
        category: "Marché & Salaires",
        categoryId: "market",
        readTime: "6",
        views: "3.4k",
        imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&q=80",
        author: {
            name: "Jean-Paul Y.",
            role: "Consultant Carrière",
            avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
        },
        publishedAt: "15 Fév 2024"
    },
    {
        id: "a3",
        title: "« Parlez-moi de vous » : la formule exacte pour réussir cette question",
        excerpt: "C'est souvent la première question de l'entretien. Ne racontez pas votre vie personnelle ; utilisez plutôt la méthode Présent-Passé-Futur.",
        content: "Utilisez la méthode du pitch éclair. Commencez par votre situation actuelle (Présent), résumez brièvement les étapes clés qui vous y ont mené (Passé), et concluez sur pourquoi ce poste spécifique est la suite logique pour vous (Futur).",
        category: "Entretiens",
        categoryId: "interview",
        readTime: "5",
        views: "5.1k",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
        author: {
            name: "Elvira K.",
            role: "Expert Recrutement",
            avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
        },
        publishedAt: "10 Nov 2023"
    },
    {
        id: "a4",
        title: "L'art de la lettre de motivation (sans faire un copier-coller de ChatGPT)",
        excerpt: "Comment utiliser l'IA pour vous aider sans perdre la touche humaine qui convaincra le manager que vous êtes le candidat idéal.",
        content: "L'IA est un excellent assistant pour structurer vos idées, mais le fond doit venir de vous. Les recruteurs repèrent vite les tournures génériques. Personnalisez l'accroche avec un détail précis sur l'entreprise et parlez passion plutôt que d'aligner des mots-clés.",
        category: "CV & Lettres",
        categoryId: "cv",
        readTime: "7",
        views: "850",
        imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&q=80",
        author: {
            name: "Sarah T.",
            role: "Coach en Communication",
            avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
        },
        publishedAt: "05 Jan 2024"
    },
    {
        id: "a5",
        title: "Comment relancer une entreprise après un entretien sans paraître lourd",
        excerpt: "Le suivi est souvent négligé. Apprenez à rédiger un email de remerciement et de relance qui renforce votre candidature.",
        content: "Le lendemain de l'entretien, envoyez un court email pour remercier de l'échange, réitérer votre motivation, et glisser subtilement une idée ou un lien vers un article en rapport avec une problématique discutée. Cela montre que vous vous projetez déjà.",
        category: "Entretiens",
        categoryId: "interview",
        readTime: "3",
        views: "2.1k",
        imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80",
        author: {
            name: "Jean-Paul Y.",
            role: "Consultant Carrière",
            avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
        },
        publishedAt: "22 Déc 2023"
    },
    {
        id: "a6",
        title: "Les secteurs qui recrutent massivement à Bangui ce mois-ci",
        excerpt: "Une analyse détaillée des tendances de recrutement actuelles : tech, BTP, ONG et services administratifs en tête.",
        content: "Avec la numérisation croissante des services, le secteur Tech connait une forte demande locale. Le BTP reste moteur avec plusieurs chantiers majeurs annoncés. Les ONG continuent également de recruter des profils qualifiés en gestion de projet logistique et finance.",
        category: "Marché & Salaires",
        categoryId: "market",
        readTime: "5",
        views: "4.7k",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        isNew: true,
        author: {
            name: "Data Team Kwatiguigui",
            role: "Analystes Marché",
            avatarUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&q=80",
        },
        publishedAt: "Aujourd'hui"
    },
    {
        id: "a7",
        title: "Le guide complet de l'optimisation CV : La règle des 3 secondes",
        excerpt: "Les recruteurs ne passent que quelques secondes sur un CV avant de décider de son sort. Découvrez comment structurer votre CV pour un impact maximal.",
        content: `
## La cruelle réalité de la règle des 3 secondes

En moyenne, un recruteur passe entre 3 et 6 secondes à parcourir un CV lors du premier tri. Si l'information principale ne saute pas aux yeux immédiatement, votre candidature risque d'être écartée, même si vous êtes le candidat idéal.

### 1. La zone de chaleur du CV (Le tiers supérieur)
Le regard humain lit en "Z" ou en "F". Le tiers supérieur de votre CV est votre zone de publicité premium.
Il doit contenir :
- **Un titre clair** correspondant exactement au poste visé.
- **Une accroche (Résumé)** de 2 à 3 lignes expliquant qui vous êtes et votre valeur ajoutée.
- **Vos compétences clés** mises en avant sous forme de mots-clés (très utile pour passer les logiciels ATS).

### 2. Aérer le design, la loi de la respiration
Un CV trop dense est décourageant. N'hésitez pas à :
- Laisser de l'espace blanc (marges, espacement entre les sections).
- Utiliser des puces (bullet points) plutôt que de longs paragraphes pour détailler vos expériences.
- Mettre en gras les chiffres clés (réalisations, pourcentages, budgets gérés).

### 3. Moins de responsabilités, plus de résultats
La pire erreur est de lister sa fiche de poste. Le recruteur sait ce que fait un "Commercial". Ce qu'il veut savoir, c'est si vous étiez un *bon* commercial.
- *Faible :* "Prospection téléphonique de clients."
- *Fort :* "Acquisition de 15 nouveaux clients B2B au T3 2023, générant 20 Millions FCFA de CA."

Appliquez cette refonte aujourd'hui, et vous constaterez une augmentation immédiate de vos retours positifs. N'oubliez pas que vous pouvez utiliser notre **Créateur de CV Pro** intégré au dashboard pour appliquer ces règles automatiquement !
        `,
        category: "CV & Lettres",
        categoryId: "cv",
        readTime: "8",
        views: "12.5k",
        imageUrl: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200&q=80",
        isNew: true,
        author: {
            name: "Jean-Paul Y.",
            role: "Consultant Carrière",
            avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
        },
        publishedAt: "Hier"
    },
];

export const VIDEOS = [
    {
        id: "v1",
        title: "Masterclass : Construire un CV qui attire les recruteurs",
        speaker: "France Travail",
        role: "Service Public de l'Emploi",
        duration: "1:24",
        thumbnailUrl: "https://img.youtube.com/vi/cpBNIcBSS6k/maxresdefault.jpg",
        description: "Découvrez les règles fondamentales d'un CV efficace selon les recruteurs : les sections incontournables, comment structurer vos expériences et les erreurs les plus fréquentes à éviter absolument.",
        videoUrl: "https://www.youtube.com/embed/cpBNIcBSS6k",
    },
    {
        id: "v2",
        title: "Les 5 clés pour réussir votre entretien d'embauche",
        speaker: "Yann Piette",
        role: "Coach en Communication Professionnelle",
        duration: "12:30",
        thumbnailUrl: "https://img.youtube.com/vi/hVP3fn4PV1A/maxresdefault.jpg",
        description: "5 conseils concrets et immédiatement applicables : posture, écoute active, réponses aux questions pièges et techniques pour marquer positivement les esprits dès les premières minutes.",
        videoUrl: "https://www.youtube.com/embed/hVP3fn4PV1A",
    },
    {
        id: "v3",
        title: "Rédiger une lettre de motivation percutante",
        speaker: "Équipe Youzful",
        role: "Plateforme Orientation & Emploi",
        duration: "4:45",
        thumbnailUrl: "https://img.youtube.com/vi/GncQvihJ63s/maxresdefault.jpg",
        description: "Structure, ton et personnalisation : les 3 piliers d'une lettre de motivation différenciante. Apprenez à vous démarquer des centaines de candidatures génériques que reçoivent les recruteurs.",
        videoUrl: "https://www.youtube.com/embed/GncQvihJ63s",
    },
    {
        id: "v4",
        title: "Les Tips pour l'Emploi — Série officielle France Travail",
        speaker: "France Travail × TRACE",
        role: "Service Public de l'Emploi",
        duration: "Série · 20 épisodes",
        thumbnailUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&q=80",
        description: "Une série de 20 courtes vidéos pratiques créées par France Travail et le média TRACE : CV, entretiens, compétences, confiance en soi et toutes les stratégies pour booster votre recherche d'emploi.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLqvVw037WdRXORqGNQm4kkSM3sXRgT5CP",
    },
];
