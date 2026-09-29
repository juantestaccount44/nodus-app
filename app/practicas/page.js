import Link from "next/link";
import fs from "fs";
import path from "path";

function formatearTitulo(nombreArchivo) {
  // "01-introduccion.pdf" -> "Introduccion"
  const sinExtension = nombreArchivo.replace(".pdf", "");
  const sinNumero = sinExtension.replace(/^\d+-/, "");
  return sinNumero
    .split("-")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function formatearNumero(nombreArchivo) {
  const match = nombreArchivo.match(/^(\d+)/);
  return match ? match[1] : "";
}

export default function Practicas() {
  const carpeta = path.join(process.cwd(), "public", "pdfs");
  const archivos = fs.readdirSync(carpeta).filter(f => f.endsWith(".pdf"));
  const practicas = archivos.sort().map(archivo => ({
    archivo,
    titulo: formatearTitulo(archivo),
    numero: formatearNumero(archivo),
  }));

  return (
    <>
      <header className="topbar">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="Nodus" className="brand-logo" />
          <span>Nodus</span>
        </Link>
        <Link href="/" className="back">← Volver</Link>
      </header>

      <main className="practicas">
        <h2>Prácticas</h2>
        <p className="subtitulo">Documentación de servicios en red · 2 SMR</p>

        <div className="grid">
          {practicas.map(p => (
            <Link
              key={p.archivo}
              href={`/practicas/${p.archivo.replace(".pdf", "")}`}
              className="card"
            >
              <span className="num">{p.numero}</span>
              <h3>{p.titulo}</h3>
              <p>PDF · Práctica {p.numero}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}