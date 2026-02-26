import type { Metadata } from "next";
import { Bell, Lock, Moon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Parametres",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Parametres
      </h1>

      <div className="space-y-6">
        {/* Change password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={18} />
              Changer le mot de passe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="max-w-md space-y-4">
              <Input label="Mot de passe actuel" type="password" />
              <Input label="Nouveau mot de passe" type="password" helperText="Minimum 8 caracteres, 1 majuscule, 1 chiffre" />
              <Input label="Confirmer le nouveau mot de passe" type="password" />
              <Button type="submit" variant="primary" size="sm">
                Mettre a jour
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-neutral-500">
              Parametres de notification bientot disponibles.
            </p>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-error-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-error-500">
              <Trash2 size={18} />
              Zone de danger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-body-sm text-neutral-500">
              La suppression de votre compte est irreversible. Toutes vos
              donnees, annonces et messages seront definitivement perdus.
            </p>
            <Button variant="destructive" size="sm">
              Supprimer mon compte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
