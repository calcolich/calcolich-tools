import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { bulletList, ensureDir, section, writeReportBundle } from "./shared/output.mjs";
import { collectFiles, routePathFromHtmlPath, routePathFromSourcePage, todayStamp } from "./shared/scan-repo.mjs";

const SEARCH_ROOT = join(process.cwd(), "search-console");
const EXPORTS_DIR = join(SEARCH_ROOT, "exports");
const REPORT_DIR = join(process.cwd(), "reports/search-console-opportunities");

export async function runSearchConsoleOpportunityAgent(rules, context = {}) {
  const seo = context.seo ?? { keywordCoverage: [] };
  const content = context.content ?? { findings: [], updates: [] };
  const monetization = context.monetization ?? { opportunities: [] };
  const stamp = todayStamp();

  await ensureSearchConsoleStructure();

  const routeCatalog = await buildRouteCatalog();
  const catalog = buildCatalog(rules.searchConsole?.targets ?? [], seo, monetization, routeCatalog);
  const exportSnapshots = await loadExportSnapshots(EXPORTS_DIR);

  const dataMode = exportSnapshots.length > 0 ? "manual-export" : "fallback";
  const candidates = exportSnapshots.length > 0
    ? buildExportCandidates(exportSnapshots, catalog, routeCatalog)
    : buildFallbackCandidates(catalog, content);

  candidates.sort((a, b) => {
    const scoreA = Number.isFinite(a.opportunityScore) ? a.opportunityScore : -1;
    const scoreB = Number.isFinite(b.opportunityScore) ? b.opportunityScore : -1;
    if (scoreB !== scoreA) return scoreB - scoreA;
    return (b.valueWeight ?? 0) - (a.valueWeight ?? 0);
  });

  const dailyPriority = candidates[0] ?? null;
  const report = buildReport({
    stamp,
    dataMode,
    exportSnapshots,
    candidates,
    dailyPriority,
  });

  await writeReportBundle(REPORT_DIR, stamp, report.markdown, {
    stamp,
    searchConsoleOpportunity: {
      dataMode,
      exportFiles: exportSnapshots.map((snapshot) => basename(snapshot.file)),
      candidates,
      dailyPriority,
      summary: report.summary,
    },
  });

  return {
    name: "Search Console Opportunity Agent",
    summary: report.summary.overview,
    dataMode,
    exportSnapshots,
    candidates,
    dailyPriority,
    report,
    upstream: context.previous ?? null,
  };
}

async function ensureSearchConsoleStructure() {
  await ensureDir(EXPORTS_DIR);
  await ensureDir(REPORT_DIR);
  await writeFile(join(EXPORTS_DIR, ".gitkeep"), "", "utf8");
  await writeFile(join(REPORT_DIR, ".gitkeep"), "", "utf8");
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

function buildCatalog(targets, seo, monetization, routeCatalog) {
  const seoBySlug = new Map((seo.keywordCoverage ?? []).map((item) => [slugFromTarget(item.target), item]));
  const monetizationBySlug = new Map((monetization.opportunities ?? []).map((item) => [item.slug, item]));

  return targets.map((target) => {
    const seoItem = seoBySlug.get(target.slug) ?? null;
    const monetizationItem = monetizationBySlug.get(target.slug) ?? null;
    const internalLinks = seoItem?.occurrences ?? 0;
    const indexed = routeCatalog.has(target.pageHref);
    const ctaPresent = Boolean(target.ctaLabel);
    const guideLinks = target.guideHref ? 1 : 0;
    const linkedCalculators = target.linkedCalculators?.length ?? 0;

    return {
      ...target,
      indexed,
      ctaPresent,
      guideLinks,
      linkedCalculators,
      internalLinks,
      economicValue: target.valueWeight ?? 1,
      seoItem,
      monetizationItem,
    };
  });
}

async function loadExportSnapshots(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile() && (entry.name.endsWith(".csv") || entry.name.endsWith(".json")))
      .map((entry) => join(dir, entry.name))
      .sort();

    const snapshots = [];
    for (const file of files) {
      const text = await readFile(file, "utf8");
      const rows = file.endsWith(".json") ? parseJsonRows(text) : parseCsvRows(text);
      if (rows.length > 0) {
        snapshots.push({ file, rows });
      }
    }
    return snapshots;
  } catch {
    return [];
  }
}

