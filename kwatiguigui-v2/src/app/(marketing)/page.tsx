import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
  description:
    "Trouvez un emploi ou recrutez en Republique Centrafricaine. Plus de 1 200 offres, 3 500 utilisateurs, 20 regions couvertes. Inscription gratuite.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeClient />;
}
