import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy | Calcolich",
  description: "Privacy policy di Calcolich: dati inseriti nei calcolatori, dati tecnici, annunci e servizi di terze parti.",
  alternates: {
    canonical: "https://calcolich.ch/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#f6f8fb] px-5 py-10 text-gray-950 md:px-10">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <p className="mb-4 text-xs font-black uppercase tracking-wide text-emerald-700">Privacy</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Privacy policy</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-700">
          <p><strong>Ultimo aggiornamento:</strong> 15 giugno 2026.</p>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Dati inseriti nei calcolatori</h2>
            <p className="mt-2">
              I valori inseriti nei calcolatori vengono elaborati per mostrare il risultato richiesto. I calcoli sono
              pensati per funzionare direttamente nella pagina e non richiedono registrazione.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Dati tecnici</h2>
            <p className="mt-2">
              Come molti siti web, l&apos;hosting e i servizi tecnici possono raccogliere dati necessari al funzionamento,
              come indirizzo IP, user agent, URL richieste, data e ora della visita.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Pubblicita e servizi terzi</h2>
            <p className="mt-2">
              Calcolich puo usare Google AdSense per mostrare annunci. Google e i suoi partner possono usare cookie
              o identificatori simili per pubblicare annunci, limitarne la frequenza e misurarne le prestazioni.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Contatti</h2>
            <p className="mt-2">
              Per richieste relative alla privacy puoi usare la pagina <Link className="font-bold text-emerald-800" href="/contatti">Contatti</Link>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