function parseJsonRows(text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.map(normalizeSearchConsoleRow).filter(Boolean);
    if (Array.isArray(parsed.rows)) return parsed.rows.map(normalizeSearchConsoleRow).filter(Boolean);
    if (Array.isArray(parsed.data)) return parsed.data.map(normalizeSearchConsoleRow).filter(Boolean);
    if (Array.isArray(parsed.items)) return parsed.items.map(normalizeSearchConsoleRow).filter(Boolean);
    return [];
  } catch {
    return [];
  }
}

function parseCsvRows(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const rows = [];
  for (let index = 1; index < lines.length; index += 1) {
    const values = splitCsvLine(lines[index]);
    if (values.length === 0) continue;
    const row = {};
    headers.forEach((header, headerIndex) => {
      row[header] = values[headerIndex] ?? "";
    });
    rows.push(normalizeSearchConsoleRow(row));
  }
  return rows.filter(Boolean);
}

function splitCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && inQuotes && next === "\"") {
      current += "\"";
      index += 1;
      continue;
    }

    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function normalizeSearchConsoleRow(row) {
  if (!row || typeof row !== "object") return null;
  const normalized = {};
  for (const [key, value] of Object.entries(row)) {
    normalized[normalizeHeader(key)] = typeof value === "string" ? value.trim() : value;
  }

  const page = normalizePageHref(
    normalized.page ??
      normalized.url ??
      normalized.landingpage ??
      normalized.landing_page ??
      normalized["pageurl"] ??
      normalized["page-path"] ??
      normalized["pagepath"],
  );
  const query = String(normalized.query ?? normalized.keyword ?? normalized.queries ?? "").trim();
  if (!page || !query) return null;

  return {
    page,
    query,
    clicks: toNumber(normalized.clicks),
    impressions: toNumber(normalized.impressions),
    ctr: toPercent(normalized.ctr),
    position: toNumber(normalized.position),
    previousClicks: toNumber(normalized.previousclicks ?? normalized.previous_clicks),
    previousImpressions: toNumber(normalized.previousimpressions ?? normalized.previous_impressions),
    previousCtr: toPercent(normalized.previousctr ?? normalized.previous_ctr),
    previousPosition: toNumber(normalized.previousposition ?? normalized.previous_position),
    indexStatus: String(normalized.indexstatus ?? normalized.index_status ?? normalized.indexed ?? "").trim() || null,
    ctaPresent: toBoolean(normalized.ctapresent ?? normalized.cta_present),
    internalLinks: toNumber(normalized.internallinks ?? normalized.internal_links),
    guideLinks: toNumber(normalized.guidelinks ?? normalized.guide_links),
    raw: row,
  };
}

function normalizeHeader(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function normalizePageHref(value) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (text.startsWith("/")) return text.split("?")[0].split("#")[0];
  try {
    const url = new URL(text);
    return `${url.pathname}`.replace(/\/+/g, "/") || "/";
  } catch {
    return null;
  }
}

function toNumber(value) {
  const parsed = Number(String(value ?? "").replace("%", "").replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function toPercent(value) {
  const parsed = toNumber(value);
  return parsed === null ? null : parsed > 1 ? parsed : parsed * 100;
}

function toBoolean(value) {
  if (typeof value === "boolean") return value;
  const text = String(value ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "si", "sì", "y"].includes(text);
}

function aggregateRows(rows) {
  const groups = new Map();
  for (const row of rows) {
    const page = row.page;
    if (!groups.has(page)) {
      groups.set(page, {
        page,
        queries: [],
        clicks: 0,
        impressions: 0,
        ctaPresent: false,
        internalLinks: 0,
        guideLinks: 0,
        indexed: true,
      });
    }
    const group = groups.get(page);
    group.clicks += row.clicks ?? 0;
    group.impressions += row.impressions ?? 0;
    group.ctaPresent = group.ctaPresent || Boolean(row.ctaPresent);
    group.internalLinks = Math.max(group.internalLinks, row.internalLinks ?? 0);
    group.guideLinks = Math.max(group.guideLinks, row.guideLinks ?? 0);
    if (row.indexStatus) group.indexStatus = row.indexStatus;
    group.queries.push(row);
  }
  return groups;
}

function topQueries(queries, limit = 3) {
  return [...queries]
    .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0) || (b.impressions ?? 0) - (a.impressions ?? 0))
    .slice(0, limit)
    .map((item) => item.query);
}

