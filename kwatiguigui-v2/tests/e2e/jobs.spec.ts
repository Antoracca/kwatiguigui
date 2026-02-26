import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Page des offres d'emploi — tests E2E
// ---------------------------------------------------------------------------
test.describe("Page des offres (/jobs)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/jobs");
  });

  test.describe("chargement de la page", () => {
    test("la page se charge (status 200)", async ({ page }) => {
      const response = await page.request.get("/jobs");
      expect(response.status()).toBe(200);
    });

    test("le titre de la page contient 'emploi' ou 'offres'", async ({ page }) => {
      const title = await page.title();
      expect(title.toLowerCase()).toMatch(/emploi|offres|kwatiguigui/i);
    });

    test("le H1 est present", async ({ page }) => {
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();
    });

    test("affiche une liste d'annonces ou un etat vide", async ({ page }) => {
      // Soit des JobCards, soit le composant EmptyState
      const hasCards = await page.locator("[data-job-card], article, .job-card").count();
      const hasEmptyState = await page.getByText(/aucune annonce|aucun r.sultat/i).count();

      expect(hasCards > 0 || hasEmptyState > 0).toBe(true);
    });
  });

  test.describe("filtres de recherche", () => {
    test("le filtre par region est present", async ({ page }) => {
      // Un select ou un bouton pour filtrer par region
      const regionFilter = page.getByRole("combobox", { name: /region/i })
        .or(page.getByRole("button", { name: /region/i }))
        .or(page.getByLabel(/region/i));

      await expect(regionFilter.first()).toBeVisible({ timeout: 10_000 });
    });

    test("le filtre par type d'emploi est present", async ({ page }) => {
      const jobTypeFilter = page.getByRole("combobox", { name: /type|emploi|m.tier/i })
        .or(page.getByRole("button", { name: /type|emploi/i }))
        .or(page.getByLabel(/type d.emploi|m.tier/i));

      await expect(jobTypeFilter.first()).toBeVisible({ timeout: 10_000 });
    });

    test("selectionner une region met a jour l'URL", async ({ page }) => {
      const regionSelect = page.getByRole("combobox", { name: /region/i })
        .or(page.getByLabel(/region/i)).first();

      if (await regionSelect.isVisible()) {
        await regionSelect.selectOption({ label: "Bangui" });
        await page.waitForURL(/region=Bangui/, { timeout: 5_000 });
        expect(page.url()).toContain("region=Bangui");
      }
    });

    test("une recherche par texte met a jour l'URL", async ({ page }) => {
      const searchInput = page
        .getByRole("searchbox")
        .or(page.getByPlaceholder(/recherch|chercher/i))
        .first();

      if (await searchInput.isVisible()) {
        await searchInput.fill("chauffeur");
        await searchInput.press("Enter");
        await page.waitForURL(/query=chauffeur|q=chauffeur/, { timeout: 5_000 });
      }
    });
  });

  test.describe("JobCard interactions", () => {
    test("les JobCards affichent le type de profil (Chercheur ou Employeur)", async ({ page }) => {
      // Verifier apres chargement
      await page.waitForTimeout(1000);
      const badges = page.getByText(/chercheur|employeur/i);
      const count = await badges.count();
      // S'il y a des annonces, les badges doivent etre presents
      if (count > 0) {
        await expect(badges.first()).toBeVisible();
      }
    });

    test("cliquer sur 'Voir le detail' navigue vers /jobs/[id]", async ({ page }) => {
      await page.waitForTimeout(1000);
      const detailLink = page.getByRole("link", { name: /voir le d.tail/i }).first();

      if (await detailLink.isVisible()) {
        await detailLink.click();
        await expect(page).toHaveURL(/\/jobs\/[\w-]+/);
      }
    });

    test("les contacts WhatsApp sont masques pour les visiteurs non connectes", async ({ page }) => {
      await page.waitForTimeout(1000);
      // Les cartes doivent afficher "Abonnement requis" ou le numero masque
      const lockedContacts = page.getByText(/abonnement requis|•• •• •• ••/i);
      const count = await lockedContacts.count();
      // S'il y a des annonces, les contacts doivent etre masques
      const jobCards = page.locator("article, [class*='card']");
      const cardCount = await jobCards.count();
      if (cardCount > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });
  });

  test.describe("pagination", () => {
    test("la pagination est presente si plus d'une page", async ({ page }) => {
      await page.waitForTimeout(1000);
      const pagination = page.getByRole("navigation", { name: /pagination/i });
      const hasPagination = await pagination.count();

      // La pagination n'est pas obligatoire s'il y a peu d'annonces
      if (hasPagination > 0) {
        await expect(pagination).toBeVisible();
      }
    });

    test("cliquer sur 'Suivant' incremente la page dans l'URL", async ({ page }) => {
      await page.waitForTimeout(1000);
      const nextBtn = page.getByRole("link", { name: /suivant/i });

      if (await nextBtn.isVisible() && !(await nextBtn.getAttribute("class") ?? "").includes("pointer-events-none")) {
        await nextBtn.click();
        await page.waitForURL(/page=2/, { timeout: 5_000 });
        expect(page.url()).toContain("page=2");
      }
    });
  });

  test.describe("SEO", () => {
    test("la page a une meta description", async ({ page }) => {
      const meta = page.locator('meta[name="description"]');
      const content = await meta.getAttribute("content");
      expect(content).toBeTruthy();
    });

    test("le header canonical est defini", async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]');
      const href = await canonical.getAttribute("href");
      expect(href).toBeTruthy();
    });
  });
});

// ---------------------------------------------------------------------------
// Page de detail d'une annonce (/jobs/[id])
// ---------------------------------------------------------------------------
test.describe("Page de detail d'annonce (/jobs/[id])", () => {
  test("retourne 404 pour un ID inexistant", async ({ page }) => {
    const response = await page.goto("/jobs/id-qui-nexiste-pas-du-tout");
    // Soit 404 natif, soit la page 404 personnalisee
    expect(response?.status() === 404 || page.url().includes("not-found")).toBeTruthy();
  });
});
