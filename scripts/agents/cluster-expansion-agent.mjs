import { join } from "node:path";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { runSearchConsoleOpportunityAgent } from "./search-console-opportunity-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";
import { bulletList, ensureDir, section, writeReportBundle } from "./shared/output.mjs";
import { collectFiles, countOccurrences, findBlockBySlug, readRepoFile, routePathFromHtmlPath, routePathFromSourcePage, todayStamp } from "./shared/scan-repo.mjs";

const REPORT_DIR = join(process.cwd(), "reports/clusters");

const CLUSTERS = [
  {
    id: "quellensteuer",
    priority: 1,
    label: "Quellensteuer",
    cluster: "fiscale",
    primaryPages: [
      { href: "/de/quellensteuer-rechner-schweiz", slug: "quellensteuer-rechner-schweiz", type: "calculator", title: "Quellensteuer-Rechner Schweiz" },
      { href: "/de/ratgeber/quellensteuer-schweiz-2026", slug: "quellensteuer-schweiz-2026", type: "guide", title: "Quellensteuer Schweiz 2026" },
      { href: "/it/calcolatore-imposta-alla-fonte-svizzera", slug: "calcolatore-imposta-alla-fonte-svizzera", type: "calculator", title: "Calcolatore imposta alla fonte Svizzera" },
      { href: "/guide/imposta-alla-fonte-svizzera", slug: "imposta-alla-fonte-svizzera", type: "guide", title: "Imposta alla fonte in Svizzera" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/quellensteuer-kantonale-unterschiede", title: "Quellensteuer kantonale Unterschiede" },
      { href: "/de/ratgeber/quellensteuer-und-netto", title: "Quellensteuer und Netto" },
      { href: "/de/ratgeber/quellensteuer-wechsel-kanton", title: "Quellensteuer bei Kantonwechsel" },
    ],
    linkTargets: [
      { from: "/de/quellensteuer-rechner-schweiz", to: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner" },
      { from: "/de/quellensteuer-rechner-schweiz", to: "/de/ueberstundenrechner-schweiz", label: "Überstunden-Rechner" },
      { from: "/de/quellensteuer-rechner-schweiz", to: "/de/ahv-beitraege-selbststaendige-rechner", label: "AHV Selbstständige" },
      { from: "/de/ratgeber/quellensteuer-schweiz-2026", to: "/de/quellensteuer-rechner-schweiz", label: "Quellensteuer-Rechner" },
      { from: "/de/ratgeber/quellensteuer-schweiz-2026", to: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner" },
    ],
    queries: ["Quellensteuer Schweiz", "Quellensteuer Kanton", "Quellensteuer-Rechner Schweiz"],
    valueWeight: 3,
  },
  {
    id: "praemienverbilligung",
    priority: 2,
    label: "Prämienverbilligung",
    cluster: "assicurativa",
    primaryPages: [
      { href: "/de/praemienverbilligung-rechner-schweiz", slug: "praemienverbilligung-rechner-schweiz", type: "calculator", title: "Prämienverbilligung-Rechner Schweiz" },
      { href: "/de/ratgeber/praemienverbilligung-schweiz", slug: "praemienverbilligung-schweiz", type: "guide", title: "Prämienverbilligung Schweiz" },
      { href: "/it/calcolatore-riduzione-premi-cassa-malati-svizzera", slug: "calcolatore-riduzione-premi-cassa-malati-svizzera", type: "calculator", title: "Calcolatore riduzione premi cassa malati Svizzera" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/praemienverbilligung-kanton", title: "Prämienverbilligung nach Kanton" },
      { href: "/de/ratgeber/praemienverbilligung-und-budget", title: "Prämienverbilligung und Budget" },
      { href: "/it/guida-riduzione-premi-cassa-malati-svizzera", title: "Guida riduzione premi cassa malati Svizzera" },
    ],
    linkTargets: [
      { from: "/de/praemienverbilligung-rechner-schweiz", to: "/de/familienzulagen-rechner-schweiz", label: "Familienzulagen-Rechner" },
      { from: "/de/praemienverbilligung-rechner-schweiz", to: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner" },
      { from: "/de/praemienverbilligung-rechner-schweiz", to: "/de/ratgeber/praemienverbilligung-schweiz", label: "Prämienverbilligung Guide" },
    ],
    queries: ["Prämienverbilligung Schweiz", "Prämienverbilligung Rechner", "Krankenkasse verbilligen"],
    valueWeight: 3,
  },
  {
    id: "brutto-netto",
    priority: 3,
    label: "Brutto Netto",
    cluster: "lavoro",
    primaryPages: [
      { href: "/de/brutto-netto-rechner-schweiz", slug: "brutto-netto-rechner-schweiz", type: "calculator", title: "Brutto-Netto-Rechner Schweiz" },
      { href: "/de/ratgeber/stipendio-netto-svizzera", slug: "stipendio-netto-svizzera", type: "guide", title: "Stipendio netto in Svizzera" },
      { href: "/it/calcolatore-salario-netto-svizzera", slug: "calcolatore-salario-netto-svizzera", type: "calculator", title: "Calcolatore salario netto Svizzera" },
      { href: "/it/calcolatore-lordo-netto-svizzera", slug: "calcolatore-lordo-netto-svizzera", type: "calculator", title: "Calcolatore lordo netto Svizzera" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/brutto-netto-schweiz", title: "Brutto Netto Schweiz" },
      { href: "/de/ratgeber/nettolohn-verstehen", title: "Nettolohn verstehen" },
      { href: "/it/guida-stipendio-netto-svizzera", title: "Guida stipendio netto Svizzera" },
    ],
    linkTargets: [
      { from: "/de/brutto-netto-rechner-schweiz", to: "/de/quellensteuer-rechner-schweiz", label: "Quellensteuer-Rechner" },
      { from: "/de/brutto-netto-rechner-schweiz", to: "/de/ueberstundenrechner-schweiz", label: "Überstunden-Rechner" },
      { from: "/de/brutto-netto-rechner-schweiz", to: "/de/ferienrechner-schweiz", label: "Ferienrechner" },
      { from: "/de/brutto-netto-rechner-schweiz", to: "/de/stundenlohn-rechner-schweiz", label: "Stundenlohn-Rechner" },
    ],
    queries: ["Brutto Netto Schweiz", "Lohn netto Schweiz", "Nettolohn Rechner"],
    valueWeight: 2.5,
  },
  {
    id: "ferien",
    priority: 4,
    label: "Ferien",
    cluster: "lavoro",
    primaryPages: [
      { href: "/de/ferienrechner-schweiz", slug: "ferienrechner-schweiz", type: "calculator", title: "Ferienrechner Schweiz" },
      { href: "/de/ratgeber/ferienanspruch-teilzeit-schweiz", slug: "ferienanspruch-teilzeit-schweiz", type: "guide", title: "Ferienanspruch bei Teilzeit in der Schweiz" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/ferienanspruch-schweiz", title: "Ferienanspruch Schweiz" },
      { href: "/de/ratgeber/ferien-bei-teilzeit", title: "Ferien bei Teilzeit" },
      { href: "/it/guida-ferie-svizzera", title: "Guida ferie Svizzera" },
    ],
    linkTargets: [
      { from: "/de/ferienrechner-schweiz", to: "/de/ueberstundenrechner-schweiz", label: "Überstunden-Rechner" },
      { from: "/de/ferienrechner-schweiz", to: "/de/arbeitszeitrechner", label: "Arbeitszeitrechner" },
      { from: "/de/ratgeber/ferienanspruch-teilzeit-schweiz", to: "/de/ferienrechner-schweiz", label: "Ferienrechner" },
    ],
    queries: ["Ferien Schweiz", "Ferienrechner", "Ferienanspruch Teilzeit"],
    valueWeight: 2.2,
  },
  {
    id: "hypotheken",
    priority: 5,
    label: "Hypotheken",
    cluster: "casa",
    primaryPages: [
      { href: "/de/hypotheken-tragbarkeit-rechner-schweiz", slug: "hypotheken-tragbarkeit-rechner-schweiz", type: "calculator", title: "Hypotheken-Tragbarkeit-Rechner Schweiz" },
      { href: "/guide/costo-vita-svizzera", slug: "costo-vita-svizzera", type: "guide", title: "Costo della vita in Svizzera" },
      { href: "/piano-cashflow-online", slug: "piano-cashflow-online", type: "service", title: "Piano Cashflow Online" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/hypotheken-tragbarkeit-schweiz", title: "Hypotheken-Tragbarkeit Schweiz" },
      { href: "/de/ratgeber/wohneigentum-finanzieren", title: "Wohneigentum finanzieren" },
      { href: "/de/ratgeber/nebenkosten-hauskauf", title: "Nebenkosten beim Hauskauf" },
    ],
    linkTargets: [
      { from: "/de/hypotheken-tragbarkeit-rechner-schweiz", to: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner" },
      { from: "/de/hypotheken-tragbarkeit-rechner-schweiz", to: "/piano-cashflow-online", label: "Piano Cashflow Online" },
      { from: "/de/hypotheken-tragbarkeit-rechner-schweiz", to: "/servizi-ai-seo", label: "Servizi AI SEO" },
    ],
    queries: ["Hypothek Tragbarkeit Schweiz", "Hypotheken Rechner", "Tragbarkeit berechnen"],
    valueWeight: 3,
  },
  {
    id: "familienzulagen",
    priority: 6,
    label: "Familienzulagen",
    cluster: "famiglia",
    primaryPages: [
      { href: "/de/familienzulagen-rechner-schweiz", slug: "familienzulagen-rechner-schweiz", type: "calculator", title: "Familienzulagen-Rechner Schweiz" },
      { href: "/it/calcolatore-assegni-familiari-svizzera", slug: "calcolatore-assegni-familiari-svizzera", type: "calculator", title: "Calcolatore assegni familiari Svizzera" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/familienzulagen-schweiz", title: "Familienzulagen Schweiz" },
      { href: "/it/guida-assegni-familiari-svizzera", title: "Guida assegni familiari Svizzera" },
      { href: "/de/ratgeber/familienzulagen-und-budget", title: "Familienzulagen und Budget" },
    ],
    linkTargets: [
      { from: "/de/familienzulagen-rechner-schweiz", to: "/de/praemienverbilligung-rechner-schweiz", label: "Prämienverbilligung-Rechner" },
      { from: "/de/familienzulagen-rechner-schweiz", to: "/de/quellensteuer-rechner-schweiz", label: "Quellensteuer-Rechner" },
      { from: "/de/familienzulagen-rechner-schweiz", to: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner" },
    ],
    queries: ["Familienzulagen Schweiz", "Kinderzulage Rechner", "Ausbildungszulage Schweiz"],
    valueWeight: 2.8,
  },
  {
    id: "arbeitslosigkeit",
    priority: 7,
    label: "Arbeitslosigkeit",
    cluster: "lavoro",
    primaryPages: [
      { href: "/de/arbeitslosenentschaedigung-rechner-schweiz", slug: "arbeitslosenentschaedigung-rechner-schweiz", type: "calculator", title: "Arbeitslosenentschädigung-Rechner Schweiz" },
      { href: "/it/calcolatore-indennita-disoccupazione-svizzera", slug: "calcolatore-indennita-disoccupazione-svizzera", type: "calculator", title: "Calcolatore indennità disoccupazione Svizzera" },
    ],
    proposedPages: [
      { href: "/de/ratgeber/arbeitslosenentschaedigung-schweiz", title: "Arbeitslosenentschädigung Schweiz" },
      { href: "/de/ratgeber/arbeitslosigkeit-budget", title: "Arbeitslosigkeit und Budget" },
      { href: "/it/guida-indennita-disoccupazione-svizzera", title: "Guida indennità disoccupazione Svizzera" },
    ],
    linkTargets: [
      { from: "/de/arbeitslosenentschaedigung-rechner-schweiz", to: "/de/brutto-netto-rechner-schweiz", label: "Brutto-Netto-Rechner" },
      { from: "/de/arbeitslosenentschaedigung-rechner-schweiz", to: "/de/familienzulagen-rechner-schweiz", label: "Familienzulagen-Rechner" },
      { from: "/de/arbeitslosenentschaedigung-rechner-schweiz", to: "/de/quellensteuer-rechner-schweiz", label: "Quellensteuer-Rechner" },
    ],
    queries: ["Arbeitslosenentschädigung Schweiz", "ALV Rechner", "Arbeitslosengeld Schweiz"],
    valueWeight: 2.6,
  },
];

export async function runClusterExpansionAgent(rules, context = {}) {
  const seo = context.seo ?? (await runSeoAgent(rules));
  const content = context.content ?? (await runContentDataAgent(rules));
  const monetization = context.monetization ?? (await runMonetizationAgent(rules));
  const searchConsole = context.searchConsole ?? (await runSearchConsoleOpportunityAgent(rules, { seo, content, monetization }));
  const stamp = todayStamp();

  await ensureClusterStructure();

  const routeCatalog = await buildRouteCatalog();
  const repoText = await loadRepoText();
  const analyses = CLUSTERS.map((cluster) => analyzeCluster(cluster, { seo, searchConsole, routeCatalog, repoText }));
  const report = buildReport(stamp, analyses, { seo, content, monetization, searchConsole });

  await writeReportBundle(REPORT_DIR, stamp, report.markdown, {
    stamp,
    clusterExpansion: {
      summary: report.summary,
      clusters: analyses,
      dataMode: searchConsole?.dataMode ?? "fallback",
    },
  });

  return {
    name: "Cluster Expansion Agent",
    summary: report.summary.overview,
    analyses,
    report,
    upstream: context.previous ?? null,
  };
}

async function ensureClusterStructure() {
  await ensureDir(REPORT_DIR);
}

async function buildRouteCatalog() {
  let htmlFiles = [];
  try {
    htmlFiles = await collectFiles([".next/server/app"], (file) => file.endsWith(".html"));
  } catch {
    htmlFiles = [];
  }
  const sourcePageFiles = await collectFiles(["app"], (file) => file.endsWith("/page.tsx"));
  return new Set([
    ...htmlFiles.map(routePathFromHtmlPath),
    ...sourcePageFiles.map(routePathFromSourcePage),
  ]);
}

async function loadRepoText() {
  const files = [
    ...(await collectFiles(["app"], (file) => file.endsWith(".ts") || file.endsWith(".tsx"))),
    ...(await collectFiles(["components"], (file) => file.endsWith(".ts") || file.endsWith(".tsx"))),
    ...(await collectFiles(["content"], (file) => file.endsWith(".ts") || file.endsWith(".tsx"))),
    ...(await collectFiles(["lib"], (file) => file.endsWith(".ts") || file.endsWith(".tsx"))),
  ];
  const uniqueFiles = [...new Set(files)];
  const entries = await Promise.all(uniqueFiles.map(async (file) => [file, await readRepoFile(file)]));
  return entries;
}

function analyzeCluster(cluster, { seo, searchConsole, routeCatalog, repoText }) {
  const availablePages = cluster.primaryPages.filter((page) => routeCatalog.has(page.href));
  const missingPages = cluster.proposedPages.filter((page) => !routeCatalog.has(page.href));
  const expectedPages = [...cluster.primaryPages, ...cluster.proposedPages];
  const coverage = expectedPages.length > 0 ? round((availablePages.length / expectedPages.length) * 100) : 0;
  const pageSignals = cluster.primaryPages
    .map((page) => buildPageSignals(page, routeCatalog, repoText))
    .filter(Boolean);
  const faqCoverage = pageSignals.length ? round((pageSignals.reduce((sum, item) => sum + item.faqCount, 0) / pageSignals.length) * 25) : 0;
  const exampleCoverage = pageSignals.length ? round((pageSignals.reduce((sum, item) => sum + item.exampleCount, 0) / pageSignals.length) * 25) : 0;
  const linkCoverage = pageSignals.length ? round((pageSignals.reduce((sum, item) => sum + item.linkCount, 0) / pageSignals.length) * 20) : 0;
  const strengthCurrent = clampScore((coverage / 18) + (faqCoverage / 10) + (exampleCoverage / 10) + (linkCoverage / 10));
  const missingLinks = cluster.linkTargets
    .map((edge) => buildMissingLink(edge, routeCatalog, repoText))
    .filter(Boolean);
  const correlatedQueries = buildCorrelatedQueries(cluster, { seo, searchConsole });
  const missingFaqPages = pageSignals.filter((item) => item.faqCount < item.expectedFaqs).map((item) => item.title);
  const missingExamplePages = pageSignals.filter((item) => item.exampleCount < item.expectedExamples).map((item) => item.title);
  const opportunityScore = computeOpportunityScore(cluster, { coverage, missingPages, missingLinks, missingFaqPages, missingExamplePages, correlatedQueries, searchConsole });
  const timeNeeded = estimateTime(missingPages.length, missingLinks.length, strengthCurrent);
  const routeProposals = missingPages.map((page) => page.href);

  return {
    id: cluster.id,
    priority: cluster.priority,
    label: cluster.label,
    cluster: cluster.cluster,
    strengthCurrent,
    coverage,
    availablePages: availablePages.map((page) => page.href),
    missingPages: missingPages.map((page) => ({ href: page.href, title: page.title })),
    missingLinks,
    missingFaqPages,
    missingExamplePages,
    correlatedQueries,
    opportunityScore,
    timeNeeded,
    proposedPages: routeProposals,
    valueWeight: cluster.valueWeight,
    scoreState: searchConsole?.dataMode === "manual-export" ? "reale" : "provvisorio",
  };
}

function buildPageSignals(page, routeCatalog, repoText) {
  const block = findBlockBySlugFromFiles(page.slug, repoText);
  if (!block) return null;

  const faqCount = countOccurrences(block, "question:");
  const exampleCount = countOccurrences(block, "example:");
  const linkCount = countOccurrences(block, "guideLinks:") + countOccurrences(block, "relatedCalculators:") + countOccurrences(block, "relatedSlugs:");
  return {
    href: page.href,
    slug: page.slug,
    title: page.title,
    exists: routeCatalog.has(page.href),
    faqCount,
    exampleCount,
    linkCount,
    expectedFaqs: page.type === "guide" ? 4 : 3,
    expectedExamples: page.type === "guide" ? 1 : 1,
  };
}

function findBlockBySlugFromFiles(slug, repoText) {
  for (const [, text] of repoText) {
    const block = findBlockBySlug(text, slug);
    if (block) return block;
  }
  return null;
}

function buildMissingLink(edge, routeCatalog, repoText) {
  if (!routeCatalog.has(edge.from) || !routeCatalog.has(edge.to)) {
    return null;
  }
  const sourceBlock = locateSourceBlock(edge.from, repoText);
  if (!sourceBlock) {
    return {
      from: edge.from,
      to: edge.to,
      label: edge.label,
      status: "source-missing",
    };
  }
  const present = sourceBlock.includes(edge.to) || sourceBlock.includes(edge.label);
  if (present) return null;
  return {
    from: edge.from,
    to: edge.to,
    label: edge.label,
    status: "missing",
  };
}

function locateSourceBlock(route, repoText) {
  const slug = route.split("/").filter(Boolean).pop() ?? route.replace(/^\//, "");
  for (const [, text] of repoText) {
    const block = findBlockBySlug(text, slug);
    if (block) return block;
  }
  return null;
}

function buildCorrelatedQueries(cluster, { seo, searchConsole }) {
  const querySeeds = [...cluster.queries];
  const seoSeeds = (seo.keywordCoverage ?? [])
    .filter((item) => cluster.primaryPages.some((page) => page.href === item.target))
    .map((item) => item.keyword);
  const searchConsoleSeeds = (searchConsole?.candidates ?? [])
    .filter((item) => cluster.primaryPages.some((page) => page.href === item.page))
    .flatMap((item) => item.queries ?? []);
  return uniqStrings([...querySeeds, ...seoSeeds, ...searchConsoleSeeds]).slice(0, 8);
}

function computeOpportunityScore(cluster, { coverage, missingPages, missingLinks, missingFaqPages, missingExamplePages, correlatedQueries, searchConsole }) {
  const dataBonus = searchConsole?.dataMode === "manual-export" ? 12 : 0;
  const base = cluster.valueWeight * 10;
  const gapPressure = (100 - coverage) * 0.35;
  const missingPagePenalty = missingPages.length * 8;
  const linkPenalty = missingLinks.length * 4;
  const faqPenalty = missingFaqPages.length * 3;
  const examplePenalty = missingExamplePages.length * 2;
  const queryBonus = correlatedQueries.length * 2;
  return round(clampNumber(base + gapPressure + missingPagePenalty + linkPenalty + faqPenalty + examplePenalty + queryBonus + dataBonus, 0, 100));
}

function estimateTime(missingPagesCount, missingLinksCount, strengthCurrent) {
  const effort = missingPagesCount + missingLinksCount;
  if (effort <= 2 && strengthCurrent >= 7) return "1 sessione";
  if (effort <= 5) return "1-2 sessioni";
  return "2-3 sessioni";
}

function buildReport(stamp, analyses, context) {
  const ordered = [...analyses].sort((a, b) => a.priority - b.priority);
  const markdown = [
    `# Cluster Expansion Report - ${stamp}`,
    "",
    section("Sintesi", [
      bulletList([
        `Cluster analizzati: ${ordered.length}`,
        `Dati Search Console: ${(context.searchConsole?.dataMode ?? "fallback") === "manual-export" ? "reali parziali" : "provvisori"}`,
        `Obiettivo: far crescere i cluster esistenti senza creare pagine isolate.`,
      ]),
    ]),
    "",
    section("Classifica cluster", [renderClusterTable(ordered)]),
    "",
    ...ordered.flatMap((cluster) => [
      section(`${cluster.priority}. ${cluster.label}`, [
        bulletList([
          `Forza attuale: ${cluster.strengthCurrent}/10`,
          `Copertura: ${cluster.coverage}%`,
          `Opportunity score: ${cluster.opportunityScore}`,
          `Tempo necessario: ${cluster.timeNeeded}`,
        ]),
      ]),
      "",
      section("Pagine mancanti", [
        bulletList(cluster.missingPages.length ? cluster.missingPages.map((page) => `${page.title} (${page.href})`) : ["Nessuna pagina mancante proposta."]),
      ]),
      "",
      section("Link mancanti", [
        bulletList(cluster.missingLinks.length ? cluster.missingLinks.map((link) => `${link.from} -> ${link.to} (${link.label})`) : ["Nessun link mancante rilevato."]),
      ]),
      "",
      section("FAQ mancanti", [
        bulletList(cluster.missingFaqPages.length ? cluster.missingFaqPages : ["Nessuna FAQ mancante rilevata."]),
      ]),
      "",
      section("Esempi mancanti", [
        bulletList(cluster.missingExamplePages.length ? cluster.missingExamplePages : ["Nessun esempio mancante rilevato."]),
      ]),
      "",
      section("Query correlate", [
        bulletList(cluster.correlatedQueries.length ? cluster.correlatedQueries : ["Nessuna query correlata disponibile."]),
      ]),
      "",
      section("Pagine da proporre, non creare", [
        bulletList(cluster.proposedPages.length ? cluster.proposedPages : ["Nessuna proposta aggiuntiva."]),
      ]),
      "",
    ]),
  ].join("\n");

  return {
    markdown,
    summary: {
      overview: `${ordered[0]?.label ?? "Nessun cluster"} è la priorità di espansione.`,
      topCluster: ordered[0] ?? null,
      clusters: ordered,
      dataMode: context.searchConsole?.dataMode ?? "fallback",
    },
  };
}

function renderClusterTable(rows) {
  if (!rows.length) return "- Nessun cluster disponibile.";
  const tableRows = rows.map((item) => [
    item.label,
    `${item.strengthCurrent}/10`,
    `${item.coverage}%`,
    item.missingPages.length ? item.missingPages.map((page) => page.title).join(" / ") : "n/d",
    item.opportunityScore,
    item.timeNeeded,
  ].join(" | "));

  return [
    "| Cluster | Forza attuale | Copertura | Pagine mancanti | Opportunity Score | Tempo necessario |",
    "| --- | --- | --- | --- | --- | --- |",
    ...tableRows.map((row) => `| ${row} |`),
  ].join("\n");
}

function uniqStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function clampScore(value) {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value * 10) / 10;
}
