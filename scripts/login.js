// ========================================================================
// LOGIN CON LOCALSTORAGE + ROLES + REDIRECCIÓN (SIEMPRE A INDEX)
// ========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const LS_KEY_USUARIOS = "funontrip_usuarios";

  if (!loginBtn || !emailInput || !passwordInput) return;

  // -------------------------
  // HELPERS
  // -------------------------
  const obtenerUsuariosLS = () => {
    try {
      const data = localStorage.getItem(LS_KEY_USUARIOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer usuarios:", error);
      return [];
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const ADMIN_EMAILS = [
    "danaero25@gmail.com",
    "david_carranco1111@outlook.es",
    "barrancojared577@gmail.com",
    "jorfernandofo@gmail.com",
    "anguietorres.92@gmail.com",
  ];

  const MASTER_PASSWORD = "Fun2024*";

  const isAdminEmail = (email) => ADMIN_EMAILS.includes(email.toLowerCase());

  function validarAdminAcceso(email, password) {
    return isAdminEmail(email) && password === MASTER_PASSWORD;
  }

  // -------------------------
  // LOGIN
  // -------------------------
  loginBtn.addEventListener("click", () => {
    const emailValue = emailInput.value.trim().toLowerCase();
    const passwordValue = passwordInput.value.trim();

    // VALIDACIONES
    if (!emailValue || !validateEmail(emailValue)) {
      Swal.fire("Error", "Correo inválido", "error");
      return;
    }

    if (!passwordValue || passwordValue.length < 6) {
      Swal.fire("Error", "Contraseña inválida", "error");
      return;
    }

    // =====================================================
    // SUPERADMIN (email admin + master password)
    // =====================================================
    if (validarAdminAcceso(emailValue, passwordValue)) {
      const adminUser = {
        id: null,
        nombre: "Super Administrador",
        email: emailValue,
        telefono: "",
        // IMPORTANTÍSIMO: que el core lo entienda siempre
        rol: "admin",
        role: "admin", // compat por si alguna pantalla vieja lee role
      };

      setCurrentUser(adminUser);

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Acceso como Super Administrador",
        timer: 1500,
        showConfirmButton: false,
      }).then(redirigirDespuesLogin);

      return;
    }

    // =====================================================
    // LOGIN NORMAL
    // =====================================================
    const usuarios = obtenerUsuariosLS();
    const usuarioEncontrado = usuarios.find(
      (u) => u.email.toLowerCase() === emailValue && u.password === passwordValue
    );

    if (!usuarioEncontrado) {
      Swal.fire("Error", "Credenciales incorrectas", "error");
      return;
    }

    // Si el usuario normal resulta ser admin por email, lo forzamos a admin
    const userToSave = {
      ...usuarioEncontrado,
      rol: isAdminEmail(emailValue) ? "admin" : (usuarioEncontrado.rol || "user"),
      role: isAdminEmail(emailValue) ? "admin" : (usuarioEncontrado.role || usuarioEncontrado.rol || "user"),
    };

    setCurrentUser(userToSave);

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: `Hola ${usuarioEncontrado.nombre}`,
      timer: 1500,
      showConfirmButton: false,
    }).then(redirigirDespuesLogin);
  });

  // -------------------------
  // REDIRECCIÓN CENTRALIZADA (SIEMPRE INDEX)
  // -------------------------
  function redirigirDespuesLogin() {
    // aunque exista redirectAfterLogin, tu regla nueva dice: siempre index
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = "index.html";
  }
});

// ========================================================================
// TOGGLE PASSWORD
// ========================================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-password-login").forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.getAttribute("data-target"));
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  });
});
