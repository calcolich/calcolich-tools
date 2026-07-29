import { quellensteuerSchweiz2026 } from "./quellensteuer-schweiz-2026";
import { praemienverbilligungSchweiz } from "./praemienverbilligung-schweiz";
import { ferienanspruchTeilzeitSchweiz } from "./ferienanspruch-teilzeit-schweiz";
import { mehrwertsteuerSchweiz2026 } from "./mehrwertsteuer-schweiz-2026";
import { pausenregelungArbeitszeitSchweiz } from "./pausenregelung-arbeitszeit-schweiz";
import { stundenlohnBerechnenSchweiz } from "./stundenlohn-berechnen-schweiz";
import { ueberstundenSchweizBerechnen } from "./ueberstunden-schweiz-berechnen";
import type { GermanLongTailArticle } from "./types";

export type { GermanLongTailArticle };

export const germanLongTailArticles: GermanLongTailArticle[] = [
  quellensteuerSchweiz2026,
  praemienverbilligungSchweiz,
  mehrwertsteuerSchweiz2026,
  stundenlohnBerechnenSchweiz,
  ueberstundenSchweizBerechnen,
  ferienanspruchTeilzeitSchweiz,
  pausenregelungArbeitszeitSchweiz,
];

export function getGermanLongTailArticle(slug: string) {
  return germanLongTailArticles.find((article) => article.slug === slug);
}

export function getRelatedGermanLongTailArticles(article: GermanLongTailArticle) {
  return article.relatedArticleSlugs
    .map((slug) => getGermanLongTailArticle(slug))
    .filter((related): related is GermanLongTailArticle => Boolean(related));
}
