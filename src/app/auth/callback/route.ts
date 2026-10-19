import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/panel";

  // Validar que "next" sea una ruta relativa segura
  const destino = next.startsWith("/") && !next.startsWith("//") ? next : "/panel";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (!searchParams.get("next") || next === "/panel") {
        const { data: esAdmin } = await supabase.rpc("is_admin");
        if (esAdmin) {
          return NextResponse.redirect(`${origin}/admin`);
        }
      }
      return NextResponse.redirect(`${origin}${destino}`);
    }
  }

  // Si falla o expiró, redirige al login con parámetro descriptivo
  return NextResponse.redirect(`${origin}/login?error=confirmacion_fallida`);
}
