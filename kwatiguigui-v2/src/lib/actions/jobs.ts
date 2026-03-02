"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { JOB_TYPES, PRICING } from "@/lib/constants";

import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// Job schemas
// ---------------------------------------------------------------------------
const jobSchema = z.object({
  city: z.string().min(2, "La ville est requise").max(100),
  neighborhood: z.string().max(100).optional().default(""),
  job_type: z
    .string()
    .refine((val) => (JOB_TYPES as readonly string[]).includes(val), {
      message: "Type d'emploi invalide",
    }),
  experience: z.string().max(500).optional().default(""),
});

// ---------------------------------------------------------------------------
// createJob
// ---------------------------------------------------------------------------
export async function createJob(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  // Fetch profile to get user data + subscription status
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, date_of_birth, whatsapp, user_type, subscription_paid, expiry_date")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { success: false, error: "Profil introuvable." };
  }

  // Check freemium limit
  const isPremium =
    profile.subscription_paid &&
    profile.expiry_date &&
    new Date(profile.expiry_date) > new Date();

  if (!isPremium) {
    const { count } = await supabase
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_active", true);

    if ((count ?? 0) >= PRICING.FREE_JOB_LIMIT) {
      return {
        success: false,
        error: `Limite gratuite atteinte (${PRICING.FREE_JOB_LIMIT} annonces). Passez a Premium pour publier des annonces illimitees.`,
      };
    }
  }

  const raw = {
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    job_type: formData.get("job_type"),
    experience: formData.get("experience") || undefined,
  };

  const parsed = jobSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + PRICING.JOB_EXPIRY_DAYS);

  const { error: insertError } = await supabase.from("jobs").insert({
    user_id: user.id,
    first_name: profile.first_name,
    age: (() => {
      if (!profile.date_of_birth) return 0;
      const dob = new Date(profile.date_of_birth);
      const today = new Date();
      let a = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--;
      return Math.max(0, a);
    })(),
    whatsapp: profile.whatsapp,
    city: parsed.data.city,
    neighborhood: parsed.data.neighborhood || null,
    job_type: parsed.data.job_type,
    experience: parsed.data.experience || null,
    user_type: profile.user_type,
    is_active: true,
    publication_status: "pending",
    expires_at: expiresAt.toISOString(),
  });

  if (insertError) {
    return { success: false, error: "Erreur lors de la creation de l'annonce." };
  }

  revalidatePath("/dashboard/jobs");
  return { success: true };
}

// ---------------------------------------------------------------------------
// deleteJob
// ---------------------------------------------------------------------------
export async function deleteJob(jobId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  // RLS ensures user can only delete their own jobs
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: "Erreur lors de la suppression." };
  }

  revalidatePath("/dashboard/jobs");
  return { success: true };
}

// ---------------------------------------------------------------------------
// toggleJobActive
// ---------------------------------------------------------------------------
export async function toggleJobActive(
  jobId: string,
  isActive: boolean,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  const { error } = await supabase
    .from("jobs")
    .update({ is_active: !isActive })
    .eq("id", jobId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: "Erreur lors de la mise a jour." };
  }

  revalidatePath("/dashboard/jobs");
  return { success: true };
}
