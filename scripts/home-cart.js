// scripts/home-cart.js
console.log("🏠 Home Cart JS cargado");

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // CLICK EN BOTÓN DE AÑADIR AL CARRITO (HOME)
  // ==========================================
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-add-cart-icon');
    if (!btn) return;

    // Obtener datos del producto desde los atributos data-*
    const id = parseInt(btn.getAttribute('data-id'), 10);
    const nombre = btn.getAttribute('data-nombre');
    const precio = parseFloat(btn.getAttribute('data-precio'));
    const descripcion = btn.getAttribute('data-descripcion');
    const imagen = btn.getAttribute('data-imagen');

    // Validar datos esenciales
    if (!id || !nombre || isNaN(precio)) {
      console.error('❌ Datos incompletos del producto:', { id, nombre, precio });
      return;
    }

    // Obtener carrito
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Revisar si ya existe (comparando id)
    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex !== -1) {
      // Incrementar cantidad (nota: usamos "quantity")
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 0) + 1;
      console.log(`🔼 Cantidad aumentada: ${nombre} (now ${cart[existingIndex].quantity})`);
    } else {
      // Agregar nuevo producto (usamos "quantity")
      cart.push({
        id,
        name: nombre,
        price: precio,
        quantity: 1,
        description: descripcion,
        image: imagen
      });
      console.log(`🆕 Producto agregado: ${nombre}`);
    }

    // Guardar carrito
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notificar a otros scripts
    document.dispatchEvent(new CustomEvent('cartUpdated'));

    // Mostrar notificación
    mostrarNotificacion(nombre, imagen);

    // Animación del botón
    animarBoton(btn);
  });

  // ==========================================
  // NOTIFICACIÓN TOAST
  // ==========================================
  function mostrarNotificacion(nombreProducto, imagenProducto) {
    let toastContainer = document.getElementById('toast-container');

    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 350px;
      `;
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.style.cssText = `
      background: white;
      border: 2px solid #28a745;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 15px;
      animation: slideInRight 0.3s ease-out;
    `;

    toast.innerHTML = `
      <img src="${imagenProducto}" 
           style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" 
           alt="${nombreProducto}">
      <div style="flex: 1;">
        <div style="font-weight: 600; color: #28a745; margin-bottom: 5px;">
          ✓ Agregado al carrito
        </div>
        <div style="font-size: 14px; color: #666;">
          ${nombreProducto}
        </div>
      </div>
      <button onclick="this.parentElement.remove()" 
              style="background: none; border: none; font-size: 20px; cursor: pointer; color: #999;">
        ×
      </button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================
  // ANIMACIÓN DEL BOTÓN
  // ==========================================
  function animarBoton(btn) {
    btn.style.transform = 'scale(1.2)';
    btn.style.transition = 'transform 0.2s';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 200);
  }

  // ==========================================
  // ANIMACIONES CSS (toast)
  // ==========================================
  if (!document.getElementById('cart-animations')) {
    const style = document.createElement('style');
    style.id = 'cart-animations';
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to   { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to   { transform: translateX(100%); opacity: 0; }
      }
      .btn-add-cart-icon:hover {
        transform: scale(1.05);
        transition: transform 0.2s;
      }
    `;
    document.head.appendChild(style);
  }

  // Escuchar evento cuando se actualiza el carrito
  document.addEventListener('cartUpdated', actualizarContadorCarrito);

  // Inicializar contador al cargar la página
  actualizarContadorCarrito();

});