import AdSlot from "@/components/AdSlot";
import CalculatorWidget from "@/components/CalculatorWidget";
import LeadForm from "@/components/LeadForm";
import { type Calculator, getRelatedCalculators } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import Link from "next/link";

export default function CalculatorPage({ calculator }: { calculator: Calculator }) {
  const related = getRelatedCalculators(calculator);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculator.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: publicCopy(calculator.title),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, softwareSchema]) }} />
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
          Tutti i calcolatori
        </Link>

        <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">{publicCopy(calculator.category)}</p>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-950 md:text-6xl">{publicCopy(calculator.title)}</h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">{publicCopy(calculator.intro)}</p>
        </section>

        <CalculatorWidget calculator={calculator} />

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT} />

        <section className="mt-8 rounded-3xl bg-gray-950 p-6 text-white shadow-sm md:p-8">
          <h2 className="text-2xl font-black">Newsletter Calcolich</h2>
          <p className="mt-2 max-w-2xl text-gray-200">{publicCopy(calculator.cta)}</p>
          <LeadForm source={`newsletter:${calculator.slug}`} buttonLabel="Avvisami" dark />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-3xl font-black tracking-tight text-gray-950">{publicCopy(calculator.title)}: guida pratica</h2>
            <div className="space-y-5 text-lg leading-8 text-gray-700">
              {calculator.article.map((paragraph) => (
                <p key={paragraph}>{publicCopy(paragraph)}</p>
              ))}
            </div>

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT} label="Risorsa consigliata" />

            <h2 className="mt-10 text-3xl font-black tracking-tight text-gray-950">FAQ</h2>
            <div className="mt-5 space-y-4">
              {calculator.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-gray-950">{publicCopy(faq.question)}</summary>
                  <p className="mt-3 text-gray-700">{publicCopy(faq.answer)}</p>
                </details>
              ))}
            </div>
          </article>

          <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-black">Strumenti collegati</h2>
            <div className="space-y-3">
              {related.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="block rounded-2xl border border-gray-200 p-4 font-bold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {publicCopy(tool.shortTitle)}
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
