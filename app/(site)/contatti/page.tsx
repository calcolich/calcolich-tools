import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contatti | Calcolich",
  description: "Contatta Calcolich per segnalazioni, suggerimenti sui calcolatori o richieste di sviluppo siti e strumenti online.",
  alternates: {
    canonical: "https://www.calcolich.ch/contatti",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#f6f8fb] px-5 py-10 text-gray-950 md:px-10">
      <section className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <p className="mb-4 text-xs font-black uppercase tracking-wide text-emerald-700">Contatti</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Segnalazioni, idee e richieste.</h1>
        <p className="mt-5 text-lg leading-8 text-gray-700">
          Hai trovato un errore, vuoi proporre un nuovo calcolatore o ti serve un sito simile per acquisire lead?
          Lascia un messaggio e descrivi cosa ti serve.
        </p>
        <LeadForm source="contact-page" buttonLabel="Invia richiesta" showName showMessage showPhone />
      </section>
    </main>
  );
}
