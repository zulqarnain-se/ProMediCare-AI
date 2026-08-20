import "server-only";
import { runSymptomPrediction } from "@/ai/groq-client";
import type { SymptomPrediction } from "@/ai/types";
import type { SymptomIntakeInput } from "@/schemas/prediction";
import { validateSymptomIntake } from "@/services/ai-validation";

export type ScreeningServiceResult =
  | { ok: true; data: SymptomPrediction }
  | { ok: false; error: string };

/**
 * Domain service for patient symptom risk screening.
 * Validates intake first, then calls the AI module.
 * Persistence (predictions table) stays in feature server actions.
 */
export async function runSymptomScreening(
  intake: SymptomIntakeInput,
  specialtyNames: string[] = [],
): Promise<SymptomPrediction> {
  return runSymptomPrediction(intake, specialtyNames);
}

/**
 * Validates unknown input, then runs screening. Prefer this when accepting
 * untrusted payloads at the service boundary.
 */
export async function runValidatedSymptomScreening(
  input: unknown,
  specialtyNames: string[] = [],
): Promise<ScreeningServiceResult> {
  const validated = validateSymptomIntake(input);
  if (!validated.ok) return { ok: false, error: validated.error };
  const data = await runSymptomPrediction(validated.data, specialtyNames);
  return { ok: true, data };
}
