document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  const alertError = document.getElementById("alertError");
  const alertSuccess = document.getElementById("alertSuccess");
  const btnLimpiar = document.getElementById("btnLimpiar");


      btnLimpiar.addEventListener("click", () => {
      form.reset(); // limpia todos los campos

      // Ocultar alertas
      alertError.classList.add("d-none");
      alertSuccess.classList.add("d-none");

      // Limpia lista de errores visuales
      alertError.innerHTML = "";
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alertError.classList.add("d-none");
    alertSuccess.classList.add("d-none");
    alertError.innerHTML = "";

    const data = new FormData(form);
    const errors = [];

    const nombre = data.get("nombre")?.trim();
    const precioStr = data.get("precio")?.trim();
    const precio = Number(precioStr);
    const descripcion = data.get("descripcion")?.trim();
    const imagen = data.get("imagen")?.trim();
    const ubicacion = data.get("ubicacion");
    const tipo = data.get("tipo");

    // --- VALIDACIONES ---

    // Nombre
    if (!nombre) errors.push("El nombre del paquete es obligatorio.");
    if (nombre === "00000" || /^0+$/.test(nombre))
      errors.push("El nombre no puede ser solo ceros.");

    // Precio
    if (!precioStr) {
      errors.push("El precio es obligatorio.");
    } else if (!/^\d+(\.\d{1,2})?$/.test(precioStr)) {
      errors.push("El precio solo puede contener números y hasta 2 decimales.");
    } else if (Number(precioStr) <= 0) {
      errors.push("El precio debe ser mayor a 0.");
    } else if (/^0+$/.test(precioStr)) {
      errors.push("El precio no puede ser solo ceros.");
    }

    // Imagen (URL)
    try {
      new URL(imagen);
    } catch {
      errors.push("La URL de la imagen no es válida.");
    }

    // Descripción
    if (!descripcion) {
      errors.push("La descripción es obligatoria.");
    } else if (/^0+$/.test(descripcion)) {
      errors.push("La descripción no puede ser solo ceros.");
    }

    // Selects
    if (!ubicacion) errors.push("Selecciona una ubicación.");
    if (!tipo) errors.push("Selecciona un tipo de experiencia.");

    // Mostrar errores
    if (errors.length > 0) {
      alertError.innerHTML =
        "<strong>Revisa los siguientes campos:</strong><ul>" +
        errors.map((e) => `<li>${e}</li>`).join("") +
        "</ul>";
      alertError.classList.remove("d-none");
      return;
    }

    // Crear modelo
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio,
      descripcion,
      imagen,
      ubicacion,
      tipo,
    };

    console.log("Objeto producto:", nuevoProducto);
    // Agregar el nuevo producto al array global
    window.productos.push(nuevoProducto);

    console.log("Se agrego");

    // Guardar en localStorage
    localStorage.setItem("productos", JSON.stringify(window.productos));

    // Si estás en productos.html, vuelve a renderizar
    if (typeof renderizarProductos === "function") {
      renderizarProductos();
    }

    // Mostrar mensaje de éxito ...
    alertSuccess.classList.remove("d-none");


  });
});