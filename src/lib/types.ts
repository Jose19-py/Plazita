export type EstadoEmprendimiento = "activo" | "oculto";

export type Emprendimiento = {
  id: string;
  user_id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  categoria: string | null;
  ciudad: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  portada_url: string | null;
  estado?: EstadoEmprendimiento;
  created_at: string;
};

export type Reporte = {
  id: string;
  emprendimiento_id: string;
  motivo: string;
  detalle: string | null;
  correo_reportante: string | null;
  resuelto: boolean;
  created_at: string;
  emprendimientos?: {
    nombre: string;
    slug: string;
    estado?: EstadoEmprendimiento;
  } | null;
};


export type Producto = {
  id: string;
  emprendimiento_id: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  imagen_url: string | null;
  created_at: string;
};

export const CATEGORIAS = [
  "Comida y bebidas",
  "Moda y accesorios",
  "Belleza y cuidado personal",
  "Hogar y decoración",
  "Tecnología",
  "Servicios profesionales",
  "Educación y cursos",
  "Arte y manualidades",
  "Salud y bienestar",
  "Otros",
];

export function formatPrecio(precio: number | null): string {
  if (precio === null || precio === undefined) return "Consultar precio";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}

export function slugify(texto: string): string {
  const base = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  const sufijo = Math.random().toString(36).slice(2, 6);
  return `${base || "emprendimiento"}-${sufijo}`;
}

export function whatsappLink(numero: string | null, mensaje: string): string | null {
  if (!numero) return null;
  let digitos = numero.replace(/\D/g, "");
  if (digitos.length === 10) digitos = `57${digitos}`; // Colombia por defecto
  if (!digitos) return null;
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensaje)}`;
}

export function getSiteUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.trim()) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/+$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  return "https://plazita.vercel.app";
}

