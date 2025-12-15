// ========================================================================
// AUTH PARA USUARIOS Y SUPERUSUARIOS (ADMIN)
// ========================================================================

// LISTA DE SUPERUSUARIOS
console.log("auth.js cargado");

const ADMIN_EMAILS = [
  "danaero25@gmail.com",
  "david_carranco1111@outlook.es",
  "barrancojared577@gmail.com",
  "jorfernandofo@gmail.com",
  "anguietorres.92@gmail.com",
];

// CONTRASEÑA MAESTRA PARA SUPERUSUARIOS
const ADMIN_MASTER_PASSWORD = "Fun2024*";

// ¿ES ADMIN?
function isAdminEmail(email) {
  return email && ADMIN_EMAILS.includes(email.toLowerCase());
}

// ========================================================================
// GUARDAR USUARIO ACTIVO (AL HACER LOGIN)
// ========================================================================
function setCurrentUser(usuario) {
  const user = {
    id: usuario.id || null,
    nombre: usuario.nombre,
    email: usuario.email.toLowerCase(),
    telefono: usuario.telefono || "",
    rol: isAdminEmail(usuario.email) ? "admin" : "user",
  };

  localStorage.setItem("currentUser", JSON.stringify(user));
}

// ========================================================================
// OBTENER USUARIO ACTUAL
// ========================================================================
function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// ========================================================================
// CERRAR SESIÓN
// ========================================================================
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ========================================================================
// PROTECCIÓN DE RUTAS
// ========================================================================

// Bloquea páginas si no hay login
function requireLogin() {
  const user = getCurrentUser();

  if (!user) {
    // Guardamos a dónde quería ir
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = "login.html";
  }
}

// Bloquea páginas solo para admins
function requireAdmin() {
  const user = getCurrentUser();

  if (!user || user.role !== "admin") {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado",
      text: "Esta sección es solo para administradores.",
    });

    setTimeout(() => (window.location.href = "perfil.html"), 1500);
  }
}

// ========================================================================
// VALIDACIÓN DE SUPERADMIN CON MASTER PASSWORD (USO OPCIONAL)
// ========================================================================
function validarAdminAcceso(email, password) {
  return isAdminEmail(email) && password === ADMIN_MASTER_PASSWORD;
}

function renderUserAvatar() {
  const user = getCurrentUser();
  if (!user || !user.nombre) return;

  const iniciales = obtenerIniciales(user.nombre);

  document.querySelectorAll(".header-avatar").forEach((avatar) => {
    avatar.textContent = iniciales;
  });
}

// Espera a que el header exista
const headerObserver = new MutationObserver(() => {
  const avatars = document.querySelectorAll(".header-avatar");
  if (avatars.length > 0) {
    renderUserAvatar();
    headerObserver.disconnect();
  }
});

headerObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

function obtenerIniciales(nombreCompleto) {
  const partes = nombreCompleto.trim().split(" ");
  if (partes.length === 1) return partes[0][0];
  return partes[0][0] + partes[partes.length - 1][0];
}
