import { describe, it, expect } from "vitest";

import {
  RCA_REGIONS,
  JOB_TYPES,
  SECTORS,
  USER_TYPES,
  USER_TYPE_LABELS,
  PUBLICATION_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  PRICING,
  PRICING_PLANS,
  CONTACT,
  STATS,
  FAQ_ITEMS,
} from "@/lib/constants";

// ---------------------------------------------------------------------------
// Regions RCA
// ---------------------------------------------------------------------------
describe("RCA_REGIONS", () => {
  it("contient exactement 20 regions", () => {
    expect(RCA_REGIONS).toHaveLength(20);
  });

  it("contient Bangui comme premiere region", () => {
    expect(RCA_REGIONS[0]).toBe("Bangui");
  });

  it("ne contient pas de doublons", () => {
    const unique = new Set(RCA_REGIONS);
    expect(unique.size).toBe(RCA_REGIONS.length);
  });

  it("contient Bangui", () => {
    expect(RCA_REGIONS).toContain("Bangui");
  });

  it("contient Ouham", () => {
    expect(RCA_REGIONS).toContain("Ouham");
  });

  it("contient Lobaye", () => {
    expect(RCA_REGIONS).toContain("Lobaye");
  });

  it("toutes les regions sont des chaines non vides", () => {
    RCA_REGIONS.forEach((r) => {
      expect(typeof r).toBe("string");
      expect(r.length).toBeGreaterThan(0);
    });
  });
});

// ---------------------------------------------------------------------------
// Types d'emploi
// ---------------------------------------------------------------------------
describe("JOB_TYPES", () => {
  it("contient au moins 17 types d'emploi", () => {
    expect(JOB_TYPES.length).toBeGreaterThanOrEqual(17);
  });

  it("contient 'Aide menagere'", () => {
    expect(JOB_TYPES).toContain("Aide menagere");
  });

  it("contient 'Chauffeur'", () => {
    expect(JOB_TYPES).toContain("Chauffeur");
  });

  it("contient 'Autre' comme dernier type", () => {
    expect(JOB_TYPES[JOB_TYPES.length - 1]).toBe("Autre");
  });

  it("ne contient pas de doublons", () => {
    const unique = new Set(JOB_TYPES);
    expect(unique.size).toBe(JOB_TYPES.length);
  });

  it("contient 'Enseignant'", () => {
    expect(JOB_TYPES).toContain("Enseignant");
  });

  it("contient 'Agent de securite'", () => {
    expect(JOB_TYPES).toContain("Agent de securite");
  });
});

// ---------------------------------------------------------------------------
// Secteurs
// ---------------------------------------------------------------------------
describe("SECTORS", () => {
  it("contient au moins 10 secteurs", () => {
    expect(SECTORS.length).toBeGreaterThanOrEqual(10);
  });

  it("contient 'Autre' comme dernier secteur", () => {
    expect(SECTORS[SECTORS.length - 1]).toBe("Autre");
  });

  it("ne contient pas de doublons", () => {
    const unique = new Set(SECTORS);
    expect(unique.size).toBe(SECTORS.length);
  });
});

// ---------------------------------------------------------------------------
// Types utilisateur
// ---------------------------------------------------------------------------
describe("USER_TYPES", () => {
  it("contient exactement 2 types", () => {
    expect(USER_TYPES).toHaveLength(2);
  });

  it("contient 'seeker' et 'employer'", () => {
    expect(USER_TYPES).toContain("seeker");
    expect(USER_TYPES).toContain("employer");
  });
});

