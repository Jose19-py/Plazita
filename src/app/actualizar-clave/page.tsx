import ActualizarClaveForm from "@/components/ActualizarClaveForm";

export const metadata = { title: "Nueva contraseña · Plazita" };

export default function ActualizarClave() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Nueva contraseña</h1>
      <p className="mb-6 mt-1 text-zinc-600">Elige una contraseña nueva y segura para tu cuenta.</p>
      <ActualizarClaveForm />
    </div>
  );
}
