/* Shared chrome: category toggles + mobile drawer.
   Sidebar HTML is rendered by PHP includes/sidebar.php. */
(function () {
  "use strict";

  function closeMobileSidebar() {
    document.documentElement.classList.remove("swg-mobile-sb-open");
    document.querySelectorAll("[data-mobile-sb-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open tests menu");
    });
  }

  function toggleMobileSidebar(control) {
    var willOpen = !document.documentElement.classList.contains("swg-mobile-sb-open");
    document.documentElement.classList.toggle("swg-mobile-sb-open", willOpen);
    if (!control) return;
    control.setAttribute("aria-expanded", willOpen ? "true" : "false");
    control.setAttribute("aria-label", willOpen ? "Close tests menu" : "Open tests menu");
  }

  function toggleSidebarCategory(toggle) {
    var groupId = toggle.getAttribute("data-sb-toggle");
    var group = document.getElementById(groupId);
    var row = toggle.closest(".swg-sb-cat");
    if (!group || !row) return;

    var willOpen = group.classList.contains("is-collapsed");
    group.classList.toggle("is-collapsed", !willOpen);
    row.classList.toggle("is-open", willOpen);
    row.classList.toggle("is-collapsed", !willOpen);
    toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");

    var label = row.querySelector(".swg-sb-cat-link");
    var name = label ? label.textContent.trim() : "category";
    toggle.setAttribute("aria-label", (willOpen ? "Collapse " : "Expand ") + name + " tests");
  }

  document.addEventListener("click", function (event) {
    var mobileToggle = event.target.closest("[data-mobile-sb-toggle]");
    if (mobileToggle) {
      event.preventDefault();
      toggleMobileSidebar(mobileToggle);
      return;
    }

    if (event.target.closest("[data-mobile-sb-close]")) {
      event.preventDefault();
      closeMobileSidebar();
      return;
    }

    var categoryToggle = event.target.closest("[data-sb-toggle]");
    if (categoryToggle) {
      event.preventDefault();
      toggleSidebarCategory(categoryToggle);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMobileSidebar();
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 1025px)").matches) closeMobileSidebar();
  });
})();
