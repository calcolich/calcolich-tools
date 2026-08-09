import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { collectFiles, isInternalPath, normalizePath, routePathFromHtmlPath, routePathFromSourcePage } from "./shared/scan-repo.mjs";

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function extractTitles(html) {
  return Array.from(html.matchAll(/<title>([^<]+)<\/title>/gi)).map((match) => match[1].trim());
}

function extractInternalLinks(html) {
  return Array.from(html.matchAll(/href="([^"]+)"/gi))
    .map((match) => match[1])
    .map(normalizePath)
    .filter(isInternalPath)
    .filter((href) => !href.startsWith("/_next/"))
    .filter((href) => !href.includes("."));
}

export async function runQualityAgent(context = {}) {
  const lint = runCommand("npm", ["run", "lint"]);
  const build = runCommand("npm", ["run", "build"]);

  const htmlFiles = await collectFiles([".next/server/app"], (file) => file.endsWith(".html"));
  const sourcePageFiles = await collectFiles(["app"], (file) => file.endsWith("/page.tsx"));
  const routeSet = new Set([
    ...htmlFiles.map(routePathFromHtmlPath),
    ...sourcePageFiles.map(routePathFromSourcePage),
  ]);
  const titleCounts = new Map();
  const brokenLinks = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    for (const title of extractTitles(html)) {
      titleCounts.set(title, (titleCounts.get(title) ?? 0) + 1);
    }

    for (const href of extractInternalLinks(html)) {
      if (href === "/" || href.startsWith("/api/") || href.startsWith("/guide/")) continue;
      if (!routeSet.has(href)) {
        brokenLinks.push({ file, href });
      }
    }
  }

  const duplicateTitles = Array.from(titleCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([title, count]) => ({ title, count }));

  const blockers = [
    !lint.ok ? "Lint non superato." : null,
    !build.ok ? "Build non superata." : null,
    duplicateTitles.length > 0 ? `Title duplicati rilevati: ${duplicateTitles.length}.` : null,
    brokenLinks.length > 0 ? `Link interni rotti rilevati: ${brokenLinks.length}.` : null,
  ].filter(Boolean);

  return {
    name: "Quality Agent",
    summary: "Ho eseguito lint, build e controlli statici su titoli, route e link interni generati.",
    lint,
    build,
    routeCount: routeSet.size,
    duplicateTitles,
    brokenLinks: brokenLinks.slice(0, 40),
    blockers,
    checks: {
      sitemap: await fileExistsSafe("app/sitemap.ts"),
      robots: await fileExistsSafe("app/robots.ts"),
      localizedRoutes: await fileExistsSafe("app/de/[slug]/page.tsx") && await fileExistsSafe("app/it/[slug]/page.tsx"),
    },
    recommendations: [
      !lint.ok ? "Correggere i problemi ESLint prima del prossimo rilascio." : null,
      !build.ok ? "Correggere il build failure prima di considerare nuove modifiche." : null,
      duplicateTitles.length > 0 ? "Ridurre i title duplicati individuati nel rendering statico." : null,
      brokenLinks.length > 0 ? "Verificare i link interni segnalati dall'HTML generato." : null,
    ].filter(Boolean),
    upstream: context.previous ?? null,
  };
}

export function validateSocialTrafficBundle(bundle, knownRoutes = new Set()) {
  const issues = [];
  const duplicateTexts = new Map();
  const bannedPhrases = [
    "risparmio garantito",
    "guadagno garantito",
    "percentuali garantite",
    "testimonianza",
    "investi ora",
    "offerta esclusiva",
    "risultato certo",
    "risultati certi",
  ];

  for (const campaign of bundle.campaigns ?? []) {
    if (!campaign.locale || !["de", "it"].includes(campaign.locale)) {
      issues.push({ scope: campaign.id ?? campaign.pageHref, type: "lingua", message: "Lingua non supportata o mancante." });
    }

    if (!campaign.pageHref || !campaign.pageHref.startsWith("/")) {
      issues.push({ scope: campaign.id ?? campaign.pageHref, type: "link", message: "Pagina destinazione mancante o non valida." });
    } else if (knownRoutes.size > 0 && !knownRoutes.has(campaign.pageHref)) {
      issues.push({ scope: campaign.id ?? campaign.pageHref, type: "link", message: `Route non trovata: ${campaign.pageHref}` });
    }

    for (const channel of campaign.channels ?? []) {
      for (const item of channel.items ?? []) {
        const text = normalizeSocialText([
          item.title,
          item.body,
          item.question,
          item.cta,
          item.caption,
          ...(item.slides?.map((slide) => `${slide.title} ${slide.text}`) ?? []),
          ...(item.scenes ?? []),
          ...(item.overlayText ?? []),
          item.script,
          item.description,
        ].filter(Boolean).join(" "));

        if (!item.utmUrl?.includes("utm_source=") || !item.utmUrl?.includes("utm_medium=organic_social") || !item.utmUrl?.includes("utm_campaign=") || !item.utmUrl?.includes("utm_content=")) {
          issues.push({ scope: `${campaign.id}:${channel.name}:${item.variant}`, type: "utm", message: "UTM incompleto o incoerente." });
        }

        if (item.utmUrl?.includes("canonical=") || item.utmUrl?.includes("noindex=")) {
          issues.push({ scope: `${campaign.id}:${channel.name}:${item.variant}`, type: "utm", message: "UTM contiene parametri non ammessi." });
        }

        const duplicateKey = `${channel.name}:${text}`;
        duplicateTexts.set(duplicateKey, (duplicateTexts.get(duplicateKey) ?? 0) + 1);

        for (const phrase of bannedPhrases) {
          if (text.includes(phrase)) {
            issues.push({ scope: `${campaign.id}:${channel.name}:${item.variant}`, type: "copy", message: `Frase non consentita: ${phrase}` });
          }
        }

        if (item.language && item.language !== campaign.locale) {
          issues.push({ scope: `${campaign.id}:${channel.name}:${item.variant}`, type: "lingua", message: "Lingua dichiarata non coerente con la campagna." });
        }
      }
    }
  }

  const duplicateTextsList = Array.from(duplicateTexts.entries())
    .filter(([, count]) => count > 1)
    .map(([text, count]) => ({ text, count }));

  return {
    ok: issues.length === 0 && duplicateTextsList.length === 0,
    issues,
    duplicateTexts: duplicateTextsList,
  };
}

