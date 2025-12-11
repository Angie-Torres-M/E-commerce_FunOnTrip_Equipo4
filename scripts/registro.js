// scripts/registro.js

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  const LS_KEY_USUARIOS = "funontrip_usuarios";

  if (!formRegistro) return;

  // ============================
  // Helpers de LocalStorage
  // ============================
  const obtenerUsuariosLS = () => {
    try {
      const data = localStorage.getItem(LS_KEY_USUARIOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer usuarios en LS:", error);
      return [];
    }
  };

  const guardarUsuariosLS = (usuarios) => {
    try {
      localStorage.setItem(LS_KEY_USUARIOS, JSON.stringify(usuarios));
    } catch (error) {
      console.error("Error al guardar usuarios en LS:", error);
    }
  };

  // ============================
  // Validaciones base
  // (tu compa puede mejorarlas)
  // ============================
  const esEmailValido = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const esTelefonoValido = (telefono) => {
    // Solo 10 dígitos por ahora
    return /^\d{10}$/.test(telefono);
  };

  // Contraseña:
  // mínimo 6 caracteres,
  // al menos 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial
  const esPasswordValido = (password) => {
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regexPassword.test(password);
  };

  // ============================
  // Crear objeto usuario
  // ============================
  const crearUsuario = (formData) => {
    const nombre = formData.get("nombre")?.trim();
    const email = formData.get("email")?.trim();
    const telefono = formData.get("telefono")?.trim();
    const password = formData.get("password")?.trim();

    return {
      id: Date.now(),
      nombre,
      email,
      telefono,
      password,        // ⚠️ Solo para demo
      rol: "user",     // Por si después quieren distinguir admin / user
      creadoEn: new Date().toISOString(),
    };
  };

  // ============================
  // Manejo de submit
  // ============================
  formRegistro.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(formRegistro);
    const nombre = formData.get("nombre")?.trim();
    const email = formData.get("email")?.trim();
    const telefono = formData.get("telefono")?.trim();
    const password = formData.get("password")?.trim();
    const password2 = formData.get("password2")?.trim();

    const errores = [];

    if (!nombre) {
      errores.push("El nombre es obligatorio.");
    }

    if (!email || !esEmailValido(email)) {
      errores.push("Ingresa un correo electrónico válido.");
    }

    if (!telefono || !esTelefonoValido(telefono)) {
      errores.push("Ingresa un teléfono válido de 10 dígitos.");
    }

    if (!password || !esPasswordValido(password)) {
      errores.push(
        "La contraseña debe tener mínimo 6 caracteres, e incluir al menos una mayúscula, una minúscula, un número y un carácter especial."
      );
    }

    if (!password2 || password2 !== password) {
      errores.push("Las contraseñas no coinciden.");
    }

    // Verificar si ya existe un usuario con ese correo
    const usuariosExistentes = obtenerUsuariosLS();
    const yaExiste = usuariosExistentes.some(
      (usuario) => usuario.email === email
    );
    if (yaExiste) {
      errores.push("Ya existe una cuenta registrada con este email.");
    }

    // Aquí tu compa puede reemplazar esto con sus propias alerts/bootstrap
    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Revisa tu información",
        html: `<ul class="text-start mb-0">${errores
          .map((err) => `<li>${err}</li>`)
          .join("")}</ul>`,
      });
      return;
    }

    // Crear y guardar usuario en LocalStorage
    const nuevoUsuario = crearUsuario(formData);
    usuariosExistentes.push(nuevoUsuario);
    guardarUsuariosLS(usuariosExistentes);

    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Tu cuenta ha sido creada correctamente.",
      timer: 1800,
      showConfirmButton: false,
    }).then(() => {
      formRegistro.reset();
      // Si quieren, pueden redirigir directamente a login:
      // window.location.href = "./login.html";
    });
  });
});

// Ver / Ocultar Contraseña
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle-password");

  toggles.forEach((icon) => {
    icon.addEventListener("click", () => {
      const inputId = icon.getAttribute("data-target");
      const input = document.getElementById(inputId);

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });
});
