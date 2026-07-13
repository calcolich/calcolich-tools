# Agent Registry

This registry tracks agents Jarvis can create, coordinate, or recommend.

## Active Core Agent

### Jarvis Chief Agent

- Role: chief agent, operating assistant, and coordinator.
- Mission: receive Giuseppe's voice or text commands, read the second brain, decide the right specialist agent, create the execution task, and report back.
- Main project: Calcolich.
- Inputs: voice commands, text commands, task inbox, second brain, project files, business goals.
- Outputs: classified tasks, assigned agents, execution plans, memory notes, daily/weekly reviews.
- KPI: completed verified tasks, useful memory, shipped improvements, growth opportunities found, reduced dependence on Giuseppe's manual context.
- Rule: Jarvis is the only coordinator. Specialist agents do not operate independently without a task, KPI, and stop condition.
- Status: active.

## Planned Specialist Agents

### SEO Growth Agent

- Mission: find organic traffic opportunities and turn them into calculator/content briefs.
- Inputs: Search Console, sitemap, competitor research, current content.
- Outputs: page improvement plan, new calculator briefs, internal linking tasks.
- KPI: impressions, clicks, CTR, ranking improvements.
- Status: planned.

### Content Production Agent

- Mission: create useful content drafts for calculators, articles, FAQs, and snippets.
- Inputs: SEO briefs, official sources, existing page model.
- Outputs: page drafts, FAQ, examples, metadata.
- KPI: content shipped, indexed pages, quality score.
- Status: planned.

### Monetization Agent

- Mission: find and test monetization paths without damaging UX.
- Inputs: traffic pages, intent clusters, affiliate options, AdSense readiness.
- Outputs: monetization experiments, CTA plans, lead magnet ideas.
- KPI: revenue signal, CTA clicks, leads, affiliate clicks.
- Status: planned.

### Technical QA Agent

- Mission: protect production and verify builds, routes, metadata, sitemap, and mobile basics.
- Inputs: changed files, routes, deployments.
- Outputs: QA report, blocker list, deploy checklist.
- KPI: zero broken deploys, fewer SEO regressions.
- Status: planned.

### Business Scout Agent

- Mission: find new online business opportunities and cashflow sources.
- Inputs: market research, Giuseppe's skills, existing assets.
- Outputs: opportunity briefs, MVP plans, revenue model tests.
- KPI: validated opportunities, small experiments launched, cashflow potential.
- Status: planned.

### Trading Systems Agent

- Mission: support algorithmic trading bot research and system design.
- Inputs: strategy ideas, exchange constraints, risk rules, logs.
- Outputs: strategy briefs, risk plans, test checklists.
- KPI: verified backtests, risk controls, implementation readiness.
- Status: planned.

### Calcolich Growth Agent Stack

- SEO Agent: finds Swiss high-intent keywords, missing pages, weak metadata, duplicate titles, and isolated content.
- Content & Data Agent: checks formulas, thresholds, dates, official sources, and update cadence for DE and IT pages.
- Monetization Agent: ranks AdSense, affiliate, lead generation, and service opportunities against the CHF 1,500/month target.
- Quality Agent: runs lint, build, schema, sitemap, robots, translations, and link checks without risky automatic edits.
- Daily Report Agent: aggregates the other agents and writes the evening report into `reports/`.
- Status: active locally, lightweight, file-based.
