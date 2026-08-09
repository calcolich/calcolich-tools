import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { runRevenueAgent } from "./revenue-agent.mjs";
import { runSearchConsoleOpportunityAgent } from "./search-console-opportunity-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";
import { bulletList, ensureDir, section, writeReportBundle } from "./shared/output.mjs";
import { buildGrowthCatalog } from "./shared/growth.mjs";
import { collectFiles, countOccurrences, readRepoFile, routePathFromHtmlPath, routePathFromSourcePage, todayStamp } from "./shared/scan-repo.mjs";

const REPORT_DIR = join(process.cwd(), "reports/traffic");
const ANALYTICS_EXPORTS_DIR = join(process.cwd(), "analytics/exports");

export async function runTrafficIntelligenceAgent(rules, context = {}) {
  const seo = context.seo ?? (await runSeoAgent(rules, { previous: context.previous ?? null }));
  const content = context.content ?? (await runContentDataAgent(rules, { previous: seo, searchConsole: context.searchConsole ?? null }));
  const monetization = context.monetization ?? (await runMonetizationAgent(rules, { previous: content, seo, searchConsole: context.searchConsole ?? null }));
  const searchConsole = context.searchConsole ?? (await runSearchConsoleOpportunityAgent(rules, { previous: null, seo, content, monetization }));
  const revenue = context.revenue ?? (await runRevenueAgent(rules, { previous: monetization, seo, content, monetization, searchConsole }));
  const stamp = todayStamp();

  await ensureDir(REPORT_DIR);

  const routeCatalog = await buildRouteCatalog();
  const repoText = await loadRepoText();
  const analyticsSnapshots = await loadAnalyticsSnapshots(ANALYTICS_EXPORTS_DIR);
  const analyticsRows = aggregateAnalyticsRows(analyticsSnapshots);
  const analyticsByPage = new Map(analyticsRows.map((row) => [row.page, row]));
  const searchConsoleByPage = new Map((searchConsole.candidates ?? []).map((item) => [item.page, item]));
  const revenueByPage = new Map((revenue.ranking ?? []).map((item) => [item.page, item]));
  const seoByTarget = new Map((seo.keywordCoverage ?? []).map((item) => [item.target, item]));
  const monetizationBySlug = new Map((monetization.opportunities ?? []).map((item) => [item.slug, item]));

  const catalog = buildTrafficCatalog({
    rules,
    routeCatalog,
    seo,
    monetization,
    revenue,
    searchConsole,
  });

  const pages = catalog.map((profile) =>
    analyzeTrafficPage(profile, {
      repoText,
      searchConsoleItem: searchConsoleByPage.get(profile.pageHref) ?? null,
      revenueItem: revenueByPage.get(profile.pageHref) ?? null,
      analyticsItem: analyticsByPage.get(profile.pageHref) ?? null,
      seoItem: seoByTarget.get(profile.pageHref) ?? seoByTarget.get(profile.guideHref ?? "") ?? null,
      monetizationItem: monetizationBySlug.get(profile.slug) ?? null,
      searchConsoleMode: searchConsole.dataMode,
      analyticsMode: analyticsSnapshots.length > 0 ? "manual-export" : "fallback",
    }),
  );

  const topGrowthPages = [...pages].sort((a, b) => b.finalPriorityScore - a.finalPriorityScore || b.trafficMomentum - a.trafficMomentum).slice(0, 10);
  const topFixPages = [...pages]
    .sort((a, b) => b.fixPriorityScore - a.fixPriorityScore || b.ctrOpportunity - a.ctrOpportunity)
    .slice(0, 10);
  const topQueries = buildEmergentQueries(pages, searchConsole).slice(0, 10);
  const topClusters = buildClusterRanking(pages).slice(0, 10);
  const topRisks = buildRiskRanking(pages).slice(0, 5);

  const report = buildReport({
    stamp,
    searchConsole,
    analyticsSnapshots,
    topGrowthPages,
    topFixPages,
    topQueries,
    topClusters,
    topRisks,
  });

  await writeReportBundle(REPORT_DIR, stamp, report.markdown, {
    stamp,
    traffic: {
      dataMode: report.summary.dataMode,
      searchConsoleMode: searchConsole.dataMode,
      analyticsMode: analyticsSnapshots.length > 0 ? "manual-export" : "fallback",
      pages,
      topGrowthPages,
      topFixPages,
      topQueries,
      topClusters,
      topRisks,
      summary: report.summary,
    },
  });

  return {
    name: "Traffic Intelligence Agent",
    summary: report.summary.overview,
    dataMode: report.summary.dataMode,
    searchConsoleMode: searchConsole.dataMode,
    analyticsMode: analyticsSnapshots.length > 0 ? "manual-export" : "fallback",
    pages,
    topGrowthPages,
    topFixPages,
    topQueries,
    topClusters,
    topRisks,
    report,
    upstream: context.previous ?? null,
  };
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

async function loadAnalyticsSnapshots(dir) {
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
      if (rows.length > 0) snapshots.push({ file, rows });
    }
    return snapshots;
  } catch {
    return [];
  }
}

