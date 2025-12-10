// scripts/perfil.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("perfil.js cargado");


  // 1. LÓGICA DE COLLAPSE

  const botones = document.querySelectorAll('[data-bs-toggle="collapse"]');

  botones.forEach((boton) => {
    const target = boton.getAttribute("data-bs-target");
    const collapseEl = document.querySelector(target);

    if (!collapseEl) return;

    collapseEl.addEventListener("shown.bs.collapse", () => {
      boton.textContent = "Ver menos";
    });

    collapseEl.addEventListener("hidden.bs.collapse", () => {
      boton.textContent = "Ver más";
    });
  });


  // ========================================================================
  // INICIO: Simulación de perfil y roles usando localStorage
  // Este bloque permite mostrar datos del usuario, gestionar permisos
  // y habilitar funciones administrativas (como crear productos) de forma
  // temporal para fines de demostración, mientras se implementa el backend real.
  // ========================================================================


  // 2. LÓGICA DE PERFIL / ROLES

  const user = getCurrentUser(); // viene de auth.js

  // Si no hay usuario → mandamos a login
  if (!user) {
    alert("Debes iniciar sesión para ver tu perfil.");
    window.location.href = "login.html";
    return;
  }

  const emailSpan = document.getElementById("perfil-email");
  const rolSpan = document.getElementById("perfil-rol");
  const btnAgregar = document.getElementById("btn-agregar-destino");
  const btnLogout = document.getElementById("btn-logout");

  if (emailSpan) {
    emailSpan.textContent = user.email;
  }

  if (rolSpan) {
    rolSpan.textContent =
      user.role === "admin" ? "Administrador" : "Usuario";
  }

  // Mostrar botón para crear paquete SOLO si es admin
  if (user.role === "admin" && btnAgregar) {
    btnAgregar.style.display = "inline-block";
    btnAgregar.addEventListener("click", () => {
      window.location.href = "form-producto.html";
    });
  }

  // Cerrar sesión
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutUser(); // función de auth.js
      window.location.href = "login.html";
    });
  }

  //mi perfil y perfil super usuario
  const tituloPrincipal = document.getElementById("titulo-principal");

// Cambiar título según rol
if (user.role === "admin") {
  tituloPrincipal.innerHTML = `Perfil <span>super usuario</span> `;
} else {
  tituloPrincipal.textContent = "Mi perfil";
}


  // ========================================================================
  // FIN: Simulación de perfil y roles usando localStorage
  // ========================================================================

});
