import { findBlockBySlug, readRepoFile } from "./shared/scan-repo.mjs";

function checkMarkers(block, markers) {
  return markers.filter((marker) => !block.includes(marker));
}

function summarizeMissing(slug, file, missingMarkers) {
  if (missingMarkers.length === 0) {
    return null;
  }
  return {
    slug,
    file,
    missingMarkers,
    severity: missingMarkers.includes("sources:") || missingMarkers.includes("updatedAt:") ? "alta" : "media",
  };
}

export async function runContentDataAgent(rules, context = {}) {
  const findings = [];
  const updates = [];

  for (const watch of rules.content.watchlist) {
    const text = await readRepoFile(watch.file);
    for (const slug of watch.slugs) {
      const block = findBlockBySlug(text, slug);
      if (!block) {
        findings.push({
          slug,
          file: watch.file,
          missingMarkers: ["block-not-found"],
          severity: "alta",
        });
        continue;
      }

      const missingMarkers = checkMarkers(block, watch.requiredMarkers);
      const finding = summarizeMissing(slug, watch.file, missingMarkers);
      if (finding) findings.push(finding);

      const hasFormula = block.includes("formula:");
      const hasExample = block.includes("example:");
      const hasFaqs = block.includes("faqs:");
      const hasSources = block.includes("sources:");
      const hasUpdatedAt = block.includes("updatedAt:");

      if (!hasFormula || !hasExample || !hasFaqs || !hasSources || !hasUpdatedAt) {
        updates.push({
          slug,
          file: watch.file,
          keepWatching: {
            formula: hasFormula,
            example: hasExample,
            faqs: hasFaqs,
            sources: hasSources,
            updatedAt: hasUpdatedAt,
          },
        });
      }
    }
  }

  return {
    name: "Content & Data Agent",
    summary:
      "Ho controllato i blocchi editoriali e i marcatori di dati per le pagine DE e IT prioritarie.",
    findings,
    updates,
    recommendations: updates.slice(0, 8).map((item) => {
      const missing = Object.entries(item.keepWatching)
        .filter(([, ok]) => !ok)
        .map(([key]) => key)
        .join(", ");
      return `Rivedere ${item.slug} in ${item.file}: mancano o vanno rinforzati ${missing}.`;
    }),
    upstream: context.previous ?? null,
  };
}
