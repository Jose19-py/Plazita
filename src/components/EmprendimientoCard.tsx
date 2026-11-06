import Link from "next/link";
import type { Emprendimiento } from "@/lib/types";

export default function EmprendimientoCard({ e }: { e: Emprendimiento }) {
  const imagen = e.portada_url || e.logo_url;
  const demo = e.id.startsWith("demo-");

  return (
    <Link href={`/emprendimiento/${e.slug}`} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-lg">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-orange-100 via-amber-50 to-teal-100">
        {imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagen} alt={e.nombre} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl font-bold text-brand/50">{e.nombre.charAt(0).toUpperCase()}</div>
        )}
        {demo && <span className="absolute right-3 top-3 rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold tracking-wide text-white">DEMO</span>}
      </div>
      <div className="p-4">
        {e.categoria && <span className="mb-2 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">{e.categoria}</span>}
        <h3 className="font-semibold group-hover:text-brand">{e.nombre}</h3>
        {e.ciudad && <p className="text-sm text-zinc-500">{e.ciudad}</p>}
        {e.descripcion && <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{e.descripcion}</p>}
      </div>
    </Link>
  );
}
