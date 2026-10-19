import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Emprendimiento } from "@/lib/types";
import CambiarClaveForm from "@/components/CambiarClaveForm";
import EliminarCuentaBtn from "@/components/EliminarCuentaBtn";

export const dynamic = "force-dynamic";

export default async function Panel() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/panel");

  const { data } = await supabase
    .from("emprendimientos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  const lista = (data ?? []) as Emprendimiento[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Mi panel</h1>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </div>
        <Link href="/panel/nuevo" className="btn btn-primary">
          + Crear emprendimiento
        </Link>
      </div>

      <section className="mt-6">
        <CambiarClaveForm />
      </section>

      <div className="mt-8 space-y-3">
        {lista.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
            Aún no has creado ningún emprendimiento.
          </p>
        ) : (
          lista.map((e) => (
            <div
              key={e.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-200 p-4"
            >
              <div>
                <p className="font-semibold">{e.nombre}</p>
                <p className="text-sm text-zinc-500">
                  {[e.categoria, e.ciudad].filter(Boolean).join(" · ") || "Sin categoría"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/emprendimiento/${e.slug}`} className="btn btn-outline !py-1.5">
                  Ver página
                </Link>
                <Link href={`/panel/${e.id}`} className="btn btn-dark !py-1.5">
                  Administrar
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <section className="mt-16 border-t border-zinc-200 pt-8">
        <h2 className="text-sm font-semibold text-zinc-500">Zona de cuenta</h2>
        <p className="mt-1 text-xs text-zinc-400">
          Si deseas darte de baja definitivamente y suprimir tus datos personales de Plazita.
        </p>
        <div className="mt-3">
          <EliminarCuentaBtn />
        </div>
      </section>
    </div>
  );
}
