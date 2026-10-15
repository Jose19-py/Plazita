import { createClient } from "@/lib/supabase/server";
import EmprendimientoCard from "@/components/EmprendimientoCard";
import { CATEGORIAS, type Emprendimiento } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; categoria?: string }> };

export default async function Explorar({ searchParams }: Props) {
  const { q = "", categoria = "" } = await searchParams;
  const supabase = await createClient();

  let consulta = supabase
    .from("emprendimientos")
    .select("*")
    .order("created_at", { ascending: false });

  const termino = q.replace(/[%,()]/g, " ").trim();
  if (termino) consulta = consulta.ilike("nombre", `%${termino}%`);
  if (categoria) consulta = consulta.eq("categoria", categoria);

  const { data } = await consulta;
  const lista = (data ?? []) as Emprendimiento[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Explorar emprendimientos</h1>
      <p className="mt-1 text-zinc-600">Descubre negocios y apoya el talento local.</p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/explorar">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre…"
          className="input sm:max-w-sm"
        />
        <select name="categoria" defaultValue={categoria} className="input sm:max-w-xs">
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-dark">
          Buscar
        </button>
      </form>

      <div className="mt-8">
        {lista.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
            No encontramos emprendimientos con esos filtros.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((e) => (
              <EmprendimientoCard key={e.id} e={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
