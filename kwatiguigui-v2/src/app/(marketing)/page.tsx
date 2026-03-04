import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
  description:
    "Trouvez un emploi ou recrutez en Republique Centrafricaine. Plus de 1 200 offres, 3 500 utilisateurs, 20 regions couvertes. Inscription gratuite.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userType = null;
  if (user) {
    const { data: dbUser } = await supabase
      .from("users")
      .select("user_type")
      .eq("id", user.id)
      .single();
    if (dbUser) {
      userType = (dbUser as any).user_type;
    }
  }

  return <HomeClient isLoggedIn={!!user} userType={userType} />;
}
