import AuthForm from "@/components/AuthForm";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function Login({ searchParams }: Props) {
  const { next } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Ingresar</h1>
      <p className="mb-6 mt-1 text-zinc-600">Accede a tu panel para administrar tu emprendimiento.</p>
      <AuthForm modo="login" next={next} />
    </div>
  );
}
