document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("[data-header]");
    const nav = document.querySelector("[data-nav]");
    const navToggle = document.querySelector("[data-nav-toggle]");

    const updateHeader = () => {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (nav && navToggle) {
        const closeNav = () => {
            nav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", document.documentElement.lang === "en" ? "Open menu" : "Mở menu");
        };

        navToggle.addEventListener("click", () => {
            const willOpen = !nav.classList.contains("is-open");
            nav.classList.toggle("is-open", willOpen);
            navToggle.setAttribute("aria-expanded", String(willOpen));
            navToggle.setAttribute("aria-label", willOpen
                ? (document.documentElement.lang === "en" ? "Close menu" : "Đóng menu")
                : (document.documentElement.lang === "en" ? "Open menu" : "Mở menu"));
        });

        nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeNav();
        });
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -36px" });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("in-view"));
    }

    document.querySelectorAll("[data-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });

    const gateway = document.body.matches("[data-panel-gateway]") ? document.body : null;
    if (gateway) {
        const params = new URLSearchParams(window.location.search);
        const language = params.get("lang") === "en" ? "en" : "vi";
        const destination = gateway.dataset.destination;
        const continueLink = document.querySelector("[data-gateway-continue]");

        if (language === "en") {
            document.documentElement.lang = "en";
            document.title = "Opening F2P BOT Panel | AutoROK.vn";
            document.querySelectorAll("[data-vi]").forEach((node) => {
                node.textContent = node.dataset.en || node.textContent;
            });
        }

        if (continueLink && destination) continueLink.href = destination;

        if (destination) {
            window.setTimeout(() => {
                window.location.replace(destination);
            }, 1500);
        }
    }
});
