import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

export async function writeReportBundle(reportDir, stamp, markdown, json) {
  await ensureDir(reportDir);
  await writeFile(join(reportDir, `${stamp}.md`), markdown, "utf8");
  await writeFile(join(reportDir, `${stamp}.json`), JSON.stringify(json, null, 2), "utf8");
}

export function bulletList(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Nessuno";
}

export function section(title, lines) {
  return `## ${title}\n${lines.join("\n")}`;
}
