import { bulletList, section } from './shared/output.mjs';
import { buildCeoDecisionPlan, buildCeoDailyMarkdown } from './shared/growth.mjs';

function buildCeoReport(stamp, ceo) {
  const markdown = [
    `# CEO / Product Manager Agent - ${stamp}`,
    '',
    section('Decisioni prese', [bulletList(ceo.top3.map((item) => `${item.decisionRole === 'main' ? 'Attività principale' : 'Priorità'}: ${item.page} (${item.finalPriorityScore}) - ${item.why}`))]),
    '',
    section('Motivazioni', [bulletList(ceo.top3.map((item) => `${item.page}: ${item.why}`))]),
    '',
    section('Attività assegnate', [bulletList(ceo.top3.map((item) => `${item.page} -> ${item.assignedAgents.join(', ')}`))]),
    '',
    section('Stato', [
      bulletList([
        `Stato CEO: ${ceo.state ?? 'ready'}`,
        `Quality gate bloccante: ${ceo.blocked ? 'Sì' : 'No'}`,
        `Backlog aggiornato: ${ceo.backlog?.length ?? 0} attività`,
        `Priorità principale: ${ceo.mainActivity ? ceo.mainActivity.page : 'non disponibile'}`,
      ]),
    ]),
    '',
    section('KPI da controllare domani', [bulletList(ceo.kpisTomorrow ?? ['CTR', 'clic al calcolatore', 'lead start'])]),
    '',
  ].join('\n');

  return {
    markdown,
    summary: {
      top3: ceo.top3,
      mainActivity: ceo.mainActivity,
      blocked: ceo.blocked,
    },
  };
}

export async function runCeoAgent(rules, context = {}) {
  const revenue = context.revenue ?? null;
  const quality = context.quality ?? null;
  const ranking = revenue?.ranking ?? [];
  const backlog = context.backlog ?? [];
  const ceo = buildCeoDecisionPlan({
    ranking,
    quality,
    backlog,
    stamp: rules._stamp ?? new Date().toISOString().slice(0, 10),
    traffic: context.traffic ?? null,
    searchConsole: context.searchConsole ?? null,
    seo: context.seo ?? null,
    content: context.content ?? null,
    monetization: context.monetization ?? null,
    social: context.social ?? null,
    revenue,
  });
  const stamp = rules._stamp ?? new Date().toISOString().slice(0, 10);
  const report = buildCeoReport(stamp, ceo);

  return {
    name: 'CEO / Product Manager Agent',
    summary: ceo.summary,
    ceo,
    report,
    dailyReport: {
      markdown: buildCeoDailyMarkdown(stamp, ceo),
      summary: {
        decisions: ceo.top3,
        status: ceo.state,
        kpisTomorrow: ceo.kpisTomorrow,
      },
    },
  };
}