function aggregateAnalyticsRows(snapshots) {
  if (!snapshots.length) return [];
  const currentSnapshot = snapshots[snapshots.length - 1];
  const previousSnapshot = snapshots[snapshots.length - 2] ?? null;
  const currentGroups = groupAnalyticsRows(currentSnapshot.rows);
  const previousGroups = previousSnapshot ? groupAnalyticsRows(previousSnapshot.rows) : new Map();
  const rows = [];

  for (const [page, current] of currentGroups.entries()) {
    const previous = previousGroups.get(page) ?? null;
    rows.push({
      page,
      sessions: current.sessions,
      previousSessions: previous?.sessions ?? null,
      users: current.users,
      previousUsers: previous?.users ?? null,
      engagementRate: current.engagementRate,
      conversions: current.conversions,
      previousConversions: previous?.conversions ?? null,
      events: current.events,
      previousEvents: previous?.events ?? null,
      trend: current.trend ?? buildAnalyticsTrend({
        sessions: current.sessions,
        previousSessions: previous?.sessions ?? null,
        trend: null,
      }),
    });
  }

  return rows;
}

function groupAnalyticsRows(rows) {
  const groups = new Map();
  for (const row of rows) {
    const page = row.page;
    if (!page) continue;
    if (!groups.has(page)) {
      groups.set(page, {
        sessions: 0,
        users: 0,
        engagementRate: null,
        conversions: 0,
        events: 0,
        trend: null,
      });
    }
    const group = groups.get(page);
    group.sessions += row.sessions ?? 0;
    group.users += row.users ?? 0;
    group.conversions += row.conversions ?? 0;
    group.events += row.events ?? 0;
    group.engagementRate = row.engagementRate ?? group.engagementRate;
    group.trend = row.trend ?? group.trend;
  }
  return groups;
}

