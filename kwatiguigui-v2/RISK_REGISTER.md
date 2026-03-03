# RISK_REGISTER

## Contexte
- Perimetre: auth/db/api/paiements/jobs/middleware/seo/env (hors admin, hors tests).
- Format: chaque risque contient preuve technique (fichier + pattern), consequence, gravite, impact, fix minimal et test de verification.

## Echelle de gravite
- Critique: casse de prod probable, perte d'integrite ou fail securite majeur.
- Eleve: comportement faux/fuite possible/degradation forte mais contournable.
- Moyen: dette structurelle avec risque de regression ou cout operationnel.

## Top 10 risques immediats

| ID | Gravite | Impact | Preuve (fichier + pattern) | Consequence | Fix minimal (1-3 actions) | Test de verification |
|---|---|---|---|---|---|---|
| R1 | Critique | securite, cout | `supabase/migrations/008_add_social_links.sql` + pattern `ADD COLUMN IF NOT EXISTS github_url` precede d'un `;` | migration invalide sur DB neuve, pipeline schema casse | 1) ajouter migration corrective (ALTER TABLE valide). 2) rejouer migrations sur DB vierge. | `supabase db reset` passe sans erreur SQL; colonne `github_url` presente. |
| R2 | Critique | securite, cout | `supabase/migrations/001_initial_schema.sql` pattern `operator TEXT NOT NULL`; `src/app/api/payments/webhook/route.ts` pattern `from("webhooks").insert({ event, payload, signature, processed })` | log webhook peut echouer silencieusement, audit impossible | 1) inserer `operator` et `signature_valid` dans payload webhook. 2) loguer l'echec comme erreur bloquante interne de monitoring. | appel webhook signe -> ligne creee dans `webhooks` avec `operator` + `signature_valid` corrects. |
| R3 | Critique | securite, cout | `src/lib/auth/actions.ts` pattern `whatsapp: parsed.data.email` | donnee metier corrompue: contact WhatsApp faux des l'inscription | 1) mapper `whatsapp` vers vrai champ phone/whatsapp. 2) migration de correction des profils deja touches. | creation compte test -> `profiles.whatsapp` contient numero attendu, pas email. |
| R4 | Eleve | securite, cout | `src/app/api/check-availability/route.ts` patterns `available: true // fail open` | collisions possibles username/email/phone en cas erreur DB, faux feedback UX | 1) passer en fail-safe controle (indisponible temporaire). 2) differencier erreur technique vs disponibilite. | couper DB puis appeler endpoint -> reponse d'erreur technique, pas `available: true`. |
| R5 | Eleve | securite, cout | `src/lib/auth/actions.ts` patterns `RAW FORMDATA`, `PARSED RAW`, multiples `console.log` | exposition de PII dans logs applicatifs | 1) supprimer logs sensibles. 2) conserver logs structurels sans donnees user. | grep runtime logs signup: aucun champ personnel brut n'apparait. |
| R6 | Eleve | perf, cout | `src/proxy.ts` patterns `new Map`, `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW` | rate limit memoire non distribue, inefficace en multi-instance/serverless | 1) basculer vers store distribue (Redis/Upstash). 2) conserver meme contrat de reponse 429. | test charge multi-instance: limite appliquee de maniere coherente entre instances. |
| R7 | Eleve | securite | `next.config.ts` patterns `script-src ... 'unsafe-eval' 'unsafe-inline'`, `style-src ... 'unsafe-inline'` | surface XSS accrue, durcissement CSP insuffisant | 1) reduire CSP (nonce/hash). 2) isoler exceptions strictement necessaires. | scan CSP + test frontend: app fonctionne sans `unsafe-inline` global scripts. |
| R8 | Moyen | cout, perf | duplication regle premium: `src/lib/actions/jobs.ts`, `src/lib/actions/messages.ts`, `src/app/api/jobs/route.ts`, `src/hooks/use-auth.ts`, `src/hooks/use-premium.ts`, pages dashboard | divergences d'entitlement (contact visible, quotas, badges) | 1) centraliser `isPremium` dans un module domaine unique. 2) remplacer appels disperses. | un test contractuel unique valide meme resultat premium pour actions/API/hooks. |
| R9 | Moyen | cout, perf | duplication score profil: `src/components/forms/profile-form.tsx` (`completionPoints`) vs `src/app/(dashboard)/dashboard/recommendations/page.tsx` (`addScore`) | score different selon ecrans, regles metier incoherentes | 1) extraire moteur scoring unique. 2) reutiliser partout. | meme profil fixture -> meme score affiche sur profile + recommendations. |
| R10 | Moyen | cout, perf | `package.json` pattern `"db:seed": "tsx scripts/seed.ts"`; dossier `scripts/` ne contient pas `seed.ts` | commande d'init DB cassable, onboarding dev degrade | 1) creer `scripts/seed.ts` ou retirer script. 2) documenter process seed reel. | `npm run db:seed` retourne 0 et charge les donnees attendues (ou script retire proprement). |

## Priorisation operationnelle
1. R1, R2, R3 en premier (integrite schema/paiement/contact).
2. R4, R5, R6, R7 ensuite (securite et resilience runtime).
3. R8, R9, R10 enfin (stabilisation structurelle et cout de maintenance).

## Criteres de sortie
- Aucune migration cassante sur reset DB complet.
- Webhook paiement journalise de facon fiable avec schema coherent.
- Donnees profil critiques (WhatsApp/premium) coherentes sur tous les parcours.
- Endpoint disponibilite et logs auth sans fail-open ni fuite PII.
- Scripts d'exploitation (`db:seed`) valides ou explicitement retires.
