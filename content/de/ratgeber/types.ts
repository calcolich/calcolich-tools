export type GermanLongTailArticle = {
  status: "published";
  locale: "de";
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  intro: string[];
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
  }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
  relatedArticleSlugs: string[];
  sources: { label: string; href: string }[];
};
