import type { ReactNode } from "react";
import Link from "next/link";

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
  { href: "/calcolo-iva-svizzera", title: "Calcolo IVA Svizzera" },
  { href: "/scorporo-iva-svizzera", title: "Scorporo IVA Svizzera" },
  { href: "/calcolo-ore-lavoro", title: "Calcolo ore lavoro" },
  { href: "/calcolo-tredicesima-svizzera", title: "Calcolo tredicesima Svizzera" },
  { href: "/calcolo-salario-netto-svizzera", title: "Calcolo salario netto Svizzera" },
  { href: "/calcolo-giorni-lavorativi-svizzera", title: "Calcolo giorni lavorativi Svizzera" },
];

export default function ToolPage({
  title,
  intro,
  children,
  explanation,
  relatedTools = defaultRelatedTools,
}: ToolPageProps) {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-sm font-semibold text-gray-600 hover:text-black">
          Tutti i calcolatori
        </Link>

        <section className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Calcolich
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-950 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">
            {intro}
          </p>
        </section>

        {children}

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-2xl bg-white p-6 shadow">
            {explanation}
          </article>

          <aside className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">Calcolatori correlati</h2>
            <div className="space-y-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block rounded-xl border border-gray-200 p-4 font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-50"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
