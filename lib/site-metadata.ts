import type { Metadata } from "next";

export const siteUrl = "https://www.calcolich.ch";

type SiteLocale = "de" | "it" | "en" | "fr";

const localizedSiteCopy = {
  de: {
    title: "Calcolich Schweiz | Kostenlose Online-Rechner",
    description:
      "Kostenlose Online-Rechner fuer Lohn, Steuern, Vorsorge, Wohnen, Budget und praktische Entscheidungen in der Schweiz.",
  },
  it: {
    title: "Calcolich | Calcolatori gratuiti online",
    description:
      "Calcolatori online gratuiti per lavoro, business, finanza, trading e strumenti pratici per decidere meglio.",
  },
  en: {
    title: "Calcolich Switzerland | Free online calculators",
    description:
      "Free online calculators for Swiss salary, tax, pension, housing, budget and practical everyday decisions.",
  },
  fr: {
    title: "Calcolich Suisse | Calculateurs gratuits en ligne",
    description:
      "Calculateurs gratuits pour le salaire, les impots, la prevoyance, le logement, le budget et les decisions pratiques en Suisse.",
  },
} satisfies Record<SiteLocale, { title: string; description: string }>;

export function pageSocialMetadata(title: string, description: string, path?: string): Metadata {
  return {
    openGraph: {
      type: "website",
      siteName: "Calcolich",
      title,
      description,
      url: path ? `${siteUrl}${path}` : siteUrl,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function getSiteMetadata(locale: SiteLocale): Metadata {
  const copy = localizedSiteCopy[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.title,
      template: "%s",
    },
    description: copy.description,
    ...pageSocialMetadata(copy.title, copy.description),
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const siteMetadata: Metadata = getSiteMetadata("it");
