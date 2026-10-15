"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIAS, slugify, type Emprendimiento } from "@/lib/types";
import ImageUpload from "./ImageUpload";

export default function EmprendimientoForm({ emprendimiento }: { emprendimiento?: Emprendimiento }) {
  const router = useRouter();
  const editando = Boolean(emprendimiento);

  const [nombre, setNombre] = useState(emprendimiento?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(emprendimiento?.descripcion ?? "");
  const [categoria, setCategoria] = useState(emprendimiento?.categoria ?? "");
  const [ciudad, setCiudad] = useState(emprendimiento?.ciudad ?? "");
  const [whatsapp, setWhatsapp] = useState(emprendimiento?.whatsapp ?? "");
  const [logo, setLogo] = useState<string | null>(emprendimiento?.logo_url ?? null);
  const [portada, setPortada] = useState<string | null>(emprendimiento?.portada_url ?? null);

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setGuardando(true);
    const supabase = createClient();

    const campos = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null,
      categoria: categoria || null,
      ciudad: ciudad.trim() || null,
      whatsapp: whatsapp.trim() || null,
      logo_url: logo,
      portada_url: portada,
    };

    if (editando && emprendimiento) {
      const { error } = await supabase.from("emprendimientos").update(campos).eq("id", emprendimiento.id);
      if (error) setError(error.message);
      else {
        setOk(true);
        router.refresh();
      }
    } else {
      const { data, error } = await supabase
        .from("emprendimientos")
        .insert({ ...campos, slug: slugify(campos.nombre) })
        .select("id")
        .single();
      if (error) setError(error.message);
      else router.push(`/panel/${data.id}`);
    }
    setGuardando(false);
  }

  async function eliminar() {
    if (!emprendimiento) return;
    if (!confirm("¿Seguro que quieres eliminar este emprendimiento y todos sus productos? Esta acción no se puede deshacer.")) return;
    const supabase = createClient();
    const { error } = await supabase.from("emprendimientos").delete().eq("id", emprendimiento.id);
    if (error) setError(error.message);
    else {
      router.push("/panel");
      router.refresh();
    }
  }

  return (
    <form onSubmit={guardar} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Nombre del emprendimiento *</label>
        <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className="input" placeholder="Ej: Dulces de la Abuela" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="input">
            <option value="">Selecciona…</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Ciudad</label>
          <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="input" placeholder="Ej: Barranquilla" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">WhatsApp de contacto</label>
        <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="input" placeholder="Ej: 3001234567" />
        <p className="mt-1 text-xs text-zinc-500">Los clientes te escribirán a este número.</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={5} className="input" placeholder="Cuéntales a tus clientes quién eres, qué ofreces y qué te hace especial." />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ImageUpload label="Logo" value={logo} onChange={setLogo} />
        <ImageUpload label="Imagen de portada" value={portada} onChange={setPortada} />
      </div>

      {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      {ok && <p className="rounded-md bg-green-50 p-2 text-sm text-green-700">Cambios guardados.</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={guardando} className="btn btn-primary">
          {guardando ? "Guardando…" : editando ? "Guardar cambios" : "Crear emprendimiento"}
        </button>
        {editando && (
          <button type="button" onClick={eliminar} className="btn btn-outline text-red-600">
            Eliminar emprendimiento
          </button>
        )}
      </div>
    </form>
  );
}