function buildExportCandidates(snapshots, catalog, routeCatalog) {
  const currentSnapshot = snapshots[snapshots.length - 1];
  const previousSnapshot = snapshots[snapshots.length - 2] ?? null;
  const currentGroups = aggregateRows(currentSnapshot.rows);
  const previousGroups = previousSnapshot ? aggregateRows(previousSnapshot.rows) : new Map();

  const byPage = new Map(catalog.map((item) => [item.pageHref, item]));
  const candidates = [];

  for (const [page, group] of currentGroups.entries()) {
    const profile = byPage.get(page) ?? inferPageProfile(page, routeCatalog);
    const previous = previousGroups.get(page) ?? null;
    const impressions = group.impressions;
    const clicks = group.clicks;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : null;
    const position = averagePosition(group.queries);
    const growthRecent = previous ? computeGrowthFactor(impressions, previous.impressions) : 1;
    const valueWeight = profile.valueWeight ?? 1.5;
    const bonus = computeBonus({ position, ctr, profile, group });
    const opportunityScore = round(
      ((impressions || 1) * growthRecent * valueWeight) / Math.max(position || 1, 1) * bonus,
    );
    candidates.push({
      page,
      pageTitle: profile.pageTitle ?? page,
      locale: profile.locale ?? null,
      queries: topQueries(group.queries),
      clicks,
      impressions,
      ctr,
      position,
      trend: previous ? growthLabel(impressions, previous.impressions) : "stabile",
      growthRecent: previous ? computeGrowthFactor(impressions, previous.impressions) : null,
      valueEconomic: valueLabel(valueWeight),
      problemMain: determineProblemMain({
        position,
        ctr,
        profile,
        indexed: true,
        hasData: true,
        growthRecent,
      }),
      intervention: buildIntervention(profile, {
        hasData: true,
        position,
        ctr,
      }),
      difficulty: determineDifficulty(profile),
      opportunityScore,
      scoreMode: "search-console",
      indexed: true,
      ctaPresent: profile.ctaPresent,
      internalLinks: profile.internalLinks,
      guideLinks: profile.guideLinks,
      cluster: profile.cluster,
      sourceFile: currentSnapshot.file,
    });
  }

  return candidates;
}

function buildFallbackCandidates(catalog, content) {
  const candidates = [];
  for (const profile of catalog) {
    const seoItem = profile.seoItem ?? null;
    const contentFinding = findContentFinding(profile, content);
    const valueWeight = profile.valueWeight ?? 1;
    const internalLinks = seoItem?.occurrences ?? 0;
    const ctaBonus = profile.ctaPresent ? 1.08 : 1;
    const linkBonus = profile.guideLinks > 0 ? 1.05 : 1;
    const clusterBonus = clusterBonusFactor(profile.cluster);
    const opportunityScore = round(
      (valueWeight * 100 + internalLinks * 9 + profile.guideLinks * 10 + profile.linkedCalculators * 4 + (profile.indexed ? 10 : 0)) *
        ctaBonus *
        linkBonus *
        clusterBonus,
    );

    candidates.push({
      page: profile.pageHref,
      pageTitle: profile.pageTitle,
      locale: profile.locale,
      queries: profile.queries,
      clicks: null,
      impressions: null,
      ctr: null,
      position: null,
      trend: "fallback: nessun export Search Console importato",
      growthRecent: null,
      valueEconomic: valueLabel(valueWeight),
      problemMain: determineProblemMain({
        position: null,
        ctr: null,
        profile,
        indexed: profile.indexed,
        hasData: false,
        contentFinding,
      }),
      intervention: buildIntervention(profile, {
        hasData: false,
        contentFinding,
      }),
      difficulty: determineDifficulty(profile),
      opportunityScore,
      scoreMode: "fallback",
      indexed: profile.indexed,
      ctaPresent: profile.ctaPresent,
      internalLinks,
      guideLinks: profile.guideLinks,
      cluster: profile.cluster,
      sourceFile: null,
    });
  }
  return candidates;
}

function inferPageProfile(page, routeCatalog) {
  const slug = page.split("/").filter(Boolean).pop() ?? page;
  return {
    slug,
    pageHref: page,
    pageTitle: slug.replace(/-/g, " "),
    locale: page.startsWith("/de/") ? "de" : page.startsWith("/it/") ? "it" : null,
    cluster: guessClusterFromPath(page),
    valueWeight: 1.5,
    guideLinks: 0,
    linkedCalculators: [],
    queries: [slug.replace(/-/g, " ")],
    ctaPresent: routeCatalog.has(page),
    internalLinks: 0,
    indexed: routeCatalog.has(page),
  };
}

