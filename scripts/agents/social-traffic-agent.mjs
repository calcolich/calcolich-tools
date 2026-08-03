import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { runContentDataAgent } from "./content-data-agent.mjs";
import { runMonetizationAgent } from "./monetization-agent.mjs";
import { validateLaunchWeekPack, validateSocialTrafficBundle } from "./quality-agent.mjs";
import { runSeoAgent } from "./seo-agent.mjs";
import { bulletList, ensureDir, section, writeReportBundle } from "./shared/output.mjs";
import { todayStamp } from "./shared/scan-repo.mjs";

const siteUrl = "https://www.calcolich.ch";

const CHANNELS = [
  { name: "facebook", source: "facebook", medium: "organic_social" },
  { name: "linkedin", source: "linkedin", medium: "organic_social" },
  { name: "instagram", source: "instagram", medium: "organic_social" },
  { name: "tiktok", source: "tiktok", medium: "organic_social" },
  { name: "youtube", source: "youtube", medium: "organic_social" },
];

const SOCIAL_ROOT = join(process.cwd(), "social-content");

const LAUNCH_WEEK_BLUEPRINTS = [
  {
    day: 1,
    pageHref: "/de/quellensteuer-rechner-schweiz",
    channel: "linkedin",
    language: "de",
    contentType: "post",
    recommendedTime: "08:15",
    objective: "Traffico qualificato e apertura della guida collegata",
    metric: "CTR sul link e guide open",
    visual: "LinkedIn-Visual con calcolatore in evidenza e tre blocchi: Bruttolohn, Kanton, Familienstand.",
    title: "Quellensteuer: Brutto, Netto und Kanton zusammen lesen",
    text: "Wer in der Schweiz Quellensteuer zahlt, sollte den Lohn nicht nur als Nettobetrag betrachten. Entscheidend sind Kanton, Familienstand, Kinder und die Frage, wie der Lohn im Kontext gelesen wird. Der Quellensteuer-Rechner hilft bei der ersten Orientierung; die Anleitung erklärt den Unterschied zwischen Berechnung und offizieller Prüfung. Wenn du ein Lohnangebot oder eine Lohnabrechnung besser einordnen willst, starte hier und prüfe danach den Fall im Detail.",
    cta: "Quellensteuer kostenlos berechnen",
  },
  {
    day: 2,
    pageHref: "/de/praemienverbilligung-rechner-schweiz",
    channel: "facebook",
    language: "de",
    contentType: "post",
    recommendedTime: "12:20",
    objective: "Haushaltsnahe Reichweite und Linkklicks",
    metric: "Linkklicks und Kommentare",
    visual: "Budget-Tisch mit Krankenkassenrechnung, Kalender und Laptop.",
    title: "Prämienverbilligung: Erst den Haushalt, dann den Betrag",
    text: "Die Krankenkassenprämie belastet das Budget schnell. Der Rechner hilft dir, Einkommen, Kanton und Haushaltskontext als Ausgangspunkt zu ordnen. Das Ergebnis ersetzt keine offizielle kantonale Prüfung, macht den nächsten Schritt aber klarer. Wenn du wissen willst, welche Unterlagen typischerweise gebraucht werden, lies danach die kurze Anleitung.",
    question: "Weisst du schon, welcher Kanton zuständig ist?",
    cta: "Prämienverbilligung berechnen",
  },
  {
    day: 3,
    pageHref: "/de/brutto-netto-rechner-schweiz",
    channel: "linkedin",
    language: "de",
    contentType: "post",
    recommendedTime: "07:55",
    objective: "Vergleich von Lohnangeboten und Budgetplanung",
    metric: "CTR auf den Rechner",
    visual: "Saubere Tabelle mit drei Spalten: Brutto, Abzüge, Netto.",
    title: "Brutto-Netto: Ein Angebot wird erst im Netto sichtbar",
    text: "Ein Lohnangebot ist erst dann wirklich vergleichbar, wenn Brutto- und Nettosicht zusammenpassen. Der Brutto-Netto-Rechner zeigt die Basis, damit Gespräche über Lohn, Stellenwechsel oder Budget auf Zahlen statt Annahmen beruhen. Wer zusätzlich Quellensteuer oder andere Abzüge einordnen muss, hat danach eine deutlich bessere Ausgangslage.",
    cta: "Brutto und Netto vergleichen",
  },
  {
    day: 4,
    pageHref: "/de/ueberstundenrechner-schweiz",
    channel: "tiktok",
    language: "de",
    contentType: "video",
    recommendedTime: "18:30",
    objective: "Video-Views und Calculator-Starts",
    metric: "3-Sekunden-Views und Klicks",
    visual: "Zeitkarte, Stoppuhr und Rechner im schnellen Schnitt.",
    title: "Überstunden: Nicht nach Gefühl rechnen",
    hook: "Überstunden? Rechne nicht nach Gefühl.",
    scenes: [
      "Szene 1: Zeiterfassung oder Stempelkarte.",
      "Szene 2: Rechner öffnen.",
      "Szene 3: Stunden und Lohn sichtbar machen.",
      "Szene 4: Hinweis auf Arbeitszeit, Pausen und Monatslohn.",
      "Szene 5: CTA einblenden.",
    ],
    overlayText: [
      "Überstunden",
      "Stunden zählen",
      "Lohn sauber prüfen",
      "Nicht schätzen",
      "Jetzt berechnen",
    ],
    script:
      "Überstunden wirken oft klein, summieren sich aber schnell. Öffne den Rechner, gib deine Stunden ein und prüfe den Wert zusammen mit dem Lohnkontext. Wenn dein Fall von Arbeitszeit, Pausen oder Monatslohn abhängt, hilft die Folgeanalyse mehr als ein Bauchgefühl. Am Ende zählt nicht nur die Zahl, sondern auch die Frage, wie du sie sauber einordnest.",
    cta: "Überstunden berechnen",
    description: "Kurzer Überblick, wie Überstunden im Schweizer Kontext sauber eingeordnet werden.",
  },
  {
    day: 5,
    pageHref: "/de/ferienrechner-schweiz",
    channel: "instagram",
    language: "de",
    contentType: "carousel",
    recommendedTime: "19:05",
    objective: "Saves, Carousel-Completion und Linkklicks",
    metric: "Saves und Profilklicks",
    visual: "Carousel mit Kalender, Teilzeit-Hinweis und Jahresanspruch.",
    title: "Ferien: Jahresanspruch ohne Rätselraten",
    caption:
      "Ferienanspruch wirkt simpel, bis Teilzeit, Jahresarbeit oder unterschiedliche Wochenmodelle dazukommen. Der Rechner hilft, den Jahresanspruch sauber zu lesen, bevor du planst oder anpasst. Die Anleitung erklärt den Schweizer Kontext ohne unnötige Formeln.",
    slides: [
      { title: "1. Ferien auf einen Blick", text: "Der Jahresanspruch beginnt mit der richtigen Zahl." },
      { title: "2. Teilzeit zählt mit", text: "Teilzeit verändert die Rechnung, nicht die Logik." },
      { title: "3. Arbeitstage lesen", text: "Wichtig ist, wie viele Tage wirklich zählen." },
      { title: "4. Kein Rätselraten", text: "Der Rechner schafft eine klare Ausgangslage." },
      { title: "5. Rechner öffnen", text: "Jetzt den Ferienrechner nutzen." },
      { title: "6. Danach die Anleitung", text: "Kurz nachlesen, wie der Schweizer Kontext funktioniert." },
    ],
    cta: "Ferien berechnen",
    hashtags: ["#Ferien", "#Arbeitsrecht", "#Schweiz", "#Teilzeit", "#Lohn"],
  },
  {
    day: 6,
    pageHref: "/de/familienzulagen-rechner-schweiz",
    channel: "facebook",
    language: "de",
    contentType: "post",
    recommendedTime: "12:15",
    objective: "Relevanz für Familien und Linkklicks",
    metric: "Linkklicks und Lead-Starts",
    visual: "Familienfoto mit Kalender und kurzer Checkliste auf dem Tisch.",
    title: "Familienzulagen: Erst den Anspruch lesen, dann weiterplanen",
    text: "Familienzulagen sind kein Detail, wenn man das Monatsbudget plant. Der Rechner hilft, den Anspruch und den Kontext einfacher einzuordnen, bevor du Unterlagen prüfst oder kantonale Unterschiede vergleichst. Wenn Kinder- oder Ausbildungszulagen für dich relevant sind, starte hier und lies danach die kurze Anleitung.",
    question: "Geht es bei dir um Kinder- oder Ausbildungszulagen?",
    cta: "Familienzulagen berechnen",
  },
  {
    day: 7,
    pageHref: "/de/hypotheken-tragbarkeit-rechner-schweiz",
    channel: "youtube",
    language: "de",
    contentType: "video",
    recommendedTime: "19:30",
    objective: "Watch Time und Klicks zum Tragbarkeitsrechner",
    metric: "Durchschnittliche Wiedergabedauer und Linkklicks",
    visual: "Haus, Rate und Tragbarkeit in einer ruhigen, klaren Szene.",
    title: "Hypotheken: Tragbarkeit zuerst prüfen",
    hook: "Tragbarkeit? Erst rechnen, dann reden.",
    scenes: [
      "Szene 1: Haus oder Wohnung als Einstieg.",
      "Szene 2: Tragbarkeit mit Einkommen verbinden.",
      "Szene 3: Rechner auf dem Bildschirm zeigen.",
      "Szene 4: Hinweis auf Budget und Bankgespräch.",
      "Szene 5: CTA mit der nächsten Aktion.",
    ],
    overlayText: [
      "Tragbarkeit",
      "Einkommen prüfen",
      "Budget klären",
      "Erst rechnen",
      "Dann sprechen",
    ],
    script:
      "Bei einer Hypothek entscheidet nicht nur die Monatsrate. Wichtig ist, ob Tragbarkeit, Einkommen und Belastung zusammenpassen. Der Rechner gibt dir eine erste Orientierung, bevor du mit Bank, Berater oder Partner sprichst. Wenn du wissen willst, wie stark deine Zahlen wirklich sind, starte hier und lies die Anleitung danach.",
    cta: "Tragbarkeit prüfen",
    description: "Kurzer Überblick, wie Tragbarkeit vor dem nächsten Finanzierungs-Schritt gelesen wird.",
  },
];

