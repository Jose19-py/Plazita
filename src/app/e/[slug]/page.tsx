import { notFound, permanentRedirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShortUrlRedirect({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const supabase = await createClient();
  const { data: emp } = await supabase
    .from("emprendimientos")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (!emp) {
    notFound();
  }

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") {
      search.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, v));
    }
  }

  const queryString = search.toString();
  const target = `/emprendimiento/${emp.slug}${queryString ? `?${queryString}` : ""}`;

  permanentRedirect(target);
}
