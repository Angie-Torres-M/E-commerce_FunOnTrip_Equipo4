// ========================================================================
// AUTH PARA USUARIOS Y SUPERUSUARIOS (ADMIN)
// ========================================================================

// LISTA DE SUPERUSUARIOS
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
  if (!usuario) return;

  const user = {
    id: usuario.id || null,
    nombre: usuario.nombre,
    email: usuario.email.toLowerCase(),
    role: isAdminEmail(usuario.email) ? "admin" : "user",
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
  if (!user) window.location.href = "login.html";
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
