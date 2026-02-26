"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Converts a WhatsApp number to a Supabase Auth-compatible email.
 * Supabase Auth requires an email address for its internal auth system.
 *
 * Format: strip all non-digits from the WhatsApp number, append @kwatiguigui.cf
 * Example: "+236 74 14 34 34" → "23674143434@kwatiguigui.cf"
 */
function whatsappToEmail(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `${digits}@kwatiguigui.cf`;
}

// ---------------------------------------------------------------------------
// Action result type
// ---------------------------------------------------------------------------
export interface ActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// ---------------------------------------------------------------------------
// signIn — authenticate with WhatsApp number + password
// ---------------------------------------------------------------------------
export async function signIn(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    whatsapp: formData.get("whatsapp"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const email = whatsappToEmail(parsed.data.whatsapp);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.password,
  });

  if (error) {
    // Normalize Supabase Auth error messages for French UI
    const message =
      error.message === "Invalid login credentials"
        ? "Numero WhatsApp ou mot de passe incorrect."
        : error.message === "Email not confirmed"
          ? "Votre compte n'a pas encore ete confirme."
          : "Une erreur est survenue. Veuillez reessayer.";

    return { success: false, error: message };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// signUp — register a new user
// ---------------------------------------------------------------------------
export async function signUp(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    userType: formData.get("userType"),
    firstName: formData.get("firstName"),
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    whatsapp: formData.get("whatsapp"),
    phone: formData.get("phone") || undefined,
    region: formData.get("region"),
    city: formData.get("city"),
    neighborhood: formData.get("neighborhood") || undefined,
    jobType: formData.get("jobType"),
    experience: formData.get("experience") || undefined,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const email = whatsappToEmail(parsed.data.whatsapp);

  // Step 1: Create the Supabase Auth user.
  // The user's profile row is created in step 2 after successful auth creation.
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: parsed.data.password,
    options: {
      // Store minimal data in auth.users metadata (not sensitive data).
      // The full profile lives in the public.profiles table.
      data: {
        user_type: parsed.data.userType,
        first_name: parsed.data.firstName,
      },
    },
  });

  if (authError) {
    const message =
      authError.message.includes("already registered") ||
      authError.message.includes("User already registered")
        ? "Ce numero WhatsApp est deja utilise. Voulez-vous vous connecter ?"
        : "Erreur lors de la creation du compte. Veuillez reessayer.";

    return { success: false, error: message };
  }

  if (!authData.user) {
    return { success: false, error: "Erreur inattendue. Veuillez reessayer." };
  }

  // Step 2: Insert the user profile into public.profiles.
  // This uses the server client which acts as the authenticated user,
  // so RLS allows the INSERT (policy: auth.uid() = id).
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    first_name: parsed.data.firstName,
    age: parsed.data.age,
    whatsapp: parsed.data.whatsapp,
    phone: parsed.data.phone ?? null,
    region: parsed.data.region,
    city: parsed.data.city,
    neighborhood: parsed.data.neighborhood ?? null,
    job_type: parsed.data.jobType,
    experience: parsed.data.experience ?? null,
    user_type: parsed.data.userType,
    is_active: true,
    subscription_paid: false,
  });

  if (profileError) {
    // Profile creation failed — clean up by deleting the auth user via admin.
    // We import admin here lazily to avoid the module-level guard at import time.
    const { supabaseAdmin } = await import("@/lib/supabase/admin");
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

    return {
      success: false,
      error: "Erreur lors de la creation du profil. Veuillez reessayer.",
    };
  }

  // Supabase Auth may require email confirmation (configured in Supabase dashboard).
  // If email confirmation is disabled, the user is already signed in after signUp.
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// signOut — sign out the current user
// ---------------------------------------------------------------------------
export async function signOut(): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: "Erreur lors de la deconnexion." };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

// ---------------------------------------------------------------------------
// forgotPassword — send a password reset OTP/link via WhatsApp number
// ---------------------------------------------------------------------------
export async function forgotPassword(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = { whatsapp: formData.get("whatsapp") };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const email = whatsappToEmail(parsed.data.whatsapp);

  // resetPasswordForEmail sends a magic link to the Supabase Auth email.
  // In our case the "email" is the WhatsApp-derived address @kwatiguigui.cf.
  // Since users don't have real email access, this flow should be adapted
  // to send an OTP via WhatsApp API (Phase 2). For now the reset link
  // is sent to the generated email address (for admin/dev use).
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  if (error) {
    // Do NOT reveal whether the account exists (security: no user enumeration).
    console.error("[forgotPassword] Supabase error:", error.message);
  }

  // Always return success to prevent user enumeration attacks.
  return {
    success: true,
    error: undefined,
  };
}

// ---------------------------------------------------------------------------
// resetPassword — set a new password after receiving the reset link
// ---------------------------------------------------------------------------
export async function resetPassword(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  // The token from the URL query param is exchanged for a session automatically
  // by the Supabase client when the user lands on the reset page.
  // updateUser() then updates the password within the active session.
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      error: "Lien de reinitialisation invalide ou expire. Veuillez recommencer.",
    };
  }

  redirect("/login?passwordReset=true");
}
