import type { AiPrediction, ClinicalBrief } from "@/schemas/prediction";

/** Result of a single Groq structured-output call. */
export type GroqResult<T> =
  | { ok: true; data: T; model: string }
  | { ok: false; error: string };

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/** Symptom screening outcome — always usable (may be degraded fallback). */
export type SymptomPrediction = {
  prediction: AiPrediction;
  model: string;
  degraded: boolean;
};

export type ClinicalBriefResult =
  | { ok: true; brief: ClinicalBrief; model: string }
  | { ok: false; error: string };

/** Diagnostic shape for AI health / settings UI. */
export type AiHealthStatus =
  | { configured: false; message: string }
  | { configured: true; ok: true; model: string }
  | { configured: true; ok: false; error: string };
