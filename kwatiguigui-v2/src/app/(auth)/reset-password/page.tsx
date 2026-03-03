import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nouveau mot de passe",
  robots: { index: false, follow: false },
};

/**
 * /reset-password
 *
 * Page for setting a new password after receiving a reset link.
 * Supabase Auth handles the token exchange automatically via the URL hash
 * (#access_token=...) when the user lands on this page.
 * The ResetPasswordForm then calls supabase.auth.updateUser({ password })
 * within the active session.
 */
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
