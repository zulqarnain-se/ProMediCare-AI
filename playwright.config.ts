import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config for ProMediCare AI (Member 3).
 *
 * Local:  builds then serves via webServer against localhost.
 * Live:   set PLAYWRIGHT_BASE_URL=https://<app>.vercel.app to test the
 *         deployed site (webServer is skipped automatically).
 */
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const isExternal = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "chromium",
      dependencies: ["setup"],
      testIgnore: [/auth\.setup\.ts/],
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: isExternal
    ? undefined
    : {
        // Build first so a clean clone can run `npm run test:e2e` without a prior build step.
        command: "npm run build && npm run start",
        url: "http://localhost:3000",
        timeout: 300_000,
        reuseExistingServer: !process.env.CI,
      },
});
