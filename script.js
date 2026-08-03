document.addEventListener("DOMContentLoaded", () => {
    const gateway = document.querySelector("[data-panel-gateway]");
    if (gateway) {
        const params = new URLSearchParams(window.location.search);
        const language = params.get("lang") === "en" ? "en" : "vi";
        document.documentElement.lang = language;

        document.querySelectorAll("[data-vi][data-en]").forEach((element) => {
            element.textContent = element.dataset[language];
        });

        const destination = gateway.dataset.destination;
        const continueLink = document.querySelector("[data-gateway-continue]");
        if (continueLink) continueLink.href = destination;

        window.setTimeout(() => {
            window.location.assign(destination);
        }, 1500);
    }

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (!hamburger || !navMenu) return;

    const closeMenu = () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("toggle");
        hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.setAttribute("aria-expanded", "false");
    hamburger.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        hamburger.classList.toggle("toggle", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
});
