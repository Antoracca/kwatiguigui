"use server";

import { createClient } from "@/lib/supabase/server";
import { changePasswordSchema } from "@/lib/validations/auth";

import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// changePassword
// ---------------------------------------------------------------------------
export async function changePassword(
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

  const raw = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  };

  const parsed = changePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Verify current password by trying to sign in
  const email = user.email;
  if (!email) {
    return { success: false, error: "Session invalide." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.currentPassword,
  });

  if (verifyError) {
    return {
      success: false,
      fieldErrors: {
        currentPassword: ["Mot de passe actuel incorrect."],
      },
    };
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });

  if (updateError) {
    return {
      success: false,
      error: "Erreur lors du changement de mot de passe. Reessayez.",
    };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// deactivateAccount
// ---------------------------------------------------------------------------
export async function deactivateAccount(): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  // Soft-delete: set is_active = false on profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ is_active: false })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la desactivation." };
  }

  await supabase.auth.signOut();
  return { success: true };
}
