"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Props = { modo: "login" | "registro"; next?: string };

export default function AuthForm({ modo, next }: Props) {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const destino = next && next.startsWith("/") ? next : "/panel";
  const esRegistro = modo === "registro";

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setAviso(null);

    if (clave.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);
    const supabase = createClient();

    if (esRegistro) {
      const { data, error } = await supabase.auth.signUp({ email: correo, password: clave });
      if (error) {
        setError(traducir(error.message));
      } else if (data.session) {
        router.push(destino);
        router.refresh();
      } else {
        setAviso("Cuenta creada. Revisa tu correo y confirma tu cuenta para poder ingresar.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
      if (error) {
        setError(traducir(error.message));
      } else {
        router.push(destino);
        router.refresh();
      }
    }
    setCargando(false);
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
      <div>
        <label className="mb-1 block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          required
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="input"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      {aviso && <p className="rounded-md bg-green-50 p-2 text-sm text-green-700">{aviso}</p>}

      <button type="submit" disabled={cargando} className="btn btn-primary w-full">
        {cargando ? "Procesando…" : esRegistro ? "Crear cuenta" : "Ingresar"}
      </button>

      <p className="text-center text-sm text-zinc-600">
        {esRegistro ? (
          <>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-medium text-brand hover:underline">
              Ingresar
            </Link>
          </>
        ) : (
          <>
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="font-medium text-brand hover:underline">
              Regístrate gratis
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function traducir(mensaje: string): string {
  const m = mensaje.toLowerCase();
  if (m.includes("invalid login")) return "Correo o contraseña incorrectos.";
  if (m.includes("already registered")) return "Ese correo ya tiene una cuenta.";
  if (m.includes("email not confirmed")) return "Debes confirmar tu correo antes de ingresar.";
  if (m.includes("rate limit")) return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";
  return mensaje;
}
