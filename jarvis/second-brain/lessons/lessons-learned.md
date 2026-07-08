# Lessons Learned

## Static Locale Directories With Root Dynamic Route

Context:

- Calcolich uses a root dynamic `[slug]` route and multilingual routes.

Lesson:

- Use static locale directories `/de`, `/it`, `/en`, `/fr`.

Rule:

- Do not use a dynamic `[lang]` segment in this project because it can conflict with root dynamic routing.

## Local Jarvis Task Queue Privacy

Context:

- Giuseppe needs to communicate freely with Jarvis.

Lesson:

- The structure of the task queue can be versioned, but actual task messages should stay local unless intentionally shared.

Rule:

- Keep `jarvis/inbox/*.md`, `jarvis/working/*.md`, and `jarvis/outbox/*.md` ignored by git.

