document.addEventListener("DOMContentLoaded", function() {

    const btn = document.getElementById("darkModeToggle");

    btn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            this.textContent = "☀️";
        } else {
            this.textContent = "🌙";
        }
    });

});
