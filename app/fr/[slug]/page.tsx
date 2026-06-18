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
  return getLocalizedStaticParams("fr");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getLocalizedCalculator("fr", slug);
  if (!calculator) return {};

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    alternates: localizedAlternates("fr", slug),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const calculator = getLocalizedCalculator("fr", slug);
  if (!calculator) notFound();

  return (
    <CalculatorPage
      calculator={calculator}
      backHref="/fr"
      labels={localeHome.fr}
      relatedCalculators={getLocalizedRelatedCalculators("fr", calculator)}
      calculatorHref={(tool) => localizedHref("fr", tool)}
    />
  );
}
