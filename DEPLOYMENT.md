# Guía de Despliegue en Railway

## Pasos para desplegar el formulario FEEP en Railway

### 1. Preparación previa

Antes de desplegar, asegúrate de tener:
- [ ] Logo FEEP guardado en `public/assets/logo-feep.png`
- [ ] API Key de SendBinder
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
   - Añade la siguiente variable:
     ```
     SENDBINDER_API_KEY=tu_api_key_aqui
     ```
   - Nota: El email destino ya está configurado como `castilla@joaquincastilla.com`

3. **Verificar configuración**
   - Railway detectará automáticamente el `package.json`
   - El comando de inicio será: `npx serve . -p $PORT`
   - Railway asignará automáticamente un puerto

4. **Desplegar**
   - Railway desplegará automáticamente
   - Espera a que termine el build (normalmente 1-2 minutos)
   - Railway te dará una URL pública (ej: `https://whatsapp-feep-production.up.railway.app`)

### 3. Verificación post-despliegue

Una vez desplegado:
1. Accede a la URL proporcionada por Railway
2. Verifica que el logo se muestre correctamente
3. Rellena el formulario de prueba
4. Verifica que llegue el email a `castilla@joaquincastilla.com`

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

### El formulario no se ve
- Verifica que Railway haya completado el build correctamente
- Revisa los logs en Railway dashboard

### El email no llega
- Verifica que la variable `SENDBINDER_API_KEY` esté configurada correctamente
- Revisa los logs de Railway para ver errores de API
- Verifica que la API key de SendBinder sea válida

### El logo no se muestra
- Asegúrate de que el archivo esté en `public/assets/logo-feep.png`
- Verifica que el archivo esté en el repositorio (git)
- Intenta hacer un hard refresh (Ctrl+F5) en el navegador

## Contacto

Para cualquier problema técnico, revisa:
- Los logs en Railway dashboard
- La consola del navegador (F12 → Console)
- El código en el repositorio GitHub

---

**Fecha de creación**: 2025-11-28
**Rama de despliegue**: `claude/whatsapp-feep-setup-01Cht21RF4jAFKfVZucxiZ8W`
