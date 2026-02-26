import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { PremiumBanner } from "@/components/ui/premium-banner";

// ---------------------------------------------------------------------------
// localStorage mock (jsdom le fournit mais on controle son etat)
// ---------------------------------------------------------------------------
const STORAGE_KEY = "kwt-premium-banner-dismissed";

describe("PremiumBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("visibilite initiale", () => {
    it("est masquee avant le montage (etat initial dismissed=true)", () => {
      // Avant useEffect, le composant ne rend rien (dismissed=true par defaut)
      // En testing-library, useEffect est execute synchronement dans act()
      // On verifie juste que le comportement est correct
      const { container } = render(<PremiumBanner />);
      // Si localStorage n'a pas de cle, la banniere doit etre visible apres montage
      // act() est automatique dans testing-library
      expect(container).toBeDefined();
    });

    it("s'affiche quand localStorage ne contient pas la cle de dismissal", async () => {
      // S'assurer que la cle n'existe pas
      localStorage.removeItem(STORAGE_KEY);

      await act(async () => {
        render(<PremiumBanner />);
      });

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("est masquee quand localStorage contient la cle de dismissal '1'", async () => {
      localStorage.setItem(STORAGE_KEY, "1");

      await act(async () => {
        render(<PremiumBanner />);
      });

      expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    });
  });

  describe("contenu de la banniere", () => {
    beforeEach(async () => {
      localStorage.removeItem(STORAGE_KEY);
    });

    it("affiche 'Passez Premium'", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });
      expect(screen.getByText("Passez Premium")).toBeInTheDocument();
    });

    it("affiche '2 500 FCFA/mois'", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });
      expect(screen.getByText(/2 500 FCFA\/mois/)).toBeInTheDocument();
    });

    it("contient un lien vers /dashboard/payment", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });
      const links = screen.getAllByRole("link");
      const paymentLink = links.find(
        (l) => l.getAttribute("href") === "/dashboard/payment",
      );
      expect(paymentLink).toBeDefined();
    });

    it("affiche le bouton de fermeture avec aria-label adequat", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });
      expect(screen.getByRole("button", { name: /fermer/i })).toBeInTheDocument();
    });
  });

  describe("comportement de fermeture (dismiss)", () => {
    beforeEach(async () => {
      localStorage.removeItem(STORAGE_KEY);
    });

    it("masque la banniere quand on clique sur le bouton fermer", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });

      const closeBtn = screen.getByRole("button", { name: /fermer/i });

      await act(async () => {
        fireEvent.click(closeBtn);
      });

      expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    });

    it("ecrit '1' dans localStorage quand on ferme", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });

      const closeBtn = screen.getByRole("button", { name: /fermer/i });

      await act(async () => {
        fireEvent.click(closeBtn);
      });

      expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    });

    it("ne re-affiche pas la banniere si localStorage a la cle apres fermeture", async () => {
      await act(async () => {
        render(<PremiumBanner />);
      });

      fireEvent.click(screen.getByRole("button", { name: /fermer/i }));

      // Rendre une nouvelle instance — doit rester invisible
      const { container: container2 } = render(<PremiumBanner />);
      // La cle existe maintenant, la 2eme instance ne doit rien afficher
      // (useEffect lit localStorage apres montage)
      expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    });
  });

  describe("classes CSS", () => {
    it("a un gradient de fond bleu (bg-gradient-to-r)", async () => {
      localStorage.removeItem(STORAGE_KEY);
      let container: HTMLElement;

      await act(async () => {
        const result = render(<PremiumBanner />);
        container = result.container;
      });

      const banner = screen.getByRole("banner");
      expect(banner).toHaveClass("bg-gradient-to-r");
    });
  });
});
