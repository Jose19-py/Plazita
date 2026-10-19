"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Reporte } from "@/lib/types";

type Props = {
  reportesIniciales: Reporte[];
};

export default function AdminPanel({ reportesIniciales }: Props) {
  const router = useRouter();
  const [reportes, setReportes] = useState<Reporte[]>(reportesIniciales);
  const [cargandoId, setCargandoId] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: "exito" | "error" } | null>(null);

  function notificar(texto: string, tipo: "exito" | "error" = "exito") {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3500);
  }

  async function handleCambiarEstado(empId: string, nuevoEstado: "activo" | "oculto") {
    setCargandoId(`estado-${empId}`);
    const supabase = createClient();

    const { error } = await supabase
      .from("emprendimientos")
      .update({ estado: nuevoEstado })
      .eq("id", empId);

    if (error) {
      notificar("No se pudo actualizar el estado: " + error.message, "error");
    } else {
      notificar(`Emprendimiento marcado como ${nuevoEstado}.`);
      setReportes((prev) =>
        prev.map((r) =>
          r.emprendimiento_id === empId
            ? {
                ...r,
                emprendimientos: r.emprendimientos
                  ? { ...r.emprendimientos, estado: nuevoEstado }
                  : null,
              }
            : r
        )
      );
      router.refresh();
    }
    setCargandoId(null);
  }

  async function handleEliminarEmprendimiento(empId: string, nombre?: string) {
    const confirmar = window.confirm(
      `¿Estás seguro de ELIMINAR definitivamente el emprendimiento "${nombre || empId}"? Se borrarán sus productos y datos asociados.`
    );
    if (!confirmar) return;

    setCargandoId(`borrar-${empId}`);
    const supabase = createClient();

    const { error } = await supabase.from("emprendimientos").delete().eq("id", empId);

    if (error) {
      notificar("Error al eliminar emprendimiento: " + error.message, "error");
    } else {
      notificar("Emprendimiento eliminado con éxito.");
      setReportes((prev) => prev.filter((r) => r.emprendimiento_id !== empId));
      router.refresh();
    }
    setCargandoId(null);
  }

  async function handleResolverReporte(reporteId: string) {
    setCargandoId(`resolver-${reporteId}`);
    const supabase = createClient();

    const { error } = await supabase
      .from("reportes")
      .update({ resuelto: true })
      .eq("id", reporteId);

    if (error) {
      notificar("Error al actualizar reporte: " + error.message, "error");
    } else {
      notificar("Reporte archivado como resuelto.");
      setReportes((prev) =>
        prev.map((r) => (r.id === reporteId ? { ...r, resuelto: true } : r))
      );
    }
    setCargandoId(null);
  }

  const pendientes = reportes.filter((r) => !r.resuelto);
  const resueltos = reportes.filter((r) => r.resuelto);

  return (
    <div className="space-y-8">
      {mensaje && (
        <div
          className={`fixed bottom-5 right-5 z-50 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition-all ${
            mensaje.tipo === "exito"
              ? "bg-brand text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Reportes pendientes ({pendientes.length})</h2>
        </div>

        {pendientes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center text-sm text-zinc-500">
            No hay reportes sin resolver en este momento.
          </div>
        ) : (
          <div className="space-y-4">
            {pendientes.map((rep) => {
              const emp = rep.emprendimientos;
              const estaOculto = emp?.estado === "oculto";

              return (
                <div
                  key={rep.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">
                          {emp?.nombre || "Emprendimiento no disponible o eliminado"}
                        </span>
                        {estaOculto && (
                          <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                            OCULTO
                          </span>
                        )}
                        {!estaOculto && emp && (
                          <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                            ACTIVO
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-zinc-700">
                        <strong className="text-zinc-900">Motivo:</strong> {rep.motivo}
                      </p>

                      {rep.detalle && (
                        <p className="mt-1 text-sm text-zinc-600 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                          {rep.detalle}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                        {rep.correo_reportante && (
                          <span>Contacto: {rep.correo_reportante}</span>
                        )}
                        <span>
                          Fecha: {new Date(rep.created_at).toLocaleString("es-CO")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:self-start">
                      {emp?.slug && (
                        <Link
                          href={`/emprendimiento/${emp.slug}`}
                          target="_blank"
                          className="btn btn-outline !py-1 text-xs"
                        >
                          Ver perfil
                        </Link>
                      )}

                      {estaOculto ? (
                        <button
                          type="button"
                          onClick={() => handleCambiarEstado(rep.emprendimiento_id, "activo")}
                          disabled={cargandoId === `estado-${rep.emprendimiento_id}`}
                          className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-800 hover:bg-green-200 transition-colors disabled:opacity-50"
                        >
                          Restaurar
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleCambiarEstado(rep.emprendimiento_id, "oculto")}
                          disabled={cargandoId === `estado-${rep.emprendimiento_id}`}
                          className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-200 transition-colors disabled:opacity-50"
                        >
                          Ocultar
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleEliminarEmprendimiento(rep.emprendimiento_id, emp?.nombre)
                        }
                        disabled={cargandoId === `borrar-${rep.emprendimiento_id}`}
                        className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                      >
                        Eliminar
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResolverReporte(rep.id)}
                        disabled={cargandoId === `resolver-${rep.id}`}
                        className="rounded-lg bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand/20 transition-colors disabled:opacity-50"
                      >
                        Marcar resuelto
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {resueltos.length > 0 && (
        <section className="pt-6 border-t border-zinc-200">
          <h2 className="text-sm font-bold text-zinc-500 mb-3">
            Historial de reportes resueltos ({resueltos.length})
          </h2>
          <div className="space-y-2">
            {resueltos.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-500"
              >
                <span>
                  <strong>{r.emprendimientos?.nombre || "Emprendimiento"}</strong> — {r.motivo}
                </span>
                <span>{new Date(r.created_at).toLocaleDateString("es-CO")}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
