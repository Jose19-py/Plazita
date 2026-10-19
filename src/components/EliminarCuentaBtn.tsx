"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EliminarCuentaBtn() {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEliminar() {
    setCargando(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: rpcError } = await supabase.rpc("eliminar_mi_cuenta");

      if (rpcError) {
        setError(rpcError.message || "No se pudo eliminar la cuenta. Intenta de nuevo.");
        setCargando(false);
        return;
      }

      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado al procesar la solicitud.");
      setCargando(false);
    }
  }

  if (!confirmando) {
    return (
      <button
        type="button"
        onClick={() => setConfirmando(true)}
        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        Eliminar mi cuenta
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <h3 className="text-sm font-bold text-red-800">¿Estás seguro de que deseas eliminar tu cuenta?</h3>
      <p className="mt-1 text-xs text-red-700">
        Esta acción es permanente e irreversible: se eliminará tu usuario, tus emprendimientos asociados, productos cargados e información almacenada.
      </p>

      {error && <p className="mt-2 rounded bg-white p-2 text-xs text-red-600 font-medium">{error}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleEliminar}
          disabled={cargando}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {cargando ? "Eliminando cuenta..." : "Sí, eliminar definitivamente"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirmando(false);
            setError(null);
          }}
          disabled={cargando}
          className="btn btn-outline !py-1 text-xs"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
