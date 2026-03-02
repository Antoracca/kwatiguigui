import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * GET /api/cv/public/[userId]
 *
 * Employer-accessible CV endpoint.
 * Conditions:
 *   1. Requester must be authenticated (any account type).
 *   2. Target profile must have cv_public = true AND cv_path set.
 *
 * The file is served inline so browsers can display it directly.
 * supabaseAdmin is used to download from the private 'cvs' bucket
 * because RLS only allows the file owner to access their folder.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  // 1. Authenticate the requester
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse("Non autorisé — connexion requise.", { status: 401 });
  }

  // 2. Read the target profile — check cv_public and cv_path
  //    Use admin client so we can read any profile regardless of RLS.
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("cv_path, cv_filename, cv_public, user_type")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    return new NextResponse("Profil introuvable.", { status: 404 });
  }

  if (!profile.cv_public) {
    return new NextResponse(
      "Ce candidat n'a pas autorisé le partage de son CV.",
      { status: 403 },
    );
  }

  if (!profile.cv_path) {
    return new NextResponse("Aucun CV disponible pour ce profil.", { status: 404 });
  }

  // 3. Download from private bucket using admin client (bypasses RLS)
  const { data: fileData, error: storageError } = await supabaseAdmin.storage
    .from("cvs")
    .download(profile.cv_path);

  if (storageError || !fileData) {
    return new NextResponse("Erreur lors du téléchargement du CV.", { status: 500 });
  }

  // 4. Return inline with SAMEORIGIN so the browser can embed it
  const isPdf = profile.cv_path.endsWith(".pdf");
  const contentType = isPdf
    ? "application/pdf"
    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const arrayBuffer = await fileData.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${profile.cv_filename ?? "cv.pdf"}"`,
      "X-Frame-Options": "SAMEORIGIN",
      // Short cache — CV can be updated/revoked at any time
      "Cache-Control": "private, no-store",
    },
  });
}
