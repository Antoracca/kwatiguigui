import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
function getSafeNextPath(raw: string | null): string {
  if (!raw) return "/dashboard";
  const value = raw.trim();
  if (!value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
}

/**
 * GET /api/auth/callback
 *
 * Callback OAuth Supabase — reçoit le code PKCE, échange contre une session,
 * crée le profil minimal si nouvel utilisateur OAuth, puis redirige.
 *
 * Flux OAuth :
 *  1. Supabase redirige ici après Google/Microsoft/etc.
 *  2. On échange le ?code= contre une session (PKCE)
 *  3. Si nouveau user → profil minimal créé → /onboarding
 *  4. Si user existant → /dashboard directement
 *
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code  = searchParams.get("code");
  const next = searchParams.get("next");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // ── Refus de l'utilisateur (ex: "Annuler" dans la popup Google) ──────────
  if (error) {
    const url = new URL("/login", origin);
    url.searchParams.set("oauthError", errorDescription ?? "Connexion refusée.");
    return NextResponse.redirect(url);
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?oauthError=Code+manquant", origin));
  }

  const supabase = await createClient();

  // ── Échange du code PKCE contre une session ───────────────────────────────
  const { data: sessionData, error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError || !sessionData?.user) {
    console.error("[OAuth callback] exchangeCodeForSession:", exchangeError?.message);
    return NextResponse.redirect(
      new URL("/login?oauthError=Session+invalide.+Réessayez.", origin),
    );
  }

  const user = sessionData.user;
  const destination = getSafeNextPath(next);

  // ── Vérifier si le profil existe déjà ────────────────────────────────────
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id, city")
    .eq("id", user.id)
    .maybeSingle();

  if (existingProfile) {
    // Utilisateur connu — rediriger vers la destination demandée (ou dashboard)
    return NextResponse.redirect(new URL(destination, origin));
  }

  // ── Nouveau utilisateur OAuth — créer un profil minimal ──────────────────
  const meta = user.user_metadata ?? {};

  // Supabase n'expose pas given_name/family_name de manière fiable depuis Google.
  // Seul full_name (nom complet en une chaîne) est disponible dans user_metadata.
  // Ref: https://github.com/orgs/supabase/discussions/28415
  //
  // Convention RCA : prénom(s) d'abord, nom de famille en dernier.
  // → On sépare sur le DERNIER espace :
  //   "Anthony Lucien Kouini" → prénom = "Anthony Lucien", nom = "Kouini" ✓
  //   "Jean Paul"             → prénom = "Jean",           nom = "Paul"   ✓
  //   "Marie"                 → prénom = "Marie",          nom = ""       ✓

  const sanitize = (s: string): string =>
    s.replace(/[^\p{L}\s'-]/gu, "").trim().slice(0, 50);

  const fullName = sanitize((meta.full_name ?? meta.name ?? "") as string);

  let first_name: string;
  let last_name: string;

  if (!fullName) {
    first_name = "Utilisateur";
    last_name  = "";
  } else {
    const lastSpace = fullName.lastIndexOf(" ");
    if (lastSpace === -1) {
      // Nom unique — tout dans le prénom
      first_name = fullName;
      last_name  = "";
    } else {
      first_name = fullName.slice(0, lastSpace).trim();
      last_name  = fullName.slice(lastSpace + 1).trim();
    }
  }

  // Username défini par l'utilisateur pendant l'onboarding — null ici pour éviter
  // tout conflit de contrainte UNIQUE qui ferait échouer silencieusement l'INSERT.
  const username = null;

  // Insertion du profil minimal — city / job_type complétés dans /onboarding
  const { error: profileError } = await supabase.from("profiles").insert({
    id:              user.id,
    first_name:      first_name,
    last_name:       last_name,
    username,
    whatsapp:        "",   // l'utilisateur saisit son numéro WhatsApp lui-même dans son profil
    phone:           null,
    city:            "",   // complété en onboarding
    neighborhood:    "",   // complété en onboarding (NOT NULL — chaîne vide autorisée)
    job_type:        "",   // complété en onboarding
    experience:      "none", // valeur par défaut — NOT NULL en DB
    user_type:       "seeker", // défaut, modifié en onboarding
    is_active:       true,
    subscription_paid: false,
  });

  if (profileError) {
    console.error("[OAuth callback] Profile insert failed:", profileError.message);
    // On continue quand même — l'onboarding détectera le profil absent ou incomplet
  }

  return NextResponse.redirect(new URL(destination, origin));
}
