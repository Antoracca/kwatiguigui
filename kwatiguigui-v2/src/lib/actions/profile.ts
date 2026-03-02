"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { JOB_TYPES, EXPERIENCE_VALUES } from "@/lib/constants";

import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// Âge minimum légal de travail en RCA (Code du Travail, Article 259)
// ---------------------------------------------------------------------------
const MIN_WORK_AGE = 15;

/**
 * Calcule l'âge exact en années à partir d'une date de naissance ISO.
 * Retourne null si la date est absente ou invalide.
 */
function calcAge(dob: string | null | undefined): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= 0 ? age : null;
}

/**
 * Convertit une valeur d'expérience en nombre d'années revendiquées.
 * Pour "X ans +", extrait X. Pour les prédéfinis, retourne la borne basse.
 * "none" → 0 (pas d'expérience déclarée, pas de fraude possible).
 */
function expToClaimedYears(exp: string): number {
  if (!exp || exp === "none") return 0;
  const MAP: Record<string, number> = {
    "1+": 1, "3+": 3, "5+": 5, "10+": 10, "15+": 15, "20+": 20,
  };
  if (exp in MAP) return MAP[exp] ?? 0;
  const y = parseInt(exp.replace(/\D/g, ""), 10);
  return isNaN(y) ? 0 : y;
}

/**
 * Vérifie la cohérence âge / expérience.
 * Retourne null si tout est OK, ou un message d'erreur si incohérent.
 */
function checkAgeExpCoherence(
  dob: string | null | undefined,
  expValue: string,
): string | null {
  const age = calcAge(dob);
  if (age === null) return null; // Pas de date de naissance → pas de vérification

  const claimed = expToClaimedYears(expValue);
  if (claimed === 0) return null; // "none" ou non renseigné → OK

  const maxPossible = Math.max(0, age - MIN_WORK_AGE);

  if (claimed > maxPossible) {
    return (
      `Incohérence détectée : à ${age} ans, l'expérience maximale possible est ` +
      `${maxPossible} an(s) (âge légal de travail en RCA : ${MIN_WORK_AGE} ans). ` +
      `Déclarer ${claimed} an(s) d'expérience est impossible.`
    );
  }
  return null;
}

// ---------------------------------------------------------------------------
// resendVerificationEmail — renvoie l'email de confirmation Supabase
// ---------------------------------------------------------------------------
export async function resendVerificationEmail(): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || !user.email) {
    return { success: false, error: "Non authentifié." };
  }

  if (user.email_confirmed_at) {
    return { success: false, error: "Votre email est déjà vérifié." };
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: user.email,
  });

  if (error) {
    return { success: false, error: "Impossible d'envoyer l'email. Réessayez dans quelques minutes." };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, "Le prenom doit contenir au moins 2 caracteres")
    .max(50, "Le prenom ne peut pas depasser 50 caracteres")
    .regex(/^[\p{L}\s'-]+$/u, "Le prenom contient des caracteres invalides"),
  last_name: z
    .string()
    .max(50, "Le nom ne peut pas depasser 50 caracteres")
    .optional()
    .default(""),
  username: z
    .string()
    .optional()
    .default(""),
  date_of_birth: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const dob = new Date(val);
        if (isNaN(dob.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        return age >= 18 && age <= 99;
      },
      "Vous devez avoir au moins 18 ans",
    ),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?\d[\d\s-]{7,}$/.test(val),
      "Format de telephone invalide",
    ),
  whatsapp: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?\d[\d\s-]{7,}$/.test(val),
      "Format WhatsApp invalide (+236 XX XX XX XX)",
    ),
  city: z
    .string()
    .min(2, "La ville doit contenir au moins 2 caracteres")
    .max(100),
  neighborhood: z.string().max(100).optional().default(""),
  job_type: z
    .string()
    .refine((val) => (JOB_TYPES as readonly string[]).includes(val), {
      message: "Type d'emploi invalide",
    }),
  experience: z.string().optional().default("none"),
  linkedin_url: z
    .string()
    .max(500)
    .optional()
    .default("")
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val) || /^[\w.-]+$/.test(val),
      "URL ou nom d'utilisateur LinkedIn invalide",
    ),
  facebook_url: z
    .string()
    .max(500)
    .optional()
    .default("")
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val) || /^[\w.-]+$/.test(val),
      "URL ou nom d'utilisateur Facebook invalide",
    ),
  instagram_url: z
    .string()
    .max(500)
    .optional()
    .default("")
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val) || /^@?[\w.-]+$/.test(val),
      "URL ou nom d'utilisateur Instagram invalide",
    ),
  github_url: z
    .string()
    .max(500)
    .optional()
    .default("")
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val) || /^[\w.-]+$/.test(val),
      "URL ou nom d'utilisateur GitHub invalide",
    ),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ---------------------------------------------------------------------------
