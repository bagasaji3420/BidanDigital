(function () {
    const KEY = "theme";
    const saved = localStorage.getItem(KEY) || "light";

    document.documentElement.setAttribute("data-bs-theme", saved);

    document.addEventListener("DOMContentLoaded", function () {
        const btn = document.getElementById("bottomThemeToggle");
        if (!btn) return;

        const icon = btn.querySelector("i");

        // set icon awal
        icon.classList.toggle("bx-sun", saved === "light");
        icon.classList.toggle("bx-moon", saved === "dark");

        btn.addEventListener("click", function () {
            const current =
                document.documentElement.getAttribute("data-bs-theme");
            const next = current === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-bs-theme", next);
            localStorage.setItem(KEY, next);

            icon.classList.toggle("bx-sun", next === "light");
            icon.classList.toggle("bx-moon", next === "dark");

            document.querySelectorAll("[data-bs-theme-value]").forEach((el) => {
                el.classList.toggle("active", el.dataset.bsThemeValue === next);
            });
        });
    });
})();
