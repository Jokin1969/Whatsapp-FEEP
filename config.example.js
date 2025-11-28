// Configuración centralizada
// IMPORTANTE: Copia este archivo a 'config.js' y reemplaza los valores
// NO hagas commit de config.js con tu API key real
const CONFIG = {
    // Reemplaza con tu API key de SendGrid
    SENDGRID_API_KEY: 'TU_API_KEY_AQUI',
    // Email desde donde se enviarán los formularios (debe estar verificado en SendGrid)
    SENDGRID_FROM_EMAIL: 'noreply@fundacionprionicas.org',
    // Email donde recibirás los formularios
    SENDGRID_TO_EMAIL: 'castilla@joaquincastilla.com'
};

// INSTRUCCIONES:
// 1. Para desarrollo local:
//    - Copia este archivo: cp config.example.js config.js
//    - Edita config.js y reemplaza 'TU_API_KEY_AQUI' con tu API key real de SendGrid
//    - Obtén tu API key en: https://sendgrid.com/
//    - IMPORTANTE: Verifica el email remitente (SENDGRID_FROM_EMAIL) en SendGrid
//
// 2. Para producción (Railway):
//    - Configura SENDGRID_API_KEY en las variables de entorno de Railway
//    - Configura SENDGRID_FROM_EMAIL con el email verificado
//    - Railway reemplazará automáticamente los valores durante el despliegue
//
// 3. Seguridad:
//    - config.js está en .gitignore (NO se subirá a git)
//    - Solo sube config.example.js al repositorio
