// Cargar variables de entorno
require('dotenv').config({ override: true });

const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio raíz
app.use(express.static(__dirname));

// Endpoint para enviar email
app.post('/api/send-email', async (req, res) => {
    try {
        const {
            nombre,
            apellidos,
            telefono,
            email,
            contacto,
            enfermedades,
            aceptoProteccion
        } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!nombre || !apellidos || !telefono || !email || !contacto || !enfermedades) {
            return res.status(400).json({
                success: false,
                error: 'Faltan campos requeridos'
            });
        }

        // Validar que las variables de entorno estén configuradas
        if (!process.env.SENDGRID_API_KEY) {
            console.error('ERROR: SENDGRID_API_KEY no está configurada');
            return res.status(500).json({
                success: false,
                error: 'Configuración del servidor incompleta'
            });
        }

        if (!process.env.SENDGRID_TO_EMAIL || !process.env.SENDGRID_FROM_EMAIL) {
            console.error('ERROR: SENDGRID_TO_EMAIL o SENDGRID_FROM_EMAIL no están configuradas');
            return res.status(500).json({
                success: false,
                error: 'Configuración del servidor incompleta'
            });
        }

        // Preparar el contenido del email
        const emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #673ab7; border-bottom: 3px solid #673ab7; padding-bottom: 10px;">
                    Nueva solicitud - Grupo de WhatsApp (FEEP)
                </h2>

                <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
                    <h3 style="color: #202124; margin-top: 0;">Datos personales</h3>
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Apellidos:</strong> ${apellidos}</p>
                    <p><strong>Teléfono móvil (WhatsApp):</strong> ${telefono}</p>
                    <p><strong>Correo electrónico:</strong> ${email}</p>
                </div>

                <div style="background-color: #fff3e0; padding: 20px; margin: 20px 0; border-radius: 8px;">
                    <h3 style="color: #202124; margin-top: 0;">Información de contacto</h3>
                    <p><strong>¿Cómo y con qué persona de la Fundación ha contactado previamente?</strong></p>
                    <p>${contacto}</p>
                </div>

                <div style="background-color: #e8f5e9; padding: 20px; margin: 20px 0; border-radius: 8px;">
                    <h3 style="color: #202124; margin-top: 0;">Enfermedad(es) priónica(s)</h3>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        ${enfermedades.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>

                <div style="background-color: #f1f3f4; padding: 20px; margin: 20px 0; border-radius: 8px;">
                    <p><strong>Protección de datos:</strong> ${aceptoProteccion}</p>
                </div>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #dadce0;">

                <p style="color: #5f6368; font-size: 12px;">
                    Este formulario fue enviado el ${new Date().toLocaleString('es-ES', {
                        dateStyle: 'full',
                        timeStyle: 'short'
                    })}
                </p>
            </div>
        `;

        // Configurar el mensaje
        const msg = {
            to: process.env.SENDGRID_TO_EMAIL,
            from: process.env.SENDGRID_FROM_EMAIL,
            replyTo: email,
            subject: `Nueva solicitud WhatsApp FEEP - ${nombre} ${apellidos}`,
            html: emailBody
        };

        // Enviar email
        await sgMail.send(msg);

        console.log(`✓ Email enviado correctamente para: ${nombre} ${apellidos}`);

        res.json({
            success: true,
            message: 'Email enviado correctamente'
        });

    } catch (error) {
        console.error('Error al enviar email:', error);

        // Registrar detalles del error para debugging
        if (error.response) {
            console.error('SendGrid error response:', error.response.body);
        }

        res.status(500).json({
            success: false,
            error: 'Error al enviar el email. Por favor, inténtalo de nuevo.'
        });
    }
});

// Ruta de salud para verificar que el servidor está funcionando
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: {
            hasApiKey: !!process.env.SENDGRID_API_KEY,
            hasToEmail: !!process.env.SENDGRID_TO_EMAIL,
            hasFromEmail: !!process.env.SENDGRID_FROM_EMAIL
        }
    });
});

// Ruta principal - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor iniciado correctamente`);
    console.log(`📍 Escuchando en: http://localhost:${PORT}`);
    console.log(`\n📧 Configuración SendGrid:`);
    console.log(`   API Key: ${process.env.SENDGRID_API_KEY ? '✓ Configurada' : '✗ NO configurada'}`);
    console.log(`   To Email: ${process.env.SENDGRID_TO_EMAIL || '✗ NO configurada'}`);
    console.log(`   From Email: ${process.env.SENDGRID_FROM_EMAIL || '✗ NO configurada'}`);
    console.log(`\n💡 Endpoints disponibles:`);
    console.log(`   GET  /              → Formulario principal`);
    console.log(`   POST /api/send-email → Enviar email`);
    console.log(`   GET  /api/health     → Estado del servidor\n`);
});
