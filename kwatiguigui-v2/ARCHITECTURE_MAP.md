# ARCHITECTURE_MAP

## Contexte et perimetre
- Objectif: reconstruire la cartographie runtime complete avant corrections.
- Perimetre: auth, db, api, paiements, jobs, middleware, seo, env.
- Hors perimetre: admin et tests (exclus volontairement).
- Ce document decrit l'existant et propose une cible "single source of truth" par domaine.

## Repo Tree utile
```text
kwatiguigui-v2/
|- src/
|  |- app/
|  |  |- (auth)/
|  |  |- (dashboard)/
|  |  |- (marketing)/
|  |  |- api/
|  |  |  |- auth/callback/route.ts
|  |  |  |- check-availability/route.ts
|  |  |  |- jobs/route.ts
|  |  |  |- payments/{initiate,status,webhook}/route.ts
|  |  |  |- profiles/[id]/route.ts
|  |  |  |- cv/preview/route.ts
|  |  |  `- cv/public/[userId]/route.ts
|  |  |- layout.tsx
|  |  |- error.tsx
|  |  |- not-found.tsx
|  |  |- sitemap.ts
|  |  `- robots.ts
|  |- components/
|  |  |- auth/
|  |  |- dashboard/
|  |  |- forms/
|  |  |- jobs/
|  |  |- layout/
|  |  |- providers/
|  |  `- ui/
|  |- hooks/
|  |- lib/
|  |  |- actions/
|  |  |- auth/
|  |  |- supabase/
|  |  |- payments/
|  |  |- validations/
|  |  |- constants.ts
|  |  |- utils.ts
|  |  `- seo.ts
|  |- styles/
|  `- types/
|- supabase/migrations/
|- public/
|- scripts/
|- next.config.ts
`- package.json
```

## Execution map

