# Formulario FEEP

Formulario web versátil y moderno para FEEP con integración de SendGrid para envío de emails.

## Configuración

### 1. Logo
Coloca el logo de FEEP en `public/assets/logo-feep.png`

### 2. API Key de SendGrid

#### Obtener tu API Key:
1. Ve a [SendGrid.com](https://sendgrid.com/)
2. Crea una cuenta o inicia sesión
3. En Settings > API Keys, crea una nueva API key con permisos de "Mail Send"
4. Verifica tu dominio o email remitente en Settings > Sender Authentication

#### Configuración:

**Para desarrollo local:**
1. Copia el archivo de ejemplo:
   ```bash
   cp config.example.js config.js
   ```
2. Edita `config.js` y reemplaza `'TU_API_KEY_AQUI'` con tu API key real
3. **IMPORTANTE:** `config.js` está en `.gitignore` - NO se subirá a git

**Para Railway (Producción):**
1. Ve al dashboard de tu proyecto en Railway
2. Navega a la sección "Variables"
3. Añade las siguientes variables:
   - `SENDGRID_API_KEY`: tu clave API de SendGrid
   - `SENDGRID_FROM_EMAIL`: email verificado desde donde se enviarán los formularios
   - `SENDGRID_TO_EMAIL`: email donde recibirás los formularios
4. Railway reemplazará automáticamente los valores durante el despliegue

El email destino ya está configurado: **castilla@joaquincastilla.com**

### 3. Despliegue en Railway
1. Conecta el repositorio a Railway
2. Railway detectará automáticamente el proyecto
3. Configura las variables de entorno en el dashboard (ver sección anterior)
4. Railway servirá los archivos estáticos automáticamente

## Estructura

```
/
├── index.html          # Formulario principal
├── styles.css          # Estilos
├── app.js             # Lógica y envío con SendGrid
├── public/
│   └── assets/        # Logo y recursos
└── README.md
```

## Características

- Diseño responsive (móvil y escritorio)
- Validación en tiempo real
- Mensajes de éxito/error
- Integración con SendGrid
- Fácil personalización
