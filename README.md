# Formulario FEEP

Formulario web versátil y moderno para FEEP con integración de SendBinder para envío de emails.

## Configuración

1. **Logo**: Coloca el logo de FEEP en `public/assets/logo-feep.png`

2. **Variables de entorno**:
   - Edita `app.js` y reemplaza:
     - `SENDBINDER_API_KEY` con tu API key de SendBinder
     - `SENDBINDER_EMAIL` con el email destino

3. **Despliegue en Railway**:
   - El proyecto está listo para desplegarse directamente
   - Railway servirá los archivos estáticos automáticamente

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
