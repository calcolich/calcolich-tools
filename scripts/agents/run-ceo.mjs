import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { runGrowthOperatingSystem } from './run-growth.mjs';

const ROOT = process.cwd();
const STATE_DIR = join(ROOT, 'growth/state');
const rules = JSON.parse(await readFile(join(ROOT, 'scripts/agents/shared/rule-sets.json'), 'utf8'));
const result = await runGrowthOperatingSystem(rules);
await mkdir(STATE_DIR, { recursive: true });
await writeFile(join(STATE_DIR, 'ceo.json'), JSON.stringify({ stamp: result.stamp, ceo: result.ceo }, null, 2), 'utf8');
console.log(result.ceo.report.markdown);
