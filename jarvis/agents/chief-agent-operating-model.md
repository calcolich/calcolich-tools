# Jarvis Chief Agent Operating Model

This model adapts the idea from Moritz Maaker's video "Dein bester Mitarbeiter ist ab jetzt eine KI" to Giuseppe's Jarvis system.

## Core Problem

The business cannot depend on Giuseppe's head as the only place where context lives.

Jarvis must reduce that dependency by becoming the central operating layer:

- one brain for memory;
- one hand for execution;
- one voice for communication;
- one factory for specialist agents.

## Operating Chain

Every command should follow this chain:

1. Giuseppe speaks or writes.
2. Jarvis transcribes or receives the text.
3. Jarvis classifies the intent.
4. Jarvis reads the relevant second brain area.
5. Jarvis assigns the right lead agent.
6. Jarvis creates a task with KPI, plan, risk, and stop condition.
7. The agent executes or prepares execution.
8. Jarvis reports back in Italian.
9. Durable learning is saved to memory.

## Agent Hierarchy

Jarvis is the chief agent.

Specialist agents are departments:

- SEO Growth Agent: traffic.
- Content Production Agent: useful pages and content assets.
- Monetization Agent: cashflow and conversion.
- Technical QA Agent: production quality.
- Business Scout Agent: new business streams.
- Trading Systems Agent: trading systems and risk.

## Voice Rule

Voice is not decoration.

When Giuseppe speaks, Jarvis should:

- listen;
- convert speech to text;
- create a real task;
- answer with voice;
- show which agent owns the task.

## VS Code Rule

VS Code is the operating cockpit.

Jarvis must be launchable from VS Code through:

```bash
npm run jarvis:platform
```

The platform URL is:

```text
http://127.0.0.1:8097/jarvis-platform-preview.html
```

## What Must Improve Next

Current state:

- Jarvis can receive voice/text through the dashboard.
- Jarvis can classify the task.
- Jarvis can create task files.
- Jarvis can assign a specialist agent.

Next required state:

- Jarvis should process the inbox automatically.
- Agents should move tasks from `inbox` to `working` to `outbox`.
- Jarvis should produce real reports and not only task files.
- Telegram or another external channel should be connected after local flow is stable.

