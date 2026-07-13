import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const repoRoot = process.cwd();

export async function readRepoFile(...segments) {
  return readFile(join(repoRoot, ...segments), "utf8");
}

export async function fileExists(...segments) {
  try {
    await stat(join(repoRoot, ...segments));
    return true;
  } catch {
    return false;
  }
}

export async function collectFiles(rootSegments, predicate = () => true) {
  const files = [];
  const rootPath = join(repoRoot, ...rootSegments);

  async function walk(currentPath) {
    const entries = await readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      const rel = relative(repoRoot, fullPath).split(sep).join("/");
      if (predicate(rel)) files.push(rel);
    }
  }

  await walk(rootPath);
  return files;
}

export function todayStamp() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function countOccurrences(text, needle) {
  if (!needle) return 0;
  let count = 0;
  let index = 0;
  while (index !== -1) {
    index = text.indexOf(needle, index);
    if (index !== -1) {
      count += 1;
      index += needle.length;
    }
  }
  return count;
}

export function findBlockBySlug(text, slug) {
  const marker = `slug: "${slug}"`;
  const start = text.indexOf(marker);
  if (start === -1) return null;

  const endCandidates = [
    text.indexOf("\n  },", start),
    text.indexOf("\n    },", start),
    text.indexOf("\n  },\n  {", start),
  ].filter((value) => value !== -1);

  const end = endCandidates.length > 0 ? Math.min(...endCandidates) : text.length;
  return text.slice(start, Math.min(end, start + 8000));
}

export function normalizePath(value) {
  return value.split("?")[0].split("#")[0];
}

export function isInternalPath(href) {
  return href.startsWith("/") && !href.startsWith("/_next") && !href.startsWith("/api/");
}

export function routePathFromHtmlPath(htmlPath) {
  const body = htmlPath
    .replace(/^\.next\/server\/app\//, "")
    .replace(/\/index\.html$/, "")
    .replace(/\/page\.html$/, "")
    .replace(/\.html$/, "")
    .replace(/\/route\.body$/, "")
    .replace(/\/route\.html$/, "")
    .replace(/\/index$/, "");

  if (!body || body === "app") return "/";
  const parts = body
    .split("/")
    .filter(Boolean)
    .filter((part) => !["app", "(site)", "[slug]", "[lang]", "page", "index"].includes(part));
  return `/${parts.join("/")}`.replace(/\/+/g, "/") || "/";
}

export function routePathFromSourcePage(filePath) {
  const withoutPrefix = filePath.replace(/^app\//, "");
  const body = withoutPrefix.replace(/\/page\.tsx$/, "");
  const parts = body
    .split("/")
    .filter(Boolean)
    .filter((part) => !["(site)", "(calculators)", "(site)", "[slug]", "[lang]", "page", "index"].includes(part));
  return `/${parts.join("/")}`.replace(/\/+/g, "/") || "/";
}
