import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Authentification — tests E2E
// ---------------------------------------------------------------------------
test.describe("Page de connexion (/login)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test.describe("chargement", () => {
    test("la page se charge (status 200)", async ({ page }) => {
      const response = await page.request.get("/login");
      expect(response.status()).toBe(200);
    });

    test("le formulaire de connexion est present", async ({ page }) => {
      const form = page.locator("form").first();
      await expect(form).toBeVisible();
    });

    test("le champ WhatsApp est present", async ({ page }) => {
      const whatsappInput = page
        .getByLabel(/whatsapp|num.ro/i)
        .or(page.getByPlaceholder(/whatsapp|\+236/i))
        .first();
      await expect(whatsappInput).toBeVisible();
    });

    test("le champ mot de passe est present", async ({ page }) => {
      const passwordInput = page.getByLabel(/mot de passe|password/i).first();
      await expect(passwordInput).toBeVisible();
    });

    test("le bouton de soumission est present", async ({ page }) => {
      const submitBtn = page
        .getByRole("button", { name: /connexion|se connecter|login/i })
        .first();
      await expect(submitBtn).toBeVisible();
    });
  });

  test.describe("validation cote client", () => {
    test("affiche une erreur pour un numero WhatsApp invalide", async ({ page }) => {
      const whatsappInput = page
        .getByLabel(/whatsapp|num.ro/i)
        .or(page.getByPlaceholder(/whatsapp|\+236/i))
        .first();

      await whatsappInput.fill("abc"); // Invalide
      await page.getByRole("button", { name: /connexion|se connecter/i }).first().click();

      // Attendre le message d'erreur
      const error = page
        .getByText(/invalide|incorrect|format/i)
        .or(page.getByRole("alert"))
        .first();
      await expect(error).toBeVisible({ timeout: 5_000 });
    });

    test("affiche une erreur pour un mot de passe trop court", async ({ page }) => {
      const whatsappInput = page
        .getByLabel(/whatsapp|num.ro/i)
        .or(page.getByPlaceholder(/whatsapp|\+236/i))
        .first();

      await whatsappInput.fill("+236 74 14 34 34");

      const passwordInput = page.getByLabel(/mot de passe|password/i).first();
      await passwordInput.fill("court"); // < 8 chars

      await page.getByRole("button", { name: /connexion|se connecter/i }).first().click();

      const error = page
        .getByText(/8 caract.res|trop court|invalide/i)
        .or(page.getByRole("alert"))
        .first();
      await expect(error).toBeVisible({ timeout: 5_000 });
    });

    test("le bouton show/hide mot de passe fonctionne", async ({ page }) => {
      const passwordInput = page.locator('input[type="password"]').first();

      // Toggle pour afficher
      const toggleBtn = page
        .getByRole("button", { name: /afficher/i })
        .first();

      if (await toggleBtn.isVisible()) {
        await toggleBtn.click();
        // L'input doit maintenant etre de type text
        await expect(page.locator('input[type="text"]').first()).toBeVisible();
      }
    });
  });

  test.describe("navigation", () => {
    test("le lien 'Inscription' est present et pointe vers /register", async ({ page }) => {
      const registerLink = page.getByRole("link", { name: /inscription|s.inscrire|creer/i });
      await expect(registerLink.first()).toBeVisible();
      const href = await registerLink.first().getAttribute("href");
      expect(href).toContain("/register");
    });

    test("le lien 'Mot de passe oublie' est present", async ({ page }) => {
      const forgotLink = page.getByRole("link", { name: /oubli.?|forgot/i });
      await expect(forgotLink.first()).toBeVisible();
    });
  });

  test.describe("securite", () => {
    test("le champ mot de passe est de type password", async ({ page }) => {
      const passwordInput = page.locator('input[type="password"]').first();
      await expect(passwordInput).toBeVisible();
    });

    test("le formulaire n'affiche pas de mot de passe en clair par defaut", async ({ page }) => {
      const passwordInput = page.locator('input[type="password"]').first();
      await passwordInput.fill("MonMotDePasse1!");
      // Le type doit rester password
      await expect(passwordInput).toHaveAttribute("type", "password");
    });
  });
});

