import SiteDocument from "@/components/SiteDocument";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = siteMetadata;

export default function ItalianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="it">{children}</SiteDocument>;
}
