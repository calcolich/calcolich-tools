# Decision Log

## 2026-07-08 - Jarvis Operating System

Decision:

- Create a Jarvis operating system inside the Calcolich repository.

Reason:

- Giuseppe wants Jarvis to become an assistant that can receive tasks, remember project context, and execute work with structure.

Result:

- Added `docs/jarvis/`.
- Added `jarvis/` task inbox workflow.
- Added Second Brain memory vault.

## 2026-06-21 - Static Locale Directories

Decision:

- Use static locale directories `/de`, `/it`, `/en`, `/fr`.

Reason:

- A dynamic language route would conflict with the existing root dynamic `[slug]` route.

Rule:

- Do not replace static locale directories with a dynamic `[lang]` route.

