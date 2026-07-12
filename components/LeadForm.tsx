"use client";

import { useState } from "react";
import { getAttributedSource } from "@/components/CommercialTracking";
import { sendAnalyticsEvent } from "@/lib/analytics-events";

const fallbackEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "calcolich@gmail.com";

type LeadFormProps = {
  source: string;
  buttonLabel: string;
  dark?: boolean;
  showName?: boolean;
  showPhone?: boolean;
  showCompany?: boolean;
  showSiteUrl?: boolean;
  showPackage?: boolean;
  showMessage?: boolean;
  packageOptions?: string[];
};

const defaultPackageOptions = ["Starter - CHF 490", "Business - CHF 990", "Premium - CHF 1.990"];

export default function LeadForm({
  source,
  buttonLabel,
  dark = false,
  showName = false,
  showPhone = false,
  showCompany = false,
  showSiteUrl = false,
  showPackage = false,
  showMessage = false,
  packageOptions = defaultPackageOptions,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const attributedSource = getAttributedSource(source);
    sendAnalyticsEvent("lead_submit", { source: attributedSource });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: attributedSource,
          page: window.location.href,
        }),
      });

      const result = await response.json();
      if (result.emailFallback) {
        trackLead("lead_fallback", attributedSource);
        openEmailFallback(data, attributedSource);
        form.reset();
        setStatus("success");
        setMessage("Si apre una bozza email: inviala per completare la richiesta.");
        return;
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Invio non riuscito.");
      }

      if (!result.configured) {
        trackLead("lead_fallback", attributedSource);
        openEmailFallback(data, attributedSource);
        form.reset();
        setStatus("success");
        setMessage("Si apre una bozza email: inviala per completare la richiesta.");
        return;
      }

      form.reset();
      trackLead("generate_lead", attributedSource);
      setStatus("success");
      setMessage("Richiesta ricevuta. Ti ricontatto presto.");
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
    <form onSubmit={submitLead} className={showMessage ? "mt-5 space-y-4" : "mt-5 grid gap-3 md:grid-cols-[1fr_auto]"}>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      {showName ? <input className={inputClass} name="name" placeholder="Nome" autoComplete="name" /> : null}
      {showCompany ? <input className={inputClass} name="company" placeholder="Azienda / attivita" autoComplete="organization" /> : null}
      {showSiteUrl ? <input className={inputClass} name="siteUrl" placeholder="iltuosito.ch" type="text" inputMode="url" autoComplete="url" required /> : null}
      <input className={inputClass} name="email" placeholder="La tua email" type="email" autoComplete="email" required />
      {showPhone ? <input className={inputClass} name="phone" placeholder="Telefono / WhatsApp" autoComplete="tel" /> : null}
      {showPackage ? (
        <select className={inputClass} name="packageName" defaultValue={packageOptions[0]}>
          {packageOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : null}
      {showMessage ? (
        <textarea className={`${inputClass} min-h-32`} name="message" placeholder="Di cosa hai bisogno?" />
      ) : null}

      <button className={showMessage ? `${buttonClass} w-full` : buttonClass} disabled={status === "loading"} type="submit">
        {status === "loading" ? "Invio..." : buttonLabel}
      </button>

      {message ? (
        <p className={status === "success" ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-red-600"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function trackLead(eventName: "generate_lead" | "lead_fallback", source: string) {
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", event: string, params: Record<string, string>) => void;
  };

  analyticsWindow.gtag?.("event", eventName, {
    lead_source: source,
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
