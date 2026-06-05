import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const blueprintsPath = path.join(repoRoot, process.argv[2] ?? "scripts/calculator-blueprints.json");
const calculatorsPath = path.join(repoRoot, "lib/calculators.ts");
const generatedRoot = path.join(repoRoot, "generated");

const blueprints = JSON.parse(await readFile(blueprintsPath, "utf8"));
let source = await readFile(calculatorsPath, "utf8");

const existingSlugs = new Set(
  Array.from(source.matchAll(/slug:\s*"([^"]+)"/g)).map((match) => match[1]),
);

const created = [];
const skipped = [];

for (const blueprint of blueprints) {
  if (existingSlugs.has(blueprint.slug)) {
    skipped.push(blueprint.slug);
    continue;
  }

  const calculator = normalizeBlueprint(blueprint);
  const objectSource = `  ${toTsObject(calculator)},\n`;
  source = source.replace(/\n\];\n\nexport function getCalculator/, `\n${objectSource}];\n\nexport function getCalculator`);
  existingSlugs.add(calculator.slug);
  created.push(calculator);

  await writeGeneratedAssets(calculator);
}

await writeFile(calculatorsPath, source);

console.log(`Created calculators: ${created.length}`);
for (const calculator of created) {
  console.log(`- https://calcolich.ch/${calculator.slug}`);
}
if (skipped.length > 0) {
  console.log(`Skipped existing calculators: ${skipped.join(", ")}`);
}

function normalizeBlueprint(blueprint) {
  const article = blueprint.article ?? buildArticle(blueprint);
  const faqs = blueprint.faqs ?? buildFaqs(blueprint);

  return {
    slug: blueprint.slug,
    kind: blueprint.kind,
    title: blueprint.title,
    shortTitle: blueprint.shortTitle ?? blueprint.title.replace(/^Calcolatore\s+/i, ""),
    category: blueprint.category ?? "Calcolatore",
    metaTitle: blueprint.metaTitle ?? `${blueprint.title} Online | Calcolich`,
    metaDescription: blueprint.metaDescription ?? `${blueprint.intro} Strumento gratuito con spiegazione semplice, FAQ e link utili.`,
    intro: blueprint.intro,
    cta: blueprint.cta ?? "Ricevi nuovi calcolatori gratuiti per lavoro, finanza, business e trading.",
    inputs: blueprint.inputs,
    article,
    faqs,
    relatedSlugs: blueprint.relatedSlugs ?? ["calcolo-percentuale", "calcolo-interessi-composti", "calcolo-rischio-trading"],
  };
}

function buildArticle(blueprint) {
  const subject = blueprint.title.replace(/^Calcolatore\s+/i, "").toLowerCase();
  return [
    `Il ${blueprint.title} nasce per risolvere un problema semplice ma frequente: ottenere un numero chiaro senza perdere tempo con formule manuali. In molti casi, chi cerca ${subject} vuole una risposta immediata per decidere, confrontare alternative o controllare un conteggio prima di usare il dato in una fattura, in un budget, in una trattativa o in una strategia operativa.`,
    `Il funzionamento e pratico: inserisci i valori richiesti, controlli che siano coerenti con il tuo caso e leggi subito il risultato principale. La pagina e pensata per persone che vogliono usare lo strumento velocemente, ma anche capire il significato del risultato. Per questo ogni calcolatore include una spiegazione semplice, FAQ, dati strutturati e collegamenti ad altri strumenti utili.`,
    `Quando usi questo calcolo, evita l'errore piu comune: trattare una stima come se fosse un dato ufficiale. Il risultato serve per orientarti e fare controlli rapidi, ma per decisioni fiscali, contrattuali, bancarie o di investimento conviene verificare sempre con fonti ufficiali, documenti aggiornati o un professionista qualificato.`,
    `Dal punto di vista SEO e business, questo tool ha un obiettivo preciso: portare traffico qualificato su Calcolich e trasformare visite in lead tramite newsletter, richieste servizi o contenuti collegati. Per questo la pagina collega strumenti simili e puo essere usata come destinazione per post social, video brevi, guide e campagne locali.`,
  ];
}

function buildFaqs(blueprint) {
  return [
    {
      question: `A cosa serve ${blueprint.title}?`,
      answer: `Serve a calcolare rapidamente ${blueprint.title.replace(/^Calcolatore\s+/i, "").toLowerCase()} partendo dai valori principali inseriti dall'utente.`,
    },
    {
      question: "Il risultato e ufficiale?",
      answer: "No, e una stima pratica. Per decisioni importanti verifica sempre documenti ufficiali, contratto, banca, consulente o fonte competente.",
    },
    {
      question: "Posso usare il calcolatore gratis?",
      answer: "Si, lo strumento e gratuito e pensato per essere usato online senza installare nulla.",
    },
  ];
}

function toTsObject(value, indent = 2) {
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${" ".repeat(indent + 2)}${toTsObject(item, indent + 2)}`);
    return `[\n${items.join(",\n")}\n${" ".repeat(indent)}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(([key, item]) => {
      return `${" ".repeat(indent + 2)}${key}: ${toTsObject(item, indent + 2)}`;
    });
    return `{\n${entries.join(",\n")}\n${" ".repeat(indent)}}`;
  }

  return JSON.stringify(value);
}

async function writeGeneratedAssets(calculator) {
  const outputDir = path.join(generatedRoot, calculator.slug);
  await mkdir(outputDir, { recursive: true });

  const article = `# ${calculator.title}\n\n${calculator.article.join("\n\n")}\n\n## FAQ\n\n${calculator.faqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join("\n\n")}\n`;
  const socialPost = `Nuovo strumento gratuito: ${calculator.title}.\n\n${calculator.intro}\n\nProvalo qui: https://calcolich.ch/${calculator.slug}\n\n#Calcolich #Calcolatori #Svizzera #Finanza #Business`;
  const shortScript = `Hook: stai ancora calcolando ${calculator.shortTitle.toLowerCase()} a mano?\n\nProblema: basta un numero sbagliato e perdi tempo o prendi decisioni confuse.\n\nSoluzione: usa ${calculator.title} su Calcolich, inserisci i dati e leggi subito il risultato.\n\nCTA: salvalo e prova anche gli strumenti collegati.`;
  const newsletter = `Oggetto: nuovo tool gratuito - ${calculator.title}\n\nCiao,\n\nho pubblicato un nuovo calcolatore su Calcolich:\n${calculator.title}\n\n${calculator.intro}\n\nLo trovi qui:\nhttps://calcolich.ch/${calculator.slug}\n\nA presto,\nCalcolich`;

  await Promise.all([
    writeFile(path.join(outputDir, "article.md"), article),
    writeFile(path.join(outputDir, "social-post.md"), socialPost),
    writeFile(path.join(outputDir, "short-script.md"), shortScript),
    writeFile(path.join(outputDir, "newsletter-email.txt"), newsletter),
    writeFile(path.join(outputDir, "faq.json"), JSON.stringify(calculator.faqs, null, 2)),
  ]);
}
