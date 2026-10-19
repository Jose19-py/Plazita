import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Política de Privacidad · ${siteConfig.nombre}`,
  description: `Política de tratamiento y protección de datos personales de ${siteConfig.nombre}.`,
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-800">
        <strong>BORRADOR INFORMATIVO:</strong> Modelo estructurado conforme a la Ley Estatutaria 1581 de 2012 de Colombia y Decreto 1377 de 2013. Completa los corchetes <code>[...]</code> con los datos definitivos antes del paso a producción.
      </div>

      <h1 className="text-3xl font-bold">Política de Tratamiento y Protección de Datos Personales</h1>
      <p className="mt-2 text-sm text-zinc-500">Última actualización: [Fecha de publicación]</p>

      <div className="prose mt-8 space-y-6 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold text-ink">1. Responsable del Tratamiento</h2>
          <p>
            El Responsable del tratamiento de sus datos personales es <strong>{siteConfig.responsable}</strong> [NIT / Cédula: ...], con domicilio en {siteConfig.ciudad}, {siteConfig.pais}. Correo electrónico para atención y ejercicio de derechos de Habeas Data:{" "}
            <a href={`mailto:${siteConfig.correoSoporte}`} className="text-brand underline">
              {siteConfig.correoSoporte}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">2. Marco Normativo</h2>
          <p>
            Esta política se formula en cumplimiento de la Constitución Política de Colombia (art. 15), la Ley 1581 de 2012, el Decreto Reglamentario 1377 de 2013 y demás normas concordantes expedidas por la Superintendencia de Industria y Comercio (SIC).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">3. Datos Personales Objeto de Tratamiento</h2>
          <p>La Plataforma recopila y almacena:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Datos de autenticación:</strong> Correo electrónico y contraseña cifrada al momento de registrarse.</li>
            <li><strong>Datos de contacto y comerciales:</strong> Nombre del emprendimiento, categoría, ciudad, número telefónico/WhatsApp y descripción suministrados por el titular para exhibición pública.</li>
            <li><strong>Contenido multimedia:</strong> Logotipos, portadas e imágenes de productos cargadas voluntariamente.</li>
            <li><strong>Reportes y moderación:</strong> Información de contacto y argumentos aportados al notificar infracciones en la plataforma.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">4. Finalidades del Tratamiento</h2>
          <p>Los datos suministrados serán utilizados de manera directa y exclusiva para:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Gestionar el registro, validación y acceso al panel de administración del usuario.</li>
            <li>Publicar la vitrina comercial y habilitar el botón de enlace hacia WhatsApp para que clientes potenciales se comuniquen con el titular.</li>
            <li>Gestionar la seguridad de la plataforma, atender peticiones, quejas, reclamos o denuncias de contenido.</li>
            <li>Remitir avisos técnicos indispensables sobre el servicio (por ejemplo, recuperación de contraseña).</li>
          </ul>
          <p className="mt-2 font-medium text-ink">
            {siteConfig.nombre} no vende, comercializa ni cede bases de datos de sus usuarios a terceros con fines de prospección publicitaria no solicitada.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">5. Derechos de los Titulares</h2>
          <p>Conforme al artículo 8 de la Ley 1581 de 2012, el titular cuenta con los derechos de:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Conocer, actualizar y rectificar sus datos personales frente al Responsable.</li>
            <li>Solicitar prueba de la autorización otorgada para el tratamiento.</li>
            <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
            <li>Revocar la autorización y/o solicitar la supresión de sus datos cuando considere que no se respetan los principios legales.</li>
            <li>Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">6. Canales y Procedimiento para Ejercer los Derechos</h2>
          <p>
            El usuario puede actualizar o eliminar su información de manera directa en cualquier momento desde su panel de control en la sección de administración o mediante la función <strong>&quot;Eliminar mi cuenta&quot;</strong>, la cual suprime irrevocablemente sus credenciales, emprendimientos y productos asociados.
          </p>
          <p className="mt-2">
            Para consultas formales o reclamos sobre Habeas Data, puede escribir a <a href={`mailto:${siteConfig.correoSoporte}`} className="text-brand underline">{siteConfig.correoSoporte}</a> con el asunto &quot;Habeas Data - Ejercicio de Derechos&quot;. La solicitud será atendida en un plazo máximo de quince (15) días hábiles según la normativa aplicable.
          </p>
        </section>
      </div>
    </div>
  );
}
