

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
  await includeHTML("#site-home", "./sections/home.html");

  // 👇 aquí ya existen las cards en el DOM
  if (typeof initTeamCards === "function") {
    initTeamCards();
  }
});

  // Si la URL tiene un hash (ej: #equipo)
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash) {
      const seccion = document.querySelector(hash);
      if (seccion) {
        const NAV_OFFSET = 100; // altura aprox de tu navbar en px

        setTimeout(() => {
          const top = seccion.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
          window.scrollTo({
            top: top,
            behavior: "smooth"
          });
        }, 150);
      }
    }
  });

  // === HEADER QUE SE ESCONDE AL BAJAR Y APARECE AL SUBIR ===
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-dinamico");
  if (!header) return;

  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Si baja y ya pasó un poco del top → ocultar
    if (currentScroll > lastScrollY && currentScroll > 80) {
      header.classList.add("header-hidden");
    } else {
      // Si sube → mostrar
      header.classList.remove("header-hidden");
    }

    // Evitar valores negativos
    lastScrollY = currentScroll <= 0 ? 0 : currentScroll;
  });
});
