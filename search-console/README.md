# Search Console exports

Place manual Google Search Console exports in this folder before running:

```bash
npm run agents:search-opportunities
```

Supported formats:
- CSV
- JSON

Required columns:
- `page`
- `query`
- `clicks`
- `impressions`
- `ctr`
- `position`

Optional columns:
- `previousClicks`
- `previousImpressions`
- `previousCtr`
- `previousPosition`
- `indexStatus`
- `ctaPresent`
- `internalLinks`
- `guideLinks`

Files in this folder are ignored by git. The agent uses them when present and falls back to repository signals when no export is available.
