document.addEventListener("DOMContentLoaded", () => {
  const protectedPages = ["carrito.html", "perfil.html", "pago.html"];

  const adminPages = ["form-producto.html"];

  const currentPage = window.location.pathname.split("/").pop();

  // 🔐 SOLO ADMIN
  if (adminPages.includes(currentPage)) {
    requireAdmin();
    return;
  }

  // 🔒 LOGIN NORMAL
  if (protectedPages.includes(currentPage)) {
    requireLogin();
  }
});
