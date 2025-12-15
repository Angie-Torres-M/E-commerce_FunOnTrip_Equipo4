const observer = new MutationObserver(() => {
  const loginDesktop = document.querySelector("#loginLinkDesktop");
  const loginMobile = document.querySelector("#loginLinkMobile");

  // esperar a que el header exista
  if (loginDesktop && loginMobile) {
    observer.disconnect();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
      [loginDesktop, loginMobile].forEach(link => {
        link.textContent = "Cerrar sesión";
        link.href = "#";

        link.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("currentUser");
          window.location.href = "./index.html";
        });
      });
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
