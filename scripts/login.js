// ========================================================================
// LOGIN CON LOCALSTORAGE + VALIDACIÓN + ROLES + SUPERADMIN
// ========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const LS_KEY_USUARIOS = "funontrip_usuarios";

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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🟣 Lista de superusuarios reales (los que tú definiste en auth.js)
  const ADMIN_EMAILS = [
    "danaero25@gmail.com",
    "david_carranco1111@outlook.es",
    "barrancojared577@gmail.com",
    "jorfernandofo@gmail.com",
    "anguietorres.92@gmail.com",
  ];

  const MASTER_PASSWORD = "Fun2024*";

  const isAdminEmail = (email) => ADMIN_EMAILS.includes(email.toLowerCase());

  // -------------------------------------------------------------------
  // ⭐ FUNCIÓN QUE PERMITE ACCESO DIRECTO A SUPERADMIN
  // -------------------------------------------------------------------
  function validarAdminAcceso(email, password) {
    return isAdminEmail(email) && password === MASTER_PASSWORD;
  }

  // -------------------------
  // EVENTO LOGIN
  // -------------------------
  loginBtn.addEventListener("click", () => {
    const emailValue = emailInput.value.trim().toLowerCase();
    const passwordValue = passwordInput.value.trim();

    // VALIDACIÓN EMAIL
    if (!emailValue) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo es obligatorio.",
      });
      return;
    }
    if (!validateEmail(emailValue)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingresa un correo válido.",
      });
      return;
    }

    // VALIDACIÓN PASSWORD
    if (!passwordValue) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña es obligatoria.",
      });
      return;
    }
    if (passwordValue.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    // =====================================================
    // ⭐ ACCESO DIRECTO SUPERADMIN (NO NECESITA REGISTRO)
    // =====================================================
    if (validarAdminAcceso(emailValue, passwordValue)) {
      const adminUser = {
        nombre: "Super Administrador",
        email: emailValue,
        rol: "admin",
      };

      localStorage.setItem(
        "funontrip_usuario_activo",
        JSON.stringify(adminUser)
      );

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Acceso concedido como Super Administrador.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "perfil.html";
      });

      return; // ⛔ detiene login normal
    }

    // =====================================================
    // LOGIN NORMAL (BUSCAR EN LOCALSTORAGE)
    // =====================================================
    const usuarios = obtenerUsuariosLS();
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email.toLowerCase() === emailValue &&
        usuario.password === passwordValue
    );

    if (!usuarioEncontrado) {
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "Correo o contraseña incorrectos.",
      });
      return;
    }

    // Rol basado en correo
    const rol = isAdminEmail(usuarioEncontrado.email) ? "admin" : "user";

    // Guardar sesión
    localStorage.setItem(
      "funontrip_usuario_activo",
      JSON.stringify({
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        rol,
      })
    );

    // ÉXITO NORMAL
    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: `Has iniciado sesión correctamente, ${usuarioEncontrado.nombre}.`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = rol === "admin" ? "dashboard.html" : "perfil.html";
    });
  });
});

// ========================================================================
// TOGGLE PASSWORD
// ========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle-password");

  toggles.forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.getAttribute("data-target"));
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });
});
