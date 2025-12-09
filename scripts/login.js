// scripts/login.js

document.addEventListener("DOMContentLoaded", () => {
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginBtn.addEventListener("click", () => {
const emailValue = emailInput.value.trim();
const passwordValue = passwordInput.value.trim();

// Validar correo
if (emailValue === "") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "El correo es obligatorio.",
  });
  return;
} else if (!validateEmail(emailValue)) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Ingresa un correo válido.",
  });
  return;
}

// Validar contraseña
if (passwordValue === "") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "La contraseña es obligatoria.",
  });
  return;
} else if (passwordValue.length < 6) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "La contraseña debe tener al menos 6 caracteres.",
  });
  return;
}

// Si todo es válido
Swal.fire({
  icon: "success",
  title: "¡Bienvenido!",
  text: "Has iniciado sesión correctamente.",
  timer: 1500,
  showConfirmButton: false,
}).then(() => {
  // Aquí iría la acción real, como redirigir o enviar el formulario
  console.log("Formulario válido, se puede iniciar sesión");
});


});

// Función para validar formato de correo
function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
return re.test(email);
}
});
