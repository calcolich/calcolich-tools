import LeadForm from "@/components/LeadForm";
import { CommercialPageView, TrackedLink } from "@/components/CommercialTracking";
import { getServicePage, servicePages } from "@/lib/service-pages";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://calcolich.ch/servizi/${page.slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  const leadSource = `service-landing:${page.slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.metaDescription,
      provider: { "@type": "Organization", name: "Calcolich", url: "https://calcolich.ch" },
      areaServed: { "@type": "AdministrativeArea", name: "Canton Ticino" },
      offers: { "@type": "Offer", priceCurrency: "CHF", description: `A partire da ${page.priceFrom}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Calcolich", item: "https://calcolich.ch" },
        { "@type": "ListItem", position: 2, name: "Servizi", item: "https://calcolich.ch/servizi-ai-seo" },
        { "@type": "ListItem", position: 3, name: page.shortTitle, item: `https://calcolich.ch/servizi/${page.slug}` },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-gray-950 md:px-10">
      <CommercialPageView source={leadSource} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <div className="mx-auto max-w-6xl">
        <Link href="/servizi-ai-seo" className="mb-8 inline-flex text-sm font-black text-emerald-800 hover:text-emerald-950">Tutti i servizi</Link>

        <section className="grid gap-8 border-b border-gray-200 bg-white px-6 py-10 md:px-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-emerald-700">{page.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">{page.intro}</p>
          </div>
          <div className="border-l-4 border-lime-400 pl-5">
            <p className="text-sm font-bold text-gray-500">A partire da</p>
            <p className="mt-1 text-4xl font-black text-gray-950">{page.priceFrom}</p>
            <TrackedLink href="#analisi" source={`${leadSource}:hero`} className="mt-5 inline-flex rounded-xl bg-gray-950 px-5 py-3 font-black text-white hover:bg-emerald-800">Richiedi analisi gratuita</TrackedLink>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <article>
            <h2 className="text-3xl font-black tracking-tight">Il problema che risolviamo</h2>
            <p className="mt-4 text-lg leading-8 text-gray-700">{page.problem}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {page.outcomes.map((outcome) => <div key={outcome} className="border border-emerald-200 bg-emerald-50 p-4 font-black text-emerald-950">{outcome}</div>)}
            </div>

            <h2 className="mt-10 text-3xl font-black tracking-tight">Cosa include</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {page.deliverables.map((item) => <div key={item} className="border-b border-gray-200 bg-white p-4 font-bold"><span className="mr-3 text-emerald-600">+</span>{item}</div>)}
            </div>

            <h2 className="mt-10 text-3xl font-black tracking-tight">Come funziona</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-3">
              {page.process.map((step, index) => (
                <li key={step.title} className="bg-white p-5">
                  <p className="text-sm font-black text-emerald-700">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-black">{step.title}</h3>
                  <p className="mt-2 leading-7 text-gray-700">{step.description}</p>
                </li>
              ))}
            </ol>
          </article>

          <aside id="analisi" className="h-fit border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Prima analisi gratuita</p>
            <h2 className="mt-2 text-2xl font-black">Parlami del progetto</h2>
            <p className="mt-3 leading-7 text-gray-700">Rispondo entro 24 ore con priorita, fascia di prezzo e primo passo consigliato.</p>
            <LeadForm source={leadSource} buttonLabel="Richiedi analisi" showName showPhone showMessage />
          </aside>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="bg-white p-6 md:p-8">
            <h2 className="text-3xl font-black tracking-tight">Domande frequenti</h2>
            <div className="mt-5 space-y-3">
              {page.faqs.map((faq) => <details key={faq.question} className="border-b border-gray-200 py-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 leading-7 text-gray-700">{faq.answer}</p></details>)}
            </div>
          </article>
          <aside className="bg-gray-950 p-6 text-white">
            <h2 className="text-xl font-black">Strumenti collegati</h2>
            <div className="mt-4 space-y-2">
              {page.relatedLinks.map((link) => <Link key={link.href} href={link.href} className="block border-b border-white/20 py-3 font-bold text-gray-100 hover:text-lime-300">{link.label}</Link>)}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
