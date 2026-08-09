import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { runQualityAgent } from "./quality-agent.mjs";
import { runRevenueAgent } from "./revenue-agent.mjs";
import { runSearchConsoleOpportunityAgent } from "./search-console-opportunity-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";
import { runTrafficIntelligenceAgent } from "./traffic-intelligence-agent.mjs";
import { runSocialTrafficAgent } from "./social-traffic-agent.mjs";
import { buildBacklogFromRanking, buildBacklogFromTraffic, buildGrowthBrief, dedupeBacklogItems, updateBacklogWithCeoDecision } from "./shared/growth.mjs";
import { todayStamp } from "./shared/scan-repo.mjs";
import { writeReportBundle } from "./shared/output.mjs";
import { runCeoAgent } from "./ceo-agent.mjs";

const ROOT = process.cwd();
const GROWTH_STATE_DIR = join(ROOT, "growth/state");
const GROWTH_REPORT_DIR = join(ROOT, "reports/growth");

export async function runGrowthOperatingSystem(rules, context = {}) {
  const stamp = todayStamp();
  rules._stamp = stamp;

  const searchConsole = context.searchConsole ?? (await runSearchConsoleOpportunityAgent(rules, { previous: null }));
  const seo = context.seo ?? (await runSeoAgent(rules, { previous: searchConsole }));
  const content = context.content ?? (await runContentDataAgent(rules, { previous: seo, searchConsole }));
  const monetization = context.monetization ?? (await runMonetizationAgent(rules, { previous: content, seo, searchConsole }));
  const revenue = context.revenue ?? (await runRevenueAgent(rules, { previous: monetization, seo, content, monetization, searchConsole }));
  const traffic = context.traffic ?? (await runTrafficIntelligenceAgent(rules, { previous: revenue, seo, content, monetization, revenue, searchConsole }));
  const social = context.social ?? (await runSocialTrafficAgent(rules, { previous: traffic, seo, content, monetization, revenue, traffic, searchConsole }));
  const quality = context.quality ?? (await runQualityAgent({ previous: social, seo, content, monetization, revenue, social, searchConsole }));
  const backlog = dedupeBacklogItems([
    ...buildBacklogFromRanking(revenue.ranking, stamp),
    ...buildBacklogFromTraffic(traffic, stamp),
  ]);
  const ceo = context.ceo ?? (await runCeoAgent(rules, { previous: quality, searchConsole, seo, content, monetization, revenue, social, traffic, quality, backlog }));
  const backlogFinal = updateBacklogWithCeoDecision(backlog, ceo.ceo ?? ceo, stamp);
  const ceoDailyMarkdown = ceo.dailyReport?.markdown ?? "";
  const brief = buildGrowthBrief({ stamp, searchConsole, seo, content, monetization, revenue, traffic, quality, social, ceo: ceo.ceo ?? ceo, backlog: backlogFinal });

  await mkdir(GROWTH_STATE_DIR, { recursive: true });
  await mkdir(GROWTH_REPORT_DIR, { recursive: true });
  await mkdir(join(ROOT, "reports"), { recursive: true });
  await writeFile(join(GROWTH_STATE_DIR, "backlog.json"), JSON.stringify(backlogFinal, null, 2), "utf8");
  await writeFile(
    join(GROWTH_STATE_DIR, "latest.json"),
    JSON.stringify({ stamp, seo, content, monetization, searchConsole, social, quality, revenue, ceo, backlog: backlogFinal, brief: brief.summary }, null, 2),
    "utf8",
  );
  if (ceoDailyMarkdown) {
    await writeFile(join(ROOT, "reports/ceo-daily.md"), ceoDailyMarkdown, "utf8");
    await writeFile(join(ROOT, "reports/ceo-daily.json"), JSON.stringify({ stamp, ceo: ceo.ceo ?? ceo }, null, 2), "utf8");
  }
  await writeReportBundle(GROWTH_REPORT_DIR, stamp, brief.markdown, {
    stamp,
    seo,
    content,
    monetization,
    searchConsole,
    social,
    quality,
    revenue,
    ceo,
    backlog: backlogFinal,
    summary: brief.summary,
  });

  return {
    stamp,
    seo,
    content,
    monetization,
    searchConsole,
    social,
    quality,
    revenue,
    traffic,
    ceo,
    backlog: backlogFinal,
    brief,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { readFile } = await import("node:fs/promises");
  const rules = JSON.parse(await readFile(join(ROOT, "scripts/agents/shared/rule-sets.json"), "utf8"));
  const result = await runGrowthOperatingSystem(rules);
  console.log(result.brief.markdown);
}
