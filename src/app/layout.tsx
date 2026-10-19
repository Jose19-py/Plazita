import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${siteConfig.nombre} · Tu emprendimiento tiene su propia plazita`,
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
          {siteConfig.nombre} · Plataforma web para emprendimientos · {siteConfig.ciudad}, {siteConfig.pais}
          {" · "}
          <Link href="/terminos" className="hover:text-brand hover:underline">Términos</Link>
          {" · "}
          <Link href="/privacidad" className="hover:text-brand hover:underline">Privacidad</Link>
        </footer>
      </body>
    </html>
  );
}
