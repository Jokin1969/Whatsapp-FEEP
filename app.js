// La configuración se carga desde config.js
document.getElementById('feepForm').addEventListener('submit', async function(e) {
    e.preventDefault();

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
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Si ya existe, convertir a array
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Preparar el contenido del email
        let emailBody = '<h2>Nueva respuesta del Formulario FEEP</h2><br>';
        for (let [key, value] of Object.entries(data)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            emailBody += `<strong>${key}:</strong> ${displayValue}<br>`;
        }

        // Enviar email usando SendBinder
        const response = await fetch('https://api.sendbinder.com/v1/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.SENDBINDER_API_KEY}`
            },
            body: JSON.stringify({
                to: CONFIG.SENDBINDER_EMAIL,
                from: 'noreply@feep.com',
                subject: 'Nueva respuesta - Formulario FEEP',
                html: emailBody,
                replyTo: data.email || CONFIG.SENDBINDER_EMAIL
            })
        });

        if (response.ok) {
            // Éxito
            successMessage.classList.remove('hidden');
            this.reset();

            // Scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
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
document.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
    field.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '#d93025';
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    field.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#ddd';
        }
    });
});
