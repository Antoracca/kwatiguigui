"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// ── Validation schema ────────────────────────────────────────────────────────

const BookingSchema = z.object({
  full_name:           z.string().min(2, "Le nom est requis (2 caractères min.)"),
  email:               z.string().email("Adresse email invalide"),
  phone:               z.string().optional(),
  preferred_date:      z.string().min(1, "Sélectionnez une date"),
  preferred_time_slot: z.string().min(1, "Sélectionnez un créneau horaire"),
  topic:               z.string().min(1, "Choisissez un sujet de session"),
  message:             z.string().max(500, "500 caractères maximum").optional(),
});

export type BookingFormData = z.infer<typeof BookingSchema>;

export interface BookingActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof BookingFormData, string>>;
}

// ── Server action ────────────────────────────────────────────────────────────

export async function bookCoachingSession(
  formData: BookingFormData,
): Promise<BookingActionResult> {
  // 1. Validate input
  const parsed = BookingSchema.safeParse(formData);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof BookingFormData;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, fieldErrors };
  }

  // 2. Verify authentication
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Session expirée. Veuillez vous reconnecter." };
  }

  // 3. Insert appointment
  // Note: coaching_appointments is a new table (migration 014).
  // Run `npm run db:types` to regenerate database.ts after applying the migration.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("coaching_appointments")
    .insert({
      user_id:             user.id,
      full_name:           parsed.data.full_name,
      email:               parsed.data.email,
      phone:               parsed.data.phone    ?? null,
      preferred_date:      parsed.data.preferred_date,
      preferred_time_slot: parsed.data.preferred_time_slot,
      topic:               parsed.data.topic,
      message:             parsed.data.message  ?? null,
      status:              "pending",
    });

  if (error) {
    console.error("[coaching] insert error:", error.message);
    return { success: false, error: "Erreur lors de la réservation. Veuillez réessayer." };
  }

  return { success: true };
}
