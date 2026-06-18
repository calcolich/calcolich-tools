import type { Metadata } from "next";
import MarketingScripts from "@/components/MarketingScripts";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://calcolich.ch"),
  title: {
    default: "Calcolich | Calcolatori gratuiti online",
    template: "%s",
  },
  description:
    "Calcolatori online gratuiti per lavoro, business, finanza, trading e strumenti pratici per decidere meglio.",
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#f6f8fb] text-gray-950">
        <MarketingScripts />
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
