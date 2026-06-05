import { mkdir, writeFile } from "node:fs/promises";

const slug = process.argv[2];
const title = process.argv[3];
const category = process.argv[4] ?? "Calcolatore";

if (!slug || !title) {
  console.error("Usage: node scripts/generate-calculator-assets.mjs <slug> <title> [category]");
  process.exit(1);
}

const outputDir = `generated/${slug}`;
await mkdir(outputDir, { recursive: true });

const article = `# ${title}

## Introduzione

Questo articolo spiega come usare il calcolatore ${title} e perche puo essere utile per prendere decisioni piu rapide. La pagina dovrebbe partire da un problema concreto, mostrare la formula in modo semplice e collegare strumenti correlati su Calcolich.

## Come funziona

Descrivi gli input richiesti, il significato di ogni campo e il risultato prodotto. Usa esempi numerici realistici e mantieni il linguaggio semplice.

## Esempio pratico

Inserisci un caso reale con numeri tondi. Mostra il risultato, poi spiega come interpretarlo.

## Errori comuni

Elenca gli errori piu frequenti: dati sbagliati, percentuali confuse, aspettative non realistiche o uso del risultato come dato ufficiale quando e solo una stima.

## Conclusione

Invita l'utente a provare altri strumenti collegati e a iscriversi alla newsletter.

## FAQ

### Il calcolo e ufficiale?
No, e una stima pratica. Per decisioni importanti verifica sempre fonti ufficiali o un consulente.

### Posso usarlo gratis?
Si, il calcolatore e pensato come strumento gratuito.

### Come posso aggiungere un nuovo calcolatore?
Aggiungi una nuova voce in lib/calculators.ts e collega gli input al motore di calcolo.
`;

const socialPost = `Nuovo strumento gratuito: ${title}.

Categoria: ${category}

Provalo qui: https://calcolich.ch/${slug}

#Calcolich #Svizzera #Finanza #Trading #SEO`;

const shortScript = `Hook: Stai calcolando ${title.toLowerCase()} a mano?

Problema: molti sbagliano perche usano formule confuse o numeri incompleti.

Soluzione: vai su Calcolich e usa il calcolatore gratuito ${title}.

CTA: salvalo nei preferiti e prova anche gli strumenti collegati.`;

const newsletter = `Oggetto: nuovo calcolatore gratuito - ${title}

Ciao,

ho aggiunto un nuovo strumento su Calcolich: ${title}.

Categoria: ${category}

Lo trovi qui:
https://calcolich.ch/${slug}

A presto,
Calcolich`;

await Promise.all([
  writeFile(`${outputDir}/article.md`, article),
  writeFile(`${outputDir}/social-post.md`, socialPost),
  writeFile(`${outputDir}/short-script.md`, shortScript),
  writeFile(`${outputDir}/newsletter-email.txt`, newsletter),
  writeFile(`${outputDir}/faq.json`, JSON.stringify([
    { question: "Il calcolo e ufficiale?", answer: "No, e una stima pratica." },
    { question: "Posso usarlo gratis?", answer: "Si." },
  ], null, 2)),
]);

console.log(`Generated assets in ${outputDir}`);
