// scripts/form-producto.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  const alertError = document.getElementById("alertError");
  const alertSuccess = document.getElementById("alertSuccess");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alertError.classList.add("d-none");
    alertSuccess.classList.add("d-none");
    alertError.innerHTML = "";

    const data = new FormData(form);
    const errors = [];

    const nombre = data.get("nombre")?.trim();
    const precio = Number(data.get("precio"));
    const descripcion = data.get("descripcion")?.trim();
    const imagen = data.get("imagen")?.trim();
    const ubicacion = data.get("ubicacion");
    const tipo = data.get("tipo");

    if (!nombre) errors.push("El nombre del paquete es obligatorio.");
    if (!descripcion) errors.push("La descripción es obligatoria.");
    if (!imagen) errors.push("La URL de la imagen es obligatoria.");
    if (!ubicacion) errors.push("Selecciona una ubicación.");
    if (!tipo) errors.push("Selecciona un tipo de experiencia.");
    if (!precio || precio <= 0) {
      errors.push("El precio debe ser un número mayor a 0.");
    }

    // Si hay errores, muestra alerta Bootstrap
    if (errors.length > 0) {
      alertError.innerHTML =
        "<strong>Revisa los siguientes campos:</strong><ul>" +
        errors.map((e) => `<li>${e}</li>`).join("") +
        "</ul>";
      alertError.classList.remove("d-none");
      return;
    }

    // Si todo está bien, crear el objeto del modelo
    const nuevoProducto = {
      id: Date.now(), // o productos.length + 1
      nombre,
      precio,
      descripcion,
      imagen,
      ubicacion,
      tipo,
    };

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
