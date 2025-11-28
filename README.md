# Formulario FEEP

Formulario web versátil y moderno para FEEP con integración de SendBinder para envío de emails.

## Configuración

### 1. Logo
Coloca el logo de FEEP en `public/assets/logo-feep.png`

### 2. API Key de SendBinder

#### Obtener tu API Key:
1. Ve a [SendBinder.com](https://sendbinder.com/)
2. Crea una cuenta o inicia sesión
3. En el dashboard, copia tu API key

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
3. Añade: `SENDBINDER_API_KEY` con tu clave API
4. Railway reemplazará automáticamente los valores durante el despliegue

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
