"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CambiarClaveForm() {
  const [nueva, setNueva] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (nueva.length < 6) { setError("Mínimo 6 caracteres."); return; }
    if (nueva !== confirmacion) { setError("Las contraseñas no coinciden."); return; }

    setCargando(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: nueva });
    if (error) {
      setError("No se pudo actualizar la contraseña. Inténtalo de nuevo.");
    } else {
      setExito(true);
      setNueva("");
      setConfirmacion("");
      setTimeout(() => { setExito(false); setAbierto(false); }, 3000);
    }
    setCargando(false);
  }

  if (!abierto) {
    return (
      <button onClick={() => setAbierto(true)} className="btn btn-outline">
        Cambiar contraseña
      </button>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-3 rounded-xl border border-zinc-200 p-4">
      <p className="font-medium">Cambiar contraseña</p>
      <div>
        <label className="mb-1 block text-sm font-medium">Nueva contraseña</label>
        <input
          type="password"
          required
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          className="input"
          placeholder="Mínimo 6 caracteres"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Confirmar contraseña</label>
        <input
          type="password"
          required
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          className="input"
          placeholder="Repite la contraseña"
        />
      </div>
      {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      {exito && <p className="rounded-md bg-green-50 p-2 text-sm text-green-700">¡Contraseña actualizada correctamente!</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={cargando} className="btn btn-primary">
          {cargando ? "Guardando…" : "Guardar"}
        </button>
        <button type="button" onClick={() => setAbierto(false)} className="btn btn-outline">
          Cancelar
        </button>
      </div>
    </form>
  );
}
