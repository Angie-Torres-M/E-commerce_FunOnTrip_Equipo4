const observer = new MutationObserver(() => {
  const loginDesktop = document.querySelector("#loginLinkDesktop");
  const loginMobile = document.querySelector("#loginLinkMobile");

  if (loginDesktop && loginMobile) {
    observer.disconnect();

    if (getCurrentUser()) {
      [loginDesktop, loginMobile].forEach(link => {
        link.textContent = "Cerrar sesión";
        link.href = "#";
        link.onclick = (e) => {
          e.preventDefault();
          logout();
        };
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
