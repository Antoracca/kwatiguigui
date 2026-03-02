"use server";

import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { EXPERIENCE_VALUES } from "@/lib/constants";
import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// Schema de validation
// ---------------------------------------------------------------------------
const onboardingSchema = z.object({
  userType: z.enum(["seeker", "employer"], {
    required_error: "Veuillez choisir votre type de compte",
  }),
  username: z
    .string()
    .min(3, "L'identifiant doit contenir au moins 3 caractères")
    .max(30, "30 caractères maximum")
    .regex(/^[a-zA-Z0-9_]+$/, "Lettres, chiffres et _ uniquement (sans espaces)"),
  dateOfBirth: z
    .string()
    .min(1, "La date de naissance est requise")
    .refine((val) => {
      const dob = new Date(val);
      if (isNaN(dob.getTime())) return false;
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      return age >= 18 && age <= 99;
    }, "Vous devez avoir au moins 18 ans"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .refine(
      (val) => /^\+?[\d\s()\-]{6,}$/.test(val),
      "Format invalide (+236 XX XX XX XX)",
    ),
  city: z
    .string()
    .min(2, "La ville est requise")
    .max(100),
  neighborhood: z
    .string()
    .max(100)
    .optional()
    .default(""),
  jobType: z
    .string()
    .min(1, "Ce champ est requis"),
  experience: z
    .enum(EXPERIENCE_VALUES)
    .optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

// ---------------------------------------------------------------------------
// completeOnboarding — Server Action
// Utilisé uniquement pour les utilisateurs OAuth qui complètent leur profil
// ---------------------------------------------------------------------------
export async function completeOnboarding(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié. Veuillez vous reconnecter." };
  }

  const raw = {
    userType:     formData.get("userType"),
    username:     formData.get("username"),
    dateOfBirth:  formData.get("dateOfBirth") || undefined,
    phone:        formData.get("phone"),
    city:         formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    jobType:      formData.get("jobType"),
    experience:   formData.get("experience") || undefined,
  };

  const parsed = onboardingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // ── Extraction des noms depuis les métadonnées OAuth (même logique que le callback) ──
  // Supabase n'expose pas given_name/family_name de manière fiable depuis Google OAuth.
  // Seul full_name est disponible. Convention RCA : prénom(s) en premier, nom en dernier.
  // → Split sur le DERNIER espace pour séparer prénom(s) et nom de famille.
  const meta = user.user_metadata ?? {};

  const sanitize = (s: string): string =>
    s.replace(/[^\p{L}\s'-]/gu, "").trim().slice(0, 50);

  const fullName = sanitize((meta.full_name ?? meta.name ?? "") as string);

  let firstName: string;
  let lastName: string;

  if (!fullName) {
    firstName = "Utilisateur";
    lastName  = "";
  } else {
    const lastSpace = fullName.lastIndexOf(" ");
    if (lastSpace === -1) {
      firstName = fullName;
      lastName  = "";
    } else {
      firstName = fullName.slice(0, lastSpace).trim();
      lastName  = fullName.slice(lastSpace + 1).trim();
    }
  }

  // ── Upsert — robuste même si le callback INSERT a échoué ──────────────────
  // update() échouerait silencieusement sur un profil inexistant (0 lignes, pas d'erreur)
  // → le upsert garantit que le profil est créé ou mis à jour dans tous les cas.
  const { error: updateError } = await supabase
    .from("profiles")
    .upsert(
      {
        id:            user.id,
        user_type:     parsed.data.userType,
        username:      parsed.data.username.toLowerCase(),
        date_of_birth: parsed.data.dateOfBirth ?? null,
        phone:         parsed.data.phone,
        city:          parsed.data.city,
        neighborhood:  parsed.data.neighborhood || "",
        job_type:      parsed.data.jobType,
        experience:    parsed.data.experience ?? "none",
        // Champs requis pour l'INSERT (si le profil n'existe pas encore) :
        first_name:        firstName,
        last_name:         lastName,
        whatsapp:          "",  // saisie par l'utilisateur dans son profil
        is_active:         true,
        subscription_paid: false,
      },
      { onConflict: "id" },
    );

  if (updateError) {
    console.error("[completeOnboarding] Update failed:", updateError.message);
    const isUsernameTaken = updateError.message.includes("profiles_username_unique");
    return {
      success: false,
      error: isUsernameTaken
        ? "Cet identifiant est déjà utilisé. Veuillez en choisir un autre."
        : "Erreur lors de la mise à jour. Réessayez.",
      fieldErrors: isUsernameTaken ? { username: ["Identifiant déjà utilisé"] } : undefined,
    };
  }

  return { success: true };
}
