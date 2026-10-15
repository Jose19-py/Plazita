import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EmprendeHub · Tu emprendimiento tiene su propio espacio",
  description:
    "Plataforma gratuita donde cualquier emprendimiento crea su perfil, publica su catálogo y llega a más clientes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <footer className="mt-20 border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
          EmprendeHub · Plataforma web para emprendimientos · Proyecto de Desarrollo de software
        </footer>
      </body>
    </html>
  );
}
