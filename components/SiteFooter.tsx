import Link from "next/link";
import { type Locale } from "@/lib/i18n";

type FooterLink = {
  href: string;
  label: string;
};

type FooterCopy = {
  description: string;
  editorial: string;
  navLabel: string;
  links: FooterLink[];
};

const languageLinks: FooterLink[] = [
  { href: "/de", label: "DE" },
  { href: "/it", label: "IT" },
  { href: "/en", label: "EN" },
  { href: "/fr", label: "FR" },
];

const legalLinks = {
  de: [
    { href: "/privacy", label: "Datenschutz" },
    { href: "/cookie", label: "Cookies" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/contatti", label: "Kontakt" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
  it: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookie", label: "Cookie" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/contatti", label: "Contatti" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
  en: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookie", label: "Cookies" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/contatti", label: "Contact" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
  fr: [
    { href: "/privacy", label: "Confidentialite" },
    { href: "/cookie", label: "Cookies" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/contatti", label: "Contact" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
} satisfies Record<Locale, FooterLink[]>;

const footerCopy = {
  de: {
    description:
      "Kostenlose Online-Rechner fuer Arbeit, Steuern, Vorsorge, Wohnen und Budget in der Schweiz. Die Ergebnisse sind informative Schaetzungen.",
    editorial: "Herausgeber: Calcolich · Kontakt: calcolich@gmail.com · Inhalte zuletzt aktualisiert: 12. Juli 2026",
    navLabel: "Rechtliche und informative Links",
    links: [
      ...languageLinks,
      { href: "/de/ratgeber", label: "Ratgeber" },
      { href: "/de/quellensteuer-rechner-schweiz", label: "Quellensteuer" },
      { href: "/de/saeule-3a-steuerersparnis-rechner", label: "Saeule 3a" },
      { href: "/de/hypotheken-tragbarkeit-rechner-schweiz", label: "Hypothek" },
      { href: "/de/arbeitszeitrechner", label: "Arbeitszeit" },
      { href: "/de/ueberstundenrechner-schweiz", label: "Ueberstunden" },
      ...legalLinks.de,
    ],
  },
  it: {
    description:
      "Calcolatori online gratuiti per lavoro, business, finanza, casa e trading. I risultati sono stime informative.",
    editorial: "Editore: Calcolich · Contatto: calcolich@gmail.com · Ultimo aggiornamento contenuti: 12 luglio 2026",
    navLabel: "Link legali e informativi",
    links: [
      ...languageLinks,
      { href: "/categorie/stipendio-lavoro", label: "Lavoro" },
      { href: "/categorie/business-freelance", label: "Business" },
      { href: "/categorie/trading", label: "Trading" },
      { href: "/guide", label: "Guide" },
      { href: "/servizi-ai-seo", label: "Servizi" },
      { href: "/audit-sito-gratuito-ticino", label: "Audit gratuito" },
      { href: "/chi-siamo", label: "Chi siamo" },
      ...legalLinks.it,
    ],
  },
  en: {
    description:
      "Free online calculators for Swiss salary, tax, pension, housing and budget decisions. Results are informative estimates.",
    editorial: "Publisher: Calcolich · Contact: calcolich@gmail.com · Content last updated: July 12, 2026",
    navLabel: "Legal and informational links",
    links: [
      ...languageLinks,
      { href: "/en/withholding-tax-calculator-switzerland", label: "Withholding tax" },
      { href: "/en/pillar-3a-tax-savings-calculator", label: "Pillar 3a" },
      { href: "/en/mortgage-affordability-calculator-switzerland", label: "Mortgage" },
      { href: "/en/hourly-wage-calculator-switzerland", label: "Hourly wage" },
      ...legalLinks.en,
    ],
  },
  fr: {
    description:
      "Calculateurs gratuits pour le salaire, les impots, la prevoyance, le logement et le budget en Suisse. Les resultats sont des estimations informatives.",
    editorial: "Editeur: Calcolich · Contact: calcolich@gmail.com · Derniere mise a jour des contenus: 12 juillet 2026",
    navLabel: "Liens juridiques et informatifs",
    links: [
      ...languageLinks,
      { href: "/fr/calculateur-impot-a-la-source-suisse", label: "Impot a la source" },
      { href: "/fr/calculateur-troisieme-pilier-economie-impot", label: "Troisieme pilier" },
      { href: "/fr/calculateur-viabilite-hypotheque-suisse", label: "Hypotheque" },
      { href: "/fr/calculateur-salaire-horaire-suisse", label: "Salaire horaire" },
      ...legalLinks.fr,
    ],
  },
} satisfies Record<Locale, FooterCopy>;

export default function SiteFooter({ lang }: { lang: Locale }) {
  const copy = footerCopy[lang];

  return (
    <footer className="border-t border-gray-200 bg-white px-5 py-8 text-sm text-gray-600 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-black text-gray-950">Calcolich</p>
          <p className="mt-1 max-w-xl leading-6">
            {copy.description}
          </p>
          <p className="mt-2 text-xs font-semibold text-gray-500">
            {copy.editorial}
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 font-semibold" aria-label={copy.navLabel}>
          {copy.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
