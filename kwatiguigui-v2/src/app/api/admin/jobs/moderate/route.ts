import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin-actions";

const moderateSchema = z.object({
  jobId: z.string().uuid(),
  action: z.enum(["publish", "reject", "delete"]),
});

export async function POST(req: NextRequest) {
  // Verify admin session
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requete invalide" }, { status: 400 });
  }

  const parsed = moderateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Parametres invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { jobId, action } = parsed.data;

  if (action === "delete") {
    const { error } = await supabaseAdmin.from("jobs").delete().eq("id", jobId);
    if (error) {
      return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
    return NextResponse.json({ success: true, action: "deleted" });
  }

  const newStatus = action === "publish" ? "published" : "rejected";
  const { error } = await supabaseAdmin
    .from("jobs")
    .update({ publication_status: newStatus })
    .eq("id", jobId);

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise a jour" }, { status: 500 });
  }

  return NextResponse.json({ success: true, action, newStatus });
}
