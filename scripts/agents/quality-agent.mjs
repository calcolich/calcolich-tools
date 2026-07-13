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

export async function runQualityAgent() {
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

  return {
    name: "Quality Agent",
    summary: "Ho eseguito lint, build e controlli statici su titoli, route e link interni generati.",
    lint,
    build,
    routeCount: routeSet.size,
    duplicateTitles,
    brokenLinks: brokenLinks.slice(0, 40),
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
  };
}

async function fileExistsSafe(path) {
  try {
    await readFile(path, "utf8");
    return true;
  } catch {
    return false;
  }
}
