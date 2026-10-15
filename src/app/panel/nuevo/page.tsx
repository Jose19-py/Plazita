import EmprendimientoForm from "@/components/EmprendimientoForm";

export default function Nuevo() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Crear emprendimiento</h1>
      <p className="mb-6 mt-1 text-zinc-600">
        Cuéntanos sobre tu negocio. Luego podrás agregar tus productos.
      </p>
      <EmprendimientoForm />
    </div>
  );
}
