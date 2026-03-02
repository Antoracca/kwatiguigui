import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mock Supabase server client before importing the route
// ---------------------------------------------------------------------------
const mockRange = vi.fn();
const mockOrder = vi.fn();
const mockGt = vi.fn();
const mockEq = vi.fn();
const mockOr = vi.fn();
const mockSelect = vi.fn();
const mockFrom = vi.fn();
const mockGetUser = vi.fn();
const mockSingle = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() =>
    Promise.resolve({
      auth: {
        getUser: mockGetUser,
      },
      from: mockFrom,
    })
  ),
}));

// ---------------------------------------------------------------------------
// Default mock factory
// ---------------------------------------------------------------------------
function setupMockChain({
  jobs = [] as Record<string, unknown>[],
  count = 0,
  error = null,
  userPremium = false,
}: {
  jobs?: Record<string, unknown>[];
  count?: number;
  error?: unknown;
  userPremium?: boolean;
}) {
  // range() is the final call, resolves with data
  mockRange.mockResolvedValue({ data: jobs, count, error });

  // For chained filter calls (eq, or, gt) that return the chain
  mockEq.mockReturnThis();
  mockOr.mockReturnThis();

  // gt() chains into order()
  mockGt.mockReturnValue({ order: mockOrder, eq: mockEq, or: mockOr });
  // order() chains into range()
  mockOrder.mockReturnValue({ range: mockRange });

  // select() sets up the chain
  mockSelect.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        gt: mockGt,
      }),
    }),
    order: mockOrder,
    range: mockRange,
  });

  // Profile select for premium check
  mockSingle.mockResolvedValue({
    data: userPremium
      ? {
          subscription_paid: true,
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      : null,
    error: null,
  });

  // from() returns different things based on table
  mockFrom.mockImplementation((table: string) => {
    if (table === "jobs") {
      return { select: mockSelect };
    }
    if (table === "profiles") {
      return { select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: mockSingle };
    }
    return { select: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: null, error: null }) };
  });
}

// ---------------------------------------------------------------------------
// Helper to create a NextRequest
// ---------------------------------------------------------------------------
function makeRequest(searchParams: Record<string, string> = {}): NextRequest {
  const url = new URL("http://localhost:3000/api/jobs");
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return new NextRequest(url);
}

// ---------------------------------------------------------------------------
// Import route after mocks are set up
// ---------------------------------------------------------------------------
let GET: (request: NextRequest) => Promise<Response>;

beforeEach(async () => {
  vi.clearAllMocks();
  mockGetUser.mockResolvedValue({ data: { user: null }, error: null });
  const mod = await import("@/app/api/jobs/route");
  GET = mod.GET;
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("GET /api/jobs", () => {
  describe("sans parametres (defaults)", () => {
    it("retourne 200 avec une liste vide", async () => {
      setupMockChain({ jobs: [], count: 0 });
      const req = makeRequest();
      const res = await GET(req);
      expect(res.status).toBe(200);
      const body = await res.json() as { data: unknown[]; pagination: { page: number; totalPages: number } };
      expect(body.data).toEqual([]);
      expect(body.pagination.page).toBe(1);
      expect(body.pagination.totalPages).toBe(0);
    });

    it("retourne les champs de pagination corrects", async () => {
      setupMockChain({ jobs: [], count: 0 });
      const res = await GET(makeRequest());
      const body = await res.json() as { pagination: { page: number; perPage: number; total: number; totalPages: number } };
      expect(body.pagination).toMatchObject({
        page: 1,
        perPage: 12,
        total: 0,
        totalPages: 0,
      });
    });

    it("retourne un header Cache-Control", async () => {
      setupMockChain({ jobs: [], count: 0 });
      const res = await GET(makeRequest());
      const cacheControl = res.headers.get("Cache-Control");
      expect(cacheControl).toContain("s-maxage=30");
    });
  });

  describe("masquage du WhatsApp pour les non-premium", () => {
    const sampleJob = {
      id: "job-001",
      first_name: "Marie",
      age: 28,
      whatsapp: "+236 74 14 34 34",
      region: "Bangui",
      city: "Bangui",
      neighborhood: null,
      job_type: "Aide menagere",
      experience: null,
      user_type: "seeker",
      is_active: true,
      publication_status: "published",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    it("masque le numero WhatsApp pour un visiteur non connecte", async () => {
      setupMockChain({ jobs: [sampleJob], count: 1, userPremium: false });
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

      const res = await GET(makeRequest());
      const body = await res.json() as { data: Array<{ whatsapp: string; contactVisible: boolean }> };

      expect(res.status).toBe(200);
      expect(body.data[0]?.whatsapp).not.toBe("+236 74 14 34 34");
      expect(body.data[0]?.contactVisible).toBe(false);
    });

    it("expose le numero complet pour un utilisateur premium", async () => {
      setupMockChain({ jobs: [sampleJob], count: 1, userPremium: true });
      mockGetUser.mockResolvedValue({
        data: { user: { id: "user-premium-001" } },
        error: null,
      });

      const res = await GET(makeRequest());
      const body = await res.json() as { data: Array<{ whatsapp: string; contactVisible: boolean }> };

      expect(res.status).toBe(200);
      expect(body.data[0]?.contactVisible).toBe(true);
    });
  });

  describe("validation des parametres", () => {
    it("retourne 400 pour perPage > 50", async () => {
      setupMockChain({});
      const res = await GET(makeRequest({ perPage: "100" }));
      expect(res.status).toBe(400);
      const body = await res.json() as { error: { code: string } };
      expect(body.error.code).toBe("VALIDATION_ERROR");
    });

    it("retourne 400 pour page = 0", async () => {
      setupMockChain({});
      const res = await GET(makeRequest({ page: "0" }));
      expect(res.status).toBe(400);
    });

    it("accepte des parametres valides : region + jobType", async () => {
      setupMockChain({ jobs: [], count: 0 });
      const res = await GET(makeRequest({ region: "Bangui", jobType: "Chauffeur" }));
      expect(res.status).toBe(200);
    });

    it("accepte une recherche par query", async () => {
      setupMockChain({ jobs: [], count: 0 });
      const res = await GET(makeRequest({ query: "aide" }));
      expect(res.status).toBe(200);
    });
  });

  describe("transformation des donnees (snake_case => camelCase)", () => {
    it("transforme first_name en firstName", async () => {
      const job = {
        id: "j1",
        first_name: "Paul",
        age: 30,
        whatsapp: "+23674143434",
        region: "Bangui",
        city: "Bangui",
        neighborhood: null,
        job_type: "Chauffeur",
        experience: null,
        user_type: "employer",
        is_active: true,
        publication_status: "published",
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      };
      setupMockChain({ jobs: [job], count: 1 });

      const res = await GET(makeRequest());
      const body = await res.json() as { data: Array<{ firstName: string; jobType: string; userType: string }> };

      expect(body.data[0]?.firstName).toBe("Paul");
      expect(body.data[0]?.jobType).toBe("Chauffeur");
      expect(body.data[0]?.userType).toBe("employer");
    });
  });

  describe("erreur base de donnees", () => {
    it("retourne 500 en cas d'erreur Supabase", async () => {
      setupMockChain({ error: { message: "DB connection failed" } });
      const res = await GET(makeRequest());
      expect(res.status).toBe(500);
    });
  });
});
