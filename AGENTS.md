<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Lezioni apprese

### Route multilingua con una route dinamica root — Appresa il 2026-06-21
- Contesto: dovevo introdurre le sezioni `/de`, `/it`, `/en` e `/fr` in un progetto Next.js App Router che aveva gia una route dinamica root `[slug]`.
- Errore: usare un segmento linguistico dinamico `[lang]` entrava in conflitto con `[slug]`, causando una route ambigua durante la build.
- Soluzione: creare directory linguistiche statiche separate (`app/de`, `app/it`, `app/en`, `app/fr`), ciascuna con il proprio layout e le proprie route localizzate.
- Regola: per aggiungere route multilingua a un progetto Next.js che possiede gia una route dinamica root `[slug]`, usare sempre directory linguistiche statiche perche evitano ambiguita di routing e preservano la generazione statica.
