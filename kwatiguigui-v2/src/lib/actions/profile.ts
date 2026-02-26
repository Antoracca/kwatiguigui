"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { RCA_REGIONS, JOB_TYPES } from "@/lib/constants";

import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, "Le prenom doit contenir au moins 2 caracteres")
    .max(50, "Le prenom ne peut pas depasser 50 caracteres")
    .regex(/^[\p{L}\s'-]+$/u, "Le prenom contient des caracteres invalides"),
  age: z
    .number({ invalid_type_error: "L'age doit etre un nombre" })
    .int("L'age doit etre un nombre entier")
    .min(18, "Vous devez avoir au moins 18 ans")
    .max(99, "Age invalide"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?\d[\d\s-]{7,}$/.test(val),
      "Format de telephone invalide",
    ),
  region: z
    .string()
    .refine((val) => (RCA_REGIONS as readonly string[]).includes(val), {
      message: "Region invalide",
    }),
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
  experience: z.string().max(500).optional().default(""),
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
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    phone: formData.get("phone") || undefined,
    region: formData.get("region"),
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    job_type: formData.get("job_type"),
    experience: formData.get("experience") || undefined,
  };

  const parsed = updateProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      first_name: parsed.data.first_name,
      age: parsed.data.age,
      phone: parsed.data.phone ?? null,
      region: parsed.data.region,
      city: parsed.data.city,
      neighborhood: parsed.data.neighborhood || null,
      job_type: parsed.data.job_type,
      experience: parsed.data.experience || null,
    })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la mise a jour du profil." };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}
