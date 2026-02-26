import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { SkeletonCard } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Actualites, conseils et ressources pour l'emploi en Republique Centrafricaine.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="accent" className="mb-4">Bientot disponible</Badge>
        <h1 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
          Blog
        </h1>
        <p className="mt-2 text-body-md text-neutral-500">
          Articles, actualites et ressources pour l'emploi en Republique
          Centrafricaine.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
