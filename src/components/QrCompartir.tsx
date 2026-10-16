"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { getSiteUrl } from "@/lib/types";

type Props = {
  slug: string;
  nombre?: string;
  cartelHref?: string;
};

export default function QrCompartir({ slug, nombre = "Emprendimiento", cartelHref }: Props) {
  const [urlCorta, setUrlCorta] = useState("");
  const [urlQr, setUrlQr] = useState("");
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [descargando, setDescargando] = useState(false);

  useEffect(() => {
    const origin = getSiteUrl();
    const shortUrl = `${origin}/e/${slug}`;
    const qrTarget = `${shortUrl}?ref=qr`;
    setUrlCorta(shortUrl);
    setUrlQr(qrTarget);

    // Generar vista previa del QR
    QRCode.toDataURL(qrTarget, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 320,
      color: {
        dark: "#111111",
        light: "#ffffff",
      },
    })
      .then((dataUrl) => setQrPreview(dataUrl))
      .catch((err) => console.error("Error generando QR:", err));
  }, [slug]);

  async function descargarPng() {
    if (!urlQr) return;
    setDescargando(true);
    try {
      // Alta resolución: mínimo 1024 px
      const hdUrl = await QRCode.toDataURL(urlQr, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 1024,
        color: {
          dark: "#111111",
          light: "#ffffff",
        },
      });

      const enlace = document.createElement("a");
      enlace.href = hdUrl;
      enlace.download = `qr-${slug}-1024px.png`;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
    } catch (e) {
      console.error("Error descargando PNG:", e);
    } finally {
      setDescargando(false);
    }
  }

  async function descargarSvg() {
    if (!urlQr) return;
    setDescargando(true);
    try {
      const svgString = await QRCode.toString(urlQr, {
        type: "svg",
        errorCorrectionLevel: "M",
        margin: 2,
        color: {
          dark: "#111111",
          light: "#ffffff",
        },
      });

      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const blobUrl = URL.createObjectURL(blob);
      const enlace = document.createElement("a");
      enlace.href = blobUrl;
      enlace.download = `qr-${slug}.svg`;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Error descargando SVG:", e);
    } finally {
      setDescargando(false);
    }
  }

  async function copiarEnlace() {
    if (!urlCorta) return;
    try {
      await navigator.clipboard.writeText(urlCorta);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch (err) {
      console.error("No se pudo copiar el enlace:", err);
    }
  }

  function compartirWhatsApp() {
    if (!urlCorta) return;
    const mensaje = `¡Hola! Conoce nuestro catálogo y novedades en Plazita: ${urlCorta}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Vista previa del QR */}
        <div className="flex flex-col items-center">
          <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-inner">
            {qrPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrPreview} alt={`Código QR para ${nombre}`} className="h-full w-full object-contain" />
            ) : (
              <span className="text-xs text-zinc-400">Generando QR…</span>
            )}
          </div>
          <span className="mt-2 text-xs text-zinc-500">Nivel de corrección M</span>
        </div>

        {/* Acciones e información */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Enlace corto de tu emprendimiento
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={urlCorta || "Cargando…"}
                className="input !bg-zinc-50 font-mono text-sm text-zinc-800"
              />
              <button
                type="button"
                onClick={copiarEnlace}
                className="btn btn-primary shrink-0 !py-2 !px-3 text-sm"
              >
                {copiado ? "✓ Copiado" : "Copiar"}
              </button>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Usa este enlace corto para ponerlo en tu perfil de Instagram, biografía o tarjetas.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={descargarPng}
              disabled={descargando || !qrPreview}
              className="btn btn-dark !py-1.5 !px-3 text-xs sm:text-sm"
            >
              Descargar PNG (1024 px)
            </button>
            <button
              type="button"
              onClick={descargarSvg}
              disabled={descargando || !qrPreview}
              className="btn btn-outline !py-1.5 !px-3 text-xs sm:text-sm"
            >
              Descargar SVG (vectorial)
            </button>
            <button
              type="button"
              onClick={compartirWhatsApp}
              className="btn btn-outline !py-1.5 !px-3 text-xs sm:text-sm text-emerald-700 hover:bg-emerald-50"
            >
              Compartir en WhatsApp
            </button>
            {cartelHref && (
              <a
                href={cartelHref}
                className="btn btn-outline !py-1.5 !px-3 text-xs sm:text-sm text-brand border-brand/30 hover:bg-brand/5"
              >
                Ver cartel imprimible →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
