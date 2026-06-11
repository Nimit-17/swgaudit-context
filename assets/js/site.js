const menuButton = document.querySelector(".mobile-toggle");
const mobilePanel = document.querySelector("#mobile-panel");
const accordions = document.querySelectorAll(".mobile-accordion");
const dropdownTriggers = document.querySelectorAll(".nav-trigger");

if (menuButton && mobilePanel) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobilePanel.dataset.open = String(!isOpen);
  });

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mobilePanel.dataset.open = "false";
    });
  });
}

accordions.forEach((accordion) => {
  const button = accordion.querySelector("button");
  const panel = accordion.querySelector("div");

  if (!button || !panel) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    panel.dataset.open = String(!isOpen);
  });
});

dropdownTriggers.forEach((trigger) => {
  const item = trigger.closest(".nav-item");
  if (!item) return;

  item.addEventListener("mouseenter", () => trigger.setAttribute("aria-expanded", "true"));
  item.addEventListener("mouseleave", () => trigger.setAttribute("aria-expanded", "false"));
  item.addEventListener("focusin", () => trigger.setAttribute("aria-expanded", "true"));
  item.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!item.contains(document.activeElement)) {
        trigger.setAttribute("aria-expanded", "false");
      }
    }, 0);
  });
});
