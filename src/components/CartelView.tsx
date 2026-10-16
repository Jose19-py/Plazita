"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { getSiteUrl, type Emprendimiento } from "@/lib/types";

type Props = {
  emp: Emprendimiento;
};

export default function CartelView({ emp }: Props) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string>("");

  useEffect(() => {
    const origin = getSiteUrl();
    const url = `${origin}/e/${emp.slug}`;
    const qrTarget = `${url}?ref=qr`;
    setShortUrl(url);

    QRCode.toDataURL(qrTarget, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 600,
      color: {
        dark: "#111111",
        light: "#ffffff",
      },
    })
      .then((dataUrl) => setQrUrl(dataUrl))
      .catch((err) => console.error("Error al generar QR del cartel:", err));
  }, [emp.slug]);

  function imprimir() {
    window.print();
  }

  return (
    <div>
      {/* Barra de controles (oculta al imprimir) */}
      <div className="print:hidden border-b border-zinc-200 bg-zinc-50 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
          <Link
            href={`/panel/${emp.id}`}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            ← Volver al panel
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-zinc-500">
              Formato Carta (Letter) listo para imprimir
            </span>
            <button onClick={imprimir} className="btn btn-primary !py-2 !px-5 shadow">
              🖨️ Imprimir cartel
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor del Cartel */}
      <div className="mx-auto my-8 max-w-[700px] px-4 print:m-0 print:max-w-none print:p-0">
        <div className="relative flex min-h-[900px] flex-col items-center justify-between rounded-3xl border-2 border-zinc-900 bg-white p-10 text-center shadow-lg print:min-h-screen print:rounded-none print:border-none print:p-8 print:shadow-none">
          
          {/* Encabezado del emprendimiento */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            {emp.logo_url ? (
              <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-zinc-200 bg-white p-1 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={emp.logo_url}
                  alt={`Logo de ${emp.nombre}`}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-zinc-900 text-4xl font-extrabold text-white">
                {emp.nombre.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                {emp.nombre}
              </h1>
              {(emp.categoria || emp.ciudad) && (
                <p className="mt-2 text-base font-medium text-zinc-500">
                  {[emp.categoria, emp.ciudad].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>

          {/* Sección central: QR y llamado a la acción */}
          <div className="my-8 flex flex-col items-center">
            <div className="rounded-full bg-brand/10 px-6 py-2 text-base font-bold uppercase tracking-wider text-brand">
              Escanea para ver nuestro catálogo
            </div>

            <div className="mt-6 flex h-72 w-72 sm:h-80 sm:w-80 items-center justify-center rounded-3xl border-4 border-zinc-900 bg-white p-4 shadow-xl print:shadow-none">
              {qrUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrUrl}
                  alt={`Código QR para ver el catálogo de ${emp.nombre}`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-sm text-zinc-400">Generando código QR…</span>
              )}
            </div>

            <p className="mt-4 font-mono text-sm font-semibold text-zinc-700">
              {shortUrl.replace(/^https?:\/\//, "")}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Apunta con la cámara de tu celular para abrirlo al instante
            </p>
          </div>

          {/* Pie del cartel */}
          <div className="w-full border-t border-zinc-200 pt-6 pb-2 text-center">
            <p className="text-xs text-zinc-400">
              Encuéntranos en
            </p>
            <p className="mt-1 text-base font-bold tracking-tight text-zinc-900">
              Plaz<span className="text-brand">ita</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
