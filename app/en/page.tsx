import type { Metadata } from "next";
import LocaleHomePage from "@/components/LocaleHomePage";
import { localeHome, localizedAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: localeHome.en.title,
  description: localeHome.en.description,
  alternates: localizedAlternates("en"),
};

export default function Page() {
  return <LocaleHomePage locale="en" />;
}
