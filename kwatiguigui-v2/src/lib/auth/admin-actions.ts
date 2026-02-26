"use server";

import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import speakeasy from "speakeasy";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { adminLoginSchema } from "@/lib/validations/auth";

import type { ActionResult } from "./actions";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const ADMIN_SESSION_COOKIE = "kwt-admin-session";
const ADMIN_SESSION_DURATION = 8 * 60 * 60; // 8 hours in seconds
const ADMIN_JWT_EXPIRY = "8h";

// ---------------------------------------------------------------------------
// Admin JWT payload type
// ---------------------------------------------------------------------------
interface AdminJwtPayload {
  sub: string; // admin_users.id
  email: string;
  role: "superadmin" | "moderator";
  iat: number;
  exp: number;
}

// ---------------------------------------------------------------------------
// adminLogin — authenticate admin with email + password + TOTP
// ---------------------------------------------------------------------------
export async function adminLogin(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    totpCode: formData.get("totpCode"),
  };

  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Step 1: Look up admin user by email (bypass RLS with admin client)
  const { data: admin, error: dbError } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, password_hash, role, totp_secret, mfa_enabled, is_active")
    .eq("email", parsed.data.email)
    .single();

  if (dbError || !admin) {
    // Use a consistent error message to prevent email enumeration
    return {
      success: false,
      error: "Identifiants invalides ou compte inactif.",
    };
  }

  if (!admin.is_active) {
    return {
      success: false,
      error: "Identifiants invalides ou compte inactif.",
    };
  }

  // Step 2: Verify password with argon2
  let passwordValid = false;
  try {
    passwordValid = await argon2.verify(admin.password_hash, parsed.data.password);
  } catch {
    return {
      success: false,
      error: "Erreur lors de la verification du mot de passe. Reessayez.",
    };
  }

  if (!passwordValid) {
    return {
      success: false,
      error: "Identifiants invalides ou compte inactif.",
    };
  }

  // Step 3: Verify TOTP code with speakeasy
  if (admin.mfa_enabled && admin.totp_secret) {
    const totpValid = speakeasy.totp.verify({
      secret: admin.totp_secret,
      encoding: "base32",
      token: parsed.data.totpCode,
      window: 1, // Allow 1 step tolerance (30s before/after)
    });

    if (!totpValid) {
      return {
        success: false,
        error: "Code d'authentification (TOTP) invalide ou expire.",
      };
    }
  }

  // Step 4: Sign a custom JWT with the ADMIN_JWT_SECRET
  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!jwtSecret) {
    throw new Error(
      "ADMIN_JWT_SECRET is not configured. Set it in .env.local.",
    );
  }

  const token = jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    } satisfies Omit<AdminJwtPayload, "iat" | "exp">,
    jwtSecret,
    { expiresIn: ADMIN_JWT_EXPIRY },
  );

  // Step 5: Set httpOnly session cookie
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ADMIN_SESSION_DURATION,
    path: "/admin",
  });

  // Step 6: Update last_login_at
  await supabaseAdmin
    .from("admin_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", admin.id);

  redirect("/admin");
}

// ---------------------------------------------------------------------------
// adminLogout — clear the admin session cookie
// ---------------------------------------------------------------------------
export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// verifyAdminSession — validate the admin JWT from the cookie
// Called from Server Components / API routes in the /admin segment.
// ---------------------------------------------------------------------------
export async function verifyAdminSession(): Promise<AdminJwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return null;

  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!jwtSecret) return null;

  try {
    const payload = jwt.verify(token, jwtSecret) as AdminJwtPayload;
    return payload;
  } catch {
    // Token expired or invalid
    return null;
  }
}

// ---------------------------------------------------------------------------
// setupAdminTotp — generate a TOTP secret for a new admin (one-time setup)
// Returns the secret and a QR code data URL for scanning with an authenticator app.
// ---------------------------------------------------------------------------
export async function setupAdminTotp(
  adminId: string,
): Promise<{ secret: string; otpauthUrl: string; qrDataUrl: string }> {
  const secret = speakeasy.generateSecret({
    name: "KWATIGUIGUI Admin",
    length: 20,
  });

  if (!secret.base32 || !secret.otpauth_url) {
    throw new Error("Erreur lors de la generation du secret TOTP.");
  }

  // Store the base32 secret in the admin_users table
  await supabaseAdmin
    .from("admin_users")
    .update({
      totp_secret: secret.base32,
      mfa_enabled: true,
    })
    .eq("id", adminId);

  // Generate QR code data URL
  const qrcode = await import("qrcode");
  const qrDataUrl = await qrcode.toDataURL(secret.otpauth_url);

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
    qrDataUrl,
  };
}
