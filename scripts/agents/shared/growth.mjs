import { bulletList, section } from "./output.mjs";

const CLUSTER_CONFIG = {
  fiscale: { effort: 6, maintenanceRisk: 6, regulatoryRisk: 7, label: "fiscale" },
  assicurativa: { effort: 6, maintenanceRisk: 6, regulatoryRisk: 7, label: "assicurativo" },
  ipotecario: { effort: 7, maintenanceRisk: 6, regulatoryRisk: 6, label: "ipotecario" },
  previdenziale: { effort: 6, maintenanceRisk: 5, regulatoryRisk: 6, label: "previdenziale" },
  famiglia: { effort: 5, maintenanceRisk: 5, regulatoryRisk: 4, label: "famiglia" },
  lavoro: { effort: 4, maintenanceRisk: 4, regulatoryRisk: 3, label: "lavoro" },
  casa: { effort: 6, maintenanceRisk: 5, regulatoryRisk: 5, label: "casa" },
  altro: { effort: 5, maintenanceRisk: 4, regulatoryRisk: 4, label: "altro" },
};

const MODEL_RANK = {
  lead: 9,
  mixed: 8,
  affiliate: 7,
  traffic: 5,
};

export function buildGrowthCatalog(rules, { searchConsole, seo, monetization }) {
  const searchConsoleTargets = rules.searchConsole?.targets ?? [];
  const focusPages = rules.growth?.focusPages ?? [];
  const allPages = [...searchConsoleTargets, ...focusPages];
  const seoCoverageByTarget = new Map((seo.keywordCoverage ?? []).map((item) => [item.target, item]));
  const monetizationBySlug = new Map((monetization.opportunities ?? []).map((item) => [item.slug, item]));
  const searchConsoleByPage = new Map((searchConsole?.candidates ?? []).map((item) => [item.page, item]));
  const pages = [];
  const seen = new Set();

  for (const target of allPages) {
    if (!target.pageHref || seen.has(target.pageHref)) continue;
    seen.add(target.pageHref);
    const slug = slugFromPath(target.pageHref);
    pages.push({
      ...target,
      title: target.title ?? target.pageTitle ?? slugToTitle(slug),
      slug,
      seoItem: seoCoverageByTarget.get(target.pageHref) ?? seoCoverageByTarget.get(target.pageHref.replace(/^\/de\//, "/").replace(/^\/it\//, "/")) ?? null,
      monetizationItem: monetizationBySlug.get(slug) ?? null,
      searchConsoleItem: searchConsoleByPage.get(target.pageHref) ?? null,
      scoreState: searchConsole?.dataMode === "manual-export" && searchConsoleByPage.has(target.pageHref) ? "reale" : "provvisorio",
      source: searchConsoleTargets.some((item) => item.pageHref === target.pageHref) ? "search-console" : "growth-focus",
    });
  }

  return pages;
}

export function buildGrowthRanking(catalog, { searchConsole, content, social }) {
  return catalog.map((profile) => buildGrowthProfile(profile, { searchConsole, content, social }));
}

export function dedupeBacklogItems(items) {
  const map = new Map();
  for (const item of items) {
    const key = `${item.page}|${item.type}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, item);
      continue;
    }

    map.set(key, {
      ...existing,
      agents: uniqStrings([...(existing.agents ?? []), ...(item.agents ?? [])]),
      dependencies: uniqStrings([...(existing.dependencies ?? []), ...(item.dependencies ?? [])]),
      impactSeo: Math.max(existing.impactSeo ?? 0, item.impactSeo ?? 0),
      impactEconomic: Math.max(existing.impactEconomic ?? 0, item.impactEconomic ?? 0),
      effort: Math.max(existing.effort ?? 0, item.effort ?? 0),
      risk: Math.max(existing.risk ?? 0, item.risk ?? 0),
      priority: Math.max(existing.priority ?? 0, item.priority ?? 0),
      updatedAt: item.updatedAt ?? existing.updatedAt,
      problem: existing.problem ?? item.problem,
      intervention: uniqStrings([...(existing.intervention ?? []), ...(item.intervention ?? [])]),
    });
  }

  return [...map.values()].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || (b.impactSeo ?? 0) - (a.impactSeo ?? 0));
}

export function buildBacklogFromRanking(ranking, stamp) {
  const items = ranking.map((item, index) => ({
    id: `${stamp}-${String(index + 1).padStart(2, "0")}-${item.slug}`,
    page: item.page,
    cluster: item.cluster,
    type: "growth-page-optimization",
    agents: [
      "Search Console Opportunity Agent",
      "SEO Agent",
      "Content & Data Agent",
      "Monetization Agent",
      "Revenue Agent",
      "Social Traffic Agent",
      "Quality Agent",
    ],
    problem: item.problemMain,
    intervention: item.intervention,
    impactSeo: item.seoOpportunity,
    impactEconomic: item.economicIntent,
    effort: item.developmentEffort,
    risk: item.riskScore,
    priority: item.finalPriorityScore,
    status: index < 3 ? "proposed" : "discovered",
    dependencies: item.dependencies,
    lastReviewed: stamp,
    scoreState: item.scoreState,
    title: item.title,
    source: item.source,
  }));

  return dedupeBacklogItems(items);
}

export function buildBacklogFromTraffic(traffic, stamp) {
  const growthItems = (traffic?.topGrowthPages ?? []).slice(0, 10).map((item, index) => ({
    id: `${stamp}-traffic-growth-${String(index + 1).padStart(2, "0")}-${slugFromPath(item.page)}`,
    page: item.page,
    cluster: item.cluster,
    type: "traffic-growth-opportunity",
    agents: ["Traffic Intelligence Agent", "SEO Agent", "Revenue Agent", "CEO / Product Manager Agent"],
    problem: item.problemMain,
    intervention: item.intervention,
    impactSeo: item.growthPotential ?? item.trafficMomentum ?? 0,
    impactEconomic: item.commercialIntent ?? 0,
    effort: item.fixPriorityScore ?? item.developmentEffort ?? 0,
    risk: item.riskScore ?? 0,
    priority: item.finalPriorityScore ?? 0,
    status: index < 3 ? "proposed" : "discovered",
    dependencies: uniqStrings([item.guideHref, ...(item.linkedPages ?? [])]),
    lastReviewed: stamp,
    scoreState: item.scoreState,
    title: item.title,
    source: "traffic-intelligence",
    signal: "growth",
  }));

  const fixItems = (traffic?.topFixPages ?? []).slice(0, 10).map((item, index) => ({
    id: `${stamp}-traffic-fix-${String(index + 1).padStart(2, "0")}-${slugFromPath(item.page)}`,
    page: item.page,
    cluster: item.cluster,
    type: "traffic-fix-opportunity",
    agents: ["Traffic Intelligence Agent", "SEO Agent", "Content & Data Agent", "Quality Agent", "CEO / Product Manager Agent"],
    problem: item.problemMain,
    intervention: item.intervention,
    impactSeo: item.ctrOpportunity ?? 0,
    impactEconomic: item.commercialIntent ?? 0,
    effort: item.fixPriorityScore ?? item.developmentEffort ?? 0,
    risk: item.riskScore ?? 0,
    priority: item.fixPriorityScore ?? item.finalPriorityScore ?? 0,
    status: index < 3 ? "proposed" : "discovered",
    dependencies: uniqStrings([item.guideHref, ...(item.linkedPages ?? [])]),
    lastReviewed: stamp,
    scoreState: item.scoreState,
    title: item.title,
    source: "traffic-intelligence",
    signal: "fix",
  }));

  return dedupeBacklogItems([...growthItems, ...fixItems]);
}

export function selectCeoPriorities(ranking, quality, traffic = null) {
  const blocked = Boolean(quality?.blockers?.length);
  const trafficBoost = new Map();
  const growthPages = traffic?.topGrowthPages ?? [];
  const fixPages = traffic?.topFixPages ?? [];

  growthPages.forEach((item, index) => {
    trafficBoost.set(item.page, (trafficBoost.get(item.page) ?? 0) + Math.max(0.5, 3 - index * 0.25));
  });
  fixPages.forEach((item, index) => {
    trafficBoost.set(item.page, (trafficBoost.get(item.page) ?? 0) + Math.max(0.25, 1.5 - index * 0.12));
  });

  const allowed = ranking.filter((item) => !blocked || item.finalPriorityScore >= 0);
  const sorted = [...allowed].sort((a, b) => {
    const scoreA = (a.finalPriorityScore ?? 0) + (trafficBoost.get(a.page) ?? 0);
    const scoreB = (b.finalPriorityScore ?? 0) + (trafficBoost.get(b.page) ?? 0);
    return scoreB - scoreA || (b.revenueScore ?? 0) - (a.revenueScore ?? 0);
  });
  const top3 = sorted.slice(0, 3).map((item, index) => ({
    rank: index + 1,
    page: item.page,
    title: item.title,
    cluster: item.cluster,
    scoreState: item.scoreState,
    finalPriorityScore: item.finalPriorityScore,
    trafficBoost: trafficBoost.get(item.page) ?? 0,
    adjustedPriorityScore: (item.finalPriorityScore ?? 0) + (trafficBoost.get(item.page) ?? 0),
    why: buildWhy(item),
    seoImpact: item.seoOpportunity,
    economicImpact: item.economicIntent,
    time: estimateTime(item),
    risk: item.riskScore,
    riskScore: item.riskScore,
    maintenanceRisk: item.maintenanceRisk,
    regulatoryRisk: item.regulatoryRisk,
    intervention: item.intervention,
    ctaLabel: item.ctaLabel,
    socialChannel: item.socialChannel,
    status: blocked ? "blocked" : "proposed",
  }));

  return {
    blocked,
    top3,
    mainActivity: top3[0] ?? null,
    summary: top3[0]
      ? `${top3[0].page} è la priorità del giorno${blocked ? " ma il quality gate segnala blocchi" : ""}.`
      : "Nessuna priorità selezionabile.",
  };
}

export function buildCeoDecisionPlan({
  ranking,
  quality,
  backlog = [],
  stamp,
  traffic = null,
  searchConsole = null,
  seo = null,
  content = null,
  monetization = null,
  social = null,
  revenue = null,
}) {
  const selection = selectCeoPriorities(ranking, quality, traffic);
  const decisions = selection.top3.map((item) => {
    const assignedAgents = assignAgentsForItem(item);
    return {
      ...item,
      assignedAgents,
      decisionState: selection.blocked ? "blocked" : "approved",
      decisionRole: item.rank === 1 ? "main" : "priority",
      nextStep: buildNextStep(item),
    };
  });
  const decidedPages = new Set(decisions.map((item) => item.page));
  const backlogUpdated = backlog.map((item) => {
    if (!decidedPages.has(item.page)) return item;
    const decision = decisions.find((entry) => entry.page === item.page);
    return {
      ...item,
      status: selection.blocked ? "blocked" : item.page === selection.mainActivity?.page ? "approved" : "approved",
      decisionState: selection.blocked ? "blocked" : "approved",
      decisionRole: decision?.decisionRole ?? "priority",
      assignedAgents: decision?.assignedAgents ?? [],
      lastReviewed: stamp,
    };
  });
  const deferred = ranking.slice(3, 8).map((item, index) => ({
    rank: index + 4,
    page: item.page,
    title: item.title,
    why: `Posticipata per ROI inferiore rispetto alle prime tre attività.`,
    finalPriorityScore: item.finalPriorityScore,
    assignedAgents: buildDeferredAgents(item),
  }));
  const kpisTomorrow = buildTomorrowKpis(selection.mainActivity, searchConsole, seo, content, monetization, social, revenue);

  return {
    ...selection,
    top3: decisions,
    mainActivity: decisions[0] ?? null,
    decisions,
    deferred,
    backlog: backlogUpdated,
    kpisTomorrow,
    state: selection.blocked ? "blocked" : "ready",
    context: {
      searchConsole: searchConsole?.summary ?? searchConsole?.report?.summary ?? null,
      seo: seo?.summary ?? null,
      content: content?.summary ?? null,
      monetization: monetization?.summary ?? null,
      social: social?.summary ?? null,
      revenue: revenue?.summary ?? null,
    },
    summary: decisions[0]
      ? `${decisions[0].page} è la priorità del giorno.${selection.blocked ? " Il quality gate segnala blocchi." : ""}`
      : "Nessuna priorità selezionabile.",
  };
}

export function updateBacklogWithCeoDecision(backlog, ceo, stamp) {
  const decidedPages = new Set((ceo?.top3 ?? []).map((item) => item.page));
  return backlog.map((item) => {
    if (!decidedPages.has(item.page)) return item;
    const decision = ceo.top3.find((entry) => entry.page === item.page);
    return {
      ...item,
      status: ceo.blocked ? "blocked" : item.page === ceo.mainActivity?.page ? "approved" : "approved",
      decisionState: ceo.blocked ? "blocked" : "approved",
      decisionRole: decision?.decisionRole ?? "priority",
      assignedAgents: decision?.assignedAgents ?? [],
      lastReviewed: stamp,
    };
  });
}

export function buildCeoDailyMarkdown(stamp, ceo) {
  const top3 = ceo?.top3 ?? [];
  const main = ceo?.mainActivity ?? null;
  const assigned = top3.flatMap((item) => item.assignedAgents ?? []);
  const blocked = ceo?.blocked ? "Sì" : "No";
  const status = ceo?.state ?? (ceo?.blocked ? "blocked" : "ready");

  return [
    `# CEO Daily Brief - ${stamp}`,
    "",
    section("Decisioni prese", [
      bulletList(
        top3.length
          ? top3.map((item) => `${item.decisionRole === "main" ? "Attività principale" : "Priorità"}: ${item.page} (${item.finalPriorityScore})`)
          : ["Nessuna decisione selezionata."],
      ),
    ]),
    "",
    section("Motivazioni", [
      bulletList(
        top3.length
          ? top3.map((item) => `${item.page}: ${item.why}`)
          : ["Nessuna motivazione disponibile."],
      ),
    ]),
    "",
    section("Attività assegnate", [
      bulletList(
        top3.length
          ? top3.map(
              (item) => `${item.page} -> ${uniqStrings(item.assignedAgents ?? []).join(", ") || "CEO / Product Manager Agent"}`,
            )
          : ["Nessuna attività assegnata."],
      ),
    ]),
    "",
    section("Stato", [
      bulletList([
        `Stato CEO: ${status}`,
        `Quality gate bloccante: ${blocked}`,
        `Backlog aggiornato: ${ceo?.backlog?.length ?? 0} attività`,
        `Priorità principale: ${main?.page ?? "non disponibile"}`,
      ]),
    ]),
    "",
    section("KPI da controllare domani", [
      bulletList(ceo?.kpisTomorrow?.length ? ceo.kpisTomorrow : ["CTR", "clic al calcolatore", "lead start"]),
    ]),
    "",
    ...(assigned.length
      ? [
          section("Agenti coinvolti", [
            bulletList(uniqStrings(assigned).length ? uniqStrings(assigned) : ["Nessuno"]),
          ]),
          "",
        ]
      : []),
  ].join("\n");
}

function assignAgentsForItem(item) {
  const agents = new Set(["CEO / Product Manager Agent", "SEO Agent"]);
  if (item.economicImpact >= 7) agents.add("Revenue Agent");
  if (item.economicImpact >= 8 || item.ctaLabel) agents.add("Monetization Agent");
  if ((item.intervention ?? []).some((line) => line.toLowerCase().includes("faq")) || (item.intervention ?? []).some((line) => line.toLowerCase().includes("example")) || item.cluster === "famiglia") {
    agents.add("Content & Data Agent");
  }
  if (item.socialChannel) agents.add("Social Traffic Agent");
  if (item.riskScore >= 8) agents.add("Quality Agent");
  return uniqStrings([...agents]);
}

function buildNextStep(item) {
  const agents = assignAgentsForItem(item);
  const focus = [];
  if (agents.includes("SEO Agent")) focus.push("title/meta/H1");
  if (agents.includes("Content & Data Agent")) focus.push("FAQ/fonti/esempi");
  if (agents.includes("Monetization Agent")) focus.push("CTA e funnel");
  if (agents.includes("Revenue Agent")) focus.push("valore economico e priorità");
  if (agents.includes("Social Traffic Agent")) focus.push("pacchetto social");
  if (agents.includes("Quality Agent")) focus.push("verifica tecnica");
  return focus.length ? focus.join(", ") : "rafforzamento generale";
}

function buildDeferredAgents(item) {
  const agents = ["SEO Agent"];
  if (item.economicImpact >= 7) agents.push("Revenue Agent");
  if (item.cluster === "lavoro" || item.cluster === "famiglia") agents.push("Social Traffic Agent");
  return uniqStrings(agents);
}

function buildTomorrowKpis(mainActivity, searchConsole, seo, content, monetization, social, revenue) {
  if (!mainActivity) return ["CTR", "impressioni", "clic al calcolatore"];
  const kpis = ["CTR", "clic al calcolatore", "lead start"];
  if ((searchConsole?.dataMode ?? "provvisorio") === "manual-export") kpis.push("position trend");
  if (mainActivity.economicImpact >= 8) kpis.push("lead submit");
  if (mainActivity.socialChannel) kpis.push("social click");
  if ((seo?.keywordCoverage ?? []).length) kpis.push("query coverage");
  if ((content?.updates ?? []).length) kpis.push("content refresh");
  if ((monetization?.topOpportunities ?? []).length) kpis.push("CTA click");
  if ((revenue?.ranking ?? []).length) kpis.push("final priority delta");
  return uniqStrings(kpis);
}

export function buildGrowthBrief({
  stamp,
  searchConsole,
  seo,
  content,
  monetization,
  revenue,
  traffic,
  quality,
  social,
  ceo,
  backlog,
}) {
  const top10 = revenue?.ranking?.slice(0, 10) ?? [];
  const dataMode = searchConsole?.dataMode ?? "provvisorio";
  const dataLabel = dataMode === "manual-export" ? "reali" : "provvisori";
  const main = ceo?.mainActivity ?? null;
  const socialRecommendation = buildSocialRecommendation(main, social);
  const kpis = main
    ? [
        "CTR",
        "clic al calcolatore",
        "start lead",
        "internal link click",
        "social click",
      ]
    : ["CTR", "impressioni", "page engagement"];

  const markdown = [
    `# CALCOLICH DAILY GROWTH BRIEF - ${stamp}`,
    "",
    section("Stato generale", [
      `- Dati Search Console: ${dataLabel}`,
      `- Quality gate: ${quality?.lint?.ok && quality?.build?.ok ? "OK" : "attenzione"}`,
      `- Priorita principale: ${main ? main.page : "non disponibile"}`,
      `- Score stato: ${main?.scoreState ?? dataLabel}`,
    ]),
    "",
    section("Dati disponibili", [
      bulletList([
        `Search Console opportunity: ${searchConsole?.candidates?.length ?? 0} candidate`,
        `SEO keyword coverage: ${seo?.keywordCoverage?.length ?? 0} keyword`,
        `Content findings: ${content?.findings?.length ?? 0}`,
        `Monetization opportunities: ${monetization?.opportunities?.length ?? 0}`,
        `Revenue ranking: ${revenue?.ranking?.length ?? 0} pagine`,
        `Traffic Intelligence pages: ${traffic?.pages?.length ?? 0}`,
        `Backlog condiviso: ${backlog?.length ?? 0} attività`,
      ]),
    ]),
    "",
    section("Formula", [
      "Growth Score = SEO opportunity + traffic trend + economic intent + conversion potential + internal linking potential - development effort - maintenance risk - regulatory risk",
      `Stato punteggi: ${dataLabel}`,
    ]),
    "",
    section("Top 10 pagine opportunita", [renderOpportunityTable(top10)]),
    "",
    ...(traffic
      ? [
          section("Traffic Intelligence", [
            bulletList([
              `Dati: ${traffic.dataMode ?? "provvisori"}`,
              `Pagine in crescita: ${traffic.topGrowthPages?.length ?? 0}`,
              `Pagine da sistemare: ${traffic.topFixPages?.length ?? 0}`,
              `Query emergenti: ${traffic.topQueries?.length ?? 0}`,
              `Cluster monitorati: ${traffic.topClusters?.length ?? 0}`,
            ]),
          ]),
          "",
        ]
      : []),
    "",
    section("Top 3 attivita", [renderTopActivities(ceo?.top3 ?? [])]),
    "",
    section("Attivita principale del giorno", [
      main ? `- ${main.page} — ${main.title}` : "- Nessuna attività selezionata.",
    ]),
    "",
    section("Perché è stata scelta", [main ? `- ${main.why}` : "- Nessuna selezione disponibile."]),
    "",
    section("Impatto SEO stimato", [main ? `- ${main.seoImpact}/10` : "- n/d"]),
    "",
    section("Potenziale economico", [main ? `- ${describePotential(main.economicImpact)}` : "- n/d"]),
    "",
    section("Tempo stimato", [main ? `- ${main.time}` : "- n/d"]),
    "",
    section("Rischi", [main ? bulletList(renderRiskLines(main)) : "- n/d"]),
    "",
    section("Intervento tecnico/editoriale consigliato", [main ? bulletList(main.intervention) : "- n/d"]),
    "",
    section("Pacchetto social consigliato", [bulletList(socialRecommendation)]),
    "",
    section("Funnel o CTA consigliata", [main ? `- ${main.ctaLabel ?? "Porta l'utente al calcolatore e alla guida"}` : "- n/d"]),
    "",
    section("KPI da monitorare", [bulletList(kpis)]),
    "",
    section("Stato verso CHF 1.500/mese", [
      main
        ? `- Traiettoria ${main.finalPriorityScore >= 20 ? "buona" : "in costruzione"}: le superfici ad alto intento sono presenti ma servono ancora traffico e conversione.`
        : "- Traiettoria non ancora definita.",
    ]),
    "",
    section("Cosa richiede approvazione", [
      bulletList([
        "Pubblicazione social.",
        "Modifiche al sito o ai contenuti.",
        "Import di export Search Console o Analytics.",
        "Qualsiasi integrazione esterna o automazione di lead.",
      ]),
    ]),
    "",
  ].join("\n");

  return {
    markdown,
    summary: {
      dataMode,
      top10,
      top3: ceo?.top3 ?? [],
      mainActivity: main,
      kpis,
      socialRecommendation,
      traffic,
      backlogCount: backlog?.length ?? 0,
    },
  };
}

function buildGrowthProfile(profile, { searchConsole, content, social }) {
  const searchItem = profile.searchConsoleItem ?? null;
  const monetizationItem = profile.monetizationItem ?? null;
  const contentFinding = findContentFinding(profile.slug, content);
  const scoreState = searchConsole?.dataMode === "manual-export" && searchItem ? "reale" : "provvisorio";
  const seoOpportunity = scoreSeoOpportunity(profile, searchItem, contentFinding);
  const trafficTrend = scoreTrafficTrend(searchItem, searchConsole?.dataMode);
  const economicIntent = scoreEconomicIntent(profile);
  const conversionPotential = scoreConversionPotential(profile, monetizationItem, searchItem);
  const internalLinkingPotential = scoreLinkPotential(profile, searchItem);
  const developmentEffort = scoreDevelopmentEffort(profile, contentFinding);
  const maintenanceRisk = scoreMaintenanceRisk(profile, contentFinding);
  const regulatoryRisk = scoreRegulatoryRisk(profile, contentFinding);
  const opportunityScore = seoOpportunity + trafficTrend + internalLinkingPotential;
  const monetizationPotential = scoreMonetizationPotential(monetizationItem, profile);
  const revenueScore = economicIntent + conversionPotential + monetizationPotential;
  const effortScore = developmentEffort;
  const riskScore = maintenanceRisk + regulatoryRisk;
  const finalPriorityScore = opportunityScore + revenueScore - effortScore - riskScore;
  const problemMain = determineProblemMain(profile, searchItem, contentFinding, scoreState);
  const intervention = buildIntervention(profile, searchItem, contentFinding, scoreState);
  const monetizationModel = monetizationItem?.model ?? inferModel(profile.cluster);
  const socialCampaign = social?.campaigns?.find((campaign) => campaign.pageHref === profile.pageHref) ?? null;

  return {
    slug: profile.slug,
    page: profile.pageHref,
    title: profile.title,
    locale: profile.locale,
    cluster: profile.cluster,
    scoreState,
    searchConsoleItem: searchItem,
    monetizationItem,
    queries: searchItem?.queries ?? profile.keywords ?? [],
    clicks: searchItem?.clicks ?? null,
    impressions: searchItem?.impressions ?? null,
    ctr: searchItem?.ctr ?? null,
    position: searchItem?.position ?? null,
    trend: searchItem?.trend ?? (scoreState === "reale" ? "stabile" : "fallback repository"),
    growthRecent: searchItem?.growthRecent ?? null,
    seoOpportunity,
    trafficTrend,
    economicIntent,
    conversionPotential,
    internalLinkingPotential,
    developmentEffort,
    maintenanceRisk,
    regulatoryRisk,
    opportunityScore,
    monetizationPotential,
    revenueScore,
    effortScore,
    riskScore,
    finalPriorityScore,
    valueEconomic: profile.valueWeight,
    model: monetizationModel,
    problemMain,
    intervention,
    dependencies: buildDependencies(profile),
    ctaLabel: profile.ctaLabel ?? (monetizationItem?.status === "presente" ? "Porta l'utente al funnel" : "Porta l'utente al calcolatore"),
    guideHref: profile.guideHref ?? null,
    guideCount: profile.guideHref ? 1 : 0,
    linkedPages: profile.linkedPages ?? [],
    socialChannel: socialCampaign?.channels?.[0]?.name ?? inferSocialChannel(profile.cluster),
    socialCampaign,
    source: profile.source,
  };
}

function scoreSeoOpportunity(profile, searchItem, contentFinding) {
  let score = profile.keywords?.length ? 7 : 6;
  if (searchItem?.position !== null && searchItem?.position !== undefined) {
    if (searchItem.position >= 8 && searchItem.position <= 20) score += 2;
    else if (searchItem.position > 20 && searchItem.position <= 30) score += 1;
  }
  if (searchItem?.ctr !== null && searchItem?.ctr !== undefined && searchItem.ctr < 2) score += 1;
  if (searchItem?.indexed) score += 1;
  if (profile.guideHref) score += 1;
  if ((profile.linkedPages ?? []).length >= 2) score += 1;
  if (contentFinding?.missingMarkers?.length > 0) score -= 1;
  return clampScore(score);
}

function scoreTrafficTrend(searchItem, dataMode) {
  if (!searchItem || dataMode !== "manual-export") return 5;
  const growth = searchItem.growthRecent ?? 1;
  if (growth >= 1.6) return 10;
  if (growth >= 1.3) return 9;
  if (growth >= 1.15) return 8;
  if (growth >= 1.05) return 7;
  return 5;
}

function scoreEconomicIntent(profile) {
  return clampScore(Math.round((profile.valueWeight ?? 2) * 3));
}

function scoreConversionPotential(profile, monetizationItem, searchItem) {
  let score = scoreMonetizationPotential(monetizationItem, profile);
  if (profile.ctaLabel) score += 1;
  if (profile.guideHref) score += 1;
  if (searchItem?.ctaPresent) score += 1;
  return clampScore(score);
}

function scoreLinkPotential(profile, searchItem) {
  let score = 4;
  score += Math.min(3, (profile.linkedPages ?? []).length);
  if (profile.guideHref) score += 1;
  if (searchItem?.guideLinks) score += 1;
  if ((searchItem?.internalLinks ?? 0) > 2) score += 1;
  return clampScore(score);
}

function scoreDevelopmentEffort(profile, contentFinding) {
  let score = CLUSTER_CONFIG[profile.cluster]?.effort ?? 5;
  if (contentFinding?.missingMarkers?.length) score += 1;
  if (!profile.guideHref) score += 1;
  return clampScore(score);
}

function scoreMaintenanceRisk(profile, contentFinding) {
  let score = CLUSTER_CONFIG[profile.cluster]?.maintenanceRisk ?? 4;
  if (contentFinding?.missingMarkers?.includes("sources:")) score += 1;
  if (contentFinding?.missingMarkers?.includes("updatedAt:")) score += 1;
  return clampScore(score);
}

function scoreRegulatoryRisk(profile, contentFinding) {
  let score = CLUSTER_CONFIG[profile.cluster]?.regulatoryRisk ?? 4;
  if (contentFinding?.missingMarkers?.includes("sources:")) score += 1;
  return clampScore(score);
}

function scoreMonetizationPotential(monetizationItem, profile) {
  if (monetizationItem?.model) return MODEL_RANK[monetizationItem.model] ?? 5;
  if (profile.cluster === "fiscale" || profile.cluster === "assicurativa" || profile.cluster === "ipotecario") return 8;
  if (profile.cluster === "famiglia") return 7;
  if (profile.cluster === "lavoro") return 6;
  return 5;
}

function determineProblemMain(profile, searchItem, contentFinding, scoreState) {
  if (searchItem?.problemMain) return searchItem.problemMain;
  if (contentFinding?.missingMarkers?.length) {
    return `Mancano marcatori editoriali: ${contentFinding.missingMarkers.join(", ")}`;
  }
  if (scoreState === "provvisorio") {
    return "Nessun export Search Console importato; opportunità provvisoria basata su intent e linking";
  }
  return `Pagina ${profile.title} da consolidare nel cluster ${profile.cluster}`;
}

function buildIntervention(profile, searchItem, contentFinding, scoreState) {
  const title = profile.title;
  const lines = [
    `Title: ${title} - guida, calcolatore e contesto svizzero`,
    `Meta description: chiarire il caso ${title.toLowerCase()} con un calcolatore semplice, esempi svizzeri e fonti affidabili.`,
    `H1: ${title}`,
    `Introduzione: spiegare subito a chi serve la pagina, quale problema risolve e che il risultato è orientativo.`,
    `FAQ: aggiungere domande su criteri, limiti, casi comuni e verifica ufficiale.`,
    `Esempi: inserire almeno un esempio pratico con contesto svizzero e risultato leggibile.`,
    `Internal linking: collegare la guida e i calcolatori correlati.`,
    `CTA: ${profile.ctaLabel ?? "Porta l'utente al calcolatore o alla verifica ufficiale"}.`,
    `Schema: WebApplication, FAQPage e BreadcrumbList.`,
  ];
  if (scoreState === "provvisorio") {
    lines.push("Contenuti mancanti: preparare il blocco per la verifica Search Console appena disponibile.");
  }
  if (searchItem?.position !== null && searchItem?.position !== undefined && searchItem.position >= 8 && searchItem.position <= 20 && (searchItem.ctr ?? 10) < 2) {
    lines.push("Snippet: migliorare il title per intercettare meglio la query già in posizione utile.");
  }
  if (contentFinding?.missingMarkers?.length) {
    lines.push(`Marcatori editoriali da rinforzare: ${contentFinding.missingMarkers.join(", ")}.`);
  }
  return lines;
}

function buildDependencies(profile) {
  const deps = [];
  if (profile.guideHref) deps.push(profile.guideHref);
  for (const page of profile.linkedPages ?? []) deps.push(page);
  return uniqStrings(deps);
}

function buildWhy(item) {
  return `Score finale ${item.finalPriorityScore}: intent, valore economico e linking superano sforzo e rischio.`;
}

function estimateTime(item) {
  const score = item.developmentEffort;
  if (score >= 7) return "2-3 sessioni";
  if (score >= 5) return "1-2 sessioni";
  return "1 sessione";
}

function buildSocialRecommendation(main, social) {
  if (!main) return ["Nessuna priorità selezionata, quindi nessun pacchetto social consigliato."];
  const campaign = social?.campaigns?.find((item) => item.pageHref === main.page);
  if (campaign) {
    return [
      `Canale: ${campaign.channels?.[0]?.name ?? "linkedin"}`,
      `Lingua: ${campaign.locale === "de" ? "Hochdeutsch" : "italiano"}`,
      `CTA: ${main.ctaLabel ?? "Porta l'utente al calcolatore"}`,
      `Link UTM: ${campaign.channels?.[0]?.items?.[0]?.utmUrl ?? "n/d"}`,
    ];
  }
  return [
    "LinkedIn o Facebook secondo il cluster della pagina.",
    `CTA: ${main.ctaLabel ?? "Porta l'utente al calcolatore"}`,
    "Visual o carosello con il calcolatore in evidenza.",
  ];
}

function renderOpportunityTable(rows) {
  if (!rows.length) return "- Nessuna opportunita disponibile.";
  const tableRows = rows.map((item) => [
    item.page,
    `${item.scoreState}${item.searchConsoleItem?.indexed ? " / indicizzata" : ""}`,
    item.queries.slice(0, 3).join(" / "),
    renderCell(item.opportunityScore),
    renderCell(item.revenueScore),
    renderCell(item.effortScore),
    renderCell(item.riskScore),
    renderCell(item.finalPriorityScore),
    item.problemMain,
  ].join(" | "));
  return [
    `| URL | Stato | Query principali | Opportunity Score | Revenue Score | Effort Score | Risk Score | Final Priority Score | Problema principale |`,
    `| --- | --- | --- | --- | --- | --- | --- | --- | --- |`,
    ...tableRows.map((row) => `| ${row} |`),
  ].join("\n");
}

function renderTopActivities(items) {
  if (!items.length) return "- Nessuna attività selezionata.";
  return bulletList(items.map((item) => `${item.page} (${item.finalPriorityScore}) — ${item.why}`));
}

function renderRiskLines(item) {
  return [
    `Risk Score: ${item.riskScore}`,
    `Maintenance risk: ${item.maintenanceRisk}/10`,
    `Regulatory risk: ${item.regulatoryRisk}/10`,
    `Stato punteggio: ${item.scoreState}`,
  ];
}

function describePotential(value) {
  if (value >= 9) return "molto alto";
  if (value >= 7) return "alto";
  if (value >= 5) return "medio";
  return "basso";
}

function inferModel(cluster) {
  if (cluster === "fiscale" || cluster === "assicurativa" || cluster === "ipotecario") return "lead";
  if (cluster === "famiglia") return "mixed";
  if (cluster === "lavoro") return "traffic";
  return "traffic";
}

function inferSocialChannel(cluster) {
  if (cluster === "fiscale" || cluster === "ipotecario") return "linkedin";
  if (cluster === "assicurativa" || cluster === "famiglia") return "facebook";
  return "instagram";
}

function findContentFinding(slug, content) {
  return content?.findings?.find((item) => item.slug === slug) ?? content?.updates?.find((item) => item.slug === slug) ?? null;
}

function slugFromPath(pageHref) {
  return pageHref.split("/").filter(Boolean).pop() ?? pageHref;
}

function slugToTitle(slug) {
  return String(slug ?? "")
    .replace(/[-/]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function clampScore(value) {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function renderCell(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "n/d";
  return typeof value === "number" ? value.toFixed(1).replace(/\.0$/, "") : String(value);
}

function uniqStrings(values) {
  return [...new Set(values.filter(Boolean))];
}
