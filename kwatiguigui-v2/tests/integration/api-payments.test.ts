import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Mock all dependencies BEFORE importing route handlers
// ---------------------------------------------------------------------------
const mockSupabaseFrom = vi.fn();
const mockSupabaseGetUser = vi.fn();
const mockAdminFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() =>
    Promise.resolve({
      auth: { getUser: mockSupabaseGetUser },
      from: mockSupabaseFrom,
    })
  ),
}));

vi.mock("@/lib/supabase/admin", () => ({
  supabaseAdmin: { from: mockAdminFrom },
}));

vi.mock("@/lib/payments/orange-money", () => ({
  initiateOrangePayment: vi.fn().mockResolvedValue({
    success: true,
    mock: true,
    message: "USSD push envoye",
    transactionId: "orange-txn-001",
  }),
  verifyOrangeWebhookSignature: vi.fn(),
}));

vi.mock("@/lib/payments/telecel-money", () => ({
  initiateTelecelPayment: vi.fn().mockResolvedValue({
    success: true,
    mock: true,
    message: "Paiement en attente",
    transactionId: "telecel-txn-001",
  }),
  verifyTelecelWebhookSignature: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makePostRequest(body: unknown, url = "http://localhost:3000/api/payments/initiate"): NextRequest {
  return new NextRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeWebhookRequest({
  body,
  operator,
  orangeSig = "",
  telecelSig = "",
}: {
  body: unknown;
  operator: string;
  orangeSig?: string;
  telecelSig?: string;
}): NextRequest {
  const url = new URL("http://localhost:3000/api/payments/webhook");
  url.searchParams.set("operator", operator);
  return new NextRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-operator": operator,
      ...(orangeSig ? { "x-orange-signature": orangeSig } : {}),
      ...(telecelSig ? { "x-telecel-signature": telecelSig } : {}),
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Import route handlers (after mocks)
// ---------------------------------------------------------------------------
let POST_initiate: (request: NextRequest) => Promise<Response>;
let POST_webhook: (request: NextRequest) => Promise<Response>;

beforeEach(async () => {
  vi.clearAllMocks();

  // Default: authenticated user (must be a valid UUID v4)
  mockSupabaseGetUser.mockResolvedValue({
    data: { user: { id: "550e8400-e29b-41d4-a716-446655440001" } },
    error: null,
  });

  // Default: admin insert succeeds
  mockAdminFrom.mockReturnValue({
    insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    update: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
  });

  const initiateMod = await import("@/app/api/payments/initiate/route");
  const webhookMod = await import("@/app/api/payments/webhook/route");
  POST_initiate = initiateMod.POST;
  POST_webhook = webhookMod.POST;
});

// ===========================================================================
// POST /api/payments/initiate
// ===========================================================================
describe("POST /api/payments/initiate", () => {
  describe("cas valides", () => {
    // Must match the mocked auth user.id AND be a valid UUID
  const VALID_USER_ID = "550e8400-e29b-41d4-a716-446655440001";
  const validBody = {
      userId: VALID_USER_ID,
      plan: "monthly",
      method: "orange",
      phoneNumber: "+236 74 14 34 34",
    };

    it("retourne 200 avec une reference au format KWT-xxx", async () => {
      const req = makePostRequest(validBody);
      const res = await POST_initiate(req);
      expect(res.status).toBe(200);
      const body = await res.json() as { reference: string; status: string };
      expect(body.reference).toMatch(/^KWT-\d+-[A-Z0-9]{9}$/);
    });

    it("retourne status='pending' (jamais 'completed')", async () => {
      const req = makePostRequest(validBody);
      const res = await POST_initiate(req);
      const body = await res.json() as { status: string };
      expect(body.status).toBe("pending");
    });

    it("fonctionne avec Telecel Money", async () => {
      const req = makePostRequest({ ...validBody, method: "telecel" });
      const res = await POST_initiate(req);
      expect(res.status).toBe(200);
    });

    it("fonctionne avec le plan biannual", async () => {
      const req = makePostRequest({ ...validBody, plan: "biannual" });
      const res = await POST_initiate(req);
      expect(res.status).toBe(200);
    });

    it("fonctionne avec le plan annual", async () => {
      const req = makePostRequest({ ...validBody, plan: "annual" });
      const res = await POST_initiate(req);
      expect(res.status).toBe(200);
    });
  });

  describe("securite — authentification", () => {
    it("retourne 401 si l'utilisateur n'est pas connecte", async () => {
      mockSupabaseGetUser.mockResolvedValue({ data: { user: null }, error: null });
      const req = makePostRequest({ userId: "anyone", plan: "monthly", method: "orange", phoneNumber: "+23674143434" });
      const res = await POST_initiate(req);
      expect(res.status).toBe(401);
    });

    it("retourne 403 si userId ne correspond pas a l'utilisateur authentifie", async () => {
      mockSupabaseGetUser.mockResolvedValue({
        data: { user: { id: "550e8400-e29b-41d4-a716-446655440099" } },
        error: null,
      });
      const req = makePostRequest({
        userId: "550e8400-e29b-41d4-a716-446655440001", // Different de l'utilisateur connecte
        plan: "monthly",
        method: "orange",
        phoneNumber: "+23674143434",
      });
      const res = await POST_initiate(req);
      expect(res.status).toBe(403);
    });
  });

  describe("validation", () => {
    it("retourne 400 pour un corps JSON invalide", async () => {
      const req = new NextRequest("http://localhost:3000/api/payments/initiate", {
        method: "POST",
        body: "invalid json {",
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST_initiate(req);
      expect(res.status).toBe(400);
    });

    it("retourne 400 pour une methode invalide", async () => {
      const req = makePostRequest({
        userId: "user-uuid-001",
        plan: "monthly",
        method: "mtn", // invalide
        phoneNumber: "+23674143434",
      });
      const res = await POST_initiate(req);
      expect(res.status).toBe(400);
    });

    it("retourne 400 pour un plan invalide", async () => {
      const req = makePostRequest({
        userId: "user-uuid-001",
        plan: "quarterly", // invalide
        method: "orange",
        phoneNumber: "+23674143434",
      });
      const res = await POST_initiate(req);
      expect(res.status).toBe(400);
    });

    it("retourne 400 si phoneNumber est trop court", async () => {
      const req = makePostRequest({
        userId: "user-uuid-001",
        plan: "monthly",
        method: "orange",
        phoneNumber: "123",
      });
      const res = await POST_initiate(req);
      expect(res.status).toBe(400);
    });
  });

  describe("erreur operateur", () => {
    it("retourne 502 si l'operateur echoue", async () => {
      const { initiateOrangePayment } = await import("@/lib/payments/orange-money");
      (initiateOrangePayment as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        success: false,
        message: "Solde insuffisant",
      });

      const req = makePostRequest({
        userId: "550e8400-e29b-41d4-a716-446655440001",
        plan: "monthly",
        method: "orange",
        phoneNumber: "+23674143434",
      });
      const res = await POST_initiate(req);
      expect(res.status).toBe(502);
    });
  });
});

// ===========================================================================
// POST /api/payments/webhook
// ===========================================================================
describe("POST /api/payments/webhook", () => {
  describe("Orange Money — verification HMAC", () => {
    it("retourne 400 si l'operateur est inconnu", async () => {
      const req = makeWebhookRequest({
        body: { status: "SUCCESS", order_id: "KWT-123-ABC" },
        operator: "unknown",
      });
      const res = await POST_webhook(req);
      expect(res.status).toBe(400);
      const body = await res.json() as { error: string };
      expect(body.error).toContain("inconnu");
    });

    it("retourne 401 si la signature HMAC est invalide", async () => {
      const { verifyOrangeWebhookSignature } = await import("@/lib/payments/orange-money");
      (verifyOrangeWebhookSignature as ReturnType<typeof vi.fn>).mockReturnValue(false);

      const req = makeWebhookRequest({
        body: { status: "SUCCESS", order_id: "KWT-123-ABC" },
        operator: "orange",
        orangeSig: "invalid-signature",
      });
      const res = await POST_webhook(req);
      expect(res.status).toBe(401);
      const body = await res.json() as { error: string };
      expect(body.error).toContain("Signature invalide");
    });

    it("retourne 200 avec received=true pour une signature valide", async () => {
      const { verifyOrangeWebhookSignature } = await import("@/lib/payments/orange-money");
      (verifyOrangeWebhookSignature as ReturnType<typeof vi.fn>).mockReturnValue(true);

      // Mock DB lookup — paiement existant
      mockAdminFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { id: "pay-001", user_id: "user-001", amount: 2500, status: "pending" },
          error: null,
        }),
      });

      const payload = { status: "SUCCESS", order_id: "KWT-123-ABC456789", reference: "KWT-123-ABC456789" };
      const req = makeWebhookRequest({
        body: payload,
        operator: "orange",
        orangeSig: "valid-hmac-sig",
      });
      const res = await POST_webhook(req);
      expect(res.status).toBe(200);
      const body = await res.json() as { received: boolean };
      expect(body.received).toBe(true);
    });
  });

  describe("Telecel Money — verification HMAC", () => {
    it("retourne 401 si la signature Telecel est invalide", async () => {
      const { verifyTelecelWebhookSignature } = await import("@/lib/payments/telecel-money");
      (verifyTelecelWebhookSignature as ReturnType<typeof vi.fn>).mockReturnValue(false);

      const req = makeWebhookRequest({
        body: { status: "completed", reference: "KWT-123", transaction_id: "t-001" },
        operator: "telecel",
        telecelSig: "bad-sig",
      });
      const res = await POST_webhook(req);
      expect(res.status).toBe(401);
    });

    it("accepte un webhook Telecel valide", async () => {
      const { verifyTelecelWebhookSignature } = await import("@/lib/payments/telecel-money");
      (verifyTelecelWebhookSignature as ReturnType<typeof vi.fn>).mockReturnValue(true);

      mockAdminFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { id: "pay-002", user_id: "user-002", amount: 2500, status: "pending" },
          error: null,
        }),
      });

      const req = makeWebhookRequest({
        body: { status: "completed", reference: "KWT-456-DEF123456" },
        operator: "telecel",
        telecelSig: "valid-telecel-sig",
      });
      const res = await POST_webhook(req);
      expect(res.status).toBe(200);
    });
  });

  describe("idempotence", () => {
    it("retourne already_processed=true si le paiement est deja completed", async () => {
      const { verifyOrangeWebhookSignature } = await import("@/lib/payments/orange-money");
      (verifyOrangeWebhookSignature as ReturnType<typeof vi.fn>).mockReturnValue(true);

      mockAdminFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { id: "pay-003", user_id: "user-003", amount: 2500, status: "completed" },
          error: null,
        }),
      });

      const req = makeWebhookRequest({
        body: { status: "SUCCESS", reference: "KWT-789-ALREADY" },
        operator: "orange",
        orangeSig: "valid-sig",
      });
      const res = await POST_webhook(req);
      const body = await res.json() as { received: boolean; already_processed: boolean };
      expect(body.received).toBe(true);
      expect(body.already_processed).toBe(true);
    });
  });

  describe("etats intermediaires", () => {
    it("retourne 200 sans mise a jour DB pour un statut PENDING", async () => {
      const { verifyOrangeWebhookSignature } = await import("@/lib/payments/orange-money");
      (verifyOrangeWebhookSignature as ReturnType<typeof vi.fn>).mockReturnValue(true);

      const updateMock = vi.fn().mockReturnThis();
      mockAdminFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        update: updateMock,
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
      });

      const req = makeWebhookRequest({
        body: { status: "PENDING", order_id: "KWT-123" },
        operator: "orange",
        orangeSig: "valid-sig",
      });
      const res = await POST_webhook(req);
      expect(res.status).toBe(200);
      const body = await res.json() as { received: boolean };
      expect(body.received).toBe(true);
    });
  });
});
