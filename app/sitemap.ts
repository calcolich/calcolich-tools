import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";

const baseUrl = "https://calcolich.ch";

const routes = Array.from(new Set([
  "",
  "/scorporo-iva-svizzera",
  "/calcolo-tredicesima-svizzera",
  "/calcolo-giorni-lavorativi-svizzera",
  "/calcolo-straordinari-svizzera",
  "/servizi-ai-seo",
  "/piano-cashflow-online",
  ...calculators.map((calculator) => `/${calculator.slug}`),
]));

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
