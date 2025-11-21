// scripts/about/teamCards.js

function initTeamCards() {
  const cards = document.querySelectorAll(".card");
  const btn = document.getElementById("verMasBtn");

  if (!cards.length || !btn) return;

  // -------------------------------
  // FLIP DE TARJETAS (adelante y atrás)
  // -------------------------------
  cards.forEach((card) => {
    const flipBtns = card.querySelectorAll(".card__button-flip");

    flipBtns.forEach((btnFlip) => {
      btnFlip.addEventListener("click", () => {
        card.classList.toggle("flipped"); // usa la clase que ya tienes en tu CSS
      });
    });
  });

  // -------------------------------
  // MOSTRAR SOLO 3 O 4 TARJETAS
  // -------------------------------

  // 4 tarjetas visibles en <= 1260px, 3 en pantallas mayores
  let cantidadVisible = window.innerWidth <= 1260 ? 4 : 3;

  // Ocultar tarjetas iniciales
  cards.forEach((card, index) => {
    if (index >= cantidadVisible) card.style.display = "none";
  });

  // -------------------------------
  // VER MÁS (muestra 3 más cada clic)
  // -------------------------------
  btn.addEventListener("click", () => {
    cantidadVisible += 3;

    cards.forEach((card, index) => {
      if (index < cantidadVisible) card.style.display = "block";
    });

    if (cantidadVisible >= cards.length) {
      btn.style.display = "none";
    }
  });

  // -------------------------------
  // AJUSTE AL REDIMENSIONAR
  // -------------------------------
  window.addEventListener("resize", () => {
    let nuevaCantidad = window.innerWidth <= 1260 ? 4 : 3;

    if (nuevaCantidad !== cantidadVisible) {
      cantidadVisible = nuevaCantidad;

      cards.forEach((card, index) => {
        if (index < cantidadVisible) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      btn.style.display = cantidadVisible >= cards.length ? "none" : "block";
    }
  });
}

// la dejamos global para poder llamarla desde main.js
window.initTeamCards = initTeamCards;
