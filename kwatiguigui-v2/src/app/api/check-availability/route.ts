import { type NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * GET /api/check-availability
 *
 * Vérifie en temps réel si un email ou un username est déjà pris.
 * Utilisé pendant l'inscription pour feedback immédiat sans soumettre le formulaire.
 *
 * Query params:
 *   type=email|username
 *   value=<valeur à vérifier>
 *
 * Réponse:
 *   { available: true }   — disponible
 *   { available: false }  — déjà utilisé
 *
 * Sécurité:
 *   - Pas de données sensibles retournées (juste un booléen)
 *   - Validation format côté serveur avant toute requête DB
 *   - Fail open en cas d'erreur DB (le server action rattrapera les doublons)
 *   - Email check via RPC SECURITY DEFINER (auth.users inaccessible en REST)
 *   - Username check via service role → profiles.username (contrainte UNIQUE)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type  = searchParams.get("type");
  const value = (searchParams.get("value") ?? "").trim();

  if (!type || !["email", "username", "phone"].includes(type) || !value) {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  // ── Validation format minimale avant d'appeler la DB ─────────────────────
  if (type === "email") {
    if (!value.includes("@") || !value.includes(".") || value.length < 5) {
      return NextResponse.json({ available: false });
    }
  }

  if (type === "username") {
    if (value.length < 3 || !/^[a-zA-Z0-9_]+$/.test(value)) {
      return NextResponse.json({ available: false });
    }
  }

  if (type === "phone") {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 7) {
      return NextResponse.json({ available: false });
    }
  }

  try {
    // ── Username — profiles.username (contrainte UNIQUE) ──────────────────
    if (type === "username") {
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("username", value.toLowerCase())
        .maybeSingle();

      if (error) {
        console.error("[check-availability] username check:", error.message);
        return NextResponse.json({ available: true }); // fail open
      }

      return NextResponse.json({ available: data === null });
    }

    // ── Phone — normalisation JS côté serveur (digits-only) ─────────────
    // On normalise en chiffres purs des deux côtés pour éviter les faux
    // négatifs dus aux espaces, indicatifs, tirets, etc.
    // N'utilise pas de RPC SQL → fonctionne sans migration préalable.
    if (type === "phone") {
      const digitsInput = value.replace(/\D/g, "");

      const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("phone")
        .not("phone", "is", null)
        .neq("phone", "");

      if (error) {
        console.error("[check-availability] phone list fetch:", error.message);
        return NextResponse.json({ available: true }); // fail open
      }

      const taken = data?.some(
        (row) => row.phone != null && row.phone.replace(/\D/g, "") === digitsInput,
      ) ?? false;

      return NextResponse.json({ available: !taken });
    }

    // ── Email — auth.users via RPC SECURITY DEFINER ───────────────────────
    if (type === "email") {
      const { data: isAvailable, error } = await supabaseAdmin
        .rpc("check_email_available", { email_to_check: value });

      if (error) {
        console.error("[check-availability] email check:", error.message);
        return NextResponse.json({ available: true }); // fail open
      }

      return NextResponse.json({ available: isAvailable });
    }
  } catch (err) {
    console.error("[check-availability] Unexpected error:", err);
    return NextResponse.json({ available: true }); // fail open
  }

  return NextResponse.json({ error: "Type inconnu" }, { status: 400 });
}
