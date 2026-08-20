import { expect, type Page } from "@playwright/test";

/** Assert the persistent AI decision-support disclaimer is visible. */
export async function expectAiDisclaimer(page: Page) {
  await expect(page.getByText(/decision support only/i).first()).toBeVisible();
}

/**
 * Complete the patient symptom-check happy path.
 * Accepts either a live Groq result or the safe degraded fallback UI.
 */
export async function runSymptomCheckFlow(page: Page) {
  await page.goto("/patient/symptom-check");
  await expect(page.getByRole("heading", { name: /symptom check/i })).toBeVisible();

  await page.getByRole("button", { name: "Chest pain", exact: true }).click();
  await page.getByRole("button", { name: "Fatigue", exact: true }).click();
  await page.getByRole("button", { name: /run ai screening/i }).click();

  await expect(page.getByRole("button", { name: /run another check/i })).toBeVisible({
    timeout: 60_000,
  });
  await expectAiDisclaimer(page);
}
