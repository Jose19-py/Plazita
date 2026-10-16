import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EmprendimientoForm from "@/components/EmprendimientoForm";
import ProductManager from "@/components/ProductManager";
import QrCompartir from "@/components/QrCompartir";
import type { Emprendimiento, Producto } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function Administrar({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: emp } = await supabase.from("emprendimientos").select("*").eq("id", id).maybeSingle();
  // Solo el dueño puede administrar
  if (!emp || emp.user_id !== user.id) notFound();

  const { data: prods } = await supabase
    .from("productos")
    .select("*")
    .eq("emprendimiento_id", id)
    .order("created_at", { ascending: false });

  const emprendimiento = emp as Emprendimiento;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{emprendimiento.nombre}</h1>
        <div className="flex gap-2">
          <Link href={`/panel/${id}/cartel`} className="btn btn-outline">
            Ver cartel imprimible
          </Link>
          <Link href={`/emprendimiento/${emprendimiento.slug}`} className="btn btn-dark">
            Ver página pública
          </Link>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Comparte tu emprendimiento</h2>
        <QrCompartir
          slug={emprendimiento.slug}
          nombre={emprendimiento.nombre}
          cartelHref={`/panel/${id}/cartel`}
        />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Información del emprendimiento</h2>
        <EmprendimientoForm emprendimiento={emprendimiento} />
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-xl font-semibold">Catálogo de productos o servicios</h2>
        <ProductManager emprendimientoId={id} inicial={(prods ?? []) as Producto[]} />
      </section>
    </div>
  );
}
