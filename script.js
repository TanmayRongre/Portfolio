// --- Cursor Elements ---
const cursorDot = document.querySelector("#data-cursor-dot");
const cursorOutline = document.querySelector("#data-cursor-outline");

// --- Touch Device Detection --- (checks the desktop or tablet or mobile)
const isTouchDevice = window.matchMedia(
  "(hover: none) and (pointer: coarse)",
).matches;

// --- if mobile or tablet, no cursor style ---
if (isTouchDevice || !cursorDot || !cursorOutline) {
  document.documentElement.style.setProperty("cursor", "auto", "important");
  if (cursorDot) cursorDot.style.display = "none";
  if (cursorOutline) cursorOutline.style.display = "none";
}

// --- Cursor Tracking ---
else {
  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      { left: `${posX}px`, top: `${posY}px` },
      { duration: 500, fill: "both" },
    );
  });

  // --- Cursor Hover State ---     (elements using the effect)
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .portal-btn, .verify-btn, .hire-button, .submit-btn, .service-item, .cert-card, .project-card, .social-icon-btn",
  );

  //adding removing effect (for all elements above)
  interactiveElements.forEach((el) => {
    //add effect
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-hover");
      cursorOutline.classList.add("cursor-hover");
    });

    //remove effect
    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-hover");
      cursorOutline.classList.remove("cursor-hover");
    });
  });
}

// --- Scroll Reveal Animation (Using Scroll Event Listener) ---
document.addEventListener("DOMContentLoaded", function () {
  const revealTargets = document.querySelectorAll(
    ".project-card, .projects-header, .service-item, .cert-card, .about-top-row, .hero-content, .contact-layout-container, .about-certificates, .projects-grid",
  );

  // Initial state: hide everything
  revealTargets.forEach((el) => el.classList.add("reveal-up"));

  function checkScroll() {
    const triggerBottom = window.innerHeight - 40; // Mimics the -40px rootMargin

    revealTargets.forEach((el) => {
      // Skip elements that are already fully revealed
      if (el.classList.contains("in-view")) return;

      //see current position of elememt top
      const elementTop = el.getBoundingClientRect().top;

      // Check if the top of the element has crossed into the viewport
      if (elementTop < triggerBottom) {
        // Staggering Logic: Find unrevealed siblings in the same parent container
        const siblings = [
          ...(el.parentElement || document.body).querySelectorAll(
            ".reveal-up:not(.in-view)",
          ),
        ];

        setTimeout(
          () => {
            el.classList.add("in-view");
          },
          siblings.indexOf(el) * 90,
        );
      }
    });
  }
  // Run once on load in case items are already visible on screen
  checkScroll();

  // Optimized Scroll Listener
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        checkScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // --- ID Card Spring Physics ---
  const nameCard = document.getElementById("name-card");
  if (nameCard && !isTouchDevice) {
    nameCard.style.animation = "none";

    // Spring state
    let rotX = 0,
      rotY = 0,
      scale = 1; // current values
    let velX = 0,
      velY = 0,
      velS = 0; // velocities
    let targetX = 0,
      targetY = 0,
      targetS = 1; // targets
    let isHovered = false;
    let mouseRX = 0,
      mouseRY = 0; // hover targets from mouse
    const STIFFNESS = 0.1; // spring stiffness  (0‥1, higher = snappier)
    const DAMPING = 0.72; // velocity damping  (0‥1, higher = less bounce)
    const IDLE_AMP_X = 1.8; // idle float amplitude X (deg)
    const IDLE_AMP_Y = 1.2; // idle float amplitude Y (deg)
    const IDLE_SPEED = 0.0004; // radians per ms

    let lastTime = null;
    let elapsed = 0;

    function tick(now) {
      if (lastTime !== null) {
        const dt = Math.min(now - lastTime, 50); // cap delta to prevent jumps on tab refocus
        elapsed += dt;
      }
      lastTime = now;

      if (isHovered) {
        targetX = mouseRX;
        targetY = mouseRY;
        targetS = 1.03;
      } else {
        // Idle: slow sine-wave pendulum
        targetX = Math.sin(elapsed * IDLE_SPEED * 0.7) * IDLE_AMP_X;
        targetY = Math.cos(elapsed * IDLE_SPEED) * IDLE_AMP_Y;
        targetS = 1;
      }

      // Spring integration
      velX = (velX + (targetX - rotX) * STIFFNESS) * DAMPING;
      velY = (velY + (targetY - rotY) * STIFFNESS) * DAMPING;
      velS = (velS + (targetS - scale) * STIFFNESS) * DAMPING;
      rotX += velX;
      rotY += velY;
      scale += velS;

      nameCard.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg) scale(${scale.toFixed(4)})`;

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Track mouse position — update targets, not transform directly
    nameCard.addEventListener("mousemove", (e) => {
      const rect = nameCard.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRX = -ny * 14; // tilt up to ±14°
      mouseRY = nx * 14;
    });

    nameCard.addEventListener("mouseenter", () => {
      isHovered = true;
      nameCard.style.boxShadow =
        "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255,74,28,0.35)";
    });

    nameCard.addEventListener("mouseleave", () => {
      isHovered = false;
      nameCard.style.boxShadow = "";
      // No timeout needed — spring naturally decays to idle float
    });
  }
});
