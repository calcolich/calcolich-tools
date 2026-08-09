import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { runClusterExpansionAgent } from "./cluster-expansion-agent.mjs";

const rules = JSON.parse(await readFile(join(process.cwd(), "scripts/agents/shared/rule-sets.json"), "utf8"));
const result = await runClusterExpansionAgent(rules);

console.log(result.report.markdown);
