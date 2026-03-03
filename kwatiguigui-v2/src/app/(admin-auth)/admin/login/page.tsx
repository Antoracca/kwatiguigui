import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

// Prevent static prerendering: this page uses client hooks via AdminLoginForm
// and is robots:noindex — no benefit from static generation.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
      {/* Background pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 font-heading text-2xl font-bold text-white shadow-lg shadow-primary-500/30">
            K
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            KWATIGUIGUI
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Administration</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
          <h2 className="mb-6 font-heading text-xl font-semibold text-white">
            Connexion administrateur
          </h2>
          <AdminLoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-neutral-600">
          Acces reserve au personnel KWATIGUIGUI. Toutes les tentatives de connexion sont enregistrees.
        </p>
      </div>
    </div>
  );
}
