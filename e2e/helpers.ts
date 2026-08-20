import { expect, type Page } from "@playwright/test";

/** Assert the persistent AI decision-support disclaimer is visible. */
export async function expectAiDisclaimer(page: Page) {
  await expect(page.getByText(/decision support only/i).first()).toBeVisible();
}

/**
 * Assert screening result UI is present (live Groq or safe fallback).
 * Looks for risk level labels and specialty recommendation copy.
 */
export async function expectScreeningResult(page: Page) {
  await expect(page.getByRole("button", { name: /run another check/i })).toBeVisible();
  await expect(
    page.getByText(/low|medium|high|urgent|risk|recommended specialty|general medicine|cardiology/i).first(),
  ).toBeVisible();
  await expectAiDisclaimer(page);
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
  await expectScreeningResult(page);
}
