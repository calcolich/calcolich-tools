import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie policy | Calcolich",
  description: "Cookie policy di Calcolich: cookie tecnici, annunci Google AdSense e gestione dal browser.",
  alternates: {
    canonical: "https://calcolich.ch/cookie",
  },
};

export default function CookiePage() {
  return (
    <main className="bg-[#f6f8fb] px-5 py-10 text-gray-950 md:px-10">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <p className="mb-4 text-xs font-black uppercase tracking-wide text-emerald-700">Cookie</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Cookie policy</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-700">
          <p><strong>Ultimo aggiornamento:</strong> 15 giugno 2026.</p>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Cookie tecnici</h2>
            <p className="mt-2">Il sito puo usare cookie o tecnologie simili necessari a sicurezza, funzionamento e prestazioni di base.</p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Cookie pubblicitari</h2>
            <p className="mt-2">
              Se gli annunci sono attivi, Google AdSense puo usare cookie o identificatori simili per mostrare annunci,
              misurare interazioni e migliorare la qualita del servizio pubblicitario.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Gestione cookie</h2>
            <p className="mt-2">
              Puoi gestire, limitare o cancellare i cookie dalle impostazioni del browser. Il blocco di alcuni cookie
              puo influire su servizi esterni come annunci o misurazioni.
            </p>
          </section>
          <p>Consulta anche la <Link className="font-bold text-emerald-800" href="/privacy">Privacy policy</Link>.</p>
        </div>
      </article>
    </main>
  );
}