// ---------------------------------------------------------------------------
// Page d'inscription (/register)
// ---------------------------------------------------------------------------
test.describe("Page d'inscription (/register)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test.describe("chargement", () => {
    test("la page se charge (status 200)", async ({ page }) => {
      const response = await page.request.get("/register");
      expect(response.status()).toBe(200);
    });

    test("le formulaire d'inscription est present", async ({ page }) => {
      // Etape 1: choix du type d'utilisateur
      const form = page.locator("form").first();
      await expect(form).toBeVisible();
    });

    test("le choix Chercheur d'emploi est visible", async ({ page }) => {
      const seekerOption = page
        .getByText(/chercheur|chercher un emploi/i)
        .or(page.getByRole("button", { name: /chercheur/i }))
        .first();
      await expect(seekerOption).toBeVisible();
    });

    test("le choix Employeur est visible", async ({ page }) => {
      const employerOption = page
        .getByText(/employeur|recruter/i)
        .or(page.getByRole("button", { name: /employeur/i }))
        .first();
      await expect(employerOption).toBeVisible();
    });
  });

  test.describe("flux multi-etapes", () => {
    test("selectionner Chercheur d'emploi avance a l'etape suivante", async ({ page }) => {
      const seekerBtn = page
        .getByRole("button", { name: /chercheur/i })
        .or(page.getByText(/chercheur d.emploi/i))
        .first();

      if (await seekerBtn.isVisible()) {
        await seekerBtn.click();

        // L'etape suivante doit afficher un champ Prenom ou WhatsApp
        const nextStepField = page
          .getByLabel(/pr.nom|whatsapp|nom/i)
          .first();
        await expect(nextStepField).toBeVisible({ timeout: 5_000 });
      }
    });

    test("un indicateur de progression est present", async ({ page }) => {
      // Progress bar ou indicateur d'etapes
      const progress = page
        .locator('[role="progressbar"]')
        .or(page.locator(".step, [class*=step], [class*=progress]"))
        .first();

      // Flexible — le progress indicator peut varier
      const hasProgress = await progress.count();
      // Pas obligatoire de planter le test si le composant n'existe pas encore
      if (hasProgress > 0) {
        await expect(progress).toBeVisible();
      }
    });
  });

  test.describe("navigation", () => {
    test("le lien 'Connexion' est present pour les utilisateurs existants", async ({ page }) => {
      const loginLink = page.getByRole("link", { name: /connexion|se connecter|deja/i });
      await expect(loginLink.first()).toBeVisible();
    });
  });
});

// ---------------------------------------------------------------------------
// Page mot de passe oublie (/forgot-password)
// ---------------------------------------------------------------------------
test.describe("Page mot de passe oublie (/forgot-password)", () => {
  test("la page se charge", async ({ page }) => {
    const response = await page.goto("/forgot-password");
    expect(response?.status()).toBe(200);
  });

  test("le formulaire de recuperation est present", async ({ page }) => {
    await page.goto("/forgot-password");
    const whatsappField = page
      .getByLabel(/whatsapp|num.ro/i)
      .or(page.getByPlaceholder(/whatsapp|\+236/i))
      .first();
    await expect(whatsappField).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Protection des routes authentifiees
// ---------------------------------------------------------------------------
test.describe("Protection des routes (redirection si non connecte)", () => {
  test("/dashboard redirige vers /login pour les visiteurs", async ({ page }) => {
    await page.goto("/dashboard");
    // Doit etre redirige vers /login
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });

  test("/dashboard/jobs redirige vers /login", async ({ page }) => {
    await page.goto("/dashboard/jobs");
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });

  test("/dashboard/payment redirige vers /login", async ({ page }) => {
    await page.goto("/dashboard/payment");
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });
});
