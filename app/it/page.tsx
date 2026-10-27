import type { Metadata } from "next";
import LocaleHomePage from "@/components/LocaleHomePage";
import { localeHome, localizedAlternates } from "@/lib/i18n";
import { pageSocialMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: localeHome.it.title,
  description: localeHome.it.description,
  alternates: localizedAlternates("it"),
  ...pageSocialMetadata(localeHome.it.title, localeHome.it.description, "/it"),
};

export default function Page() {
  return <LocaleHomePage locale="it" />;
}
