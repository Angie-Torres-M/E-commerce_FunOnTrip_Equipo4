console.log("JS de productos cargado correctamente");

// Intentamos cargar los productos desde localStorage
const guardados = localStorage.getItem("productos");

if (guardados) {
  // Si existen productos guardados por el usuario, los usamos
  window.productos = JSON.parse(guardados);
  console.log("Productos cargados desde localStorage");
} else {
  // Si no hay nada guardado, cargamos los productos por defecto
  window.productos = [
    {
      id: 1,
      nombre: "Escapada Romántica en Cancún",
      precio: 8999,
      descripcion:
        "4 días, 3 noches · Hotel frente al mar · Cena romántica incluida",
      imagen: "./images/productos/cancun-romantico.webp",
      ubicacion: "nacional",
      tipo: "romantico",
    },
    {
      id: 2,
      nombre: "Aventura en San Miguel de Allende",
      precio: 5499,
      descripcion: "3 días, 2 noches · Tour gastronómico · Recorrido histórico",
      imagen: "./images/productos/sanmiguel.webp",
      ubicacion: "nacional",
      tipo: "gastronomico",
    },
    {
      id: 3,
      nombre: "Relax en Playa del Carmen",
      precio: 7299,
      descripcion: "5 días, 4 noches · Spa incluido · Yoga frente al mar",
      imagen: "./images/productos/relax-playa.webp",
      ubicacion: "nacional",
      tipo: "relax",
    },
    {
      id: 4,
      nombre: "Familia en Riviera Maya",
      precio: 12999,
      descripcion: "7 días, 6 noches · Todo incluido · Actividades para niños",
      imagen: "./images/productos/familiar-riviera.webp",
      ubicacion: "nacional",
      tipo: "familiar",
    },
    {
      id: 5,
      nombre: "París Romántico",
      precio: 24999,
      descripcion: "6 días, 5 noches · Torre Eiffel · Crucero por el Sena",
      imagen: "./images/productos/romantic-paris.webp",
      ubicacion: "internacional",
      tipo: "romantico",
    },
    {
      id: 6,
      nombre: "Aventura en Japón",
      precio: 35999,
      descripcion: "10 días, 9 noches · Tokio, Kyoto, Osaka · Guía incluido",
      imagen: "./images/productos/japan-adventure.webp",
      ubicacion: "internacional",
      tipo: "aventura",
    },
    {
      id: 7,
      nombre: "Roma Gastronómica",
      precio: 19999,
      descripcion: "5 días, 4 noches · Clases de cocina · Tour de vinos",
      imagen: "./images/productos/rome-gastronomy.webp",
      ubicacion: "internacional",
      tipo: "gastronomico",
    },
    {
      id: 8,
      nombre: "Santorini Relax",
      precio: 28999,
      descripcion: "7 días, 6 noches · Hotel con vista al mar · Spa de lujo",
      imagen: "./images/productos/santorini-relax.webp",
      ubicacion: "internacional",
      tipo: "relax",
    },
    {
      id: 9,
      nombre: "Pet Friendly en Valle de Bravo",
      precio: 4999,
      descripcion:
        "3 días, 2 noches · Hotel pet friendly · Actividades con tu mascota",
      imagen: "./images/productos/petfriendly-valle.webp",
      ubicacion: "petfriendly",
      tipo: "aventura",
    },
    {
      id: 10,
      nombre: "Pet Friendly en Puerto Vallarta",
      precio: 8499,
      descripcion:
        "5 días, 4 noches · Playa dog-friendly · Servicios veterinarios",
      imagen: "./images/productos/petfriendly-vallarta.webp",
      ubicacion: "petfriendly",
      tipo: "relax",
    },
    {
      id: 11,
      nombre: "Aventura en Barrancas del Cobre",
      precio: 6999,
      descripcion: "4 días, 3 noches · Tren Chepe · Senderismo y tirolesa",
      imagen: "./images/productos/barrancas-adventure.webp",
      ubicacion: "nacional",
      tipo: "aventura",
    },
    {
      id: 12,
      nombre: "Relax en Bacalar",
      precio: 5799,
      descripcion: "4 días, 3 noches · Laguna de 7 colores · Masajes incluidos",
      imagen: "./images/productos/relax-bacalar.webp",
      ubicacion: "nacional",
      tipo: "relax",
    },
    {
      id: 13,
      nombre: "Gastronómico en Oaxaca",
      precio: 4999,
      descripcion:
        "3 días, 2 noches · Tour de mezcal · Clases de cocina tradicional",
      imagen: "./images/productos/oaxaca-gastronomy.webp",
      ubicacion: "nacional",
      tipo: "gastronomico",
    },
    {
      id: 14,
      nombre: "Aventura en Nueva Zelanda",
      precio: 42999,
      descripcion:
        "12 días, 11 noches · Fiordos y glaciares · Deportes extremos",
      imagen: "./images/productos/new-zealand-adventure.webp",
      ubicacion: "internacional",
      tipo: "aventura",
    },
    {
      id: 15,
      nombre: "Familiar en Disney Orlando",
      precio: 28999,
      descripcion: "7 días, 6 noches · 4 parques incluidos · Hotel resort",
      imagen: "./images/productos/disney-orlando.webp",
      ubicacion: "internacional",
      tipo: "familiar",
    },
    {
      id: 16,
      nombre: "Romántico en Venecia",
      precio: 26999,
      descripcion:
        "5 días, 4 noches · Paseo en góndola · Cena en el Gran Canal",
      imagen: "./images/productos/venecia-romantic.webp",
      ubicacion: "internacional",
      tipo: "romantico",
    },
    {
      id: 17,
      nombre: "Gastronómico en Barcelona",
      precio: 22999,
      descripcion:
        "6 días, 5 noches · Tour tapas · Visita a mercado La Boquería",
      imagen: "./images/productos/barcelona-gastronomy.webp",
      ubicacion: "internacional",
      tipo: "gastronomico",
    },
    {
      id: 18,
      nombre: "Familiar en Costa Rica",
      precio: 18999,
      descripcion:
        "8 días, 7 noches · Volcanes y playas · Actividades para niños",
      imagen: "./images/productos/costarica-family.webp",
      ubicacion: "internacional",
      tipo: "familiar",
    },
    {
      id: 19,
      nombre: "Pet Friendly en Tequisquiapan",
      precio: 3999,
      descripcion: "2 días, 1 noche · Viñedos pet friendly · Parque canino",
      imagen: "./images/productos/petfriendly-tequis.webp",
      ubicacion: "petfriendly",
      tipo: "relax",
    },
    {
      id: 20,
      nombre: "Pet Friendly en Tulum",
      precio: 9999,
      descripcion: "5 días, 4 noches · Playas dog-friendly · Spa pet friendly",
      imagen: "./images/productos/petfriendly-tulum.webp",
      ubicacion: "petfriendly",
      tipo: "aventura",
    },
  ];

  // Guardamos estos productos iniciales en localStorage
  localStorage.setItem("productos", JSON.stringify(window.productos));
  console.log("Productos por defecto guardados en localStorage");
}

