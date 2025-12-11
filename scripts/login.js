// ========================================================================
// INICIO: Simulación de inicio de sesión con localStorage
// Actualizado para usar los usuarios registrados en localStorage
// y mantener el redireccionamiento a perfil.html
// ========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const LS_KEY_USUARIOS = "funontrip_usuarios"; // misma clave que en registro.js

  if (!loginBtn || !emailInput || !passwordInput) return;

  // ---- Helpers ----
  const obtenerUsuariosLS = () => {
    try {
      const data = localStorage.getItem(LS_KEY_USUARIOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer usuarios de LS:", error);
      return [];
    }
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ---- Evento click login ----
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

    // Validar contraseña (longitud mínima, la fuerza ya se validó en registro)
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

    // Buscar usuario en localStorage
    const usuarios = obtenerUsuariosLS();
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === emailValue && usuario.password === passwordValue
    );

    if (!usuarioEncontrado) {
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "Correo o contraseña incorrectos. Si aún no tienes cuenta, regístrate.",
      });
      return;
    }

    // LOGIN OK
    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: `Has iniciado sesión correctamente, ${usuarioEncontrado.nombre}.`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      // Usa la función de auth.js para guardar el usuario actual
      if (typeof setCurrentUser === "function") {
        // si tu auth.js espera solo el correo, dejamos el email
        setCurrentUser(usuarioEncontrado.email);
      } else {
        // fallback por si acaso, para no romper nada
        localStorage.setItem(
          "funontrip_usuario_activo",
          JSON.stringify(usuarioEncontrado)
        );
      }

      // Redirige al perfil (lo que querías conservar)
      window.location.href = "perfil.html";
    });
  });
});

// ========================================================================
// FIN: Simulación de inicio de sesión con localStorage
// ========================================================================

// Ver / Ocultar Contraseña
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle-password");

  toggles.forEach((icon) => {
    icon.addEventListener("click", () => {
      const inputId = icon.getAttribute("data-target");
      const input = document.getElementById(inputId);

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });
});
