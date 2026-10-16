# Plazita · Plataforma web para emprendimientos

Cada emprendedor crea su cuenta, su emprendimiento y un catálogo de productos con precios. Cualquier visitante puede explorar, buscar y contactar por WhatsApp.

**Tecnologías:** Next.js 15 (React, TypeScript) · Tailwind CSS 4 · Supabase (PostgreSQL, Auth, Storage) · Vercel

## Puesta en marcha

### 1. Requisitos
- Node.js 20 o superior (`node -v`)
- Una cuenta gratuita en [supabase.com](https://supabase.com)

### 2. Crear el proyecto en Supabase
1. En Supabase: **New project** (guarda la contraseña de la base de datos).
2. Ve a **SQL Editor → New query**, pega **todo** el contenido de `supabase/schema.sql` y pulsa **Run**.
   Esto crea las tablas, las reglas de seguridad y el bucket `imagenes`.
3. Para probar más rápido, en **Authentication → Providers → Email** desactiva **Confirm email**
   (así podrás ingresar apenas te registres; actívalo de nuevo al publicar).
4. En **Project Settings → API** copia la **Project URL** y la **anon public key**.

### 3. Variables de entorno
Copia `.env.example` como `.env.local` y pega tus valores:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Instalar y ejecutar
```bash
npm install
npm run dev
```
Abre http://localhost:3000

### 5. Publicar en Vercel
1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** e importa el repositorio.
3. En **Environment Variables** agrega las dos variables de arriba y pulsa **Deploy**.
4. En Supabase → **Authentication → URL Configuration**, pon la URL de Vercel en **Site URL**.

## Estructura
```
src/app/                    Páginas (App Router)
  page.tsx                  Inicio
  explorar/                 Listado y búsqueda
  emprendimiento/[slug]/    Perfil público + catálogo
  login/ registro/          Autenticación
  panel/                    Zona privada del emprendedor
src/components/             Header, formularios, tarjetas, subida de imágenes
src/lib/supabase/           Clientes de Supabase (navegador y servidor)
src/middleware.ts           Protege /panel y refresca la sesión
supabase/schema.sql         Tablas, seguridad (RLS) y almacenamiento
```

## Seguridad
- Las contraseñas las gestiona Supabase Auth (cifradas).
- Las reglas RLS de `schema.sql` garantizan que solo el dueño puede crear, editar o borrar su emprendimiento, sus productos y sus imágenes.
- Solo se usa la clave `anon` en el proyecto; nunca pegues la `service_role` en el código.
