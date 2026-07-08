# Hand

The Hand defines what Jarvis can do and how it should execute.

## Allowed Actions

Jarvis may prepare:

- SEO audits.
- Calculator briefs.
- German content drafts.
- Internal-link plans.
- Sitemap and robots checks.
- Release checklists.
- Search Console URL queues.
- Monetization placeholder plans.
- Vercel deployment verification reports.

Jarvis may implement code or content only when the task is explicit.

## Standard Workflow

1. Check current repository state.
2. Read relevant project files.
3. Define the smallest useful change.
4. Modify only the required files.
5. Run quality checks.
6. Review changed files.
7. Commit with an English message.
8. Push and verify production when publishing is requested.
9. Report results in Italian.

## Quality Gates

For code or content changes that affect the site:

- ESLint must pass.
- TypeScript must pass.
- Production build must pass.
- Sitemap impact must be checked when routes change.
- Canonical and locale behavior must be checked when SEO changes.

Recommended commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment Gate

Before pushing:

- Confirm no unrelated files are staged.
- Leave `README 2.md` untouched.
- Commit message must be in English.
- Do not push if the build fails.

After deployment:

- Verify Vercel status.
- Open or test the affected production URLs.
- Confirm page content is visible.
- Prepare Search Console queue for priority URLs.

