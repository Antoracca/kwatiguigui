import type { Metadata } from "next";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkeletonTableRow } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gestion contenu",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Gestion du contenu
        </h1>
        <Button variant="primary" size="sm">
          <Plus size={16} /> Nouveau contenu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Formations, stages, conseils</CardTitle>
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
