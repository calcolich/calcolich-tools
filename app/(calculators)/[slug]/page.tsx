import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorPage from "@/components/CalculatorPage";
import { calculatorSlugs, getCalculator } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";

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
    title: publicCopy(calculator.metaTitle),
    description: publicCopy(calculator.metaDescription),
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