### Auth
- UI/Auth pages:
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/register/page.tsx`
  - `src/app/(auth)/onboarding/page.tsx`
  - `src/components/auth/social-auth.tsx`
- Server actions auth:
  - `src/lib/auth/actions.ts` (`signIn`, `signUp`, `signOut`, `forgotPassword`, `resetPassword`)
  - `src/lib/actions/onboarding.ts` (`completeOnboarding`)
- Session + route guard:
  - `src/proxy.ts`
  - `src/lib/supabase/middleware.ts`
  - `src/app/(dashboard)/layout.tsx`
- Etat auth client:
  - `src/components/providers/auth-provider.tsx`
  - `src/hooks/use-auth.ts`
  - `src/hooks/use-premium.ts`

### DB
- Client user-context (RLS):
  - `src/lib/supabase/server.ts`
  - `src/lib/supabase/client.ts`
- Client service-role (bypass RLS):
  - `src/lib/supabase/admin.ts`
- Schema:
  - `supabase/migrations/*.sql`
- Contrat de type:
  - `src/types/database.ts`

### API
- Endpoints publics/mixtes:
  - `GET /api/jobs`
  - `GET /api/profiles/[id]`
  - `GET /api/check-availability`
- Endpoints auth requis:
  - `POST /api/payments/initiate`
  - `GET /api/payments/status`
  - `GET /api/cv/preview`
  - `GET /api/cv/public/[userId]`
- Endpoint externe operateur:
  - `POST /api/payments/webhook`

### Paiements
- Orchestration API:
  - `src/app/api/payments/initiate/route.ts`
  - `src/app/api/payments/status/route.ts`
  - `src/app/api/payments/webhook/route.ts`
- Integrations externes:
  - `src/lib/payments/orange-money.ts`
  - `src/lib/payments/telecel-money.ts`
- Tables impactees:
  - `payments`
  - `webhooks`
  - `profiles.subscription_paid`, `profiles.expiry_date`

### Jobs
- CRUD principal cote user:
  - `src/lib/actions/jobs.ts`
- Listing public SSR:
  - `src/app/(marketing)/jobs/page.tsx`
- Listing public API:
  - `src/app/api/jobs/route.ts`
- Detail job:
  - `src/app/(marketing)/jobs/[id]/page.tsx`

### Middleware
- `src/proxy.ts`
  - classification routes
  - rate limiter memoire locale
  - refresh session Supabase
  - redirects auth/dashboard/onboarding
  - security headers

### SEO
- Metadata globale:
  - `src/app/layout.tsx`
- Sitemap dynamique:
  - `src/app/sitemap.ts`
- Robots:
  - `src/app/robots.ts`
- Helper SEO:
  - `src/lib/seo.ts`

### ENV critique
- Supabase:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- App:
  - `NEXT_PUBLIC_APP_URL`
  - `NODE_ENV`
- Orange Money:
  - `ORANGE_MONEY_CLIENT_ID`
  - `ORANGE_MONEY_CLIENT_SECRET`
  - `ORANGE_MONEY_MERCHANT_KEY`
  - `ORANGE_MONEY_WEBHOOK_SECRET`
- Telecel Money:
  - `TELECEL_MONEY_API_KEY`
  - `TELECEL_MONEY_MERCHANT_ID`
  - `TELECEL_MONEY_WEBHOOK_SECRET`

## Flux complets

### Flux auth
1. User ouvre login/register.
2. Form submit vers server actions `signIn`/`signUp`.
3. Supabase Auth cree/valide la session.
4. Si OAuth: `social-auth` -> `/api/auth/callback` -> `exchangeCodeForSession` -> profil minimal si absent.
5. Redirection vers `/onboarding` ou `/dashboard`.
6. `proxy.ts` + `dashboard/layout.tsx` appliquent guard auth + completion onboarding.
7. `AuthProvider` hydrate l'etat cote client.

### Flux paiements
1. Page payment charge profil + historique.
2. Front appelle `POST /api/payments/initiate`.
3. API valide user + plan, calcule montant serveur, cree paiement `pending`, appelle operateur.
4. Front poll `GET /api/payments/status?reference=...`.
5. Operateur appelle `POST /api/payments/webhook`.
6. Webhook verifie signature, met a jour paiement (`completed`/`failed`), active abonnement profil si succes.

### Flux jobs
1. Dashboard jobs charge les annonces du user.
2. Creation via modal -> action `createJob`.
3. Action valide payload + quota freemium/premium + insert job `pending`.
4. Update/suppression via actions `toggleJobActive` et `deleteJob`.
5. Cote public: listing SSR `/jobs` + endpoint `/api/jobs` + detail `/jobs/[id]`.

## 15 fichiers les plus sensibles
1. `src/proxy.ts`
2. `src/lib/supabase/admin.ts`
3. `src/lib/supabase/server.ts`
4. `src/lib/supabase/middleware.ts`
5. `src/lib/auth/actions.ts`
6. `src/app/api/auth/callback/route.ts`
7. `src/app/api/payments/initiate/route.ts`
8. `src/app/api/payments/status/route.ts`
9. `src/app/api/payments/webhook/route.ts`
10. `src/app/api/check-availability/route.ts`
11. `src/lib/actions/jobs.ts`
12. `src/lib/actions/profile.ts`
13. `src/app/(dashboard)/layout.tsx`
14. `supabase/migrations/001_initial_schema.sql`
15. `supabase/migrations/008_add_social_links.sql`

## Redondances identifiees (avec chemins)
- Regle premium dupliquee (`subscription_paid` + `expiry_date`):
  - `src/lib/actions/jobs.ts`
  - `src/lib/actions/messages.ts`
  - `src/app/api/jobs/route.ts`
  - `src/app/api/profiles/[id]/route.ts`
  - `src/app/(dashboard)/dashboard/jobs/page.tsx`
  - `src/app/(dashboard)/dashboard/payment/page.tsx`
  - `src/app/(dashboard)/dashboard/profile/page.tsx`
  - `src/app/(dashboard)/dashboard/page.tsx`
  - `src/hooks/use-auth.ts`
  - `src/hooks/use-premium.ts`
- Check disponibilite (email/username/phone) duplique:
  - `src/components/forms/register-form.tsx`
  - `src/components/auth/onboarding-form.tsx`
- Validation Zod dupliquee (inline + central):
  - `src/lib/actions/jobs.ts` vs `src/lib/validations/jobs.ts`
  - `src/lib/actions/onboarding.ts` / `src/lib/actions/profile.ts` / `src/lib/actions/messages.ts` vs `src/lib/validations/*`
- Score completude profile duplique:
  - `src/components/forms/profile-form.tsx`
  - `src/app/(dashboard)/dashboard/recommendations/page.tsx`
- Query jobs public dupliquee:
  - `src/app/(marketing)/jobs/page.tsx`
  - `src/app/api/jobs/route.ts`
- Etat auth/premium multiple sources:
  - `src/components/providers/auth-provider.tsx`
  - `src/hooks/use-auth.ts`
  - `src/hooks/use-premium.ts`
- Gestion CV multiple chemins:
  - `src/app/(dashboard)/dashboard/profile/page.tsx` (`createSignedUrl`)
  - `src/components/forms/profile-form.tsx` (download signed URL + preview proxy)
  - `src/app/api/cv/preview/route.ts`

## Single source of truth recommande par domaine
| Domaine | Source unique recommandee | Doit contenir quoi |
|---|---|---|
| Regles premium | `src/lib/domain/premium.ts` (a creer) | `isPremium(profile, now)` et derives (`daysLeft`) |
| Validation payload | `src/lib/validations/*` | schemas Zod de toutes actions/routes |
| Query jobs public | `src/lib/queries/jobs.ts` (a creer) | filtres, tri, pagination, masking policies |
| Score profile | `src/lib/domain/profile-score.ts` (a creer) | completude, attractivite, coherence age/experience |
| Auth use-cases | `src/lib/auth/actions.ts` | signin/signup/reset/signout + normalisation erreurs |
| Session guard | `src/proxy.ts` + `src/lib/supabase/middleware.ts` | refresh + redirects + security headers |
| Paiement webhook normalize | `src/lib/payments/webhook.ts` (a creer) | parsing payload, idempotence, status map |
| API response contract | `src/lib/http/api-response.ts` (a creer) | format unique data/error |
| Env contract | `src/lib/env.ts` (a creer) | validation stricte des variables d'env |
| DB schema | `supabase/migrations/*.sql` | seule verite pour schema/policies |
| DB type contract | `src/types/database.ts` regenere | verite compile-time cote app |
| Availability checks | `src/app/api/check-availability/route.ts` + RPC SQL | normalisation unique et politique erreur |
| Storage access CV | routes API CV + actions profile | acces prive uniquement via backend |
| SEO metadata | `src/app/layout.tsx` + `src/lib/seo.ts` | conventions metadata communes |
| ActionResult type | `src/lib/types/action-result.ts` (a creer) | type partage, decouple de `auth/actions.ts` |
