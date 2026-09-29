import "./globals.css";

export const metadata = {
  title: "Nodus",
  description: "Documentación de prácticas de servicios en red",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}