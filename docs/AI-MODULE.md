# ProMediCare AI Module (Member 3)

Decision support only — ProMediCare AI does **not** diagnose and does not replace a licensed clinician. The UI always renders a disclaimer; the model is never trusted to self-disclaim.

## Ownership

| Path | Role |
|------|------|
| [`src/ai/`](../src/ai/) | Low-level Groq client, prompts, shared AI types |
| [`src/services/`](../src/services/) | Domain services feature actions should call |

Repository: [https://github.com/zulqarnain-se/ProMediCare-AI](https://github.com/zulqarnain-se/ProMediCare-AI)

## Architecture

```
Feature actions (patient / doctor)
        │
        ▼
  @/services  (runSymptomScreening, generateClinicalBrief, getAiHealthStatus)
        │
        ▼
  @/ai        (runSymptomPrediction, runClinicalBrief, verifyGroq)
        │
        ▼
  Groq OpenAI-compatible API  →  Zod validate  →  fallback if needed
```

**Compatibility note:** The running app may still import `@/lib/ai` until other members migrate to `@/services` / `@/ai`. Both layers implement the same contracts.

## Environment

| Variable | Required | Default |
|----------|----------|---------|
| `GROQ_API_KEY` | For live AI | — (screening falls back if unset) |
| `GROQ_BASE_URL` | No | `https://api.groq.com/openai/v1` |
| `GROQ_MODEL` | No | `llama-3.3-70b-versatile` |

Never expose the API key to the browser. All Groq calls are `server-only`.

## Contracts

- Model returns **JSON only**; response is validated with Zod schemas in `src/schemas/prediction.ts` (`aiPredictionSchema`, `clinicalBriefSchema`).
- Symptom screening always returns a usable result (`degraded: true` when using the safe fallback).
- Clinical brief generation does **not** invent a silent success on failure.
- Recommended specialty is snapped to the allowed specialty list when the model drifts.

## Imports

```ts
// Preferred (Member 3 service layer)
import { runSymptomScreening, generateClinicalBrief, getAiHealthStatus } from "@/services";

// Low-level AI module
import { runSymptomPrediction, verifyGroq, isGroqConfigured } from "@/ai";
```

## Safety rules

1. No client-side Groq calls.
2. Never persist raw model JSON without Zod validation.
3. Log screenings to `predictions` from feature actions (audit / doctor review).
4. UI disclaimer is mandatory on every patient-facing AI surface.

See also: [ProMediCare-AI-Cursor-Prompt.md](./ProMediCare-AI-Cursor-Prompt.md) · [TESTING.md](./TESTING.md).
