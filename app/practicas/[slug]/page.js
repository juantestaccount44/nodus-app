import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

function formatearTitulo(slug) {
  return slug
    .replace(/^\d+-/, "")
    .split("-")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function formatearNumero(slug) {
  const match = slug.match(/^(\d+)/);
  return match ? match[1] : "";
}

export default async function PracticaDetalle({ params }) {
  const { slug } = await params;
  const carpeta = path.join(process.cwd(), "public", "pdfs");
  const archivos = fs.readdirSync(carpeta).filter(f => f.endsWith(".pdf"));
  const archivo = archivos.find(f => f.replace(".pdf", "") === slug);

  if (!archivo) {
    notFound();
  }

  const titulo = formatearTitulo(slug);
  const numero = formatearNumero(slug);
  const rutaPdf = `/pdfs/${archivo}`;

  return (
    <>
      <header className="topbar">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="Nodus" className="brand-logo" />
          <span>Nodus</span>
        </Link>
        <Link href="/practicas" className="back">← Volver</Link>
      </header>

      <main className="practica-detalle">
        <div className="detalle-header">
          <span className="num">{numero}</span>
          <h1>{titulo}</h1>
          <a href={rutaPdf} target="_blank" rel="noreferrer" className="btn-abrir">
            Abrir en pestaña nueva
          </a>
        </div>

        <div className="visor">
          <iframe src={rutaPdf} title={titulo} />
        </div>
      </main>
    </>
  );
}