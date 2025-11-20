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
  // 1) Inserta HEADER
  await includeHTML("#site-header", "./header.html");

  // 2) Inserta FOOTER
  await includeHTML("#site-footer", "./footer.html");
//3) Inserta secciones de about
 await includeHTML("#site-agencia", "./sections/about/agencia.html");
await includeHTML("#site-valores", "./sections/about/valores.html");
await includeHTML("#site-cards", "./sections/about/cards.html");

//4) Inserta secciones de productos y promociones previstas para el futuro 

await includeHTML("#site-productos_y_promociones", "./sections/productos/productos_y_promociones.html");

  });
