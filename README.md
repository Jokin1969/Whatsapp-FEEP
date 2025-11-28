# Formulario FEEP

Formulario web versátil y moderno para FEEP con integración de SendBinder para envío de emails.

## Configuración

### 1. Logo
Coloca el logo de FEEP en `public/assets/logo-feep.png`

### 2. API Key de SendBinder

**Para Railway (Producción):**
1. Ve al dashboard de tu proyecto en Railway
2. Navega a la sección "Variables"
3. Añade la siguiente variable de entorno:
   - `SENDBINDER_API_KEY`: Tu clave API de SendBinder

**Para desarrollo local:**
1. Copia `.env.example` a `.env`
2. Edita `.env` y añade tu API key
3. Modifica `config.js` para cargar desde `.env` (o edita directamente `config.js`)

El email destino ya está configurado: **castilla@joaquincastilla.com**

### 3. Despliegue en Railway
1. Conecta el repositorio a Railway
2. Railway detectará automáticamente el proyecto
3. Configura la variable `SENDBINDER_API_KEY` en el dashboard
4. Railway servirá los archivos estáticos automáticamente

## Estructura

```
/
├── index.html          # Formulario principal
├── styles.css          # Estilos
├── app.js             # Lógica y envío con SendBinder
├── public/
│   └── assets/        # Logo y recursos
└── README.md
```

## Características

- Diseño responsive (móvil y escritorio)
- Validación en tiempo real
- Mensajes de éxito/error
- Integración con SendBinder
- Fácil personalización
