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
        destination: "/calcolo-salario-orario-svizzera",
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
        destination: "/calcolo-affitto-sostenibile-svizzera",
        permanent: true,
      },
      {
        source: "/calcolatore-iva-svizzera",
        destination: "/calcolo-iva-svizzera",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
