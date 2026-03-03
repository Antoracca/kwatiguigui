"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// Valid constants (must match StudentSectionCard constants)
// ---------------------------------------------------------------------------
const STUDY_LEVELS = ["Bac", "BTS", "Licence", "Master", "Doctorat", "Formation pro", "BEPC", "CAP/BEP", ""] as const;
const SCHOOL_YEARS = ["1ère année", "2ème année", "3ème année", "4ème année", "5ème +", ""] as const;
const INTERNSHIP_DURATIONS = ["1 mois", "2 mois", "3 mois", "6 mois", "Flexible", ""] as const;
const INTERNSHIP_MODES = ["Présentiel", "Distanciel", "Hybride", ""] as const;

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const studentProfileSchema = z.object({
  school_name:          z.string().max(200).default(""),
  field_of_study:       z.string().max(100).default(""),
  study_level:          z.string().refine((v) => (STUDY_LEVELS as readonly string[]).includes(v), "Niveau invalide").default(""),
  school_year:          z.string().refine((v) => (SCHOOL_YEARS as readonly string[]).includes(v), "Année invalide").default(""),
  internship_open:      z.boolean().default(false),
  alternance_open:      z.boolean().default(false),
  internship_start:     z.string().nullable().default(null).refine(
    (v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v),
    "Format de date invalide (YYYY-MM-DD)",
  ),
  internship_duration:  z.string().refine((v) => (INTERNSHIP_DURATIONS as readonly string[]).includes(v), "Durée invalide").default(""),
  internship_mode:      z.string().refine((v) => (INTERNSHIP_MODES as readonly string[]).includes(v), "Mode invalide").default(""),
  student_description:  z.string().max(600).default(""),
});

export type StudentProfileInput = z.infer<typeof studentProfileSchema>;

// ---------------------------------------------------------------------------
// toggleStudentMode — immediate on/off for the student section
// ---------------------------------------------------------------------------
export async function toggleStudentMode(value: boolean): Promise<ActionResult> {
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
    .update({ is_student: value })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Erreur lors de l'activation du pôle étudiant." };
  }

  revalidatePath("/dashboard/student");
  return { success: true };
}

// ---------------------------------------------------------------------------
// updateStudentProfile — save all student fields (school, level, preferences)
// ---------------------------------------------------------------------------
export async function updateStudentProfile(input: StudentProfileInput): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifié." };
  }

  const parsed = studentProfileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      school_name:          parsed.data.school_name,
      field_of_study:       parsed.data.field_of_study,
      study_level:          parsed.data.study_level,
      school_year:          parsed.data.school_year,
      internship_open:      parsed.data.internship_open,
      alternance_open:      parsed.data.alternance_open,
      internship_start:     parsed.data.internship_start,
      internship_duration:  parsed.data.internship_duration,
      internship_mode:      parsed.data.internship_mode,
      student_description:  parsed.data.student_description,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Erreur lors de la sauvegarde du profil étudiant." };
  }

  revalidatePath("/dashboard/student");
  return { success: true };
}
