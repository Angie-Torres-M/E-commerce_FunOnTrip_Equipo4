// scripts/productos.js

console.log("JS de productos cargado correctamente");

// ===============================
// 1. CATÁLOGO POR DEFECTO
// ===============================
const productosPorDefecto = [
  {
    id: 1,
    nombre: "Escapada Romántica en Cancún",
    precio: 8999,
    descripcion: "4 días, 3 noches · Hotel frente al mar · Cena romántica incluida",
    imagen: "./images/productos/cancun-romantico.webp",
    ubicacion: "nacional",
    tipo: "romantico"
  },
  {
    id: 2,
    nombre: "Aventura en San Miguel de Allende",
    precio: 5499,
    descripcion: "3 días, 2 noches · Tour gastronómico · Recorrido histórico",
    imagen: "./images/productos/sanmiguel.webp",
    ubicacion: "nacional",
    tipo: "gastronomico"
  },
  {
    id: 3,
    nombre: "Relax en Playa del Carmen",
    precio: 7299,
    descripcion: "5 días, 4 noches · Spa incluido · Yoga frente al mar",
    imagen: "./images/productos/relax-playa.webp",
    ubicacion: "nacional",
    tipo: "relax"
  },
  {
    id: 4,
    nombre: "Familia en Riviera Maya",
    precio: 12999,
    descripcion: "7 días, 6 noches · Todo incluido · Actividades para niños",
    imagen: "./images/productos/familiar-riviera.webp",
    ubicacion: "nacional",
    tipo: "familiar"
  },
  {
    id: 5,
    nombre: "París Romántico",
    precio: 24999,
    descripcion: "6 días, 5 noches · Torre Eiffel · Crucero por el Sena",
    imagen: "./images/productos/romantic-paris.webp",
    ubicacion: "internacional",
    tipo: "romantico"
  },
  {
    id: 6,
    nombre: "Aventura en Japón",
    precio: 35999,
    descripcion: "10 días, 9 noches · Tokio, Kyoto, Osaka · Guía incluido",
    imagen: "./images/productos/japan-adventure.webp",
    ubicacion: "internacional",
    tipo: "aventura"
  },
  {
    id: 7,
    nombre: "Roma Gastronómica",
    precio: 19999,
    descripcion: "5 días, 4 noches · Clases de cocina · Tour de vinos",
    imagen: "./images/productos/rome-gastronomy.webp",
    ubicacion: "internacional",
    tipo: "gastronomico"
  },
  {
    id: 8,
    nombre: "Santorini Relax",
    precio: 28999,
    descripcion: "7 días, 6 noches · Hotel con vista al mar · Spa de lujo",
    imagen: "./images/productos/santorini-relax.webp",
    ubicacion: "internacional",
    tipo: "relax"
  },
  {
    id: 9,
    nombre: "Pet Friendly en Valle de Bravo",
    precio: 4999,
    descripcion: "3 días, 2 noches · Hotel pet friendly · Actividades con tu mascota",
    imagen: "./images/productos/petfriendly-valle.webp",
    ubicacion: "petfriendly",
    tipo: "aventura"
  },
  {
    id: 10,
    nombre: "Pet Friendly en Puerto Vallarta",
    precio: 8499,
    descripcion: "5 días, 4 noches · Playa dog-friendly · Servicios veterinarios",
    imagen: "./images/productos/petfriendly-vallarta.webp",
    ubicacion: "petfriendly",
    tipo: "relax"
  },
  {
    id: 11,
    nombre: "Aventura en Barrancas del Cobre",
    precio: 6999,
    descripcion: "4 días, 3 noches · Tren Chepe · Senderismo y tirolesa",
    imagen: "./images/productos/barrancas-adventure.webp",
    ubicacion: "nacional",
    tipo: "aventura"
  },
  {
    id: 12,
    nombre: "Relax en Bacalar",
    precio: 5799,
    descripcion: "4 días, 3 noches · Laguna de 7 colores · Masajes incluidos",
    imagen: "./images/productos/relax-bacalar.webp",
    ubicacion: "nacional",
    tipo: "relax"
  },
  {
    id: 13,
    nombre: "Gastronómico en Oaxaca",
    precio: 4999,
    descripcion: "3 días, 2 noches · Tour de mezcal · Clases de cocina tradicional",
    imagen: "./images/productos/oaxaca-gastronomy.webp",
    ubicacion: "nacional",
    tipo: "gastronomico"
  },
  {
    id: 14,
    nombre: "Aventura en Nueva Zelanda",
    precio: 42999,
    descripcion: "12 días, 11 noches · Fiordos y glaciares · Deportes extremos",
    imagen: "./images/productos/new-zealand-adventure.webp",
    ubicacion: "internacional",
    tipo: "aventura"
  },
  {
    id: 15,
    nombre: "Familiar en Disney Orlando",
    precio: 28999,
    descripcion: "7 días, 6 noches · 4 parques incluidos · Hotel resort",
    imagen: "./images/productos/disney-orlando.webp",
    ubicacion: "internacional",
    tipo: "familiar"
  },
  {
    id: 16,
    nombre: "Romántico en Venecia",
    precio: 26999,
    descripcion: "5 días, 4 noches · Paseo en góndola · Cena en el Gran Canal",
    imagen: "./images/productos/venecia-romantic.webp",
    ubicacion: "internacional",
    tipo: "romantico"
  },
  {
    id: 17,
    nombre: "Gastronómico en Barcelona",
    precio: 22999,
    descripcion: "6 días, 5 noches · Tour tapas · Visita a mercado La Boquería",
    imagen: "./images/productos/barcelona-gastronomy.webp",
    ubicacion: "internacional",
    tipo: "gastronomico"
  },
  {
    id: 18,
    nombre: "Familiar en Costa Rica",
    precio: 18999,
    descripcion: "8 días, 7 noches · Volcanes y playas · Actividades para niños",
    imagen: "./images/productos/costarica-family.webp",
    ubicacion: "internacional",
    tipo: "familiar"
  },
  {
    id: 19,
    nombre: "Pet Friendly en Tequisquiapan",
    precio: 3999,
    descripcion: "2 días, 1 noche · Viñedos pet friendly · Parque canino",
    imagen: "./images/productos/petfriendly-tequis.webp",
    ubicacion: "petfriendly",
    tipo: "relax"
  },
  {
    id: 20,
    nombre: "Pet Friendly en Tulum",
    precio: 9999,
    descripcion: "5 días, 4 noches · Playas dog-friendly · Spa pet friendly",
    imagen: "./images/productos/petfriendly-tulum.webp",
    ubicacion: "petfriendly",
    tipo: "aventura"
  }
];

