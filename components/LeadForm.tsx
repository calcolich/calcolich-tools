"use client";

import { useState } from "react";

const fallbackEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "calcolich@gmail.com";

type LeadFormProps = {
  source: string;
  buttonLabel: string;
  dark?: boolean;
  showName?: boolean;
  showPhone?: boolean;
  showPackage?: boolean;
  showMessage?: boolean;
};

export default function LeadForm({
  source,
  buttonLabel,
  dark = false,
  showName = false,
  showPhone = false,
  showPackage = false,
  showMessage = false,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          source,
          page: window.location.href,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Invio non riuscito.");
      }

      if (!result.configured) {
        const subject = encodeURIComponent(`Nuovo contatto Calcolich - ${source}`);
        const body = encodeURIComponent(
          Object.entries(data)
            .filter(([, value]) => value)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n"),
        );
        window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      }

      form.reset();
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

      {showName ? <input className={inputClass} name="name" placeholder="Nome" /> : null}
      <input className={inputClass} name="email" placeholder="La tua email" type="email" />
      {showPhone ? <input className={inputClass} name="phone" placeholder="Telefono / WhatsApp" /> : null}
      {showPackage ? (
        <select className={inputClass} name="packageName" defaultValue="Business - 990">
          <option>Starter - 490</option>
          <option>Business - 990</option>
          <option>Premium - 1.990</option>
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
