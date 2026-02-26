import type { Metadata } from "next";
import { Briefcase, MapPin, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkeletonCard } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Offres d'emploi",
  description:
    "Parcourez les offres d'emploi disponibles en Republique Centrafricaine. Filtrez par region, type d'emploi, et secteur d'activite.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Offres d'emploi | KWATIGUIGUI",
    description:
      "Parcourez les offres d'emploi disponibles en Republique Centrafricaine.",
  },
};

export default function JobListingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
          Offres d'emploi
        </h1>
        <p className="mt-2 text-body-md text-neutral-500">
          Trouvez l'emploi qui vous correspond dans toute la Republique
          Centrafricaine.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Rechercher un emploi..."
              leftIcon={<Search size={18} />}
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Region ou ville..."
              leftIcon={<MapPin size={18} />}
            />
          </div>
          <Button variant="primary" size="md">
            <Search size={18} />
            Rechercher
          </Button>
        </div>

        {/* Filter badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">Toutes les regions</Badge>
          <Badge variant="outline">Tous les types</Badge>
          <Badge variant="outline">Chercheurs & Employeurs</Badge>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-body-sm text-neutral-500">
          Chargement des offres...
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Grille
          </Button>
          <Button variant="ghost" size="sm">
            Liste
          </Button>
        </div>
      </div>

      {/* Skeleton placeholders — replaced with real data when API is connected */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
