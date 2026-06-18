import type { Metadata } from "next";
import LocaleHomePage from "@/components/LocaleHomePage";
import { localeHome, localizedAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: localeHome.de.title,
  description: localeHome.de.description,
  alternates: localizedAlternates("de"),
};

export default function Page() {
  return <LocaleHomePage locale="de" />;
}
