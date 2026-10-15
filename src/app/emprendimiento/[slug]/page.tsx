import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatPrecio, whatsappLink, type Emprendimiento, type Producto } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function cargar(slug: string) {
  const supabase = await createClient();
  const { data: emp } = await supabase
    .from("emprendimientos")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!emp) return null;
  const { data: prods } = await supabase
    .from("productos")
    .select("*")
    .eq("emprendimiento_id", emp.id)
    .order("created_at", { ascending: false });
  return { emp: emp as Emprendimiento, productos: (prods ?? []) as Producto[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const datos = await cargar(slug);
  if (!datos) return { title: "Emprendimiento no encontrado · EmprendeHub" };
  
  const titulo = `${datos.emp.nombre} · EmprendeHub`;
  const descripcion = datos.emp.descripcion?.slice(0, 160) ?? `Conoce ${datos.emp.nombre} en EmprendeHub.`;
  const imagen = datos.emp.portada_url || datos.emp.logo_url || null;

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      type: "website",
      locale: "es_CO",
      ...(imagen ? { images: [{ url: imagen, alt: datos.emp.nombre }] } : {}),
    },
    twitter: {
      card: imagen ? "summary_large_image" : "summary",
      title: titulo,
      description: descripcion,
      ...(imagen ? { images: [imagen] } : {}),
    },
  };
}

export default async function PerfilEmprendimiento({ params }: Props) {
  const { slug } = await params;
  const datos = await cargar(slug);
  if (!datos) notFound();
  const { emp, productos } = datos;

  const contacto = whatsappLink(emp.whatsapp, `Hola, vi ${emp.nombre} en EmprendeHub y quiero más información.`);

  return (
    <div>
      <div className="h-40 bg-zinc-100 sm:h-56">
        {emp.portada_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={emp.portada_url} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-ink text-3xl font-bold text-white shadow">
            {emp.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={emp.logo_url} alt={emp.nombre} className="h-full w-full object-cover" />
            ) : (
              emp.nombre.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-3xl font-bold">{emp.nombre}</h1>
            <p className="text-sm text-zinc-500">
              {[emp.categoria, emp.ciudad].filter(Boolean).join(" · ")}
            </p>
          </div>
          {contacto && (
            <a href={contacto} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Contactar por WhatsApp
            </a>
          )}
        </div>

        {emp.descripcion && (
          <p className="mt-6 max-w-3xl whitespace-pre-line text-zinc-700">{emp.descripcion}</p>
        )}

        <h2 className="mt-12 text-2xl font-bold">Catálogo</h2>
        {productos.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
            Este emprendimiento aún no ha publicado productos.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => {
              const pedido = whatsappLink(
                emp.whatsapp,
                `Hola, me interesa "${p.nombre}" de ${emp.nombre} (${formatPrecio(p.precio)}).`
              );
              return (
                <article key={p.id} className="overflow-hidden rounded-xl border border-zinc-200">
                  <div className="aspect-square bg-zinc-100">
                    {p.imagen_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imagen_url} alt={p.nombre} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{p.nombre}</h3>
                    {p.descripcion && (
                      <p className="mt-1 line-clamp-3 text-sm text-zinc-600">{p.descripcion}</p>
                    )}
                    <p className="mt-3 text-lg font-bold text-brand">{formatPrecio(p.precio)}</p>
                    {pedido && (
                      <a
                        href={pedido}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark mt-3 w-full"
                      >
                        Pedir por WhatsApp
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
