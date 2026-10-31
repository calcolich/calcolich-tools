# Jarvis Operations

## Dashboard

Open `/jarvis` to see:

- system health
- agent states
- running, queued and completed tasks
- approvals
- activity feed
- next action

## APIs

- `GET /api/jarvis/status`
- `GET /api/jarvis/agents`
- `GET /api/jarvis/tasks`
- `POST /api/jarvis/tasks`
- `GET /api/jarvis/activity`
- `GET /api/jarvis/approvals`
- `GET /api/jarvis/integrations`
- `POST /api/jarvis/approvals/:id/approve`
- `POST /api/jarvis/approvals/:id/reject`
- `POST /api/jarvis/run`

## Workflows

Run a workflow by posting to `/api/jarvis/run` with:

```json
{ "kind": "seo" }
```

or:

```json
{ "kind": "tech" }
```

## Safety

Jarvis stores no secrets. External services are represented as adapters until real credentials are configured.

For local persistence, Jarvis writes to `jarvis/runtime/state.json`. In serverless/read-only environments, set `JARVIS_STATE_PATH` to a writable mounted path or keep the default `/tmp` fallback for non-critical runtime smoke checks.

## Notifications

Set `JARVIS_NOTIFICATION_WEBHOOK_URL` to enable outgoing Jarvis notifications. If `JARVIS_NOTIFICATION_SECRET` is present, Jarvis sends it as `x-calcolich-secret`.

The dashboard chat can run a notification test with: `Testa notifiche`.

## Finish Remaining Integrations

Use `docs/jarvis/FINISHING-PACK.md` as the concrete checklist for Search Console, Analytics, AdSense, GitHub, Vercel, notifications and social publishing.
