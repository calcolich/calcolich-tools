import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildDailyReport } from "./daily-report-agent.mjs";
import { runGrowthOperatingSystem } from "./run-growth.mjs";
import { todayStamp } from "./shared/scan-repo.mjs";
import { writeReportBundle } from "./shared/output.mjs";

const rules = JSON.parse(await readFile(join(process.cwd(), "scripts/agents/shared/rule-sets.json"), "utf8"));
const stamp = todayStamp();

const growth = await runGrowthOperatingSystem(rules);
const report = buildDailyReport({
  stamp,
  seo: growth.seo,
  content: growth.content,
  monetization: growth.monetization,
  quality: growth.quality,
  searchConsole: growth.searchConsole,
  social: growth.social,
  ceo: growth.ceo,
  growth,
});
const reportDir = join(process.cwd(), "reports");
await writeReportBundle(reportDir, stamp, report.markdown, {
  stamp,
  seo: growth.seo,
  content: growth.content,
  monetization: growth.monetization,
  quality: growth.quality,
  searchConsole: growth.searchConsole,
  social: growth.social,
  ceo: growth.ceo,
  growth,
  summary: report.summary,
});

console.log(report.markdown);
