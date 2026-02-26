import type { Metadata } from "next";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkeletonTableRow } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Gestion annonces",
  robots: { index: false, follow: false },
};

export default function AdminJobsPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Gestion des annonces
      </h1>

      {/* Moderation filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="primary" className="cursor-pointer">Toutes</Badge>
        <Badge variant="outline" className="cursor-pointer">En attente</Badge>
        <Badge variant="outline" className="cursor-pointer">Publiees</Badge>
        <Badge variant="outline" className="cursor-pointer">Rejetees</Badge>
        <Badge variant="outline" className="cursor-pointer">Brouillons</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Annonces</CardTitle>
            <div className="w-64">
              <Input placeholder="Rechercher..." leftIcon={<Search size={16} />} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
