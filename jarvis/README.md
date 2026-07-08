# Jarvis Inbox

This folder is the operating queue for Jarvis.

Giuseppe can communicate tasks to Jarvis in plain language. Jarvis or Codex then reads the task, executes it conservatively, and writes the result.

## Folders

- `inbox/`: new requests from Giuseppe.
- `working/`: tasks currently being handled.
- `outbox/`: completed task reports.
- `memory/`: reusable facts, decisions, and project notes.
- `second-brain/`: durable structured memory for Giuseppe, Calcolich, decisions, ideas, and lessons.

## Create A Task

From the project terminal:

```bash
npm run jarvis:task -- "Create a German calculator page for ..."
```

The command creates a task file in `jarvis/inbox/`.

## Operating Rule

Jarvis can execute broad tasks, but it must respect project safety:

- protect production;
- verify code before publishing;
- avoid destructive actions unless the target is explicit;
- do not touch `README 2.md`;
- do not store secrets or sensitive personal data in the Second Brain;
- ask for credentials or paid-account actions only when needed.

## Task Lifecycle

1. `inbox`: task received.
2. `working`: task accepted and being executed.
3. `outbox`: task completed with a short report.
