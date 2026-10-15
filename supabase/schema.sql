-- =====================================================================
-- Plataforma web para emprendimientos - Esquema de base de datos
-- Pega este archivo completo en Supabase → SQL Editor → Run
-- =====================================================================

-- ---------- Tablas ----------
create table if not exists public.emprendimientos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nombre text not null,
  slug text not null unique,
  descripcion text,
  categoria text,
  ciudad text,
  whatsapp text,
  logo_url text,
  portada_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  emprendimiento_id uuid not null references public.emprendimientos(id) on delete cascade,
  nombre text not null,
  descripcion text,
  precio numeric(12, 2),
  imagen_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_emprendimientos_user on public.emprendimientos(user_id);
create index if not exists idx_productos_emprendimiento on public.productos(emprendimiento_id);

-- ---------- Seguridad por filas (RLS) ----------
alter table public.emprendimientos enable row level security;
alter table public.productos enable row level security;

-- Cualquier visitante puede ver emprendimientos y productos
create policy "emprendimientos_select_publico" on public.emprendimientos
  for select using (true);

create policy "productos_select_publico" on public.productos
  for select using (true);

-- Solo el dueño puede crear, editar y borrar sus emprendimientos
create policy "emprendimientos_insert_dueno" on public.emprendimientos
  for insert to authenticated with check (auth.uid() = user_id);

create policy "emprendimientos_update_dueno" on public.emprendimientos
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "emprendimientos_delete_dueno" on public.emprendimientos
  for delete to authenticated using (auth.uid() = user_id);

-- Solo el dueño del emprendimiento puede gestionar sus productos
create policy "productos_insert_dueno" on public.productos
  for insert to authenticated with check (
    exists (select 1 from public.emprendimientos e
            where e.id = emprendimiento_id and e.user_id = auth.uid())
  );

create policy "productos_update_dueno" on public.productos
  for update to authenticated using (
    exists (select 1 from public.emprendimientos e
            where e.id = emprendimiento_id and e.user_id = auth.uid())
  );

create policy "productos_delete_dueno" on public.productos
  for delete to authenticated using (
    exists (select 1 from public.emprendimientos e
            where e.id = emprendimiento_id and e.user_id = auth.uid())
  );

-- ---------- Almacenamiento de imágenes ----------
insert into storage.buckets (id, name, public)
values ('imagenes', 'imagenes', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes
create policy "imagenes_select_publico" on storage.objects
  for select using (bucket_id = 'imagenes');

-- Cada usuario solo puede subir/borrar dentro de su propia carpeta (su user id)
create policy "imagenes_insert_propia_carpeta" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'imagenes' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "imagenes_delete_propia_carpeta" on storage.objects
  for delete to authenticated using (
    bucket_id = 'imagenes' and (storage.foldername(name))[1] = auth.uid()::text
  );
