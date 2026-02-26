# KWATIGUIGUI V2 — DECISIONS ARCHITECTURALES

> Fichier de référence pour toutes les décisions de stack, design et architecture.
> À mettre à jour à chaque décision validée.
> Date : 26 février 2026

---

## TABLE DES MATIÈRES

1. [Phase 1 — Choix de Stack Technique](#1-phase-1--choix-de-stack-technique)
2. [Phase 2 — Palettes de Couleurs & Design System](#2-phase-2--palettes-de-couleurs--design-system)
3. [Décisions validées](#3-décisions-validées)

---

## 1. PHASE 1 — CHOIX DE STACK TECHNIQUE

### Contexte et contraintes

- Réseau lent (2G/3G dominant en RCA)
- Appareils mobiles anciens
- SEO obligatoire (SSR/SSG)
- Sécurité blindée (13 CVE à corriger)
- Paiements Orange Money + Telecel Money via webhooks
- 1 développeur / équipe réduite (maintenabilité prioritaire)
- Hébergement : budget limité

---

### OPTION A — "Pragmatique" (Recommandée)

```
Frontend  : Next.js 15 (App Router) + TypeScript strict + Tailwind CSS 4
Backend   : Next.js API Routes + Server Actions (serveur intégré)
Base      : Supabase (PostgreSQL managé) avec RLS stricte (auth.uid())
Auth      : Supabase Auth + @supabase/ssr (utilisateurs) — REMPLACE NextAuth.js v5
             → WhatsApp number converti en email {digits}@kwatiguigui.cf
             → Sessions via cookies httpOnly, rafraîchies par middleware
Admin     : Table admin_users + argon2 (password) + speakeasy TOTP (MFA) + JWT custom (ADMIN_JWT_SECRET)
Paiements : API Routes Next.js → Orange Money + Telecel Money (webhooks HMAC)
Hébergement : Vercel (frontend) + Supabase cloud (DB)
CDN       : Cloudflare (gratuit)
Monitoring : Sentry (tier gratuit)
```

**Tableau comparatif OPTION A :**

| Critère          | Score | Justification                                              |
|------------------|-------|------------------------------------------------------------|
| Sécurité         | 9/10  | RLS Supabase stricte + API Routes server-side              |
| SEO              | 10/10 | SSR natif Next.js, JSON-LD, sitemap dynamique              |
| Performance      | 9/10  | Bundle optimisé, RSC, edge runtime possible               |
| Maintenabilité   | 9/10  | 1 repo, 1 langage (TypeScript), 1 framework                |
| Coût mensuel     | ~0-20€| Vercel hobby gratuit, Supabase free tier                   |
| Complexité setup | Faible| Tout intégré dans Next.js                                  |
| Scalabilité      | 8/10  | Vercel scale auto, Supabase jusqu'à 500MB free             |
| Vitesse dev      | 9/10  | Fullstack en TypeScript, hot reload, DX excellente         |

**Avantages :**
- Un seul projet, un seul déploiement
- API Routes remplacent le backend Express mort → plus de disconnect
- Supabase déjà utilisé en V1 → migration progressive possible
- Vercel déploie Next.js en 1 commande
- Coût quasi nul pour démarrer

**Inconvénients :**
- Vendor lock-in Vercel (mitigeable avec self-hosting Next.js)
- Supabase free tier limité (500MB DB, 2GB bandwidth)

---

### OPTION B — "Souverain" (Full Self-Hosted)

```
Frontend  : Next.js 15 (App Router) + TypeScript strict + Tailwind CSS 4
Backend   : Node.js + Fastify 5 + TypeScript (API séparée)
Base      : PostgreSQL 16 self-hosted (Railway ou VPS)
Auth      : JWT custom (access token 15min + refresh token 7j)
Admin     : Table admin_users + MFA TOTP obligatoire
Paiements : Fastify routes → Orange Money + Telecel Money
Hébergement : Railway (backend + DB) + Vercel (frontend)
CDN       : Cloudflare
Monitoring : Sentry + Grafana/Loki (logs)
```

**Tableau comparatif OPTION B :**

| Critère          | Score | Justification                                              |
|------------------|-------|------------------------------------------------------------|
| Sécurité         | 10/10 | Contrôle total, pas de tiers DB                            |
| SEO              | 10/10 | SSR natif Next.js                                          |
| Performance      | 8/10  | Fastify ultra-rapide, mais 2 services à gérer              |
| Maintenabilité   | 6/10  | 2 repos ou monorepo, 2 runtimes à gérer                    |
| Coût mensuel     | ~15-30€| Railway ~5-10€ backend + DB, Vercel gratuit               |
| Complexité setup | Élevée| Monorepo, migrations DB manuelles, CI/CD complexe          |
| Scalabilité      | 10/10 | Contrôle total de l'infra                                  |
| Vitesse dev      | 7/10  | Plus de boilerplate, coordination frontend/backend         |

**Avantages :**
- Pas de dépendance à Supabase (aucun vendor lock-in)
- Contrôle total des données (conformité RGPD)
- Fastify = plus performant qu'Express
- Architecture claire et séparée

**Inconvénients :**
- Setup initial plus long (2-3x plus de configuration)
- 2 services à déployer, monitorer, maintenir
- Migrations DB manuelles (prisma migrate ou raw SQL)
- Plus difficile pour un développeur solo

---

### OPTION C — "Moderne Minimaliste" (T3 Stack)

```
Frontend  : Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
API       : tRPC v11 (type-safe end-to-end, pas de REST)
ORM       : Prisma 6 + PostgreSQL (Supabase ou Neon)
Auth      : NextAuth.js v5 + Prisma adapter
Paiements : tRPC procedures → Orange Money + Telecel Money
Hébergement : Vercel + Neon (serverless PostgreSQL)
CDN       : Cloudflare
```

**Tableau comparatif OPTION C :**

| Critère          | Score | Justification                                              |
|------------------|-------|------------------------------------------------------------|
| Sécurité         | 8/10  | Type-safe empêche injection, mais moins de contrôle DB     |
| SEO              | 10/10 | SSR Next.js                                                |
| Performance      | 8/10  | Serverless (cold starts possibles)                         |
| Maintenabilité   | 10/10 | Type-safety bout en bout = 0 erreur de typage API          |
| Coût mensuel     | ~0-10€| Neon free tier généreux, Vercel gratuit                    |
| Complexité setup | Moyenne| tRPC = courbe d'apprentissage, Prisma = DX excellente     |
| Scalabilité      | 9/10  | Serverless scale auto                                      |
| Vitesse dev      | 10/10 | DX imbattable, Prisma Studio, type inference automatique   |

**Avantages :**
- Type-safety parfaite du frontend au backend sans génération de code
- Prisma Studio pour visualiser la DB
- Erreurs à la compilation, pas au runtime
- T3 Stack = référence communauté Next.js

**Inconvénients :**
- tRPC = rupture avec REST (les webhooks paiement nécessitent quand même des endpoints REST)
- Moins de ressources francophones
- Prisma peut être lent sur les grosses requêtes (N+1)
- Neon serverless = cold starts

---

### TABLEAU RÉCAPITULATIF GLOBAL

| Critère          | Option A (Pragmatique) | Option B (Souverain) | Option C (T3 Stack) |
|------------------|------------------------|----------------------|---------------------|
| Sécurité         | 9/10                   | 10/10                | 8/10                |
| SEO              | 10/10                  | 10/10                | 10/10               |
| Performance      | 9/10                   | 8/10                 | 8/10                |
| Maintenabilité   | 9/10                   | 6/10                 | 10/10               |
| Coût             | ~0-20€/mois            | ~15-30€/mois         | ~0-10€/mois         |
| Complexité setup | Faible                 | Élevée               | Moyenne             |
| Scalabilité      | 8/10                   | 10/10                | 9/10                |
| Vitesse dev      | 9/10                   | 7/10                 | 10/10               |
| **TOTAL**        | **63/70**              | **57/70**            | **63/70**           |

### Recommandation

**Option A** est recommandée pour les raisons suivantes :
1. Supabase V1 déjà existant → migration des données simplifiée
2. 1 seul dépôt, 1 seul déploiement → parfait pour une équipe réduite
3. Coût quasi nul au démarrage
4. La sécurité est assurée via les API Routes (le frontend ne touche PLUS jamais Supabase directement)
5. Next.js + Supabase = documentation abondante en français

---

## 2. PHASE 2 — PALETTES DE COULEURS & DESIGN SYSTEM

### Contexte design

- Inspiré du drapeau RCA : Bleu, Blanc, Vert, Jaune, Rouge (avec une bande noire verticale)
- Design premium, professionnel, moderne : LinkedIn × Indeed × Glassdoor niveau Afrique
- Mobile-first, dark mode natif
- Public cible : population centrafricaine, tous niveaux technologiques

---

### PALETTE 1 — "Centrafrique Moderne" (Recommandée)

Inspirée du bleu officiel du drapeau RCA, sobre et professionnel.

```
Primary (Bleu RCA)
  50:  #EFF6FF
 100:  #DBEAFE
 200:  #BFDBFE
 300:  #93C5FD
 400:  #60A5FA
 500:  #003189  ← Bleu drapeau RCA (principal)
 600:  #002570
 700:  #001D57
 800:  #001440
 900:  #000C2A
 950:  #000615

Secondary (Vert RCA)
  50:  #F0FDF4
 100:  #DCFCE7
 200:  #BBF7D0
 300:  #86EFAC
 400:  #4ADE80
 500:  #289728  ← Vert drapeau RCA
 600:  #1E7520
 700:  #165618
 800:  #0E3A10
 900:  #072108
 950:  #03100A

Accent (Jaune RCA — CTA, badges)
  50:  #FEFCE8
 100:  #FEF9C3
 200:  #FEF08A
 300:  #FDE047
 400:  #FACC15
 500:  #EAB308  ← Jaune drapeau RCA
 600:  #CA8A04
 700:  #A16207
 800:  #713F12
 900:  #422006
 950:  #1A0D00

Neutral (Gris professionnel)
  50:  #F8FAFC
 100:  #F1F5F9
 200:  #E2E8F0
 300:  #CBD5E1
 400:  #94A3B8
 500:  #64748B
 600:  #475569
 700:  #334155
 800:  #1E293B
 900:  #0F172A
 950:  #020617

Success:  #16A34A  (vert confirmé)
Warning:  #D97706  (orange alerte)
Error:    #DC2626  (rouge erreur — aussi couleur drapeau RCA)
```

**Aperçu ASCII :**
```
┌─────────────────────────────────────────────┐
│  ████  KWATIGUIGUI        [Se connecter]    │  ← Navbar bleu #003189
├─────────────────────────────────────────────┤
│                                             │
│    Trouvez votre emploi en RCA              │
│    ████████████████████  [Rechercher]       │  ← CTA jaune #EAB308
│                                             │
├──────────┬──────────┬──────────┬────────────┤
│ 🏠 Bangui│ ⚙️ Tech  │ 👨‍🍳 Cuisinier│ +14 autres│  ← Cartes vert #289728
└──────────┴──────────┴──────────┴────────────┘
```

---

### PALETTE 2 — "Savane Dorée"

Tons chauds inspirés des paysages centrafricains, plus chaleureux et humain.

```
Primary (Terre ocre)
  500:  #B45309  ← Ocre chaud
  600:  #92400E
  700:  #78350F

Secondary (Vert savane)
  500:  #65A30D  ← Vert savane
  600:  #4D7C0F

Accent (Or)
  500:  #D4AF37  ← Or africain
  600:  #B8960C

Neutral
  50:   #FAFAF5  ← Crème chaud
  900:  #1C1A12  ← Brun sombre

Success:  #15803D
Warning:  #B45309
Error:    #B91C1C
```

**Aperçu ASCII :**
```
┌─────────────────────────────────────────────┐
│  ████  KWATIGUIGUI        [Se connecter]    │  ← Navbar ocre #B45309
├─────────────────────────────────────────────┤
│  Fond crème #FAFAF5 — chaleureux, humain    │
│  [Trouvez un emploi]  ← CTA or #D4AF37     │
│  Cartes vert savane #65A30D                 │
└─────────────────────────────────────────────┘
```

---

### PALETTE 3 — "Tech Centrafrique"

Sombre, moderne, tech — pour un positionnement premium fort.

```
Primary (Bleu nuit)
  500:  #1D4ED8  ← Bleu tech
  600:  #1E40AF
  700:  #1E3A8A

Secondary (Violet innovation)
  500:  #7C3AED  ← Violet premium
  600:  #6D28D9

Accent (Cyan digital)
  500:  #0891B2  ← Cyan CTA
  600:  #0E7490

Neutral (Mode sombre dominant)
  50:   #F0F4FF  ← Fond clair
  900:  #0A0F1E  ← Fond dark principal
  800:  #111827

Success:  #059669
Warning:  #D97706
Error:    #EF4444
```

**Aperçu ASCII :**
```
┌─────────────────────────────────────────────┐
│  ████  KWATIGUIGUI        [Se connecter]    │  ← Fond sombre #0A0F1E
├─────────────────────────────────────────────┤
│  Gradient bleu → violet en hero             │
│  [Commencer maintenant]  ← CTA cyan         │
│  Cartes avec glassmorphism                  │
└─────────────────────────────────────────────┘
```

---

### TABLEAU COMPARATIF PALETTES

| Critère              | Palette 1 (Centrafrique Moderne) | Palette 2 (Savane Dorée) | Palette 3 (Tech) |
|----------------------|----------------------------------|--------------------------|------------------|
| Identité RCA         | Forte (drapeau)                  | Moyenne (paysages)       | Faible           |
| Professionnalisme    | Très élevé                       | Élevé                    | Très élevé       |
| Accessibilité WCAG   | AA ✓                             | AA ✓                     | AAA ✓            |
| Public cible         | Tous publics                     | Milieu rural             | Urbain/jeunes    |
| Dark mode            | Excellent                        | Bon                      | Natif/parfait    |
| **Recommandation**   | ✅ OUI                           | Optionnel                | Alternative      |

---

### DESIGN SYSTEM — Commun aux 3 palettes

#### Typographie

```
Heading : Plus Jakarta Sans (Google Fonts)
Body    : Inter (Google Fonts)
Mono    : JetBrains Mono (code uniquement)

Scale :
  xs   : 12px / line-height 1.5 / letter-spacing 0.01em
  sm   : 14px / line-height 1.5
  base : 16px / line-height 1.6
  lg   : 18px / line-height 1.5
  xl   : 20px / line-height 1.4
  2xl  : 24px / line-height 1.35
  3xl  : 30px / line-height 1.3
  4xl  : 36px / line-height 1.25
  5xl  : 48px / line-height 1.2
  6xl  : 60px / line-height 1.15

Font weights :
  normal  : 400
  medium  : 500
  semibold: 600
  bold    : 700
  extrabold: 800
```

#### Spacing

```
Base unit : 4px
  1 :  4px
  2 :  8px
  3 : 12px
  4 : 16px
  5 : 20px
  6 : 24px
  8 : 32px
  10: 40px
  12: 48px
  16: 64px
  20: 80px
  24: 96px
```

#### Border Radius

```
sm  :  4px (inputs, petits éléments)
md  :  8px (cards, boutons)
lg  : 12px (modals, panels)
xl  : 16px (grandes cards)
2xl : 24px (hero sections)
full: 9999px (badges, avatars)
```

#### Shadows

```
sm  : 0 1px 2px rgba(0,0,0,0.05)
md  : 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)
lg  : 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
xl  : 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)
card: 0 2px 8px rgba(0,49,137,0.08)  ← Teintée primary
```

#### Composants clés

```
Button variants :
  primary   : bg-primary-500 text-white hover:bg-primary-600
  secondary : bg-secondary-500 text-white hover:bg-secondary-600
  outline   : border-2 border-primary-500 text-primary-500
  ghost     : text-primary-500 hover:bg-primary-50
  danger    : bg-error text-white

Button sizes :
  sm : px-3 py-1.5 text-sm rounded-md
  md : px-4 py-2 text-base rounded-md
  lg : px-6 py-3 text-lg rounded-lg

Input :
  border border-neutral-300 rounded-md px-3 py-2
  focus: ring-2 ring-primary-500 border-primary-500
  error: border-error ring-2 ring-error/30

Card :
  bg-white dark:bg-neutral-800
  rounded-xl shadow-card
  border border-neutral-100 dark:border-neutral-700
  hover:shadow-lg transition-shadow 200ms ease

Badge (premium) :
  bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold

JobCard :
  Affiche : prénom, âge, type, région, ville, expérience
  Masque (premium blur) : whatsapp, téléphone
  Action : [Contacter sur WhatsApp] (premium seulement)
```

#### Animations

```
Durée :
  fast   : 150ms
  normal : 200ms
  slow   : 300ms
  slower : 500ms

Easing :
  default : ease-in-out
  bounce  : cubic-bezier(0.68, -0.55, 0.265, 1.55)
  smooth  : cubic-bezier(0.25, 0.46, 0.45, 0.94)

Transitions courantes :
  hover cards     : shadow + transform translateY(-2px) 200ms
  button press    : scale(0.98) 150ms
  page transition : opacity 0→1 + translateY 8px→0 300ms
  modal open      : scale 0.95→1 + opacity 0→1 200ms
```

#### Dark Mode

```
Stratégie : class="dark" sur <html> (Tailwind dark variant)

Variables CSS :
  --bg-primary    : #FFFFFF → #0F172A
  --bg-secondary  : #F8FAFC → #1E293B
  --bg-card       : #FFFFFF → #1E293B
  --text-primary  : #0F172A → #F8FAFC
  --text-secondary: #475569 → #94A3B8
  --border        : #E2E8F0 → #334155
```

---

## 3. DÉCISIONS VALIDÉES

| Date | Phase | Décision | Validée par |
|------|-------|----------|-------------|
| 2026-02-26 | Phase 1 | **Stack Option A** — Next.js 15 + API Routes + Supabase + NextAuth.js v5 + Vercel + Cloudflare | Utilisateur |
| 2026-02-26 | Phase 2 | **Palette 1 "Centrafrique Moderne"** — Bleu RCA #003189 + Vert #289728 + Jaune #EAB308 | Utilisateur |
| 2026-02-26 | Phase 2 | **Direction design** — Digital Science × LinkedIn : fond blanc dominant, whitespace généreux, pill buttons (border-radius 9999px), ombres teintées bleu, typography bold | Utilisateur |
| 2026-02-26 | Phase 3 | **REFACTOR AUTH — Remplacement de NextAuth.js v5 par Supabase Auth + @supabase/ssr** — Raison : les politiques RLS utilisent `auth.uid()` qui ne fonctionne QU'avec Supabase Auth. NextAuth.js génère ses propres JWTs non reconnus par PostgREST, rendant toutes les politiques RLS inefficaces. Solution : Supabase Auth gère les sessions via cookies httpOnly, le middleware utilise `updateSession()` pour rafraîchir les tokens à chaque requête. L'auth admin reste séparée (table `admin_users` + argon2 + speakeasy TOTP + JWT custom signé avec `ADMIN_JWT_SECRET`). | Utilisateur |
| 2026-02-26 | Phase 6 | **Direction design finale** — LinkedIn × Digital Science (https://www.digital-science.com/) : fond blanc dominant, whitespace agressif, pill buttons 9999px, ombres teintées bleu, typography Plus Jakarta Sans bold, animations Lottie + Framer Motion, icônes Lucide (pas d'emojis), skeleton loaders, transitions 60fps, tendances 2026 (glassmorphism subtil, gradients doux, micro-interactions). | Utilisateur |

---

> Mettre à jour ce tableau dès qu'une décision est validée.
> Ne jamais modifier une décision validée sans créer un nouveau commit.
