import type { Metadata } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { AdminUsersClient } from "@/components/admin/admin-users-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Utilisateurs — Admin KUSSALA",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    user_type?: string;
    subscription?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 20;

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  let query = supabaseAdmin
    .from("profiles")
    .select(
      "id, first_name, whatsapp, user_type, subscription_paid, is_active, created_at",
      { count: "exact" },
    );

  if (params.q) {
    query = query.or(
      `first_name.ilike.%${params.q}%,whatsapp.ilike.%${params.q}%`,
    );
  }
  if (params.user_type && ["seeker", "employer"].includes(params.user_type)) {
    query = query.eq("user_type", params.user_type as "seeker" | "employer");
  }
  if (params.subscription === "premium") {
    query = query.eq("subscription_paid", true);
  } else if (params.subscription === "free") {
    query = query.eq("subscription_paid", false);
  }
  const { data: users, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <AdminUsersClient
      users={users ?? []}
      totalUsers={count ?? 0}
      currentPage={page}
      totalPages={totalPages}
      filters={{
        q: params.q ?? "",
        user_type: params.user_type ?? "",
        subscription: params.subscription ?? "",
      }}
    />
  );
}
