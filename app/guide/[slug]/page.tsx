import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";

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
      canonical: `https://calcolich.ch/guide/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: "Calcolich",
    },
    publisher: {
      "@type": "Organization",
      name: "Calcolich",
    },
    mainEntityOfPage: `https://calcolich.ch/guide/${guide.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Calcolich",
        item: "https://calcolich.ch",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guide",
        item: "https://calcolich.ch/guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `https://calcolich.ch/guide/${guide.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }} />
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
          <p className="mt-5 text-lg leading-8 text-gray-700">{guide.description}</p>
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
                <Link key={link.href} href={link.href} className="rounded-full bg-white px-4 py-2 text-sm font-black text-gray-950 hover:bg-emerald-100">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
