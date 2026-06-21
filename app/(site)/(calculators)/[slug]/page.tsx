import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorPage from "@/components/CalculatorPage";
import { calculatorSlugs, getCalculator } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";
import { hasLocalizedCalculator } from "@/lib/i18n";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return calculatorSlugs
    .filter((slug) => !hasLocalizedCalculator(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator || hasLocalizedCalculator(slug)) {
    return {};
  }

  return {
    title: publicCopy(calculator.metaTitle),
    description: publicCopy(calculator.metaDescription),
    alternates: {
      canonical: `https://www.calcolich.ch/${calculator.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator || hasLocalizedCalculator(slug)) {
    notFound();
  }

  return <CalculatorPage calculator={calculator} />;
}
