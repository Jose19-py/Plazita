import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EmprendimientoCard from "@/components/EmprendimientoCard";
import type { Emprendimiento } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("emprendimientos")
    .select("*")
    .eq("estado", "activo")
    .order("created_at", { ascending: false })
    .limit(6);
  const destacados = (data ?? []) as Emprendimiento[];

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Tu emprendimiento merece su propia <span className="text-brand">plazita</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
            Crea gratis el perfil de tu negocio, publica tu catálogo con precios y deja que
            tus clientes te escriban directo por WhatsApp. Sin conocimientos técnicos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/panel/nuevo" className="btn btn-primary !px-6 !py-3 text-base">
              Crear emprendimiento
            </Link>
            <Link href="/explorar" className="btn !px-6 !py-3 text-base text-white ring-1 ring-white/30 hover:bg-white/10">
              Explorar emprendimientos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            ["1. Regístrate", "Crea tu cuenta con tu correo y una contraseña segura."],
            ["2. Crea tu espacio", "Cuenta quién eres, sube tu logo y agrega tus productos o servicios."],
            ["3. Comparte tu enlace", "Cada emprendimiento tiene su propia página para compartir en redes."],
          ].map(([titulo, texto]) => (
            <div key={titulo} className="rounded-xl border border-zinc-200 p-6">
              <h3 className="font-semibold text-brand">{titulo}</h3>
              <p className="mt-2 text-sm text-zinc-600">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Emprendimientos recientes</h2>
          <Link href="/explorar" className="text-sm font-medium text-brand hover:underline">
            Ver todos →
          </Link>
        </div>
        {destacados.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
            Aún no hay emprendimientos publicados. ¡Sé el primero en crear el tuyo!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((e) => (
              <EmprendimientoCard key={e.id} e={e} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
