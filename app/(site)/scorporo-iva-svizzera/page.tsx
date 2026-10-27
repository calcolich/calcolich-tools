import type { Metadata } from "next";
import ScorporoIvaCalculator from "@/components/ScorporoIvaCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scorporo IVA Svizzera 2026: calcola imponibile e IVA inclusa",
  description:
    "Scorpora l'IVA svizzera da un importo lordo: calcola imponibile e imposta inclusa al 8.1%, 3.8% o 2.6%. Gratis e immediato.",
  alternates: {
    canonical: "https://www.calcolich.ch/scorporo-iva-svizzera",
  },
};

export default function ScorporoIVA() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Come si scorpora l'IVA al 8.1%?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dividi il totale IVA inclusa per 1,081. La differenza tra totale e imponibile è l'IVA contenuta nell'importo.",
        },
      },
      {
        "@type": "Question",
        name: "Posso usare aliquote IVA diverse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Il calcolatore permette di selezionare l'aliquota svizzera 8,1%, 3,8% o 2,6% in base al tipo di prestazione.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-6 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
          Tutti i calcolatori
        </Link>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">Business</p>
          <h1 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">
            Scorporo IVA
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Parti da un totale IVA inclusa e ricava subito imponibile e imposta con le aliquote svizzere 8.1%, 3.8% e 2.6%.
          </p>

          <ScorporoIvaCalculator />
        </section>

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black tracking-tight">Come scorporare l&apos;IVA svizzera</h2>
          <div className="mt-4 space-y-4 leading-7 text-gray-700">
            <p>
              Se hai un prezzo già IVA inclusa, non basta calcolare l&apos;8.1% del totale. Per lo scorporo devi dividere l&apos;importo lordo per 1.081: ottieni l&apos;imponibile e la differenza è l&apos;IVA inclusa.
            </p>
            <p>
              Esempio: CHF 108.10 IVA inclusa al 8.1% corrispondono a CHF 100.00 imponibili e CHF 8.10 di IVA. Se il prodotto o servizio rientra in un&apos;altra aliquota, seleziona 2.6% o 3.8% prima di calcolare.
            </p>
          </div>
          <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
            <div>
              <h3 className="font-black">Come scorporo l&apos;IVA al 8.1%?</h3>
              <p className="mt-1 leading-7 text-gray-700">Dividi il totale IVA inclusa per 1.081. Il risultato è l&apos;imponibile; la differenza è l&apos;IVA.</p>
            </div>
            <div>
              <h3 className="font-black">Il risultato è valido per la fattura?</h3>
              <p className="mt-1 leading-7 text-gray-700">È un controllo pratico. Prima di emettere una fattura, verifica sempre l&apos;aliquota corretta per la prestazione.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
