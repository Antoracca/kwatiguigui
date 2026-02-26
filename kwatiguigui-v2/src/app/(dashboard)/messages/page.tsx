import type { Metadata } from "next";
import { Inbox, Send, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Messagerie",
  robots: { index: false, follow: false },
};

export default function MessagesPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Messagerie
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <Badge variant="primary" className="cursor-pointer">
          <Inbox size={14} /> Recus
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          <Send size={14} /> Envoyes
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          <Star size={14} /> Favoris
        </Badge>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Inbox size={48} className="mx-auto mb-4 text-neutral-300" />
          <p className="text-body-md text-neutral-500">
            Aucun message pour le moment.
          </p>
          <p className="mt-2 text-body-sm text-neutral-400">
            Les messages des employeurs et chercheurs d'emploi apparaitront ici.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
