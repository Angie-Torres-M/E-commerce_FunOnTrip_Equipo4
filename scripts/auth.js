// ========================================================================
// INICIO: Simulación de autenticación y roles con localStorage
// Este módulo implementa una gestión temporal de usuarios para permitir
// iniciar sesión, asignar roles (usuario / administrador) y mantener una
// sesión activa mediante localStorage. Su propósito es exclusivamente
// demostrar el funcionamiento del sistema hasta implementar un backend real.
// ========================================================================

// scripts/auth.js

// 1. Lista de superusuarios (admins)
const ADMIN_EMAILS = [
  "danaero25@gmail.com",
  "david_carranco1111@outlook.es",
  "barrancojared577@gmail.com",
  "jorfernandofo@gmail.com",
  "anguietorres.92@gmail.com"
];

// 2. Función para saber si un email es admin
function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// 3. Guardar usuario actual en localStorage
function setCurrentUser(email) {
  if (!email) return;

  const user = {
    email: email.toLowerCase(),
    role: isAdminEmail(email) ? "admin" : "user"
  };

  localStorage.setItem("currentUser", JSON.stringify(user));
}

// 4. Obtener usuario actual
function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al parsear currentUser", error);
    return null;
  }
}

// 5. Cerrar sesión
function logoutUser() {
  localStorage.removeItem("currentUser");
}

// ========================================================================
// FIN: Simulación de autenticación y roles con localStorage
// ========================================================================
