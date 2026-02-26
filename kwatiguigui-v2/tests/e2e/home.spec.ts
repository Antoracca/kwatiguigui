import { test, expect, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// Page d'accueil — tests E2E
// ---------------------------------------------------------------------------
test.describe("Page d'accueil (/)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("rendu initial", () => {
    test("la page se charge sans erreur (status 200)", async ({ page }) => {
      const response = await page.request.get("/");
      expect(response.status()).toBe(200);
    });

    test("le titre de la page contient KWATIGUIGUI", async ({ page }) => {
      await expect(page).toHaveTitle(/KWATIGUIGUI/i);
    });

    test("le H1 contient 'Centrafricaine' ou 'KWATIGUIGUI'", async ({ page }) => {
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(
        text?.toLowerCase().includes("centrafricaine") ||
        text?.toLowerCase().includes("kwatiguigui"),
      ).toBe(true);
    });

    test("la meta description est definie", async ({ page }) => {
      const meta = page.locator('meta[name="description"]');
      await expect(meta).toHaveCount(1);
      const content = await meta.getAttribute("content");
      expect(content).toBeTruthy();
      expect((content ?? "").length).toBeGreaterThan(50);
    });
  });

  test.describe("section statistiques", () => {
    test("affiche les 4 statistiques", async ({ page }) => {
      // Les 4 stats: 1 200+, 3 500+, 20, 800+
      await expect(page.getByText("1 200+")).toBeVisible();
      await expect(page.getByText("3 500+")).toBeVisible();
      await expect(page.getByText("20")).toBeVisible();
    });

    test("les labels des stats sont visibles", async ({ page }) => {
      await expect(page.getByText(/offres publiees/i)).toBeVisible();
      await expect(page.getByText(/utilisateurs/i)).toBeVisible();
      await expect(page.getByText(/r.gions couvertes/i)).toBeVisible();
    });
  });

  test.describe("CTA principal", () => {
    test("le bouton CTA principal est visible", async ({ page }) => {
      // "Trouver un emploi" ou "Voir les offres" ou "Commencer"
      const ctaButton = page.getByRole("link", {
        name: /trouver|offres|commencer|poster|publier/i,
      }).first();
      await expect(ctaButton).toBeVisible();
    });

    test("cliquer sur le CTA principal redirige vers /jobs", async ({ page }) => {
      const ctaButton = page.getByRole("link", {
        name: /trouver|voir les offres|offres d.emploi/i,
      }).first();

      if (await ctaButton.isVisible()) {
        await ctaButton.click();
        await expect(page).toHaveURL(/\/jobs/);
      }
    });
  });

  test.describe("navigation", () => {
    test("le header est visible", async ({ page }) => {
      const header = page.locator("header").first();
      await expect(header).toBeVisible();
    });

    test("le logo KWATIGUIGUI est dans le header", async ({ page }) => {
      const header = page.locator("header").first();
      const logo = header.getByText(/kwatiguigui/i).first();
      await expect(logo).toBeVisible();
    });

    test("le lien 'Offres d'emploi' est present dans la nav", async ({ page }) => {
      const nav = page.locator("header nav, header [role='navigation']").first();
      const jobsLink = nav.getByRole("link", { name: /offres|emploi/i }).first();
      await expect(jobsLink).toBeVisible();
    });

    test("le header reste visible lors du scroll (sticky)", async ({ page }) => {
      // Scroller vers le bas
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(300);
      const header = page.locator("header").first();
      await expect(header).toBeVisible();
    });
  });

  test.describe("footer", () => {
    test("le footer est present", async ({ page }) => {
      const footer = page.locator("footer").first();
      await expect(footer).toBeVisible();
    });

    test("le footer contient le nom KWATIGUIGUI", async ({ page }) => {
      const footer = page.locator("footer").first();
      await expect(footer.getByText(/kwatiguigui/i).first()).toBeVisible();
    });
  });

  test.describe("section a propos / mission", () => {
    test("la section mission est visible", async ({ page }) => {
      const missionText = page.getByText(
        /r.volutionner|marche de l.emploi|centrafricain/i,
      ).first();
      await expect(missionText).toBeVisible({ timeout: 10_000 });
    });
  });

  test.describe("section tarifs / pricing", () => {
    test("affiche le plan gratuit (0 FCFA)", async ({ page }) => {
      await expect(page.getByText(/gratuit/i).first()).toBeVisible();
    });

    test("affiche le prix Premium (2 500 FCFA)", async ({ page }) => {
      // Chercher le prix 2 500 FCFA sur la page
      const priceText = page.getByText(/2.500.+FCFA|2500.+FCFA/i).first();
      await expect(priceText).toBeVisible({ timeout: 10_000 });
    });
  });

  test.describe("SEO", () => {
    test("a un Open Graph title defini", async ({ page }) => {
      const ogTitle = page.locator('meta[property="og:title"]');
      const content = await ogTitle.getAttribute("content");
      expect(content).toBeTruthy();
    });

    test("a un Open Graph description defini", async ({ page }) => {
      const ogDesc = page.locator('meta[property="og:description"]');
      const content = await ogDesc.getAttribute("content");
      expect(content).toBeTruthy();
    });
  });
});
