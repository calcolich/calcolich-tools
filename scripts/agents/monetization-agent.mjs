import { findBlockBySlug, readRepoFile } from "./shared/scan-repo.mjs";

function scoreModel(model) {
  if (model === "lead") return { potential: "alta", difficulty: "media", risk: "basso", time: "1-2 giorni" };
  if (model === "mixed") return { potential: "alta", difficulty: "media", risk: "basso", time: "1-3 giorni" };
  if (model === "affiliate") return { potential: "media", difficulty: "media", risk: "basso", time: "1-2 giorni" };
  return { potential: "media", difficulty: "bassa", risk: "basso", time: "1 giorno" };
}

export async function runMonetizationAgent(rules) {
  const files = ["lib/german-calculators.ts", "lib/calculators.ts"];
  const texts = await Promise.all(files.map(async (file) => [file, await readRepoFile(file)]));
  const opportunities = [];

  for (const target of rules.monetization.targets) {
    const sourceFile = target.slug.startsWith("calcolo-") ? "lib/calculators.ts" : "lib/german-calculators.ts";
    const text = texts.find(([file]) => file === sourceFile)?.[1] ?? "";
    const block = findBlockBySlug(text, target.slug);
    if (!block) {
      opportunities.push({
        slug: target.slug,
        model: target.model,
        status: "mancante",
        ...scoreModel(target.model),
      });
      continue;
    }

    const hasCta = /cta:\s*"/.test(block);
    const hasGuideLinks = /guideLinks:\s*\[/.test(block);
    const hasSources = /sources:\s*\[/.test(block);
    const hasMonetization = /monetizationType:\s*"/.test(block);

    opportunities.push({
      slug: target.slug,
      model: target.model,
      status: "presente",
      ...scoreModel(target.model),
      readiness: {
        cta: hasCta,
        guideLinks: hasGuideLinks,
        sources: hasSources,
        monetizationType: hasMonetization,
      },
    });
  }

  const sorted = [...opportunities].sort((a, b) => {
    const order = { alta: 3, media: 2, bassa: 1 };
    return order[b.potential] - order[a.potential];
  });

  return {
    name: "Monetization Agent",
    summary:
      "Ho valutato lead, affiliazioni, AdSense e servizi con priorità alle pagine già vicine a un intento economico forte.",
    opportunities: sorted,
    topOpportunities: sorted.slice(0, 5),
    recommendations: sorted.slice(0, 5).map((item) => {
      if (item.model === "lead") return `Rafforzare CTA e modulo contatto su ${item.slug}.`;
      if (item.model === "affiliate") return `Collegare partner coerenti e comparatori utili su ${item.slug}.`;
      return `Usare ${item.slug} come pagina di traffico e presidio AdSense futuro.`;
    }),
  };
}
