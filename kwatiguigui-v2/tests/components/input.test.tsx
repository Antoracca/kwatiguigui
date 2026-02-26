import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Input } from "@/components/ui/input";

// ---------------------------------------------------------------------------
// Input component tests
// ---------------------------------------------------------------------------
describe("Input", () => {
  describe("rendu de base", () => {
    it("rend un element input", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("transmet le placeholder", () => {
      render(<Input placeholder="Votre numero WhatsApp" />);
      expect(screen.getByPlaceholderText("Votre numero WhatsApp")).toBeInTheDocument();
    });

    it("transmet la valeur via value + onChange", () => {
      const handleChange = vi.fn();
      render(<Input value="test" onChange={handleChange} />);
      expect(screen.getByDisplayValue("test")).toBeInTheDocument();
    });

    it("appelle onChange lors d'une saisie", () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("est desactive quand disabled=true", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
  });

  describe("label", () => {
    it("affiche le label quand fourni", () => {
      render(<Input label="Numero WhatsApp" />);
      expect(screen.getByText("Numero WhatsApp")).toBeInTheDocument();
    });

    it("n'affiche pas de label quand non fourni", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("label")).not.toBeInTheDocument();
    });

    it("le label est associe a l'input via htmlFor", () => {
      render(<Input label="Email" id="email-field" />);
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("for", "email-field");
    });
  });

  describe("message d'erreur", () => {
    it("affiche le message d'erreur quand error est fourni", () => {
      render(<Input error="Ce champ est requis" />);
      expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
    });

    it("le message d'erreur a role='alert'", () => {
      render(<Input error="Numero invalide" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("Numero invalide");
    });

    it("l'input a aria-invalid=true quand une erreur est presente", () => {
      render(<Input error="Champ requis" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("l'input a aria-invalid=false sans erreur", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
    });

    it("affiche l'icone AlertCircle avec le message d'erreur", () => {
      const { container } = render(<Input error="Erreur" />);
      // L'icone est un SVG dans le paragraphe d'erreur
      const errorParagraph = screen.getByRole("alert");
      const svg = errorParagraph.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("n'affiche pas de message d'erreur sans error prop", () => {
      render(<Input />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("texte d'aide (helperText)", () => {
    it("affiche le helperText quand fourni et pas d'erreur", () => {
      render(<Input helperText="Format: +236 XX XX XX XX" />);
      expect(screen.getByText("Format: +236 XX XX XX XX")).toBeInTheDocument();
    });

    it("n'affiche pas helperText si une erreur est presente", () => {
      render(<Input error="Erreur" helperText="Aide" />);
      expect(screen.queryByText("Aide")).not.toBeInTheDocument();
    });
  });

  describe("icones gauche et droite", () => {
    it("affiche l'icone gauche", () => {
      render(<Input leftIcon={<span data-testid="left-icon">L</span>} />);
      // On cherche via le contenu du wrapper
      expect(screen.getByText("L")).toBeInTheDocument();
    });

    it("affiche l'icone droite (hors type=password)", () => {
      render(<Input rightIcon={<span data-testid="right-icon">R</span>} />);
      expect(screen.getByText("R")).toBeInTheDocument();
    });
  });

  describe("champ mot de passe", () => {
    it("le type est 'password' par defaut pour un champ mot de passe", () => {
      render(<Input type="password" />);
      // L'input n'est pas accessible par role="textbox" car type=password
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it("affiche le bouton pour montrer/masquer le mot de passe", () => {
      render(<Input type="password" />);
      expect(screen.getByRole("button", { name: /afficher/i })).toBeInTheDocument();
    });

    it("bascule en type 'text' quand on clique pour afficher", () => {
      render(<Input type="password" />);
      const toggleBtn = screen.getByRole("button", { name: /afficher/i });
      fireEvent.click(toggleBtn);
      // Maintenant l'input doit etre de type text
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "text");
    });

    it("l'aria-label du bouton change apres le clic (Masquer)", () => {
      render(<Input type="password" />);
      const toggleBtn = screen.getByRole("button", { name: /afficher le mot de passe/i });
      fireEvent.click(toggleBtn);
      expect(screen.getByRole("button", { name: /masquer le mot de passe/i })).toBeInTheDocument();
    });

    it("rebascule en type 'password' au second clic", () => {
      render(<Input type="password" />);
      const toggleBtn = screen.getByRole("button");
      fireEvent.click(toggleBtn);
      fireEvent.click(screen.getByRole("button"));
      const input = document.querySelector("input");
      expect(input).toHaveAttribute("type", "password");
    });

    it("n'affiche pas rightIcon pour un champ password (toggle prend la priorite)", () => {
      render(
        <Input type="password" rightIcon={<span>CUSTOM_RIGHT</span>} />,
      );
      expect(screen.queryByText("CUSTOM_RIGHT")).not.toBeInTheDocument();
    });
  });

  describe("accessibilite", () => {
    it("l'input est decrit par le message d'erreur via aria-describedby", () => {
      render(<Input id="phone" error="Numero invalide" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "phone-error");
    });

    it("l'input est decrit par le helperText via aria-describedby", () => {
      render(<Input id="phone" helperText="Format attendu" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "phone-helper");
    });
  });
});
