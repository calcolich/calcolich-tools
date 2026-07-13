# Calcolich Agents

This project uses a lightweight local agent stack to support continuous growth without external paid services or complex infrastructure.

## Agents

### SEO Agent

- Finds high-intent Swiss keywords.
- Checks missing, weak, duplicate, or isolated pages.
- Reviews title, description, canonical, hreflang, and internal links.
- Assigns high, medium, or low priority.

### Content & Data Agent

- Checks formulas, thresholds, dates, and official sources.
- Flags content that should be updated.
- Suggests improvements for DE and IT pages.
- Never invents data.

### Monetization Agent

- Identifies AdSense, affiliate, lead, and service opportunities.
- Scores potential, difficulty, risk, and time to implement.
- Keeps the target of CHF 1,500/month visible.

### Quality Agent

- Verifies calculators, links, translations, schema markup, sitemap, and robots.
- Runs `npm run lint` and `npm run build`.
- Reports issues without making risky automatic changes.

### Daily Report Agent

- Aggregates the other agents.
- Writes a nightly report in `reports/`.
- Summarizes completed work, issues, monetization opportunities, next action, impact, and progress toward the revenue target.

## File Layout

- `scripts/agents/run-daily-report.mjs`
- `scripts/agents/seo-agent.mjs`
- `scripts/agents/content-data-agent.mjs`
- `scripts/agents/monetization-agent.mjs`
- `scripts/agents/quality-agent.mjs`
- `scripts/agents/daily-report-agent.mjs`
- `scripts/agents/shared/scan-repo.mjs`
- `scripts/agents/shared/output.mjs`
- `scripts/agents/shared/rule-sets.json`
- `reports/`

## Command

Run the evening report with:

```bash
npm run agents:daily
```

This writes:

- `reports/YYYY-MM-DD.md`
- `reports/YYYY-MM-DD.json`

## Operating Notes

- No deployment or push happens automatically.
- No extra runtime dependency was added.
- Reports are generated from the repository state and the latest local build artifacts when present.
- Missing external analytics data is reported as a gap, not invented.
