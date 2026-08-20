/**
 * ProMediCare AI module (Member 3).
 *
 * Server-only Groq integration: structured JSON, Zod validation, safe fallbacks.
 * Prefer `@/services` from feature actions; use this package for low-level AI calls.
 */
export {
  isGroqConfigured,
  fallbackPrediction,
  runSymptomPrediction,
  runClinicalBrief,
  verifyGroq,
} from "@/ai/groq-client";

export type {
  GroqResult,
  ChatMessage,
  SymptomPrediction,
  ClinicalBriefResult,
  AiHealthStatus,
} from "@/ai/types";

export {
  SYMPTOM_SYSTEM_PROMPT,
  CLINICAL_BRIEF_SYSTEM_PROMPT,
  buildSymptomUserPrompt,
  buildClinicalBriefUserPrompt,
} from "@/ai/prompts";
