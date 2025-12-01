

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


// Heder dinamico
function initHeader() {
    const header = document.querySelector(".header-dinamico");
    if (header) {
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScroll && currentScroll > 80) {
                header.classList.add("header-hidden");
            } else {
                header.classList.remove("header-hidden");
            }

            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        });
    }

    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("site-header");
    if (!headerContainer) return;

    fetch("./header.html")
        .then(res => res.text())
        .then(html => {
            headerContainer.innerHTML = html;
            initHeader();    // Muy importante: aquí ya existen navToggle y navMenu
        })
        .catch(err => console.error("Error al cargar el header:", err));
});

