# Analytics exports

Place manual GA4 exports in `analytics/exports` before running traffic or analytics agents.

Supported formats:

- CSV
- JSON

Recommended columns:

- `page`
- `sessions`
- `users`
- `engagementRate`
- `conversions`
- `events`
- `previousSessions`
- `previousUsers`
- `previousConversions`

Jarvis treats these exports as measured facts. If no export is present, analytics remains in fallback mode and no traffic metric is invented.
