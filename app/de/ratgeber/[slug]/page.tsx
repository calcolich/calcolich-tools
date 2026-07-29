import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationCta from "@/components/ConsultationCta";
import {
  germanLongTailArticles,
  getGermanLongTailArticle,
  getRelatedGermanLongTailArticles,
} from "@/content/de/ratgeber";
import GuideViewTracker from "@/components/GuideViewTracker";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import TrackedInternalLink from "@/components/TrackedInternalLink";
import { siteUrl } from "@/lib/site-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return germanLongTailArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getGermanLongTailArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `${siteUrl}/de/ratgeber/${article.slug}`,
      languages: article.alternates,
    },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${siteUrl}/de/ratgeber/${article.slug}`,
      siteName: "Calcolich",
      locale: "de_CH",
    },
  };
}

export default async function GermanGuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getGermanLongTailArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedGermanLongTailArticles(article);
  const articleUrl = `${siteUrl}/de/ratgeber/${article.slug}`;
  const consultationCalculator =
    article.slug === "quellensteuer-schweiz-2026"
      ? ({
          slug: "quellensteuer-rechner-schweiz",
        } as const)
      : null;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    inLanguage: "de-CH",
    author: {
      "@type": "Organization",
      name: "Calcolich",
    },
    publisher: {
      "@type": "Organization",
      name: "Calcolich",
    },
    dateModified: article.updatedAt,
    mainEntityOfPage: articleUrl,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Calcolich",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ratgeber",
        item: `${siteUrl}/de/ratgeber`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <GuideViewTracker slug={article.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/de/ratgeber" className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
            Alle Ratgeber
          </Link>
          <Link href="/de" className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
            Alle Rechner
          </Link>
        </div>

        <header className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">Ratgeber Schweiz</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">{article.title}</h1>
          <div className="mt-5 space-y-4 text-lg leading-8 text-gray-700">
            <p className="text-base font-semibold text-gray-600">
              Redaktion: Calcolich · {article.updatedAt ? `Zuletzt aktualisiert: ${article.updatedAt}` : "Regelmässig redaktionell geprüft"}
            </p>
            {article.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-9">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl font-black tracking-tight">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-lg leading-8 text-gray-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 space-y-2 rounded-2xl bg-emerald-50 p-5 text-base font-semibold leading-7 text-emerald-950">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl bg-gray-950 p-5 text-white">
            <h2 className="text-2xl font-black">Passende Rechner</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {article.internalLinks.map((link) => (
                <TrackedInternalLink
                  key={link.href}
                  href={link.href}
                  event="related_calculator_clicked"
                  source={article.slug}
                  target={link.href}
                  className="rounded-full bg-white px-4 py-2 text-sm font-black text-gray-950 hover:bg-emerald-100"
                >
                  {link.label}
                </TrackedInternalLink>
              ))}
            </div>
          </section>

          {consultationCalculator ? (
            <div className="mt-10">
              <ConsultationCta calculator={consultationCalculator as never} locale="de" />
            </div>
          ) : null}

          <section className="mt-10">
            <h2 className="text-3xl font-black tracking-tight">Häufige Fragen</h2>
            <div className="mt-4 space-y-4">
              {article.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-gray-200 p-5">
                  <h3 className="text-lg font-black">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-5">
              <h2 className="text-xl font-black">Quellen</h2>
              <div className="mt-3 space-y-2">
                {article.sources.map((source) => (
                  <TrackedExternalLink
                    key={source.href}
                    href={source.href}
                    event="official_source_clicked"
                    source={article.slug}
                    target={source.href}
                    className="block font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    {source.label}
                  </TrackedExternalLink>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-5">
              <h2 className="text-xl font-black">Weitere Ratgeber</h2>
              <div className="mt-3 space-y-2">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/de/ratgeber/${related.slug}`} className="block font-semibold text-emerald-800 hover:text-emerald-950">
                    {related.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
