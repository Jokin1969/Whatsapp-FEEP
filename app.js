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

        // Enviar datos al servidor backend
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                apellidos,
                telefono,
                email,
                contacto,
                enfermedades,
                aceptoProteccion
            })
        });

        if (response.ok) {
            // Éxito
            const data = await response.json();
            successMessage.classList.remove('hidden');
            this.reset();

            // Scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error response:', errorData);
            throw new Error(errorData.error || 'Error al enviar el email');
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
