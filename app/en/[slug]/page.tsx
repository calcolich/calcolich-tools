import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorPage from "@/components/CalculatorPage";
import {
  getLocalizedCalculator,
  getLocalizedRelatedCalculators,
  getLocalizedStaticParams,
  localeHome,
  localizedAlternates,
  localizedHref,
} from "@/lib/i18n";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocalizedStaticParams("en");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getLocalizedCalculator("en", slug);
  if (!calculator) return {};

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    alternates: localizedAlternates("en", slug),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const calculator = getLocalizedCalculator("en", slug);
  if (!calculator) notFound();

  return (
    <CalculatorPage
      calculator={calculator}
      backHref="/en"
      labels={localeHome.en}
      relatedCalculators={getLocalizedRelatedCalculators("en", calculator)}
      calculatorHref={(tool) => localizedHref("en", tool)}
    />
  );
}
