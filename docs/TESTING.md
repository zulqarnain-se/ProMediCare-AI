# ProMediCare Testing Guide (Member 3)

End-to-end coverage uses [Playwright](https://playwright.dev/). Repository: [https://github.com/zulqarnain-se/ProMediCare-AI](https://github.com/zulqarnain-se/ProMediCare-AI)

## Prerequisites

1. Node.js 20.6+
2. `.env.local` configured (Supabase + optional `GROQ_*`)
3. Demo data seeded: `npm run seed`
4. Install deps and Chromium:

```bash
npm install
npm run test:e2e:install
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Headless Playwright (builds + starts app locally) |
| `npm run test:e2e:ui` | Interactive Playwright UI |
| `npm run test:e2e:report` | Open last HTML report |
| `npm run test:e2e:install` | Install Chromium for Playwright |

Against a deployed URL (skips local webServer):

```bash
PLAYWRIGHT_BASE_URL=https://promedicare.vercel.app npm run test:e2e
```

## Auth setup

[`e2e/auth.setup.ts`](../e2e/auth.setup.ts) logs in each seeded role and writes storage state under `e2e/.auth/` (gitignored). Role suites load those files via `test.use({ storageState })`.

Demo password: `Promedicare#2026` (see [`e2e/constants.ts`](../e2e/constants.ts)).

## Suite map

| File | Coverage |
|------|----------|
| `auth.setup.ts` | Role logins → storage state |
| `smoke.spec.ts` | Per-role nav routes render |
| `visitor.spec.ts` | Marketing + public record lookup |
| `patient.spec.ts` | Patient portal + AI screening |
| `ai.spec.ts` | Focused AI screening + disclaimer |
| `doctor.spec.ts` | Doctor schedule / patients / AI reviews |
| `reception.spec.ts` | Reception queue / walk-in dialog |
| `admin.spec.ts` | Hospital admin screens |
| `platform.spec.ts` | Super admin + AI settings status |
| `locale.spec.ts` | EN / Urdu locale behavior |
| `helpers.ts` | Shared AI disclaimer + symptom-check helpers |

## AI tests

AI E2E **does not require** a live `GROQ_API_KEY`. The UI must show a result (live or safe fallback) and the decision-support disclaimer.

## Config notes

[`playwright.config.ts`](../playwright.config.ts):

- Single Chromium project; depends on `setup`
- Local `webServer`: `npm run build && npm run start`
- External mode when `PLAYWRIGHT_BASE_URL` is set

See also: [AI Module](./AI-MODULE.md).