export async function runSocialTrafficAgent(rules, context = {}) {
  const seo = context.seo ?? (await runSeoAgent(rules));
  const content = context.content ?? (await runContentDataAgent(rules));
  const monetization = context.monetization ?? (await runMonetizationAgent(rules));
  const targets = orderTargets(rules.social.targets, seo, monetization);
  const knownRoutes = new Set(
    targets.flatMap((target) => [target.pageHref, target.guideHref].filter(Boolean)),
  );
  const campaigns = targets.map((target, index) => buildCampaign(target, index));
  const validation = validateSocialTrafficBundle({ campaigns }, knownRoutes);
  const stamp = todayStamp();
  const launchWeek = buildLaunchWeek(campaigns, stamp);
  const launchWeekValidation = validateLaunchWeekPack(launchWeek, knownRoutes);

  await ensureSocialStructure();
  await writeCampaignArtifacts(campaigns);
  const calendar = buildCalendar(campaigns, rules.social.calendarDays ?? 30, stamp);
  await writeCalendarArtifacts(calendar, stamp);
  await writeLaunchWeekArtifacts(launchWeek);
  await writeTemplates();

  const report = buildSocialReport({ stamp, campaigns, calendar, validation, launchWeek, launchWeekValidation, seo, content, monetization });
  await writeReportBundle(join(SOCIAL_ROOT, "reports"), stamp, report.markdown, {
    stamp,
    social: {
      campaigns: campaigns.length,
      calendarDays: calendar.days.length,
      validation,
      launchWeekValidation,
      launchWeek: launchWeek.summary,
      summary: report.summary,
      calendar: calendar.days,
    },
  });

  return {
    name: "Social Traffic Agent",
    summary: report.summary.overview,
    campaigns,
    calendar,
    validation,
    launchWeek,
    report,
  };
}

