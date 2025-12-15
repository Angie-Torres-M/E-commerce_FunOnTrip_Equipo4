// Función para saber si hay usuario logueado
function getCurrentUser() {
 
  // Retorna true si hay usuario logueado, null si no
  return localStorage.getItem("usuarioLogueado") === "true" ? true : null;
}

// Función para cerrar sesión
function logoutUser() {
  localStorage.removeItem("usuarioLogueado"); // Borra info del login
  location.reload(); // Recarga la página para reflejar cambios
}

document.addEventListener("DOMContentLoaded", () => {
  const loginDesktop = document.getElementById("loginLinkDesktop");
  const loginMobile = document.getElementById("loginLinkMobile");

  const currentUser = getCurrentUser();

  if (currentUser) {
    // Cambiar a "Cerrar sesión"
    loginDesktop.textContent = "Cerrar sesión";
    loginMobile.textContent = "Cerrar sesión";

    // Función de logout al hacer clic
    loginDesktop.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });

    loginMobile.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
});
