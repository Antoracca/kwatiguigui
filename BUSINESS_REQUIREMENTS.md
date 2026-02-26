# KWATIGUIGUI V2 -- BUSINESS REQUIREMENTS DOCUMENT

> Document genere a partir de l'analyse exhaustive du code source V1 (103 fichiers).
> Date d'analyse : 26 fevrier 2026
> Agent : kwatiguigui-v2-architect

---

## TABLE DES MATIERES

1. [Presentation du projet](#1-presentation-du-projet)
2. [Modele economique](#2-modele-economique)
3. [Types d'utilisateurs](#3-types-dutilisateurs)
4. [Donnees geographiques](#4-donnees-geographiques)
5. [Categories d'emploi et secteurs](#5-categories-demploi-et-secteurs)
6. [Schema de base de donnees existant (V1)](#6-schema-de-base-de-donnees-existant-v1)
7. [Schema de base de donnees cible (V2)](#7-schema-de-base-de-donnees-cible-v2)
8. [Flux fonctionnels](#8-flux-fonctionnels)
9. [Contenu textuel a preserver](#9-contenu-textuel-a-preserver)
10. [Contacts et informations de paiement](#10-contacts-et-informations-de-paiement)
11. [Audit de securite -- Vulnerabilites V1](#11-audit-de-securite----vulnerabilites-v1)
12. [Architecture V1 existante](#12-architecture-v1-existante)
13. [Fonctionnalites existantes V1](#13-fonctionnalites-existantes-v1)
14. [Fonctionnalites manquantes](#14-fonctionnalites-manquantes)
15. [Contraintes techniques et environnementales](#15-contraintes-techniques-et-environnementales)
16. [Pages a construire (V2)](#16-pages-a-construire-v2)
17. [Regles de developpement](#17-regles-de-developpement)

---

## 1. PRESENTATION DU PROJET

**KWATIGUIGUI** est la premiere plateforme d'emploi numerique de la Republique Centrafricaine (RCA). Elle connecte employeurs et chercheurs d'emploi dans les 20 regions du pays, de Bangui aux zones les plus reculees.

- **Site actuel** : www.kwatiguigui.org
- **Score audit securite V1** : 41/100
- **Genere par** : Bolt AI (template bolt-vite-react-ts)
- **Objectif V2** : Reconstruction totale, design de classe mondiale, securite blindee, SEO parfait, performance optimale.

---

## 2. MODELE ECONOMIQUE

### 2.1 Freemium

| Feature                    | Gratuit (0 FCFA)     | Premium              |
|----------------------------|----------------------|----------------------|
| Creer un profil            | Oui                  | Oui                  |
| Publier une annonce        | Oui                  | Oui                  |
| Apparaitre dans la liste   | Oui                  | Oui                  |
| Annonces visibles          | 3 max (V1) / 5 (V2) | Illimite             |
| Contact WhatsApp direct    | Non                  | Oui                  |
| Messages illimites         | Non                  | Oui                  |
| Support prioritaire        | Non                  | Oui                  |

### 2.2 Grille tarifaire

| Plan         | Prix         | Duree  | Equivalent EUR |
|--------------|--------------|--------|----------------|
| Mensuel      | 2 500 FCFA   | 30 j   | ~3,80 EUR      |
| Semestriel   | 12 500 FCFA  | 180 j  | ~19 EUR        |
| Annuel       | 25 000 FCFA  | 365 j  | ~38 EUR        |

### 2.3 Devise
- **Devise** : FCFA (code ISO : XAF)
- **Zone monetaire** : CEMAC (Communaute Economique et Monetaire de l'Afrique Centrale)

---

## 3. TYPES D'UTILISATEURS

| Type       | Code       | Description                                |
|------------|------------|--------------------------------------------|
| Chercheur  | `seeker`   | Personne a la recherche d'un emploi        |
| Employeur  | `employer` | Personne ou entreprise proposant un emploi |
| Admin      | `admin`    | Administrateur de la plateforme            |
| Moderateur | `moderator`| Moderateur de contenu                      |

---

## 4. DONNEES GEOGRAPHIQUES

### 4.1 Les 20 regions de la RCA (prefectures)

1. Bangui (capitale)
2. Bamingui-Bangoran
3. Basse-Kotto
4. Haute-Kotto
5. Haut-Mbomou
6. Kemo
7. Lobaye
8. Mambere-Kadei
9. Mbomou
10. Nana-Grebizi
11. Nana-Mambere
12. Ombella-Mpoko
13. Ouaka
14. Ouham
15. Ouham-Pende
16. Sangha-Mbaere
17. Vakaga
18. Mambere
19. Ouham-Fafa
20. Sangha

> Note : Le prompt V2 mentionne des regions additionnelles (Mambere-Gadzi, Ouham-Gazelle, Ouham-Wara, Ouham-Poutu) a valider avec le client.

---

## 5. CATEGORIES D'EMPLOI ET SECTEURS

### 5.1 Types d'emploi (17 + Autre)

1. Aide menagere
2. Chauffeur
3. Gardien
4. Cuisinier
5. Nounous
6. Ouvrier
7. Secretaire
8. Comptable
9. Vendeur
10. Technicien
11. Infirmier
12. Enseignant
13. Mecanicien
14. Electricien
15. Plombier
16. Macon
17. Agent de securite
18. Coiffeur
19. Jardinier
20. Autre (saisie libre)

### 5.2 Secteurs d'activite (14)

1. Agriculture & Elevage
2. Commerce & Vente
3. Batiment & Travaux Publics
4. Sante & Medecine
5. Education & Formation
6. Informatique & Technologie
7. Transport & Logistique
8. Hotellerie & Restauration
9. Artisanat & Metiers
10. Administration & Bureau
11. Securite & Gardiennage
12. Menage & Entretien
13. Services a la personne
14. Autre (saisie libre)

---

## 6. SCHEMA DE BASE DE DONNEES EXISTANT (V1)

### 6.1 Tables Supabase (actives dans le frontend V1)

**profiles**
```
id           uuid PK -> auth.users(id) ON DELETE CASCADE
first_name   text NOT NULL DEFAULT ''
age          integer NOT NULL DEFAULT 18
whatsapp     text NOT NULL DEFAULT ''
phone        text NOT NULL DEFAULT ''
region       text NOT NULL DEFAULT ''
city         text NOT NULL DEFAULT ''
neighborhood text NOT NULL DEFAULT ''
job_type     text NOT NULL DEFAULT ''
experience   text NOT NULL DEFAULT ''
user_type    text NOT NULL DEFAULT 'seeker' CHECK (seeker|employer)
is_active    boolean NOT NULL DEFAULT true
subscription_paid boolean NOT NULL DEFAULT false
expiry_date  timestamptz
created_at   timestamptz NOT NULL DEFAULT now()
```

**jobs**
```
id                 uuid PK DEFAULT gen_random_uuid()
user_id            uuid FK profiles(id) ON DELETE CASCADE [NULLABLE]
first_name         text NOT NULL DEFAULT ''
age                integer NOT NULL DEFAULT 18
whatsapp           text NOT NULL DEFAULT ''
region             text NOT NULL DEFAULT ''
city               text NOT NULL DEFAULT ''
neighborhood       text NOT NULL DEFAULT ''
job_type           text NOT NULL DEFAULT ''
experience         text NOT NULL DEFAULT ''
user_type          text NOT NULL DEFAULT 'seeker' CHECK (seeker|employer)
is_active          boolean NOT NULL DEFAULT true
publication_status text NOT NULL DEFAULT 'published' CHECK (draft|pending|published|rejected)
created_at         timestamptz NOT NULL DEFAULT now()
expires_at         timestamptz NOT NULL DEFAULT (now() + interval '30 days')
```

**payments**
```
id             uuid PK DEFAULT gen_random_uuid()
user_id        uuid NOT NULL FK profiles(id) ON DELETE CASCADE
amount         integer NOT NULL DEFAULT 2500
method         text NOT NULL DEFAULT 'orange' CHECK (orange|telecel)
status         text NOT NULL DEFAULT 'pending' CHECK (pending|completed|failed)
reference      text NOT NULL DEFAULT ''
transaction_id text NOT NULL DEFAULT ''
created_at     timestamptz NOT NULL DEFAULT now()
```

**messages**
```
id           uuid PK DEFAULT gen_random_uuid()
from_user_id uuid FK profiles(id) ON DELETE CASCADE [NULLABLE]
to_user_id   uuid NOT NULL FK profiles(id) ON DELETE CASCADE
subject      text NOT NULL DEFAULT ''
content      text NOT NULL DEFAULT ''
is_read      boolean NOT NULL DEFAULT false
is_starred   boolean NOT NULL DEFAULT false
is_archived  boolean NOT NULL DEFAULT false
category     text NOT NULL DEFAULT 'general' CHECK (job_inquiry|job_offer|general)
created_at   timestamptz NOT NULL DEFAULT now()
```

**job_types**
```
id          uuid PK DEFAULT gen_random_uuid()
name        text NOT NULL
category    text NOT NULL DEFAULT ''
description text NOT NULL DEFAULT ''
is_active   boolean NOT NULL DEFAULT true
created_at  timestamptz NOT NULL DEFAULT now()
```

**info_contents**
```
id           uuid PK DEFAULT gen_random_uuid()
type         text NOT NULL DEFAULT 'formation' CHECK (formation|stage|conseil)
title        text NOT NULL
content      text NOT NULL DEFAULT ''
author       text NOT NULL DEFAULT 'Admin'
category     text NOT NULL DEFAULT ''
location     text NOT NULL DEFAULT ''
duration     text NOT NULL DEFAULT ''
level        text NOT NULL DEFAULT ''
is_published boolean NOT NULL DEFAULT true
featured     boolean NOT NULL DEFAULT false
created_at   timestamptz NOT NULL DEFAULT now()
```

### 6.2 Tables Sequelize (backend Express -- NON utilisees par le frontend)

- **User** : id, firstName, lastName, email, whatsapp, phone, password (hashed bcrypt 12), age, region, city, neighborhood, jobType, experience, userType, role, isActive, isVerified, subscriptionPaid, subscriptionStartDate, subscriptionEndDate, profilePicture, lastLoginAt, emailVerificationToken, passwordResetToken, passwordResetExpires
- **Job** : id, userId, title, description, jobType, location, region, city, salary, salaryType, requirements, benefits, contractType, experienceLevel, isActive, isFeatured, expiresAt, views, applications
- **Payment** : id, userId, transactionId, externalTransactionId, amount, currency, method, phoneNumber, status, description, metadata, failureReason, processedAt, webhookReceived, webhookData
- **Media** : id, userId, filename, originalName, mimeType, size, path, url, thumbnailPath, thumbnailUrl, type, category, alt, description, metadata, isPublic, isActive

### 6.3 Index existants (Supabase)

- jobs_user_id_idx, jobs_region_idx, jobs_job_type_idx, jobs_is_active_idx, jobs_created_at_idx
- messages_to_user_id_idx, messages_from_user_id_idx
- payments_user_id_idx

---

## 7. SCHEMA DE BASE DE DONNEES CIBLE (V2)

Tables recommandees pour V2 (a valider) :

| # | Table               | Description                                         |
|---|---------------------|-----------------------------------------------------|
| 1 | profiles            | Profils utilisateurs etendus                        |
| 2 | jobs                | Annonces d'emploi                                   |
| 3 | payments            | Transactions de paiement                            |
| 4 | messages            | Messages entre utilisateurs                         |
| 5 | job_types           | Catalogue de types d'emploi (admin)                 |
| 6 | info_contents       | Contenu informatif (formations, stages, conseils)   |
| 7 | admin_users         | Comptes administrateurs (hashed passwords, MFA)     |
| 8 | admin_messages      | Messages support admin                              |
| 9 | regions             | Reference des regions RCA                           |
| 10| sectors             | Reference des secteurs d'activite                   |
| 11| subscriptions       | Gestion des abonnements (plan, status, dates)       |
| 12| audit_logs          | Journal d'audit des actions                         |
| 13| webhooks            | Log des webhooks recus (paiements)                  |
| 14| sessions            | Sessions utilisateur                                |
| 15| password_resets     | Tokens de reinitialisation mot de passe             |
| 16| email_verifications | Tokens de verification email                        |
| 17| otp_codes           | Codes OTP pour authentification                     |

---

## 8. FLUX FONCTIONNELS

### 8.1 Inscription utilisateur
1. L'utilisateur choisit son type (seeker / employer)
2. Formulaire multi-etapes :
   - Etape 1 : Prenom, age, type utilisateur
   - Etape 2 : WhatsApp, telephone, region, ville, quartier
   - Etape 3 : Type d'emploi (autocomplete + saisie libre), experience/motivation
3. **V1 (a corriger)** : email genere = `{whatsapp_digits}@kwatiguigui.cf`, mot de passe = 6 derniers chiffres du WhatsApp
4. **V2** : Forcer un vrai mot de passe (min 8 chars) OU authentification OTP via WhatsApp/SMS
5. Profil cree, annonce auto-generee a partir du profil
6. Redirection vers le dashboard

### 8.2 Connexion utilisateur
1. Saisie du numero WhatsApp + mot de passe
2. Verification des identifiants
3. Redirection vers le dashboard

### 8.3 Paiement premium
1. L'utilisateur choisit la methode de paiement (Orange Money / Telecel Money)
2. L'utilisateur saisit son numero de telephone mobile money
3. **V1 (a corriger)** : Paiement marque "completed" cote client sans verification
4. **V2** : Le backend initie le paiement aupres de l'operateur, le statut est mis a jour UNIQUEMENT via webhook HMAC
5. Abonnement active, duree selon le plan choisi

### 8.4 Publication d'annonces
1. L'annonce est creee automatiquement a partir du profil lors de l'inscription
2. L'utilisateur peut creer des annonces supplementaires (limite freemium)
3. Workflow de moderation : draft -> pending -> published / rejected
4. Annonce expire apres 30 jours
5. Les champs sensibles (WhatsApp, telephone) ne sont visibles que par les utilisateurs premium

### 8.5 Recherche d'emploi
1. Liste filtrable par : region, type d'emploi, type d'utilisateur (seeker/employer), mot-cle
2. Vue grille ou liste
3. Utilisateurs gratuits : voient 3 annonces (V1) / 5 (V2), le reste est floute
4. Utilisateurs premium : voient toutes les annonces avec contacts complets
5. Contact direct via WhatsApp (premium uniquement)

### 8.6 Administration
1. Login admin avec MFA obligatoire (V2)
2. Dashboard avec KPIs : utilisateurs, annonces, revenus, taux conversion
3. Gestion utilisateurs : liste, details, ban, verification
4. Moderation annonces : workflow publication_status
5. Gestion contenu : CRUD info_contents (formations, stages, conseils)
6. Gestion types d'emploi : CRUD job_types
7. Messages support : reception et reponse aux utilisateurs
8. Parametres : configuration plateforme

---

## 9. CONTENU TEXTUEL A PRESERVER

### 9.1 Mission
"KWATIGUIGUI a pour mission de revolutionner le marche de l'emploi en Republique Centrafricaine en creant un pont numerique entre les employeurs et les chercheurs d'emploi. Nous croyons que chaque Centrafricain merite d'avoir acces aux opportunites professionnelles, peu importe sa localisation ou son secteur d'activite."

### 9.2 Valeurs (6)
1. **Accessibilite** : Rendre l'emploi accessible a tous, peu importe la localisation, le niveau d'instruction ou les moyens technologiques.
2. **Inclusion** : Accueillir tous les types d'emplois, du formel a l'informel, valorisant chaque metier.
3. **Simplicite** : Interface intuitive et processus simplifies, meme pour les moins familiers avec le numerique.
4. **Confiance** : Securite des donnees personnelles et connexions authentiques.
5. **Excellence** : Service de qualite superieure, amelioration continue.
6. **Communaute** : Communaute professionnelle contribuant au developpement economique de la RCA.

### 9.3 Timeline historique
- **2023** : Genese du projet. Etude de marche, conception du modele.
- **2024** : Lancement officiel a Bangui. Integration Orange Money et Telecel Money.
- **2024** : Expansion nationale aux 20 regions. Nouvelles categories, support WhatsApp.
- **2025** : 3 500+ utilisateurs. Abonnements Premium. Amelioration continue.

### 9.4 Statistiques affichees (marketing)
- 1 200+ offres publiees
- 3 500+ utilisateurs inscrits
- 20 regions couvertes
- 800+ mises en relation

### 9.5 FAQ (4 questions)
1. "KWATIGUIGUI est-il uniquement disponible a Bangui ?" -- Non, couvre tout le territoire.
2. "La plateforme est-elle reservee aux diplomes ?" -- Non, tous les profils sont accueillis.
3. "Comment KWATIGUIGUI assure-t-il la fiabilite des annonces ?" -- Moderation + signalement.
4. "Peut-on utiliser la plateforme sans smartphone ?" -- Oui, accessible depuis tout navigateur.

### 9.6 Features marketing (page d'accueil)
1. **Connexion directe** : Contact direct via WhatsApp sans intermediaire.
2. **Couverture nationale** : 20 regions de la RCA.
3. **Tous secteurs** : Du formel a l'informel.
4. **Profils verifies** : Profils authentiques pour des mises en relation de confiance.

---

## 10. CONTACTS ET INFORMATIONS DE PAIEMENT

### 10.1 Contacts
- **WhatsApp** : +236 74 14 34 34
- **Orange Money** : 74 14 34 34
- **Telecel Money** : 76 16 90 90
- **Adresse** : Bangui, Republique Centrafricaine
- **Email support** : support@kwatiguigui.org
- **Domaine** : kwatiguigui.org / kwatiguigui.cf

### 10.2 Methodes de paiement
- **Orange Money RCA** : API USSD / Push Payment via `https://api.orange.com/orange-money-webpay/dev/v1`
- **Telecel Money RCA** : API via `https://api.telecel.cf/v1`

### 10.3 Format de reference paiement
`KWT-{timestamp}-{random9}` (ex: `KWT-1709123456-AB3F8G2K1`)

### 10.4 Instructions paiement Orange Money
1. Composez *144# sur votre telephone
2. Selectionnez "Paiement marchand"
3. Entrez le code marchand fourni
4. Confirmez le montant et validez avec votre code PIN

### 10.5 Instructions paiement Telecel Money
1. Composez *177# sur votre telephone
2. Selectionnez "Paiement"
3. Entrez le code marchand fourni
4. Confirmez le montant et validez avec votre code PIN

---

## 11. AUDIT DE SECURITE -- VULNERABILITES V1

### CVE-KWATI-001 -- CRITIQUE : Exposition PII sans authentification
**Fichier** : Schema SQL + RLS policies
**Description** : La table `jobs` est lisible par le role `anon` via l'API REST Supabase. N'importe qui peut obtenir noms, numeros WhatsApp, ages, localisations de tous les utilisateurs.
**Correction V2** : RLS stricte, champs sensibles jamais retournes en clair pour les non-premium, API backend custom.

### CVE-KWATI-002 -- CRITIQUE : Schema OpenAPI expose
**Fichier** : Supabase REST API
**Description** : `GET /rest/v1/` avec la cle anon retourne le schema Swagger complet (tables, colonnes, types, fonctions RPC).
**Correction V2** : Ne jamais exposer la cle anon au frontend, toutes les requetes DB passent par le backend API.

### CVE-KWATI-003 -- CRITIQUE : Identifiants admin en dur dans le code
**Fichier** : `src/contexts/AuthContext.tsx` ligne 133, `server/routes/auth.js` ligne 248
**Description** : `papyjackylolo@gmail.com` / `Cameroun237` (frontend) et `jaronabe@gmail.com` / `Cameroun237` (backend).
**Correction V2** : Auth admin via infra auth standard, MFA TOTP obligatoire, aucun identifiant en dur.

### CVE-KWATI-004 -- CRITIQUE : Mot de passe auto-genere faible
**Fichier** : `src/contexts/AuthContext.tsx` ligne 151
**Description** : Mot de passe = `whatsapp.slice(-6)` = 6 chiffres = bruteforcable en secondes.
**Correction V2** : Vrai mot de passe (min 8 chars, complexite) ou OTP WhatsApp/SMS. Rate limiting 5 tentatives / 15min.

### CVE-KWATI-005 -- CRITIQUE : Paiement marque "completed" cote client
**Fichier** : `src/pages/PaymentPage.tsx` lignes 28-44
**Description** : Le paiement est insere avec `status: 'completed'` sans verification aupres de l'operateur.
**Correction V2** : Backend initie le paiement, statut mis a jour uniquement via webhook HMAC, frontend poll le statut.

### CVE-KWATI-006 -- ELEVE : Headers de securite manquants
**Description** : Pas de CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy sur le frontend.
**Correction V2** : CSP stricte, HSTS, X-Frame-Options: DENY, etc.

### CVE-KWATI-007 -- ELEVE : SPA sans SSR = SEO catastrophique
**Fichier** : `index.html`
**Description** : HTML source = `<div id="root">`. Google ne voit rien. `lang="en"` au lieu de `lang="fr"`.
**Correction V2** : SSR/SSG, metadata dynamiques, JSON-LD, sitemap, robots.txt.

### CVE-KWATI-008 -- ELEVE : Secrets JWT/Session avec fallback en dur
**Fichier** : `server/middleware/auth.js`, `server/app.js`
**Description** : `JWT_SECRET || 'kwatiguigui-jwt-secret'`, `SESSION_SECRET || 'kwatiguigui-secret-key'`.
**Correction V2** : Pas de fallback, crash si secrets absents, gestion via vault.

### CVE-KWATI-009 -- MOYEN : Docker-compose avec mot de passe par defaut
**Fichier** : `docker-compose.yml`
**Description** : `POSTGRES_PASSWORD: password`.
**Correction V2** : Mot de passe genere aleatoirement, jamais commis dans le depot.

### CVE-KWATI-010 -- MOYEN : WhatsApp expose en clair dans les annonces
**Description** : Le numero WhatsApp est dans la table `jobs`. La protection premium est uniquement cote client (flou CSS).
**Correction V2** : Champs sensibles retires des reponses API pour les non-premium, filtrage cote serveur.

### CVE-KWATI-011 -- MOYEN : Edge function admin-profiles sans authentification
**Fichier** : `supabase/functions/admin-profiles/index.ts`
**Description** : Utilise le service role key, CORS ouvert a `*`, aucune verification d'auth.
**Correction V2** : Supprimer les edge functions, utiliser un backend securise.

### CVE-KWATI-012 -- MOYEN : Pas de rate limiting cote Supabase
**Description** : Le frontend communique directement avec Supabase sans rate limiting.
**Correction V2** : Toutes les requetes passent par le backend avec rate limiting.

### CVE-KWATI-013 -- FAIBLE : RLS completement ouverte sur toutes les tables
**Fichiers** : Migrations SQL 3, 4, 5, 6
**Description** : `WITH CHECK (true)` et `USING (true)` sur jobs, info_contents, messages = n'importe qui peut tout lire/modifier/supprimer.
**Correction V2** : RLS stricte ou backend custom qui gere l'acces.

---

## 12. ARCHITECTURE V1 EXISTANTE

### 12.1 Stack technique V1
- **Frontend** : React 18.3.1 + TypeScript + Vite 5.4.2 + Tailwind CSS 3.4.1
- **BaaS** : Supabase (PostgreSQL + Auth + REST API)
- **Backend** : Express.js 4.18.2 + Sequelize 6.35.0 (NON CONNECTE au frontend)
- **Routing** : react-router-dom 7.7.0 (SPA)
- **Icons** : lucide-react
- **Build** : Bolt AI template `bolt-vite-react-ts`

### 12.2 Probleme architectural critique
Le frontend et le backend sont DECONNECTES. Le frontend communique directement avec Supabase via le client JS. Le backend Express est du code mort avec :
- Un schema de donnees different (Sequelize vs Supabase)
- Un systeme d'auth different (JWT vs Supabase Auth)
- Des modeles de donnees differents

### 12.3 Pages existantes (V1)
- Home, Login, Register, Dashboard, Profile, Messages, Settings
- JobListings, JobSeekerInfo, Payment, About, Help, Terms
- AdminLogin, AdminDashboard
- Admin: Users, Jobs, Content, JobTypes, Settings, Messages, Publications

### 12.4 Composants existants (V1) -- 22 composants
Header, Footer, JobCard, ProfileEditor, PremiumModal, OnboardingModal, PaymentModal, PaymentHistory, AdvancedSearch, SearchFilters, JobTypeInput, AdminStats, ContentManagement, UserManagement, SystemSettings, ConfirmDialog, ErrorBoundary, LoadingSpinner, Toast, ToastContainer, NetworkStatus, HelpDrawer, AdPopup, NotificationSystem, MessageNotificationModal, AdminLayout

---

## 13. FONCTIONNALITES EXISTANTES V1

### 13.1 Frontend actif
- Inscription multi-etapes (3 steps)
- Login WhatsApp + mot de passe
- Dashboard avec profil, annonces, historique paiements
- Listing annonces avec filtres (region, job type, user type, keyword)
- Vues grid/list
- Edition de profil
- Paiement simule (sans verification)
- Dark mode
- Notifications locales (localStorage)
- Toast system
- JobCard avec flou pour utilisateurs gratuits (protection client-side uniquement)
- Admin login et dashboard
- 7 pages d'administration
- Page About complete
- Page Help, Terms, Info emploi
- Messagerie utilisateur
- Lazy loading des pages
- ErrorBoundary, NetworkStatus
- Ad popup premiere visite
- Job auto-creation a l'inscription
- Onboarding modal

### 13.2 Backend Express (code mort)
- Routes auth completes (register, login, admin-login, verify-email, forgot/reset/change-password)
- Routes payments (initiate, status, webhooks, history)
- Service Orange Money API (OAuth, initiate, checkStatus)
- Service Telecel Money API (initiate, checkStatus, signature HMAC)
- Templates email (welcome, subscription-activated, reset-password)
- Validation Joi
- Middleware auth JWT, requireRole, requireSubscription
- Modeles Sequelize (User, Job, Payment, Media)

---

## 14. FONCTIONNALITES MANQUANTES

### 14.1 Securite
- MFA / 2FA pour les admins
- CSRF protection
- Content Security Policy headers
- Rate limiting sur les requetes Supabase/API
- Validation des entrees cote frontend
- Sanitization XSS
- Audit log
- Gestion des sessions (token revocation)
- Chiffrement des donnees sensibles (WhatsApp, phone)
- Vrai mot de passe obligatoire

### 14.2 SEO
- SSR / SSG
- Meta tags (title, description, Open Graph, Twitter Cards)
- Sitemap.xml
- Robots.txt
- JSON-LD (schema.org JobPosting, Organization, FAQPage, BreadcrumbList)
- Canonical URLs
- URLs propres (`/emploi/aide-menagere-bangui` au lieu de `/jobs?id=123`)
- `lang="fr"` (actuellement `lang="en"`)

### 14.3 UX
- Page 404
- Pagination server-side
- Recherche server-side
- Upload d'image de profil
- Notifications push
- Indicateur de force du mot de passe
- Confirmation d'email fonctionnelle
- Recu de paiement PDF
- Page de detail d'annonce individuelle (`/jobs/[id]`)
- Mode offline / PWA
- Skeleton loaders (au lieu de spinners generiques)

### 14.4 Fonctionnalites business
- Verification des paiements reelle via webhook
- Verification des profils par l'admin
- Moderation des annonces fonctionnelle
- Systeme de signalement
- Blog / articles SEO
- Statistiques admin detaillees (graphiques, KPIs temporels)
- Export de donnees
- i18n (sango)
- Multi-plans (mensuel, semestriel, annuel)
- Reconciliation automatique des paiements
- Anti-fraude (un compte = un utilisateur)

---

## 15. CONTRAINTES TECHNIQUES ET ENVIRONNEMENTALES

### 15.1 Infrastructure reseau RCA
- Connexions internet limitees et lentes dans les zones rurales
- Utilisation predominante de reseaux mobiles (2G/3G)
- Coupures de courant frequentes
- Appareils mobiles anciens et peu puissants
- **Implication** : Performance critique, taille de bundle minimale, mode offline, images optimisees

### 15.2 Contraintes linguistiques
- **Langue principale** : Francais
- **Langue secondaire** : Sango (souhaitee pour V2+)
- Pas d'anglais necessaire

### 15.3 Contraintes de paiement
- Pas de cartes bancaires (ou tres peu)
- Mobile money = mode de paiement dominant
- Orange Money et Telecel Money sont les deux operateurs principaux
- Les APIs de paiement mobile money en RCA peuvent etre instables

### 15.4 Objectifs de performance V2
- Bundle size < 200KB gzipped (first load)
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Score Lighthouse > 95 sur les 4 metriques

---

## 16. PAGES A CONSTRUIRE (V2)

### 16.1 Pages publiques (SSR/SSG)
1. **Accueil** (`/`) -- Hero, stats, features, categories, pricing, CTA, testimonials
2. **Offres d'emploi** (`/jobs`) -- Liste filtrable, recherche avancee, grid/list, pagination
3. **Detail annonce** (`/jobs/[id]`) -- Page complete avec SEO (JSON-LD JobPosting)
4. **A propos** (`/about`) -- Mission, valeurs, timeline, equipe, FAQ, contact
5. **Infos emploi** (`/info`) -- Formations, stages, conseils
6. **Conditions** (`/terms`) -- CGU
7. **Aide** (`/help`) -- Centre d'aide, FAQ
8. **Blog** (`/blog`) -- Articles SEO (optionnel Phase 2)

### 16.2 Pages auth
9. **Connexion** (`/login`)
10. **Inscription** (`/register`) -- Multi-etapes
11. **Mot de passe oublie** (`/forgot-password`)

### 16.3 Dashboard utilisateur (protege)
12. **Tableau de bord** (`/dashboard`)
13. **Mon profil** (`/dashboard/profile`)
14. **Mes annonces** (`/dashboard/jobs`)
15. **Messagerie** (`/dashboard/messages`)
16. **Paiement** (`/dashboard/payment`)
17. **Parametres** (`/dashboard/settings`)

### 16.4 Admin panel (protege + MFA)
18. **Dashboard admin** (`/admin`)
19. **Gestion utilisateurs** (`/admin/users`)
20. **Gestion annonces** (`/admin/jobs`)
21. **Gestion paiements** (`/admin/payments`)
22. **Gestion contenu** (`/admin/content`)
23. **Gestion types emploi** (`/admin/job-types`)
24. **Messages admin** (`/admin/messages`)
25. **Parametres** (`/admin/settings`)

---

## 17. REGLES DE DEVELOPPEMENT

### 17.1 Code Quality
- TypeScript strict mode (`"strict": true`, zero `any`)
- ESLint + Prettier strict
- PascalCase composants, camelCase fonctions, SCREAMING_SNAKE constantes
- Chaque composant = son propre fichier
- Fonctions utilitaires testees
- Commits conventionnels (feat:, fix:, refactor:, docs:, test:, chore:)

### 17.2 Securite
- JAMAIS de secrets dans le code source
- JAMAIS de `console.log` en production
- TOUJOURS valider les entrees (Zod server-side)
- TOUJOURS parametriser les requetes SQL
- TOUJOURS encoder les sorties (XSS prevention)
- Rate limiting sur TOUTES les routes API
- CORS restrictif

### 17.3 Performance
- Bundle < 200KB gzipped
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Lazy loading images + composants
- Code splitting par route
- Compression Brotli
- Cache headers optimaux

### 17.4 UX/UI
- Mobile-first responsive
- Loading skeletons
- Error boundaries avec fallback elegant
- Toast notifications
- Transitions 60fps
- Validation inline temps reel
- Dark mode toggle

### 17.5 SEO
- Lighthouse > 95
- Sitemap XML dynamique
- Open Graph + Twitter Cards
- JSON-LD (Organization, JobPosting, BreadcrumbList, FAQPage)
- URLs clean et descriptives
- Meta descriptions uniques
- Canonical URLs