export function validateLaunchWeekPack(pack, knownRoutes = new Set()) {
  const issues = [];
  const duplicateTexts = new Map();
  const seenDates = new Set();
  const seenPages = new Set();
  const bannedPhrases = [
    "risparmio garantito",
    "guadagno garantito",
    "percentuali garantite",
    "testimonianza",
    "investi ora",
    "offerta esclusiva",
    "risultato certo",
    "risultati certi",
  ];

  for (const entry of pack.entries ?? []) {
    const scope = `${entry.date}:${entry.channel}`;

    if (!entry.date) {
      issues.push({ scope, type: "date", message: "Data mancante nel launch week pack." });
    } else if (seenDates.has(entry.date)) {
      issues.push({ scope, type: "date", message: `Data duplicata: ${entry.date}` });
    } else {
      seenDates.add(entry.date);
    }

    if (!entry.pageHref || !entry.pageHref.startsWith("/")) {
      issues.push({ scope, type: "link", message: "Pagina destinazione mancante o non valida." });
    } else if (knownRoutes.size > 0 && !knownRoutes.has(entry.pageHref)) {
      issues.push({ scope, type: "link", message: `Route non trovata: ${entry.pageHref}` });
    } else if (entry.pageHref && seenPages.has(entry.pageHref)) {
      issues.push({ scope, type: "link", message: `Pagina ripetuta nel launch week: ${entry.pageHref}` });
    } else if (entry.pageHref) {
      seenPages.add(entry.pageHref);
    }

    if (!entry.utmUrl?.includes("utm_source=") || !entry.utmUrl?.includes("utm_medium=organic_social") || !entry.utmUrl?.includes("utm_campaign=") || !entry.utmUrl?.includes("utm_content=")) {
      issues.push({ scope, type: "utm", message: "UTM incompleto o incoerente." });
    }

    if (entry.utmUrl?.includes("canonical=") || entry.utmUrl?.includes("noindex=")) {
      issues.push({ scope, type: "utm", message: "UTM contiene parametri non ammessi." });
    }

    const text = normalizeSocialText([
      entry.title,
      entry.text,
      entry.visual,
      entry.cta,
      ...(entry.overlayText ?? []),
      ...(entry.scenes ?? []),
    ].filter(Boolean).join(" "));

    const duplicateKey = `${entry.channel}:${text}`;
    duplicateTexts.set(duplicateKey, (duplicateTexts.get(duplicateKey) ?? 0) + 1);

    for (const phrase of bannedPhrases) {
      if (text.includes(phrase)) {
        issues.push({ scope, type: "copy", message: `Frase non consentita: ${phrase}` });
      }
    }

    if (!["de", "it"].includes(entry.language)) {
      issues.push({ scope, type: "lingua", message: "Lingua non supportata nel launch week pack." });
    }

    if (entry.status !== "bozza") {
      issues.push({ scope, type: "status", message: "Il launch week pack deve partire in bozza." });
    }
  }

  const duplicateTextsList = Array.from(duplicateTexts.entries())
    .filter(([, count]) => count > 1)
    .map(([text, count]) => ({ text, count }));

  if ((pack.entries ?? []).length !== 7) {
    issues.push({ scope: "launch-week", type: "size", message: "Il launch week pack deve contenere esattamente 7 contenuti." });
  }

  return {
    ok: issues.length === 0 && duplicateTextsList.length === 0,
    issues,
    duplicateTexts: duplicateTextsList,
  };
}

function normalizeSocialText(value) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

async function fileExistsSafe(path) {
  try {
    await readFile(path, "utf8");
    return true;
  } catch {
    return false;
  }
}
