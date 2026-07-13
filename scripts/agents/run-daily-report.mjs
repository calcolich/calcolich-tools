import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildDailyReport } from "./daily-report-agent.mjs";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { runQualityAgent } from "./quality-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";
import { todayStamp } from "./shared/scan-repo.mjs";
import { writeReportBundle } from "./shared/output.mjs";

const rules = JSON.parse(await readFile(join(process.cwd(), "scripts/agents/shared/rule-sets.json"), "utf8"));
const stamp = todayStamp();

const seo = await runSeoAgent(rules);
const content = await runContentDataAgent(rules);
const monetization = await runMonetizationAgent(rules);
const quality = await runQualityAgent();

const report = buildDailyReport({ stamp, seo, content, monetization, quality });
const reportDir = join(process.cwd(), "reports");
await writeReportBundle(reportDir, stamp, report.markdown, {
  stamp,
  seo,
  content,
  monetization,
  quality,
  summary: report.summary,
});

console.log(report.markdown);
