-- =====================================================================
-- Plazita: ajustes de seguridad
-- Pega este archivo completo en Supabase -> SQL Editor -> Run.
-- Es seguro ejecutarlo más de una vez.
-- =====================================================================

-- 1) El dueño NO puede cambiar el estado de su vitrina (activo/oculto).
--    Solo un admin puede. Si no hay sesión (SQL Editor o Table Editor del
--    panel de Supabase, auth.uid() es nulo), se permite el cambio para que
--    puedas ocultar o activar vitrinas manualmente.
create or replace function public.proteger_estado()
returns trigger
language plpgsql
as $$
begin
  if new.estado is distinct from old.estado
     and auth.uid() is not null
     and not public.is_admin() then
    new.estado := old.estado;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_proteger_estado on public.emprendimientos;
create trigger trg_proteger_estado
  before update on public.emprendimientos
  for each row execute function public.proteger_estado();

-- 2) El bucket 'imagenes' exige en el servidor lo que antes solo se
--    validaba en el navegador: máximo 3 MB y solo JPG, PNG o WebP.
--    No afecta a las imágenes que ya están subidas.
update storage.buckets
set file_size_limit = 3145728,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'imagenes';

-- =====================================================================
-- Comprobaciones (opcional, ejecútalas por separado)
-- =====================================================================
-- select id, public, file_size_limit, allowed_mime_types
--   from storage.buckets where id = 'imagenes';
-- select trigger_name from information_schema.triggers
--   where event_object_table = 'emprendimientos';
