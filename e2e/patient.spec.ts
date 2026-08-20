import { test, expect } from "@playwright/test";
import { stateFile } from "./constants";
import { expectAiDisclaimer, runSymptomCheckFlow } from "./helpers";

test.use({ storageState: stateFile("patient") });

test.describe("Patient portal", () => {
  test("dashboard loads for the seeded patient", async ({ page }) => {
    await page.goto("/patient");
    await expect(page).toHaveURL(/\/patient$/);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("appointments page shows the seeded upcoming appointment", async ({ page }) => {
    await page.goto("/patient/appointments");
    await expect(page.getByRole("heading", { name: /appointments/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /upcoming/i })).toBeVisible();
    await expect(page.getByText(/Dr\. Dua Rahman/i)).toBeVisible();
  });

  test("screenings page shows the seeded screening", async ({ page }) => {
    await page.goto("/patient/screenings");
    await expect(page.getByRole("heading", { name: /screenings/i })).toBeVisible();
    await expect(page.getByText(/cardiology/i).first()).toBeVisible();
  });

  test("profile page loads and is editable", async ({ page }) => {
    await page.goto("/patient/profile");
    await expect(page.getByRole("heading", { name: /profile/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /save/i })).toBeVisible();
  });

  test("AI symptom screening runs end to end", async ({ page }) => {
    test.setTimeout(90_000);
    // Live Groq or safe fallback — both must show result + disclaimer.
    await runSymptomCheckFlow(page);
    await expectAiDisclaimer(page);
  });

  test("booking wizard starts at hospital selection", async ({ page }) => {
    await page.goto("/patient/appointments/new");
    await expect(page.getByRole("heading", { name: /book an appointment/i })).toBeVisible();
    // Step 1 lists the seeded hospital to choose from.
    await expect(page.getByText(/central care hospital/i).first()).toBeVisible();
  });
});
