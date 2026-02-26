"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

import type { ActionResult } from "@/lib/auth/actions";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------
const sendMessageSchema = z.object({
  to_user_id: z.string().uuid("Destinataire invalide"),
  subject: z.string().min(1, "Le sujet est requis").max(200),
  content: z
    .string()
    .min(1, "Le message ne peut pas etre vide")
    .max(2000, "Le message ne peut pas depasser 2000 caracteres"),
  category: z
    .enum(["job_inquiry", "job_offer", "general"])
    .default("general"),
});

// ---------------------------------------------------------------------------
// sendMessage
// ---------------------------------------------------------------------------
export async function sendMessage(
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

  // Premium check for unlimited messages
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_paid, expiry_date")
    .eq("id", user.id)
    .single();

  const isPremium =
    profile?.subscription_paid &&
    profile?.expiry_date &&
    new Date(profile.expiry_date) > new Date();

  if (!isPremium) {
    // Count messages sent today for free users
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("from_user_id", user.id)
      .gte("created_at", todayStart.toISOString());

    if ((count ?? 0) >= 3) {
      return {
        success: false,
        error: "Limite de 3 messages par jour atteinte. Passez a Premium pour des messages illimites.",
      };
    }
  }

  const raw = {
    to_user_id: formData.get("to_user_id"),
    subject: formData.get("subject"),
    content: formData.get("content"),
    category: formData.get("category") || "general",
  };

  const parsed = sendMessageSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error: insertError } = await supabase.from("messages").insert({
    from_user_id: user.id,
    to_user_id: parsed.data.to_user_id,
    subject: parsed.data.subject,
    content: parsed.data.content,
    category: parsed.data.category,
    is_read: false,
    is_starred: false,
    is_archived: false,
  });

  if (insertError) {
    return { success: false, error: "Erreur lors de l'envoi du message." };
  }

  revalidatePath("/dashboard/messages");
  return { success: true };
}

// ---------------------------------------------------------------------------
// markMessageRead
// ---------------------------------------------------------------------------
export async function markMessageRead(messageId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", messageId)
    .eq("to_user_id", user.id);

  if (error) {
    return { success: false, error: "Erreur." };
  }

  revalidatePath("/dashboard/messages");
  return { success: true };
}

// ---------------------------------------------------------------------------
// toggleMessageStar
// ---------------------------------------------------------------------------
export async function toggleMessageStar(
  messageId: string,
  isStarred: boolean,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  const { error } = await supabase
    .from("messages")
    .update({ is_starred: !isStarred })
    .eq("id", messageId)
    .or(`to_user_id.eq.${user.id},from_user_id.eq.${user.id}`);

  if (error) {
    return { success: false, error: "Erreur." };
  }

  revalidatePath("/dashboard/messages");
  return { success: true };
}

// ---------------------------------------------------------------------------
// deleteMessage
// ---------------------------------------------------------------------------
export async function deleteMessage(messageId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Non authentifie." };
  }

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .or(`to_user_id.eq.${user.id},from_user_id.eq.${user.id}`);

  if (error) {
    return { success: false, error: "Erreur lors de la suppression." };
  }

  revalidatePath("/dashboard/messages");
  return { success: true };
}
