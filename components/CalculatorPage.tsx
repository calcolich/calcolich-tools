import CalculatorWidget from "@/components/CalculatorWidget";
import { type Calculator, getRelatedCalculators } from "@/lib/calculators";
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
    name: calculator.title,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
  };

  return (
    <main className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, softwareSchema]) }} />
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-sm font-semibold text-gray-600 hover:text-black">
          Tutti i calcolatori
        </Link>

        <section className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{calculator.category}</p>
          <h1 className="mb-4 text-4xl font-bold text-gray-950 md:text-5xl">{calculator.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">{calculator.intro}</p>
        </section>

        <CalculatorWidget calculator={calculator} />

        <section className="mt-8 rounded-2xl bg-black p-6 text-white shadow">
          <h2 className="text-2xl font-bold">Newsletter Calcolich</h2>
          <p className="mt-2 max-w-2xl text-gray-200">{calculator.cta}</p>
          <form className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="email"
              placeholder="La tua email"
              className="rounded-xl border border-white/20 bg-white p-4 text-black"
            />
            <button className="rounded-xl bg-green-400 px-6 py-4 font-bold text-black" type="button">
              Avvisami
            </button>
          </form>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-3xl font-bold text-gray-950">{calculator.title}: guida pratica</h2>
            <div className="space-y-5 text-lg leading-8 text-gray-700">
              {calculator.article.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-bold text-gray-950">FAQ</h2>
            <div className="mt-5 space-y-4">
              {calculator.faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-gray-950">{faq.question}</summary>
                  <p className="mt-3 text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">Strumenti collegati</h2>
            <div className="space-y-3">
              {related.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="block rounded-xl border border-gray-200 p-4 font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-50"
                >
                  {tool.shortTitle}
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
