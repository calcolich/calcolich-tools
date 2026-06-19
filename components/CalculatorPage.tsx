import AdSlot from "@/components/AdSlot";
import CalculatorWidget from "@/components/CalculatorWidget";
import LeadForm from "@/components/LeadForm";
import RevenueCta from "@/components/RevenueCta";
import { type Calculator, getRelatedCalculators } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import Link from "next/link";

type CalculatorPageLabels = {
  back: string;
  newsletterTitle: string;
  newsletterButton: string;
  guideSuffix: string;
  recommendedAd: string;
  relatedTitle: string;
};

const defaultLabels: CalculatorPageLabels = {
  back: "Tutti i calcolatori",
  newsletterTitle: "Newsletter Calcolich",
  newsletterButton: "Avvisami",
  guideSuffix: "guida pratica",
  recommendedAd: "Risorsa consigliata",
  relatedTitle: "Strumenti collegati",
};

type CalculatorPageProps = {
  calculator: Calculator;
  backHref?: string;
  labels?: Partial<CalculatorPageLabels>;
  relatedCalculators?: Calculator[];
  calculatorHref?: (calculator: Calculator) => string;
};

export default function CalculatorPage({
  calculator,
  backHref = "/",
  labels,
  relatedCalculators,
  calculatorHref = (tool) => `/${tool.slug}`,
}: CalculatorPageProps) {
  const ui = { ...defaultLabels, ...labels };
  const related = relatedCalculators ?? getRelatedCalculators(calculator);
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
      priceCurrency: "CHF",
    },
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, softwareSchema]) }} />
      <div className="mx-auto max-w-5xl">
        <Link href={backHref} className="mb-8 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
          {ui.back}
        </Link>

        <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">{publicCopy(calculator.category)}</p>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-950 md:text-6xl">{publicCopy(calculator.title)}</h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">{publicCopy(calculator.intro)}</p>
        </section>

        <CalculatorWidget calculator={calculator} />

        {backHref === "/" ? <RevenueCta calculator={calculator} /> : null}

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_CALCULATOR_SLOT} />

        <section className="mt-8 rounded-3xl bg-gray-950 p-6 text-white shadow-sm md:p-8">
          <h2 className="text-2xl font-black">{ui.newsletterTitle}</h2>
          <p className="mt-2 max-w-2xl text-gray-200">{publicCopy(calculator.cta)}</p>
          <LeadForm source={`newsletter:${calculator.slug}`} buttonLabel={ui.newsletterButton} dark />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-3xl font-black tracking-tight text-gray-950">{publicCopy(calculator.title)}: {ui.guideSuffix}</h2>
            <div className="space-y-5 text-lg leading-8 text-gray-700">
              {calculator.article.map((paragraph) => (
                <p key={paragraph}>{publicCopy(paragraph)}</p>
              ))}
            </div>

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT} label={ui.recommendedAd} />

            {calculator.guideLinks ? (
              <section className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">Guide collegate</h2>
                <div className="mt-4 grid gap-3">
                  {calculator.guideLinks.map((guide) => (
                    <Link key={guide.href} href={guide.href} className="block rounded-2xl border border-emerald-100 bg-white p-4 transition hover:border-emerald-300">
                      <span className="font-black text-emerald-800">{guide.label}</span>
                      <span className="mt-1 block text-base leading-7 text-gray-700">{guide.description}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

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
            <h2 className="mb-4 text-xl font-black">{ui.relatedTitle}</h2>
            <div className="space-y-3">
              {related.map((tool) => (
                <Link
                  key={tool.slug}
                  href={calculatorHref(tool)}
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
