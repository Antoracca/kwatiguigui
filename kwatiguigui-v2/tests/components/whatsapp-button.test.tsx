import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { WhatsAppButton } from "@/components/ui/whatsapp-button";

// ---------------------------------------------------------------------------
// WhatsAppButton component tests
// ---------------------------------------------------------------------------
describe("WhatsAppButton", () => {
  describe("generation du lien wa.me", () => {
    it("genere un lien wa.me correct pour un numero international", () => {
      render(<WhatsAppButton number="+236 74 14 34 34" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://wa.me/23674143434");
    });

    it("genere un lien wa.me correct pour un numero sans prefixe +", () => {
      render(<WhatsAppButton number="23674143434" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://wa.me/23674143434");
    });

    it("supprime les espaces et tirets du numero", () => {
      render(<WhatsAppButton number="+236-74-14-34-34" />);
      const link = screen.getByRole("link");
      expect(link.getAttribute("href")).toBe("https://wa.me/23674143434");
    });

    it("ajoute ?text= si message est fourni", () => {
      const message = "Bonjour, je vous contacte depuis KWATIGUIGUI";
      render(<WhatsAppButton number="+23674143434" message={message} />);
      const link = screen.getByRole("link");
      const href = link.getAttribute("href") ?? "";
      expect(href).toContain("?text=");
      expect(href).toContain(encodeURIComponent(message));
    });

    it("encode correctement les caracteres speciaux dans le message", () => {
      const message = "Bonjour & merci!";
      render(<WhatsAppButton number="+23674143434" message={message} />);
      const href = screen.getByRole("link").getAttribute("href") ?? "";
      expect(href).toContain(encodeURIComponent("Bonjour & merci!"));
    });

    it("n'ajoute pas ?text= si pas de message", () => {
      render(<WhatsAppButton number="+23674143434" />);
      const href = screen.getByRole("link").getAttribute("href") ?? "";
      expect(href).not.toContain("?text=");
    });
  });

  describe("ouverture dans un nouvel onglet", () => {
    it("a target='_blank'", () => {
      render(<WhatsAppButton number="+23674143434" />);
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("a rel='noopener noreferrer' pour la securite", () => {
      render(<WhatsAppButton number="+23674143434" />);
      expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("variante full (defaut)", () => {
    it("affiche le label 'WhatsApp' par defaut", () => {
      render(<WhatsAppButton number="+23674143434" />);
      expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    });

    it("affiche un label personnalise", () => {
      render(<WhatsAppButton number="+23674143434" label="Contacter" />);
      expect(screen.getByText("Contacter")).toBeInTheDocument();
    });

    it("a un aria-label egal au label", () => {
      render(<WhatsAppButton number="+23674143434" label="Contacter" />);
      expect(screen.getByRole("link", { name: "Contacter" })).toBeInTheDocument();
    });
  });

  describe("variante icon", () => {
    it("n'affiche pas de texte en variante icon", () => {
      render(<WhatsAppButton number="+23674143434" variant="icon" />);
      expect(screen.queryByText("WhatsApp")).not.toBeInTheDocument();
    });

    it("a un aria-label qui inclut le numero en variante icon", () => {
      render(<WhatsAppButton number="+23674143434" variant="icon" />);
      const link = screen.getByRole("link");
      expect(link.getAttribute("aria-label")).toContain("+23674143434");
    });
  });

  describe("tailles", () => {
    it("taille sm applique la bonne hauteur", () => {
      render(<WhatsAppButton number="+23674143434" size="sm" />);
      expect(screen.getByRole("link")).toHaveClass("h-9");
    });

    it("taille md (defaut) applique la bonne hauteur", () => {
      render(<WhatsAppButton number="+23674143434" size="md" />);
      expect(screen.getByRole("link")).toHaveClass("h-11");
    });

    it("taille lg applique la bonne hauteur", () => {
      render(<WhatsAppButton number="+23674143434" size="lg" />);
      expect(screen.getByRole("link")).toHaveClass("h-12");
    });
  });

  describe("style", () => {
    it("a la couleur verte WhatsApp (#25D366)", () => {
      render(<WhatsAppButton number="+23674143434" />);
      expect(screen.getByRole("link")).toHaveClass("bg-[#25D366]");
    });

    it("est arrondi (pill shape)", () => {
      render(<WhatsAppButton number="+23674143434" />);
      expect(screen.getByRole("link")).toHaveClass("rounded-full");
    });

    it("accepte une className supplementaire", () => {
      render(<WhatsAppButton number="+23674143434" className="custom-btn" />);
      expect(screen.getByRole("link")).toHaveClass("custom-btn");
    });
  });

  describe("icone SVG", () => {
    it("rend une icone SVG WhatsApp", () => {
      const { container } = render(<WhatsAppButton number="+23674143434" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
});
