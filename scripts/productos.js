// scripts/productos.js

document.addEventListener("DOMContentLoaded", function () {
  console.log("JS de productos cargado correctamente");

  // CONFIGURACIÓN DE LA API
  const API_URL = "https://api.jsonbin.io/v3/b/692e6dbcd0ea881f400d0cc1/latest";

  let productos = [];

  // FUNCIÓN PARA OBTENER PRODUCTOS
  async function obtenerProductos() {
    try {
      mostrarCargando(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      // JSONBin: record → { productos: [...] }
      productos = data.record.productos;

      console.log(`✅ Productos cargados: ${productos.length}`);

      renderizarProductos();
      inicializarFiltros();
      inicializarBotonesCarrito();

      mostrarCargando(false);

    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      mostrarError("No se pudieron cargar los productos. Intenta más tarde.");
      mostrarCargando(false);
    }
  }

  // INDICADOR DE CARGA
  function mostrarCargando(mostrar) {
    const contenedores = [
      document.getElementById("productos-nacionales"),
      document.getElementById("productos-internacionales"),
      document.getElementById("productos-petfriendly")
    ];

    contenedores.forEach(contenedor => {
      if (!contenedor) return;

      if (mostrar) {
        contenedor.innerHTML = `
          <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-3">Cargando productos...</p>
          </div>
        `;
      }
    });
  }

  // FUNCIÓN PARA MOSTRAR ERRORES
  function mostrarError(mensaje) {
    const contenedores = [
      document.getElementById("productos-nacionales"),
      document.getElementById("productos-internacionales"),
      document.getElementById("productos-petfriendly")
    ];

    contenedores.forEach(contenedor => {
      if (!contenedor) return;

      contenedor.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            ${mensaje}
          </div>
        </div>
      `;
    });
  }

  
  // NUEVA CARD ADAPTADA A productos.css

  function crearCardProducto(producto) {
    return `
      <article class="producto-card" 
               data-tipo="${producto.tipo}" 
               data-ubicacion="${producto.ubicacion}">
        
        <div class="producto-img-wrapper">
          <img src="${producto.imagen}" 
               class="producto-img" 
               alt="${producto.nombre}"
               onerror="this.src='https://via.placeholder.com/400x300?text=Imagen+no+disponible'">
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

  //  RENDERIZACIÓN DE PRODUCTOS
  function renderizarProductos() {
    const contenedorNacional = document.getElementById("productos-nacionales");
    const contenedorInternacional = document.getElementById("productos-internacionales");
    const contenedorPetFriendly = document.getElementById("productos-petfriendly");

    if (contenedorNacional) contenedorNacional.innerHTML = "";
    if (contenedorInternacional) contenedorInternacional.innerHTML = "";
    if (contenedorPetFriendly) contenedorPetFriendly.innerHTML = "";

    productos.forEach(producto => {
      const card = crearCardProducto(producto);

      if (producto.ubicacion === "nacional") {
        contenedorNacional.innerHTML += card;
      } 
      else if (producto.ubicacion === "internacional") {
        contenedorInternacional.innerHTML += card;
      } 
      else if (producto.ubicacion === "petfriendly") {
        contenedorPetFriendly.innerHTML += card;
      }
    });

    if (productos.length === 0) {
      mostrarError("No hay productos disponibles.");
    }
  }

  // ============ FILTROS ============
  function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('[data-filtro]');
    const textoFiltroActivo = document.getElementById('texto-filtro-activo');

    botonesFiltro.forEach(boton => {
      boton.addEventListener('click', function () {
        const filtroSeleccionado = this.getAttribute('data-filtro');

        botonesFiltro.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const cards = document.querySelectorAll('.producto-card');

        cards.forEach(card => {
          const tipo = card.getAttribute('data-tipo');
          card.style.display =
            filtroSeleccionado === 'todos' || tipo === filtroSeleccionado
              ? 'block'
              : 'none';
        });

        if (textoFiltroActivo) {
          textoFiltroActivo.textContent =
            filtroSeleccionado === 'todos'
              ? 'Mostrando: todos los tipos de experiencia.'
              : `Mostrando: ${filtroSeleccionado}.`;
        }
      });
    });
  }

  // CARRITO
  function inicializarBotonesCarrito() {
    document.addEventListener('click', function (e) {
      const boton = e.target.closest('.btn-agregar');
      if (!boton) return;

      const idProducto = parseInt(boton.getAttribute('data-id'));
      const producto = productos.find(p => p.id === idProducto);
      if (!producto) return;

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const index = carrito.findIndex(item => item.id === idProducto);

      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));

      boton.textContent = '✓ Agregado';
      boton.style.background = "#6abf69";

      setTimeout(() => {
        boton.innerHTML = '<i class="fas fa-shopping-cart"></i> Agregar al carrito';
        boton.style.background = "#ffd275";
      }, 1200);

      console.log(`🛒 Agregado: ${producto.nombre}`);
    });
  }

  // INICIALIZACIÓN
  obtenerProductos();
});
