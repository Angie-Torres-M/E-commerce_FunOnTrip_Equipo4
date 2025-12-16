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

    Array.from(form.elements).forEach((el) => {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) return;
      el.classList.remove("is-invalid", "is-valid");
      const fb = el.parentElement.querySelector(".invalid-feedback");
      if (fb) fb.textContent = "";
    });
  }


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearValidationStates();

    // referencias
    const nombreEl = form.querySelector("#nombre");
    const precioEl = form.querySelector("#precio");
    const ubicacionEl = form.querySelector("#ubicacion");
    const tipoEl = form.querySelector("#tipo");
    const imagenEl = form.querySelector("#imagen");
    const descripcionEl = form.querySelector("#descripcion");

    const campos = [
      { el: nombreEl, label: "Nombre del paquete" },
      { el: precioEl, label: "Precio" },
      { el: ubicacionEl, label: "Ubicación" },
      { el: tipoEl, label: "Tipo de experiencia" },
      { el: imagenEl, label: "URL de imagen" },
      { el: descripcionEl, label: "Descripción" },
    ];

    const errores = [];
    let firstInvalid = null;

    // 1) Validar campos vacíos / básicos y marcar
    campos.forEach(({ el, label }) => {
      const val = (el.value || "").toString().trim();
      let fieldError = null;

      // Validaciones básicas por tipo
      if (!val) {
        fieldError = `${label} es obligatorio.`;
      } else {
        // reglas específicas
        if (el === precioEl) {
          if (!/^\d+(\.\d{1,2})?$/.test(val)) {
            fieldError = "El precio solo puede contener números y hasta 2 decimales.";
          } else if (Number(val) <= 0) {
            fieldError = "El precio debe ser mayor a 0.";
          }
        }

        if (el === nombreEl) {
          if (val === "00000" || /^0+$/.test(val)) {
            fieldError = "El nombre no puede ser solo ceros.";
          }
        }

        if (el === descripcionEl) {
          if (/^0+$/.test(val)) {
            fieldError = "La descripción no puede ser solo ceros.";
          }
        }

        if (el === imagenEl) {
          // Validar URL
          try {
            new URL(val);
          } catch {
            // Aceptar rutas locales 
            const looksLikeRelative = /^(\.\/|\/|[a-z0-9_\-]+\.)([a-z0-9_\-\/\.]+)?$/i.test(val);
            if (!looksLikeRelative) {
              fieldError = "La URL de la imagen no es válida.";
            }
          }
        }
      }

      // aplicar estado visual
      if (fieldError) {
        errores.push(fieldError);
        el.classList.add("is-invalid");
        ensureFeedback(el).textContent = fieldError;
        if (!firstInvalid) firstInvalid = el;
      } else {
        el.classList.add("is-valid");
      }
    });

    // Si hay errores, mostrar lista y enfocar el primero
    if (errores.length > 0) {
      const unique = [...new Set(errores)];
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
 b00454db603a200cbf0758cbfa033dfda79257c0
      alertError.innerHTML =
        "<strong>Revisa los siguientes errores:</strong><ul>" +
        unique.map((m) => `<li>${m}</li>`).join("") +
        "</ul>";
      alertError.classList.remove("d-none");

      // focus al primer inválido 
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus({ preventScroll: true });
      }
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
