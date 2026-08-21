import type { Metadata } from "next";
import LocaleHomePage from "@/components/LocaleHomePage";
import { localeHome, localizedAlternates } from "@/lib/i18n";
import { pageSocialMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: localeHome.fr.title,
  description: localeHome.fr.description,
  alternates: localizedAlternates("fr"),
  ...pageSocialMetadata(localeHome.fr.title, localeHome.fr.description, "/fr"),
};

export default function Page() {
  return <LocaleHomePage locale="fr" />;
}
