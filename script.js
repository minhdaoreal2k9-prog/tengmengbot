document.addEventListener("DOMContentLoaded", () => {
    const gateway = document.querySelector("[data-panel-gateway]");
    if (!gateway) return;

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
});
