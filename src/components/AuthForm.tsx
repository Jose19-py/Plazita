"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/config/site";

type Props = { modo: "login" | "registro"; next?: string };

export default function AuthForm({ modo, next }: Props) {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
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

    if (esRegistro && !aceptaTerminos) {
      setError("Debes aceptar los términos y la política de privacidad para continuar.");
      return;
    }

    setCargando(true);
    const supabase = createClient();

    if (esRegistro) {
      const redirectTo = `${siteConfig.url}/auth/callback?next=${encodeURIComponent(destino)}`;
      const { data, error } = await supabase.auth.signUp({
        email: correo,
        password: clave,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        setError(traducir(error.message));
      } else if (data.session) {
        router.push(destino);
        router.refresh();
      } else {
        setAviso(
          "¡Cuenta creada! Revisa tu correo y haz clic en el enlace de confirmación para poder ingresar."
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
      if (error) {
        setError(traducir(error.message));
      } else {
        // Si el usuario es administrador y no viene con un "next" explícito distinto a /panel, redirige directo a /admin
        if (!next || next === "/panel") {
          const { data: esAdmin } = await supabase.rpc("is_admin");
          if (esAdmin) {
            router.push("/admin");
            router.refresh();
            setCargando(false);
            return;
          }
        }
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

      {esRegistro && (
        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
          />
          <span>
            Acepto los{" "}
            <Link href="/terminos" target="_blank" className="font-medium text-brand hover:underline">
              Términos de uso
            </Link>{" "}
            y la{" "}
            <Link href="/privacidad" target="_blank" className="font-medium text-brand hover:underline">
              Política de privacidad
            </Link>
          </span>
        </label>
      )}

      {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      {aviso && <p className="rounded-md bg-green-50 p-2 text-sm text-green-700">{aviso}</p>}

      <button type="submit" disabled={cargando} className="btn btn-primary w-full">
        {cargando ? "Procesando…" : esRegistro ? "Crear cuenta" : "Ingresar"}
      </button>

      {!esRegistro && (
        <p className="text-center text-sm">
          <Link href="/recuperar" className="text-zinc-500 hover:text-brand hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      )}

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
  if (m.includes("user already registered")) return "Ese correo ya tiene una cuenta.";
  if (m.includes("password should be")) return "La contraseña debe tener al menos 6 caracteres.";
  if (m.includes("unable to validate")) return "No se pudo validar el correo. Verifica que sea correcto.";
  return "Error inesperado. Inténtalo de nuevo.";
}

