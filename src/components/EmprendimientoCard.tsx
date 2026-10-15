import Link from "next/link";
import type { Emprendimiento } from "@/lib/types";

export default function EmprendimientoCard({ e }: { e: Emprendimiento }) {
  const imagen = e.portada_url || e.logo_url;

  return (
    <Link
      href={`/emprendimiento/${e.slug}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-lg"
    >
      <div className="aspect-[16/10] bg-zinc-100">
        {imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagen} alt={e.nombre} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-zinc-300">
            {e.nombre.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-4">
        {e.categoria && (
          <span className="mb-2 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
            {e.categoria}
          </span>
        )}
        <h3 className="font-semibold group-hover:text-brand">{e.nombre}</h3>
        {e.ciudad && <p className="text-sm text-zinc-500">{e.ciudad}</p>}
        {e.descripcion && (
          <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{e.descripcion}</p>
        )}
      </div>
    </Link>
  );
}
