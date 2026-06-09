import type { ReactNode } from "react";
import Link from "next/link";
import { publicCopy } from "@/lib/copy";

type RelatedTool = {
  href: string;
  title: string;
};

type ToolPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
  explanation: ReactNode;
  relatedTools?: RelatedTool[];
};

const defaultRelatedTools: RelatedTool[] = [
  { href: "/calcolo-iva-svizzera", title: "Calcolo IVA" },
  { href: "/scorporo-iva-svizzera", title: "Scorporo IVA" },
  { href: "/calcolo-ore-lavoro", title: "Calcolo ore lavoro" },
  { href: "/calcolo-tredicesima-svizzera", title: "Calcolo tredicesima" },
  { href: "/calcolo-salario-netto-svizzera", title: "Calcolo salario netto" },
  { href: "/calcolo-giorni-lavorativi-svizzera", title: "Calcolo giorni lavorativi" },
];

export default function ToolPage({
  title,
  intro,
  children,
  explanation,
  relatedTools = defaultRelatedTools,
}: ToolPageProps) {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:border-gray-400">
          Tutti i calcolatori
        </Link>

        <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-emerald-700">
            Calcolich
          </p>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-950 md:text-6xl">
            {publicCopy(title)}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">
            {publicCopy(intro)}
          </p>
        </section>

        {children}

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {explanation}
          </article>

          <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-black">Calcolatori correlati</h2>
            <div className="space-y-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block rounded-2xl border border-gray-200 p-4 font-bold text-gray-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {publicCopy(tool.title)}
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
