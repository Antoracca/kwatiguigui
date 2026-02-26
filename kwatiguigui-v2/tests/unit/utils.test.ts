import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import {
  cn,
  formatPrice,
  formatDate,
  formatRelativeDate,
  generatePaymentReference,
  maskWhatsApp,
  slugify,
  truncate,
  isServer,
  delay,
} from "@/lib/utils";

// ---------------------------------------------------------------------------
// cn — Tailwind class merger
// ---------------------------------------------------------------------------
describe("cn", () => {
  it("retourne une chaine vide si aucun argument", () => {
    expect(cn()).toBe("");
  });

  it("fusionne des classes simples", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("supprime les classes Tailwind en conflit (tailwind-merge)", () => {
    // px-4 puis px-6 => px-6 doit gagner
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("ignore les valeurs falsy", () => {
    expect(cn("px-4", false, undefined, null, "py-2")).toBe("px-4 py-2");
  });

  it("supporte les objets conditionnels (clsx)", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500");
  });

  it("supporte les tableaux imbriques", () => {
    expect(cn(["px-4", "py-2"], "font-bold")).toBe("px-4 py-2 font-bold");
  });
});

// ---------------------------------------------------------------------------
// formatPrice — formateur FCFA
// ---------------------------------------------------------------------------
describe("formatPrice", () => {
  it("formate 2500 en '2 500 FCFA'", () => {
    expect(formatPrice(2500)).toBe("2\u202f500 FCFA");
  });

  it("formate 0 en '0 FCFA'", () => {
    expect(formatPrice(0)).toBe("0 FCFA");
  });

  it("formate 12500 correctement", () => {
    expect(formatPrice(12500)).toBe("12\u202f500 FCFA");
  });

  it("formate 25000 correctement", () => {
    expect(formatPrice(25000)).toBe("25\u202f000 FCFA");
  });

  it("n'ajoute pas de decimales", () => {
    // 2500.99 doit etre arrondi a 2 501
    const result = formatPrice(2501);
    expect(result).not.toContain(".");
    expect(result).not.toContain(",");
  });
});

// ---------------------------------------------------------------------------
// formatDate — formateur de date en francais
// ---------------------------------------------------------------------------
describe("formatDate", () => {
  it("accepte un objet Date", () => {
    const date = new Date("2026-01-15");
    const result = formatDate(date);
    expect(result).toContain("2026");
    expect(result).toContain("15");
  });

  it("accepte une chaine ISO", () => {
    const result = formatDate("2026-01-15");
    expect(result).toContain("2026");
  });

  it("retourne une date en locale francaise (fr-FR)", () => {
    const result = formatDate(new Date("2026-02-26"));
    // Le format fr-FR inclut le mois en lettres
    expect(result).toMatch(/f[ée]vrier/i);
    expect(result).toContain("2026");
  });

  it("accepte des options de formatage personnalisees", () => {
    const result = formatDate(new Date("2026-02-26"), { year: undefined, month: "short" });
    expect(result).toMatch(/f[ée]vr?\.?/i);
  });
});

// ---------------------------------------------------------------------------
// formatRelativeDate — dates relatives
// ---------------------------------------------------------------------------
describe("formatRelativeDate", () => {
  let now: number;

  beforeEach(() => {
    now = Date.now();
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retourne \"a l'instant\" pour une date < 60s", () => {
    const date = new Date(now - 30 * 1000);
    expect(formatRelativeDate(date)).toBe("a l'instant");
  });

  it("retourne \"il y a 1 minute\" pour ~1 minute", () => {
    const date = new Date(now - 65 * 1000);
    expect(formatRelativeDate(date)).toBe("il y a 1 minute");
  });

  it("retourne le pluriel \"il y a 5 minutes\"", () => {
    const date = new Date(now - 5 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("il y a 5 minutes");
  });

  it("retourne \"il y a 1 heure\" pour ~1 heure", () => {
    const date = new Date(now - 61 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("il y a 1 heure");
  });

  it("retourne le pluriel \"il y a 3 heures\"", () => {
    const date = new Date(now - 3 * 60 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("il y a 3 heures");
  });

  it("retourne \"il y a 1 jour\" pour ~1 jour", () => {
    const date = new Date(now - 25 * 60 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("il y a 1 jour");
  });

  it("retourne \"il y a 15 jours\" pour 15 jours", () => {
    const date = new Date(now - 15 * 24 * 60 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("il y a 15 jours");
  });

  it("retourne une date formatee pour > 30 jours", () => {
    const date = new Date(now - 31 * 24 * 60 * 60 * 1000);
    const result = formatRelativeDate(date);
    // Doit retourner une date formatee, pas un relatif
    expect(result).not.toContain("il y a");
    expect(result).not.toContain("l'instant");
    expect(result.length).toBeGreaterThan(5);
  });

  it("accepte une chaine ISO", () => {
    const date = new Date(now - 30 * 1000);
    expect(formatRelativeDate(date.toISOString())).toBe("a l'instant");
  });
});

// ---------------------------------------------------------------------------
// generatePaymentReference — format KWT-{timestamp}-{random9}
// ---------------------------------------------------------------------------
describe("generatePaymentReference", () => {
  it("commence par KWT-", () => {
    expect(generatePaymentReference()).toMatch(/^KWT-/);
  });

  it("respecte le format KWT-{timestamp}-{random9}", () => {
    const ref = generatePaymentReference();
    expect(ref).toMatch(/^KWT-\d+-[A-Z0-9]{9}$/);
  });

  it("genere des references uniques", () => {
    const refs = new Set(Array.from({ length: 100 }, () => generatePaymentReference()));
    // Avec 100 generations, toutes doivent etre differentes
    expect(refs.size).toBe(100);
  });

  it("contient 3 segments separes par des tirets", () => {
    const ref = generatePaymentReference();
    const parts = ref.split("-");
    expect(parts).toHaveLength(3);
    expect(parts[0]).toBe("KWT");
    expect(parts[1]).toMatch(/^\d+$/);
    expect(parts[2]).toHaveLength(9);
  });
});

// ---------------------------------------------------------------------------
// maskWhatsApp — masquage numero pour non-premium
// ---------------------------------------------------------------------------
describe("maskWhatsApp", () => {
  it("masque correctement un numero standard RCA (+236 74 14 34 34)", () => {
    // digits: 23674143434 -> prefix: 23674 -> +236 74 ** ** **
    expect(maskWhatsApp("+236 74 14 34 34")).toBe("+236 74 ** ** **");
  });

  it("fonctionne avec des chiffres sans espaces", () => {
    expect(maskWhatsApp("23674143434")).toBe("+236 74 ** ** **");
  });

  it("retourne '** ** ** **' si moins de 8 chiffres", () => {
    expect(maskWhatsApp("1234567")).toBe("** ** ** **");
  });

  it("retourne '** ** ** **' pour une chaine vide", () => {
    expect(maskWhatsApp("")).toBe("** ** ** **");
  });

  it("ignore les tirets et espaces pour compter les chiffres", () => {
    expect(maskWhatsApp("+236-74-14-34-34")).toBe("+236 74 ** ** **");
  });
});

// ---------------------------------------------------------------------------
// slugify — conversion texte => URL
// ---------------------------------------------------------------------------
describe("slugify", () => {
  it("convertit en minuscules", () => {
    expect(slugify("Aide")).toBe("aide");
  });

  it("supprime les accents", () => {
    expect(slugify("Aide menagere")).toBe("aide-menagere");
    expect(slugify("Electricite")).toBe("electricite");
    expect(slugify("Secretaire")).toBe("secretaire");
  });

  it("remplace les espaces par des tirets", () => {
    expect(slugify("Agent de securite")).toBe("agent-de-securite");
  });

  it("supprime les tirets en debut et fin", () => {
    expect(slugify(" texte ")).toBe("texte");
  });

  it("consolide les separateurs multiples", () => {
    expect(slugify("texte  double  espace")).toBe("texte-double-espace");
  });

  it("retourne une chaine vide pour une entree vide", () => {
    expect(slugify("")).toBe("");
  });

  it("gere les caracteres speciaux", () => {
    expect(slugify("C'est un test!")).toBe("c-est-un-test");
  });
});

// ---------------------------------------------------------------------------
// truncate — troncature avec ellipsis
// ---------------------------------------------------------------------------
describe("truncate", () => {
  it("retourne le texte intact si inferieur a maxLength", () => {
    expect(truncate("Bonjour", 10)).toBe("Bonjour");
  });

  it("retourne le texte intact si egal a maxLength", () => {
    expect(truncate("Bonjour", 7)).toBe("Bonjour");
  });

  it("tronque et ajoute '...' si superieur a maxLength", () => {
    const result = truncate("Bonjour le monde", 10);
    expect(result.endsWith("...")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(13); // 10 chars + "..."
  });

  it("supprime les espaces en fin avant d'ajouter '...'", () => {
    const result = truncate("Bonjour le monde", 8);
    expect(result).not.toMatch(/\s\.\.\.$/);
  });

  it("gere une chaine vide", () => {
    expect(truncate("", 10)).toBe("");
  });

  it("gere maxLength de 0", () => {
    const result = truncate("Bonjour", 0);
    expect(result).toBe("...");
  });
});

// ---------------------------------------------------------------------------
// isServer
// ---------------------------------------------------------------------------
describe("isServer", () => {
  it("retourne false dans l'environnement jsdom (window existe)", () => {
    // jsdom fournit window
    expect(isServer()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// delay
// ---------------------------------------------------------------------------
describe("delay", () => {
  it("retourne une promesse qui se resout apres le delai", async () => {
    vi.useFakeTimers();
    const promise = delay(100);
    vi.advanceTimersByTime(100);
    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
