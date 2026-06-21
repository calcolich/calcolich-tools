import LeadForm from "@/components/LeadForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Piano Cashflow Online | Calcolich",
  description:
    "Piano operativo Calcolich per creare traffico SEO, raccogliere lead e monetizzare con servizi, AdSense e contenuti trading.",
  alternates: {
    canonical: "https://www.calcolich.ch/piano-cashflow-online",
  },
};

const steps = [
  "Pubblicare calcolatori SEO ad alta intenzione",
  "Raccogliere email e richieste servizio",
  "Portare traffico da Shorts e articoli",
  "Monetizzare con servizi AI/SEO, AdSense e affiliate",
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-sm font-semibold text-gray-600 hover:text-black">
          Tutti i calcolatori
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Cashflow machine
            </p>
            <h1 className="text-4xl font-bold text-gray-950 md:text-6xl">
              Traffico, lead e prime entrate online
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Calcolich cresce con calcolatori SEO, contenuti trading e servizi AI/SEO per aziende.
              L&apos;obiettivo non e fare un sito bello e basta: e creare una macchina che porta visite,
              contatti e vendite.
            </p>
          </div>

          <aside className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">Vuoi un sito simile?</h2>
            <p className="mt-3 text-gray-700">
              Lascia un contatto e ricevi una proposta semplice per sito, SEO locale e automazioni.
            </p>
            <LeadForm
              source="cashflow-page"
              buttonLabel="Richiedi proposta"
              showName
              showPhone
              showPackage
              showMessage
            />
          </aside>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step} className="rounded-2xl bg-white p-6 shadow">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Step {index + 1}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-950">{step}</h2>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl bg-black p-6 text-white shadow">
          <h2 className="text-3xl font-bold">Prossima priorita</h2>
          <p className="mt-3 max-w-3xl text-gray-200">
            Ogni settimana pubblicare nuovi tool, misurare Search Console, migliorare le pagine che
            ricevono impression e contattare aziende reali per vendere i pacchetti servizi.
          </p>
        </section>
      </div>
    </main>
  );
}
