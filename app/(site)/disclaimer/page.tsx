import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Calcolich",
  description: "Disclaimer di Calcolich: i calcolatori forniscono stime informative e non sostituiscono consulenze professionali.",
  alternates: {
    canonical: "https://www.calcolich.ch/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="bg-[#f6f8fb] px-5 py-10 text-gray-950 md:px-10">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <p className="mb-4 text-xs font-black uppercase tracking-wide text-emerald-700">Disclaimer</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Informazioni e limiti dei calcoli</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-black text-gray-950">Uso informativo</h2>
            <p className="mt-2">I risultati forniti da Calcolich sono stime automatiche basate sui dati inseriti dall&apos;utente.</p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Nessuna consulenza professionale</h2>
            <p className="mt-2">
              Le informazioni presenti sul sito non costituiscono consulenza fiscale, finanziaria, legale, medica,
              bancaria, assicurativa o professionale.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-black text-gray-950">Verifica dei risultati</h2>
            <p className="mt-2">
              Prima di prendere decisioni economiche, fiscali, sanitarie, contrattuali o di investimento, verifica
              sempre i dati con fonti ufficiali o professionisti qualificati.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
