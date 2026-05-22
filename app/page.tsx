export default function Home() {
  const tools = [
    {
      title: "Calcolo IVA Svizzera",
      description: "Calcola rapidamente IVA inclusa o esclusa.",
      link: "/calcolo-iva-svizzera",
    },
    {
      title: "Scorporo IVA",
      description: "Rimuovi l’IVA da un importo.",
      link: "/scorporo-iva-svizzera",
    },
    {
      title: "Calcolo Ore Lavoro",
      description: "Calcola ore lavorative e pause.",
      link: "/calcolo-ore-lavoro",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Calcolich
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Calcolatori gratuiti per la Svizzera.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.link}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {tool.title}
              </h2>

              <p className="text-gray-600">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}