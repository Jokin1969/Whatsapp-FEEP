// Configuración centralizada
// IMPORTANTE: Copia este archivo a 'config.js' y reemplaza los valores
// NO hagas commit de config.js con tu API key real
const CONFIG = {
    // Reemplaza con tu API key de SendBinder
    SENDBINDER_API_KEY: 'TU_API_KEY_AQUI',
    // Email donde recibirás los formularios
    SENDBINDER_EMAIL: 'castilla@joaquincastilla.com'
};

// INSTRUCCIONES:
// 1. Para desarrollo local:
//    - Copia este archivo: cp config.example.js config.js
//    - Edita config.js y reemplaza 'TU_API_KEY_AQUI' con tu API key real de SendBinder
//    - Obtén tu API key en: https://sendbinder.com/
//
// 2. Para producción (Railway):
//    - Configura SENDBINDER_API_KEY en las variables de entorno de Railway
//    - Railway reemplazará automáticamente los valores durante el despliegue
//
// 3. Seguridad:
//    - config.js está en .gitignore (NO se subirá a git)
//    - Solo sube config.example.js al repositorio
