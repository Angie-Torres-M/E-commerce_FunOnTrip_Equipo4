document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  const alertError = document.getElementById("alertError");
  const alertSuccess = document.getElementById("alertSuccess");

  // crear/obtener feedback node
  function ensureFeedback(el) {
    let fb = el.parentElement.querySelector(".invalid-feedback");
    if (!fb) {
      fb = document.createElement("div");
      fb.className = "invalid-feedback";
      el.parentElement.appendChild(fb);
    }
    return fb;
  }

  function clearValidationStates() {
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

    //Si no hay errores, proceder a crear el producto
    const nuevoProducto = {
      id: Date.now(),
      nombre: nombreEl.value.trim(),
      precio: Number(precioEl.value),
      descripcion: descripcionEl.value.trim(),
      imagen: imagenEl.value.trim(),
      ubicacion: ubicacionEl.value,
      tipo: tipoEl.value,
    };

    window.productos = window.productos || [];
    window.productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(window.productos));

    if (typeof renderizarProductos === "function") renderizarProductos();

    alertSuccess.classList.remove("d-none");
    // clearValidationStates();
  });
});
