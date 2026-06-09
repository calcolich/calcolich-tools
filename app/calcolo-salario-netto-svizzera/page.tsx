import type { Metadata } from "next";
import CalculatorPage from "@/components/CalculatorPage";
import { getCalculator } from "@/lib/calculators";
import { publicCopy } from "@/lib/copy";

const calculator = getCalculator("calcolo-salario-netto-svizzera")!;

export const metadata: Metadata = {
  title: publicCopy(calculator.metaTitle),
  description: publicCopy(calculator.metaDescription),
};

export default function Page() {
  return <CalculatorPage calculator={calculator} />;
}
