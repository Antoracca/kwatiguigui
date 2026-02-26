import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration for KWATIGUIGUI V2.
 * Run: npx playwright test
 * UI mode: npx playwright test --ui
 */
export default defineConfig({
  // Location of E2E test files
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Parallel workers (fewer on CI for stability)
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["list"],
  ],

  // Global settings for all tests
  use: {
    // Base URL — local dev server
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",

    // Capture trace on first retry
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure
    video: "retain-on-failure",

    // Navigation timeout
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
  },

  // Test projects — browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    // Mobile Chrome for responsive testing
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  // Start the Next.js dev server before E2E tests (only in non-CI)
  webServer: process.env.CI
    ? undefined
    : {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 120_000,
      },

  // Output directory for test artifacts
  outputDir: "playwright-results",
});
