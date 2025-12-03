// contacto.js
// Servicio: service_dtto90b
// Template notificación: template_lnoju47
// Template auto-reply:  template_xnenq1c

document.addEventListener("DOMContentLoaded", function () {
  console.log("JS de contacto cargado");

  // Inicializar EmailJS
  emailjs.init({
    publicKey: "9yqCdvwvR-M5VLJf1",
  });

  const form = document.getElementById("form-contacto");
  const estadoEnvio = document.getElementById("estado-envio");
  const btnEnviar = document.getElementById("btn-enviar");

  if (!form) {
    console.error("No se encontró el formulario con id 'form-contacto'.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Submit del formulario capturado");

    if (estadoEnvio) estadoEnvio.innerHTML = "";

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let errores = false;

    // ===== VALIDACIONES =====
    const nombreInput = document.getElementById("nombre");
    const errorNombre = document.getElementById("error-nombre");
    if (nombre.length < 2 || !/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre)) {
      errorNombre.textContent =
        "El nombre debe tener al menos 2 letras y solo contener letras.";
      nombreInput.classList.add("is-invalid");
      errores = true;
    } else {
      errorNombre.textContent = "";
      nombreInput.classList.remove("is-invalid");
    }

    const correoInput = document.getElementById("correo");
    const errorCorreo = document.getElementById("error-correo");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errorCorreo.textContent = "El correo electrónico no es válido.";
      correoInput.classList.add("is-invalid");
      errores = true;
    } else {
      errorCorreo.textContent = "";
      correoInput.classList.remove("is-invalid");
    }

    const telefonoInput = document.getElementById("telefono");
    const errorTelefono = document.getElementById("error-telefono");
    if (!/^\d{10}$/.test(telefono)) {
      errorTelefono.textContent =
        "El teléfono debe tener exactamente 10 dígitos numéricos.";
      telefonoInput.classList.add("is-invalid");
      errores = true;
    } else {
      errorTelefono.textContent = "";
      telefonoInput.classList.remove("is-invalid");
    }

    const mensajeInput = document.getElementById("mensaje");
    const errorMensaje = document.getElementById("error-mensaje");
    if (mensaje === "") {
      errorMensaje.textContent = "El mensaje no puede estar vacío.";
      mensajeInput.classList.add("is-invalid");
      errores = true;
    } else {
      errorMensaje.textContent = "";
      mensajeInput.classList.remove("is-invalid");
    }

    if (errores) {
      console.log("Formulario con errores. No se envía.");
      if (estadoEnvio) {
        estadoEnvio.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
            <strong>Corrige los campos marcados.</strong> No se pudo enviar el mensaje.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
        `;
      }
      return;
    }

    // ===== ENVIAR CON EMAILJS =====
    const SERVICE_ID = "service_dtto90b";
    const TEMPLATE_CONTACTO = "template_lnoju47"; // notificación a FunOnTrip
    const TEMPLATE_AUTOREPLY = "template_xnenq1c"; // correo de confirmación

    const templateParams = {
      name: nombre,
      email: correo,
      phone: telefono,
      message: mensaje,
    };

    console.log("Enviando ", templateParams);

    if (btnEnviar) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";
    }

    // 1) Enviar correo a FunOnTrip
    emailjs
      .send(SERVICE_ID, TEMPLATE_CONTACTO, templateParams)
      .then(function (response) {
        console.log("EmailJS (Contact Us) OK:", response);

        // 2) Enviar auto-reply al usuario (no rompemos la UX si falla)
        emailjs
          .send(SERVICE_ID, TEMPLATE_AUTOREPLY, templateParams)
          .then((res) => {
            console.log("EmailJS (Auto-Reply) OK:", res);
          })
          .catch((err) => {
            console.warn("Auto-Reply falló, pero el contacto sí se envió:", err);
          });

        if (estadoEnvio) {
          estadoEnvio.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
              <strong>¡Mensaje enviado! </strong> Gracias por contactarte.
              Te responderemos muy pronto.
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
          `;
        }

        // Botón → Enviado y se oculta mientras está el mensaje
        btnEnviar.textContent = "Enviado";
        btnEnviar.disabled = true;
        btnEnviar.style.visibility = "hidden";

        // Limpiar campos
        form.reset();
        ["nombre", "correo", "telefono", "mensaje"].forEach((id) => {
          document.getElementById(id).classList.remove("is-invalid");
        });

        // Después de 4s, quitamos el mensaje y restauramos el botón
        setTimeout(() => {
          if (estadoEnvio) estadoEnvio.innerHTML = "";
          btnEnviar.style.visibility = "visible";
          btnEnviar.disabled = false;
          btnEnviar.textContent = "Enviar";
        }, 4000);
      })
      .catch(function (error) {
        console.error("Error al enviar con EmailJS:", error);

        if (estadoEnvio) {
          estadoEnvio.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
              <strong>¡Error al enviar!</strong> Inténtalo de nuevo más tarde.
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
          `;
        }

        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar";
      });
  });
});
