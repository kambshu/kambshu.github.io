(function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeToggleLabel = themeToggleBtn ? themeToggleBtn.querySelector(".theme-toggle-label") : null;
    const yearSpan = document.getElementById("current-year");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (yearSpan) {
        yearSpan.textContent = String(new Date().getFullYear());
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
    } else if (!savedTheme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            body.classList.add("dark-theme");
        }
    }

    updateToggleAppearance();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = body.classList.toggle("dark-theme");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateToggleAppearance();
        });
    }

    if (menuToggle && navLinks) {
        const menuIcon = menuToggle.querySelector("i");

        const closeMenu = () => {
            navLinks.dataset.open = "false";
            body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            if (menuIcon) {
                menuIcon.classList.add("fa-bars");
                menuIcon.classList.remove("fa-xmark");
            }
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.dataset.open === "true";
            navLinks.dataset.open = (!isOpen).toString();
            body.classList.toggle("menu-open", !isOpen && window.innerWidth <= 768);
            menuToggle.setAttribute("aria-expanded", (!isOpen).toString());
            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars", isOpen);
                menuIcon.classList.toggle("fa-xmark", !isOpen);
            }
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (navLinks.dataset.open !== "true") {
                return;
            }

            if (!(event.target instanceof Node)) {
                return;
            }

            if (navLinks.contains(event.target) || menuToggle.contains(event.target)) {
                return;
            }

            closeMenu();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    function updateToggleAppearance() {
        if (!themeToggleBtn) {
            return;
        }

        const icon = themeToggleBtn.querySelector("i");
        if (!icon) {
            return;
        }

        const isDark = body.classList.contains("dark-theme");
        if (isDark) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
            if (themeToggleLabel) {
                themeToggleLabel.textContent = "Light mode";
            }
            themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
            themeToggleBtn.setAttribute("title", "Switch to light mode");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
            if (themeToggleLabel) {
                themeToggleLabel.textContent = "Dark mode";
            }
            themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
            themeToggleBtn.setAttribute("title", "Switch to dark mode");
        }
    }
})();
