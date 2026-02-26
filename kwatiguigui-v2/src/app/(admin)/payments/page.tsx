import type { Metadata } from "next";
import { CreditCard, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkeletonTableRow } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Gestion paiements",
  robots: { index: false, follow: false },
};

export default function AdminPaymentsPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Gestion des paiements
      </h1>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-body-xs text-neutral-500">Total ce mois</p>
            <p className="font-heading text-heading-md text-neutral-900 dark:text-neutral-100">
              -- FCFA
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-body-xs text-neutral-500">Transactions</p>
            <p className="font-heading text-heading-md text-neutral-900 dark:text-neutral-100">
              --
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-body-xs text-neutral-500">En attente</p>
            <p className="font-heading text-heading-md text-accent-500">--</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Historique des paiements</CardTitle>
            <div className="w-64">
              <Input placeholder="Rechercher par reference..." leftIcon={<Search size={16} />} />
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
