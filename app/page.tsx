import { calculators } from "@/lib/calculators";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-8 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-5xl font-bold">Calcolich</h1>

        <p className="mb-10 max-w-3xl text-lg leading-8 text-gray-700">
          Calcolatori gratuiti per Svizzera, lavoro, finanza e trading. Strumenti semplici,
          pagine SEO e risposte pratiche per decidere piu velocemente.
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/servizi-ai-seo" className="rounded-xl bg-black px-5 py-3 font-bold text-white">
            Servizi AI/SEO
          </Link>
          <Link href="/piano-cashflow-online" className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-950">
            Piano cashflow
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((tool) => (
            <Link
              key={tool.title}
              href={`/${tool.slug}`}
              className="bg-white p-6 rounded-2xl shadow transition hover:shadow-lg"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                {tool.category}
              </p>
              <h2 className="text-2xl font-semibold mb-2">{tool.title}</h2>

              <p className="text-gray-600">{tool.intro}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
