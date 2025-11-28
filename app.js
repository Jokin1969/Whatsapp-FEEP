// La configuración se carga desde config.js

// Validación personalizada para checkboxes de enfermedad
function validarEnfermedades() {
    const checkboxes = document.querySelectorAll('input[name="enfermedad"]');
    const algunoSeleccionado = Array.from(checkboxes).some(cb => cb.checked);

    if (!algunoSeleccionado) {
        alert('Por favor, seleccione al menos una enfermedad priónica');
        return false;
    }
    return true;
}

// Habilitar/deshabilitar campo "Otro" según checkbox
document.getElementById('enfermedad6').addEventListener('change', function() {
    const otroInput = document.getElementById('enfermedadOtra');
    if (this.checked) {
        otroInput.focus();
    } else {
        otroInput.value = '';
    }
});

document.getElementById('feepForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validar enfermedades
    if (!validarEnfermedades()) {
        return;
    }

    const submitBtn = this.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Ocultar mensajes previos
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Deshabilitar botón
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        // Recopilar datos del formulario
        const formData = new FormData(this);

        // Obtener valores específicos
        const nombre = formData.get('nombre');
        const apellidos = formData.get('apellidos');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const contacto = formData.get('contacto');

        // Procesar enfermedades seleccionadas
        const enfermedades = [];
        const checkboxes = document.querySelectorAll('input[name="enfermedad"]:checked');
        checkboxes.forEach(cb => {
            if (cb.value === 'otro') {
                const otroTexto = document.getElementById('enfermedadOtra').value.trim();
                if (otroTexto) {
                    enfermedades.push(`Otro: ${otroTexto}`);
                } else {
                    enfermedades.push('Otro');
                }
            } else {
                enfermedades.push(cb.value);
            }
        });

        const aceptoProteccion = formData.get('aceptoProteccion') ? 'Sí' : 'No';

        // Preparar el contenido del email en formato HTML estructurado
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

        // Enviar email usando SendGrid
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.SENDGRID_API_KEY}`
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: CONFIG.SENDGRID_TO_EMAIL }],
                    subject: `Nueva solicitud WhatsApp FEEP - ${nombre} ${apellidos}`
                }],
                from: { email: CONFIG.SENDGRID_FROM_EMAIL },
                reply_to: { email: email },
                content: [{
                    type: 'text/html',
                    value: emailBody
                }]
            })
        });

        if (response.ok) {
            // Éxito
            successMessage.classList.remove('hidden');
            this.reset();

            // Scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Error al enviar el email');
        }

    } catch (error) {
        console.error('Error:', error);
        errorMessage.classList.remove('hidden');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
});

// Validación en tiempo real para campos requeridos
document.querySelectorAll('input[required]:not([type="checkbox"])').forEach(field => {
    field.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderBottomColor = '#d93025';
        }
    });

    field.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderBottomColor = '#dadce0';
        }
    });
});
