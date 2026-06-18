import type { Metadata } from "next";
import LocaleHomePage from "@/components/LocaleHomePage";
import { localeHome, localizedAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: localeHome.fr.title,
  description: localeHome.fr.description,
  alternates: localizedAlternates("fr"),
};

export default function Page() {
  return <LocaleHomePage locale="fr" />;
}
