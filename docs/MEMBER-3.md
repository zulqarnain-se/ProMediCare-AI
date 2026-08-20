# Member 3 — Contribution Guide

**Role:** AI Module, Testing & Documentation  
**GitHub collaborator identity:** `hassaanfareedi`  
**Repository:** [zulqarnain-se/ProMediCare-AI](https://github.com/zulqarnain-se/ProMediCare-AI) (owned by `zulqarnain-se`)

## Owned paths

Commit only these Member 3 surfaces:

- `src/ai/`
- `src/services/`
- `e2e/`
- `playwright.config.ts`
- `docs/`
- `package.json` / `package-lock.json`

Do **not** overwrite other members’ feature modules (`src/features/**`, `src/lib/ai/**`, app routes) unless the team agrees on a migration PR.

## Modules

| Path | Purpose |
|------|---------|
| [`src/ai/`](../src/ai/) | Groq client, prompts, specialty snap, types |
| [`src/services/`](../src/services/) | Domain services + intake validation |
| [`e2e/`](../e2e/) | Playwright role + AI suites |
| [`docs/AI-MODULE.md`](./AI-MODULE.md) | AI architecture |
| [`docs/TESTING.md`](./TESTING.md) | How to run E2E |

## Imports for other members

```ts
import { runSymptomScreening, validateSymptomIntake, getAiHealthStatus } from "@/services";
import { runSymptomPrediction, snapSpecialtyToAllowed } from "@/ai";
```

Until portals migrate, the live app may still import `@/lib/ai` — keep contracts aligned.

## Collaboration notes

- Author commits as **your** GitHub user (`hassaanfareedi`) so Contributors credits you on the owner’s repo.
- Prefer focused commits (AI / services / e2e / docs / scripts) over one giant dump.
- Decision support only — never ship patient AI UI without the disclaimer.

## Related docs

- [AI-MODULE.md](./AI-MODULE.md)
- [TESTING.md](./TESTING.md)
- [ProMediCare-AI-Cursor-Prompt.md](./ProMediCare-AI-Cursor-Prompt.md)