function orderTargets(targets, seo, monetization) {
  const monetizationRank = new Map((monetization.topOpportunities ?? []).map((item, index) => [item.slug, 100 - index]));
  const seoRank = new Map((seo.keywordCoverage ?? []).map((item, index) => [slugFromKeyword(item.keyword), 80 - index]));

  return [...targets].sort((a, b) => {
    const scoreA = (monetizationRank.get(a.slug) ?? 0) + (seoRank.get(a.slug) ?? 0);
    const scoreB = (monetizationRank.get(b.slug) ?? 0) + (seoRank.get(b.slug) ?? 0);
    return scoreB - scoreA;
  });
}

function slugFromKeyword(keyword) {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildCampaign(target, index) {
  const base = {
    id: target.id,
    locale: target.locale,
    pageHref: target.pageHref,
    title: target.title,
    guideHref: target.guideHref,
    guideTitle: target.guideTitle,
    keyword: target.keyword,
    campaign: target.campaign,
    audience: target.audience,
    ctaLabel: target.ctaLabel,
    secondaryCta: target.secondaryCta,
    tone: target.tone,
    hashtags: target.hashtags,
    promote: target.promote,
    status: "bozza",
    priority: index < 4 ? "alta" : "media",
  };

  return {
    ...base,
    channels: CHANNELS.map((channel) => ({
      ...channel,
      items: buildChannelItems(base, channel),
    })),
  };
}

function buildChannelItems(target, channel) {
  const items = {
    facebook: buildFacebookPosts(target, channel),
    linkedin: buildLinkedInPosts(target, channel),
    instagram: buildInstagramIdeas(target, channel),
    tiktok: buildShortScripts(target, channel, "tiktok"),
    youtube: buildShortScripts(target, channel, "youtube"),
  }[channel.name];
  return items.map((item) => ({ ...item, language: target.locale }));
}

function buildFacebookPosts(target, channel) {
  const topic = socialTopic(target);
  const guideLine = target.guideHref ? `Per approfondire, passa anche dalla guida collegata.` : `Se vuoi un quadro più completo, parti dalla pagina dedicata.`;
  return [
    {
      variant: "fb_1",
      title: `${topic}: il primo numero non basta`,
      body: `${target.promote} ${guideLine}`,
      question: `Quale dettaglio del tuo caso vuoi chiarire per primo?`,
      cta: target.ctaLabel,
      utmUrl: buildUtmUrl(target, channel, "fb_1"),
      status: "bozza",
    },
    {
      variant: "fb_2",
      title: `${topic}: cosa vale davvero la pena controllare`,
      body: `${target.audience}. Usa il calcolatore per leggere il caso con un riferimento pratico, poi confronta la guida se esiste.`,
      question: `Ti serve prima una stima o un confronto più ordinato?`,
      cta: target.secondaryCta,
      utmUrl: buildUtmUrl(target, channel, "fb_2"),
      status: "bozza",
    },
    {
      variant: "fb_3",
      title: `${topic}: meno supposizioni, più chiarezza`,
      body: `Quando cambiano lavoro, famiglia o situazione abitativa, il contesto conta. Questo strumento aiuta a mettere ordine senza promettere risultati che dipendono da casi reali.`,
      question: `Qual è la voce che oggi ti crea più dubbio?`,
      cta: `Apri ${target.title}`,
      utmUrl: buildUtmUrl(target, channel, "fb_3"),
      status: "bozza",
    },
  ];
}

function buildLinkedInPosts(target, channel) {
  const topic = socialTopic(target);
  const guideText = target.guideHref ? `La guida collegata serve a leggere il quadro con più contesto.` : `La pagina principale resta il punto di partenza più rapido.`;
  return [
    {
      variant: "li_1",
      title: `${topic}: un confronto utile prima della decisione`,
      body: `${target.audience}. ${target.promote} ${guideText}`,
      example: `Esempio d'uso: confrontare il caso prima di procedere con una scelta di lavoro, budget o casa.`,
      cta: target.ctaLabel,
      utmUrl: buildUtmUrl(target, channel, "li_1"),
      status: "bozza",
    },
    {
      variant: "li_2",
      title: `${topic}: il valore sta nel contesto`,
      body: `Un calcolatore serio non sostituisce fonti ufficiali, ma aiuta a preparare la verifica. ${target.keyword} è utile proprio quando i dettagli cambiano il risultato.`,
      example: `Punto chiave: leggere il numero nel contesto di salario, famiglia, cantone o costi ricorrenti.`,
      cta: target.secondaryCta,
      utmUrl: buildUtmUrl(target, channel, "li_2"),
      status: "bozza",
    },
    {
      variant: "li_3",
      title: `${topic}: dalla domanda al calcolatore`,
      body: `Per chi gestisce budget o prende decisioni operative, una prima stima rende la conversazione più precisa. ${target.promote}`,
      example: `L'obiettivo non è promettere un risultato, ma arrivare alla domanda giusta prima di parlare con consulente o ufficio competente.`,
      cta: `Usa ${target.title}`,
      utmUrl: buildUtmUrl(target, channel, "li_3"),
      status: "bozza",
    },
  ];
}

function buildInstagramIdeas(target, channel) {
  const topic = socialTopic(target);
  return [
    {
      variant: "ig_1",
      title: `${topic}: checklist visiva`,
      caption: `${topic}: salva questa check-list prima di fare il confronto.\n\n${target.promote} ${target.guideHref ? "La guida collegata chiarisce il contesto." : "Parti dalla pagina dedicata e leggi il risultato con calma."}\n\n${target.hashtags.join(" ")}`,
      slides: [
        { title: "1. Il tema", text: topic },
        { title: "2. Perché conta", text: target.audience },
        { title: "3. Cosa cambiare", text: target.promote },
        { title: "4. Cosa non promette", text: "Una stima non sostituisce fonti ufficiali o casi reali." },
        { title: "5. Dove andare", text: target.ctaLabel },
        { title: "6. Passo successivo", text: target.secondaryCta },
      ],
      cta: target.ctaLabel,
      hashtags: target.hashtags,
      utmUrl: buildUtmUrl(target, channel, "ig_1"),
      status: "bozza",
    },
    {
      variant: "ig_2",
      title: `${topic}: il dettaglio conta`,
      caption: `${topic}: quando il dettaglio cambia il quadro, serve una pagina chiara.\n\n${target.promote}\n\n${target.hashtags.join(" ")}`,
      slides: [
        { title: "1. Problema", text: `Un numero da solo non basta per ${topic.toLowerCase()}.` },
        { title: "2. Contesto", text: target.audience },
        { title: "3. Strumento", text: target.title },
        { title: "4. Guida", text: target.guideTitle ?? "Approfondimento collegato" },
        { title: "5. CTA", text: target.ctaLabel },
      ],
      cta: target.secondaryCta,
      hashtags: target.hashtags,
      utmUrl: buildUtmUrl(target, channel, "ig_2"),
      status: "bozza",
    },
    {
      variant: "ig_3",
      title: `${topic}: confronta prima di agire`,
      caption: `${topic}: fai il confronto prima di agire, non dopo.\n\n${target.promote}\n\n${target.ctaLabel}`,
      slides: [
        { title: "1. Prima", text: "Capire il caso reale." },
        { title: "2. Poi", text: "Aprire il calcolatore corretto." },
        { title: "3. Infine", text: "Leggere la guida o la fonte ufficiale." },
        { title: "4. Sempre", text: "Evita promesse e numeri inventati." },
        { title: "5. Chiudi", text: target.ctaLabel },
      ],
      cta: target.ctaLabel,
      hashtags: target.hashtags,
      utmUrl: buildUtmUrl(target, channel, "ig_3"),
      status: "bozza",
    },
  ];
}

function buildShortScripts(target, channel, platform) {
  const topic = socialTopic(target);
  const hookBank = [
    `${topic}: non partire dal numero sbagliato.`,
    `Se il tuo caso riguarda ${topic.toLowerCase()}, guarda prima questo.`,
    `Una stima utile inizia con la domanda giusta.`,
    `Per ${topic.toLowerCase()}, il contesto cambia il risultato.`,
    `Questo è il punto da controllare prima di decidere.`,
  ];

  return hookBank.map((hook, index) => {
    const title = `${topic} ${index + 1}`;
    const scenes = [
      `Scene 1: mostra la domanda reale che la persona si fa.`,
      `Scene 2: apri ${target.title}.`,
      `Scene 3: evidenzia ${target.promote}.`,
      `Scene 4: se esiste, mostra la guida collegata come approfondimento.`,
      `Scene 5: chiudi con la CTA ${target.ctaLabel}.`,
    ];
    const overlayText = [
      topic,
      target.keyword,
      target.ctaLabel,
    ];
    const script = [
      hook,
      `Spiega in modo semplice che ${target.promote.toLowerCase()}.`,
      `Mostra perché ${target.audience.toLowerCase()} dovrebbe usare il calcolatore prima di prendere una decisione.`,
      target.guideHref ? `Poi indica che la guida collegata serve per capire meglio il contesto.` : `Poi ricorda che la pagina è il punto di partenza migliore.`,
      `Chiudi con una CTA chiara: ${target.ctaLabel}.`,
    ].join(" ");

    return {
      variant: `${platform === "tiktok" ? "tt" : "yt"}_${index + 1}`,
      title,
      hook,
      scenes,
      overlayText,
      script,
      cta: target.ctaLabel,
      utmUrl: buildUtmUrl(target, channel, `${platform === "tiktok" ? "tt" : "yt"}_${index + 1}`),
      description: `${topic}: breve spiegazione, contesto e link utile per partire dalla pagina giusta.`,
      status: "bozza",
    };
  });
}

function buildUtmUrl(target, channel, variant) {
  const url = new URL(target.pageHref, siteUrl);
  url.searchParams.set("utm_source", channel.source);
  url.searchParams.set("utm_medium", channel.medium);
  url.searchParams.set("utm_campaign", target.campaign);
  url.searchParams.set("utm_content", variant);
  return url.toString();
}

function socialTopic(target) {
  return target.title.replace(/-Rechner Schweiz| Calcolatore| Rechner| Calcolatore| Schweiz/g, "").replace(/\s+/g, " ").trim();
}

async function ensureSocialStructure() {
  const folders = [
    "social-content/calendar",
    "social-content/drafts/de",
    "social-content/drafts/it",
    "social-content/campaigns",
    "social-content/published",
    "social-content/templates",
    "social-content/reports",
  ];
  for (const folder of folders) {
    await ensureDir(join(process.cwd(), folder));
  }
}

async function writeTemplates() {
  const templatePath = join(SOCIAL_ROOT, "templates", "social-campaign-template.md");
  const calendarTemplatePath = join(SOCIAL_ROOT, "templates", "social-calendar-template.md");
  const templateContent = `# Social Campaign Template\n\n- Titolo pagina\n- Linguaggio\n- Canale\n- UTM\n- CTA\n- Verifica qualità\n`;
  const calendarTemplateContent = `# Social Calendar Template\n\nUsa questo file come base per pianificare 30 giorni di contenuti con massimo 1-2 uscite al giorno.\n`;
  await writeFile(templatePath, templateContent, "utf8");
  await writeFile(calendarTemplatePath, calendarTemplateContent, "utf8");
  await writeFile(join(SOCIAL_ROOT, "published", ".gitkeep"), "", "utf8");
}

async function writeCampaignArtifacts(campaigns) {
  const campaignIndex = {
    generatedAt: todayStamp(),
    campaigns: campaigns.map((campaign) => ({
      id: campaign.id,
      locale: campaign.locale,
      pageHref: campaign.pageHref,
      title: campaign.title,
      guideHref: campaign.guideHref,
      guideTitle: campaign.guideTitle,
      keyword: campaign.keyword,
      status: campaign.status,
      priority: campaign.priority,
      channels: campaign.channels.map((channel) => ({
        name: channel.name,
        items: channel.items.length,
      })),
    })),
  };
  await writeFile(join(SOCIAL_ROOT, "campaigns", "index.json"), JSON.stringify(campaignIndex, null, 2), "utf8");
  await writeFile(join(SOCIAL_ROOT, "campaigns", "index.md"), renderCampaignIndexMarkdown(campaignIndex), "utf8");

  for (const campaign of campaigns) {
    const draftDir = join(SOCIAL_ROOT, "drafts", campaign.locale);
    await ensureDir(draftDir);
    const jsonPath = join(draftDir, `${campaign.id}.json`);
    const mdPath = join(draftDir, `${campaign.id}.md`);
    await writeFile(jsonPath, JSON.stringify(campaign, null, 2), "utf8");
    await writeFile(mdPath, renderCampaignMarkdown(campaign), "utf8");
  }
}

function renderCampaignIndexMarkdown(index) {
  return [
    `# Social Traffic Campaigns`,
    "",
    `Generati il ${index.generatedAt}.`,
    "",
    ...index.campaigns.map((campaign) => [
      `## ${campaign.title} (${campaign.locale})`,
      `- Pagina: ${campaign.pageHref}`,
      `- Guida: ${campaign.guideHref ?? "nessuna guida dedicata"}`,
      `- Keyword: ${campaign.keyword}`,
      `- Priorita: ${campaign.priority}`,
      `- Canali: ${campaign.channels.map((channel) => `${channel.name} (${channel.items})`).join(", ")}`,
      "",
    ].join("\n")),
  ].join("\n");
}

function renderCampaignMarkdown(campaign) {
  return [
    `# ${campaign.title} - Social Draft (${campaign.locale})`,
    "",
    `- Pagina: ${campaign.pageHref}`,
    `- Guida: ${campaign.guideHref ?? "nessuna"}`,
    `- Keyword: ${campaign.keyword}`,
    `- Pubblico: ${campaign.audience}`,
    `- CTA principale: ${campaign.ctaLabel}`,
    `- CTA secondaria: ${campaign.secondaryCta}`,
    `- Stato: ${campaign.status}`,
    "",
    ...campaign.channels.map((channel) => renderChannelMarkdown(campaign, channel)),
  ].join("\n");
}

function renderChannelMarkdown(campaign, channel) {
  return [
    `## ${channelLabel(channel.name)}`,
    "",
    ...channel.items.map((item) => [
      `### ${item.title}`,
      `- Variante: ${item.variant}`,
      `- Stato: ${item.status}`,
      `- UTM: ${item.utmUrl}`,
      item.body ? `- Testo: ${item.body}` : null,
      item.question ? `- Domanda: ${item.question}` : null,
      item.example ? `- Esempio: ${item.example}` : null,
      item.caption ? `- Caption: ${item.caption}` : null,
      item.slides ? `- Slide: ${item.slides.map((slide) => `${slide.title} — ${slide.text}`).join(" | ")}` : null,
      item.scenes ? `- Scene: ${item.scenes.join(" | ")}` : null,
      item.overlayText ? `- Overlay: ${item.overlayText.join(" | ")}` : null,
      item.script ? `- Script: ${item.script}` : null,
      `- CTA: ${item.cta}`,
      "",
    ].filter(Boolean).join("\n")),
  ].join("\n");
}

function channelLabel(channel) {
  return {
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube Shorts",
  }[channel] ?? channel;
}

function formatZurichDate(date) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function buildCalendar(campaigns, calendarDays, stamp) {
  const today = new Date(`${stamp}T00:00:00+02:00`);
  const days = [];

  for (let index = 0; index < calendarDays; index += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const campaign = campaigns[index % campaigns.length];
    const channel = campaign.channels[index % campaign.channels.length];
    const entry = {
      campaignId: campaign.id,
      locale: campaign.locale,
      pageHref: campaign.pageHref,
      pageTitle: campaign.title,
      guideHref: campaign.guideHref,
      guideTitle: campaign.guideTitle,
      channel: channel.name,
      channelLabel: channelLabel(channel.name),
      status: campaign.status,
      utmUrl: channel.items[0]?.utmUrl ?? buildUtmUrl(campaign, channel, "calendar_1"),
      contentTitle: channel.items[0]?.title ?? campaign.title,
      campaign: campaign.campaign,
      audience: campaign.audience,
    };
    days.push({
      date: formatZurichDate(date),
      ...entry,
      clicks: null,
      leads: null,
      nextPage: campaigns[(index + 1) % campaigns.length]?.pageHref ?? null,
    });
  }

  return { days };
}

function buildLaunchWeek(campaigns, stamp) {
  const start = new Date(`${stamp}T00:00:00+02:00`);
  start.setDate(start.getDate() + 1);
  const campaignByPage = new Map(campaigns.map((campaign) => [campaign.pageHref, campaign]));

  const entries = LAUNCH_WEEK_BLUEPRINTS.map((blueprint, index) => {
    const campaign = campaignByPage.get(blueprint.pageHref);
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const entry = {
      day: blueprint.day,
      date: formatZurichDate(date),
      campaignId: campaign?.id ?? blueprint.pageHref,
      campaign: campaign?.campaign ?? null,
      locale: blueprint.language,
      language: blueprint.language,
      pageHref: blueprint.pageHref,
      pageTitle: campaign?.title ?? blueprint.title,
      guideHref: campaign?.guideHref ?? null,
      guideTitle: campaign?.guideTitle ?? null,
      channel: blueprint.channel,
      channelLabel: channelLabel(blueprint.channel),
      contentType: blueprint.contentType,
      recommendedTime: blueprint.recommendedTime,
      objective: blueprint.objective,
      metric: blueprint.metric,
      title: blueprint.title,
      cta: blueprint.cta,
      visual: blueprint.visual,
      status: "bozza",
      utmUrl: buildLaunchWeekUtmUrl(campaign ?? blueprint, blueprint.channel, index + 1),
      nextPage: LAUNCH_WEEK_BLUEPRINTS[index + 1]?.pageHref ?? null,
    };

    if (blueprint.text) entry.text = blueprint.text;
    if (blueprint.question) entry.question = blueprint.question;
    if (blueprint.caption) entry.caption = blueprint.caption;
    if (blueprint.hashtags) entry.hashtags = blueprint.hashtags;
    if (blueprint.slides) entry.slides = blueprint.slides;
    if (blueprint.hook) entry.hook = blueprint.hook;
    if (blueprint.scenes) entry.scenes = blueprint.scenes;
    if (blueprint.overlayText) entry.overlayText = blueprint.overlayText;
    if (blueprint.script) entry.script = blueprint.script;
    if (blueprint.description) entry.description = blueprint.description;

    return entry;
  });

  return {
    generatedAt: stamp,
    entries,
    summary: {
      generatedContents: entries.length,
      promotedPages: entries.map((entry) => entry.pageTitle),
      nextPage: entries[0]?.nextPage ?? null,
      validation: { ok: true },
    },
  };
}

function buildLaunchWeekUtmUrl(target, channelName, variant) {
  const url = new URL(target.pageHref, siteUrl);
  url.searchParams.set("utm_source", channelName);
  url.searchParams.set("utm_medium", "organic_social");
  url.searchParams.set("utm_campaign", target.campaign ?? "launch_week_2026");
  url.searchParams.set("utm_content", `launch_week_${variant}`);
  return url.toString();
}

async function writeLaunchWeekArtifacts(launchWeek) {
  const jsonPath = join(SOCIAL_ROOT, "calendar", "launch-week.json");
  const mdPath = join(SOCIAL_ROOT, "calendar", "launch-week.md");
  await writeFile(jsonPath, JSON.stringify(launchWeek, null, 2), "utf8");
  await writeFile(mdPath, renderLaunchWeekMarkdown(launchWeek), "utf8");
}

function renderLaunchWeekMarkdown(launchWeek) {
  const rows = launchWeek.entries.map((day) =>
    `| ${day.day} | ${day.date} | ${day.channelLabel} | ${day.pageTitle} | ${day.language} | ${day.recommendedTime} | ${day.utmUrl} | ${day.objective} | ${day.metric} | ${day.status} |`,
  );

  const sections = launchWeek.entries.map((day) => {
    const parts = [
      `## Giorno ${day.day} - ${day.pageTitle}`,
      `- Data: ${day.date}`,
      `- Canale: ${day.channelLabel}`,
      `- Lingua: ${day.language}`,
      `- Orario consigliato: ${day.recommendedTime}`,
      `- URL UTM: ${day.utmUrl}`,
      `- Obiettivo: ${day.objective}`,
      `- Metrica: ${day.metric}`,
      `- Stato: ${day.status}`,
      `- CTA: ${day.cta}`,
      `- Visuale o scena: ${day.visual}`,
    ];

    if (day.text) parts.push(`- Testo completo: ${day.text}`);
    if (day.question) parts.push(`- Domanda finale: ${day.question}`);
    if (day.caption) parts.push(`- Caption: ${day.caption}`);
    if (day.slides) parts.push(`- Slide: ${day.slides.map((slide) => `${slide.title} — ${slide.text}`).join(" | ")}`);
    if (day.hook) parts.push(`- Hook: ${day.hook}`);
    if (day.scenes) parts.push(`- Scene: ${day.scenes.join(" | ")}`);
    if (day.overlayText) parts.push(`- Testo in sovrimpressione: ${day.overlayText.join(" | ")}`);
    if (day.script) parts.push(`- Script: ${day.script}`);
    if (day.description) parts.push(`- Descrizione: ${day.description}`);

    return `${parts.join("\n")}\n`;
  });

  return [
    `# Launch Week Social - Calcolich`,
    "",
    `Generato il ${launchWeek.generatedAt}.`,
    "",
    `| Giorno | Data | Canale | Pagina | Lingua | Orario | URL UTM | Obiettivo | Metrica | Stato |`,
    `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |`,
    ...rows,
    "",
    ...sections,
  ].join("\n");
}

async function writeCalendarArtifacts(calendar, stamp) {
  const calendarKey = stamp.slice(0, 7);
  const jsonPath = join(SOCIAL_ROOT, "calendar", `${calendarKey}.json`);
  const mdPath = join(SOCIAL_ROOT, "calendar", `${calendarKey}.md`);
  await writeFile(jsonPath, JSON.stringify(calendar, null, 2), "utf8");
  await writeFile(mdPath, renderCalendarMarkdown(calendar), "utf8");
}

function renderCalendarMarkdown(calendar) {
  const rows = calendar.days.map((day) =>
    `| ${day.date} | ${day.channelLabel} | ${day.pageTitle} | ${day.status} | ${day.utmUrl} | ${day.nextPage ?? ""} |`,
  );
  return [
    `# Calendario Social 30 giorni`,
    "",
    `| Data | Canale | Pagina | Stato | URL UTM | Prossima pagina |`,
    `| --- | --- | --- | --- | --- | --- |`,
    ...rows,
    "",
  ].join("\n");
}

function buildSocialReport({ stamp, campaigns, calendar, validation, launchWeek, launchWeekValidation, seo, content, monetization }) {
  const generatedContents = campaigns.flatMap((campaign) =>
    campaign.channels.map((channel) => ({
      content: `${campaign.title} — ${channelLabel(channel.name)}`,
      page: campaign.pageHref,
      channel: channel.name,
      url: channel.items[0]?.utmUrl ?? buildUtmUrl(campaign, channel, "report_1"),
      status: campaign.status,
      clicks: null,
      leads: null,
      nextPage: calendar.days.find((day) => day.pageHref === campaign.pageHref && day.channel === channel.name)?.nextPage ?? null,
    })),
  );

  const topPromotions = campaigns.slice(0, 5).map((campaign) => ({
    page: campaign.pageHref,
    title: campaign.title,
    locale: campaign.locale,
    campaign: campaign.campaign,
    priority: campaign.priority,
  }));

  const markdown = [
    `# Calcolich Social Traffic Report - ${stamp}`,
    "",
    section("Contenuti generati", [bulletList(generatedContents.slice(0, 10).map((item) => `${item.content} -> ${item.url} (${item.status})`))]),
    "",
    section("Pagine promosse", [bulletList(topPromotions.map((item) => `${item.title} (${item.locale}) -> ${item.page}`))]),
    "",
    section("Canali", [bulletList(CHANNELS.map((channel) => `${channel.name}: ${channel.source} / ${channel.medium}`))]),
    "",
    section("URL UTM", [bulletList(generatedContents.slice(0, 10).map((item) => item.url))]),
    "",
    section("Stato", [bulletList(["bozza"]) ]),
    "",
    section("Clic e lead", [bulletList(["Dati non ancora disponibili."]) ]),
    "",
    section("Prossima pagina da promuovere", [calendar.days[0]?.nextPage ?? "Nessuna"] ),
    "",
    ...(launchWeek ? [
      section("Launch Week", [
        bulletList([
          `Contenuti pianificati: ${launchWeek.summary.generatedContents}`,
          `Pagine prioritarie: ${launchWeek.summary.promotedPages.join(", ")}`,
          `Prossima pagina: ${launchWeek.summary.nextPage ?? "non disponibile"}`,
          `Validazione: ${launchWeekValidation?.ok ? "OK" : "attenzione"}`,
        ]),
      ]),
      "",
    ] : []),
    section("Qualita", [bulletList(validation.ok ? ["Verifica superata"] : validation.issues.slice(0, 6).map((issue) => `${issue.scope}: ${issue.message}`))]),
    "",
    section("Traiettoria", [socialTrajectory(seo, content, monetization, campaigns)]),
    "",
  ].join("\n");

  return {
    markdown,
    summary: {
      overview: validation.ok
        ? "Social Traffic Agent: contenuti pronti, calendario 30 giorni generato e qualità social verificata."
        : "Social Traffic Agent: contenuti generati con alcune verifiche da sistemare.",
      generatedContents,
      topPromotions,
      nextPage: calendar.days[0]?.nextPage ?? null,
      validation,
      launchWeek: launchWeek?.summary ?? null,
    },
  };
}

function socialTrajectory(seo, content, monetization, campaigns) {
  const highIntent = campaigns.filter((campaign) => campaign.priority === "alta").length;
  const readySeo = seo.keywordCoverage.filter((item) => item.status === "coperta").length;
  const monetizable = monetization.topOpportunities.filter((item) => item.potential === "alta").length;
  const contentReady = content.updates.length;
  if (highIntent >= 7 && readySeo >= 4 && monetizable >= 4) return "Buona: i cluster prioritari hanno già una base forte per traffico e conversione.";
  if (readySeo >= 3 || monetizable >= 3 || contentReady >= 3) return "In crescita: la base c'è, serve distribuzione costante e contenuto social più ampio.";
  return "Da consolidare: i contenuti social esistono, ma devono ancora allinearsi meglio con i cluster forti del sito.";
}
