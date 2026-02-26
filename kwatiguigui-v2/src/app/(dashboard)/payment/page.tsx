import type { Metadata } from "next";
import { CheckCircle2, CreditCard, Crown, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRICING_PLANS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Abonnement Premium",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <div>
      <h1 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
        Abonnement
      </h1>

      {/* Current plan */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard size={20} />
            Votre abonnement actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant="default">Gratuit</Badge>
            <span className="text-body-sm text-neutral-500">
              Fonctionnalites limitees
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade to Premium */}
      <Card featured className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown size={20} className="text-accent-500" />
            Passer a Premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Monthly */}
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
              <p className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Mensuel
              </p>
              <p className="mt-2 font-heading text-heading-lg text-primary-500">
                {formatPrice(2500)}
              </p>
              <p className="text-body-xs text-neutral-500">par mois</p>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Choisir
              </Button>
            </div>

            {/* 6 months */}
            <div className="rounded-xl border-2 border-primary-500 p-4 ring-1 ring-primary-100 dark:ring-primary-900">
              <div className="flex items-center justify-between">
                <p className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  6 mois
                </p>
                <Badge variant="premium">-17%</Badge>
              </div>
              <p className="mt-2 font-heading text-heading-lg text-primary-500">
                {formatPrice(12500)}
              </p>
              <p className="text-body-xs text-neutral-500">soit ~2 083 FCFA/mois</p>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Choisir
              </Button>
            </div>

            {/* Annual */}
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <p className="font-heading text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Annuel
                </p>
                <Badge variant="premium">-17%</Badge>
              </div>
              <p className="mt-2 font-heading text-heading-lg text-primary-500">
                {formatPrice(25000)}
              </p>
              <p className="text-body-xs text-neutral-500">soit ~2 083 FCFA/mois</p>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Choisir
              </Button>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-8">
            <p className="mb-4 font-heading text-body-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Methodes de paiement
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" size="md" className="flex-1">
                <Phone size={18} />
                Orange Money — 74 14 34 34
              </Button>
              <Button variant="outline" size="md" className="flex-1">
                <Phone size={18} />
                Telecel Money — 76 16 90 90
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-neutral-500">
            Aucun paiement effectue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
