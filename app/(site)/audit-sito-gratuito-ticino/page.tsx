import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { CommercialPageView } from "@/components/CommercialTracking";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audit sito gratuito Ticino | Calcolich",
  description: "Audit gratuito del sito per aziende in Ticino: controllo visibilita locale, percorso contatti, mobile, contenuti e misurazione. Prima analisi entro 24 ore.",
  alternates: { canonical: "https://www.calcolich.ch/audit-sito-gratuito-ticino" },
};

const source = "audit-sito-gratuito-ticino";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Audit gratuito del sito web",
    description: "Prima analisi gratuita di visibilita locale, conversione, contenuti e misurazione per aziende in Ticino.",
    provider: { "@type": "Organization", name: "Calcolich", url: "https://www.calcolich.ch" },
    areaServed: { "@type": "AdministrativeArea", name: "Canton Ticino" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ["L'audit e davvero gratuito?", "Si. La prima analisi non richiede pagamento ne impegno successivo."],
      ["Servono password o accessi?", "No. Per la prima analisi controllo soltanto le pagine pubbliche del sito e i percorsi visibili a un potenziale cliente."],
      ["Cosa ricevo?", "Ricevi le priorita principali, il problema piu evidente nel percorso contatti e il primo intervento consigliato."],
    ].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Calcolich", item: "https://www.calcolich.ch" },
      { "@type": "ListItem", position: 2, name: "Audit sito gratuito", item: "https://www.calcolich.ch/audit-sito-gratuito-ticino" },
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <CommercialPageView source={source} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex text-sm font-black text-emerald-800 hover:text-emerald-950">Calcolich</Link>

        <section className="grid gap-8 border-b border-gray-200 bg-white px-6 py-10 md:px-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Per aziende e professionisti in Ticino</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Scopri cosa blocca i contatti dal tuo sito</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              Analizzo le pagine pubbliche, il percorso verso telefono o modulo, la presenza locale e la misurazione. Ricevi le prime priorita entro 24 ore, senza impegno.
            </p>
            <div className="mt-7 grid gap-3 text-sm font-bold text-gray-800 sm:grid-cols-3">
              {["Nessun accesso richiesto", "Risposta entro 24 ore", "Priorita concrete"].map((item) => (
                <div key={item} className="border-l-4 border-lime-400 bg-lime-50 px-4 py-3">{item}</div>
              ))}
            </div>
          </div>

          <aside id="audit" className="border border-gray-200 bg-[#f6f8fb] p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Audit gratuito</p>
            <h2 className="mt-2 text-2xl font-black">Indicami il sito da controllare</h2>
            <p className="mt-3 leading-7 text-gray-700">Non servono password. Inserisci solo il sito pubblico e un contatto per ricevere l&apos;analisi.</p>
            <LeadForm
              source={source}
              buttonLabel="Richiedi l'audit gratuito"
              showName
              showCompany
              showSiteUrl
              showPhone
              showMessage
            />
          </aside>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
          <article>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Cosa controllo</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Cinque punti che incidono sulle richieste</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Offerta", "Si capisce subito cosa fai, per chi e in quale zona?"],
                ["Percorso contatti", "Telefono, WhatsApp e modulo sono visibili e coerenti con la pagina?"],
                ["SEO locale", "Servizi, localita, title e struttura aiutano Google a capire il sito?"],
                ["Mobile", "Testi, pulsanti e moduli restano rapidi e leggibili da smartphone?"],
                ["Misurazione", "Puoi sapere quale pagina o campagna ha prodotto il contatto?"],
              ].map(([title, description]) => (
                <div key={title} className="border-b border-gray-200 bg-white p-5">
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-2 leading-7 text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="h-fit bg-gray-950 p-6 text-white">
            <p className="text-xs font-black uppercase tracking-wide text-lime-300">Esempio operativo</p>
            <h2 className="mt-2 text-2xl font-black">Calcolich viene misurato allo stesso modo</h2>
            <p className="mt-3 leading-7 text-gray-200">Ogni pagina collega query, strumento, CTA e modulo. L&apos;obiettivo non e avere visite generiche, ma capire quali contenuti producono richieste reali.</p>
            <Link href="/servizi-ai-seo" className="mt-5 inline-flex font-black text-lime-300 hover:text-lime-200">Vedi servizi e prezzi</Link>
          </aside>
        </section>

        <section className="border-t border-gray-200 py-12">
          <h2 className="text-3xl font-black tracking-tight">Domande frequenti</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["L'audit e davvero gratuito?", "Si. La prima analisi non richiede pagamento ne impegno successivo."],
              ["Servono password o accessi?", "No. Controllo soltanto le pagine pubbliche e il percorso visibile a un potenziale cliente."],
              ["Cosa ricevo?", "Le priorita principali, il problema piu evidente nel percorso contatti e il primo intervento consigliato."],
            ].map(([question, answer]) => (
              <details key={question} className="bg-white p-5">
                <summary className="cursor-pointer font-black">{question}</summary>
                <p className="mt-3 leading-7 text-gray-700">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
