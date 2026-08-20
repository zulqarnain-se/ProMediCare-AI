import { test, expect } from "@playwright/test";
import { stateFile } from "./constants";
import { expectAiDisclaimer, runSymptomCheckFlow } from "./helpers";

/**
 * Focused AI screening E2E (Member 3).
 * Does not require a live GROQ_API_KEY — fallback UI is accepted.
 */
test.use({ storageState: stateFile("patient") });

test.describe("AI symptom screening", () => {
  test("patient can run screening and sees disclaimer", async ({ page }) => {
    test.setTimeout(90_000);
    await runSymptomCheckFlow(page);
    await expect(page.getByText(/recommended specialty|general medicine|cardiology/i).first()).toBeVisible();
  });

  test("screenings history remains reachable after a check", async ({ page }) => {
    test.setTimeout(90_000);
    await runSymptomCheckFlow(page);
    await page.goto("/patient/screenings");
    await expect(page.getByRole("heading", { name: /screenings/i })).toBeVisible();
    await expectAiDisclaimer(page);
  });
});
