import "server-only";
import { runSymptomPrediction } from "@/ai/groq-client";
import type { SymptomPrediction } from "@/ai/types";
import type { SymptomIntakeInput } from "@/schemas/prediction";

/**
 * Domain service for patient symptom risk screening.
 * Persistence (predictions table) stays in feature server actions.
 */
export async function runSymptomScreening(
  intake: SymptomIntakeInput,
  specialtyNames: string[] = [],
): Promise<SymptomPrediction> {
  return runSymptomPrediction(intake, specialtyNames);
}
