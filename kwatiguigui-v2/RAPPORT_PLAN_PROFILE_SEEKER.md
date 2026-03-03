# RAPPORT + PLAN PROFILE SEEKER (V1)

## 1) Perimetre et methode

- Scope strict: Dashboard Profil Seeker (Employe), sans analyse admin.
- Aucun test execute, aucune modification de code.
- Lecture complete des pages, composants, server actions, hooks, validations, types, routes API CV, et modules comparatifs dashboard (jobs/messages/settings).

## 2) Fichiers analyses (coeur seeker/profile)

### Entrees runtime dashboard
- `src/proxy.ts`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/components/layout/sidebar.tsx`

### Module seeker/profil
- `src/components/dashboard/seeker/seeker-dashboard.tsx`
- `src/app/(dashboard)/dashboard/profile/page.tsx`
- `src/components/forms/profile-form.tsx`
- `src/lib/actions/profile.ts`
- `src/components/dashboard/profile-lottie.tsx`

### Flux CV (prive/public)
- `src/app/api/cv/preview/route.ts`
- `src/app/api/cv/public/[userId]/route.ts`
- `src/app/(marketing)/jobs/[id]/page.tsx` (consommation du CV public)

### Pages seeker reliees
- `src/app/(dashboard)/dashboard/recommendations/page.tsx`
- `src/app/(dashboard)/dashboard/applications/page.tsx`
- `src/app/(dashboard)/dashboard/alerts/page.tsx`
- `src/app/(dashboard)/dashboard/cv-builder/page.tsx`
- `src/app/(dashboard)/dashboard/advice/page.tsx`
- `src/app/(dashboard)/dashboard/student/page.tsx`

### Couche partagee
- `src/hooks/use-auth.ts`
- `src/hooks/use-premium.ts`
- `src/lib/constants.ts`
- `src/types/database.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/middleware.ts`

### Comparaison dashboard (reference structure)
- `src/app/(dashboard)/dashboard/jobs/page.tsx`
- `src/components/dashboard/my-jobs-client.tsx`
- `src/components/dashboard/job-form-modal.tsx`
- `src/lib/actions/jobs.ts`
- `src/lib/validations/jobs.ts`
- `src/app/(dashboard)/dashboard/messages/page.tsx`
- `src/components/dashboard/messages-client.tsx`
- `src/lib/actions/messages.ts`
- `src/app/(dashboard)/dashboard/settings/page.tsx`
- `src/components/dashboard/settings-client.tsx`
- `src/lib/actions/settings.ts`

## 3) Carte module seeker (responsabilites + dependances)

### Point d entree
- `/dashboard`:
  - Auth check, fetch profile/jobs/messages, puis branche seeker vs employer par `profile.user_type`.
  - Si seeker: rend `SeekerDashboard`.
- `/dashboard/profile`:
  - Fetch profil detaille + signed URL CV + statut premium + email verified.
  - Passe tout a `ProfileForm`.

### Logique metier seeker/profile
- Principalement dans `ProfileForm`:
  - Edition champs profil (identite, contact, localisation, job type, experience, social links).
  - Scoring completude.
  - Scoring attractivite.
  - Controle coherence age/experience.
  - Upload/suppression avatar.
  - Upload/suppression CV + preview.
  - Toggle partage CV (`cv_public`).
  - Modal de confirmation avant submit global.

### Logique serveur (profil)
- `src/lib/actions/profile.ts`:
  - `updateProfile`
  - `updateExperience`
  - `updateAvatar`
  - `updateCV`
  - `deleteCV`
  - `updateCvPublic`
  - `resendVerificationEmail`

### Acces DB / storage
- DB table `profiles` (champ pivot du module).
- Storage `avatars` (public URL avatar).
- Storage `cvs` (bucket prive).
- API proxy preview CV prive (iframe).
- API CV public par `userId` pour consultation externe.

## 4) Flux de donnees complet seeker/profile

### Auth/guard
1. `proxy.ts` protege `/dashboard`.
2. `layout dashboard` revalide JWT avec `supabase.auth.getUser()`.
3. `layout` force onboarding si `city/job_type` incomplets.

### Dashboard seeker
1. `dashboard/page.tsx` charge profile/jobs/messages.
2. Si `user_type === seeker` -> `SeekerDashboard`.
3. Le composant affiche surtout des KPI placeholders et CTA vers profile/payment/recommendations.

### Profil
1. `profile/page.tsx` charge profile DB + signed URL CV + premium/email verified.
2. Hydrate `ProfileForm` avec `initialValues`.
3. `ProfileForm` envoie:
   - submit global -> `updateProfile`
   - actions unitaires -> `updateAvatar`, `updateExperience`, `updateCV`, `deleteCV`, `updateCvPublic`
4. Server actions mettent a jour `profiles` et `revalidatePath("/dashboard/profile")`.
5. UI fait plusieurs `window.location.reload()`.

### CV public
1. User active `cv_public` depuis profil.
2. Page annonce publique (`jobs/[id]`) lit `cv_public/cv_path`.
3. Si actif, expose boutons lire/telecharger via `/api/cv/public/[userId]`.

## 5) Comparaison avec jobs/messages/settings

## Ce qui est mieux structure dans jobs/messages/settings
- Separation plus claire page server -> client component -> actions.
- Validations plus explicitement centralisees (ex jobs/auth).
- Moins de surcharge metier dans un seul composant.

## Ce qui diverge dans profile seeker
- `profile-form.tsx` est un mega composant (UI + metier + controles + upload + scoring).
- Validation profile non dans `lib/validations`, mais inline dans action profile.
- Multiples mini-actions + reload complet de page.

## 6) Incoherences, duplications, ecarts UX/structure

### Incoherences
- Score/completude incoherents entre:
  - `profile-form.tsx` (formule A)
  - `recommendations/page.tsx` (formule B)
  - `seeker-dashboard.tsx` (`cvCompletion = 0`, FIXME)
- Type `company` present dans certains types dashboard, alors que DB enum user_type est `seeker|employer`.
- Regle age/experience doublement implementee (frontend + backend), risque de drift.

### Duplications
- Check premium duplique dans pages, actions, hooks.
- Logique completude dupliquee (et differente).
- Guard auth repetes (proxy + layout + pages).

### Ecarts UX
- `window.location.reload()` frequents apres actions profile.
- Beaucoup d'ecrans seeker relies encore en etat placeholder (applications/alerts/cv-builder/recommendations partiel).
- Dashboard seeker affiche des valeurs statiques (0, bientot, etc.) sans source unique.

## 7) Problemes structurels identifies

1. **Monolithe UI profile**
- Fichier: `src/components/forms/profile-form.tsx`
- Probleme: trop de responsabilites dans un seul composant.
- Impact: maintenance risquee, bugs regressifs plus probables.

2. **Formules metier non unifiees**
- Fichiers: `profile-form.tsx`, `recommendations/page.tsx`, `seeker-dashboard.tsx`
- Probleme: completude/scoring divergeants.
- Impact: incoherence utilisateur + decisions metier instables.

3. **Reload complet de page au lieu de refresh cible**
- Fichier: `profile-form.tsx`
- Probleme: plusieurs `window.location.reload()`.
- Impact: UX hachee, perte contexte.

4. **Validation profile non centralisee**
- Fichier: `src/lib/actions/profile.ts`
- Probleme: schema zod profile local a l'action.
- Impact: governance validation moins robuste qu'auth/jobs.

5. **Regle age/experience dupliquee**
- Fichiers: `profile-form.tsx` + `actions/profile.ts`
- Probleme: meme regle exprimee deux fois.
- Impact: ecarts frontend/backend possibles.

6. **Flux CV public permissif**
- Fichier: `src/app/api/cv/public/[userId]/route.ts`
- Probleme: acces auth requis mais non restreint par role metier explicite.
- Impact: exposition CV plus large que necessaire selon politique produit.

7. **Toggle cv_public non durci cote serveur**
- Fichier: `src/lib/actions/profile.ts`
- Probleme: `updateCvPublic(true)` ne verifie pas explicitement l'existence d'un `cv_path`.
- Impact: etat DB incoherent possible.

8. **Sur-fetch dans dashboard root**
- Fichier: `src/app/(dashboard)/dashboard/page.tsx`
- Probleme: fetch jobs/messages meme pour seeker.
- Impact: cout query et latence inutile.

9. **Etat seeker V1 partiellement mock**
- Fichiers: `seeker-dashboard.tsx`, `applications`, `alerts`, `cv-builder`, `recommendations`
- Probleme: nombreux blocs non branches a de la donnee reelle.
- Impact: V1 percue comme incomplete.

10. **Type user non aligne partout**
- Fichiers: `layout.tsx`, `dashboard/page.tsx`, `sidebar.tsx`, `types/database.ts`
- Probleme: presence `company` dans types dashboard.
- Impact: dette type/branche morte, confusion structurelle.

## 8) TODO priorise V1 finalisation seeker/profile

| Priorite | Tache | Fichiers concernes | Impact | Risque | Complexite |
|---|---|---|---|---|---|
| P1 | Unifier calcul completude (source unique) | `profile-form.tsx`, `seeker-dashboard.tsx`, `recommendations/page.tsx` | Cohesion UX immediate | Faible | Moyen |
| P1 | Remplacer reloads profile par refresh cible | `profile-form.tsx` | UX plus fluide | Faible | Moyen |
| P1 | Corriger logique confirm submit (`skipConfirmRef`) | `profile-form.tsx` | Fiabilite de sauvegarde | Moyen | Faible |
| P1 | Durcir `updateCvPublic` si CV absent | `actions/profile.ts` | Integrite metier | Moyen | Faible |
| P1 | Aligner regle age/experience sur DOB editee en cours | `profile-form.tsx` | Coherence validation UI | Moyen | Moyen |
| P2 | Encadrer acces CV public selon politique metier claire | `api/cv/public/[userId]/route.ts` | Securite donnees | Eleve | Moyen |
| P2 | Extraire validation profile vers `lib/validations` | `actions/profile.ts`, `lib/validations/*` | Maintenabilite | Moyen | Moyen |
| P2 | Eviter sur-fetch dashboard pour seeker | `dashboard/page.tsx` | Perf/cout | Faible | Moyen |
| P2 | Brancher KPI seeker minimum sur donnees reelles | `seeker-dashboard.tsx`, `recommendations/page.tsx` | Credibilite V1 | Moyen | Moyen |
| P3 | Aligner le type user dashboard avec DB (`company`) | `layout.tsx`, `dashboard/page.tsx`, `sidebar.tsx`, `types/database.ts` | Robustesse type-systeme | Faible | Faible |
| P3 | Finaliser placeholders seeker critiques (applications/alerts/cv-builder) | pages seeker concernees | Parcours V1 coherent | Moyen | Eleve |

## 9) Conclusion operationnelle

- Le module seeker/profile est fonctionnel de base, mais centralise trop de logique dans un seul composant et presente plusieurs incoherences de calcul/etat.
- Pour une V1 propre sans refactor massif, il faut prioriser l'unification de la completude, la suppression des reloads bruts, la fiabilisation des gardes serveur CV, puis l'activation minimale des ecrans seeker encore placeholders.
