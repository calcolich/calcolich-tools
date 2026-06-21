import type { Metadata } from "next";

export const siteUrl = "https://www.calcolich.ch";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Calcolich | Calcolatori gratuiti online",
    template: "%s",
  },
  description:
    "Calcolatori online gratuiti per lavoro, business, finanza, trading e strumenti pratici per decidere meglio.",
  openGraph: {
    type: "website",
    siteName: "Calcolich",
    title: "Calcolich | Calcolatori gratuiti online",
    description:
      "Calcolatori online gratuiti per lavoro, business, finanza e decisioni quotidiane.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Calcolich | Calcolatori gratuiti online",
    description:
      "Calcolatori online gratuiti per lavoro, business, finanza e decisioni quotidiane.",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};
