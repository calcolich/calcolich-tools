import AdSenseScript from "@/components/AdSenseScript";
import MarketingScripts from "@/components/MarketingScripts";
import SiteFooter from "@/components/SiteFooter";

export default function SiteDocument({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: string;
}>) {
  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f6f8fb] text-gray-950">
        <MarketingScripts />
        <AdSenseScript />
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
