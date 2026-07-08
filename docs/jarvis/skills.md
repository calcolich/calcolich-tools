# Skills

These are reusable Jarvis playbooks.

## /seo-audit

Purpose: inspect one route or a group of routes.

Steps:

1. Check title and meta description.
2. Check canonical.
3. Check lang and hreflang.
4. Check H1.
5. Check internal links.
6. Check schema.
7. Check sitemap inclusion.
8. Report issues by priority.

## /calculator-brief

Purpose: prepare a new calculator page before implementation.

Required fields:

- Locale.
- Slug.
- Search intent.
- Category.
- SEO title.
- Meta description.
- H1.
- Inputs.
- Formula.
- Example.
- FAQ.
- Related calculators.
- Monetization angle.

## /content-plan

Purpose: plan support articles based on calculator opportunities.

Steps:

1. Pick target calculator.
2. Identify long-tail query.
3. Define article title and slug.
4. Define internal links.
5. Define FAQ.
6. Define publishing priority.

## /deploy-check

Purpose: verify production after publishing.

Checklist:

- Deployment is ready.
- Affected URLs return status 200.
- Content is visible.
- No obvious console errors.
- Mobile layout is acceptable.
- Sitemap includes new routes when applicable.

## /search-console-queue

Purpose: prepare URLs for manual indexing.

Output format:

```text
1. https://www.calcolich.ch/...
2. https://www.calcolich.ch/...
```

## /daily-brief

Purpose: summarize what Jarvis should do today.

Output:

- Yesterday's progress.
- Current risk.
- Highest-value action.
- URLs to inspect.
- Work block proposal.

## /growth-review

Purpose: run a weekly marketing and optimization review.

Steps:

1. Review Search Console data.
2. Identify pages with impressions but low CTR.
3. Identify pages ranking 8-20.
4. Identify queries without matching pages.
5. Pick one page improvement.
6. Pick one new content or calculator opportunity.
7. Update the weekly growth review.

## /experiment-brief

Purpose: define one optimization test.

Required fields:

- hypothesis;
- target page or cluster;
- change;
- success metric;
- baseline;
- expected duration;
- rollback rule.
