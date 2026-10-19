import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Términos de uso · ${siteConfig.nombre}`,
  description: `Términos y condiciones de uso de ${siteConfig.nombre}.`,
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-800">
        <strong>BORRADOR INFORMATIVO:</strong> Reemplaza los campos entre corchetes <code>[...]</code> antes del lanzamiento formal a producción.
      </div>

      <h1 className="text-3xl font-bold">Términos y Condiciones de Uso</h1>
      <p className="mt-2 text-sm text-zinc-500">Última actualización: [Fecha de publicación]</p>

      <div className="prose mt-8 space-y-6 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold text-ink">1. Identificación y Naturaleza del Servicio</h2>
          <p>
            Bienvenido a <strong>{siteConfig.nombre}</strong> (en adelante, la &quot;Plataforma&quot;), gestionada por <strong>{siteConfig.responsable}</strong>, con domicilio en {siteConfig.ciudad}, {siteConfig.pais}. Correo de contacto: <a href={`mailto:${siteConfig.correoSoporte}`} className="text-brand underline">{siteConfig.correoSoporte}</a>.
          </p>
          <p className="mt-2">
            {siteConfig.nombre} es un directorio digital y vitrina virtual que permite a emprendedores registrar su perfil, publicar su catálogo de bienes o servicios y facilitar enlaces de contacto directo hacia WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">2. Plazita NO procesa pagos ni responde por transacciones</h2>
          <p className="rounded-lg bg-zinc-100 p-3 font-medium text-ink">
            IMPORTANTE: {siteConfig.nombre} NO procesa pagos, no cobra comisiones por ventas, no gestiona inventario, no actúa como intermediario financiero ni interviene en contratos de compraventa. 
          </p>
          <p className="mt-2">
            Todo acuerdo, cotización, pago, envío o entrega se pacta de forma exclusiva y directa entre el visitante/comprador y el emprendimiento a través de canales externos (como WhatsApp). {siteConfig.nombre} no asume ninguna responsabilidad civil, comercial o de consumo derivada de transacciones insatisfechas, productos defectuosos o incumplimiento de entregas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">3. Uso Aceptable</h2>
          <p>
            Al registrarse o usar la Plataforma, el usuario se compromete a suministrar información verídica, mantener la custodia de sus credenciales y hacer un uso diligente conforme a la ley colombiana, las buenas costumbres y estos términos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">4. Contenido Prohibido</h2>
          <p>Queda expresamente prohibido publicar emprendimientos, productos o mensajes que:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ofrezcan bienes o sustancias de venta prohibida o regulada sin licencias (armas, estupefacientes, medicamentos bajo receta no autorizados).</li>
            <li>Infrinjan derechos de autor, patentes, marcas registradas o propiedad industrial de terceros.</li>
            <li>Promuevan estafas, pirámides financieras, esquemas Ponzi o contenido engañoso.</li>
            <li>Incluyan material pornográfico no consentido, explotación, violencia o discriminación.</li>
            <li>Utilicen la plataforma para envío de spam o recolección no autorizada de datos.</li>
          </ul>
          <p className="mt-2">
            La administración se reserva el derecho irrevocable de suspender, ocultar o eliminar cualquier perfil o catálogo que infrinja estas reglas, sin derecho a indemnización.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">5. Responsabilidad del Emprendedor</h2>
          <p>
            Cada emprendedor registrado es el único responsable legal por la idoneidad, calidad, seguridad, garantías y veracidad de las especificaciones y precios de los productos exhibidos, así como de emitir comprobantes tributarios según aplique bajo el régimen fiscal colombiano.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">6. Modificaciones y Ley Aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier diferencia será atendida preferentemente por arreglo directo entre las partes o ante las autoridades de {siteConfig.ciudad}, {siteConfig.pais}.
          </p>
        </section>
      </div>
    </div>
  );
}
