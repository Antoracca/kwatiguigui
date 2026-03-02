import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { JobCard, type JobCardData } from "@/components/jobs/job-card";

// ---------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------
function makeJob(overrides: Partial<JobCardData> = {}): JobCardData {
  const futureDate = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString();
  return {
    id: "job-uuid-001",
    firstName: "Marie",
    age: 28,
    whatsapp: "+236 74 14 34 34",
    city: "Bangui",
    neighborhood: "Boy-Abe",
    jobType: "Aide menagere",
    experience: "5 ans d'experience en menage",
    userType: "seeker",
    isActive: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // il y a 2h
    expiresAt: futureDate,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("JobCard", () => {
  describe("contenu de base", () => {
    it("affiche le prenom et l'age", () => {
      render(<JobCard job={makeJob()} />);
      expect(screen.getByText(/Marie, 28 ans/)).toBeInTheDocument();
    });

    it("affiche le type d'emploi dans un badge", () => {
      render(<JobCard job={makeJob()} />);
      expect(screen.getByText("Aide menagere")).toBeInTheDocument();
    });

    it("affiche la ville et la region", () => {
      render(<JobCard job={makeJob()} />);
      // "Bangui" apparait plusieurs fois (ville + region), utiliser getAllByText
      const banGuiElements = screen.getAllByText(/Bangui/);
      expect(banGuiElements.length).toBeGreaterThanOrEqual(1);
    });

    it("affiche le quartier quand il est renseigne", () => {
      render(<JobCard job={makeJob()} />);
      expect(screen.getByText(/Boy-Abe/)).toBeInTheDocument();
    });

    it("n'affiche pas de quartier quand null", () => {
      render(<JobCard job={makeJob({ neighborhood: null })} />);
      // La virgule + quartier ne doit pas apparaitre
      expect(screen.queryByText(/,\s*null/)).not.toBeInTheDocument();
    });

    it("affiche l'experience/description quand fournie", () => {
      render(<JobCard job={makeJob()} />);
      expect(screen.getByText("5 ans d'experience en menage")).toBeInTheDocument();
    });

    it("n'affiche pas de paragraphe d'experience quand null", () => {
      render(<JobCard job={makeJob({ experience: null })} />);
      expect(screen.queryByText("5 ans d'experience en menage")).not.toBeInTheDocument();
    });

    it("contient un lien 'Voir le detail' vers /jobs/{id}", () => {
      render(<JobCard job={makeJob()} />);
      const link = screen.getByRole("link", { name: /voir le d.tail/i });
      expect(link).toHaveAttribute("href", "/jobs/job-uuid-001");
    });
  });

  describe("badge type utilisateur", () => {
    it("affiche 'Chercheur' pour userType=seeker", () => {
      render(<JobCard job={makeJob({ userType: "seeker" })} />);
      expect(screen.getByText("Chercheur")).toBeInTheDocument();
    });

    it("affiche 'Employeur' pour userType=employer", () => {
      render(<JobCard job={makeJob({ userType: "employer" })} />);
      expect(screen.getByText("Employeur")).toBeInTheDocument();
    });
  });

  describe("contact WhatsApp — utilisateur non-premium", () => {
    it("affiche l'overlay de verrouillage", () => {
      render(<JobCard job={makeJob()} isPremium={false} />);
      expect(screen.getByText("Abonnement requis")).toBeInTheDocument();
    });

    it("affiche un numero masque (+236 •• •• •• ••)", () => {
      render(<JobCard job={makeJob()} isPremium={false} />);
      expect(screen.getByText(/•• •• •• ••/)).toBeInTheDocument();
    });

    it("le lien 'Abonnement requis' pointe vers /dashboard/payment", () => {
      render(<JobCard job={makeJob()} isPremium={false} />);
      const link = screen.getByRole("link", { name: "Abonnement requis" });
      expect(link).toHaveAttribute("href", "/dashboard/payment");
    });

    it("n'affiche pas le bouton WhatsApp vert", () => {
      render(<JobCard job={makeJob()} isPremium={false} />);
      expect(screen.queryByText("Contacter via WhatsApp")).not.toBeInTheDocument();
    });
  });

  describe("contact WhatsApp — utilisateur premium", () => {
    it("affiche le bouton 'Contacter via WhatsApp' en vert", () => {
      render(<JobCard job={makeJob()} isPremium={true} />);
      expect(screen.getByText("Contacter via WhatsApp")).toBeInTheDocument();
    });

    it("le lien pointe vers wa.me avec le bon numero", () => {
      render(<JobCard job={makeJob({ whatsapp: "+236 74 14 34 34" })} isPremium={true} />);
      const link = screen.getByRole("link", { name: /whatsapp/i });
      expect(link).toHaveAttribute("href", "https://wa.me/23674143434");
    });

    it("le lien WhatsApp s'ouvre dans un nouvel onglet", () => {
      render(<JobCard job={makeJob()} isPremium={true} />);
      const link = screen.getByRole("link", { name: /whatsapp/i });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("n'affiche pas l'overlay de verrouillage", () => {
      render(<JobCard job={makeJob()} isPremium={true} />);
      expect(screen.queryByText("Abonnement requis")).not.toBeInTheDocument();
    });

    it("n'affiche pas le bouton WhatsApp si whatsapp est null meme pour premium", () => {
      render(<JobCard job={makeJob({ whatsapp: null })} isPremium={true} />);
      expect(screen.queryByText("Contacter via WhatsApp")).not.toBeInTheDocument();
    });
  });

  describe("badge d'expiration", () => {
    it("n'affiche pas le badge d'expiration quand reste > 5 jours", () => {
      const futureDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
      render(<JobCard job={makeJob({ expiresAt: futureDate })} />);
      expect(screen.queryByText(/expire dans/i)).not.toBeInTheDocument();
    });

    it("affiche le badge d'expiration quand reste <= 5 jours", () => {
      const soonDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
      render(<JobCard job={makeJob({ expiresAt: soonDate })} />);
      expect(screen.getByText(/expire dans 3j/i)).toBeInTheDocument();
    });

    it("affiche 'Expire dans 1j' a la derniere journee", () => {
      const tomorrow = new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString();
      render(<JobCard job={makeJob({ expiresAt: tomorrow })} />);
      expect(screen.getByText(/expire dans 1j/i)).toBeInTheDocument();
    });

    it("affiche le badge exactement a 5 jours restants", () => {
      const exactly5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 - 60000).toISOString();
      render(<JobCard job={makeJob({ expiresAt: exactly5Days })} />);
      expect(screen.getByText(/expire dans/i)).toBeInTheDocument();
    });
  });

  describe("carte featured", () => {
    it("ajoute la classe border-l-primary-500 quand featured=true", () => {
      const { container } = render(<JobCard job={makeJob()} featured={true} />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-l-primary-500");
    });

    it("n'ajoute pas la classe border-l quand featured=false", () => {
      const { container } = render(<JobCard job={makeJob()} featured={false} />);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass("border-l-primary-500");
    });
  });

  describe("avatar", () => {
    it("affiche l'initiale du prenom dans l'avatar", () => {
      render(<JobCard job={makeJob({ firstName: "Marie" })} />);
      // L'initiale M doit apparaitre
      const avatars = screen.getAllByText("M");
      expect(avatars.length).toBeGreaterThanOrEqual(1);
    });
  });
});
