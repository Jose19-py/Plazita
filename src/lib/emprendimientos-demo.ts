import type { Emprendimiento, Producto } from "@/lib/types";

export type EmprendimientoDemo = Emprendimiento & { es_demo: true };

const fecha = "2026-11-05T12:00:00.000Z";

export const emprendimientosDemo: EmprendimientoDemo[] = [
  { id: "demo-brisa", user_id: "demo", nombre: "Brisa Accesorios", slug: "brisa-accesorios", descripcion: "Accesorios coloridos y detalles hechos para acompañar tu estilo. Perfil ficticio de demostración.", categoria: "Moda y accesorios", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-dulce", user_id: "demo", nombre: "Dulce Tentación", slug: "dulce-tentacion", descripcion: "Repostería artesanal para cumpleaños, reuniones y antojos dulces. Perfil ficticio de demostración.", categoria: "Comida y bebidas", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-manos", user_id: "demo", nombre: "Manos Creativas", slug: "manos-creativas", descripcion: "Artesanías y tejidos elaborados con creatividad y dedicación. Perfil ficticio de demostración.", categoria: "Arte y manualidades", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-sabores", user_id: "demo", nombre: "Sabores del Caribe", slug: "sabores-del-caribe", descripcion: "Bebidas y opciones frescas inspiradas en los sabores del Caribe. Perfil ficticio de demostración.", categoria: "Comida y bebidas", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-estilo", user_id: "demo", nombre: "Estilo Urbano", slug: "estilo-urbano", descripcion: "Prendas casuales y accesorios para un look urbano. Perfil ficticio de demostración.", categoria: "Moda y accesorios", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-detalles", user_id: "demo", nombre: "Detalles con Amor", slug: "detalles-con-amor", descripcion: "Ideas de regalos y sorpresas para celebrar momentos especiales. Perfil ficticio de demostración.", categoria: "Otros", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-aroma", user_id: "demo", nombre: "Aroma Natural", slug: "aroma-natural", descripcion: "Velas decorativas y aromas para darle calidez a tus espacios. Perfil ficticio de demostración.", categoria: "Hogar y decoración", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
  { id: "demo-tecno", user_id: "demo", nombre: "TecnoCaribe", slug: "tecnocaribe", descripcion: "Accesorios tecnológicos de uso cotidiano. Perfil ficticio de demostración.", categoria: "Tecnología", ciudad: "Santa Marta", whatsapp: null, logo_url: null, portada_url: null, estado: "activo", created_at: fecha, es_demo: true },
];

const productosPorSlug: Record<string, Omit<Producto, "created_at">[]> = {
  "brisa-accesorios": [
    { id: "brisa-1", emprendimiento_id: "demo-brisa", nombre: "Pulsera artesanal", descripcion: "Pulsera de colores para uso diario.", precio: 15000, imagen_url: null },
    { id: "brisa-2", emprendimiento_id: "demo-brisa", nombre: "Collar de perlas", descripcion: "Collar decorativo de estilo clásico.", precio: 28000, imagen_url: null },
    { id: "brisa-3", emprendimiento_id: "demo-brisa", nombre: "Aretes de colores", descripcion: "Aretes livianos en tonos alegres.", precio: 12000, imagen_url: null },
  ],
  "dulce-tentacion": [
    { id: "dulce-1", emprendimiento_id: "demo-dulce", nombre: "Caja de cupcakes", descripcion: "Caja de cupcakes para compartir.", precio: 25000, imagen_url: null },
    { id: "dulce-2", emprendimiento_id: "demo-dulce", nombre: "Brownie", descripcion: "Brownie de chocolate.", precio: 6000, imagen_url: null },
    { id: "dulce-3", emprendimiento_id: "demo-dulce", nombre: "Torta de chocolate", descripcion: "Torta para celebraciones.", precio: 45000, imagen_url: null },
  ],
  "manos-creativas": [
    { id: "manos-1", emprendimiento_id: "demo-manos", nombre: "Bolso tejido", descripcion: "Bolso tejido de estilo artesanal.", precio: 55000, imagen_url: null },
    { id: "manos-2", emprendimiento_id: "demo-manos", nombre: "Llavero artesanal", descripcion: "Pequeño detalle hecho a mano.", precio: 10000, imagen_url: null },
    { id: "manos-3", emprendimiento_id: "demo-manos", nombre: "Muñeco tejido", descripcion: "Muñeco tejido decorativo.", precio: 35000, imagen_url: null },
  ],
  "sabores-del-caribe": [
    { id: "sabores-1", emprendimiento_id: "demo-sabores", nombre: "Jugo de mango", descripcion: "Bebida frutal de mango.", precio: 8000, imagen_url: null },
    { id: "sabores-2", emprendimiento_id: "demo-sabores", nombre: "Limonada de coco", descripcion: "Bebida refrescante de coco y limón.", precio: 12000, imagen_url: null },
    { id: "sabores-3", emprendimiento_id: "demo-sabores", nombre: "Ensalada de frutas", descripcion: "Mezcla de frutas frescas.", precio: 15000, imagen_url: null },
  ],
  "estilo-urbano": [
    { id: "estilo-1", emprendimiento_id: "demo-estilo", nombre: "Camiseta estampada", descripcion: "Camiseta casual con estampado.", precio: 35000, imagen_url: null },
    { id: "estilo-2", emprendimiento_id: "demo-estilo", nombre: "Gorra urbana", descripcion: "Gorra para complementar tu estilo.", precio: 25000, imagen_url: null },
    { id: "estilo-3", emprendimiento_id: "demo-estilo", nombre: "Buzo casual", descripcion: "Buzo cómodo para uso diario.", precio: 65000, imagen_url: null },
  ],
  "detalles-con-amor": [
    { id: "detalles-1", emprendimiento_id: "demo-detalles", nombre: "Caja sorpresa", descripcion: "Caja de regalo decorativa.", precio: 40000, imagen_url: null },
    { id: "detalles-2", emprendimiento_id: "demo-detalles", nombre: "Desayuno sorpresa", descripcion: "Idea de desayuno para regalar.", precio: 65000, imagen_url: null },
    { id: "detalles-3", emprendimiento_id: "demo-detalles", nombre: "Ramo de flores", descripcion: "Ramo para una ocasión especial.", precio: 50000, imagen_url: null },
  ],
  "aroma-natural": [
    { id: "aroma-1", emprendimiento_id: "demo-aroma", nombre: "Vela de vainilla", descripcion: "Vela aromática de vainilla.", precio: 20000, imagen_url: null },
    { id: "aroma-2", emprendimiento_id: "demo-aroma", nombre: "Vela floral", descripcion: "Vela con aroma floral.", precio: 25000, imagen_url: null },
    { id: "aroma-3", emprendimiento_id: "demo-aroma", nombre: "Kit de velas", descripcion: "Conjunto de velas decorativas.", precio: 45000, imagen_url: null },
  ],
  tecnocaribe: [
    { id: "tecno-1", emprendimiento_id: "demo-tecno", nombre: "Funda para celular", descripcion: "Funda protectora para celular.", precio: 20000, imagen_url: null },
    { id: "tecno-2", emprendimiento_id: "demo-tecno", nombre: "Soporte para celular", descripcion: "Soporte práctico para escritorio.", precio: 15000, imagen_url: null },
    { id: "tecno-3", emprendimiento_id: "demo-tecno", nombre: "Cable USB", descripcion: "Cable de carga de uso diario.", precio: 18000, imagen_url: null },
  ],
};

export function buscarEmprendimientoDemo(slug: string) {
  const emp = emprendimientosDemo.find((item) => item.slug === slug);
  if (!emp) return null;
  const productos = (productosPorSlug[slug] ?? []).map((p) => ({ ...p, created_at: fecha })) as Producto[];
  return { emp, productos };
}
