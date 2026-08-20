import { symptomIntakeSchema, type SymptomIntakeInput } from "@/schemas/prediction";

export type IntakeValidationResult =
  | { ok: true; data: SymptomIntakeInput }
  | { ok: false; error: string };

/**
 * Validates patient symptom intake at the service layer before any Groq call.
 * Feature actions can reuse this when migrating off ad-hoc Zod parses.
 */
export function validateSymptomIntake(input: unknown): IntakeValidationResult {
  const parsed = symptomIntakeSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid symptom intake",
    };
  }
  return { ok: true, data: parsed.data };
}
