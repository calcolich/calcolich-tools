import { collectFiles, countOccurrences, readRepoFile } from "./shared/scan-repo.mjs";

function titleCaseSlug(slug) {
  return slug.replace(/[-/]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function runSeoAgent(rules) {
  const pageFiles = await collectFiles(["app"], (file) => file.endsWith("/page.tsx"));
  const repoFiles = [
    ...(await collectFiles(["app"], () => true)),
    ...(await collectFiles(["components"], () => true)),
    ...(await collectFiles(["content"], () => true)),
    ...(await collectFiles(["lib"], () => true)),
    ...(await collectFiles(["docs"], (file) => file.endsWith(".md"))),
    ...(await collectFiles(["scripts"], (file) => file.endsWith(".mjs") || file.endsWith(".json"))),
  ];
  const repoText = await Promise.all(
    repoFiles.map(async (file) => [file, await readRepoFile(file)]),
  );

  const missingMetadata = [];
  const duplicateTitles = new Map();

  for (const file of pageFiles) {
    const text = await readRepoFile(file);
    const hasMetadata = /export const metadata\b/.test(text) || /getLocalizedMetadata\b/.test(text) || /alternates:\s*localizedAlternates/.test(text);
    const isDynamicWrapper = file.includes("[slug]") || file.includes("[lang]");
    if (!isDynamicWrapper && !hasMetadata) missingMetadata.push(file);

    const titleMatches = Array.from(text.matchAll(/title:\s*"([^"]+)"/g)).map((match) => match[1]);
    for (const title of titleMatches) {
      duplicateTitles.set(title, (duplicateTitles.get(title) ?? 0) + 1);
    }
  }

  const duplicateTitleList = Array.from(duplicateTitles.entries())
    .filter(([, count]) => count > 1)
    .map(([title, count]) => ({ title, count }));

  const keywordCoverage = rules.seo.keywords.map((item) => {
    const occurrences = repoText.reduce(
      (sum, [, text]) => sum + countOccurrences(text, item.target.split("/").pop() ?? item.keyword),
      0,
    );
    const priority = occurrences >= 4 ? "bassa" : occurrences >= 2 ? "media" : "alta";
    return {
      ...item,
      occurrences,
      priority,
      status: occurrences > 0 ? "coperta" : "mancante",
    };
  });

  const isolatedPages = keywordCoverage
    .filter((item) => item.occurrences <= 2)
    .map((item) => ({
      keyword: item.keyword,
      target: item.target,
      priority: item.priority,
      note: item.occurrences === 0 ? "pagina non ancora collegata" : "pochi link interni o riferimenti",
    }));

  return {
    name: "SEO Agent",
    summary:
      "Ho verificato copertura keyword, pagine senza metadata evidente, titoli duplicati e livello di collegamento interno.",
    missingMetadata,
    duplicateTitles: duplicateTitleList,
    keywordCoverage,
    isolatedPages,
    recommendations: [
      ...missingMetadata.slice(0, 5).map((file) => `Aggiungere metadata o alternates espliciti in ${file}.`),
      ...isolatedPages.slice(0, 5).map((item) => `Collegare meglio ${item.target} nel cluster ${item.keyword}.`),
    ],
  };
}

export function seoPriorityLabel(item) {
  return item.priority === "alta" ? "alta" : item.priority === "media" ? "media" : "bassa";
}

export function seoKeywordLabel(keyword) {
  return titleCaseSlug(keyword);
}
