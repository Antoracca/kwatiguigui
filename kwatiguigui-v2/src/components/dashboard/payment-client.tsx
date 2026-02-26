"use client";

import { useState, useEffect, useRef } from "react";
import {
  Crown,
  CheckCircle,
  Phone,
  Loader2,
  AlertCircle,
  Clock,
  ReceiptText,
} from "lucide-react";

import { formatPrice, formatDate } from "@/lib/utils";
import { PRICING } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaymentHistory {
  id: string;
  amount: number;
  method: string;
  status: string;
  reference: string;
  created_at: string;
}

interface PaymentClientProps {
  userId: string;
  isPremium: boolean;
  expiryDate: string | null;
  whatsapp: string | null;
  paymentHistory: PaymentHistory[];
}

const PLANS = [
  {
    id: "monthly" as const,
    label: "Mensuel",
    amount: PRICING.PREMIUM_MONTHLY,
    months: 1,
    badge: null,
    savings: null,
    perMonth: PRICING.PREMIUM_MONTHLY,
  },
  {
    id: "biannual" as const,
    label: "6 mois",
    amount: PRICING.PREMIUM_BIANNUAL,
    months: 6,
    badge: "Economisez 17%",
    savings: 17,
    perMonth: Math.round(PRICING.PREMIUM_BIANNUAL / 6),
  },
  {
    id: "annual" as const,
    label: "Annuel",
    amount: PRICING.PREMIUM_ANNUAL,
    months: 12,
    badge: "Economisez 33%",
    savings: 33,
    perMonth: Math.round(PRICING.PREMIUM_ANNUAL / 12),
  },
] as const;

type PlanId = (typeof PLANS)[number]["id"];
type Method = "orange" | "telecel";

const STATUS_COLORS: Record<string, string> = {
  completed: "text-secondary-600 dark:text-secondary-400",
  pending: "text-warning-600 dark:text-warning-400",
  failed: "text-error-600 dark:text-error-400",
};

