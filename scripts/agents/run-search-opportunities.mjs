import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { runSearchConsoleOpportunityAgent } from "./search-console-opportunity-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";

const rules = JSON.parse(await readFile(join(process.cwd(), "scripts/agents/shared/rule-sets.json"), "utf8"));

const seo = await runSeoAgent(rules);
const content = await runContentDataAgent(rules);
const monetization = await runMonetizationAgent(rules);
const result = await runSearchConsoleOpportunityAgent(rules, { seo, content, monetization });

console.log(`Search Console Opportunity Agent (${result.dataMode})`);
console.log(result.report.markdown);