function parseJsonRows(text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.map(normalizeAnalyticsRow).filter(Boolean);
    if (Array.isArray(parsed.rows)) return parsed.rows.map(normalizeAnalyticsRow).filter(Boolean);
    if (Array.isArray(parsed.data)) return parsed.data.map(normalizeAnalyticsRow).filter(Boolean);
    if (Array.isArray(parsed.items)) return parsed.items.map(normalizeAnalyticsRow).filter(Boolean);
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
    if (!values.length) continue;
    const row = {};
    headers.forEach((header, headerIndex) => {
      row[header] = values[headerIndex] ?? "";
    });
    rows.push(normalizeAnalyticsRow(row));
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

function normalizeHeader(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function normalizeAnalyticsRow(row) {
  if (!row || typeof row !== "object") return null;
  const normalized = {};
  for (const [key, value] of Object.entries(row)) {
    normalized[normalizeHeader(key)] = typeof value === "string" ? value.trim() : value;
  }

  const page = normalizePageHref(
    normalized.page ?? normalized.url ?? normalized.landingpage ?? normalized.landing_page ?? normalized.path ?? normalized.pagepath,
  );
  if (!page) return null;

  return {
    page,
    sessions: toNumber(normalized.sessions ?? normalized.visits ?? normalized.users),
    previousSessions: toNumber(normalized.previoussessions ?? normalized.previous_sessions),
    users: toNumber(normalized.users),
    previousUsers: toNumber(normalized.previoususers ?? normalized.previous_users),
    engagementRate: toPercent(normalized.engagementrate ?? normalized.engagement_rate),
    conversions: toNumber(normalized.conversions ?? normalized.leads),
    previousConversions: toNumber(normalized.previousconversions ?? normalized.previous_conversions),
    events: toNumber(normalized.events),
    previousEvents: toNumber(normalized.previousevents ?? normalized.previous_events),
    trend: String(normalized.trend ?? "").trim() || null,
  };
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

function buildTrafficCatalog({ rules, routeCatalog, seo, monetization, revenue, searchConsole }) {
  const knownProfiles = buildGrowthCatalog(rules, { searchConsole, seo, monetization });
  const byPage = new Map(knownProfiles.map((profile) => [profile.pageHref, profile]));
  const relevantRoutes = [...routeCatalog].filter(isTrafficRelevant).sort();

  for (const route of relevantRoutes) {
    if (byPage.has(route)) continue;
    const inferred = inferTrafficProfile(route);
    if (inferred) byPage.set(route, inferred);
  }

  const pages = [...byPage.values()];
  return pages.map((profile) => {
    const revenueProfile = revenue.ranking?.find((item) => item.page === profile.pageHref) ?? null;
    const searchProfile = searchConsole.candidates?.find((item) => item.page === profile.pageHref) ?? null;
    return {
      ...profile,
      revenueProfile,
      searchProfile,
    };
  });
}

function inferTrafficProfile(route) {
  if (!isTrafficRelevant(route)) return null;
  const slug = route.split("/").filter(Boolean).pop() ?? route.replace(/^\//, "");
  const locale = route.startsWith("/de/") ? "de" : route.startsWith("/it/") ? "it" : route.startsWith("/en/") ? "en" : route.startsWith("/fr/") ? "fr" : null;
  const title = buildRouteTitle(route, slug, locale);
  return {
    pageHref: route,
    slug,
    title,
    locale,
    cluster: inferCluster(route),
    valueWeight: inferValueWeight(route),
    keywords: [slugToTitle(slug)],
    guideHref: null,
    linkedPages: [],
    ctaLabel: null,
    source: "inferred",
    indexed: true,
    guideCount: 0,
  };
}

function isTrafficRelevant(route) {
  if (!route || route === "/_not-found") return false;
  if (route.startsWith("/api/")) return false;
  if (route === "/ads.txt" || route === "/robots.txt" || route === "/sitemap.xml") return false;
  if (route === "/privacy" || route === "/cookie" || route === "/disclaimer") return false;
  return true;
}

function analyzeTrafficPage(profile, { repoText, searchConsoleItem, revenueItem, analyticsItem, seoItem, monetizationItem, searchConsoleMode, analyticsMode }) {
  const sourceText = repoText.map(([, text]) => text).join("\n");
  const baseQueries = uniqStrings([
    ...(searchConsoleItem?.queries ?? []),
    ...(profile.keywords ?? []),
  ]).slice(0, 5);
  const clicks = searchConsoleItem?.clicks ?? null;
  const impressions = searchConsoleItem?.impressions ?? null;
  const ctr = searchConsoleItem?.ctr ?? null;
  const position = searchConsoleItem?.position ?? null;
  const analyticsSessions = analyticsItem?.sessions ?? null;
  const analyticsTrend = buildAnalyticsTrend(analyticsItem);
  const internalLinkScore = scoreInternalLinking(profile, searchConsoleItem, seoItem, sourceText);
  const commercialIntent = scoreCommercialIntent(profile, revenueItem, monetizationItem);
  const ctrOpportunity = scoreCtrOpportunity(position, ctr, profile);
  const trafficMomentum = scoreTrafficMomentum(profile, searchConsoleItem, analyticsItem, seoItem, internalLinkScore);
  const growthPotential = scoreGrowthPotential(trafficMomentum, commercialIntent, internalLinkScore, ctrOpportunity, revenueItem);
  const finalPriorityScore = round(clampNumber(trafficMomentum + growthPotential + commercialIntent + internalLinkScore + ctrOpportunity - effortPenalty(profile) - riskPenalty(profile), 0, 50), 1);
  const fixPriorityScore = round(clampNumber(growthPotential + ctrOpportunity + commercialIntent + dataPenalty(searchConsoleMode, analyticsMode) - internalLinkScore * 0.75 - trafficMomentum * 0.35, 0, 50), 1);
  const trend = searchConsoleItem?.trend ?? analyticsTrend ?? inferTrendLabel(trafficMomentum, ctrOpportunity, searchConsoleMode, analyticsMode);
  const scoreState = searchConsoleMode === "manual-export" || analyticsMode === "manual-export" ? "reale" : "provvisorio";

  return {
    page: profile.pageHref,
    title: profile.title,
    slug: profile.slug,
    locale: profile.locale,
    cluster: profile.cluster,
    queries: baseQueries,
    clicks,
    impressions,
    ctr,
    position,
    trend,
    scoreState,
    trafficMomentum,
    growthPotential,
    commercialIntent,
    internalLinkScore,
    ctrOpportunity,
    finalPriorityScore,
    fixPriorityScore,
    analyticsSessions,
    analyticsTrend,
    indexed: searchConsoleItem?.indexed ?? profile.indexed ?? true,
    ctaPresent: searchConsoleItem?.ctaPresent ?? Boolean(profile.ctaLabel),
    guideLinks: searchConsoleItem?.guideLinks ?? profile.guideCount ?? 0,
    internalLinks: searchConsoleItem?.internalLinks ?? (searchConsoleItem?.guideLinks ?? 0) + internalLinkScore,
    valueEconomic: valueLabel(profile.valueWeight ?? 1),
    problemMain: buildProblemMain({ position, ctr, trafficMomentum, internalLinkScore, analyticsTrend, scoreState }),
    intervention: buildIntervention(profile, { searchConsoleItem, position, ctr, analyticsTrend, internalLinkScore }),
    riskScore: riskPenalty(profile) + dataPenalty(searchConsoleMode, analyticsMode),
    dataMode: searchConsoleMode === "manual-export" || analyticsMode === "manual-export" ? "reale" : "provvisorio",
  };
}

function scoreInternalLinking(profile, searchConsoleItem, seoItem, sourceText) {
  let score = 2;
  score += Math.min(3, (searchConsoleItem?.internalLinks ?? 0) / 2);
  score += Math.min(2, (searchConsoleItem?.guideLinks ?? 0) * 0.75);
  score += Math.min(2, (seoItem?.occurrences ?? 0) / 2);
  score += Math.min(1.5, countOccurrences(sourceText, profile.slug) / 12);
  score += Math.min(1.5, countOccurrences(sourceText, profile.pageHref) / 10);
  return clampScore(score);
}

function scoreCommercialIntent(profile, revenueItem, monetizationItem) {
  const modelBonus = monetizationItem?.model === "lead" ? 3 : monetizationItem?.model === "mixed" ? 2.5 : monetizationItem?.model === "affiliate" ? 2 : 1.5;
  const revenueBonus = revenueItem ? (revenueItem.revenueScore + revenueItem.economicIntent + revenueItem.conversionPotential) / 9 : 0;
  const clusterBonus = ["fiscale", "assicurativa", "ipotecario", "previdenziale"].includes(profile.cluster) ? 1.5 : 0.5;
  return clampScore(3 + modelBonus + revenueBonus + clusterBonus + (profile.valueWeight ?? 1) * 0.5);
}

function scoreCtrOpportunity(position, ctr, profile) {
  let score = 4;
  if (position !== null) {
    if (position >= 8 && position <= 20) score += 4;
    else if (position > 20 && position <= 30) score += 2.5;
    else if (position > 30) score += 1;
  } else {
    score += 1;
  }
  if (ctr !== null && ctr < 2) score += 2;
  if (profile.guideHref) score += 0.5;
  return clampScore(score);
}

function scoreTrafficMomentum(profile, searchConsoleItem, analyticsItem, seoItem, internalLinkScore) {
  let score = profile.valueWeight ? profile.valueWeight * 1.5 : 4;
  if (searchConsoleItem?.impressions !== null && searchConsoleItem?.impressions !== undefined) {
    score += Math.min(2.2, Math.log10(searchConsoleItem.impressions + 10) / 1.8);
  }
  if (searchConsoleItem?.clicks !== null && searchConsoleItem?.clicks !== undefined) {
    score += Math.min(1.2, searchConsoleItem.clicks / 25);
  }
  if (searchConsoleItem?.growthRecent !== null && searchConsoleItem?.growthRecent !== undefined) {
    score += searchConsoleItem.growthRecent > 1 ? Math.min(1.8, (searchConsoleItem.growthRecent - 1) * 4) : -Math.min(1.2, (1 - searchConsoleItem.growthRecent) * 2.5);
  }
  if (searchConsoleItem?.position !== null && searchConsoleItem?.position !== undefined) {
    if (searchConsoleItem.position >= 8 && searchConsoleItem.position <= 20) score += 1.8;
    else if (searchConsoleItem.position > 20 && searchConsoleItem.position <= 30) score += 1.1;
    else if (searchConsoleItem.position > 30) score += 0.4;
  }
  if (analyticsItem?.sessions !== null && analyticsItem?.sessions !== undefined) {
    score += Math.min(1.6, Math.log10(analyticsItem.sessions + 10) / 2);
  }
  if (analyticsItem?.previousSessions !== null && analyticsItem?.previousSessions !== undefined && analyticsItem.previousSessions > 0 && analyticsItem.sessions !== null) {
    const ratio = analyticsItem.sessions / analyticsItem.previousSessions;
    score += ratio >= 1 ? Math.min(1.2, (ratio - 1) * 4) : -Math.min(1.2, (1 - ratio) * 3);
  }
  if (!searchConsoleItem && !analyticsItem) {
    score += Math.min(1.5, (seoItem?.occurrences ?? 0) / 2);
  }
  score += Math.min(0.8, internalLinkScore / 12);
  return clampScore(score);
}

function scoreGrowthPotential(trafficMomentum, commercialIntent, internalLinkScore, ctrOpportunity, revenueItem) {
  const revenueBonus = revenueItem ? Math.min(1.5, revenueItem.finalPriorityScore / 20) : 0;
  return clampScore(trafficMomentum * 0.35 + commercialIntent * 0.25 + internalLinkScore * 0.2 + ctrOpportunity * 0.2 + revenueBonus);
}

function buildProblemMain({ position, ctr, trafficMomentum, internalLinkScore, analyticsTrend, scoreState }) {
  if (scoreState === "provvisorio") return "Dati Search Console / Analytics mancanti o parziali; il trend resta provvisorio.";
  if (position !== null && position >= 8 && position <= 20 && ctr !== null && ctr < 2) return "Posizione utile ma snippet ancora debole.";
  if (position !== null && position > 20 && position <= 30) return "Vicino alla prima pagina, ma ancora fuori dal click zone.";
  if (internalLinkScore <= 4) return "Il cluster ha bisogno di più collegamenti interni.";
  if (analyticsTrend && analyticsTrend.includes("calo")) return "Il traffico sta rallentando e va stabilizzato.";
  if (trafficMomentum >= 7) return "Superficie già in accelerazione: il prossimo passo è consolidare la crescita.";
  return "La pagina ha margine per crescita e presidio del CTR.";
}

function buildIntervention(profile, { searchConsoleItem, position, ctr, analyticsTrend, internalLinkScore }) {
  const title = profile.title;
  const lines = [
    `Title: ${title} con intento svizzero, beneficio concreto e keyword primaria all'inizio.`,
    `Meta description: chiarire il problema, il contesto svizzero e il risultato orientativo.`,
    `H1: ${title}`,
    `Introduzione: spiegare subito perché la pagina esiste e cosa aiuta a capire.`,
    `FAQ: domande su casi comuni, limiti, fonti e verifica ufficiale.`,
    `Esempi: almeno un caso pratico con contesto svizzero.`,
    `Internal linking: rafforzare il cluster con calcolatori e guide correlate.`,
    `CTA: portare l'utente al calcolatore o alla verifica della situazione.`,
    `Schema: WebApplication, FAQPage e BreadcrumbList.`,
  ];
  if (searchConsoleItem?.position !== null && searchConsoleItem?.position !== undefined && ctr !== null && ctr < 2) {
    lines.push("Snippet: riscrivere title e description per migliorare il CTR sulla query già visibile.");
  }
  if (position !== null && position > 20 && position <= 30) {
    lines.push("SERP: rinforzare il contenuto e i link per spingere la pagina oltre la soglia di prima pagina.");
  }
  if (internalLinkScore <= 4) {
    lines.push("Linking: aggiungere inlink da home, hub e guide correlate.");
  }
  if (analyticsTrend && analyticsTrend.includes("calo")) {
    lines.push("Trend: verificare la pagina di destinazione e la leggibilità del primo schermo.");
  }
  return lines;
}

function buildEmergentQueries(pages, searchConsole) {
  const fromPages = pages
    .flatMap((item) => item.queries.map((query) => ({
      query,
      page: item.page,
      score: item.finalPriorityScore + item.trafficMomentum,
      trend: item.trend,
    })))
    .sort((a, b) => b.score - a.score);

  const searchConsoleCandidates = (searchConsole?.candidates ?? []).flatMap((item) =>
    (item.queries ?? []).map((query) => ({
      query,
      page: item.page,
      score: (item.opportunityScore ?? 0) + (item.impressions ?? 0) / 100,
      trend: item.trend,
    })),
  );

  return uniqByQuery([...searchConsoleCandidates, ...fromPages]).sort((a, b) => b.score - a.score);
}

function uniqByQuery(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = item.query.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function buildClusterRanking(pages) {
  const groups = new Map();
  for (const item of pages) {
    const key = trafficClusterLabel(item.page, item.locale, item.cluster);
    if (!groups.has(key)) {
      groups.set(key, {
        cluster: key,
        pages: [],
        totalScore: 0,
        totalMomentum: 0,
        totalIntent: 0,
        totalLinks: 0,
        totalCtrOpportunity: 0,
        scoreState: item.scoreState,
      });
    }
    const group = groups.get(key);
    group.pages.push(item.page);
    group.totalScore += item.finalPriorityScore;
    group.totalMomentum += item.trafficMomentum;
    group.totalIntent += item.commercialIntent;
    group.totalLinks += item.internalLinkScore;
    group.totalCtrOpportunity += item.ctrOpportunity;
    group.scoreState = group.scoreState === "reale" || item.scoreState === "reale" ? "reale" : "provvisorio";
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      avgScore: round(group.totalScore / group.pages.length, 1),
      avgMomentum: round(group.totalMomentum / group.pages.length, 1),
      avgIntent: round(group.totalIntent / group.pages.length, 1),
      avgLinks: round(group.totalLinks / group.pages.length, 1),
      avgCtrOpportunity: round(group.totalCtrOpportunity / group.pages.length, 1),
    }))
    .sort((a, b) => b.avgScore - a.avgScore || b.avgMomentum - a.avgMomentum);
}

function buildRiskRanking(pages) {
  return [...pages]
    .sort((a, b) => b.riskScore - a.riskScore || b.fixPriorityScore - a.fixPriorityScore)
    .slice(0, 5)
    .map((item) => ({
      page: item.page,
      cluster: trafficClusterLabel(item.page, item.locale, item.cluster),
      riskScore: item.riskScore,
      problem: item.problemMain,
      trend: item.trend,
      dataMode: item.dataMode,
      recommendation: item.intervention.slice(0, 2).join(" / "),
    }));
}

function trafficClusterLabel(page, locale, cluster) {
  if (page.includes("quellensteuer")) return "Fiscale / Quellensteuer";
  if (page.includes("praemienverbilligung") || page.includes("krankenkasse")) return "Assicurativa / Prämienverbilligung";
  if (page.includes("brutto-netto") || page.includes("salario") || page.includes("stipendio") || page.includes("stundenlohn")) return "Lavoro / salario";
  if (page.includes("ueberstunden") || page.includes("ferien") || page.includes("arbeitszeit") || page.includes("giorni-lavorativi")) return "Lavoro / tempo";
  if (page.includes("hypothek") || page.includes("cashflow")) return "Casa / ipoteche";
  if (page.includes("familienzulagen") || page.includes("assegni-familiari")) return "Famiglia / assegni";
  if (page.includes("ahv")) return "Previdenza / AHV";
  if (page.includes("arbeitslosen")) return "Previdenza / disoccupazione";
  if (page.includes("/servizi/") || page.includes("servizi-ai-seo")) return "Servizi / lead";
  if (page.includes("/guide/") || page.includes("/ratgeber/")) return locale ? `Guide / ${locale.toUpperCase()}` : "Guide";
  return cluster ? `${cluster}` : "Altro";
}

function inferCluster(route) {
  if (route.includes("quellensteuer") || route.includes("brutto-netto")) return "fiscale";
  if (route.includes("praemienverbilligung") || route.includes("krankenkasse")) return "assicurativa";
  if (route.includes("hypothek") || route.includes("cashflow") || route.includes("costo-vita")) return "ipotecario";
  if (route.includes("ahv") || route.includes("arbeitslosen")) return "previdenziale";
  if (route.includes("familienzulagen") || route.includes("assegni-familiari")) return "famiglia";
  if (route.includes("ueberstunden") || route.includes("ferien") || route.includes("stundenlohn") || route.includes("arbeitszeit")) return "lavoro";
  if (route.includes("/servizi/") || route.includes("servizi-ai-seo")) return "casa";
  return "altro";
}

function inferValueWeight(route) {
  if (route.includes("quellensteuer") || route.includes("praemienverbilligung") || route.includes("hypothek")) return 3;
  if (route.includes("familienzulagen") || route.includes("brutto-netto")) return 2.7;
  if (route.includes("ahv") || route.includes("arbeitslosen")) return 2.5;
  if (route.includes("ueberstunden") || route.includes("ferien") || route.includes("stundenlohn")) return 2.3;
  return 1.8;
}

function buildAnalyticsTrend(analyticsItem) {
  if (!analyticsItem) return null;
  if (analyticsItem.previousSessions !== null && analyticsItem.previousSessions !== undefined && analyticsItem.previousSessions > 0 && analyticsItem.sessions !== null) {
    const ratio = analyticsItem.sessions / analyticsItem.previousSessions;
    if (ratio > 1.15) return `crescita +${Math.round((ratio - 1) * 100)}%`;
    if (ratio < 0.85) return `calo ${Math.round((1 - ratio) * 100)}%`;
    return "stabile";
  }
  if (analyticsItem.trend) return analyticsItem.trend;
  return "stabile";
}

function dataPenalty(searchConsoleMode, analyticsMode) {
  let score = 0;
  if (searchConsoleMode !== "manual-export") score += 1.2;
  if (analyticsMode !== "manual-export") score += 0.8;
  return score;
}

function effortPenalty(profile) {
  if (profile.cluster === "ipotecario") return 6;
  if (profile.cluster === "fiscale" || profile.cluster === "assicurativa") return 4.5;
  if (profile.cluster === "previdenziale") return 4;
  return 3;
}

function riskPenalty(profile) {
  if (profile.cluster === "ipotecario") return 3.5;
  if (profile.cluster === "fiscale" || profile.cluster === "assicurativa") return 3;
  if (profile.cluster === "previdenziale") return 2.5;
  return 1.8;
}

function inferTrendLabel(trafficMomentum, ctrOpportunity, searchConsoleMode, analyticsMode) {
  if (searchConsoleMode === "manual-export" || analyticsMode === "manual-export") {
    if (trafficMomentum >= 7 || ctrOpportunity >= 7) return "in crescita";
    if (trafficMomentum <= 3) return "da sistemare";
    return "stabile";
  }
  return "provvisorio";
}

function buildReport({ stamp, searchConsole, analyticsSnapshots, topGrowthPages, topFixPages, topQueries, topClusters, topRisks }) {
  const searchMode = searchConsole.dataMode === "manual-export" ? "manuale importato" : "fallback repository";
  const analyticsMode = analyticsSnapshots.length > 0 ? "manuale importato" : "fallback repository";
  const markdown = [
    `# Traffic Intelligence Report - ${stamp}`,
    "",
    section("Stato dati", [
      bulletList([
        `Search Console: ${searchMode}`,
        `Analytics: ${analyticsMode}`,
        `Pagine in crescita: ${topGrowthPages.length}`,
        `Pagine da sistemare: ${topFixPages.length}`,
      ]),
    ]),
    "",
    section("Top 10 pagine in crescita", [renderPageTable(topGrowthPages)]),
    "",
    section("Top 10 pagine da sistemare", [renderFixTable(topFixPages)]),
    "",
    section("Top 10 query emergenti", [renderQueryTable(topQueries)]),
    "",
    section("Top 10 cluster", [renderClusterTable(topClusters)]),
    "",
    section("Top 5 rischi", [renderRiskList(topRisks)]),
    "",
  ].join("\n");

  return {
    markdown,
    summary: {
      overview: topGrowthPages[0]
        ? `Prossimo traffico probabile su ${topGrowthPages[0].page} (${topGrowthPages[0].dataMode}).`
        : "Nessuna pagina traffic disponibile.",
      dataMode: searchConsole.dataMode === "manual-export" || analyticsSnapshots.length > 0 ? "reale" : "provvisorio",
      topGrowthPages: topGrowthPages.map((item) => ({ page: item.page, score: item.finalPriorityScore })),
      topFixPages: topFixPages.map((item) => ({ page: item.page, score: item.fixPriorityScore })),
      topQueries: topQueries.map((item) => item.query),
      topClusters: topClusters.map((item) => item.cluster),
      topRisks,
    },
  };
}

function renderPageTable(rows) {
  if (!rows.length) return "- Nessuna pagina disponibile.";
  return [
    "| URL | Query principali | Clic | Impressioni | CTR | Posizione | Traffic Momentum | Growth Potential | Commercial Intent | Internal Link Score | CTR Opportunity | Trend | Stato |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((item) => `| ${[
      item.page,
      item.queries.join(" / ") || "n/d",
      renderMetric(item.clicks),
      renderMetric(item.impressions),
      renderMetric(item.ctr, item.ctr !== null ? "%" : ""),
      renderMetric(item.position),
      renderMetric(item.trafficMomentum),
      renderMetric(item.growthPotential),
      renderMetric(item.commercialIntent),
      renderMetric(item.internalLinkScore),
      renderMetric(item.ctrOpportunity),
      item.trend,
      item.scoreState,
    ].join(" | ")} |`),
  ].join("\n");
}

function renderFixTable(rows) {
  if (!rows.length) return "- Nessuna pagina disponibile.";
  return [
    "| URL | Query principali | Problema principale | Intervento consigliato | Fix Priority | Rischio | Internal Link Score | CTR Opportunity | Trend |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((item) => `| ${[
      item.page,
      item.queries.join(" / ") || "n/d",
      item.problemMain,
      item.intervention.slice(0, 3).join(" / "),
      renderMetric(item.fixPriorityScore),
      renderMetric(item.riskScore),
      renderMetric(item.internalLinkScore),
      renderMetric(item.ctrOpportunity),
      item.trend,
    ].join(" | ")} |`),
  ].join("\n");
}

function renderQueryTable(rows) {
  if (!rows.length) return "- Nessuna query disponibile.";
  return [
    "| Query | Pagina collegata | Trend | Stato |",
    "| --- | --- | --- | --- |",
    ...rows.map((item) => `| ${[item.query, item.page, item.trend ?? "stabile", item.scoreState ?? "provvisorio"].join(" | ")} |`),
  ].join("\n");
}

function renderClusterTable(rows) {
  if (!rows.length) return "- Nessun cluster disponibile.";
  return [
    "| Cluster | Pagine | Score medio | Momentum medio | Intent medio | Link medi | CTR Opportunity media | Stato |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((item) => `| ${[
      item.cluster,
      String(item.pages.length),
      renderMetric(item.avgScore),
      renderMetric(item.avgMomentum),
      renderMetric(item.avgIntent),
      renderMetric(item.avgLinks),
      renderMetric(item.avgCtrOpportunity),
      item.scoreState,
    ].join(" | ")} |`),
  ].join("\n");
}

function renderRiskList(rows) {
  if (!rows.length) return "- Nessun rischio rilevante.";
  return bulletList(rows.map((item) => `${item.page} (${item.cluster}) -> ${item.problem} | rischio ${item.riskScore}`));
}

function renderMetric(value, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(value)) return "n/d";
  const rendered = typeof value === "number" ? round(value, 1).toString() : String(value);
  return `${rendered}${suffix}`;
}

function valueLabel(valueWeight) {
  if (valueWeight >= 2.8) return "alta";
  if (valueWeight >= 2.2) return "media-alta";
  if (valueWeight >= 1.6) return "media";
  return "bassa";
}

function slugToTitle(slug) {
  if (!slug) return "Homepage";
  return slug
    .replace(/[-/]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bAi\b/g, "AI");
}

function buildRouteTitle(route, slug, locale) {
  if (route === "/") return "Homepage";
  if (route === "/de") return "Homepage DE";
  if (route === "/it") return "Homepage IT";
  if (route === "/en") return "Homepage EN";
  if (route === "/fr") return "Homepage FR";
  const base = slugToTitle(slug);
  return locale ? `${base}` : base;
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clampScore(value) {
  return round(clampNumber(value, 1, 10));
}

function uniqStrings(values) {
  return [...new Set(values.filter(Boolean))];
}