// ===============================
// 2. CARGAR DESDE LOCALSTORAGE
// ===============================
const guardados = localStorage.getItem("productos");

if (guardados) {
  try {
    window.productos = JSON.parse(guardados);
    console.log("Productos cargados desde localStorage");
  } catch (e) {
    console.error("Error al parsear productos de localStorage, usando por defecto", e);
    window.productos = productosPorDefecto;
  }
} else {
  window.productos = productosPorDefecto;
  localStorage.setItem("productos", JSON.stringify(window.productos));
  console.log("Productos por defecto guardados en localStorage");
}

// ===============================
// 3. CREAR CARD
// ===============================
function crearCardProducto(producto) {
  return `
    <article class="col-12 col-sm-6 col-md-4 col-lg-3 producto-card" 
             data-tipo="${producto.tipo}"
             data-ubicacion="${producto.ubicacion}"
             data-precio="${producto.precio}">
      
      <div class="producto-img-wrapper">
        <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}">
      </div>

      <div class="producto-content">
        <h3 class="producto-titulo">${producto.nombre}</h3>
        <p class="producto-descripcion">${producto.descripcion}</p>
        <p class="producto-precio">$${producto.precio.toLocaleString('es-MX')} MXN</p>

        <button class="btn-agregar" data-id="${producto.id}">
          <i class="fas fa-shopping-cart"></i> Agregar al carrito
        </button>
      </div>
    </article>
  `;
}