describe("USER_TYPE_LABELS", () => {
  it("a un label pour seeker", () => {
    expect(USER_TYPE_LABELS.seeker).toBeDefined();
    expect(USER_TYPE_LABELS.seeker.length).toBeGreaterThan(0);
  });

  it("a un label pour employer", () => {
    expect(USER_TYPE_LABELS.employer).toBeDefined();
    expect(USER_TYPE_LABELS.employer.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Statuts de publication
// ---------------------------------------------------------------------------
describe("PUBLICATION_STATUSES", () => {
  it("contient draft, pending, published, rejected", () => {
    expect(PUBLICATION_STATUSES).toContain("draft");
    expect(PUBLICATION_STATUSES).toContain("pending");
    expect(PUBLICATION_STATUSES).toContain("published");
    expect(PUBLICATION_STATUSES).toContain("rejected");
  });

  it("contient exactement 4 statuts", () => {
    expect(PUBLICATION_STATUSES).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// Methodes de paiement
// ---------------------------------------------------------------------------
describe("PAYMENT_METHODS", () => {
  it("contient 'orange' et 'telecel'", () => {
    expect(PAYMENT_METHODS).toContain("orange");
    expect(PAYMENT_METHODS).toContain("telecel");
  });

  it("contient exactement 2 methodes", () => {
    expect(PAYMENT_METHODS).toHaveLength(2);
  });
});

describe("PAYMENT_METHOD_LABELS", () => {
  it("a un label lisible pour orange", () => {
    expect(PAYMENT_METHOD_LABELS.orange).toBe("Orange Money");
  });

  it("a un label lisible pour telecel", () => {
    expect(PAYMENT_METHOD_LABELS.telecel).toBe("Telecel Money");
  });
});

// ---------------------------------------------------------------------------
// Tarification
// ---------------------------------------------------------------------------
describe("PRICING", () => {
  it("le plan mensuel est 2500 FCFA", () => {
    expect(PRICING.PREMIUM_MONTHLY).toBe(2_500);
  });

  it("le plan biannuel est 12500 FCFA", () => {
    expect(PRICING.PREMIUM_BIANNUAL).toBe(12_500);
  });

  it("le plan annuel est 25000 FCFA", () => {
    expect(PRICING.PREMIUM_ANNUAL).toBe(25_000);
  });

  it("la limite gratuite est 5 annonces", () => {
    expect(PRICING.FREE_JOB_LIMIT).toBe(5);
  });

  it("la devise est FCFA", () => {
    expect(PRICING.CURRENCY).toBe("FCFA");
  });

  it("la devise ISO est XAF", () => {
    expect(PRICING.CURRENCY_ISO).toBe("XAF");
  });

  it("la duree d'expiration d'une annonce est 30 jours", () => {
    expect(PRICING.JOB_EXPIRY_DAYS).toBe(30);
  });

  it("le plan biannuel est moins cher que 6x le mensuel (remise)", () => {
    expect(PRICING.PREMIUM_BIANNUAL).toBeLessThan(PRICING.PREMIUM_MONTHLY * 6);
  });

  it("le plan annuel est moins cher que 12x le mensuel (remise)", () => {
    expect(PRICING.PREMIUM_ANNUAL).toBeLessThan(PRICING.PREMIUM_MONTHLY * 12);
  });
});

// ---------------------------------------------------------------------------
// Plans tarifaires
// ---------------------------------------------------------------------------
describe("PRICING_PLANS", () => {
  it("contient 2 plans (Gratuit et Premium)", () => {
    expect(PRICING_PLANS).toHaveLength(2);
  });

  it("le plan gratuit a un prix de 0", () => {
    const freePlan = PRICING_PLANS.find((p) => p.price === 0);
    expect(freePlan).toBeDefined();
    expect(freePlan?.name).toBe("Gratuit");
  });

  it("le plan premium a un prix de 2500", () => {
    const premiumPlan = PRICING_PLANS.find((p) => p.price === 2_500);
    expect(premiumPlan).toBeDefined();
    expect(premiumPlan?.name).toBe("Premium");
    expect(premiumPlan?.featured).toBe(true);
  });

  it("chaque plan a des features (tableau non vide)", () => {
    PRICING_PLANS.forEach((plan) => {
      expect(plan.features.length).toBeGreaterThan(0);
    });
  });
});

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
describe("CONTACT", () => {
  it("le numero WhatsApp principal est +236 74 14 34 34", () => {
    expect(CONTACT.WHATSAPP).toBe("+236 74 14 34 34");
  });

  it("le lien WhatsApp est correctement forme", () => {
    expect(CONTACT.WHATSAPP_LINK).toMatch(/^https:\/\/wa\.me\//);
    expect(CONTACT.WHATSAPP_LINK).toContain("23674143434");
  });

  it("Orange Money est 74 14 34 34", () => {
    expect(CONTACT.ORANGE_MONEY).toBe("74 14 34 34");
  });

  it("Telecel Money est 76 16 90 90", () => {
    expect(CONTACT.TELECEL_MONEY).toBe("76 16 90 90");
  });

  it("l'adresse est a Bangui", () => {
    expect(CONTACT.ADDRESS).toContain("Bangui");
  });

  it("l'email de support est defini", () => {
    expect(CONTACT.EMAIL).toMatch(/@kwatiguigui/);
  });
});

// ---------------------------------------------------------------------------
// Statistiques marketing
// ---------------------------------------------------------------------------
describe("STATS", () => {
  it("contient exactement 4 statistiques", () => {
    expect(STATS).toHaveLength(4);
  });

  it("chaque stat a une valeur et un label", () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeDefined();
      expect(stat.label).toBeDefined();
      expect(stat.value.length).toBeGreaterThan(0);
      expect(stat.label.length).toBeGreaterThan(0);
    });
  });

  it("mentionne les 20 regions couvertes", () => {
    const regionStat = STATS.find((s) => s.value === "20");
    expect(regionStat).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
describe("FAQ_ITEMS", () => {
  it("contient au moins 4 questions", () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(4);
  });

  it("chaque item a une question et une reponse", () => {
    FAQ_ITEMS.forEach((item) => {
      expect(item.question).toBeDefined();
      expect(item.answer).toBeDefined();
      expect(item.question.length).toBeGreaterThan(10);
      expect(item.answer.length).toBeGreaterThan(10);
    });
  });

  it("mentionne les 20 regions dans une reponse", () => {
    const found = FAQ_ITEMS.some((item) => item.answer.includes("20 regions"));
    expect(found).toBe(true);
  });
});
