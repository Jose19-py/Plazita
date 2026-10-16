# Plazita · Guía para continuar el proyecto en Antigravity

## Cómo empezar
1. Descomprime el zip y abre la carpeta `emprendimientos` en Antigravity (**File → Open Folder**).
2. Los agentes deben leer `AGENTS.md` (contexto del proyecto). Si no lo toman solos, pégalo en tu primer mensaje.
3. Sigue `README.md` para crear el proyecto en Supabase, pegar `schema.sql` y llenar `.env.local`.
4. Ve dándole a un agente estos prompts, **uno por uno**, y revisa el resultado antes de pasar al siguiente.

> Importante: el código base se escribió sin poder instalarlo ni compilarlo, así que el primer paso es comprobar que arranca.

## Prompts (en orden)

**1. Verificar que arranca**
```
Lee AGENTS.md y README.md. Ejecuta npm install y luego npm run build. Corrige cualquier error de compilación o de tipos que aparezca, con cambios mínimos, y explícame qué corregiste. Después ejecuta npm run dev y confirma que la página de inicio carga.
```

**2. Probar el flujo completo**
```
Con el servidor corriendo y mi .env.local configurado, abre el navegador y prueba este flujo: registrarme, iniciar sesión, crear un emprendimiento, subir logo y portada, agregar 3 productos con imagen y precio, ver la página pública y usar el botón de WhatsApp. Haz capturas de cada paso y repórtame cualquier error.
```

**3. Revisar seguridad**
```
Revisa supabase/schema.sql y el código. Comprueba que un usuario NO pueda editar ni borrar el emprendimiento, los productos o las imágenes de otro usuario, y que /panel exija sesión. Dime qué probaste y si encuentras algún hueco.
```

**4. Pulir el diseño**
```
Revisa el diseño en móvil (375 px), tableta y escritorio. Mejora espacios, tamaños de texto y botones respetando el estilo minimalista de AGENTS.md. No cambies la funcionalidad.
```

**5. Mejoras de visibilidad (SEO)**
```
Agrega metadatos (title, description, Open Graph con la portada) a la página de cada emprendimiento y un sitemap.xml y robots.txt para que los perfiles se encuentren en Google.
```

**6. Publicar**
```
Prepara el proyecto para desplegar en Vercel: revisa que no haya secretos en el código, que .env.local esté en .gitignore, y guíame paso a paso para subirlo a GitHub y desplegarlo.
```

## Para el documento de Word
Cuando termines cada prompt, guarda capturas de pantalla: sirven para las secciones 6 (diseño), 8 (desarrollo) y 9 (pruebas). Luego me las cuentas y completo esas secciones del documento.
