import AuthForm from "@/components/AuthForm";

type Props = { searchParams: Promise<{ next?: string; error?: string }> };

export default async function Login({ searchParams }: Props) {
  const { next, error } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Ingresar</h1>
      <p className="mb-6 mt-1 text-zinc-600">Accede a tu panel para administrar tu emprendimiento.</p>
      {error === "confirmacion_fallida" && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          El enlace de confirmación no es válido o ya expiró. Intenta registrarte de nuevo.
        </p>
      )}
      <AuthForm modo="login" next={next} />
    </div>
  );
}

