import type { Metadata } from "next";
import { Search, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkeletonTableRow } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Gestion utilisateurs",
  robots: { index: false, follow: false },
};

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Gestion des utilisateurs
        </h1>
        <Button variant="primary" size="sm">
          <UserPlus size={16} /> Ajouter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Liste des utilisateurs</CardTitle>
            <div className="w-64">
              <Input placeholder="Rechercher..." leftIcon={<Search size={16} />} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table header */}
          <div className="mb-2 flex items-center gap-4 border-b border-neutral-200 px-4 py-3 text-body-xs font-semibold text-neutral-500 dark:border-neutral-700">
            <span className="w-8" />
            <span className="flex-1">Nom</span>
            <span className="w-32">Region</span>
            <span className="w-24">Type</span>
            <span className="w-24">Statut</span>
            <span className="w-20">Actions</span>
          </div>
          {/* Skeleton rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
