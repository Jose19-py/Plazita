"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/config/site";

export default function RecuperarForm() {
  const [correo, setCorreo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);

    const supabase = createClient();
    const redirectTo = `${siteConfig.url}/auth/callback?next=/actualizar-clave`;
    const { error } = await supabase.auth.resetPasswordForEmail(correo, { redirectTo });

    if (error) {
      setError("No se pudo enviar el correo. Verifica la dirección e inténtalo de nuevo.");
    } else {
      setEnviado(true);
    }
    setCargando(false);
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">¡Correo enviado!</p>
        <p className="mt-2 text-sm text-green-700">
          Revisa tu bandeja de entrada (y la carpeta de spam). El enlace expira en 1 hora.
        </p>
        <Link href="/login" className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
          Volver al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Correo electrónico</label>
        <input
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="input"
          placeholder="tucorreo@ejemplo.com"
        />
      </div>
      {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={cargando} className="btn btn-primary w-full">
        {cargando ? "Enviando…" : "Enviar enlace de recuperación"}
      </button>
      <p className="text-center text-sm text-zinc-600">
        <Link href="/login" className="font-medium text-brand hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </form>
  );
}
