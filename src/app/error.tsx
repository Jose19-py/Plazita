"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado por límite de la aplicación:", error);
  }, [error]);

  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
        Error
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Algo no salió como esperábamos
      </h1>
      <p className="mt-3 max-w-md text-sm text-zinc-600 sm:text-base">
        Hubo un problema al cargar esta sección. Puedes intentar de nuevo o volver a la página de inicio.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={() => reset()} className="btn btn-primary">
          Reintentar
        </button>
        <Link href="/" className="btn btn-outline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
