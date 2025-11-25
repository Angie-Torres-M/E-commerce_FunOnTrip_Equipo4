// Obtener elementos
const form = document.getElementById("contactForm");
const txtNombre = document.getElementById("nombre");
const txtCorreo = document.getElementById("email");
const txtTelefono = document.getElementById("numero");
const txtMensaje = document.getElementById("tarea");

// Crear alert de validaciones dinámico
const alertValidaciones = document.createElement("div");
alertValidaciones.style.display = "none";
alertValidaciones.className = "alert alert-danger";
alertValidaciones.role = "alert";
const alertValidacionesTexto = document.createElement("p");
alertValidaciones.appendChild(alertValidacionesTexto);

// Insertar el alert antes del botón de envío
form.insertBefore(alertValidaciones, form.querySelector("button[type='submit']"));

// Función para mostrar alertas
function mostrarAlerta(msg) {
    alertValidacionesTexto.innerHTML = msg;
    alertValidaciones.style.display = "block";
}

// Función para validar correo
function validarCorreo(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar teléfono (10 dígitos)
function validarTelefono(tel) {
    return /^\d{10}$/.test(tel);
}

// Evento submit
form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Resetear estilos y alertas
    txtNombre.style.border = "";
    txtCorreo.style.border = "";
    txtTelefono.style.border = "";
    txtMensaje.style.border = "";
    alertValidaciones.style.display = "none";
    alertValidacionesTexto.innerHTML = "";

    let isValid = true;
    let mensajes = "";

    // Validaciones
    if (txtNombre.value.trim().length < 2 || !/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/.test(txtNombre.value.trim())) {
        txtNombre.style.border = "2px solid red";
        mensajes += "<strong>El nombre debe tener mínimo 2 letras y solo contener letras.</strong><br/>";
        isValid = false;
    }

    if (!validarCorreo(txtCorreo.value.trim())) {
        txtCorreo.style.border = "2px solid red";
        mensajes += "<strong>El correo no es válido.</strong><br/>";
        isValid = false;
    }

    if (!validarTelefono(txtTelefono.value.trim())) {
        txtTelefono.style.border = "2px solid red";
        mensajes += "<strong>El teléfono debe tener 10 dígitos numéricos.</strong><br/>";
        isValid = false;
    }

    if (txtMensaje.value.trim() === "") {
        txtMensaje.style.border = "2px solid red";
        mensajes += "<strong>El mensaje no puede estar vacío.</strong><br/>";
        isValid = false;
    }

    // Mostrar alert si hay errores
    if (!isValid) {
        mostrarAlerta(mensajes);
        return;
    }

    // Si todo está bien
    alert("Formulario válido y listo para enviar!");
    form.reset();

    txtNombre.style.border = "";
    txtCorreo.style.border = "";
    txtTelefono.style.border = "";
    txtMensaje.style.border = "";
});
