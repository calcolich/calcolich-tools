import LocalizedCalculatorRoute, { getLocalizedMetadata } from "@/components/LocalizedCalculatorRoute";
import { getLocalizedStaticParams } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocalizedStaticParams("fr");
}

export function generateMetadata({ params }: Props) {
  return getLocalizedMetadata("fr", params);
}

export default function Page({ params }: Props) {
  return <LocalizedCalculatorRoute locale="fr" params={params} />;
}
