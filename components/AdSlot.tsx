"use client";

import { useEffect } from "react";

type WindowWithAds = Window & {
  adsbygoogle?: unknown[];
};

export default function AdSlot({
  slot,
  label = "Annuncio",
}: {
  slot?: string;
  label?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!client || !slot) return;
    const adsWindow = window as WindowWithAds;
    adsWindow.adsbygoogle = adsWindow.adsbygoogle ?? [];
    adsWindow.adsbygoogle.push({});
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <section className="my-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}
