# Contexto del proyecto para agentes

## Qué es
Plazita: plataforma web donde cualquier emprendimiento crea su propio espacio (perfil + catálogo con precios) y los visitantes lo exploran y contactan por WhatsApp. Proyecto académico de Desarrollo de software (Corporación Bolivariana del Norte), desarrollado por una sola persona.

## Stack
Next.js 15 (App Router, TypeScript) · Tailwind CSS 4 · Supabase (PostgreSQL, Auth, Storage) · despliegue en Vercel. Idioma de la interfaz: español (Colombia). Moneda: COP.

## Reglas de diseño
- Estilo moderno y minimalista. Colores: negro `#111111`, blanco y acento violeta `#6C4DF5` (definidos en `src/app/globals.css` como `brand`, `ink`).
- Debe verse bien en celular, tableta y computador (mobile first).
- Textos claros para emprendedores sin conocimientos técnicos.

## Reglas técnicas
- Lecturas en Server Components con `src/lib/supabase/server.ts`; escrituras desde componentes cliente con `src/lib/supabase/client.ts`.
- La seguridad vive en las políticas RLS de `supabase/schema.sql`. Todo cambio de tablas se hace ahí.
- No usar la clave `service_role` en el código del cliente. No subir `.env.local` a git.
- Mantener cambios pequeños y explicar cada uno. No agregar dependencias sin justificarlo.

## Alcance (no salirse)
Incluye: registro/login, crear y editar emprendimiento, catálogo con imágenes y precios, explorar/buscar, contacto por WhatsApp.
No incluye: pagos en línea, carrito, inventario/ventas, app móvil.

## Documento del proyecto
El proyecto se documenta en un Word (`Proyecto_Web_Emprendimientos.docx`). Las pruebas y el desarrollo que se hagan deben poder describirse allí con capturas.
