import type { MetadataRoute } from "next";
import { calculatorCategories } from "@/lib/categories";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { getLocalizedCalculators, hasLocalizedCalculator, locales, localizedAlternates } from "@/lib/i18n";
import { servicePages } from "@/lib/service-pages";
import { siteUrl } from "@/lib/site-metadata";

const contentUpdatedAt = new Date("2026-06-21T00:00:00.000Z");

const routes = Array.from(new Set([
  "",
  "/scorporo-iva-svizzera",
  "/calcolo-tredicesima-svizzera",
  "/calcolo-giorni-lavorativi-svizzera",
  "/calcolo-straordinari-svizzera",
  "/servizi-ai-seo",
  "/audit-sito-gratuito-ticino",
  "/piano-cashflow-online",
  "/chi-siamo",
  "/privacy",
  "/cookie",
  "/disclaimer",
  "/contatti",
  "/guide",
  ...calculatorCategories.map((category) => `/categorie/${category.slug}`),
  ...guides.map((guide) => `/guide/${guide.slug}`),
  ...servicePages.map((page) => `/servizi/${page.slug}`),
  ...calculators
    .filter((calculator) => !hasLocalizedCalculator(calculator.slug))
    .map((calculator) => `/${calculator.slug}`),
]));

const localizedRoutes = locales.flatMap((locale) => [
  {
    route: `/${locale}`,
    alternates: localizedAlternates(locale).languages,
  },
  ...getLocalizedCalculators(locale).map((calculator) => ({
    route: `/${locale}/${calculator.slug}`,
    alternates: localizedAlternates(locale, calculator.slug).languages,
  })),
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: contentUpdatedAt,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...localizedRoutes.map(({ route, alternates }) => ({
      url: `${siteUrl}${route}`,
      lastModified: contentUpdatedAt,
      changeFrequency: route.length === 3 ? "weekly" as const : "monthly" as const,
      priority: route.length === 3 ? 0.9 : 0.75,
      alternates: {
        languages: alternates,
      },
    })),
  ];
}
