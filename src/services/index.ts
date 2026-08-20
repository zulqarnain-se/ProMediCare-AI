/**
 * ProMediCare service layer (Member 3) — AI domain services.
 *
 * Feature modules should call these instead of importing Groq internals directly.
 * Current app still uses `@/lib/ai` until other members migrate imports.
 */
export { runSymptomScreening, runValidatedSymptomScreening } from "@/services/ai-prediction.service";
export type { ScreeningServiceResult } from "@/services/ai-prediction.service";
export { generateClinicalBrief } from "@/services/ai-clinical-brief.service";
export { getAiHealthStatus } from "@/services/ai-health.service";
export { validateSymptomIntake } from "@/services/ai-validation";
export type { IntakeValidationResult } from "@/services/ai-validation";
