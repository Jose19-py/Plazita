import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CartelView from "@/components/CartelView";
import type { Emprendimiento } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CartelPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/panel/${id}/cartel`);

  const { data: emp } = await supabase
    .from("emprendimientos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!emp || emp.user_id !== user.id) {
    notFound();
  }

  return <CartelView emp={emp as Emprendimiento} />;
}
