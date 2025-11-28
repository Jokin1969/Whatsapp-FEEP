# Formulario FEEP

Formulario web versátil y moderno para FEEP con integración de SendGrid para envío de emails mediante servidor Node.js/Express.

## Arquitectura

Este proyecto usa un servidor Node.js (Express) que:
- ✅ Sirve los archivos estáticos (HTML, CSS, JS)
- ✅ Maneja el envío de emails a través de SendGrid desde el backend
- ✅ Protege tu API key (nunca se expone al navegador)
- ✅ Evita problemas de CORS

**Flujo de datos:**
```
Navegador → Servidor Express (Railway) → SendGrid API → Email enviado ✓
```

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
1. Crea un archivo `.env` en la raíz del proyecto (opcional):
   ```env
   SENDGRID_API_KEY=tu_api_key_aqui
   SENDGRID_FROM_EMAIL=noreply@fundacionprionicas.org
   SENDGRID_TO_EMAIL=castilla@joaquincastilla.com
   PORT=3000
   ```
2. O configura las variables de entorno directamente:
   ```bash
   export SENDGRID_API_KEY="tu_api_key_aqui"
   export SENDGRID_FROM_EMAIL="noreply@fundacionprionicas.org"
   export SENDGRID_TO_EMAIL="castilla@joaquincastilla.com"
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. Abre http://localhost:3000 en tu navegador

**Para Railway (Producción):**
1. Ve al dashboard de tu proyecto en Railway
2. Navega a la sección "Variables"
3. Añade las siguientes variables:
   - `SENDGRID_API_KEY`: tu clave API de SendGrid
   - `SENDGRID_FROM_EMAIL`: email verificado desde donde se enviarán los formularios
   - `SENDGRID_TO_EMAIL`: email donde recibirás los formularios
4. Railway desplegará automáticamente

El email destino configurado: **castilla@joaquincastilla.com**

### 3. Despliegue en Railway
1. Conecta el repositorio a Railway
2. Railway detectará automáticamente el proyecto (lee `package.json` y `railway.json`)
3. Configura las variables de entorno en el dashboard (ver sección anterior)
4. Railway ejecutará `npm install` y luego `node server.js`
5. Tu aplicación estará disponible en una URL pública

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones detalladas.

## Estructura

```
/
├── server.js           # Servidor Express + API endpoint
├── index.html          # Formulario principal
├── styles.css          # Estilos
├── app.js             # Lógica del frontend
├── package.json        # Dependencias y scripts
├── railway.json        # Configuración de Railway
├── public/
│   └── assets/        # Logo y recursos
├── README.md
└── DEPLOYMENT.md      # Guía de despliegue
```

## API Endpoints

### `POST /api/send-email`
Envía un email con los datos del formulario.

**Request body:**
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "telefono": "+34600000000",
  "email": "juan@example.com",
  "contacto": "Llamé a María en febrero",
  "enfermedades": ["La enfermedad de Creutzfeldt-Jakob esporádica"],
  "aceptoProteccion": "Sí"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "Email enviado correctamente"
}
```

**Response (error):**
```json
{
  "success": false,
  "error": "Error al enviar el email..."
}
```

### `GET /api/health`
Verifica el estado del servidor y la configuración.

**Response:**
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

## Características

- ✅ Servidor Node.js/Express con API REST
- ✅ Diseño responsive (móvil y escritorio)
- ✅ Validación en tiempo real
- ✅ Mensajes de éxito/error
- ✅ Integración segura con SendGrid (API key en servidor)
- ✅ Sin problemas de CORS
- ✅ Fácil personalización
- ✅ Deploy automatizado en Railway
