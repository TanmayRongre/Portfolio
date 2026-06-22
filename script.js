const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");


const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

if (isTouchDevice || !cursorDot || !cursorOutline) {

    document.documentElement.style.setProperty('cursor', 'auto', 'important');
    if (cursorDot) cursorDot.style.display = "none";
    if (cursorOutline) cursorOutline.style.display = "none";
} else {

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate(
            { left: `${posX}px`, top: `${posY}px` },
            { duration: 500, fill: "both" }
        );
    });


    document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity = "0";
        cursorOutline.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";
    });

    const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, .portal-btn, .verify-btn, .hire-button, .submit-btn, .service-item, .cert-card, .project-card, .social-icon-btn"
    );

    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursorDot.classList.add("cursor-hover");
            cursorOutline.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            cursorDot.classList.remove("cursor-hover");
            cursorOutline.classList.remove("cursor-hover");
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {

    const revealTargets = document.querySelectorAll(
        ".project-card, .projects-header, .service-item, .cert-card, .about-top-row, .hero-content, .contact-layout-container, .about-certificates, .projects-grid"
    );

    revealTargets.forEach(el => el.classList.add("reveal-up"));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const siblings = [...(entry.target.parentElement || document.body)
                    .querySelectorAll(".reveal-up:not(.in-view)")];
                const idx = Math.max(siblings.indexOf(entry.target), 0);
                setTimeout(() => {
                    entry.target.classList.add("in-view");
                }, idx * 90);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(el => revealObserver.observe(el));

    const numbers = document.querySelectorAll(".value-item .number");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const raw = el.textContent.replace(/[^0-9]/g, "");
            const target = parseInt(raw, 10);
            const prefix = el.textContent.includes("+") ? "+" : "";
            if (isNaN(target) || target === 0) return;

            let current = 0;
            const step = target / (1000 / 16);

            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = prefix + Math.floor(current);
                if (current >= target) clearInterval(timer);
            }, 16);

            counterObserver.unobserve(el);
        });
    }, { threshold: 0.6 });

    numbers.forEach(el => counterObserver.observe(el));

});
