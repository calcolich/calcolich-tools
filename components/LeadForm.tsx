"use client";

import { useRef, useState } from "react";
import { getAttributedSource } from "@/components/CommercialTracking";
import { sendAnalyticsEvent } from "@/lib/analytics-events";

const fallbackEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "calcolich@gmail.com";
type LeadFormLocale = "de" | "it" | "en" | "fr";

type LeadFormProps = {
  source: string;
  calculatorId?: string;
  buttonLabel: string;
  dark?: boolean;
  segment?: string;
  interest?: string;
  leadMagnet?: string;
  consentLabel?: string;
  showName?: boolean;
  showPhone?: boolean;
  showCompany?: boolean;
  showSiteUrl?: boolean;
  showPackage?: boolean;
  showMessage?: boolean;
  packageOptions?: string[];
  locale?: LeadFormLocale;
};

const defaultPackageOptions = ["Starter - CHF 490", "Business - CHF 990", "Premium - CHF 1.990"];
const formCopy = {
  de: {
    consent: "Ich stimme zu, E-Mails von Calcolich zu diesem Thema zu erhalten. Ich kann mich jederzeit abmelden.",
    email: "Deine E-Mail",
    loading: "Senden...",
    fallback: "Es öffnet sich ein E-Mail-Entwurf: Sende ihn, um die Anfrage abzuschliessen.",
    success: "Anfrage erhalten. Ich melde mich bald.",
  },
  it: {
    consent: "Acconsento a ricevere email da Calcolich su questo tema. Posso disiscrivermi in qualsiasi momento.",
    email: "La tua email",
    loading: "Invio...",
    fallback: "Si apre una bozza email: inviala per completare la richiesta.",
    success: "Richiesta ricevuta. Ti ricontatto presto.",
  },
  en: {
    consent: "I agree to receive emails from Calcolich about this topic. I can unsubscribe at any time.",
    email: "Your email",
    loading: "Sending...",
    fallback: "An email draft opens: send it to complete the request.",
    success: "Request received. I will get back to you soon.",
  },
  fr: {
    consent: "J'accepte de recevoir des e-mails de Calcolich sur ce theme. Je peux me desinscrire a tout moment.",
    email: "Votre e-mail",
    loading: "Envoi...",
    fallback: "Un brouillon d'e-mail s'ouvre: envoyez-le pour finaliser la demande.",
    success: "Demande recue. Je vous recontacte bientot.",
  },
} satisfies Record<LeadFormLocale, Record<string, string>>;

export default function LeadForm({
  source,
  calculatorId,
  buttonLabel,
  dark = false,
  segment,
  interest,
  leadMagnet,
  consentLabel,
  showName = false,
  showPhone = false,
  showCompany = false,
  showSiteUrl = false,
  showPackage = false,
  showMessage = false,
  packageOptions = defaultPackageOptions,
  locale = "it",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedRef = useRef(false);
  const labels = formCopy[locale];
  const resolvedConsentLabel = consentLabel ?? labels.consent;

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    sendAnalyticsEvent("lead_form_started", { source, target: segment, calculatorId });
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const attributedSource = getAttributedSource(source);
    const url = new URL(window.location.href);
    const attribution = {
      page: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      utmSource: url.searchParams.get("utm_source"),
      utmMedium: url.searchParams.get("utm_medium"),
      utmCampaign: url.searchParams.get("utm_campaign"),
      utmContent: url.searchParams.get("utm_content"),
      utmTerm: url.searchParams.get("utm_term"),
    };
    sendAnalyticsEvent("lead_form_submitted", { source: attributedSource, target: segment, calculatorId });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: attributedSource,
          segment,
          interest,
          leadMagnet,
          ...attribution,
        }),
      });

      const result = await response.json();
      if (result.emailFallback) {
        trackLead("lead_fallback", attributedSource, segment);
        openEmailFallback(data, attributedSource);
        form.reset();
        setStatus("success");
        setMessage(labels.fallback);
        return;
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Invio non riuscito.");
      }

      if (!result.configured) {
        trackLead("lead_fallback", attributedSource, segment);
        openEmailFallback(data, attributedSource);
        form.reset();
        setStatus("success");
        setMessage(labels.fallback);
        return;
      }

      form.reset();
      trackLead("generate_lead", attributedSource, segment);
      sendAnalyticsEvent("lead_submit", { source: attributedSource, target: segment, calculatorId });
      setStatus("success");
      setMessage(labels.success);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Invio non riuscito.");
    }
  }

  const inputClass = dark
    ? "w-full rounded-xl border border-white/20 bg-white p-4 text-black"
    : "w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-950";
  const buttonClass = dark
    ? "rounded-xl bg-green-400 px-6 py-4 font-bold text-black"
    : "rounded-xl bg-black px-6 py-4 font-bold text-white";

  return (
    <form
      onSubmit={submitLead}
      onFocusCapture={markStarted}
      onChangeCapture={markStarted}
      className={showMessage ? "mt-5 space-y-4" : "mt-5 grid gap-3 md:grid-cols-[1fr_auto]"}
    >
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      {showName ? <input className={inputClass} name="name" placeholder="Nome" autoComplete="name" /> : null}
      {showCompany ? <input className={inputClass} name="company" placeholder="Azienda / attivita" autoComplete="organization" /> : null}
      {showSiteUrl ? <input className={inputClass} name="siteUrl" placeholder="iltuosito.ch" type="text" inputMode="url" autoComplete="url" required /> : null}
      <input className={inputClass} name="email" placeholder={labels.email} type="email" autoComplete="email" required />
      {showPhone ? <input className={inputClass} name="phone" placeholder="Telefono / WhatsApp" autoComplete="tel" /> : null}
      {showPackage ? (
        <select className={inputClass} name="packageName" defaultValue={packageOptions[0]}>
          {packageOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : null}
      {showMessage ? (
        <textarea className={`${inputClass} min-h-32`} name="message" placeholder="Di cosa hai bisogno?" />
      ) : null}

      <label className={showMessage ? "flex gap-3 text-sm leading-6" : "flex gap-3 text-sm leading-6 md:col-span-2"}>
        <input className="mt-1 h-4 w-4 shrink-0" name="marketingConsent" type="checkbox" required />
        <span className={dark ? "text-gray-200" : "text-gray-700"}>{resolvedConsentLabel}</span>
      </label>

      <button className={showMessage ? `${buttonClass} w-full` : `${buttonClass} md:col-start-2 md:row-start-1`} disabled={status === "loading"} type="submit">
        {status === "loading" ? labels.loading : buttonLabel}
      </button>

      {message ? (
        <p className={status === "success" ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-red-600"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function trackLead(eventName: "generate_lead" | "lead_fallback", source: string, segment?: string) {
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", event: string, params: Record<string, string>) => void;
  };

  analyticsWindow.gtag?.("event", eventName, {
    lead_source: source,
    lead_segment: segment ?? "unknown",
    page_path: window.location.pathname,
  });
}

function openEmailFallback(data: Record<string, FormDataEntryValue>, source: string) {
  const subject = encodeURIComponent(`[Calcolich] Nuovo contatto - ${source}`);
  const body = encodeURIComponent(
    [
      "Nuovo contatto Calcolich",
      "",
      `Fonte: ${source}`,
      `Data: ${new Date().toLocaleString("it-CH")}`,
      "",
      ...Object.entries(data)
        .filter(([key, value]) => key !== "website" && value)
        .map(([key, value]) => `${key}: ${value}`),
    ].join("\n"),
  );
  window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
}
