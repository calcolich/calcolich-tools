import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { runQualityAgent } from "./quality-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";
import { runSocialTrafficAgent } from "./social-traffic-agent.mjs";

const rules = JSON.parse(await readFile(join(process.cwd(), "scripts/agents/shared/rule-sets.json"), "utf8"));

const seo = await runSeoAgent(rules);
const content = await runContentDataAgent(rules);
const monetization = await runMonetizationAgent(rules);
const quality = await runQualityAgent();

const social = await runSocialTrafficAgent(rules, { seo, content, monetization, quality });

console.log(social.report.markdown);
