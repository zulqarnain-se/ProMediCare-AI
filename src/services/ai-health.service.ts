import "server-only";
import { isGroqConfigured, verifyGroq } from "@/ai/groq-client";
import type { AiHealthStatus } from "@/ai/types";

/**
 * Diagnostic status for platform settings and `/api/ai/health`.
 * Never exposes the API key.
 */
export async function getAiHealthStatus(): Promise<AiHealthStatus> {
  if (!isGroqConfigured()) {
    return { configured: false, message: "GROQ_API_KEY is not set." };
  }

  const result = await verifyGroq();
  if (result.ok) {
    return { configured: true, ok: true, model: result.model };
  }
  return { configured: true, ok: false, error: result.error };
}
