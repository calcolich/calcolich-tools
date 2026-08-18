import AdSlot from "@/components/AdSlot";
import CalculatorActions from "@/components/CalculatorActions";
import FunnelViewTracker from "@/components/FunnelViewTracker";
import CalculatorWidget from "@/components/CalculatorWidget";
import ConsultationCta from "@/components/ConsultationCta";
import LeadCaptureBox from "@/components/LeadCaptureBox";
import LeadForm from "@/components/LeadForm";
import RevenueCta from "@/components/RevenueCta";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import TrackedInternalLink from "@/components/TrackedInternalLink";
import { type Calculator, getRelatedCalculators } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import { hasTranslatedLocaleSlug, localeHome, localizedAlternates, localizedHref, type Locale } from "@/lib/i18n";
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
  formulaTitle: string;
  exampleTitle: string;
  usageTitle: string;
  usageText: string;
  importantNotesTitle: string;
  sourcesTitle: string;
  updatedAtPrefix: string;
  partnerEyebrow: string;
  partnerReservedText: string;
  sidebarNewsletterTitle: string;
  sidebarNewsletterButton: string;
};

const defaultLabels: CalculatorPageLabels = {
  back: "Tutti i calcolatori",
  newsletterTitle: "Newsletter Calcolich",
  newsletterButton: "Avvisami",
  guideSuffix: "guida pratica",
  guideLinksTitle: "Guide collegate",
  recommendedAd: "Risorsa consigliata",
  relatedTitle: "Strumenti collegati",
  formulaTitle: "Formula",
  exampleTitle: "Esempio pratico",
  usageTitle: "Nota d'uso",
  usageText:
    "I risultati sono calcoli indicativi basati sui valori inseriti. Non sostituiscono una busta paga vincolante, una consulenza legale o una risposta ufficiale.",
  importantNotesTitle: "Note importanti",
  sourcesTitle: "Fonti e aggiornamento",
  updatedAtPrefix: "Ultimo aggiornamento",
  partnerEyebrow: "Offerte pertinenti",
  partnerReservedText:
    "Confronti e risorse partner saranno aggiunti qui solo dopo verifica editoriale e configurazione di link reali.",
  sidebarNewsletterTitle: "Ricevi nuovi strumenti utili",
  sidebarNewsletterButton: "Ricevi aggiornamenti",
};

type FunnelLeadCopy = {
  segment: string;
  leadMagnet: string;
  intro: string;
  button: string;
  sidebarTitle: string;
  sidebarText: string;
  sidebarButton: string;
  interest: string;
};

const thirdPillarLeadCopy: Record<Locale, FunnelLeadCopy> = {
  de: {
    segment: "pension_tax_ch",
    leadMagnet: "3a-Zusammenfassung und Steuer-Checkliste erhalten",
    intro: "Wir senden dir die Zusammenfassung der Berechnung, eine praktische Checkliste fuer die Saeule 3a und Erinnerungen zu wichtigen Schweizer Steuerfristen.",
    button: "Zusammenfassung und Checkliste senden",
    sidebarTitle: "Berechnung und naechste Schritte sichern",
    sidebarText: "Hinterlasse deine E-Mail, um Erinnerungen und Inhalte passend zu deiner Berechnung zu erhalten.",
    sidebarButton: "Updates erhalten",
    interest: "Vorsorge & Steuern",
  },
  it: {
    segment: "pension_tax_ch",
    leadMagnet: "Ricevi il riepilogo 3a e la checklist fiscale",
    intro: "Ti mando il riepilogo del calcolo, una checklist pratica per valutare il pilastro 3a e promemoria utili sulle scadenze fiscali svizzere.",
    button: "Mandami riepilogo e checklist",
    sidebarTitle: "Tieniti il calcolo e i prossimi passi",
    sidebarText: "Lascia l'email per ricevere promemoria e contenuti collegati al tuo calcolo.",
    sidebarButton: "Ricevi aggiornamenti",
    interest: "Pensione & tasse",
  },
  en: {
    segment: "pension_tax_ch",
    leadMagnet: "Get the 3a summary and tax checklist",
    intro: "We will send your calculation summary, a practical checklist for reviewing pillar 3a options, and useful reminders for Swiss tax deadlines.",
    button: "Send summary and checklist",
    sidebarTitle: "Keep the calculation and next steps",
    sidebarText: "Leave your email to receive reminders and content linked to your calculation.",
    sidebarButton: "Get updates",
    interest: "Pension & tax",
  },
  fr: {
    segment: "pension_tax_ch",
    leadMagnet: "Recevoir le resume 3a et la checklist fiscale",
    intro: "Nous vous envoyons le resume du calcul, une checklist pratique pour evaluer le pilier 3a et des rappels utiles sur les echeances fiscales suisses.",
    button: "Envoyer le resume et la checklist",
    sidebarTitle: "Garder le calcul et les prochaines etapes",
    sidebarText: "Laissez votre e-mail pour recevoir des rappels et des contenus lies a votre calcul.",
    sidebarButton: "Recevoir les mises a jour",
    interest: "Prevoyance & impots",
  },
};