export function PaymentClient({
  userId,
  isPremium,
  expiryDate,
  whatsapp,
  paymentHistory,
}: PaymentClientProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("monthly");
  const [selectedMethod, setSelectedMethod] = useState<Method>("orange");
  const [phone, setPhone] = useState(
    whatsapp?.replace(/\D/g, "").replace(/^236/, "") ?? "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pollingRef, setPollingRef] = useState<string | null>(null);
  const [pollingStatus, setPollingStatus] = useState<"pending" | "completed" | "failed" | null>(null);
  const [pollingProgress, setPollingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  // Polling logic
  useEffect(() => {
    if (!pollingRef || pollingStatus === "completed" || pollingStatus === "failed") {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      return;
    }

    let progress = 0;
    pollIntervalRef.current = setInterval(async () => {
      progress = Math.min(progress + 3, 90);
      setPollingProgress(progress);

      try {
        const res = await fetch(
          `/api/payments/status?reference=${pollingRef}`,
        );
        const data = await res.json() as { status: string };
        if (data.status === "completed") {
          setPollingStatus("completed");
          setPollingProgress(100);
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        } else if (data.status === "failed") {
          setPollingStatus("failed");
          setPollingProgress(0);
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        }
      } catch {
        // Network error — continue polling
      }
    }, 3000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [pollingRef, pollingStatus]);

  async function handleInitiatePayment() {
    setError(null);
    setIsSubmitting(true);
    setPollingStatus(null);
    setPollingProgress(0);

    try {
      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          plan: selectedPlan,
          method: selectedMethod,
          phoneNumber: phone,
          amount: plan.amount,
        }),
      });

      const data = await res.json() as { reference?: string; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? "Erreur lors de l'initiation du paiement.");
        setIsSubmitting(false);
        return;
      }

      if (data.reference) {
        setPollingRef(data.reference);
        setPollingStatus("pending");
      }
    } catch {
      setError("Erreur reseau. Verifiez votre connexion et reessayez.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const expiresAt = expiryDate ? new Date(expiryDate) : null;
  const daysLeft = expiresAt
    ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="max-w-3xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Abonnement Premium
        </h1>
        <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
          Debloquez toutes les fonctionnalites de KWATIGUIGUI
        </p>
      </div>

      {/* Current subscription */}
      <div
        className={[
          "rounded-2xl border p-5",
          isPremium
            ? "border-accent-200 bg-accent-50 dark:border-accent-800 dark:bg-accent-950/30"
            : "border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Crown
              className={[
                "h-6 w-6",
                isPremium
                  ? "text-accent-500"
                  : "text-neutral-400",
              ].join(" ")}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-fluid-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Abonnement actuel
                </span>
                {isPremium ? (
                  <Badge variant="accent" className="text-xs">
                    PREMIUM ACTIF
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    GRATUIT
                  </Badge>
                )}
              </div>
              {isPremium && expiresAt && (
                <p className="mt-0.5 text-fluid-sm text-neutral-600 dark:text-neutral-400">
                  Expire le {formatDate(expiresAt)}
                  {daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && (
                    <span className="ml-1 font-medium text-warning-600 dark:text-warning-400">
                      (dans {daysLeft} jour{daysLeft > 1 ? "s" : ""})
                    </span>
                  )}
                </p>
              )}
              {!isPremium && (
                <p className="mt-0.5 text-fluid-sm text-neutral-500">
                  5 annonces max, pas de contact WhatsApp direct
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Polling feedback */}
      {pollingStatus === "pending" && (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5 dark:border-primary-800 dark:bg-primary-950/30">
          <div className="mb-3 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
            <p className="font-heading text-fluid-sm font-semibold text-primary-700 dark:text-primary-300">
              Verification du paiement en cours...
            </p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-700"
              style={{ width: `${pollingProgress}%` }}
            />
          </div>
          <p className="mt-2 text-fluid-xs text-primary-600 dark:text-primary-400">
            Reference : {pollingRef} — Ne fermez pas cette page.
          </p>
        </div>
      )}

      {pollingStatus === "completed" && (
        <div className="flex items-center gap-3 rounded-2xl border border-secondary-200 bg-secondary-50 p-5 dark:border-secondary-800 dark:bg-secondary-950/30">
          <CheckCircle className="h-6 w-6 shrink-0 text-secondary-500" />
          <div>
            <p className="font-heading text-fluid-base font-semibold text-secondary-800 dark:text-secondary-300">
              Paiement confirme. Bienvenue dans Premium !
            </p>
            <p className="text-fluid-sm text-secondary-600 dark:text-secondary-400">
              Votre abonnement est maintenant actif. Actualisez la page pour voir les changements.
            </p>
          </div>
        </div>
      )}

      {pollingStatus === "failed" && (
        <div className="flex items-center gap-3 rounded-2xl border border-error-200 bg-error-50 p-5 dark:border-error-800 dark:bg-error-950/30">
          <AlertCircle className="h-6 w-6 shrink-0 text-error-500" />
          <div>
            <p className="font-heading text-fluid-base font-semibold text-error-800 dark:text-error-300">
              Paiement echoue ou annule
            </p>
            <p className="text-fluid-sm text-error-600 dark:text-error-400">
              Verifiez votre solde et reessayez. Contactez le support si le probleme persiste.
            </p>
          </div>
        </div>
      )}

      {/* Plan selection */}
      {pollingStatus !== "completed" && (
        <>
          <div>
            <h2 className="mb-4 font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
              Choisir un plan
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlan(p.id)}
                  className={[
                    "relative rounded-2xl border-2 p-5 text-left transition-all",
                    selectedPlan === p.id
                      ? "border-primary-500 bg-primary-50 shadow-md dark:bg-primary-950/30"
                      : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900",
                  ].join(" ")}
                >
                  {p.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                      {p.badge}
                    </span>
                  )}
                  <p className="font-heading text-fluid-base font-bold text-neutral-900 dark:text-neutral-100">
                    {p.label}
                  </p>
                  <p className="mt-2 font-heading text-fluid-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(p.amount)}
                  </p>
                  {p.months > 1 && (
                    <p className="mt-0.5 text-fluid-xs text-neutral-500 dark:text-neutral-400">
                      soit {formatPrice(p.perMonth)}/mois
                    </p>
                  )}
                  {p.months === 1 && (
                    <p className="mt-0.5 text-fluid-xs text-neutral-500 dark:text-neutral-400">
                      par mois
                    </p>
                  )}
                  {selectedPlan === p.id && (
                    <div className="mt-3 flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
                      <CheckCircle className="h-4 w-4 fill-primary-500 text-white" />
                      <span className="text-fluid-xs font-medium">Selectionne</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div>
            <h2 className="mb-4 font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
              Methode de paiement
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    id: "orange" as Method,
                    label: "Orange Money",
                    number: "74 14 34 34",
                    ussd: "#144*1*1#",
                    color: "from-orange-500 to-orange-600",
                  },
                  {
                    id: "telecel" as Method,
                    label: "Telecel Money",
                    number: "76 16 90 90",
                    ussd: "*555#",
                    color: "from-red-500 to-red-600",
                  },
                ] as const
              ).map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={[
                    "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                    selectedMethod === method.id
                      ? "border-primary-500 bg-primary-50 shadow-sm dark:bg-primary-950/30"
                      : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900",
                  ].join(" ")}
                >
                  {/* Logo placeholder (colored circle) */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${method.color} font-heading text-xs font-bold text-white`}
                  >
                    {method.id === "orange" ? "OM" : "TM"}
                  </div>
                  <div>
                    <p className="font-heading text-fluid-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {method.label}
                    </p>
                    <p className="text-fluid-xs text-neutral-500 dark:text-neutral-400">
                      {method.number}
                    </p>
                    <p className="text-fluid-xs text-neutral-400 dark:text-neutral-500">
                      Code USSD : {method.ussd}
                    </p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="ml-auto h-5 w-5 shrink-0 fill-primary-500 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Phone number + instructions */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <h3 className="mb-4 font-heading text-fluid-base font-semibold text-neutral-900 dark:text-neutral-100">
              Numero de telephone mobile money
            </h3>
            <Input
              label={`Numero ${selectedMethod === "orange" ? "Orange Money" : "Telecel Money"}`}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="74 14 34 34"
              helperText="Le numero sur lequel vous allez effectuer le paiement"
            />

            {/* Step-by-step instructions */}
            <div className="mt-5 space-y-3">
              <p className="text-fluid-sm font-medium text-neutral-700 dark:text-neutral-300">
                Instructions de paiement
              </p>
              <ol className="space-y-2">
                {(selectedMethod === "orange"
                  ? [
                      "Composez #144# sur votre telephone Orange",
                      "Selectionnez \"Transfert d'argent\" puis \"Payer un service\"",
                      `Entrez le montant : ${formatPrice(plan.amount)}`,
                      "Confirmez avec votre code secret Orange Money",
                      "Notez la reference de transaction",
                    ]
                  : [
                      "Composez *555# sur votre telephone Telecel",
                      "Selectionnez \"Paiements\" puis \"Payer un service\"",
                      `Entrez le montant : ${formatPrice(plan.amount)}`,
                      "Confirmez avec votre PIN Telecel Money",
                      "Notez la reference de transaction",
                    ]
                ).map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                      {i + 1}
                    </span>
                    <span className="text-fluid-sm text-neutral-600 dark:text-neutral-400">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-fluid-sm">{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              variant="accent"
              size="lg"
              className="mt-6 w-full"
              onClick={handleInitiatePayment}
              loading={isSubmitting || pollingStatus === "pending"}
              disabled={!phone || isSubmitting || pollingStatus === "pending"}
            >
              {pollingStatus === "pending" ? (
                <>
                  <Clock className="h-4 w-4" />
                  Verification en cours...
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4" />
                  Payer {formatPrice(plan.amount)}
                </>
              )}
            </Button>
          </div>
        </>
      )}

      {/* Payment history */}
      <div>
        <h2 className="mb-4 font-heading text-fluid-xl font-bold text-neutral-900 dark:text-neutral-100">
          Historique des paiements
        </h2>

        {paymentHistory.length === 0 ? (
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <ReceiptText className="h-8 w-8 text-neutral-300 dark:text-neutral-600" />
            <p className="text-fluid-sm text-neutral-500 dark:text-neutral-400">
              Aucun paiement effectue pour le moment.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-fluid-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                <tr>
                  <th className="px-4 py-3 text-left font-heading font-semibold text-neutral-600 dark:text-neutral-400">
                    Reference
                  </th>
                  <th className="px-4 py-3 text-left font-heading font-semibold text-neutral-600 dark:text-neutral-400">
                    Montant
                  </th>
                  <th className="hidden px-4 py-3 text-left font-heading font-semibold text-neutral-600 dark:text-neutral-400 sm:table-cell">
                    Methode
                  </th>
                  <th className="px-4 py-3 text-left font-heading font-semibold text-neutral-600 dark:text-neutral-400">
                    Statut
                  </th>
                  <th className="hidden px-4 py-3 text-left font-heading font-semibold text-neutral-600 dark:text-neutral-400 md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 bg-white dark:divide-neutral-800 dark:bg-neutral-900">
                {paymentHistory.map((p) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                      {p.reference}
                    </td>
                    <td className="px-4 py-3 font-heading font-semibold text-neutral-900 dark:text-neutral-100">
                      {formatPrice(p.amount)}
                    </td>
                    <td className="hidden px-4 py-3 text-neutral-600 dark:text-neutral-400 sm:table-cell">
                      {p.method === "orange" ? "Orange Money" : "Telecel Money"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                          p.status === "completed"
                            ? "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400"
                            : p.status === "pending"
                              ? "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400"
                              : "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400",
                        ].join(" ")}
                      >
                        {p.status === "completed"
                          ? "Confirme"
                          : p.status === "pending"
                            ? "En attente"
                            : "Echoue"}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-neutral-500 dark:text-neutral-400 md:table-cell">
                      {formatDate(p.created_at, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
