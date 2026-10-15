"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPrecio, type Producto } from "@/lib/types";
import ImageUpload from "./ImageUpload";

type Props = { emprendimientoId: string; inicial: Producto[] };

export default function ProductManager({ emprendimientoId, inicial }: Props) {
  const [productos, setProductos] = useState<Producto[]>(inicial);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function limpiar() {
    setEditandoId(null);
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setImagen(null);
    setError(null);
  }

  function editar(p: Producto) {
    setEditandoId(p.id);
    setNombre(p.nombre);
    setDescripcion(p.descripcion ?? "");
    setPrecio(p.precio !== null ? String(p.precio) : "");
    setImagen(p.imagen_url);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    const supabase = createClient();

    const campos = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null,
      precio: precio.trim() === "" ? null : Number(precio),
      imagen_url: imagen,
    };

    if (campos.precio !== null && (Number.isNaN(campos.precio) || campos.precio < 0)) {
      setError("El precio debe ser un número válido.");
      setGuardando(false);
      return;
    }

    if (editandoId) {
      const { data, error } = await supabase
        .from("productos")
        .update(campos)
        .eq("id", editandoId)
        .select()
        .single();
      if (error) setError(error.message);
      else {
        setProductos((prev) => prev.map((p) => (p.id === editandoId ? (data as Producto) : p)));
        limpiar();
      }
    } else {
      const { data, error } = await supabase
        .from("productos")
        .insert({ ...campos, emprendimiento_id: emprendimientoId })
        .select()
        .single();
      if (error) setError(error.message);
      else {
        setProductos((prev) => [data as Producto, ...prev]);
        limpiar();
      }
    }
    setGuardando(false);
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (error) setError(error.message);
    else setProductos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-8">
      {productos.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
          Todavía no tienes productos. Agrega el primero con el formulario de abajo.
        </p>
      ) : (
        <ul className="space-y-3">
          {productos.map((p) => (
            <li key={p.id} className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                  {p.imagen_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imagen_url} alt={p.nombre} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.nombre}</p>
                  <p className="text-sm font-medium text-brand">{formatPrecio(p.precio)}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-zinc-100 pt-2 sm:border-t-0 sm:pt-0">
                <button type="button" onClick={() => editar(p)} className="btn btn-outline !py-1.5 !px-3 text-sm">
                  Editar
                </button>
                <button type="button" onClick={() => eliminar(p.id)} className="btn btn-outline !py-1.5 !px-3 text-sm text-red-600">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={guardar} className="space-y-4 rounded-xl border border-zinc-200 p-5">
        <h3 className="font-semibold">{editandoId ? "Editar producto" : "Agregar producto o servicio"}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Nombre *</label>
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className="input" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Precio (COP)</label>
            <input
              type="number"
              min="0"
              step="any"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="input"
              placeholder="Déjalo vacío para 'Consultar precio'"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} className="input" />
        </div>
        <ImageUpload label="Imagen del producto" value={imagen} onChange={setImagen} />

        {error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={guardando} className="btn btn-primary">
            {guardando ? "Guardando…" : editandoId ? "Guardar cambios" : "Agregar al catálogo"}
          </button>
          {editandoId && (
            <button type="button" onClick={limpiar} className="btn btn-outline">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
