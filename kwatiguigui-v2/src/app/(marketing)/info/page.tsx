import type { Metadata } from "next";
import { BookOpen, GraduationCap, Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonCard } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Infos emploi",
  description:
    "Formations, stages et conseils pour l'emploi en Republique Centrafricaine.",
  alternates: { canonical: "/info" },
};

const CONTENT_TYPES = [
  { type: "formation", label: "Formations", icon: GraduationCap, color: "primary" as const },
  { type: "stage", label: "Stages", icon: BookOpen, color: "secondary" as const },
  { type: "conseil", label: "Conseils", icon: Lightbulb, color: "accent" as const },
] as const;

export default function InfoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
          Infos emploi
        </h1>
        <p className="mt-2 text-body-md text-neutral-500">
          Formations, stages et conseils pour vous accompagner dans votre
          recherche d'emploi.
        </p>
      </div>

      {/* Type filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Badge variant="primary" className="cursor-pointer">Tout</Badge>
        {CONTENT_TYPES.map((ct) => (
          <Badge key={ct.type} variant="outline" className="cursor-pointer">
            <ct.icon size={14} />
            {ct.label}
          </Badge>
        ))}
      </div>

      {/* Content grid — skeleton placeholder */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
