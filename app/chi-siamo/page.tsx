import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chi siamo | Calcolich",
  description: "Scopri Calcolich, il sito di calcolatori online gratuiti per lavoro, business, finanza, casa e trading.",
  alternates: {
    canonical: "https://calcolich.ch/chi-siamo",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[#f6f8fb] px-5 py-10 text-gray-950 md:px-10">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <p className="mb-4 text-xs font-black uppercase tracking-wide text-emerald-700">Calcolich</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Calcolatori semplici per decisioni piu chiare.</h1>
        <div className="mt-8 space-y-5 text-lg leading-8 text-gray-700">
          <p>
            Calcolich nasce per raccogliere strumenti pratici, veloci e gratuiti. L&apos;obiettivo e aiutare chi lavora,
            gestisce un budget, valuta un investimento o prende decisioni operative a trasformare un dubbio in un numero.
          </p>
          <p>
            Il sito combina calcolatori per Svizzera, business, finanza personale e trading con guide semplici,
            FAQ e collegamenti tra strumenti correlati. Ogni pagina e pensata per dare una risposta rapida e poi
            aiutare l&apos;utente a capire il significato del risultato.
          </p>
          <p>
            I risultati sono stime informative. Per tasse, salario, contratti, investimenti, salute o decisioni importanti,
            verifica sempre dati ufficiali o professionisti qualificati.
          </p>
        </div>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-gray-950 px-5 py-3 font-bold text-white">
          Torna ai calcolatori
        </Link>
      </article>
    </main>
  );
}
