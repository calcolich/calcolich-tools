import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/calcolatore-percentuale-lavoro-svizzera",
        destination: "/calcolo-percentuale-lavoro-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-ferie-percentuale-svizzera",
        destination: "/calcolo-ferie-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-salario-orario-svizzera",
        destination: "/it/calcolatore-salario-orario-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-giorni-lavorativi-svizzera",
        destination: "/calcolo-giorni-lavorativi-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-13esima-svizzera",
        destination: "/calcolo-tredicesima-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-ferie-part-time-svizzera",
        destination: "/calcolo-ferie-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-affitto-massimo-svizzera",
        destination: "/it/calcolatore-affitto-sostenibile-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-iva-svizzera",
        destination: "/calcolo-iva-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-imposta-alla-fonte-svizzera",
        destination: "/it/calcolatore-imposta-alla-fonte-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-cassa-malati-svizzera",
        destination: "/it/calcolatore-cassa-malati-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-affitto-sostenibile-svizzera",
        destination: "/it/calcolatore-affitto-sostenibile-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-salario-orario-svizzera",
        destination: "/it/calcolatore-salario-orario-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-salario-part-time-svizzera",
        destination: "/it/calcolatore-salario-part-time-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-terzo-pilastro-risparmio-fiscale",
        destination: "/it/calcolatore-terzo-pilastro-risparmio-fiscale",
        permanent: true,
      },
      {
        source: "/calcolo-budget-mensile",
        destination: "/it/calcolatore-budget-mensile-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-spese-auto-svizzera",
        destination: "/it/calcolatore-spese-auto-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-fattura-freelance",
        destination: "/it/calcolatore-tariffa-freelance-svizzera",
        permanent: true,
      },
      {
        source: "/calcolo-prezzo-vendita",
        destination: "/it/calcolatore-prezzo-vendita",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
