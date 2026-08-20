import "server-only";
import { runClinicalBrief } from "@/ai/groq-client";
import type { ClinicalBriefResult } from "@/ai/types";
import type { AiPrediction } from "@/schemas/prediction";
import type { ParsedScreeningIntake } from "@/features/patient/intake-parser";

/**
 * Domain service for clinician-oriented briefs from a stored screening.
 * Does not silently invent a brief when the model fails.
 */
export async function generateClinicalBrief(args: {
  intake: ParsedScreeningIntake;
  prediction: AiPrediction;
}): Promise<ClinicalBriefResult> {
  return runClinicalBrief(args);
}
