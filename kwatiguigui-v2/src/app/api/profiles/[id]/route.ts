import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { maskWhatsApp } from "@/lib/utils";

/**
 * GET /api/profiles/[id]
 *
 * Returns a public profile.
 * Security:
 *   - WhatsApp number is only returned if the requesting user has subscription_paid=true
 *   - For unauthenticated requests or free users, whatsapp is masked (e.g. "+236 74 **, ** **")
 *   - The `id` parameter is validated to be a valid UUID format to prevent injection
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Validate UUID format
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json(
      { error: "Identifiant de profil invalide" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  // Fetch the target profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, first_name, last_name, date_of_birth, whatsapp, city, neighborhood, job_type, experience, user_type, is_active, subscription_paid, created_at",
    )
    .eq("id", id)
    .eq("is_active", true) // Only return active profiles
    .single();

  if (error || !profile) {
    return NextResponse.json(
      { error: "Profil introuvable" },
      { status: 404 },
    );
  }

  // Check whether the requesting user is premium
  let requesterIsPremium = false;

  const {
    data: { user: requestingUser },
  } = await supabase.auth.getUser();

  if (requestingUser) {
    // Viewing own profile — always show full details
    if (requestingUser.id === id) {
      requesterIsPremium = true;
    } else {
      // Check the requesting user's subscription status
      const { data: requesterProfile } = await supabase
        .from("profiles")
        .select("subscription_paid, expiry_date")
        .eq("id", requestingUser.id)
        .single();

      if (requesterProfile?.subscription_paid && requesterProfile.expiry_date) {
        const expiry = new Date(requesterProfile.expiry_date);
        requesterIsPremium = expiry > new Date();
      }
    }
  }

  // Build the public response — mask WhatsApp if viewer is not premium
  const publicProfile = {
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    dateOfBirth: profile.date_of_birth,
    // Only premium viewers (or the profile owner) see the real WhatsApp number
    whatsapp: requesterIsPremium ? profile.whatsapp : maskWhatsApp(profile.whatsapp ?? ""),
    city: profile.city,
    neighborhood: profile.neighborhood,
    jobType: profile.job_type,
    experience: profile.experience,
    userType: profile.user_type,
    subscriptionPaid: profile.subscription_paid,
    createdAt: profile.created_at,
    // Expose whether contact details are visible for UI rendering decisions
    contactVisible: requesterIsPremium,
  };

  return NextResponse.json(publicProfile, {
    headers: {
      // Cache for 60 seconds at the edge (public profile data changes infrequently)
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  });
}
