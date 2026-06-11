const menuButton = document.querySelector(".mobile-toggle");
const mobilePanel = document.querySelector("#mobile-panel");
const accordions = document.querySelectorAll(".mobile-accordion");
const dropdownTriggers = document.querySelectorAll(".nav-trigger");
const testNavToggle = document.querySelector("[data-test-nav-toggle]");
const testNavPanel = document.querySelector("#test-nav-panel");

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

if (testNavToggle && testNavPanel) {
  const state = testNavToggle.querySelector(".test-nav-state");

  const setTestNavOpen = (open) => {
    testNavToggle.setAttribute("aria-expanded", String(open));
    testNavPanel.dataset.open = String(open);
    if (state) state.textContent = open ? "Hide" : "Show";
  };

  testNavToggle.addEventListener("click", () => {
    const isOpen = testNavToggle.getAttribute("aria-expanded") === "true";
    setTestNavOpen(!isOpen);
  });
}

document.querySelectorAll("[data-level-card]").forEach((card) => {
  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    card.setAttribute("aria-expanded", String(open));
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;

    const willOpen = !card.classList.contains("is-open");
    document.querySelectorAll("[data-level-card]").forEach((otherCard) => {
      otherCard.classList.remove("is-open");
      otherCard.setAttribute("aria-expanded", "false");
    });
    setOpen(willOpen);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    card.click();
  });
});

document.querySelectorAll("[data-test-card]").forEach((card) => {
  const button = card.querySelector("[data-test-card-toggle]");
  const detail = button ? document.getElementById(button.getAttribute("aria-controls")) : null;

  if (!button || !detail) return;

  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "Close test" : "Open test";
    detail.hidden = !open;
  };

  button.addEventListener("click", () => {
    const willOpen = button.getAttribute("aria-expanded") !== "true";
    const grid = card.closest(".test-card-grid");

    if (grid) {
      grid.querySelectorAll("[data-test-card]").forEach((otherCard) => {
        if (otherCard === card) return;

        const otherButton = otherCard.querySelector("[data-test-card-toggle]");
        const otherDetail = otherButton ? document.getElementById(otherButton.getAttribute("aria-controls")) : null;
        otherCard.classList.remove("is-open");
        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
          otherButton.textContent = "Open test";
        }
        if (otherDetail) otherDetail.hidden = true;
      });
    }

    setOpen(willOpen);
  });
});

document.querySelectorAll("[data-run-test]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;

    if (!output) return;

    output.hidden = false;
    output.textContent = "Run Test selected. This flexible slot is ready for the real simulation flow for this test.";
  });
});
