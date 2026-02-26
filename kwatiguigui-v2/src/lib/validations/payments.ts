import { z } from "zod";

import { PAYMENT_METHODS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Initiate payment
// ---------------------------------------------------------------------------
export const initiatePaymentSchema = z.object({
  plan: z.enum(["monthly", "biannual", "annual"], {
    required_error: "Veuillez choisir un plan",
  }),
  method: z.enum(PAYMENT_METHODS, {
    required_error: "Veuillez choisir une methode de paiement",
  }),
  phoneNumber: z
    .string()
    .min(8, "Le numero doit contenir au moins 8 chiffres")
    .regex(
      /^\+?\d[\d\s-]{7,}$/,
      "Format de numero invalide",
    ),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;

// ---------------------------------------------------------------------------
// Webhook payload (Orange Money)
// ---------------------------------------------------------------------------
export const orangeMoneyWebhookSchema = z.object({
  notif_token: z.string(),
  status: z.enum(["SUCCESS", "FAILED", "PENDING"]),
  order_id: z.string(),
  txnid: z.string(),
  amount: z.string(),
  pay_token: z.string().optional(),
});

export type OrangeMoneyWebhookPayload = z.infer<typeof orangeMoneyWebhookSchema>;

// ---------------------------------------------------------------------------
// Webhook payload (Telecel Money)
// ---------------------------------------------------------------------------
export const telecelMoneyWebhookSchema = z.object({
  transaction_id: z.string(),
  status: z.enum(["completed", "failed", "pending"]),
  reference: z.string(),
  amount: z.number(),
  signature: z.string(),
});

export type TelecelMoneyWebhookPayload = z.infer<typeof telecelMoneyWebhookSchema>;
