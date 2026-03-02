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
    email: formData.get("email"),
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

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Normalize Supabase Auth error messages for French UI
    const message =
      error.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect."
        : error.message === "Email not confirmed"
          ? "Votre compte n'a pas encore ete confirme."
          : "Une erreur est survenue. Veuillez reessayer.";

    return { success: false, error: message };
  }

  revalidatePath("/dashboard", "layout");
  return { success: true };
}

// ---------------------------------------------------------------------------
// signUp — register a new user
// ---------------------------------------------------------------------------
export async function signUp(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {

  // ── STEP 0: Log raw FormData ─────────────────────────────────────────────
  const rawEntries: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "password" && key !== "confirmPassword") {
      rawEntries[key] = String(value);
    } else {
      rawEntries[key] = "[hidden]";
    }
  }
  console.log("━━━━━━━━━━━━━━━ [signUp] RAW FORMDATA ━━━━━━━━━━━━━━━");
  console.log(JSON.stringify(rawEntries, null, 2));

  // ── STEP 1: Build raw object ─────────────────────────────────────────────
  const phoneRaw = (formData.get("phone") as string | null) || "";
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const phone = phoneDigits.length >= 7 ? phoneRaw : undefined;

  const companyName = (formData.get("companyName") as string | null)?.trim();
  let neighborhood = (formData.get("neighborhood") as string | null)?.trim() || undefined;

  if (companyName) {
    neighborhood = neighborhood ? `${neighborhood} (${companyName})` : companyName;
  }

  const raw = {
    userType: formData.get("userType"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName") || undefined,
    username: formData.get("username"),
    dateOfBirth: formData.get("dateOfBirth") || undefined,
    email: formData.get("email"),
    phone,
    city: formData.get("city"),
    neighborhood,
    companyName,
    jobType: formData.get("jobType") || undefined,
    experience: formData.get("experience") || undefined,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  console.log("━━━━━━━━━━━━━━━ [signUp] PARSED RAW ━━━━━━━━━━━━━━━");
  console.log({ ...raw, password: "[hidden]", confirmPassword: "[hidden]" });

  // ── STEP 2: Zod validation ───────────────────────────────────────────────
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error("━━━━━━━━━━━━━━━ [signUp] ZOD ERRORS ━━━━━━━━━━━━━━━");
    console.error(JSON.stringify(errors, null, 2));
    return {
      success: false,
      fieldErrors: errors,
      error: "❌ Validation échouée : " + Object.entries(errors).map(([k, v]) => `${k}: ${v?.[0]}`).join(" | "),
    };
  }

  console.log("✅ [signUp] Zod validation passed");
  console.log({ ...parsed.data, password: "[hidden]" });

  const supabase = await createClient();

  // ── STEP 3: Supabase Auth signup ─────────────────────────────────────────
  console.log("━━━━━━━━━━━ [signUp] Calling supabase.auth.signUp... ━━━━━━━━━━━");
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        user_type: parsed.data.userType,
        first_name: parsed.data.firstName,
      },
    },
  });

  if (authError) {
    console.error("❌ [signUp] Auth error:", authError.message, authError.status, authError.code);
    let message: string;
    if (authError.status === 429 || authError.message.toLowerCase().includes("rate limit") || authError.message.toLowerCase().includes("over_email_send_rate_limit")) {
      message = "Trop de tentatives d'inscription. Veuillez patienter quelques minutes avant de réessayer, ou utilisez une adresse e-mail différente.";
    } else if (authError.message.includes("already registered") || authError.message.includes("User already registered")) {
      message = "Cette adresse e-mail est déjà utilisée. Voulez-vous vous connecter ?";
    } else {
      message = `Erreur auth: ${authError.message}`;
    }
    return { success: false, error: message };
  }

  if (!authData.user) {
    console.error("❌ [signUp] No user returned from auth.signUp");
    return { success: false, error: "Erreur inattendue (pas d'utilisateur retourné). Réessayez." };
  }

  console.log("✅ [signUp] Auth user created:", authData.user.id);

  // ── STEP 4: Profile insert ───────────────────────────────────────────────
  // DB constraints (from database.ts Insert type):
  //   last_name: string         (NOT NULL — use empty string if missing)
  //   job_type: string          (NOT NULL — required)
  //   experience: enum | null   (nullable)
  //   username: string | null   (nullable)
  const profilePayload = {
    id: authData.user.id,
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName || "",
    username: parsed.data.username || null,
    date_of_birth: parsed.data.dateOfBirth || null,
    whatsapp: parsed.data.email,
    phone: parsed.data.phone || null,
    city: parsed.data.city,
    neighborhood: parsed.data.neighborhood || "",
    job_type: parsed.data.jobType || "",             // DB: string NOT NULL — required
    experience: parsed.data.userType === "employer" ? "none" : (parsed.data.experience || "none") as "none" | "1+" | "3+" | "5+" | "10+" | "15+" | "20+" | "other",
    user_type: parsed.data.userType,
    is_active: true,
    subscription_paid: false,
  };

  console.log("━━━━━━━━━━━ [signUp] Inserting profile... ━━━━━━━━━━━");
  console.log(JSON.stringify(profilePayload, null, 2));

  const { error: profileError } = await supabase.from("profiles").insert(profilePayload);

  if (profileError) {
    console.error("❌ [signUp] Profile insert FAILED:");
    console.error("  message:", profileError.message);
    console.error("  details:", profileError.details);
    console.error("  hint:   ", profileError.hint);
    console.error("  code:   ", profileError.code);

    const { supabaseAdmin } = await import("@/lib/supabase/admin");
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    console.log("🗑️  [signUp] Auth user rolled back:", authData.user.id);

    return {
      success: false,
      error: `❌ Erreur DB: ${profileError.message}${profileError.hint ? ` (${profileError.hint})` : ""}`,
    };
  }

  console.log("✅ [signUp] Profile inserted successfully! Redirecting...");

  // Supabase Auth may require email confirmation (configured in Supabase dashboard).
  // If email confirmation is disabled, the user is already signed in after signUp.
  revalidatePath("/dashboard", "layout");
  return { success: true };
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
  const raw = { email: formData.get("email") };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
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
