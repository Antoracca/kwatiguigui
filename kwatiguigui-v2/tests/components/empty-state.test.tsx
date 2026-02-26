import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Briefcase, Search } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";

// ---------------------------------------------------------------------------
// EmptyState component tests
// ---------------------------------------------------------------------------
describe("EmptyState", () => {
  describe("contenu de base", () => {
    it("affiche le titre", () => {
      render(<EmptyState title="Aucune annonce disponible" />);
      expect(
        screen.getByRole("heading", { name: "Aucune annonce disponible" }),
      ).toBeInTheDocument();
    });

    it("affiche la description quand fournie", () => {
      render(
        <EmptyState
          title="Aucune annonce"
          description="Publiez votre premiere annonce pour etre visible."
        />,
      );
      expect(
        screen.getByText("Publiez votre premiere annonce pour etre visible."),
      ).toBeInTheDocument();
    });

    it("n'affiche pas de description quand non fournie", () => {
      render(<EmptyState title="Aucune annonce" />);
      // Seul le titre doit etre present
      expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
    });
  });

  describe("icone", () => {
    it("affiche l'icone quand fournie", () => {
      const { container } = render(
        <EmptyState icon={Briefcase} title="Aucune annonce" />,
      );
      // L'icone Lucide est rendue comme SVG
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("n'affiche pas d'icone quand non fournie", () => {
      const { container } = render(<EmptyState title="Aucune annonce" />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeInTheDocument();
    });

    it("accepte differentes icones Lucide", () => {
      const { container: c1 } = render(<EmptyState icon={Briefcase} title="Test" />);
      const { container: c2 } = render(<EmptyState icon={Search} title="Test" />);
      // Les deux doivent avoir un SVG
      expect(c1.querySelector("svg")).toBeInTheDocument();
      expect(c2.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("action CTA — bouton (onClick)", () => {
    it("affiche le bouton quand action.onClick est fourni", () => {
      render(
        <EmptyState
          title="Aucune annonce"
          action={{ label: "Publier une annonce", onClick: vi.fn() }}
        />,
      );
      expect(
        screen.getByRole("button", { name: "Publier une annonce" }),
      ).toBeInTheDocument();
    });

    it("appelle onClick quand le bouton est clique", () => {
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="Aucune annonce"
          action={{ label: "Publier", onClick: handleClick }}
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Publier" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("le bouton a la classe rounded-full", () => {
      render(
        <EmptyState
          title="Aucune annonce"
          action={{ label: "Publier", onClick: vi.fn() }}
        />,
      );
      expect(screen.getByRole("button")).toHaveClass("rounded-full");
    });
  });

  describe("action CTA — lien (href)", () => {
    it("affiche un lien <a> quand action.href est fourni", () => {
      render(
        <EmptyState
          title="Aucune annonce"
          action={{ label: "Voir les offres", href: "/jobs" }}
        />,
      );
      const link = screen.getByRole("link", { name: "Voir les offres" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/jobs");
    });

    it("le lien a la classe rounded-full", () => {
      render(
        <EmptyState
          title="Aucune annonce"
          action={{ label: "Voir", href: "/jobs" }}
        />,
      );
      expect(screen.getByRole("link")).toHaveClass("rounded-full");
    });

    it("prefere href sur onClick — rend un lien <a> si les deux sont fournis", () => {
      render(
        <EmptyState
          title="Test"
          action={{ label: "Cliquer", href: "/target", onClick: vi.fn() }}
        />,
      );
      // href prend la priorite — doit etre un <a>
      const link = screen.getByRole("link", { name: "Cliquer" });
      expect(link).toBeInTheDocument();
    });
  });

  describe("sans action", () => {
    it("n'affiche pas de bouton ni de lien si pas d'action", () => {
      render(<EmptyState title="Aucune annonce" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("classes personnalisees", () => {
    it("applique className sur le conteneur", () => {
      const { container } = render(
        <EmptyState title="Test" className="custom-empty" />,
      );
      expect(container.firstChild).toHaveClass("custom-empty");
    });

    it("le conteneur a la classe text-center", () => {
      const { container } = render(<EmptyState title="Test" />);
      expect(container.firstChild).toHaveClass("text-center");
    });
  });

  describe("structure HTML", () => {
    it("le titre est un h3", () => {
      render(<EmptyState title="Titre de test" />);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Titre de test");
    });
  });
});
