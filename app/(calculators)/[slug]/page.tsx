import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorPage from "@/components/CalculatorPage";
import { calculatorSlugs, getCalculator } from "@/lib/calculators";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return calculatorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator) {
    return {};
  }

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    alternates: {
      canonical: `https://calcolich.ch/${calculator.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculator(slug);

  if (!calculator) {
    notFound();
  }

  return <CalculatorPage calculator={calculator} />;
}