// -------------------------------------------------------
// FUNCIÓN PARA RENDERIZAR PRODUCTOS
// -------------------------------------------------------
function renderizarProductos() {
  const contNac = document.getElementById("productos-nacionales");
  const contInt = document.getElementById("productos-internacionales");
  const contPet = document.getElementById("productos-petfriendly");

  if (!contNac || !contInt || !contPet) {
    console.warn("No se encontraron contenedores en esta página");
    return;
  }

  // Limpia antes de renderizar
  contNac.innerHTML = "";
  contInt.innerHTML = "";
  contPet.innerHTML = "";

  window.productos.forEach((p) => {
    const card = `
  <article class="col-12 col-sm-6 col-md-4 col-lg-3 producto-card"
           data-tipo="${p.tipo}">
    
    <div class="producto-img-wrapper">
      <img src="${p.imagen}" class="producto-img" alt="${p.nombre}">
    </div>

    <div class="producto-content">
      <h3 class="producto-titulo">${p.nombre}</h3>
      <p class="producto-descripcion">${p.descripcion}</p>
      <p class="producto-precio">$${Number(p.precio).toLocaleString(
        "es-MX"
      )} MXN</p>

      <button class="btn-agregar" data-id="${p.id}">
        <i class="fas fa-shopping-cart"></i> Agregar al carrito
      </button>
    </div>
  </article>
`;

    if (p.ubicacion === "nacional") contNac.innerHTML += card;
    if (p.ubicacion === "internacional") contInt.innerHTML += card;
    if (p.ubicacion === "petfriendly") contPet.innerHTML += card;
  });
}

// Ejecutamos la función cuando cargue productos.html
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
});
