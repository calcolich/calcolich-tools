import SiteDocument from "@/components/SiteDocument";
import { getSiteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = getSiteMetadata("it");

export default function ItalianLocalizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="it">{children}</SiteDocument>;
}