function findContentFinding(profile, content) {
  const slug = profile.slug ?? profile.pageHref.split("/").filter(Boolean).pop();
  return content.findings.find((item) => item.slug === slug) ?? null;
}

function computeBonus({ position, ctr, profile, group }) {
  let bonus = 1;
  if (position !== null) {
    if (position >= 8 && position <= 20) bonus *= 1.35;
    else if (position > 20 && position <= 30) bonus *= 1.18;
  }
  if (ctr !== null && ctr < 2) bonus *= 1.12;
  if (["fiscale", "previdenziale", "ipotecario", "assicurativa"].includes(profile.cluster)) bonus *= 1.12;
  if (profile.ctaPresent || group?.ctaPresent) bonus *= 1.05;
  if ((profile.guideLinks ?? 0) + (profile.linkedCalculators ?? 0) >= 3) bonus *= 1.06;
  return bonus;
}

function clusterBonusFactor(cluster) {
  return ["fiscale", "previdenziale", "ipotecario", "assicurativa"].includes(cluster) ? 1.15 : 1;
}

function determineDifficulty(profile) {
  if (profile.cluster === "ipotecario") return "alta";
  if (profile.cluster === "fiscale" || profile.cluster === "assicurativa") return "media";
  return "media-bassa";
}

function determineProblemMain({ position, ctr, profile, indexed, hasData, growthRecent, contentFinding }) {
  if (!indexed) return "Pagina non ancora indicizzata o da verificare nel grafo";
  if (!hasData) {
    if ((profile.guideLinks ?? 0) < 1) return "Manca un export Search Console; il cluster va comunque fortificato con guide e CTA";
    return "Manca un export Search Console; opportunità provvisoria basata su intento e linking";
  }
  if (position !== null && position >= 8 && position <= 20 && ctr !== null && ctr < 2) {
    return "Posizione già valida ma snippet poco competitivo";
  }
  if (position !== null && position > 20 && position <= 30) {
    return "Vicino alla prima pagina ma ancora fuori dalla zona click";
  }
  if (growthRecent !== null && growthRecent > 1.15) {
    return "Impressioni in crescita ma CTR ancora da consolidare";
  }
  if (contentFinding && contentFinding.missingMarkers?.length > 0) {
    return `Mancano marcatori editoriali: ${contentFinding.missingMarkers.join(", ")}`;
  }
  return "CTR e intent da leggere meglio nel snippet";
}

function buildIntervention(profile, { hasData, position, ctr, contentFinding } = {}) {
  const title = profile.pageTitle;
  const pieces = [];
  pieces.push(`Title: ${title} - guida, calcolatore e contesto svizzero`);
  pieces.push(`Meta description: chiarire il caso ${title.toLowerCase()} con un calcolatore semplice, esempi svizzeri e fonti affidabili.`);
  pieces.push(`H1: ${title}`);
  pieces.push(`Introduzione: spiegare subito a chi serve la pagina, quale problema risolve e che il risultato è orientativo.`);
  pieces.push(`FAQ: aggiungere domande su criteri, limiti, casi comuni e verifica ufficiale.`);
  pieces.push(`Esempi: inserire almeno un esempio pratico con contesto svizzero e risultato leggibile.`);
  pieces.push(`Internal linking: collegare ${profile.guideLinks > 0 ? "la guida" : "una guida dedicata"} e i calcolatori correlati.`);
  pieces.push(`CTA: ${profile.ctaLabel ?? "Porta l'utente al calcolatore o alla verifica ufficiale"}.`);
  pieces.push(`Schema: WebApplication, FAQPage e BreadcrumbList.`);
  if (!hasData) {
    pieces.push("Contenuti mancanti: preparare anche il blocco per la verifica Search Console appena disponibile.");
  } else if (position !== null && position >= 8 && position <= 20 && ctr !== null && ctr < 2) {
    pieces.push("Snippet: migliorare il title per intercettare meglio la query già in posizione utile.");
  } else if (contentFinding?.missingMarkers?.length) {
    pieces.push(`Marcatori editoriali da rinforzare: ${contentFinding.missingMarkers.join(", ")}.`);
  }
  return pieces;
}

function valueLabel(valueWeight) {
  if (valueWeight >= 2.8) return "alta";
  if (valueWeight >= 2) return "media-alta";
  if (valueWeight >= 1.5) return "media";
  return "bassa";
}

