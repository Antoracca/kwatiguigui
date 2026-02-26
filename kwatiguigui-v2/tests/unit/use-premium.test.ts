import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { usePremium } from "@/hooks/use-premium";

// ---------------------------------------------------------------------------
// Mock auth-provider
// ---------------------------------------------------------------------------
const mockUser = { id: "user-uuid-123" };

vi.mock("@/components/providers/auth-provider", () => ({
  useAuthContext: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Mock Supabase client
// ---------------------------------------------------------------------------
const mockFrom = vi.fn();
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

import { useAuthContext } from "@/components/providers/auth-provider";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function mockSupabaseProfile(data: Record<string, unknown> | null, error: unknown = null) {
  mockFrom.mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data, error }),
    // then() pattern used in usePremium
    then: vi.fn((cb) => cb({ data, error })),
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("usePremium", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne isPremium=false et isLoading=false si non connecte", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      isLoading: false,
    });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(false);
    expect(result.current.daysLeft).toBeNull();
    expect(result.current.isExpiringSoon).toBe(false);
  });

  it("retourne isLoading=true pendant que l'auth se charge", () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      isLoading: true,
    });

    const { result } = renderHook(() => usePremium());
    expect(result.current.isLoading).toBe(true);
  });

  it("retourne isPremium=false si subscription_paid=false", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    mockSupabaseProfile({ subscription_paid: false, expiry_date: null });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(false);
    expect(result.current.daysLeft).toBeNull();
  });

  it("retourne isPremium=false si le profil est null", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    mockSupabaseProfile(null);

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(false);
  });

  it("retourne isPremium=false et daysLeft=0 si l'abonnement est expire", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // hier
    mockSupabaseProfile({ subscription_paid: true, expiry_date: pastDate });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(false);
    expect(result.current.daysLeft).toBe(0);
    expect(result.current.isExpiringSoon).toBe(false);
  });

  it("retourne isPremium=true avec daysLeft correct pour un abonnement actif", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    // Expiration dans 15 jours
    const futureDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();
    mockSupabaseProfile({ subscription_paid: true, expiry_date: futureDate });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(true);
    expect(result.current.daysLeft).toBe(15);
    expect(result.current.isExpiringSoon).toBe(false);
  });

  it("retourne isExpiringSoon=true quand il reste <= 7 jours", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    // Expiration dans 5 jours
    const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    mockSupabaseProfile({ subscription_paid: true, expiry_date: futureDate });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(true);
    expect(result.current.daysLeft).toBe(5);
    expect(result.current.isExpiringSoon).toBe(true);
  });

  it("retourne isExpiringSoon=true exactement a 7 jours restants (Math.ceil = 7)", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    // Math.ceil((7 * 86400 * 1000) / (86400 * 1000)) = Math.ceil(7.0) = 7
    // Pour obtenir exactement 7 jours, on soustrait 1ms pour rester sous 7 jours complets
    // => Math.ceil(6.9999...) = 7
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 - 1).toISOString();
    mockSupabaseProfile({ subscription_paid: true, expiry_date: futureDate });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isPremium).toBe(true);
    expect(result.current.daysLeft).toBe(7);
    expect(result.current.isExpiringSoon).toBe(true);
  });

  it("retourne isExpiringSoon=false a 8 jours", async () => {
    (useAuthContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const futureDate = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString();
    mockSupabaseProfile({ subscription_paid: true, expiry_date: futureDate });

    const { result } = renderHook(() => usePremium());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isExpiringSoon).toBe(false);
  });
});
