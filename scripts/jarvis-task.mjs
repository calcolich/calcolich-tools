import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const taskText = process.argv.slice(2).join(" ").trim();

if (!taskText) {
  console.error('Usage: npm run jarvis:task -- "Describe the task for Jarvis"');
  process.exit(1);
}

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, "-");
const slug = taskText
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 60) || "task";

const inboxDir = join(process.cwd(), "jarvis", "inbox");
mkdirSync(inboxDir, { recursive: true });

const filePath = join(inboxDir, `${stamp}-${slug}.md`);

const body = `# Jarvis Task

Status: inbox
Created: ${now.toISOString()}
Owner: Giuseppe

## Request

${taskText}

## Jarvis Interpretation

- Intent:
- Priority:
- Files or systems likely involved:
- Risks:

## Execution Plan

1.
2.
3.

## Result

-

## Verification

-
`;

writeFileSync(filePath, body);
console.log(filePath);

