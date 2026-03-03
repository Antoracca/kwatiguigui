# KWATIGUIGUI V2 Architect Memory

## V2 Project Location
- V2 code: `D:\project-bolt-sb1-daaeezgn\kwatiguigui-v2\` (commit 56c4e7a — Phase 7 + audit)
- V1 source (reference only): `D:\project-bolt-sb1-daaeezgn\project\`
- Agent prompt: `D:\project-bolt-sb1-daaeezgn\project\AGENT_PROMPT_KWATIGUIGUI_V2.md`
- Business requirements: `D:\project-bolt-sb1-daaeezgn\BUSINESS_REQUIREMENTS.md`
- Decisions log: `D:\project-bolt-sb1-daaeezgn\DECISIONS.md`

## Validated Stack (Option A — auth updated)
- Next.js 15 (App Router) + TypeScript strict + Tailwind CSS 4
- Supabase (PostgreSQL) with strict RLS — auth.uid() requires Supabase Auth (NOT NextAuth)
- Supabase Auth + @supabase/ssr — WhatsApp number converted to {digits}@kwatiguigui.cf
- User sessions: httpOnly cookies, refreshed by middleware updateSession() on every request
- Admin auth: separate admin_users table + argon2 (password) + speakeasy TOTP + JWT (ADMIN_JWT_SECRET)
- Payments: API Routes -> Orange Money + Telecel Money (webhooks HMAC)
- Hosting: Vercel + Supabase Cloud + Cloudflare CDN + Sentry

## Validated Design
- Palette 1 "Centrafrique Moderne": Primary #003189, Secondary #289728, Accent #EAB308
- Direction: Digital Science x LinkedIn
- Fonts: Plus Jakarta Sans (headings) + Inter (body)
- Pill buttons (border-radius 9999px), blue-tinted shadows, white dominant bg
- Mobile-first, dark mode via class strategy

## Phase Completion Status
- Phase 0: DONE (analysis of 103 V1 files, 13 CVEs identified)
- Phase 1: DONE (3 stack options proposed, Option A validated)
- Phase 2: DONE (3 palettes proposed, Palette 1 validated)
- Phase 3: DONE (scaffold + auth refactor, commit 019968e)
- Phase 6: DONE (all pages — homepage, jobs, dashboard, admin, public pages)
- Commits: dc0fa37 (Phase 6 base), 7c36d50 (dashboard), 04073b4 (admin), bcb0513 (payments), 111acbe (public), b2598ee (config)

## Key File Paths (Added Phase 6)
- `src/lib/actions/` — profile.ts, jobs.ts, messages.ts, settings.ts (Server Actions)
- `src/lib/payments/orange-money.ts` — HMAC-signed Orange Money API + mock mode
- `src/lib/payments/telecel-money.ts` — HMAC-signed Telecel Money API + mock mode
- `src/components/dashboard/` — ProfileForm, MyJobsClient, MessagesClient, PaymentClient, SettingsClient
- `src/components/admin/` — AdminLayoutClient, AdminLoginForm, AdminUsersClient, AdminJobsModerationClient
- `src/components/marketing/faq-accordion.tsx` — accordion (no Radix, CSS max-h transition)
- `src/app/(admin-auth)/admin/login/page.tsx` — outside guarded layout to prevent redirect loop
- `src/app/api/payments/` — initiate, webhook (HMAC+idempotency), status (poll)
- `src/app/api/admin/jobs/moderate/route.ts` — publish/reject/delete with JWT guard
- `src/app/error.tsx` — global Next.js error boundary ("use client")

## Admin Login Architecture
- Admin login MUST be in (admin-auth) route group (not in (admin)) to avoid JWT redirect loop
- URL: /admin/login resolves from src/app/(admin-auth)/admin/login/page.tsx
- (admin) layout calls verifyAdminSession() and redirects to /admin/login if null

## CRITICAL: Route Group File Placement
- (admin) route group pages must be at (admin)/page.tsx — URL = /admin
- NEVER place at (admin)/admin/page.tsx — that would be URL /admin/admin (double segment BUG)
- Same for (dashboard): pages at (dashboard)/page.tsx = /dashboard, NOT (dashboard)/dashboard/page.tsx
- Verified correct structure: (admin)/layout.tsx + (admin)/page.tsx + (admin)/users/page.tsx etc.

## Client Components with Metadata (TypeScript rule)
- export const metadata is NOT allowed in "use client" files — build error
- Pattern: page.tsx (Server, exports metadata) imports <ClientForm /> component
- ClientForm in separate src/components/forms/xxx-form.tsx with "use client" directive
- Example: (auth)/reset-password/page.tsx imports ResetPasswordForm

## Phase 7 New Files (commit 360365d)
- src/components/providers/auth-provider.tsx — AuthProvider + useAuthContext()
- src/hooks/use-premium.ts — usePremium() hook (isPremium/daysLeft/isExpiringSoon)
- src/components/ui/theme-toggle.tsx — ThemeToggle light/dark/system button
- src/components/ui/toaster.tsx — Sonner KWATIGUIGUI-themed wrapper
- src/components/ui/whatsapp-button.tsx — Green WhatsApp button (inline SVG)
- src/components/ui/premium-banner.tsx — Dismissable localStorage banner
- src/components/ui/empty-state.tsx — Reusable empty state component
- src/components/forms/reset-password-form.tsx — Client form with strength gauge
- src/app/(auth)/confirm/page.tsx — Supabase PKCE code exchange handler
- src/app/(auth)/reset-password/page.tsx — Server wrapper
- src/app/api/profiles/[id]/route.ts — Public profile with WhatsApp masking
- src/app/api/jobs/route.ts — Implemented (was TODO placeholder)

## Key Architecture Decisions
- Route groups: (marketing), (auth), (dashboard), (admin)
- 3 Supabase clients: browser (anon), server (anon+cookies), admin (service role singleton)
- Admin client: module-level guard (not runtime) + exported as supabaseAdmin singleton
- Middleware: updateSession() from @/lib/supabase/middleware refreshes JWT on every request
- Auth check: ALWAYS use getUser() not getSession() (validates with Supabase servers)
- All API goes through Route Handlers / Server Actions, never direct Supabase from browser
- Zod schemas shared between frontend and Server Actions for validation
- Webhook payments: HMAC-SHA256 verification, status ONLY set by webhook handler
- Dashboard layout: server-side double-check via supabase.auth.getUser() (defense in depth)

## Key File Paths (Core)
- `src/lib/supabase/middleware.ts` — updateSession() for middleware token refresh
- `src/lib/auth/actions.ts` — signIn, signUp, signOut, forgotPassword, resetPassword
- `src/lib/auth/admin-actions.ts` — adminLogin, adminLogout, verifyAdminSession, setupAdminTotp
- `src/hooks/use-auth.ts` — useUser(), useSession(), useIsPremium() client hooks
- `src/types/database.ts` — typed Database schema (regenerate with: npm run db:types)
- `src/components/forms/` — LoginForm, RegisterForm, ForgotPasswordForm client components

## Business Data
- Price: 2,500 FCFA/month (12,500/6mo, 25,000/year)
- Payment: Orange Money (74 14 34 34), Telecel Money (76 16 90 90)
- WhatsApp: +236 74 14 34 34
- 20 RCA regions, 20 job types, 14 sectors
- Free limit: 5 job listings
- User types: seeker, employer
