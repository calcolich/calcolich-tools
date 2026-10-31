# Jarvis Agents

## Core

Receives goals, creates tasks, assigns agents, tracks status, sends evidence to Auditor, writes memory and decides next action.

## Tech Agent

Runs technical health checks using real project signals. V1 checks lint, Next config and lockfile presence.

## SEO Agent

Audits repository SEO evidence: sitemap, robots, site metadata and calculator SEO fields. V1 does not invent Google Search Console data.

## Content Agent

Ready for future DE, IT, FR and EN content checks. Social drafts are already exposed through `/social`.

## Data / Analytics Agent

Adapter-ready. It will use real analytics exports or configured services only when credentials are available.

## Monetization Agent

Ready for AdSense, affiliate and lead-generation evidence. It separates measured facts from opportunities.

## Auditor

Validates evidence independently from the executing agent. Critical or account-level work fails closed into human approval.
