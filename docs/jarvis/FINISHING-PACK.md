# Jarvis Finishing Pack

Questo file contiene il resto da completare per chiudere Jarvis Engine oltre alla V1 locale gia funzionante.

## Stato attuale

Funziona gia:

- `/jarvis`
- `/jarvis/report`
- `/social`
- `/api/jarvis/status`
- `/api/jarvis/agents`
- `/api/jarvis/tasks`
- `/api/jarvis/activity`
- `/api/jarvis/approvals`
- `/api/jarvis/run`
- `/api/social/status`
- SEO audit repository
- Tech health check
- Auditor
- memoria runtime
- approval inbox
- activity feed

## Cose da collegare per finirlo

### 1. Google Search Console

Obiettivo: usare dati reali su query, impression, click, CTR e posizione.

Serve:

- proprieta verificata `https://www.calcolich.ch`
- accesso Search Console
- metodo export CSV oppure API

Env future:

```text
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.calcolich.ch
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
```

Prima implementazione consigliata: import manuale CSV in `search-console/exports`.

### 2. Google Analytics

Obiettivo: leggere pagine migliori, trend, conversioni e anomalie.

Serve:

- GA4 property ID
- accesso API oppure export

Env future:

```text
GA4_PROPERTY_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
```

### 3. AdSense

Obiettivo: leggere readiness, slot, rendimento e opportunita monetizzazione.

Gia previsti:

```text
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT=
NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT=
```

Da completare:

- publisher ID reale
- slot reali
- verifica `ads.txt`

### 4. GitHub

Obiettivo: aprire issue/task tecnici, leggere PR, associare commit e audit.

Serve:

```text
GITHUB_TOKEN=
GITHUB_REPOSITORY=
```

Regola: Jarvis puo preparare issue e branch, ma non deve fare merge o push rischiosi senza approvazione.

### 5. Vercel

Obiettivo: controllare deploy, build status, env e preview.

Serve:

```text
VERCEL_TOKEN=
VERCEL_PROJECT_ID=
VERCEL_TEAM_ID=
```

Regola: produzione e rollback richiedono approval.

### 6. Social publishing

Obiettivo: passare da bozze social a pubblicazione o scheduling.

Canali gia preparati:

- Facebook
- LinkedIn
- Instagram
- TikTok
- YouTube Shorts

Serve scegliere lo strumento:

- pubblicazione manuale dai file `social-content`
- Buffer/Later/Metricool
- API native dei social
- Make/Zapier con webhook

Env future generiche:

```text
SOCIAL_PUBLISHING_WEBHOOK_URL=
SOCIAL_PUBLISHING_SECRET=
```

Regola: pubblicazione esterna sempre `APPROVAL`.

### 7. Notifiche

Obiettivo: Jarvis avvisa quando ci sono errori, approval o opportunita.

Opzioni:

- email
- Telegram
- WhatsApp
- Slack

Env future:

```text
JARVIS_NOTIFICATION_WEBHOOK_URL=
JARVIS_NOTIFICATION_SECRET=
```

## Ordine migliore per finirlo

1. Collegare import CSV Search Console.
2. Far leggere a Jarvis CTR/impression reali.
3. Collegare GA4 o export analytics.
4. Collegare AdSense env reali.
5. Collegare notifiche approval/errori.
6. Collegare GitHub task/issue.
7. Collegare Vercel deploy status.
8. Solo alla fine collegare pubblicazione social.

## Definition of Done finale

Jarvis sara completo quando:

- usa dati Search Console reali;
- usa dati Analytics reali;
- distingue fact/opportunity nella monetizzazione;
- invia notifiche;
- crea task tecnici collegabili a GitHub;
- legge stato Vercel;
- richiede approval prima di ogni azione esterna;
- social publishing resta controllato da approval umana.

## Comandi di verifica

```bash
npm run jarvis:test
npm run lint
npm run build
```
