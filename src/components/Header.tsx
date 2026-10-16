import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Plaz<span className="text-brand">ita</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm sm:gap-4">
          <Link href="/explorar" className="px-2 py-1 font-medium hover:text-brand">
            Explorar
          </Link>
          {user ? (
            <>
              <Link href="/panel" className="px-2 py-1 font-medium hover:text-brand">
                Mi panel
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="px-2 py-1 font-medium hover:text-brand">
                Ingresar
              </Link>
              <Link href="/registro" className="btn btn-primary !py-1.5">
                Registrarme
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
