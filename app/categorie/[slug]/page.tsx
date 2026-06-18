import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { calculatorCategories, getCategory, getCategoryCalculators } from "@/lib/categories";
import { publicCopy } from "@/lib/copy";
import { getGuidesByCategory } from "@/lib/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return calculatorCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `https://calcolich.ch/categorie/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const tools = getCategoryCalculators(category);
  const relatedGuides = getGuidesByCategory(`/categorie/${category.slug}`);

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
          Tutti i calcolatori
        </Link>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">Categoria Calcolich</p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{category.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">{category.description}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">
                  {publicCopy(tool.category)}
                </p>
                <h2 className="mb-3 text-2xl font-black tracking-tight group-hover:text-emerald-800">
                  {publicCopy(tool.title)}
                </h2>
                <p className="leading-7 text-gray-600">{publicCopy(tool.intro)}</p>
              </Link>
            ))}
          </div>

          <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:self-start">
            <h2 className="text-xl font-black">Come usare questa categoria</h2>
            <div className="mt-4 space-y-4 leading-7 text-gray-700">
              {category.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-gray-950 p-4 text-sm font-semibold leading-6 text-white">
              {tools.length} strumenti disponibili in questa categoria.
            </div>
            {relatedGuides.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-xl font-black">Guide collegate</h2>
                <div className="mt-3 space-y-3">
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guide/${guide.slug}`}
                      className="block rounded-2xl border border-gray-200 p-4 font-bold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      {guide.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
