import Link from "next/link";
import type { Metadata } from "next";
import { getSocialContentStatus } from "@/lib/social-content";

export const metadata: Metadata = {
  title: "Canali social Calcolich | Piano contenuti",
  description: "Vista operativa dei canali social, delle campagne e del calendario organico Calcolich.",
  alternates: {
    canonical: "https://www.calcolich.ch/social",
  },
};

export default async function SocialPage() {
  const social = await getSocialContentStatus();
  const nextPosts = social.calendar.slice(0, 10);
  const priorityCampaigns = social.campaigns.filter((campaign) => campaign.priority === "alta");

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-gray-950">
      <section className="border-b border-gray-200 bg-white px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="text-xl font-black tracking-tight">Calcolich</Link>
          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm font-semibold text-gray-600">
            <Link href="/" className="rounded-full px-3 py-2 hover:bg-gray-100">Home</Link>
            <Link href="/guide" className="rounded-full px-3 py-2 hover:bg-gray-100">Guide</Link>
            <Link href="/servizi-ai-seo" className="rounded-full px-3 py-2 hover:bg-gray-100">Servizi</Link>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
        <section className="mb-8">
          <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
            Social traffic system
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Canali social gia impostati per Calcolich
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">
            Questa vista legge i file gia presenti in <code>social-content</code>: campagne, bozze,
            UTM e calendario organico. Non pubblica automaticamente sui social.
          </p>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3" aria-label="Riepilogo social">
          <StatCard label="Campagne" value={social.totals.campaigns} note={`Generate il ${social.generatedAt}`} />
          <StatCard label="Asset pianificati" value={social.totals.plannedItems} note="Post, carousel e short script" />
          <StatCard label="Uscite calendario" value={social.totals.scheduledItems} note="Piano editoriale corrente" />
        </section>

        <section className="mb-10">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Canali</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight">Copertura per piattaforma</h2>
            </div>
            <Link href="/api/social/status" className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-black text-gray-800 hover:border-emerald-300 hover:bg-emerald-50">
              API stato social
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {social.channels.map((channel) => (
              <article key={channel.name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black">{channel.label}</h3>
                <p className="mt-3 text-3xl font-black text-emerald-700">{channel.plannedItems}</p>
                <p className="mt-1 text-sm font-semibold text-gray-600">asset in bozza</p>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {channel.scheduledItems} uscite in calendario
                  {channel.nextEntry ? `, prossima: ${channel.nextEntry.date}` : "."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Calendario</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Prossime uscite</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {nextPosts.map((entry) => (
                <article key={`${entry.date}-${entry.channel}-${entry.campaignId}`} className="grid gap-3 py-4 md:grid-cols-[110px_130px_1fr]">
                  <p className="text-sm font-black text-gray-700">{entry.date}</p>
                  <p className="text-sm font-black text-emerald-700">{entry.channelLabel}</p>
                  <div>
                    <h3 className="font-black">{entry.contentTitle}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{entry.pageTitle}</p>
                    <Link href={entry.utmUrl} className="mt-2 inline-flex text-sm font-black text-gray-950 underline decoration-emerald-300 underline-offset-4">
                      Apri link UTM
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Priorita</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">Campagne alte</h2>
            <div className="mt-4 space-y-4">
              {priorityCampaigns.map((campaign) => (
                <article key={campaign.id} className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
                  <h3 className="font-black">{campaign.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{campaign.locale.toUpperCase()} · {campaign.keyword}</p>
                  <p className="mt-2 text-sm font-bold text-emerald-700">
                    {campaign.channels.reduce((total, channel) => total + channel.items, 0)} asset
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-4xl font-black text-gray-950">{value}</p>
      <p className="mt-2 text-sm font-semibold text-gray-600">{note}</p>
    </article>
  );
}
