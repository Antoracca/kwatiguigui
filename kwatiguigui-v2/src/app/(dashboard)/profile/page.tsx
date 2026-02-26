import type { Metadata } from "next";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Mon profil",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  // TODO: Fetch profile data from API, populate form with React Hook Form + Zod

  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Mon profil
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Prenom" placeholder="Votre prenom" />
              <Input label="Age" type="number" placeholder="25" min={18} max={99} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Numero WhatsApp" type="tel" placeholder="+236 74 XX XX XX" />
              <Input label="Telephone" type="tel" placeholder="Optionnel" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Region" placeholder="Selectionner..." />
              <Input label="Ville" placeholder="Votre ville" />
              <Input label="Quartier" placeholder="Votre quartier" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Type d'emploi" placeholder="Selectionner..." />
              <Input label="Experience / Motivation" placeholder="Decrivez brievement..." />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                <Save size={18} />
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
