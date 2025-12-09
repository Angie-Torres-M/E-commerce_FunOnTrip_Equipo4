document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const password = document.getElementById("password").value.trim();
      const password2 = document.getElementById("password2").value.trim();

      if (nombre === "" || !/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(nombre)) {
        Swal.fire({ icon: "error", title: "Error", text: "Ingresa un nombre válido." });
        return;
      }

      if (email === "" || !validateEmail(email)) {
        Swal.fire({ icon: "error", title: "Error", text: "Ingresa un correo válido." });
        return;
      }

      if (telefono === "" || !/^\d{10}$/.test(telefono)) {
        Swal.fire({ icon: "error", title: "Error", text: "Ingresa un número de teléfono válido (10 dígitos)." });
        return;
      }

      if (password === "" || password.length < 6) {
        Swal.fire({ icon: "error", title: "Error", text: "La contraseña debe tener al menos 6 caracteres." });
        return;
      }

      if (password2 === "" || password2 !== password) {
        Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden." });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        console.log("Formulario de registro válido, listo para enviar.");
        formRegistro.reset();
      });
    });
  }
});
