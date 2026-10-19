// src/config/site.ts
// Configuración central del sitio. Todos los datos fijos se leen aquí.

export const siteConfig = {
  /** Nombre del sitio que aparece en la interfaz */
  nombre: process.env.NEXT_PUBLIC_SITE_NOMBRE ?? "Plazita",

  /** URL pública base (sin barra final). En Vercel se configura automáticamente. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),

  /** Correo de soporte visible en páginas legales */
  correoSoporte: process.env.NEXT_PUBLIC_CORREO_SOPORTE ?? "soporte@plazita.co",

  /** Nombre legal del responsable del sitio (para páginas de privacidad/términos) */
  responsable: process.env.NEXT_PUBLIC_RESPONSABLE ?? "[Nombre del responsable]",

  /** Ciudad donde opera el responsable */
  ciudad: process.env.NEXT_PUBLIC_CIUDAD ?? "[Ciudad]",

  /** País */
  pais: process.env.NEXT_PUBLIC_PAIS ?? "Colombia",
} as const;