const highIntentLeadCopy = {
  tax: {
    de: {
      segment: "tax_salary_ch",
      leadMagnet: "Quellensteuer-Checkliste erhalten",
      intro: "Erhalte eine kurze Checkliste, welche Angaben du vor einer offiziellen Quellensteuer-Pruefung bereithalten solltest.",
      button: "Checkliste senden",
      sidebarTitle: "Quellensteuer spaeter sauber pruefen",
      sidebarText: "Lass dir eine Erinnerung und passende Lohn-/Steuerinhalte schicken.",
      sidebarButton: "Checkliste erhalten",
      interest: "Lohn & Quellensteuer",
    },
    it: {
      segment: "tax_salary_ch",
      leadMagnet: "Ricevi la checklist imposta alla fonte",
      intro: "Ti mando una checklist pratica con i dati da preparare prima di verificare una busta paga o una tabella cantonale.",
      button: "Mandami la checklist",
      sidebarTitle: "Verifica meglio l'imposta alla fonte",
      sidebarText: "Lascia l'email per ricevere promemoria e contenuti collegati a salario, tasse e budget.",
      sidebarButton: "Ricevi la checklist",
      interest: "Salario & imposta alla fonte",
    },
    en: {
      segment: "tax_salary_ch",
      leadMagnet: "Get the withholding tax checklist",
      intro: "Receive a practical checklist of the data to prepare before checking a payslip or cantonal table.",
      button: "Send the checklist",
      sidebarTitle: "Review withholding tax later",
      sidebarText: "Leave your email to receive salary, tax and budget follow-ups.",
      sidebarButton: "Get the checklist",
      interest: "Salary & withholding tax",
    },
    fr: {
      segment: "tax_salary_ch",
      leadMagnet: "Recevoir la checklist impot a la source",
      intro: "Recevez une checklist pratique des donnees a preparer avant de verifier une fiche de salaire ou une table cantonale.",
      button: "Envoyer la checklist",
      sidebarTitle: "Revoir l'impot a la source plus tard",
      sidebarText: "Laissez votre e-mail pour recevoir des contenus lies au salaire, aux impots et au budget.",
      sidebarButton: "Recevoir la checklist",
      interest: "Salaire & impot a la source",
    },
  },
  mortgage: {
    de: {
      segment: "mortgage_ch",
      leadMagnet: "Hypotheken-Tragbarkeit als Checkliste sichern",
      intro: "Wir senden dir eine kompakte Vorbereitung fuer Bankgespraech, Eigenmittel und Budgetvergleich.",
      button: "Hypotheken-Checkliste senden",
      sidebarTitle: "Bankgespraech vorbereiten",
      sidebarText: "Erhalte passende Erinnerungen zu Tragbarkeit, Budget und Eigenmitteln.",
      sidebarButton: "Checkliste erhalten",
      interest: "Hypothek & Wohnen",
    },
    it: {
      segment: "mortgage_ch",
      leadMagnet: "Ricevi la checklist sostenibilita ipoteca",
      intro: "Ti mando una preparazione compatta per colloquio bancario, capitale proprio e confronto budget.",
      button: "Mandami la checklist ipoteca",
      sidebarTitle: "Prepara il colloquio in banca",
      sidebarText: "Ricevi promemoria utili su sostenibilita, budget e capitale proprio.",
      sidebarButton: "Ricevi la checklist",
      interest: "Ipoteca & casa",
    },
    en: {
      segment: "mortgage_ch",
      leadMagnet: "Get the mortgage affordability checklist",
      intro: "Receive a compact preparation for bank conversations, equity and budget comparison.",
      button: "Send the mortgage checklist",
      sidebarTitle: "Prepare the bank conversation",
      sidebarText: "Get useful follow-ups on affordability, budget and equity.",
      sidebarButton: "Get the checklist",
      interest: "Mortgage & housing",
    },
    fr: {
      segment: "mortgage_ch",
      leadMagnet: "Recevoir la checklist viabilite hypotheque",
      intro: "Recevez une preparation compacte pour l'entretien bancaire, les fonds propres et le budget.",
      button: "Envoyer la checklist hypotheque",
      sidebarTitle: "Preparer l'entretien bancaire",
      sidebarText: "Recevez des rappels utiles sur la viabilite, le budget et les fonds propres.",
      sidebarButton: "Recevoir la checklist",
      interest: "Hypotheque & logement",
    },
  },
} satisfies Record<"tax" | "mortgage", Record<Locale, FunnelLeadCopy>>;

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
  const ui = { ...defaultLabels, ...localeHome[locale], ...labels };
  const related = relatedCalculators ?? getRelatedCalculators(calculator);
  const highIntentFunnel = getHighIntentFunnel(locale, calculator.slug);
  const leadSegment = highIntentFunnel?.segment ?? calculator.category;
  const leadInterest = highIntentFunnel?.interest ?? calculator.category;
  const leadMagnet = highIntentFunnel?.leadMagnet ?? ui.newsletterTitle;
  const calculatorId = calculator.id ?? calculator.slug;
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
  const partnerOffers = getPartnerOffers(locale, calculator.slug);

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      {highIntentFunnel ? (
        <FunnelViewTracker
          calculatorId={calculator.id ?? calculator.slug}
          slug={calculator.slug}
          segment={highIntentFunnel.segment}
        />
      ) : null}
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

        {calculator.isPriority ? <CalculatorActions calculatorId={calculator.id ?? calculator.slug} locale={locale} /> : null}

        {backHref === "/" ? <RevenueCta calculator={calculator} /> : null}

        {calculator.isPriority ? (
          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">{ui.partnerEyebrow}</p>
            {partnerOffers.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {partnerOffers.map((offer) => (
                  <TrackedExternalLink
                    key={offer.partner}
                    href={offer.href}
                    event="partner_click"
                    source={calculator.slug}
                    target={offer.partner}
                    calculatorId={calculatorId}
                    className="rounded-xl bg-white px-4 py-3 text-sm font-black text-emerald-800 shadow-sm hover:text-emerald-950"
                  >
                    {offer.label}
                  </TrackedExternalLink>
                ))}
              </div>
            ) : (
              <p className="mt-2 font-bold text-gray-950">{ui.partnerReservedText}</p>
            )}
          </aside>
        ) : null}

        <section className="mt-8 rounded-3xl bg-gray-950 p-6 text-white shadow-sm md:p-8">
          <h2 className="text-2xl font-black">{highIntentFunnel ? leadMagnet : ui.newsletterTitle}</h2>
          <p className="mt-2 max-w-2xl text-gray-200">
            {highIntentFunnel
              ? highIntentFunnel.intro
              : publicCopy(calculator.cta)}
          </p>
          <LeadForm
            source={highIntentFunnel ? `leadmagnet:${calculator.slug}` : `newsletter:${calculator.slug}`}
            calculatorId={calculatorId}
            segment={leadSegment}
            interest={leadInterest}
            leadMagnet={leadMagnet}
            buttonLabel={highIntentFunnel ? highIntentFunnel.button : ui.newsletterButton}
            locale={locale}
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
                <h2 className="text-2xl font-black tracking-tight text-gray-950">{ui.formulaTitle}</h2>
                <p className="mt-3 text-lg leading-8 text-gray-700">{calculator.formula}</p>
              </section>
            ) : null}

            {calculator.example ? (
              <section className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">{ui.exampleTitle}</h2>
                <p className="mt-3 text-lg leading-8 text-gray-700">{calculator.example}</p>
              </section>
            ) : null}

            <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-2xl font-black tracking-tight text-gray-950">{ui.usageTitle}</h2>
              <p className="mt-3 text-lg leading-8 text-gray-700">
                {ui.usageText}
              </p>
            </section>

            {calculator.contentSections && calculator.article.slice(2).length > 0 ? (
              <section className="mt-8">
                <h2 className="text-2xl font-black tracking-tight text-gray-950">{ui.importantNotesTitle}</h2>
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
                <h2 className="text-2xl font-black tracking-tight text-gray-950">{ui.sourcesTitle}</h2>
                {calculator.updatedAt ? (
                  <p className="mt-3 text-base font-semibold text-gray-700">{ui.updatedAtPrefix}: {calculator.updatedAt}</p>
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
                title={highIntentFunnel ? highIntentFunnel.sidebarTitle : ui.sidebarNewsletterTitle}
                text={highIntentFunnel ? highIntentFunnel.sidebarText : publicCopy(calculator.cta)}
                source={highIntentFunnel ? `sidebar:${calculator.slug}` : `sidebar-newsletter:${calculator.slug}`}
                calculatorId={calculatorId}
                segment={leadSegment}
                interest={leadInterest}
                leadMagnet={leadMagnet}
                buttonLabel={highIntentFunnel ? highIntentFunnel.sidebarButton : ui.sidebarNewsletterButton}
                locale={locale}
                compact
              />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function getHighIntentFunnel(locale: Locale, slug: string) {
  if (slug.includes("quellensteuer") || slug.includes("imposta-alla-fonte") || slug.includes("withholding-tax")) {
    return highIntentLeadCopy.tax[locale];
  }
  if (slug.includes("hypotheken") || slug.includes("ipoteca") || slug.includes("hypotheque") || slug.includes("mortgage")) {
    return highIntentLeadCopy.mortgage[locale];
  }
  if (slug.includes("terzo-pilastro") || slug.includes("pillar-3a") || slug.includes("saeule-3a") || slug.includes("troisieme-pilier")) {
    return thirdPillarLeadCopy[locale];
  }
  return null;
}

function getPartnerOffers(locale: Locale, slug: string) {
  const isPillar3a =
    slug.includes("terzo-pilastro") ||
    slug.includes("pillar-3a") ||
    slug.includes("saeule-3a") ||
    slug.includes("troisieme-pilier");
  if (!isPillar3a) return [];

  const franklyHref = process.env.NEXT_PUBLIC_FRANKLY_AFFILIATE_URL;
  const yuhHref = process.env.NEXT_PUBLIC_YUH_AFFILIATE_URL;
  const labels = {
    de: { frankly: "frankly 3a prüfen", yuh: "Yuh 3a prüfen" },
    it: { frankly: "Valuta frankly 3a", yuh: "Valuta Yuh 3a" },
    en: { frankly: "Check frankly 3a", yuh: "Check Yuh 3a" },
    fr: { frankly: "Verifier frankly 3a", yuh: "Verifier Yuh 3a" },
  } satisfies Record<Locale, Record<"frankly" | "yuh", string>>;

  return [
    franklyHref ? { partner: "frankly", href: franklyHref, label: labels[locale].frankly } : null,
    yuhHref ? { partner: "yuh", href: yuhHref, label: labels[locale].yuh } : null,
  ].filter((offer): offer is { partner: string; href: string; label: string } => Boolean(offer));
}

function getApplicationCategory(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("business")) return "BusinessApplication";
  if (normalized.includes("finanza") || normalized.includes("finance") || normalized.includes("trading")) {
    return "FinanceApplication";
  }
  return "UtilitiesApplication";
}
