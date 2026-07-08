# Jarvis Second Brain

This is the structured memory vault for Jarvis.

It stores durable context that Jarvis should use before executing important work: who Giuseppe is, what the business goals are, what decisions were made, what projects exist, what routines matter, and what lessons were learned.

## Main Rule

Jarvis should read the Second Brain before making strategic decisions.

Jarvis should update it only with useful, reusable information. Do not store passwords, API keys, private payment data, or sensitive personal documents here.

## Structure

- `00-index.md`: main map of the vault.
- `identity/`: Giuseppe profile, preferences, working style.
- `business/`: goals, offers, revenue logic, monetization.
- `projects/`: active project memory.
- `decisions/`: important decisions and why they were made.
- `contacts/`: public-safe contact notes and relationship context.
- `ideas/`: ideas, backlog, experiments.
- `lessons/`: reusable lessons learned.
- `sources/`: trusted sources and reference links.
- `templates/`: reusable note formats.
- `inbox/`: temporary raw memories to classify before saving permanently.

## Quick Memory Command

```bash
npm run jarvis:remember -- "Remember that ..."
```

This creates a local note in `jarvis/second-brain/inbox/`. Inbox memory notes are ignored by git until they are cleaned and moved into the correct permanent file.

## Update Principle

Every note should answer at least one of these questions:

- What should Jarvis remember next time?
- What decision should not be repeated from zero?
- What context changes how Jarvis acts?
- What opportunity should be revisited later?
