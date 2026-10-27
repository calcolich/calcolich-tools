# Jarvis Engine v1 Architecture

Jarvis Engine v1 adds a lightweight operating layer to Calcolich without rewriting the existing Next.js site.

## Runtime

- Core module: `lib/jarvis-engine.mjs`
- Runtime state: `jarvis/runtime/state.json`
- Dashboard: `/jarvis`
- APIs: `/api/jarvis/*`
- Social status: `/social` and `/api/social/status`

## Agent Map

```text
            JARVIS CORE
                 |
-------------------------------------
|        |        |        |        |
TECH     SEO      CONTENT  DATA     MONETIZATION
\        |        |        |        /
              AUDITOR
                 |
               MEMORY
```

Jarvis coordinates work. Specialists produce evidence. Auditor decides whether the work is approved, needs changes, blocked, or requires human approval. Memory stores facts, events, decisions and learning.

## Persistence

The first version uses file-based JSON persistence because the project has no existing database. This keeps the V1 compatible with Vercel and avoids introducing heavy infrastructure too early.
