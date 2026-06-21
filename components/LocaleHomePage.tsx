import { getLocalizedCalculators, localeHome, type Locale } from "@/lib/i18n";
import { germanCalculatorCategories } from "@/lib/german-calculators";
import Link from "next/link";

export default function LocaleHomePage({ locale }: { locale: Locale }) {
  const copy = localeHome[locale];
  const calculators = getLocalizedCalculators(locale);

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-gray-950">
      <section className="border-b border-gray-200 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href={`/${locale}`} className="text-xl font-black tracking-tight">
            Calcolich
          </Link>
          <nav className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Link href="/de" className="rounded-full px-3 py-2 hover:bg-gray-100">DE</Link>
            <Link href="/it" className="rounded-full px-3 py-2 hover:bg-gray-100">IT</Link>
            <Link href="/en" className="rounded-full px-3 py-2 hover:bg-gray-100">EN</Link>
            <Link href="/fr" className="rounded-full px-3 py-2 hover:bg-gray-100">FR</Link>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <section className="mb-10">
          <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
            {copy.intro}
          </p>
        </section>

        {locale === "de" ? (
          <section className="mb-10" aria-labelledby="calculator-categories">
            <h2 id="calculator-categories" className="mb-4 text-2xl font-black tracking-tight">Rechner nach Kategorie</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {germanCalculatorCategories.map((category) => (
                <div key={category.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <h3 className="font-black text-gray-950">{category.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${locale}/${tool.slug}`}
              className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
            >
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">
                {tool.category}
              </p>
              <h2 className="mb-3 text-2xl font-black tracking-tight group-hover:text-emerald-800">
                {tool.title}
              </h2>
              <p className="leading-7 text-gray-600">{tool.intro}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
