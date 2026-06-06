import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Servizi AI e SEO per piccole aziende | Calcolich",
  description:
    "Siti web semplici, SEO locale, Google Business Profile, automazioni AI, chatbot e contenuti social per aziende in Svizzera e Puglia.",
};

const packages = [
  {
    name: "Starter",
    price: "490 CHF/€",
    items: ["Pagina web semplice", "Testo vendita", "Setup contatto WhatsApp", "Base SEO locale"],
  },
  {
    name: "Business",
    price: "990 CHF/€",
    items: ["Mini sito fino a 5 sezioni", "Google Business Profile", "SEO locale", "3 contenuti social", "Modulo contatto"],
  },
  {
    name: "Premium",
    price: "1.990 CHF/€",
    items: ["Sito completo", "Chatbot semplice", "Automazioni AI", "Piano contenuti 30 giorni", "Setup lead generation"],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Svizzera e Puglia
          </p>
          <h1 className="max-w-4xl text-4xl font-bold text-gray-950 md:text-6xl">
            Siti semplici, SEO locale e automazioni AI per piccole aziende
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
            Aiuto ristoranti, artigiani, studi professionali, B&B e piccole aziende a trovare clienti
            online con pagine chiare, Google Business Profile, contenuti social, chatbot e automazioni.
          </p>
          <a
            href="https://wa.me/"
            className="mt-6 inline-block rounded-xl bg-black px-6 py-4 font-bold text-white"
          >
            Richiedi una consulenza
          </a>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="mt-3 text-3xl font-bold text-green-700">{item.price}</p>
              <ul className="mt-5 space-y-3 text-gray-700">
                {item.items.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
          <article className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">Cosa posso creare per te</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Sito web semplice",
                "SEO locale",
                "Google Business Profile",
                "Automazioni AI",
                "Chatbot per aziende",
                "Contenuti social",
              ].map((service) => (
                <div key={service} className="rounded-xl border border-gray-200 p-4 font-semibold">
                  {service}
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-3xl font-bold">Script chiamata vendita</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-gray-700">
              <li>Capire attività, zona e tipo di clienti desiderati.</li>
              <li>Chiedere cosa oggi porta clienti e cosa non funziona.</li>
              <li>Mostrare una proposta semplice: sito, Google, contenuti, automazione.</li>
              <li>Chiudere con un pacchetto chiaro e prossimo passo entro 48 ore.</li>
            </ol>

            <h2 className="mt-8 text-3xl font-bold">Testo WhatsApp pronto</h2>
            <p className="mt-4 rounded-xl bg-gray-100 p-4 text-gray-700">
              Ciao, ho visto la tua attività e posso aiutarti a ricevere più richieste online con
              una pagina semplice, Google Business Profile ottimizzato e contenuti locali. Ti mando
              una proposta rapida senza impegno?
            </p>
          </article>

          <aside className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">Richiedi informazioni</h2>
            <LeadForm
              source="services-ai-seo"
              buttonLabel="Invia richiesta"
              showName
              showPhone
              showPackage
              showMessage
            />

            <h3 className="mt-8 text-xl font-bold">Email automatica</h3>
            <p className="mt-3 rounded-xl bg-gray-100 p-4 text-sm text-gray-700">
              Oggetto: richiesta ricevuta. Ciao, grazie per il messaggio. Ti rispondo entro 24 ore
              con una proposta semplice per aumentare visibilità e richieste online.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
