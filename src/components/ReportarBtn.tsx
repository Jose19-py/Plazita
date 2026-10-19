"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MOTIVOS = [
  "Información falsa o engañosa",
  "Contenido ofensivo o inapropiado",
  "Spam o publicidad no deseada",
  "Actividad ilegal o prohibida",
  "Suplantación de identidad o derechos de autor",
  "Otro",
];

type Props = {
  emprendimientoId: string;
  nombreEmprendimiento: string;
};

export default function ReportarBtn({ emprendimientoId, nombreEmprendimiento }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [motivo, setMotivo] = useState(MOTIVOS[0]);
  const [detalle, setDetalle] = useState("");
  const [correo, setCorreo] = useState("");
  // Campo trampa (honeypot) para bots y spammers automatizados
  const [telefonoBot, setTelefonoBot] = useState("");
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReportar(e: React.FormEvent) {
    e.preventDefault();

    // Si un bot completó el campo trampa, simulamos éxito sin insertar nada
    if (telefonoBot.trim() !== "") {
      setEnviado(true);
      return;
    }

    setCargando(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("reportes").insert({
      emprendimiento_id: emprendimientoId,
      motivo,
      detalle: detalle.trim() || null,
      correo_reportante: correo.trim() || null,
    });

    if (insertError) {
      setError("No pudimos enviar tu reporte en este momento. Intenta nuevamente.");
      setCargando(false);
      return;
    }

    setEnviado(true);
    setCargando(false);
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-xs text-zinc-400 hover:text-red-600 transition-colors underline"
      >
        Reportar
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-left">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h2 className="text-base font-bold text-ink">Reportar emprendimiento</h2>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="text-zinc-400 hover:text-zinc-600 font-bold"
          >
            ✕
          </button>
        </div>

        {enviado ? (
          <div className="mt-4 rounded-xl bg-green-50 p-4 text-center text-sm text-green-800">
            <p className="font-semibold">¡Reporte recibido!</p>
            <p className="mt-1 text-xs text-green-700">
              Agradecemos tu colaboración para mantener seguro el espacio en {nombreEmprendimiento}. Nuestro equipo de moderación lo revisará.
            </p>
            <button
              type="button"
              onClick={() => {
                setEnviado(false);
                setAbierto(false);
              }}
              className="btn btn-outline mt-4 !py-1 text-xs"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleReportar} className="mt-4 space-y-4">
            <p className="text-xs text-zinc-500">
              Estás reportando a: <strong className="text-ink">{nombreEmprendimiento}</strong>
            </p>

            {/* Campo invisible anti-spam */}
            <div className="hidden" aria-hidden="true">
              <label>No llenar este campo</label>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={telefonoBot}
                onChange={(e) => setTelefonoBot(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-700">Motivo del reporte</label>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="input text-sm"
                required
              >
                {MOTIVOS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-700">
                Detalle o explicación (opcional)
              </label>
              <textarea
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                className="input text-sm min-h-[70px] resize-y"
                placeholder="Indica qué norma incumple o qué sucedió..."
                maxLength={400}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-700">
                Tu correo electrónico (opcional)
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="input text-sm"
                placeholder="Por si necesitamos contactarte"
              />
            </div>

            {error && <p className="rounded bg-red-50 p-2 text-xs text-red-600">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="btn btn-outline !py-1.5 text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="btn btn-primary !py-1.5 text-xs"
              >
                {cargando ? "Enviando..." : "Enviar reporte"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
