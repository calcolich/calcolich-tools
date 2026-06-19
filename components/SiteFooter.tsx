import Link from "next/link";

const footerLinks = [
  { href: "/categorie/stipendio-lavoro", label: "Lavoro" },
  { href: "/categorie/business-freelance", label: "Business" },
  { href: "/categorie/trading", label: "Trading" },
  { href: "/guide", label: "Guide" },
  { href: "/servizi-ai-seo", label: "Servizi" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookie", label: "Cookie" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contatti", label: "Contatti" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-5 py-8 text-sm text-gray-600 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-black text-gray-950">Calcolich</p>
          <p className="mt-1 max-w-xl leading-6">
            Calcolatori online gratuiti per lavoro, business, finanza, casa e trading. I risultati sono stime informative.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 font-semibold" aria-label="Link legali e informativi">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
