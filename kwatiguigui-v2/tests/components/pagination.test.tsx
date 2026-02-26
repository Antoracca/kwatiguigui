import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { PaginationWithLinks } from "@/components/ui/pagination";

// ---------------------------------------------------------------------------
// PaginationWithLinks component tests
// ---------------------------------------------------------------------------
describe("PaginationWithLinks", () => {
  const baseUrl = "/jobs";

  describe("rendu conditionnel", () => {
    it("ne rend rien quand totalPages <= 1", () => {
      const { container } = render(
        <PaginationWithLinks currentPage={1} totalPages={1} baseUrl={baseUrl} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("ne rend rien quand totalPages = 0", () => {
      const { container } = render(
        <PaginationWithLinks currentPage={1} totalPages={0} baseUrl={baseUrl} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("rend la pagination quand totalPages >= 2", () => {
      render(
        <PaginationWithLinks currentPage={1} totalPages={5} baseUrl={baseUrl} />,
      );
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  describe("navigation Precedent / Suivant", () => {
    it("affiche le bouton 'Precedent'", () => {
      render(
        <PaginationWithLinks currentPage={2} totalPages={5} baseUrl={baseUrl} />,
      );
      expect(screen.getByText("Precedent")).toBeInTheDocument();
    });

    it("affiche le bouton 'Suivant'", () => {
      render(
        <PaginationWithLinks currentPage={2} totalPages={5} baseUrl={baseUrl} />,
      );
      expect(screen.getByText("Suivant")).toBeInTheDocument();
    });

    it("'Precedent' est desactive a la page 1 (pointer-events-none)", () => {
      render(
        <PaginationWithLinks currentPage={1} totalPages={5} baseUrl={baseUrl} />,
      );
      const prevLink = screen.getByText("Precedent").closest("a");
      expect(prevLink).toHaveClass("pointer-events-none");
      expect(prevLink).toHaveClass("opacity-50");
    });

    it("'Suivant' est desactive a la derniere page", () => {
      render(
        <PaginationWithLinks currentPage={5} totalPages={5} baseUrl={baseUrl} />,
      );
      const nextLink = screen.getByText("Suivant").closest("a");
      expect(nextLink).toHaveClass("pointer-events-none");
      expect(nextLink).toHaveClass("opacity-50");
    });

    it("'Precedent' n'est pas desactive si pas en page 1", () => {
      render(
        <PaginationWithLinks currentPage={3} totalPages={5} baseUrl={baseUrl} />,
      );
      const prevLink = screen.getByText("Precedent").closest("a");
      expect(prevLink).not.toHaveClass("pointer-events-none");
    });

    it("'Suivant' n'est pas desactive si pas a la derniere page", () => {
      render(
        <PaginationWithLinks currentPage={3} totalPages={5} baseUrl={baseUrl} />,
      );
      const nextLink = screen.getByText("Suivant").closest("a");
      expect(nextLink).not.toHaveClass("pointer-events-none");
    });
  });

  describe("liens de navigation", () => {
    it("le lien 'Precedent' pointe vers la page precedente", () => {
      render(
        <PaginationWithLinks currentPage={3} totalPages={5} baseUrl={baseUrl} />,
      );
      const prevLink = screen.getByText("Precedent").closest("a");
      expect(prevLink?.getAttribute("href")).toContain("page=2");
    });

    it("le lien 'Suivant' pointe vers la page suivante", () => {
      render(
        <PaginationWithLinks currentPage={3} totalPages={5} baseUrl={baseUrl} />,
      );
      const nextLink = screen.getByText("Suivant").closest("a");
      expect(nextLink?.getAttribute("href")).toContain("page=4");
    });

    it("'Precedent' reste sur page=1 quand on est a page 1", () => {
      render(
        <PaginationWithLinks currentPage={1} totalPages={5} baseUrl={baseUrl} />,
      );
      const prevLink = screen.getByText("Precedent").closest("a");
      expect(prevLink?.getAttribute("href")).toContain("page=1");
    });

    it("'Suivant' reste sur la derniere page quand on y est", () => {
      render(
        <PaginationWithLinks currentPage={5} totalPages={5} baseUrl={baseUrl} />,
      );
      const nextLink = screen.getByText("Suivant").closest("a");
      expect(nextLink?.getAttribute("href")).toContain("page=5");
    });
  });

  describe("numeros de page", () => {
    it("affiche toutes les pages pour un petit total (1-5)", () => {
      render(
        <PaginationWithLinks currentPage={1} totalPages={5} baseUrl={baseUrl} />,
      );
      // Les pages 1 a 5 doivent etre presentes
      expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "5" })).toBeInTheDocument();
    });

    it("la page active a aria-current='page'", () => {
      render(
        <PaginationWithLinks currentPage={3} totalPages={5} baseUrl={baseUrl} />,
      );
      // On cherche le lien avec aria-current=page
      const activeLink = screen.getByRole("link", { current: "page" });
      expect(activeLink).toHaveTextContent("3");
    });

    it("la page active a la classe bg-primary-500", () => {
      render(
        <PaginationWithLinks currentPage={2} totalPages={5} baseUrl={baseUrl} />,
      );
      const activeLink = screen.getByRole("link", { current: "page" });
      expect(activeLink).toHaveClass("bg-primary-500");
    });

    it("les autres pages n'ont pas aria-current", () => {
      // currentPage=3, totalPages=5 => pages: 1, 2, 3(active), 4, 5
      render(
        <PaginationWithLinks currentPage={3} totalPages={5} baseUrl={baseUrl} />,
      );
      // Page 2 est presente et n'est pas active
      const link2 = screen.getByRole("link", { name: "2" });
      expect(link2).not.toHaveAttribute("aria-current");
    });
  });

  describe("ellipsis", () => {
    it("affiche une ellipsis pour un grand nombre de pages", () => {
      render(
        <PaginationWithLinks currentPage={5} totalPages={10} baseUrl={baseUrl} />,
      );
      // L'ellipsis est un element MoreHorizontal (svg dans un span)
      const nav = screen.getByRole("navigation");
      const items = nav.querySelectorAll("li");
      // Doit avoir des elements ellipsis
      expect(items.length).toBeGreaterThan(5);
    });

    it("n'affiche pas d'ellipsis pour un petit nombre de pages", () => {
      const { container } = render(
        <PaginationWithLinks currentPage={1} totalPages={3} baseUrl={baseUrl} />,
      );
      // Aucun SVG d'ellipsis (MoreHorizontal)
      const nav = screen.getByRole("navigation");
      // On verifie qu'il n'y a pas d'elements non-numeriques non-boutons
      // Pour 3 pages : Precedent, 1, 2, 3, Suivant = 5 items
      const links = nav.querySelectorAll("a");
      expect(links.length).toBe(5); // prev + 3 pages + next
    });
  });

  describe("parametre pageParam personnalise", () => {
    it("utilise le parametre personnalise dans les URLs", () => {
      render(
        <PaginationWithLinks
          currentPage={2}
          totalPages={5}
          baseUrl={baseUrl}
          pageParam="p"
        />,
      );
      const prevLink = screen.getByText("Precedent").closest("a");
      expect(prevLink?.getAttribute("href")).toContain("p=1");
    });
  });

  describe("role d'accessibilite", () => {
    it("a role='navigation' et aria-label='Pagination'", () => {
      render(
        <PaginationWithLinks currentPage={1} totalPages={5} baseUrl={baseUrl} />,
      );
      const nav = screen.getByRole("navigation", { name: "Pagination" });
      expect(nav).toBeInTheDocument();
    });
  });
});
