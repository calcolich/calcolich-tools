import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { servicePages } from "@/lib/service-pages";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Siti web, SEO locale e automazioni AI | Calcolich",
  description: "Siti web, calcolatori SEO, Google Business Profile e automazioni AI per professionisti e piccole aziende in Svizzera.",
  alternates: {
    canonical: "https://calcolich.ch/servizi-ai-seo",
  },
};

const projects = [
  {
    name: "Starter",
    price: "CHF 490",
    note: "una tantum",
    items: ["Pagina web focalizzata", "Testo vendita", "Modulo contatti", "SEO locale di base"],
  },
  {
    name: "Business",
    price: "CHF 990",
    note: "una tantum",
    featured: true,
    items: ["Sito fino a 5 sezioni", "Google Business Profile", "SEO locale", "Modulo lead e tracciamento"],
  },
  {
    name: "Lead Engine",
    price: "CHF 1.990",
    note: "una tantum",
    items: ["Sito completo", "Calcolatore o lead magnet", "Automazione email", "Piano contenuti 30 giorni"],
  },
];

const retainers = [
  {
    name: "Presenza Locale",
    price: "CHF 290/mese",
    items: ["Aggiornamenti sito", "2 contenuti locali", "Controllo Google Business", "Report mensile"],
  },
  {
    name: "Crescita",
    price: "CHF 490/mese",
    items: ["Nuove pagine SEO", "4 contenuti mensili", "Ottimizzazione conversioni", "Manutenzione automazioni"],
  },
  {
    name: "Acquisizione",
    price: "CHF 790/mese",
    items: ["Cluster SEO continuativo", "Lead magnet e test CTA", "Automazioni commerciali", "Supporto prioritario"],
  },
];

const packageOptions = [
  ...projects.map((item) => `${item.name} - ${item.price}`),
  ...retainers.map((item) => `${item.name} - ${item.price}`),
  "Non so ancora - consigliami",
];

type PageProps = {
  searchParams: Promise<{ source?: string; tool?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const source = buildLeadSource(params.source, params.tool);

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 grid gap-8 border-b border-gray-200 bg-white px-6 py-10 md:px-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-emerald-700">Per aziende e professionisti in Svizzera</p>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-gray-950 md:text-6xl">
              Siti web e SEO locale costruiti per ricevere richieste
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              Creo pagine veloci, calcolatori, contenuti SEO e automazioni semplici. Ogni progetto parte da un obiettivo concreto: piu contatti qualificati, meno lavoro manuale.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-gray-700">
              {["Analisi iniziale gratuita", "Prezzo chiaro", "Risposta entro 24 ore"].map((item) => (
                <span key={item} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">{item}</span>
              ))}
            </div>
          </div>
          <a href="#richiedi" className="inline-flex justify-center rounded-xl bg-gray-950 px-6 py-4 font-black text-white transition hover:bg-emerald-800">
            Richiedi analisi gratuita
          </a>
        </section>

        <section>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Progetti una tantum</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Parti con una base che vende</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {projects.map((item) => <PriceCard key={item.name} {...item} />)}
          </div>
        </section>

        <section className="mt-12">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Crescita continuativa</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">SEO e ottimizzazione ogni mese</h2>
          <p className="mt-3 max-w-3xl leading-7 text-gray-700">Nessun vincolo lungo: si lavora per obiettivi mensili chiari e si rinnova solo quando il lavoro crea valore.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {retainers.map((item) => <PriceCard key={item.name} {...item} />)}
          </div>
        </section>

        <section className="mt-12 border-y border-gray-200 py-10">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Soluzioni specifiche</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Parti dal problema piu vicino alla tua attivita</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {servicePages.map((page) => (
              <Link key={page.slug} href={`/servizi/${page.slug}`} className="group bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">{page.eyebrow}</p>
                <h3 className="mt-2 text-xl font-black group-hover:text-emerald-800">{page.shortTitle}</h3>
                <p className="mt-2 leading-7 text-gray-700">{page.metaDescription}</p>
                <p className="mt-4 font-black text-gray-950">Da {page.priceFrom}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_420px]">
          <article className="bg-white p-6 md:p-8">
            <h2 className="text-3xl font-black tracking-tight">Come lavoriamo</h2>
            <ol className="mt-6 grid gap-4">
              {[
                ["1", "Analisi", "Capisco servizio, zona, clienti desiderati e cosa oggi blocca le richieste."],
                ["2", "Proposta", "Ricevi priorita, tempi, prezzo e risultato atteso in un documento semplice."],
                ["3", "Consegna", "Pubblico, collego contatti e misurazione, poi controlliamo i primi dati."],
              ].map(([number, title, text]) => (
                <li key={number} className="flex gap-4 border-b border-gray-100 pb-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-100 font-black text-lime-900">{number}</span>
                  <div><h3 className="font-black">{title}</h3><p className="mt-1 leading-7 text-gray-700">{text}</p></div>
                </li>
              ))}
            </ol>
          </article>

          <aside id="richiedi" className="border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Senza impegno</p>
            <h2 className="mt-2 text-2xl font-black">Ricevi una prima analisi</h2>
            <p className="mt-3 leading-7 text-gray-700">Descrivi in poche righe la tua attivita. Rispondo entro 24 ore con il primo intervento che farei.</p>
            <LeadForm
              source={source}
              buttonLabel="Invia richiesta"
              showName
              showPhone
              showPackage
              showMessage
              packageOptions={packageOptions}
            />
          </aside>
        </section>
      </div>
    </main>
  );
}

function PriceCard({ name, price, note, items, featured = false }: { name: string; price: string; note?: string; items: string[]; featured?: boolean }) {
  return (
    <article className={`border bg-white p-6 shadow-sm ${featured ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-200"}`}>
      {featured ? <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">Piu scelto</p> : null}
      <h3 className="text-2xl font-black">{name}</h3>
      <p className="mt-3 text-3xl font-black text-emerald-700">{price}</p>
      {note ? <p className="mt-1 text-sm text-gray-500">{note}</p> : null}
      <ul className="mt-5 space-y-3 text-gray-700">
        {items.map((feature) => <li key={feature} className="flex gap-3"><span className="font-black text-emerald-600">+</span><span>{feature}</span></li>)}
      </ul>
    </article>
  );
}

function buildLeadSource(source?: string, tool?: string) {
  const clean = (value?: string) => value?.replace(/[^a-z0-9-]/gi, "").slice(0, 80);
  return ["services-ai-seo", clean(source), clean(tool)].filter(Boolean).join(":");
}
