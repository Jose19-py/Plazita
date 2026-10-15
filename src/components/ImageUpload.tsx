"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
};

const MAX_MB = 3;

export default function ImageUpload({ label, value, onChange }: Props) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function manejarArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setError(null);

    if (!archivo.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen.");
      return;
    }
    if (archivo.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen no puede pesar más de ${MAX_MB} MB.`);
      return;
    }

    setSubiendo(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Debes iniciar sesión para subir imágenes.");
      setSubiendo(false);
      return;
    }

    const extension = archivo.name.split(".").pop()?.toLowerCase() || "jpg";
    const ruta = `${user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: errorSubida } = await supabase.storage
      .from("imagenes")
      .upload(ruta, archivo, { cacheControl: "3600", upsert: false });

    if (errorSubida) {
      setError("No se pudo subir la imagen: " + errorSubida.message);
      setSubiendo(false);
      return;
    }

    const { data } = supabase.storage.from("imagenes").getPublicUrl(ruta);
    onChange(data.publicUrl);
    setSubiendo(false);
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-xs text-zinc-400">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="h-full w-full object-cover" />
          ) : (
            "Sin imagen"
          )}
        </div>
        <div className="space-y-1">
          <input
            type="file"
            accept="image/*"
            onChange={manejarArchivo}
            disabled={subiendo}
            className="block text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-zinc-200"
          />
          {subiendo && <p className="text-xs text-zinc-500">Subiendo…</p>}
          {value && !subiendo && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-red-600 hover:underline"
            >
              Quitar imagen
            </button>
          )}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
