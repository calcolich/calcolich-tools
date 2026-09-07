import type { Locale } from "@/lib/i18n";

// Reusable affiliate CTA slots. Affiliate URLs are NEVER hardcoded here:
// every href comes from a NEXT_PUBLIC_* env var. If a URL is not configured,
// the offer is simply hidden instead of rendered with a fake link.
export type AffiliateSlotId = "pillar-3a" | "mortgage" | "krankenkasse";

type AffiliatePartner = {
  partner: string;
  href?: string;
  labels: Record<Locale, string>;
};

const env = {
  frankly: process.env.NEXT_PUBLIC_FRANKLY_AFFILIATE_URL,
  yuh: process.env.NEXT_PUBLIC_YUH_AFFILIATE_URL,
  moneypark: process.env.NEXT_PUBLIC_MONEYPARK_AFFILIATE_URL,
  comparisMortgage: process.env.NEXT_PUBLIC_COMPARIS_MORTGAGE_AFFILIATE_URL,
  comparisHealth: process.env.NEXT_PUBLIC_COMPARIS_HEALTH_AFFILIATE_URL,
  krankenkasse: process.env.NEXT_PUBLIC_KRANKENKASSE_AFFILIATE_URL,
};

export const affiliateSlotIds: Record<AffiliateSlotId, string[]> = {
  "pillar-3a": ["terzo-pilastro", "pillar-3a", "saeule-3a", "troisieme-pilier"],
  mortgage: ["hypotheken", "ipoteca", "hypotheque", "mortgage", "mutuo"],
  krankenkasse: ["krankenkasse", "cassa-malati", "assurance-maladie", "health-insurance"],
};

export function getAffiliateSlotId(slug: string): AffiliateSlotId | null {
  const entry = Object.entries(affiliateSlotIds).find(([, patterns]) =>
    patterns.some((pattern) => slug.includes(pattern)),
  );
  return entry ? (entry[0] as AffiliateSlotId) : null;
}

function slotPartners(slot: AffiliateSlotId): AffiliatePartner[] {
  switch (slot) {
    case "pillar-3a":
      return [
        {
          partner: "frankly",
          href: env.frankly,
          labels: {
            de: "frankly 3a prüfen",
            it: "Valuta frankly 3a",
            en: "Check frankly 3a",
            fr: "Verifier frankly 3a",
          },
        },
        {
          partner: "yuh",
          href: env.yuh,
          labels: {
            de: "Yuh 3a prüfen",
            it: "Valuta Yuh 3a",
            en: "Check Yuh 3a",
            fr: "Verifier Yuh 3a",
          },
        },
      ];
    case "mortgage":
      return [
        {
          partner: "moneypark",
          href: env.moneypark,
          labels: {
            de: "Hypothek mit MoneyPark vergleichen",
            it: "Confronta ipoteca con MoneyPark",
            en: "Compare mortgage with MoneyPark",
            fr: "Comparer l'hypothèque avec MoneyPark",
          },
        },
        {
          partner: "comparis-mortgage",
          href: env.comparisMortgage,
          labels: {
            de: "Hypothekarzinsen vergleichen (Comparis)",
            it: "Confronta tassi ipotecari (Comparis)",
            en: "Compare mortgage rates (Comparis)",
            fr: "Comparer les taux hypothecaires (Comparis)",
          },
        },
      ];
    case "krankenkasse":
      return [
        {
          partner: "comparis-health",
          href: env.comparisHealth,
          labels: {
            de: "Krankenkassenprämien vergleichen (Comparis)",
            it: "Confronta premi cassa malati (Comparis)",
            en: "Compare health insurance premiums (Comparis)",
            fr: "Comparer les primes maladie (Comparis)",
          },
        },
        {
          partner: "krankenkasse-vergleich",
          href: env.krankenkasse,
          labels: {
            de: "Krankenkasse wechseln",
            it: "Cambia cassa malati",
            en: "Switch health insurer",
            fr: "Changer d'assurance maladie",
          },
        },
      ];
  }
}

export type AffiliateOffer = {
  partner: string;
  href: string;
  label: string;
};

export function getAffiliateOffers(locale: Locale, slug: string): {
  slot: AffiliateSlotId;
  offers: AffiliateOffer[];
} | null {
  const slot = getAffiliateSlotId(slug);
  if (!slot) return null;

  const offers = slotPartners(slot)
    .filter((offer): offer is AffiliatePartner & { href: string } => Boolean(offer.href))
    .map((offer) => ({ partner: offer.partner, href: offer.href, label: offer.labels[locale] }));

  return { slot, offers };
}
