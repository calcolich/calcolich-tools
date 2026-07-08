import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const noteText = process.argv.slice(2).join(" ").trim();

if (!noteText) {
  console.error('Usage: npm run jarvis:remember -- "Memory Jarvis should keep"');
  process.exit(1);
}

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, "-");
const slug = noteText
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 60) || "memory";

const memoryDir = join(process.cwd(), "jarvis", "second-brain", "inbox");
mkdirSync(memoryDir, { recursive: true });

const filePath = join(memoryDir, `${stamp}-${slug}.md`);

const body = `# Memory Inbox Note

Created: ${now.toISOString()}
Status: inbox

## Raw Memory

${noteText}

## Classification

- Area:
- Project:
- Durable rule:
- Should update:

## Processed Result

-
`;

writeFileSync(filePath, body);
console.log(filePath);