// updateProfile Server Action
// ---------------------------------------------------------------------------
export async function updateProfile(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie. Veuillez vous reconnecter." };
  }

  const raw = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name") || undefined,
    username: formData.get("username") || undefined,
    date_of_birth: formData.get("date_of_birth") || undefined,
    phone: formData.get("phone") || undefined,
    whatsapp: formData.get("whatsapp") || undefined,
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    job_type: formData.get("job_type"),
    experience: formData.get("experience") || undefined,
    linkedin_url: formData.get("linkedin_url") || undefined,
    facebook_url: formData.get("facebook_url") || undefined,
    instagram_url: formData.get("instagram_url") || undefined,
    github_url: formData.get("github_url") || undefined,
  };

  const parsed = updateProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let finalExperience = parsed.data.experience ?? "none";

  // "other" is a UI-only marker — never persist it in the DB
  if (finalExperience === "other") {
    finalExperience = "none";
  } else if (!EXPERIENCE_VALUES.includes(finalExperience as any) && finalExperience !== "") {
    // Custom value typed by the user — keep only digits then format as "X ans +"
    const digitsOnly = finalExperience.replace(/\D/g, "");
    finalExperience = digitsOnly ? `${digitsOnly} ans +` : "none";
  }

  // ── Cohérence âge / expérience (défense backend — non contournable) ──────
  const coherenceError = checkAgeExpCoherence(
    parsed.data.date_of_birth ?? null,
    finalExperience,
  );
  if (coherenceError) {
    return {
      success: false,
      error: coherenceError,
      fieldErrors: {
        experience: [`Expérience déclarée incompatible avec votre date de naissance.`],
      },
    };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      username: parsed.data.username,
      date_of_birth: parsed.data.date_of_birth ?? null,
      phone: parsed.data.phone ?? null,
      whatsapp: parsed.data.whatsapp ?? "",
      city: parsed.data.city,
      neighborhood: parsed.data.neighborhood || "",
      job_type: parsed.data.job_type,
      experience: finalExperience as any,
      linkedin_url: parsed.data.linkedin_url ?? "",
      facebook_url: parsed.data.facebook_url ?? "",
      instagram_url: parsed.data.instagram_url ?? "",
      github_url: parsed.data.github_url ?? "",
    })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la mise a jour du profil." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// ---------------------------------------------------------------------------
// updateExperience — save ONLY the experience field (mini-save in profile form)
// ---------------------------------------------------------------------------
export async function updateExperience(value: string): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié." };
  }

  let finalExperience = value.trim();

  if (!finalExperience || finalExperience === "other") {
    finalExperience = "none";
  } else if (!EXPERIENCE_VALUES.includes(finalExperience as any)) {
    // Custom numeric value — format as "X ans +"
    const digitsOnly = finalExperience.replace(/\D/g, "");
    finalExperience = digitsOnly ? `${digitsOnly} ans +` : "none";
  }

  // ── Cohérence âge / expérience — récupère la DOB existante en DB ─────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("date_of_birth")
    .eq("id", user.id)
    .single();

  const coherenceError = checkAgeExpCoherence(
    profile?.date_of_birth ?? null,
    finalExperience,
  );
  if (coherenceError) {
    return { success: false, error: coherenceError };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ experience: finalExperience as any })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Erreur lors de la sauvegarde de l'expérience." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// ---------------------------------------------------------------------------
// updateAvatar — upload avatar to Storage then save public URL in profile
// ---------------------------------------------------------------------------
export async function updateAvatar(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié." };
  }

  const file = formData.get("avatar") as File | null;
  if (!file || !file.size) {
    return { success: false, error: "Aucun fichier sélectionné." };
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: "Format non supporté. Utilisez JPG, PNG ou WEBP." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "La photo ne doit pas dépasser 5 Mo." };
  }

  // Always overwrite the same path — upsert avoids orphaned files
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${user.id}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { success: false, error: `Échec du téléversement : ${uploadError.message}` };
  }

  // Cache-bust the public URL so browsers always show the latest avatar
  const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
  const avatarUrl = `${publicUrl}?t=${Date.now()}`;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la mise à jour du profil." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// ---------------------------------------------------------------------------
// updateCV — upload CV to private Storage bucket 'cvs', save path in profile
// ---------------------------------------------------------------------------
export async function updateCV(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié." };
  }

  const file = formData.get("cv") as File | null;
  if (!file || !file.size) {
    return { success: false, error: "Aucun fichier sélectionné." };
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: "Format non supporté. Utilisez PDF, DOC ou DOCX." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "Le CV ne doit pas dépasser 5 Mo." };
  }

  const ext =
    file.type === "application/pdf" ? "pdf" :
    file.type === "application/msword" ? "doc" : "docx";

  // Always overwrite the same path per user — upsert avoids orphaned files
  const path = `${user.id}/cv.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("cvs")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { success: false, error: `Échec du téléversement : ${uploadError.message}` };
  }

  // ---------------------------------------------------------------------------
  // TODO (Phase IA) : Analyse automatique du CV
  // Quand l'algo sera prêt, déclencher ici un job d'extraction OCR/NLP :
  //   → Lire nom, prénom, date de naissance dans le document
  //   → Comparer avec profiles.first_name / last_name / date_of_birth
  //   → Si incohérence → cv_fraud_flag = true + notification admin
  // ---------------------------------------------------------------------------

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      cv_path: path,
      cv_filename: file.name,
      cv_size: file.size,
    })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la mise à jour du profil." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// ---------------------------------------------------------------------------
// deleteCV — remove CV from Storage and clear profile fields
// ---------------------------------------------------------------------------
export async function deleteCV(): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié." };
  }

  // Fetch current path to remove the exact file from Storage
  const { data: profile } = await supabase
    .from("profiles")
    .select("cv_path")
    .eq("id", user.id)
    .single();

  if (profile?.cv_path) {
    await supabase.storage.from("cvs").remove([profile.cv_path]);
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ cv_path: null, cv_filename: null, cv_size: null })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la suppression du CV." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// ---------------------------------------------------------------------------
// updateCvPublic — toggle CV public sharing for employers/recruiters
// ---------------------------------------------------------------------------
export async function updateCvPublic(value: boolean): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ cv_public: value })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Erreur lors de la mise à jour du paramètre de partage." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}
