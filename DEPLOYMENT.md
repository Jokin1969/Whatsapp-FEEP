# Guía de Despliegue en Railway

## Pasos para desplegar el formulario FEEP en Railway

### 1. Preparación previa

Antes de desplegar, asegúrate de tener:
- [ ] Logo FEEP guardado en `public/assets/logo-feep.png`
- [ ] API Key de SendGrid
- [ ] Email remitente verificado en SendGrid
- [ ] Cuenta de Railway activa

### 2. Configuración en Railway

1. **Conectar el repositorio**
   - Ve a [Railway.app](https://railway.app)
   - Crea un nuevo proyecto
   - Selecciona "Deploy from GitHub repo"
   - Selecciona el repositorio `Whatsapp-FEEP`
   - Selecciona la rama: `claude/whatsapp-feep-setup-01Cht21RF4jAFKfVZucxiZ8W`

2. **Configurar variables de entorno**
   - En el dashboard del proyecto, ve a la pestaña **"Variables"**
   - Añade las siguientes variables:
     ```
     SENDGRID_API_KEY=tu_api_key_aqui
     SENDGRID_FROM_EMAIL=noreply@fundacionprionicas.org
     SENDGRID_TO_EMAIL=castilla@joaquincastilla.com
     ```
   - **IMPORTANTE**: El email `SENDGRID_FROM_EMAIL` debe estar verificado en SendGrid

3. **Verificar configuración**
   - Railway detectará automáticamente el `package.json`
   - Railway ejecutará:
     1. `npm install` → Instala Express, SendGrid y dependencias
     2. `node server.js` → Inicia el servidor Node.js
   - Railway asignará automáticamente un puerto (variable `$PORT`)
   - El servidor escuchará en ese puerto automáticamente

4. **Desplegar**
   - Railway desplegará automáticamente
   - Espera a que termine el build (normalmente 1-2 minutos)
   - Railway te dará una URL pública (ej: `https://whatsapp-feep-production.up.railway.app`)

### 3. Verificación post-despliegue

Una vez desplegado:
1. **Verifica el estado del servidor**
   - Accede a: `https://tu-url.railway.app/api/health`
   - Deberías ver un JSON como:
     ```json
     {
       "status": "ok",
       "timestamp": "2025-11-28T10:30:00.000Z",
       "environment": {
         "hasApiKey": true,
         "hasToEmail": true,
         "hasFromEmail": true
       }
     }
     ```
   - Verifica que todos los valores sean `true`

2. **Verifica el formulario**
   - Accede a la URL principal: `https://tu-url.railway.app`
   - Verifica que el logo se muestre correctamente
   - Verifica que el formulario se cargue sin errores

3. **Prueba de envío**
   - Rellena el formulario de prueba con datos válidos
   - Envía el formulario
   - Verifica que aparezca el mensaje de éxito
   - Verifica que llegue el email a `castilla@joaquincastilla.com`
   - Revisa los logs de Railway para confirmar: `✓ Email enviado correctamente para: [nombre]`

### 4. Logo FEEP

**IMPORTANTE**: Si el logo no está en el repositorio, súbelo manualmente:

```bash
# En tu máquina local, copia el logo
cp /ruta/a/tu/logo.png public/assets/logo-feep.png

# Haz commit y push
git add public/assets/logo-feep.png
git commit -m "Add FEEP logo"
git push
```

Railway se actualizará automáticamente con el nuevo logo.

### 5. Dominio personalizado (Opcional)

Si quieres usar un dominio propio:
1. Ve a Settings en Railway
2. Selecciona "Domains"
3. Añade tu dominio personalizado
4. Configura los DNS según las instrucciones de Railway

## Solución de problemas

### El servidor no inicia
- Verifica que Railway haya completado el build correctamente
- Revisa los logs en Railway dashboard
- Busca errores relacionados con `npm install` o `node server.js`
- Verifica que el puerto esté configurado correctamente (Railway lo asigna automáticamente)

### El formulario no se ve
- Verifica que el servidor esté corriendo (accede a `/api/health`)
- Revisa los logs en Railway dashboard
- Verifica que los archivos estáticos se estén sirviendo correctamente

### El email no llega
1. **Verifica las variables de entorno**
   - Accede a `/api/health` para verificar la configuración
   - Todas las propiedades en `environment` deben ser `true`

2. **Verifica las credenciales de SendGrid**
   - Asegúrate de que `SENDGRID_API_KEY` sea válida
   - Verifica que el email `SENDGRID_FROM_EMAIL` esté verificado en SendGrid (Settings > Sender Authentication)
   - Confirma que `SENDGRID_TO_EMAIL` sea correcto

3. **Revisa los logs**
   - En Railway dashboard, busca errores como:
     - `ERROR: SENDGRID_API_KEY no está configurada`
     - `SendGrid error response: ...`
   - Si hay errores de SendGrid, revisa la respuesta completa en los logs

### Error de CORS
- ✅ **Este problema ya está resuelto** con la nueva arquitectura
- El servidor maneja las peticiones desde el backend, evitando CORS completamente

### El logo no se muestra
- Asegúrate de que el archivo esté en `public/assets/logo-feep.png`
- Verifica que el archivo esté en el repositorio (git)
- Intenta hacer un hard refresh (Ctrl+F5) en el navegador

### Error 500 al enviar formulario
- Revisa los logs de Railway para ver el error específico
- Verifica que todas las variables de entorno estén configuradas
- Usa `/api/health` para diagnosticar problemas de configuración

## Contacto

Para cualquier problema técnico, revisa:
- Los logs en Railway dashboard
- La consola del navegador (F12 → Console)
- El endpoint `/api/health` para diagnóstico
- El código en el repositorio GitHub

---

**Fecha de creación**: 2025-11-28
**Rama de despliegue**: `claude/whatsapp-feep-setup-01Cht21RF4jAFKfVZucxiZ8W`
