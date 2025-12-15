// session.js
window.getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

window.logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "./index.html";
};
