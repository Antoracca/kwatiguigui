import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mes annonces",
  robots: { index: false, follow: false },
};

export default function MyJobsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Mes annonces
        </h1>
        <Button variant="primary" size="sm">
          <Plus size={16} />
          Nouvelle annonce
        </Button>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-body-md text-neutral-500">
            Vous n'avez pas encore publie d'annonce.
          </p>
          <p className="mt-2 text-body-sm text-neutral-400">
            Creez votre premiere annonce pour etre visible par les employeurs
            et chercheurs d'emploi.
          </p>
          <Button variant="primary" size="md" className="mt-6">
            <Plus size={18} />
            Publier une annonce
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
