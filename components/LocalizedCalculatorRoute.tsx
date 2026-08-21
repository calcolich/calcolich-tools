import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageSocialMetadata } from "@/lib/site-metadata";
import CalculatorPage from "@/components/CalculatorPage";
import {
  getLocalizedCalculator,
  getLocalizedRelatedCalculators,
  localizedAlternates,
  localizedHref,
  localeHome,
  type Locale,
} from "@/lib/i18n";

type Params = Promise<{ slug: string }>;

export async function getLocalizedMetadata(locale: Locale, params: Params): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getLocalizedCalculator(locale, slug);
  if (!calculator) return {};

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    alternates: localizedAlternates(locale, slug),
    ...pageSocialMetadata(calculator.metaTitle, calculator.metaDescription, localizedHref(locale, calculator)),
  };
}

export default async function LocalizedCalculatorRoute({
  locale,
  params,
}: {
  locale: Locale;
  params: Params;
}) {
  const { slug } = await params;
  const calculator = getLocalizedCalculator(locale, slug);
  if (!calculator) notFound();

  return (
    <CalculatorPage
      calculator={calculator}
      backHref={`/${locale}`}
      labels={localeHome[locale]}
      relatedCalculators={getLocalizedRelatedCalculators(locale, calculator)}
      calculatorHref={(tool) => localizedHref(locale, tool)}
      locale={locale}
    />
  );
}
