"use client";

import { useState } from "react";
import { getSiteUrl } from "@/lib/types";

type Props = {
  slug: string;
  nombre?: string;
};

export default function BotonCompartir({ slug, nombre }: Props) {
  const [copiado, setCopiado] = useState(false);

  async function manejarCompartir() {
    const origin = getSiteUrl();
    const shortUrl = `${origin}/e/${slug}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: nombre || "Plazita",
          text: `Conoce ${nombre || "este emprendimiento"} en Plazita:`,
          url: shortUrl,
        });
        return;
      } catch {
        // Si el usuario cancela o no es compatible, procedemos a copiar
      }
    }

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Error al copiar enlace:", err);
    }
  }

  return (
    <button
      type="button"
      onClick={manejarCompartir}
      title="Copiar enlace corto de este emprendimiento"
      className="btn btn-outline text-sm !py-2 !px-3.5 text-zinc-700 hover:text-zinc-900"
    >
      {copiado ? (
        <>
          <span className="text-emerald-600">✓</span>
          <span className="text-emerald-600 font-medium">¡Enlace copiado!</span>
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>Compartir</span>
        </>
      )}
    </button>
  );
}
