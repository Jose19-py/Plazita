import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminPanel from "@/components/AdminPanel";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Reporte } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Moderación y Administración · ${siteConfig.nombre}`,
};

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  // Validar si el usuario tiene privilegios de administrador mediante la función is_admin()
  const { data: esAdmin, error: adminError } = await supabase.rpc("is_admin");

  if (adminError || !esAdmin) {
    redirect("/panel");
  }

  // Cargar reportes con el emprendimiento vinculado
  const { data: reportes, error: reportesError } = await supabase
    .from("reportes")
    .select(`
      id,
      emprendimiento_id,
      motivo,
      detalle,
      correo_reportante,
      resuelto,
      created_at,
      emprendimientos (
        nombre,
        slug,
        estado
      )
    `)
    .order("created_at", { ascending: false });

  if (reportesError) {
    console.error("Error al obtener reportes:", reportesError);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Moderación</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Supervisión de contenidos reportados y control de estados · {user.email}
        </p>
      </div>

      <AdminPanel reportesIniciales={(reportes ?? []) as unknown as Reporte[]} />
    </div>
  );
}