function growthLabel(current, previous) {
  if (!previous || previous <= 0) return "stabile";
  const ratio = current / previous;
  const diff = ((ratio - 1) * 100).toFixed(0);
  return ratio >= 1 ? `crescita +${diff}%` : `calo ${diff}%`;
}

function computeGrowthFactor(current, previous) {
  if (!previous || previous <= 0) return 1;
  const factor = current / previous;
  return Math.max(0.4, Math.min(factor, 3));
}

function averagePosition(rows) {
  const weighted = rows.reduce(
    (sum, row) => {
      const weight = row.impressions ?? 0;
      const position = row.position ?? 0;
      return {
        sum: sum.sum + position * weight,
        weight: sum.weight + weight,
      };
    },
    { sum: 0, weight: 0 },
  );
  if (weighted.weight === 0) return null;
  return weighted.sum / weighted.weight;
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function slugFromTarget(targetPath) {
  return targetPath.split("/").filter(Boolean).pop() ?? targetPath;
}

function guessClusterFromPath(pageHref) {
  if (pageHref.includes("quellensteuer") || pageHref.includes("brutto-netto")) return "fiscale";
  if (pageHref.includes("praemien") || pageHref.includes("krankenkasse")) return "assicurativa";
  if (pageHref.includes("hypothek")) return "ipotecario";
  if (pageHref.includes("ahv") || pageHref.includes("arbeitslosen")) return "previdenziale";
  if (pageHref.includes("familienzulagen")) return "famiglia";
  if (pageHref.includes("ueberstunden") || pageHref.includes("ferien")) return "lavoro";
  return "altro";
}

function buildReport({ stamp, dataMode, exportSnapshots, candidates, dailyPriority }) {
  const markdown = [
    `# Search Console Opportunity Report - ${stamp}`,
    "",
    section("Fonte dati", [
      bulletList([
        `Modalita: ${dataMode === "manual-export" ? "export manuale importato" : "fallback repository"}`,
        `Export rilevati: ${exportSnapshots.length}`,
        `Opportunity Score: ${dataMode === "manual-export" ? "derivato da impressioni / crescita / valore / posizione" : "provisional, senza export Search Console"}`,
      ]),
    ]),
    "",
    section("Pagine candidate", [renderCandidateTable(candidates)]),
    "",
    section("Priorita del giorno", renderDailyPriority(dailyPriority, dataMode)),
    "",
  ].join("\n");

  return {
    markdown,
    summary: {
      overview: dailyPriority
        ? `Search Console Opportunity Agent: priorita del giorno ${dailyPriority.page} (${dataMode === "manual-export" ? "dato reale" : "provisional"}).`
        : "Search Console Opportunity Agent: nessuna pagina candidata disponibile.",
      dataMode,
      candidates: candidates.length,
      selectedPage: dailyPriority?.page ?? null,
      selectedScore: dailyPriority?.opportunityScore ?? null,
    },
  };
}

function renderCandidateTable(candidates) {
  const rows = candidates.slice(0, 10).map((item) => [
    item.page,
    item.queries.join(" / "),
    renderMetric(item.clicks),
    renderMetric(item.impressions),
    renderMetric(item.ctr, item.ctr !== null ? "%" : null),
    renderMetric(item.position),
    item.trend,
    item.valueEconomic,
    item.problemMain,
    item.difficulty,
    renderMetric(item.opportunityScore),
  ].join(" | "));

  return [
    `| URL | Query principali | Clic | Impressioni | CTR | Posizione | Trend | Valore economico | Problema principale | Difficolta | Opportunity Score |`,
    `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |`,
    ...rows.map((row) => `| ${row} |`),
  ].join("\n");
}

function renderDailyPriority(item, dataMode) {
  if (!item) return "- Nessuna pagina disponibile.";
  return [
    `- URL: ${item.page}`,
    `- Query principali: ${item.queries.join(", ")}`,
    `- Opportunity Score: ${renderMetric(item.opportunityScore)}${dataMode === "manual-export" ? "" : " (provisional)"}`,
    `- Problema principale: ${item.problemMain}`,
    `- Intervento consigliato:`,
    ...item.intervention.map((line) => `  - ${line}`),
  ];
}

function renderMetric(value, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(value)) return "n/d";
  const rendered = typeof value === "number" ? round(value).toString() : String(value);
  return `${rendered}${suffix}`;
}
