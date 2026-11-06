import type { Metadata } from "next";
import { calculatorCategories, getCategoryCalculators } from "@/lib/categories";
import { calculators } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import { localizedHref } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

const categoryDecorations: Record<string, { icon: string; color: string; glow: string }> = {
  "stipendio-lavoro": { icon: "↗", color: "bg-sky-100 text-sky-900", glow: "hover:border-sky-300 hover:bg-sky-50" },
  "casa-budget": { icon: "⌂", color: "bg-amber-100 text-amber-900", glow: "hover:border-amber-300 hover:bg-amber-50" },
  "business-freelance": { icon: "%", color: "bg-violet-100 text-violet-900", glow: "hover:border-violet-300 hover:bg-violet-50" },
  finanza: { icon: "+", color: "bg-emerald-100 text-emerald-900", glow: "hover:border-emerald-300 hover:bg-emerald-50" },
};

export const metadata: Metadata = {
  title: "Calcolich | Calcolatori gratuiti per la Svizzera",
  description:
    "Calcolatori gratuiti per stipendio, IVA, lavoro, finanza e casa in Svizzera.",
  alternates: {
    canonical: "https://www.calcolich.ch",
  },
};

export default function Home() {
  const categories = calculatorCategories.slice(0, 4).map((category) => ({
    ...category,
    count: getCategoryCalculators(category).length,
  }));

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8fc] text-gray-950">
      <section className="sticky top-0 z-30 border-b border-white/70 bg-white/85 px-5 py-4 shadow-sm backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tight">
            <Image src="/calcolich-logo.jpg" alt="Logo Calcolich" width={48} height={48} className="h-11 w-11 rounded-2xl object-cover shadow-sm" priority />
            <span>Calcolich</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-1 rounded-full border border-gray-200 bg-white p-1 text-xs font-black text-gray-600 shadow-sm sm:text-sm">
            <Link href="/de" className="rounded-full px-3 py-2 transition hover:bg-gray-950 hover:text-white">DE</Link>
            <Link href="/it" className="rounded-full bg-gray-950 px-3 py-2 text-white">IT</Link>
            <Link href="/en" className="rounded-full px-3 py-2 transition hover:bg-gray-950 hover:text-white">EN</Link>
            <Link href="/fr" className="rounded-full px-3 py-2 transition hover:bg-gray-950 hover:text-white">FR</Link>
          </nav>
        </div>
      </section>

      <div className="relative mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-16">
        <div className="pointer-events-none absolute -left-40 top-16 h-80 w-80 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-44 top-80 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

        <section className="relative mb-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
          <div className="animate-fade-up rounded-[2.5rem] border border-white/80 bg-white/80 p-7 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] backdrop-blur md:p-11">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Strumenti semplici per la Svizzera
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] md:text-7xl">
              Numeri chiari.
              <span className="mt-2 block bg-gradient-to-r from-sky-700 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Decisioni migliori.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              Calcolatori gratuiti per lavoro, stipendio, casa, budget e finanze. Inserisci i dati, confronta gli scenari e ottieni subito una stima utile.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#calcolatori" className="group inline-flex items-center gap-3 rounded-full bg-gray-950 px-6 py-3.5 font-black text-white shadow-lg shadow-gray-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-700">
                Esplora i calcolatori
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <p className="text-sm font-bold text-gray-500">Gratis · Senza registrazione</p>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-gray-200 pt-6 text-sm font-bold text-gray-600">
              <span><strong className="text-2xl text-gray-950">{calculators.length}</strong> strumenti</span>
              <span><strong className="text-2xl text-gray-950">4</strong> aree principali</span>
              <span><strong className="text-2xl text-gray-950">4</strong> lingue</span>
            </div>
          </div>

          <aside className="animate-fade-up animation-delay-150 relative isolate overflow-hidden rounded-[2.5rem] bg-[#071b33] p-7 text-white shadow-[0_24px_80px_-36px_rgba(7,27,51,0.8)] md:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="animate-float-slow mx-auto rounded-[2rem] bg-white p-4 shadow-2xl shadow-black/30">
                <Image src="/calcolich-logo.jpg" alt="Calcolich, calcolatori per la Svizzera" width={150} height={150} className="h-36 w-36 rounded-2xl object-cover" priority />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">Calcolich.ch</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Un calcolo alla volta.</h2>
                <p className="mt-3 leading-7 text-slate-300">Strumenti diretti, spiegazioni trasparenti e risultati immediati per le decisioni di ogni giorno.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="relative mb-14" aria-label="Categorie calcolatori">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Esplora per area</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Da dove vuoi iniziare?</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-600">Scegli un tema e trova subito gli strumenti più utili per il tuo caso.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const decoration = categoryDecorations[category.slug] ?? categoryDecorations.finanza;
              return (
                <Link
                  key={category.slug}
                  href={`/categorie/${category.slug}`}
                  className={`group animate-fade-up rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${decoration.glow}`}
                  style={{ animationDelay: `${180 + index * 70}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-black ${decoration.color}`}>{decoration.icon}</span>
                    <span className="text-xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-950">→</span>
                  </div>
                  <p className="mt-6 text-sm font-black text-gray-500">{category.count} strumenti</p>
                  <h3 className="mt-1 text-xl font-black tracking-tight">{category.shortTitle}</h3>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="calcolatori" className="relative scroll-mt-24">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">Tutti gli strumenti</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Calcola, confronta, decidi.</h2>
            </div>
            <p className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-600 shadow-sm">{calculators.length} calcolatori disponibili</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((tool) => (
              <Link
                key={tool.title}
                href={localizedHref("it", tool)}
                className="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4">
                  <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">
                    {publicCopy(tool.category)}
                  </p>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500 transition group-hover:bg-gray-950 group-hover:text-white">→</span>
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-tight transition group-hover:text-sky-800">
                  {publicCopy(tool.title)}
                </h3>
                <p className="leading-7 text-gray-600">{publicCopy(tool.intro)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
