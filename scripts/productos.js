// scripts/productos.js

console.log("JS de productos cargado correctamente");

// ===========================
//   CONFIGURACIÓN DE LA API
// ===========================
window.productos = [
  {
    id: 1,
    nombre: "Escapada Romántica en Cancún",
    precio: 8999,
    descripcion: "4 días, 3 noches · Hotel frente al mar · Cena romántica incluida",
    imagen: "./images/productos/cancun-romantico.jpg",
    ubicacion: "nacional",
    tipo: "romantico"
  },
  {
    id: 2,
    nombre: "Aventura en San Miguel de Allende",
    precio: 5499,
    descripcion: "3 días, 2 noches · Tour gastronómico · Recorrido histórico",
    imagen: "./images/productos/sanmiguel.jpg",
    ubicacion: "nacional",
    tipo: "gastronomico"
  },
  {
    id: 3,
    nombre: "Relax en Playa del Carmen",
    precio: 7299,
    descripcion: "5 días, 4 noches · Spa incluido · Yoga frente al mar",
    imagen: "./images/productos/relax-playa.jpeg",
    ubicacion: "nacional",
    tipo: "relax"
  },
  {
    id: 4,
    nombre: "Familia en Riviera Maya",
    precio: 12999,
    descripcion: "7 días, 6 noches · Todo incluido · Actividades para niños",
    imagen: "./images/productos/familiar-riviera.jpg",
    ubicacion: "nacional",
    tipo: "familiar"
  },
  {
    id: 5,
    nombre: "París Romántico",
    precio: 24999,
    descripcion: "6 días, 5 noches · Torre Eiffel · Crucero por el Sena",
    imagen: "./images/productos/romantic-paris.jpg",
    ubicacion: "internacional",
    tipo: "romantico"
  },
  {
    id: 6,
    nombre: "Aventura en Japón",
    precio: 35999,
    descripcion: "10 días, 9 noches · Tokio, Kyoto, Osaka · Guía incluido",
    imagen: "./images/productos/japan-adventure.jpg",
    ubicacion: "internacional",
    tipo: "aventura"
  },
  {
    id: 7,
    nombre: "Roma Gastronómica",
    precio: 19999,
    descripcion: "5 días, 4 noches · Clases de cocina · Tour de vinos",
    imagen: "./images/productos/rome-gastronomy.jpg",
    ubicacion: "internacional",
    tipo: "gastronomico"
  },
  {
    id: 8,
    nombre: "Santorini Relax",
    precio: 28999,
    descripcion: "7 días, 6 noches · Hotel con vista al mar · Spa de lujo",
    imagen: "./images/productos/santorini-relax.jpg",
    ubicacion: "internacional",
    tipo: "relax"
  },
  {
    id: 9,
    nombre: "Pet Friendly en Valle de Bravo",
    precio: 4999,
    descripcion: "3 días, 2 noches · Hotel pet friendly · Actividades con tu mascota",
    imagen: "./images/productos/petfriendly-valle.jpg",
    ubicacion: "petfriendly",
    tipo: "aventura"
  },
  {
    id: 10,
    nombre: "Pet Friendly en Puerto Vallarta",
    precio: 8499,
    descripcion: "5 días, 4 noches · Playa dog-friendly · Servicios veterinarios",
    imagen: "./images/productos/petfriendly-vallarta.jpg",
    ubicacion: "petfriendly",
    tipo: "relax"
  },
  {
    id: 11,
    nombre: "Aventura en Barrancas del Cobre",
    precio: 6999,
    descripcion: "4 días, 3 noches · Tren Chepe · Senderismo y tirolesa",
    imagen: "./images/productos/barrancas-adventure.jpg",
    ubicacion: "nacional",
    tipo: "aventura"
  },
  {
    id: 12,
    nombre: "Relax en Bacalar",
    precio: 5799,
    descripcion: "4 días, 3 noches · Laguna de 7 colores · Masajes incluidos",
    imagen: "./images/productos/relax-bacalar.jpg",
    ubicacion: "nacional",
    tipo: "relax"
  },
  {
    id: 13,
    nombre: "Gastronómico en Oaxaca",
    precio: 4999,
    descripcion: "3 días, 2 noches · Tour de mezcal · Clases de cocina tradicional",
    imagen: "./images/productos/oaxaca-gastronomy.jpg",
    ubicacion: "nacional",
    tipo: "gastronomico"
  },
  {
    id: 14,
    nombre: "Aventura en Nueva Zelanda",
    precio: 42999,
    descripcion: "12 días, 11 noches · Fiordos y glaciares · Deportes extremos",
    imagen: "./images/productos/new-zealand-adventure.jpg",
    ubicacion: "internacional",
    tipo: "aventura"
  },
  {
    id: 15,
    nombre: "Familiar en Disney Orlando",
    precio: 28999,
    descripcion: "7 días, 6 noches · 4 parques incluidos · Hotel resort",
    imagen: "./images/productos/disney-orlando.jpg",
    ubicacion: "internacional",
    tipo: "familiar"
  },
  {
    id: 16,
    nombre: "Romántico en Venecia",
    precio: 26999,
    descripcion: "5 días, 4 noches · Paseo en góndola · Cena en el Gran Canal",
    imagen: "./images/productos/venecia-romantic.jpg",
    ubicacion: "internacional",
    tipo: "romantico"
  },
  {
    id: 17,
    nombre: "Gastronómico en Barcelona",
    precio: 22999,
    descripcion: "6 días, 5 noches · Tour tapas · Visita a mercado La Boquería",
    imagen: "./images/productos/barcelona-gastronomy.jpg",
    ubicacion: "internacional",
    tipo: "gastronomico"
  },
  {
    id: 18,
    nombre: "Familiar en Costa Rica",
    precio: 18999,
    descripcion: "8 días, 7 noches · Volcanes y playas · Actividades para niños",
    imagen: "./images/productos/costarica-family.jpg",
    ubicacion: "internacional",
    tipo: "familiar"
  },
  {
    id: 19,
    nombre: "Pet Friendly en Tequisquiapan",
    precio: 3999,
    descripcion: "2 días, 1 noche · Viñedos pet friendly · Parque canino",
    imagen: "./images/productos/petfriendly-tequis.jpg",
    ubicacion: "petfriendly",
    tipo: "relax"
  },
  {
    id: 20,
    nombre: "Pet Friendly en Tulum",
    precio: 9999,
    descripcion: "5 días, 4 noches · Playas dog-friendly · Spa pet friendly",
    imagen: "./images/productos/petfriendly-tulum.jpg",
    ubicacion: "petfriendly",
    tipo: "aventura"
  }
];

// ===========================
//   RENDERIZAR PRODUCTOS
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  function crearCardProducto(producto) {
    return `
      <article class="col-12 col-sm-6 col-md-4 col-lg-3 producto-card" 
               data-tipo="${producto.tipo}">
        
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

  renderizarProductos();

  // ===========================
  //     FILTRO POR TIPO
  // ===========================
  const botonesFiltro = document.querySelectorAll(".btn-filtro");

  botonesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      const filtro = btn.dataset.filtro;

      botonesFiltro.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".producto-card").forEach(card => {
        const tipo = card.dataset.tipo;

        if (filtro === "todos" || filtro === tipo) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
