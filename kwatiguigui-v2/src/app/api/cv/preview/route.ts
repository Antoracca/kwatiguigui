import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/cv/preview
 *
 * Authenticated proxy that downloads the user's CV from the private
 * Supabase Storage bucket and returns it inline so the browser can
 * render it in an <iframe>.
 *
 * Why a proxy?  Supabase Storage sends X-Frame-Options: DENY on signed
 * URL responses.  That header tells the browser "do not embed this
 * resource in an iframe", so the PDF viewer is blocked.  By proxying
 * the file through our own Next.js route we control the response headers
 * and can omit X-Frame-Options entirely.
 *
 * Security:
 *  - The user must be authenticated (Supabase Auth cookie).
 *  - We only serve the cv_path stored on the user's own profile row.
 *  - Storage RLS additionally enforces per-user folder access.
 */
export async function GET() {
  const supabase = await createClient();

  // 1. Authenticate
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  // 2. Fetch cv_path from the user's profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("cv_path, cv_filename")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.cv_path) {
    return new NextResponse("Aucun CV trouvé", { status: 404 });
  }

  // 3. Download from private bucket (RLS applies — user can only access their own folder)
  const { data: fileData, error: storageError } = await supabase.storage
    .from("cvs")
    .download(profile.cv_path);

  if (storageError || !fileData) {
    return new NextResponse("Erreur lors du téléchargement du CV", { status: 500 });
  }

  // 4. Return the file inline — no X-Frame-Options so the iframe can embed it
  const isPdf = profile.cv_path.endsWith(".pdf");
  const contentType = isPdf
    ? "application/pdf"
    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const arrayBuffer = await fileData.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      // Inline display (not a download trigger)
      "Content-Disposition": `inline; filename="${profile.cv_filename ?? "cv.pdf"}"`,
      // Allow this response to be embedded in an iframe on the same origin.
      // next.config.ts applies X-Frame-Options: DENY globally via source "/(.*)"
      // but Next.js processes route-specific headers AFTER the catch-all, so
      // we override it here by setting SAMEORIGIN instead.
      "X-Frame-Options": "SAMEORIGIN",
      // Short cache — signed URLs expire anyway; this is a proxy
      "Cache-Control": "private, max-age=300",
    },
  });
}
