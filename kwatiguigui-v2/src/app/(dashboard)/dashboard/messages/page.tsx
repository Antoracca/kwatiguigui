import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { MessagesClient } from "@/components/dashboard/messages-client";

export const metadata: Metadata = {
  title: "Messagerie — KWATIGUIGUI",
  robots: { index: false, follow: false },
};

export default async function MessagesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Fetch inbox (received messages) with sender name
  const { data: inbox } = await supabase
    .from("messages")
    .select(
      `id, from_user_id, to_user_id, subject, content, is_read, is_starred,
       is_archived, category, created_at,
       sender:profiles!from_user_id(first_name)`,
    )
    .eq("to_user_id", user.id)
    .eq("is_archived", false)
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch sent messages with recipient name
  const { data: sent } = await supabase
    .from("messages")
    .select(
      `id, from_user_id, to_user_id, subject, content, is_read, is_starred,
       is_archived, category, created_at,
       recipient:profiles!to_user_id(first_name)`,
    )
    .eq("from_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  // Starred messages (union of inbox + sent where is_starred)
  const { data: starred } = await supabase
    .from("messages")
    .select(
      `id, from_user_id, to_user_id, subject, content, is_read, is_starred,
       is_archived, category, created_at`,
    )
    .or(`to_user_id.eq.${user.id},from_user_id.eq.${user.id}`)
    .eq("is_starred", true)
    .order("created_at", { ascending: false })
    .limit(50);

  // Normalize sender/recipient names into flat objects
  const normalizeInbox = (inbox ?? []).map((m: Record<string, unknown>) => ({
    ...(m as {
      id: string;
      from_user_id: string;
      to_user_id: string;
      subject: string;
      content: string;
      is_read: boolean;
      is_starred: boolean;
      is_archived: boolean;
      category: string;
      created_at: string;
    }),
    sender_name: (m.sender as { first_name: string } | null)?.first_name ?? null,
    recipient_name: null,
  }));

  const normalizeSent = (sent ?? []).map((m: Record<string, unknown>) => ({
    ...(m as {
      id: string;
      from_user_id: string;
      to_user_id: string;
      subject: string;
      content: string;
      is_read: boolean;
      is_starred: boolean;
      is_archived: boolean;
      category: string;
      created_at: string;
    }),
    sender_name: null,
    recipient_name: (m.recipient as { first_name: string } | null)?.first_name ?? null,
  }));

  const normalizeStarred = (starred ?? []).map((m: Record<string, unknown>) => ({
    ...(m as {
      id: string;
      from_user_id: string;
      to_user_id: string;
      subject: string;
      content: string;
      is_read: boolean;
      is_starred: boolean;
      is_archived: boolean;
      category: string;
      created_at: string;
    }),
    sender_name: null,
    recipient_name: null,
  }));

  return (
    <div className="h-full">
      <MessagesClient
        userId={user.id}
        inboxMessages={normalizeInbox}
        sentMessages={normalizeSent}
        starredMessages={normalizeStarred}
      />
    </div>
  );
}
