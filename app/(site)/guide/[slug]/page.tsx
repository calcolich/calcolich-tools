import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationCta from "@/components/ConsultationCta";
import GuideViewTracker from "@/components/GuideViewTracker";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import TrackedInternalLink from "@/components/TrackedInternalLink";
import { getGuide, guides } from "@/lib/guides";
import { siteUrl } from "@/lib/site-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `${siteUrl}/guide/${guide.slug}`,
      languages: guide.alternates,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const guideUrl = `${siteUrl}/guide/${guide.slug}`;
  const consultationCalculator =
    guide.slug === "imposta-alla-fonte-svizzera"
      ? ({
          slug: "calcolatore-imposta-alla-fonte-svizzera",
        } as const)
      : null;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: "Calcolich",
    },
    publisher: {
      "@type": "Organization",
      name: "Calcolich",
    },
    mainEntityOfPage: guideUrl,
  };
  const faqSchema = guide.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;
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
        name: "Guide",
        item: `${siteUrl}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: guideUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <GuideViewTracker slug={guide.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, ...(faqSchema ? [faqSchema] : []), breadcrumbSchema]).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/guide" className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
            Tutte le guide
          </Link>
          <Link href={guide.categoryHref} className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
            {guide.categoryLabel}
          </Link>
        </div>

        <header className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">Guida Calcolich</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">{guide.title}</h1>
          <div className="mt-5 space-y-4 text-lg leading-8 text-gray-700">
            {guide.updatedAt ? <p className="text-base font-semibold text-gray-600">Aggiornata: {guide.updatedAt}</p> : null}
            <p>{guide.description}</p>
          </div>
        </header>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-9">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl font-black tracking-tight">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-lg leading-8 text-gray-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl bg-gray-950 p-5 text-white">
            <h2 className="text-2xl font-black">Calcolatori collegati</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {guide.calculatorLinks.map((link) => (
                <TrackedInternalLink
                  key={link.href}
                  href={link.href}
                  event="related_calculator_clicked"
                  source={guide.slug}
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
              <ConsultationCta calculator={consultationCalculator as never} locale="it" />
            </div>
          ) : null}

          {guide.internalLinks?.length ? (
            <section className="mt-10">
              <h2 className="text-3xl font-black tracking-tight">Link utili</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {guide.internalLinks.map((link) => (
                  <TrackedInternalLink
                    key={link.href}
                    href={link.href}
                    event="related_calculator_clicked"
                    source={guide.slug}
                    target={link.href}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-950 hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    {link.label}
                  </TrackedInternalLink>
                ))}
              </div>
            </section>
          ) : null}

          {guide.faqs?.length ? (
            <section className="mt-10">
              <h2 className="text-3xl font-black tracking-tight">Domande frequenti</h2>
              <div className="mt-4 space-y-4">
                {guide.faqs.map((faq) => (
                  <details key={faq.question} className="rounded-2xl border border-gray-200 p-5">
                    <summary className="cursor-pointer font-black text-gray-950">{faq.question}</summary>
                    <p className="mt-3 leading-7 text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {guide.sources?.length ? (
            <section className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-5">
                <h2 className="text-xl font-black">Quellen</h2>
                <div className="mt-3 space-y-2">
                  {guide.sources.map((source) => (
                    <TrackedExternalLink
                      key={source.href}
                      href={source.href}
                      event="official_source_clicked"
                      source={guide.slug}
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
                  {guide.internalLinks?.slice(0, 3).map((link) => (
                    <TrackedInternalLink
                      key={link.href}
                      href={link.href}
                      event="related_calculator_clicked"
                      source={guide.slug}
                      target={link.href}
                      className="block font-semibold text-emerald-800 hover:text-emerald-950"
                    >
                      {link.label}
                    </TrackedInternalLink>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
