"use client";

import { useEffect, useRef } from "react";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { sendAnalyticsEvent } from "@/lib/analytics-events";
import { getAffiliateOffers } from "@/lib/affiliate-offers";
import type { Locale } from "@/lib/i18n";

type AffiliateCtaSlotProps = {
  slug: string;
  calculatorId?: string;
  locale: Locale;
  reservedText: string;
};

// Renders the reusable affiliate CTA slot for the calculator's matching slot
// (pillar 3a, mortgage, krankenkasse). Offers without a real configured URL
// are hidden: when no offer is live, the reserved-text fallback is shown.
export default function AffiliateCtaSlot({
  slug,
  calculatorId,
  locale,
  reservedText,
}: AffiliateCtaSlotProps) {
  const { slot, offers } = getAffiliateOffers(locale, slug) ?? { slot: null, offers: [] };
  const viewedRef = useRef(false);

  useEffect(() => {
    if (!slot || offers.length === 0 || viewedRef.current) return;
    viewedRef.current = true;
    sendAnalyticsEvent("affiliate_cta_view", {
      source: slug,
      target: slot,
      calculatorId,
    });
  }, [calculatorId, offers.length, slot, slug]);

  if (offers.length === 0) {
    return <p className="mt-2 font-bold text-gray-950">{reservedText}</p>;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {offers.map((offer) => (
        <TrackedExternalLink
          key={offer.partner}
          href={offer.href}
          event="affiliate_click"
          source={slug}
          target={slot ?? offer.partner}
          calculatorId={calculatorId}
          className="rounded-xl bg-white px-4 py-3 text-sm font-black text-emerald-800 shadow-sm hover:text-emerald-950"
        >
          {offer.label}
        </TrackedExternalLink>
      ))}
    </div>
  );
}
