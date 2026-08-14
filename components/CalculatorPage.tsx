import AdSlot from "@/components/AdSlot";
import CalculatorActions from "@/components/CalculatorActions";
import CalculatorWidget from "@/components/CalculatorWidget";
import ConsultationCta from "@/components/ConsultationCta";
import LeadCaptureBox from "@/components/LeadCaptureBox";
import LeadForm from "@/components/LeadForm";
import RevenueCta from "@/components/RevenueCta";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import TrackedInternalLink from "@/components/TrackedInternalLink";
import { type Calculator, getRelatedCalculators } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import { hasTranslatedLocaleSlug, localizedAlternates, localizedHref, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-metadata";
import Link from "next/link";

type CalculatorPageLabels = {
  back: string;
  newsletterTitle: string;
  newsletterButton: string;
  guideSuffix: string;
  guideLinksTitle: string;
  recommendedAd: string;
  relatedTitle: string;
};

const defaultLabels: CalculatorPageLabels = {
  back: "Tutti i calcolatori",
  newsletterTitle: "Newsletter Calcolich",
  newsletterButton: "Avvisami",
  guideSuffix: "guida pratica",
  guideLinksTitle: "Guide collegate",
  recommendedAd: "Risorsa consigliata",
  relatedTitle: "Strumenti collegati",
};

type CalculatorPageProps = {
  calculator: Calculator;
  backHref?: string;
  labels?: Partial<CalculatorPageLabels>;
  relatedCalculators?: Calculator[];
  calculatorHref?: (calculator: Calculator) => string;
  locale?: Locale;
};

export default function CalculatorPage({
  calculator,
  backHref = "/",
  labels,
  relatedCalculators,
  calculatorHref = (tool) => localizedHref("it", tool),
  locale = "it",
}: CalculatorPageProps) {
  const ui = { ...defaultLabels, ...labels };
  const related = relatedCalculators ?? getRelatedCalculators(calculator);
  const isThirdPillar =
    calculator.slug === "calcolo-terzo-pilastro-risparmio-fiscale" ||
    calculator.slug.includes("terzo-pilastro") ||
    calculator.slug.includes("pillar-3a") ||
    calculator.slug.includes("saeule-3a") ||
    calculator.slug.includes("troisieme-pilier");
  const leadSegment = isThirdPillar ? "pension_tax_ch" : calculator.category;
  const leadInterest = isThirdPillar ? "Pensione & tasse" : calculator.category;
  const leadMagnet = isThirdPillar ? "Ricevi il riepilogo 3a e la checklist fiscale" : ui.newsletterTitle;
  const languageLinks = calculator.isPriority && locale === "de" && !hasTranslatedLocaleSlug(locale, calculator.slug)
    ? [["de", `${siteUrl}/de/${calculator.slug}`]]
    : backHref === "/"
    ? []
    : Object.entries(localizedAlternates(locale, calculator.slug).languages)
        .filter(([language]) => language !== "x-default");
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
    "@type": calculator.schemaType ?? ["WebApplication", "SoftwareApplication"],
    name: publicCopy(calculator.title),
    applicationCategory: getApplicationCategory(calculator.category),
    operatingSystem: "Web",
    inLanguage: locale,
    url: `${siteUrl}${backHref === "/" ? "" : backHref}/${calculator.slug}`,
    dateModified: calculator.updatedAt,
    author: {
      "@type": "Organization",
      name: "Calcolich",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Calcolich",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CHF",
    },
  };
  const currentUrl = `${siteUrl}${backHref === "/" ? "" : backHref}/${calculator.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Calcolich", item: siteUrl },
      { "@type": "ListItem", position: 2, name: ui.back, item: `${siteUrl}${backHref}` },
      { "@type": "ListItem", position: 3, name: publicCopy(calculator.title), item: currentUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema,
            softwareSchema,
            ...(calculator.faqs.length > 0 ? [faqSchema] : []),
          ]),
        }}
      />
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href={backHref} className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
            {ui.back}
          </Link>
          {languageLinks.length > 0 ? (
            <nav className="flex items-center gap-1 text-xs font-black uppercase text-gray-600" aria-label="Language versions">
              {languageLinks.map(([language, href]) => (
                <TrackedInternalLink
                  key={language}
                  href={new URL(href).pathname}
                  hrefLang={language}
                  event="language_change"
                  source={calculator.slug}
                  target={language}
                  className={`rounded-full px-3 py-2 ${language === locale ? "bg-gray-950 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                  {language}
                </TrackedInternalLink>
              ))}
            </nav>
          ) : null}
        </div>

        <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">{publicCopy(calculator.category)}</p>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-950 md:text-6xl">{publicCopy(calculator.h1 ?? calculator.title)}</h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">{publicCopy(calculator.intro)}</p>
        </section>

        <CalculatorWidget calculator={calculator} />

        {calculator.isPriority ? <ConsultationCta calculator={calculator} locale={locale} /> : null}

        {calculator.isPriority ? <CalculatorActions calculatorId={calculator.id ?? calculator.slug} /> : null}

        {backHref === "/" ? <RevenueCta calculator={calculator} /> : null}

        {calculator.isPriority ? (
          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Passende Angebote</p>
            <p className="mt-2 font-bold text-gray-950">Vergleichsangebote und Partnerressourcen werden hier ergänzt, sobald sie redaktionell geprüft sind.</p>
          </aside>
        ) : null}

        <section className="mt-8 rounded-3xl bg-gray-950 p-6 text-white shadow-sm md:p-8">
          <h2 className="text-2xl font-black">{isThirdPillar ? leadMagnet : ui.newsletterTitle}</h2>
          <p className="mt-2 max-w-2xl text-gray-200">
            {isThirdPillar
              ? "Ti mando il riepilogo del calcolo, una checklist pratica per valutare il pilastro 3a e promemoria utili sulle scadenze fiscali svizzere."
              : publicCopy(calculator.cta)}
          </p>
          <LeadForm
            source={isThirdPillar ? `leadmagnet:${calculator.slug}` : `newsletter:${calculator.slug}`}
            segment={leadSegment}
            interest={leadInterest}
            leadMagnet={leadMagnet}
            buttonLabel={isThirdPillar ? "Mandami riepilogo e checklist" : ui.newsletterButton}
            dark
          />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-3xl font-black tracking-tight text-gray-950">{publicCopy(calculator.title)}: {ui.guideSuffix}</h2>
            <div className="space-y-5 text-lg leading-8 text-gray-700">
              {(calculator.formula && calculator.example && calculator.contentSections ? [] : calculator.article).map((paragraph) => (
                <p key={paragraph}>{publicCopy(paragraph)}</p>
              ))}
            </div>

            {calculator.contentSections?.map((section) => (
              <section key={section.heading} className="mt-8">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">{section.heading}</h2>
                <div className="mt-3 space-y-4 text-lg leading-8 text-gray-700">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets?.length ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}

            {calculator.formula ? (
              <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">Formel</h2>
                <p className="mt-3 text-lg leading-8 text-gray-700">{calculator.formula}</p>
              </section>
            ) : null}

            {calculator.example ? (
              <section className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">Praktisches Beispiel</h2>
                <p className="mt-3 text-lg leading-8 text-gray-700">{calculator.example}</p>
              </section>
            ) : null}

            <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-2xl font-black tracking-tight text-gray-950">Hinweis zur Nutzung</h2>
              <p className="mt-3 text-lg leading-8 text-gray-700">
                Die Ergebnisse sind indikative Berechnungen auf Basis deiner Eingaben. Sie ersetzen keine verbindliche Lohnabrechnung, Rechtsberatung oder Auskunft einer offiziellen Stelle.
              </p>
            </section>

            {calculator.contentSections && calculator.article.slice(2).length > 0 ? (
              <section className="mt-8">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">Wichtige Hinweise</h2>
                <div className="mt-3 space-y-4 text-lg leading-8 text-gray-700">
                  {calculator.article.slice(2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ) : null}

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT} label={ui.recommendedAd} />

            {calculator.guideLinks ? (
              <section className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">{ui.guideLinksTitle}</h2>
                <div className="mt-4 grid gap-3">
                  {calculator.guideLinks.map((guide) => (
                    <TrackedInternalLink
                      key={guide.href}
                      href={guide.href}
                      event="guide_click"
                      source={calculator.slug}
                      className="block rounded-2xl border border-emerald-100 bg-white p-4 transition hover:border-emerald-300"
                    >
                      <span className="font-black text-emerald-800">{guide.label}</span>
                      <span className="mt-1 block text-base leading-7 text-gray-700">{guide.description}</span>
                    </TrackedInternalLink>
                  ))}
                </div>
              </section>
            ) : null}

            {calculator.faqs.length > 0 ? (
              <>
                <h2 className="mt-10 text-3xl font-black tracking-tight text-gray-950">FAQ</h2>
                <div className="mt-5 space-y-4">
                  {calculator.faqs.map((faq) => (
                    <details key={faq.question} className="rounded-2xl border border-gray-200 p-4">
                      <summary className="cursor-pointer font-bold text-gray-950">{publicCopy(faq.question)}</summary>
                      <p className="mt-3 text-gray-700">{publicCopy(faq.answer)}</p>
                    </details>
                  ))}
                </div>
              </>
            ) : null}

            {calculator.sources?.length || calculator.updatedAt ? (
              <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">Quellen und Aktualisierung</h2>
                {calculator.updatedAt ? (
                  <p className="mt-3 text-base font-semibold text-gray-700">Zuletzt aktualisiert: {calculator.updatedAt}</p>
                ) : null}
                {calculator.sources?.length ? (
                  <div className="mt-4 space-y-2">
                {calculator.sources.map((source) => (
                      <TrackedExternalLink
                        key={source.href}
                        href={source.href}
                        event="official_source_clicked"
                        source={calculator.slug}
                        target={source.href}
                        className="block font-semibold text-emerald-800 hover:text-emerald-950"
                      >
                        {source.label}
                      </TrackedExternalLink>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}
          </article>

          <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-black">{ui.relatedTitle}</h2>
            <div className="space-y-3">
              {related.map((tool) => (
                <TrackedInternalLink
                  key={tool.slug}
                  href={calculatorHref(tool)}
                  event="related_calculator_clicked"
                  source={calculator.slug}
                  target={tool.slug}
                  className="block rounded-2xl border border-gray-200 p-4 font-bold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {publicCopy(tool.shortTitle)}
                </TrackedInternalLink>
              ))}
            </div>
            <div className="mt-6">
              <LeadCaptureBox
                title={isThirdPillar ? "Tieniti il calcolo e i prossimi passi" : "Ricevi nuovi strumenti utili"}
                text={isThirdPillar ? "Lascia l'email per ricevere promemoria e contenuti collegati al tuo calcolo." : publicCopy(calculator.cta)}
                source={isThirdPillar ? `sidebar:${calculator.slug}` : `sidebar-newsletter:${calculator.slug}`}
                segment={leadSegment}
                interest={leadInterest}
                leadMagnet={leadMagnet}
                buttonLabel="Ricevi aggiornamenti"
                compact
              />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function getApplicationCategory(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("business")) return "BusinessApplication";
  if (normalized.includes("finanza") || normalized.includes("finance") || normalized.includes("trading")) {
    return "FinanceApplication";
  }
  return "UtilitiesApplication";
}
