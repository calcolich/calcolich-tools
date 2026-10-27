import SiteDocument from "@/components/SiteDocument";
import { getSiteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = getSiteMetadata("fr");

export default function FrenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
