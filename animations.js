document.addEventListener("DOMContentLoaded", () => {
  const revealSelectors = [
    ".technology-card",
    ".project-card",
    ".timeline-item",
    ".certificate-card",
    ".fakten-card",
    ".infocard",
    ".contact-link-item",
    ".profile-card",
    ".quotecard",
  ];

  const targets = document.querySelectorAll(revealSelectors.join(","));

  // Fallback: falls IntersectionObserver nicht unterstützt wird, sofort anzeigen
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("reveal", "in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target); // nur einmal animieren
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
});

// Öffnet/schließt das mobile Dropdown-Menü (Nav + Socials) über den 3-Punkte-Button.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("main-nav");

  if (!toggle || !panel) return;

  const closeMenu = () => {
    panel.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInside = panel.contains(event.target) || toggle.contains(event.target);
    if (!clickedInside) closeMenu();
  });
});