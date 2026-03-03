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
    return { success: false, error: "Non authentifié." };
  }

  const raw = {
    currentPassword:    formData.get("currentPassword"),
    newPassword:        formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  };

  const parsed = changePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Verify current password by re-authenticating
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
      error: "Erreur lors du changement de mot de passe. Réessayez.",
    };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// requestPasswordReset
// For Google-only accounts that want to set an email/password in addition.
// Sends a Supabase reset link → user lands on /reset-password, sets a
// password, and can then log in with email + password going forward.
// ---------------------------------------------------------------------------
export async function requestPasswordReset(): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return { success: false, error: "Non authentifié." };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) {
    return {
      success: false,
      error: "Erreur lors de l'envoi du lien. Réessayez.",
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
    return { success: false, error: "Non authentifié." };
  }

  // Soft-delete : is_active = false
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ is_active: false })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: "Erreur lors de la désactivation." };
  }

  await supabase.auth.signOut();
  return { success: true };
}
