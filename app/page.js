import Link from "next/link";

export default function Home() {
  return (
    <section className="intro">
      <img src="/logo.png" alt="Nodus logo" className="logo" />
      <h1>Nodus</h1>
      <p>Juan Barrera Arena · 2 SMR</p>
      <Link href="/practicas" className="btn">Entrar</Link>
    </section>
  );
}