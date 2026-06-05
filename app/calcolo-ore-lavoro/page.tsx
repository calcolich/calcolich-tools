import type { Metadata } from "next";
import CalculatorPage from "@/components/CalculatorPage";
import { getCalculator } from "@/lib/calculators";

const calculator = getCalculator("calcolo-ore-lavoro")!;

export const metadata: Metadata = {
  title: calculator.metaTitle,
  description: calculator.metaDescription,
};

export default function Page() {
  return <CalculatorPage calculator={calculator} />;
}
