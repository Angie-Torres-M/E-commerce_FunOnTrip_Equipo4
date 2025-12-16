/*document.addEventListener("DOMContentLoaded", () => {
  const protectedPages = ["carrito.html", "perfil.html", "pago.html"];
  const adminPages = ["form-producto.html"];

  const currentPage = window.location.pathname.split("/").pop();
  const user = window.getCurrentUser?.();

  if (adminPages.includes(currentPage)) {
    if (!user || user.role !== "admin") {
      window.location.href = "./index.html";
    }
    return;
  }

  if (protectedPages.includes(currentPage)) {
    if (!user) {
      window.location.href = "./login.html";
    }
  }
});*/
