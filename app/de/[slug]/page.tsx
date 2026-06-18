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
  return getLocalizedStaticParams("de");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getLocalizedCalculator("de", slug);
  if (!calculator) return {};

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    alternates: localizedAlternates("de", slug),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const calculator = getLocalizedCalculator("de", slug);
  if (!calculator) notFound();

  return (
    <CalculatorPage
      calculator={calculator}
      backHref="/de"
      labels={localeHome.de}
      relatedCalculators={getLocalizedRelatedCalculators("de", calculator)}
      calculatorHref={(tool) => localizedHref("de", tool)}
    />
  );
}