// ===============================
// 4. RENDERIZAR PRODUCTOS
// ===============================
function renderizarProductos() {
  const contenedorN = document.getElementById("productos-nacionales");
  const contenedorI = document.getElementById("productos-internacionales");
  const contenedorP = document.getElementById("productos-petfriendly");

  if (!contenedorN || !contenedorI || !contenedorP) return;

  contenedorN.innerHTML = "";
  contenedorI.innerHTML = "";
  contenedorP.innerHTML = "";

  window.productos.forEach(p => {
    const card = crearCardProducto(p);

    if (p.ubicacion === "nacional") contenedorN.innerHTML += card;
    if (p.ubicacion === "internacional") contenedorI.innerHTML += card;
    if (p.ubicacion === "petfriendly") contenedorP.innerHTML += card;
  });
}

// ===============================
// 5. FILTROS + TOGGLE (DOM READY)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  // Render inicial
  renderizarProductos();

  // ---------- ESTADO DE LOS FILTROS ----------
  let filtroUbicacion = "todos"; // nacional / internacional / petfriendly / todos
  let filtroTipo = "todos";      // romantico / aventura / etc / todos
  let maxPrecio = null;          // null = todos, 10000, 20000, 20001 (>20000)

  function aplicarFiltros() {
    document.querySelectorAll(".producto-card").forEach(card => {
      const ubicacion = card.dataset.ubicacion;
      const tipo = card.dataset.tipo;
      const precio = parseInt(card.dataset.precio, 10);

      const coincideUbicacion =
        (filtroUbicacion === "todos" || filtroUbicacion === ubicacion);

      const coincideTipo =
        (filtroTipo === "todos" || filtroTipo === tipo);

      const coincidePrecio =
        (maxPrecio === null ||
         (maxPrecio === 20001 && precio > 20000) ||  // botón "> 20,000"
         (maxPrecio !== 20001 && precio <= maxPrecio));

      if (coincideUbicacion && coincideTipo && coincidePrecio) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function activarBoton(boton, selectorGrupo) {
    document
      .querySelectorAll(selectorGrupo)
      .forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
  }

  // ---- Filtros de ubicación (Ubicación / Destino) ----
  const botonesUbicacion = document.querySelectorAll("#filtros-ubicacion .filtro-destino");
  botonesUbicacion.forEach(btn => {
    btn.addEventListener("click", () => {
      filtroUbicacion = btn.dataset.dest; // "todos", "nacional", "internacional", "petfriendly"
      activarBoton(btn, "#filtros-ubicacion .filtro-destino");
      aplicarFiltros();
    });
  });

  // ---- Filtros de experiencia (tipo) ----
  const botonesExperiencia = document.querySelectorAll("#filtros-experiencia .filtro-experiencia");
  botonesExperiencia.forEach(btn => {
    btn.addEventListener("click", () => {
      filtroTipo = btn.dataset.exp; // "todos", "romantico", "aventura", etc.
      activarBoton(btn, "#filtros-experiencia .filtro-experiencia");
      aplicarFiltros();
    });
  });

  // ---- Filtros de precio ----
  const botonesPrecio = document.querySelectorAll("#filtros-precio .filtro-precio");
  botonesPrecio.forEach(btn => {
    btn.addEventListener("click", () => {
      maxPrecio = btn.dataset.maxprice
        ? parseInt(btn.dataset.maxprice, 10)
        : null; // vacío = todos

      activarBoton(btn, "#filtros-precio .filtro-precio");
      aplicarFiltros();
    });
  });

  // ---- Botón para mostrar/ocultar panel flotante de filtros (móvil) ----
  const toggleBtn = document.getElementById("toggle-filtros");
  const panelFiltros = document.querySelector(".container-filtro-float");

  if (toggleBtn && panelFiltros) {
    toggleBtn.addEventListener("click", () => {
      panelFiltros.classList.toggle("show");
    });
  }
});
