import AuthForm from "@/components/AuthForm";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function Registro({ searchParams }: Props) {
  const { next } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Crea tu cuenta</h1>
      <p className="mb-6 mt-1 text-zinc-600">Es gratis. Con tu cuenta podrás crear tu emprendimiento.</p>
      <AuthForm modo="registro" next={next} />
    </div>
  );
}
