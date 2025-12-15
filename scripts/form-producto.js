document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  const alertError = document.getElementById("alertError");
  const alertSuccess = document.getElementById("alertSuccess");
  const btnLimpiar = document.getElementById("btnLimpiar");

  const uploadBox = document.getElementById("uploadBox");
  const inputImagen = document.getElementById("imagen");
  const preview = document.getElementById("previewImagen");

  // Limpiar formulario
  btnLimpiar.addEventListener("click", () => {
    form.reset();
    alertError.classList.add("d-none");
    alertSuccess.classList.add("d-none");
    alertError.innerHTML = "";
    preview.classList.add("d-none");
  });

  // Botón visual de imagen
  uploadBox.addEventListener("click", () => {
    inputImagen.click();
  });

  inputImagen.addEventListener("change", () => {
    const file = inputImagen.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
  });

  // SUBMIT
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
    const imagen = data.get("imagen");
    const ubicacion = data.get("ubicacion");
    const tipo = data.get("tipo");

    // Validaciones
    if (!nombre) errors.push("El nombre del paquete es obligatorio.");
    if (nombre === "00000" || /^0+$/.test(nombre))
      errors.push("El nombre no puede ser solo ceros.");

    if (!precioStr) {
      errors.push("El precio es obligatorio.");
    } else if (!/^\d+(\.\d{1,2})?$/.test(precioStr)) {
      errors.push("El precio solo puede contener números y hasta 2 decimales.");
    } else if (precio <= 0) {
      errors.push("El precio debe ser mayor a 0.");
    }

    if (!imagen || imagen.size === 0) {
      errors.push("Debes seleccionar una imagen.");
    } else if (!imagen.type.startsWith("image/")) {
      errors.push("El archivo debe ser una imagen válida.");
    } else if (imagen.size > 2 * 1024 * 1024) {
      errors.push("La imagen no debe pesar más de 2 MB.");
    }

    if (!descripcion) errors.push("La descripción es obligatoria.");
    if (!ubicacion) errors.push("Selecciona una ubicación.");
    if (!tipo) errors.push("Selecciona un tipo de experiencia.");

    if (errors.length > 0) {
      alertError.innerHTML =
        "<strong>Revisa los siguientes campos:</strong><ul>" +
        errors.map((e) => `<li>${e}</li>`).join("") +
        "</ul>";
      alertError.classList.remove("d-none");
      return;
    }

    // Guardar producto
    const reader = new FileReader();
    reader.onload = function () {
      const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio,
        descripcion,
        imagen: reader.result,
        ubicacion,
        tipo,
      };

      window.productos.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(window.productos));

      if (typeof renderizarProductos === "function") {
        renderizarProductos();
      }

      alertSuccess.classList.remove("d-none");
      form.reset();
      preview.classList.add("d-none");
    };

    reader.readAsDataURL(imagen);
  });
});
