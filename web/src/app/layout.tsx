import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcanum Coffee",
  description: "Café de especialidad con alma artesanal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-stone-950 text-stone-100 antialiased">{children}</body>
    </html>
  );
}
