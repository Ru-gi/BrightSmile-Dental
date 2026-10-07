const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-navigation");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#contact-form-status");
const revealTargets = document.querySelectorAll(
    ".about-image, .about-content, .services-heading, .service-card, .why-content > h2, .why-content > p, .why-item, .contact-heading, .contact-container"
);

if (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    "IntersectionObserver" in window
) {
    revealTargets.forEach((element) => element.classList.add("reveal"));
    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach((element) => revealObserver.observe(element));
}

function setMenuOpen(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    nav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const subject = `Website enquiry from ${formData.get("name")}`;
    const body = [
        `Name: ${formData.get("name")}`,
        `Email: ${formData.get("email")}`,
        `Phone: ${formData.get("phone") || "Not provided"}`,
        "",
        "Message:",
        formData.get("message")
    ].join("\n");

    formStatus.textContent = "Opening your email app. Review the message there and send it to complete your enquiry.";
    window.location.href = `mailto:info@brightsmiledental.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});