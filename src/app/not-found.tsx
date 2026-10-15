import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
        Error 404
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-sm text-zinc-600 sm:text-base">
        El contenido que buscas no existe, cambió de dirección o no se encuentra disponible.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Ir al inicio
        </Link>
        <Link href="/explorar" className="btn btn-outline">
          Explorar emprendimientos
        </Link>
      </div>
    </div>
  );
}
