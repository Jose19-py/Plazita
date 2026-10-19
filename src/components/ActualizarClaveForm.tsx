"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ActualizarClaveForm() {
  const router = useRouter();
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (clave.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (clave !== clave2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: clave });

    if (error) {
      setError("No se pudo actualizar la contraseña. El enlace puede haber expirado. Solicita uno nuevo.");
    } else {
      setExito(true);
      setTimeout(() => router.push("/panel"), 2500);
    }
    setCargando(false);
  }

  if (exito) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">¡Contraseña actualizada!</p>
        <p className="mt-2 text-sm text-green-700">Redirigiendo a tu panel…</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nueva contraseña</label>
        <input
          type="password"
          required
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="input"
          placeholder="Mínimo 6 caracteres"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Confirmar contraseña</label>
        <input
          type="password"
          required
          value={clave2}
          onChange={(e) => setClave2(e.target.value)}
          className="input"
          placeholder="Repite la contraseña"
        />
      </div>
      {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={cargando} className="btn btn-primary w-full">
        {cargando ? "Guardando…" : "Guardar nueva contraseña"}
      </button>
    </form>
  );
}
