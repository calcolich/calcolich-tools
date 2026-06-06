import type { Metadata } from "next";
import MarketingScripts from "@/components/MarketingScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://calcolich.ch"),
  title: {
    default: "Calcolich | Calcolatori gratuiti per la Svizzera",
    template: "%s",
  },
  description:
    "Calcolatori online gratuiti per IVA, salario, tredicesima, ferie, giorni lavorativi e strumenti utili in Svizzera.",
  alternates: {
    canonical: "https://calcolich.ch",
  },
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
      <body className="min-h-full flex flex-col">
        <MarketingScripts />
        {children}
      </body>
    </html>
  );
}
