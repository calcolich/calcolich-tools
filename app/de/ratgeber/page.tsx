import type { Metadata } from "next";
import Link from "next/link";
import { germanLongTailArticles } from "@/content/de/ratgeber";
import { siteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Ratgeber Schweiz: Arbeit, Lohn, MWST und Ferien | Calcolich",
  description:
    "Deutsche Calcolich-Ratgeber mit praktischen Beispielen zu Arbeitszeit, Stundenlohn, Mehrwertsteuer und Ferienanspruch in der Schweiz.",
  alternates: {
    canonical: `${siteUrl}/de/ratgeber`,
  },
};

export default function GermanGuideIndexPage() {
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
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/de" className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
            Alle Rechner
          </Link>
        </div>

        <header className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">Ratgeber Calcolich</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Ratgeber für Schweizer Berechnungen</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
            Praktische Erklärungen zu Arbeitszeit, Lohn, Mehrwertsteuer und Ferienanspruch mit Beispielen und direkten Links zu den passenden Rechnern.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {germanLongTailArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/de/ratgeber/${article.slug}`}
              className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
            >
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">
                Schweiz Ratgeber
              </p>
              <h2 className="text-2xl font-black tracking-tight group-hover:text-emerald-800">{article.title}</h2>
              <p className="mt-3 leading-7 text-gray-600">{article.metaDescription}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
