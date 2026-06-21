const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Detect touch / non-hover devices (mobile, tablet, etc.)
const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

if (isTouchDevice || !cursorDot || !cursorOutline) {
    // Restore native cursor on touch devices so users aren't left with nothing
    document.documentElement.style.setProperty('cursor', 'auto', 'important');
    if (cursorDot) cursorDot.style.display = "none";
    if (cursorOutline) cursorOutline.style.display = "none";
} else {
    // Desktop: activate custom cursor
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

    // Hide custom cursor when mouse leaves the browser window
    document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity = "0";
        cursorOutline.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";
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
}
