import type { Metadata } from "next";
import { Briefcase, CreditCard, Eye, MessageSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonCard } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

const DASHBOARD_STATS = [
  { label: "Annonces actives", value: "—", icon: Briefcase, color: "text-primary-500" },
  { label: "Vues totales", value: "—", icon: Eye, color: "text-secondary-500" },
  { label: "Messages recus", value: "—", icon: MessageSquare, color: "text-accent-500" },
  { label: "Abonnement", value: "Gratuit", icon: CreditCard, color: "text-neutral-500" },
] as const;

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Tableau de bord
      </h1>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-xl bg-neutral-50 p-3 dark:bg-neutral-800 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-body-xs text-neutral-500">{stat.label}</p>
                <p className="font-heading text-heading-md text-neutral-900 dark:text-neutral-100">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activite recente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-neutral-500">
            Aucune activite recente. Commencez par completer votre profil et
            publier votre premiere annonce.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
