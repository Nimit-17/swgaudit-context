/* Facility Abuse: video category dropdown + iframe swap. */
(function () {
  "use strict";

  function closeAllDropdowns() {
    document.querySelectorAll("[data-dd].is-open").forEach(function (dd) {
      dd.classList.remove("is-open");
      var menu = dd.querySelector("[data-dd-menu]");
      if (menu) menu.hidden = true;
    });
  }

  document.addEventListener("click", function (event) {
    var ddToggle = event.target.closest("[data-dd-toggle]");
    if (ddToggle) {
      var dd = ddToggle.closest("[data-dd]");
      var wasOpen = dd.classList.contains("is-open");
      closeAllDropdowns();
      if (!wasOpen) {
        dd.classList.add("is-open");
        var menu = dd.querySelector("[data-dd-menu]");
        if (menu) menu.hidden = false;
      }
      return;
    }

    var ddOpt = event.target.closest("[data-dd-opt]");
    if (ddOpt) {
      var group = ddOpt.closest("[data-dd]");
      group.querySelectorAll("[data-dd-opt]").forEach(function (option) {
        option.classList.toggle("is-active", option === ddOpt);
      });
      var label = group.querySelector("[data-dd-label]");
      if (label) label.textContent = ddOpt.textContent.trim();
      var frameId = group.getAttribute("data-dd-frame");
      var src = ddOpt.getAttribute("data-video");
      if (frameId && src) {
        var frame = document.getElementById(frameId);
        if (frame) frame.src = src;
      }
      closeAllDropdowns();
      return;
    }

    if (!event.target.closest("[data-dd]")) closeAllDropdowns();
  });
})();
