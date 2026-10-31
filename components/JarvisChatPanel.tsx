"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "jarvis";
  text: string;
};

export default function JarvisChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "jarvis",
      text: "Sono pronto. Scrivi per esempio: esegui SEO audit, fai tech check, testa notifiche, oppure crea un task.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const quickCommands = [
    "Esegui SEO audit",
    "Fai Tech check",
    "Testa notifiche",
    "Crea task: prepara piano azione crescita",
  ];

  async function sendMessage(text: string) {
    if (!text || loading) return;

    setMessages((current) => [...current, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/jarvis/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const payload = await response.json() as { reply?: string };
      setMessages((current) => [
        ...current,
        { role: "jarvis", text: payload.reply ?? "Ho ricevuto il comando, ma non ho una risposta leggibile." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "jarvis", text: "Non sono riuscito a completare il comando dalla dashboard." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input.trim());
  }

  return (
    <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Chat Jarvis</p>
        <h2 className="mt-1 text-2xl font-black">Parla con la dashboard</h2>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-xl bg-gray-50 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${
              message.role === "user"
                ? "ml-auto bg-gray-950 text-white"
                : "bg-white text-gray-800 shadow-sm"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quickCommands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => sendMessage(command)}
            disabled={loading}
            className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-wait disabled:opacity-60"
          >
            {command}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Scrivi a Jarvis..."
          className="min-h-12 flex-1 rounded-xl border border-gray-300 bg-white px-4 font-semibold outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="min-h-12 rounded-xl bg-gray-950 px-5 font-black text-white hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Invio..." : "Invia"}
        </button>
      </form>
    </section>
  );
}
