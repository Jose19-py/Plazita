export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-brand" />
      <p className="mt-4 text-sm font-medium text-zinc-600">Cargando…</p>
    </div>
  );
}
