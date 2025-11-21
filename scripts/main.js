

// Inicializar los componentes html
// Incluir fragmentos HTML
async function includeHTML(selector, url) {
  const host = document.querySelector(selector);
  if (!host) return; // si no existe el contenedor, salimos

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    console.error(`No se pudo cargar ${url}`);
    return;
  }

  host.innerHTML = await res.text();
}



document.addEventListener("DOMContentLoaded", async () => {
  // 1) Header y footer
  await includeHTML("#site-header", "./header.html");
  await includeHTML("#site-footer", "./footer.html");

  // 2) Secciones de about
  await includeHTML("#site-agencia", "./sections/about/agencia.html");
  await includeHTML("#site-valores", "./sections/about/valores.html");
  await includeHTML("#site-teamCards", "./sections/about/teamCards.html");

  // 3) Secciones de productos
  await includeHTML("#site-productos_y_promociones", "./sections/productos/productos_y_promociones.html");

  // 👇 aquí ya existen las cards en el DOM
  if (typeof initTeamCards === "function") {
    initTeamCards();
  }
});
