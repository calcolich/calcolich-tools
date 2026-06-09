import { calculators } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-gray-950">
      <section className="border-b border-gray-200 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="text-xl font-black tracking-tight">Calcolich</Link>
          <nav className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Link href="/servizi-ai-seo" className="rounded-full px-3 py-2 hover:bg-gray-100">Servizi</Link>
            <Link href="/piano-cashflow-online" className="rounded-full px-3 py-2 hover:bg-gray-100">Cashflow</Link>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <section className="mb-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
              Strumenti semplici per decidere meglio
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Calcoli veloci per lavoro, soldi e trading
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              Calcolatori gratuiti, guide pratiche e strumenti leggeri per trasformare dubbi in numeri chiari.
              Prima risposte utili, poi traffico, lead e crescita.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/servizi-ai-seo" className="rounded-full bg-gray-950 px-6 py-3 font-bold text-white transition hover:bg-gray-800">
                Richiedi un sito che porta lead
              </Link>
              <Link href="#calcolatori" className="rounded-full border border-gray-300 bg-white px-6 py-3 font-bold text-gray-950 transition hover:border-gray-500">
                Esplora i calcolatori
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-500">Focus operativo</p>
            <div className="mt-5 space-y-4">
              {["Calcoli utili", "Guide SEO", "Lead online"].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lime-100 font-black text-lime-900">
                    {index + 1}
                  </span>
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <div id="calcolatori" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((tool) => (
            <Link
              key={tool.title}
              href={`/${tool.slug}`}
              className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
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
      </div>
    </main>
  );
}
