import RecuperarForm from "@/components/RecuperarForm";

export const metadata = { title: "Recuperar contraseña · Plazita" };

export default function Recuperar() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Recuperar contraseña</h1>
      <p className="mb-6 mt-1 text-zinc-600">
        Ingresa tu correo y te enviaremos un enlace para crear una contraseña nueva.
      </p>
      <RecuperarForm />
    </div>
  );
}
