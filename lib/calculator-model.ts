import type { Calculator, CalculatorInput, CalculatorKind } from "@/lib/calculators";

export type CalculatorLocale = "de" | "it" | "en" | "fr";
export type MonetizationType = "adsense" | "affiliate" | "lead" | "mixed";
export type CalculatorSchemaType = "WebApplication" | "SoftwareApplication";

export type LocalizedCalculatorCategory = {
  id: string;
  locale: CalculatorLocale;
  slug: string;
  title: string;
  description: string;
};

export type CentralizedCalculator = {
  id: string;
  locale: CalculatorLocale;
  slug: string;
  kind: CalculatorKind;
  category: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  formula: string;
  example: string;
  faqs: { question: string; answer: string }[];
  relatedCalculators: string[];
  guideLinks?: { href: string; label: string; description: string }[];
  monetizationType: MonetizationType;
  schemaType: CalculatorSchemaType;
  isPriority: boolean;
  searchIntent: string;
  shortTitle: string;
  inputs: CalculatorInput[];
  resultLabels: string[];
  cta: string;
  supportingContent: string[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export function toCalculator(data: CentralizedCalculator): Calculator {
  return {
    ...data,
    metaTitle: data.title,
    title: data.h1,
    article: [data.formula, data.example, ...data.supportingContent],
    relatedSlugs: data.relatedCalculators,
  };
}
