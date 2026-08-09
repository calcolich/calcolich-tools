import { runContentDataAgent } from './content-data-agent.mjs';
import { runMonetizationAgent } from './monetization-agent.mjs';
import { runSearchConsoleOpportunityAgent } from './search-console-opportunity-agent.mjs';
import { runSeoAgent } from './seo-agent.mjs';
import { bulletList, section } from './shared/output.mjs';
import { buildGrowthCatalog, buildGrowthRanking } from './shared/growth.mjs';

function labelForScore(value) {
  if (value >= 24) return 'molto alto';
  if (value >= 18) return 'alto';
  if (value >= 12) return 'medio';
  return 'basso';
}

function riskLabel(value) {
  if (value >= 12) return 'alto';
  if (value >= 9) return 'medio';
  return 'basso';
}

function effortLabel(value) {
  if (value >= 7) return 'alto';
  if (value >= 5) return 'medio';
  return 'basso';
}

function buildRevenueReport(stamp, ranking) {
  const top10 = ranking.slice(0, 10);
  const markdown = [
    `# Revenue Agent - ${stamp}`,
    '',
    section('Stato dati', [bulletList([
      `Pagine valutate: ${ranking.length}`,
      `Punteggi reali o provvisori: ${ranking.some((item) => item.scoreState === 'reale') ? 'reali parziali' : 'provvisori'}`,
    ])]),
    '',
    section('Top 10 opportunita', [renderRevenueTable(top10)]),
    '',
    section('Focus economico', [bulletList(top10.slice(0, 5).map((item) => `${item.page} -> ${labelForScore(item.revenueScore)} (${item.model})`))]),
    '',
  ].join('\n');

  return {
    markdown,
    summary: {
      topPages: top10.slice(0, 5).map((item) => item.page),
      topOpportunity: top10[0] ?? null,
      scoreState: top10.some((item) => item.scoreState === 'reale') ? 'reale' : 'provvisorio',
    },
  };
}

function renderRevenueTable(rows) {
  const tableRows = rows.map((item) => [
    item.page,
    item.scoreState,
    item.seoOpportunity,
    item.trafficTrend,
    item.economicIntent,
    item.conversionPotential,
    item.internalLinkingPotential,
    item.developmentEffort,
    item.riskScore,
    item.finalPriorityScore,
    item.problemMain,
  ].join(' | '));

  return [
    '| URL | Stato | SEO opportunity | Traffic trend | Economic intent | Conversion potential | Internal links | Effort | Risk | Final Priority | Problema principale |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    ...tableRows.map((row) => `| ${row} |`),
  ].join('\n');
}

export async function runRevenueAgent(rules, context = {}) {
  const seo = context.seo ?? (await runSeoAgent(rules));
  const content = context.content ?? (await runContentDataAgent(rules));
  const monetization = context.monetization ?? (await runMonetizationAgent(rules));
  const searchConsole = context.searchConsole ?? (await runSearchConsoleOpportunityAgent(rules, { seo, content, monetization }));
  const catalog = buildGrowthCatalog(rules, { searchConsole, seo, monetization });
  const ranking = buildGrowthRanking(catalog, { searchConsole, content, social: context.social ?? null });
  ranking.sort((a, b) => b.finalPriorityScore - a.finalPriorityScore || b.revenueScore - a.revenueScore);

  const enriched = ranking.map((item) => ({
    ...item,
    adsensePotential: labelForScore(item.opportunityScore),
    leadPotential: item.model === 'lead' ? 'alto' : item.model === 'mixed' ? 'medio-alto' : 'medio',
    affiliatePotential: item.model === 'affiliate' ? 'alto' : item.model === 'lead' ? 'medio' : 'basso',
    commercialValue: labelForScore(item.revenueScore),
    conversionProbability: labelForScore(item.conversionPotential),
    monetizationTime: item.model === 'lead' ? '1-2 giorni' : item.model === 'mixed' ? '1-3 giorni' : '1-2 giorni',
    riskLabel: riskLabel(item.riskScore),
    effortLabel: effortLabel(item.effortScore),
  }));

  const report = buildRevenueReport(rules._stamp ?? new Date().toISOString().slice(0, 10), enriched);

  return {
    name: 'Revenue Agent',
    summary: report.summary.topOpportunity ? `Revenue focus: ${report.summary.topOpportunity.page}` : 'Revenue focus non disponibile',
    ranking: enriched,
    report,
    upstream: context.previous ?? null,
  };
}
