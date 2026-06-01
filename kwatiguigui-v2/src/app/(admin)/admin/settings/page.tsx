import type { Metadata } from "next";
import { Save, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parametres admin",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Parametres de la plateforme
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={18} />
              Configuration generale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="max-w-lg space-y-4">
              <Input label="Nom de la plateforme" defaultValue="KUSSALA" />
              <Input label="Email de support" defaultValue="support@kussala.org" />
              <Input label="WhatsApp support" defaultValue="+236 74 14 34 34" />
              <Input label="Prix Premium mensuel (FCFA)" type="number" defaultValue="2500" />
              <Input label="Duree annonce (jours)" type="number" defaultValue="30" />
              <Input label="Limite annonces gratuites" type="number" defaultValue="5" />
              <Button type="submit" variant="primary" size="sm">
                <Save size={16} />
                Enregistrer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
