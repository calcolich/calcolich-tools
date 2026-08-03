import { section, bulletList } from "./shared/output.mjs";

export function buildDailyReport({ stamp, seo, content, monetization, quality, social }) {
  const createdOrImproved = [
    ...seo.keywordCoverage.filter((item) => item.status === "coperta" && item.priority !== "bassa").slice(0, 6).map((item) => item.target),
    ...content.updates.slice(0, 6).map((item) => item.slug),
  ];

  const problems = [
    ...seo.missingMetadata.slice(0, 6).map((file) => `SEO metadata assente o non evidente: ${file}`),
    ...content.findings.slice(0, 6).map((item) => `${item.slug}: mancano ${item.missingMarkers.join(", ")}`),
    ...quality.recommendations.slice(0, 6),
  ];

  const opportunities = monetization.topOpportunities.map((item) =>
    `${item.slug} (${item.model}) -> potenziale ${item.potential}, difficolta ${item.difficulty}, rischio ${item.risk}, tempo ${item.time}`,
  );

  const nextAction = monetization.topOpportunities[0]
    ? `Presidiare subito ${monetization.topOpportunities[0].slug} con CTA, guida collegata e monitoraggio lead.`
    : "Rafforzare i cluster gia pronti e ripetere il controllo qualità.";

  const impact = assessImpact({ seo, content, monetization, quality });
  const progress = assessProgress({ monetization, quality });
  const socialSummary = social?.report?.summary ?? null;

  const markdown = [
    `# Calcolich Daily Report - ${stamp}`,
    "",
    section("Attivita completate", [bulletList([
      `SEO Agent: ${seo.summary}`,
      `Content & Data Agent: ${content.summary}`,
      `Monetization Agent: ${monetization.summary}`,
      `Quality Agent: ${quality.summary}`,
    ])]),
    "",
    section("Pagine create o migliorate", [bulletList(createdOrImproved.length ? createdOrImproved : ["Nessuna modifica editoriale rilevata nel set corrente."])]),
    "",
    section("Problemi trovati", [bulletList(problems.length ? problems : ["Nessun problema bloccante rilevato."])]),
    "",
    section("Opportunita economiche", [bulletList(opportunities.length ? opportunities : ["Nessuna nuova opportunita rilevante oltre al lavoro corrente."])]),
    "",
    section("Prossima azione consigliata", [nextAction]),
    "",
    section("Impatto qualitativo stimato", [impact]),
    "",
    section("Stato verso CHF 1.500/mese", [progress]),
    "",
    ...(socialSummary ? [
      section("Social Traffic", [
        bulletList([
          `Contenuti generati: ${socialSummary.generatedContents.length}`,
          `Pagine promosse: ${socialSummary.topPromotions.map((item) => item.title).join(", ")}`,
          `Prossima pagina: ${socialSummary.nextPage ?? "non disponibile"}`,
          `Validazione: ${socialSummary.validation.ok ? "OK" : "attenzione"}`,
        ]),
      ]),
      "",
      ...(socialSummary.launchWeek ? [
        section("Launch Week", [
          bulletList([
            `Contenuti pianificati: ${socialSummary.launchWeek.generatedContents}`,
            `Pagine prioritarie: ${socialSummary.launchWeek.promotedPages.join(", ")}`,
            `Prossima pagina: ${socialSummary.launchWeek.nextPage ?? "non disponibile"}`,
          ]),
        ]),
        "",
      ] : []),
    ] : []),
  ].join("\n");

  return {
    stamp,
    markdown,
    summary: {
      createdOrImproved,
      problems,
      opportunities,
      nextAction,
      impact,
      progress,
      social: socialSummary,
    },
  };
}

function assessImpact({ seo, content, monetization, quality }) {
  const highSeo = seo.keywordCoverage.filter((item) => item.priority === "alta").length;
  const contentReady = content.updates.length;
  const monetizationReady = monetization.topOpportunities.length;
  const qualityOk = quality.lint.ok && quality.build.ok;

  if (qualityOk && highSeo >= 4 && monetizationReady >= 4) return "Alto: cluster nuovi pronti e base tecnica in ordine.";
  if (qualityOk && (highSeo >= 2 || monetizationReady >= 2)) return "Medio-alto: il sito ha piu superfici monetizzabili e SEO da presidiare.";
  if (contentReady > 0) return "Medio: buona base editoriale, ma serve ancora consolidare il cluster monetizzabile.";
  return "Basso-medio: il lavoro e avviato, ma servono ancora dati e distribuzione di traffico.";
}

function assessProgress({ monetization, quality }) {
  const ready = monetization.topOpportunities.filter((item) => item.potential === "alta").length;
  const qualityOk = quality.lint.ok && quality.build.ok;

  if (qualityOk && ready >= 4) {
    return "Traiettoria buona: i cluster ad alto intento ci sono, il passo successivo e aumentare traffico e conversione.";
  }
  if (qualityOk && ready >= 2) {
    return "In traiettoria: le opportunita principali sono presenti, ma il target richiede ancora piu copertura e conversione.";
  }
  return "Lontano ma misurabile: ci sono i mattoni, ma mancano ancora volume, link interni e monetizzazione continuativa.";
}
