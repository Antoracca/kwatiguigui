import type { Metadata } from "next";
import { Briefcase, CreditCard, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

const ADMIN_STATS = [
  { label: "Utilisateurs", value: "—", icon: Users, trend: "+0%" },
  { label: "Annonces actives", value: "—", icon: Briefcase, trend: "+0%" },
  { label: "Revenus (mois)", value: "— FCFA", icon: CreditCard, trend: "+0%" },
  { label: "Taux conversion", value: "—%", icon: TrendingUp, trend: "+0%" },
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Dashboard Administration
      </h1>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <stat.icon size={20} className="text-primary-500" />
                <span className="text-body-xs text-secondary-500 font-medium">
                  {stat.trend}
                </span>
              </div>
              <p className="mt-4 font-heading text-heading-lg text-neutral-900 dark:text-neutral-100">
                {stat.value}
              </p>
              <p className="text-body-sm text-neutral-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inscriptions (30 derniers jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-lg bg-neutral-50 text-body-sm text-neutral-400 dark:bg-neutral-800">
              Graphique a implementer
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenus (30 derniers jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-lg bg-neutral-50 text-body-sm text-neutral-400 dark:bg-neutral-800">
              Graphique a implementer
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
