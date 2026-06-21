const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function(e) {

    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {
        duration: 500,
        fill: "both"
    });
});

const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .portal-btn, .verify-btn, .hire-button, .submit-btn, .service-item, .cert-card"
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
