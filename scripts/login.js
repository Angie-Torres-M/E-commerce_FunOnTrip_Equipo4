// ========================================================================
// INICIO: Simulación de inicio de sesión con localStorage
// Este archivo implementa un proceso de autenticación temporal para
// demostrar el flujo de inicio de sesión y permitir el acceso al formulario
// de creación de productos mientras se desarrolla el backend real.
// ========================================================================

// scripts/login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!loginBtn) return; // seguridad extra por si acaso

  loginBtn.addEventListener("click", () => {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Validar correo
    if (emailValue === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo es obligatorio.",
      });
      return;
    } else if (!validateEmail(emailValue)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingresa un correo válido.",
      });
      return;
    }

    // Validar contraseña
    if (passwordValue === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña es obligatoria.",
      });
      return;
    } else if (passwordValue.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    // LOGIN OK
    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Has iniciado sesión correctamente.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      // Guarda correo + rol (admin/user) en localStorage
      setCurrentUser(emailValue);

      // Redirige al perfil
      window.location.href = "perfil.html";
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

// ========================================================================
// FIN: Simulación de inicio de sesión con localStorage
// ========================================================================
