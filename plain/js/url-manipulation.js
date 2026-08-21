/* URL manipulation test: dropdown selection + open selected URL. */
(function () {
  "use strict";

  function runConsoleFor(el) {
    var run = el && el.closest && el.closest(".swg-run");
    return run ? run.querySelector("[data-test-console]") : null;
  }

  function startConsole(el, command) {
    var consoleEl = runConsoleFor(el);
    if (!consoleEl) return;
    consoleEl.innerHTML =
      '<div class="swg-console-line"><span class="swg-console-prompt">$</span> ' +
      command +
      "</div>";
  }

  function terminalLine(el, text, state) {
    var consoleEl = runConsoleFor(el);
    if (!consoleEl) return;
    var line = document.createElement("div");
    line.className = "swg-console-line";
    if (state) line.classList.add("swg-console-" + state);
    line.textContent = text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function sentenceCase(text) {
    var value = String(text || "").trim();
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
  }

  function terminalPass(el, text) {
    terminalLine(el, "Your perimeter security has passed. " + sentenceCase(text), "pass");
  }

  function terminalFail(el, text) {
    terminalLine(el, "Your perimeter security has failed. " + sentenceCase(text), "fail");
  }

  function closeAllDropdowns() {
    document.querySelectorAll("[data-dd].is-open").forEach(function (dd) {
      dd.classList.remove("is-open");
      var menu = dd.querySelector("[data-dd-menu]");
      if (menu) menu.hidden = true;
    });
  }

  function activeOption(groupId) {
    var dd = document.querySelector('[data-dd-dl="' + groupId + '"]');
    if (!dd) return null;
    return dd.querySelector("[data-dd-opt].is-active") || dd.querySelector("[data-dd-opt]");
  }

  function absoluteTestUrl(url) {
    if (!url) return "";
    try {
      return new URL(url, window.location.href).href;
    } catch (error) {
      return url;
    }
  }

  function displayTestUrl(url) {
    var absolute = absoluteTestUrl(url);
    if (!absolute) return "";
    if (/%[0-9A-Fa-f]{2}/.test(String(url || ""))) {
      try {
        var origin = new URL(absolute).origin;
        if (/^https?:\/\//i.test(String(url))) return absoluteTestUrl(url);
        return origin + (String(url).charAt(0) === "/" ? url : "/" + url);
      } catch (keepError) {
        return absolute;
      }
    }
    try {
      var parsed = new URL(absolute);
      return parsed.origin + decodeURIComponent(parsed.pathname + parsed.search + parsed.hash);
    } catch (error) {
      try {
        return decodeURIComponent(absolute);
      } catch (decodeError) {
        return absolute;
      }
    }
  }

  function openNewTab(url) {
    var opened = window.open(url, "_blank");
    if (opened) {
      try {
        opened.opener = null;
      } catch (error) {}
    }
    return opened;
  }

  function readyConsoles() {
    document.querySelectorAll("[data-test-console]").forEach(function (consoleEl) {
      if (!consoleEl.textContent.trim()) {
        consoleEl.innerHTML =
          '<div class="swg-console-line"><span class="swg-console-prompt">$</span> swg-audit ready</div>';
      }
    });
  }

  document.addEventListener("DOMContentLoaded", readyConsoles);

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
      var pickDesc =
        (group.parentElement && group.parentElement.querySelector("[data-pick-desc]")) ||
        (group.closest(".swg-run") && group.closest(".swg-run").querySelector("[data-pick-desc]"));
      if (pickDesc && ddOpt.getAttribute("data-desc")) {
        pickDesc.textContent = ddOpt.getAttribute("data-desc");
      }
      closeAllDropdowns();
      return;
    }

    if (!event.target.closest("[data-dd]")) closeAllDropdowns();

    var open = event.target.closest("[data-open]");
    if (!open) return;

    event.preventDefault();
    var selected = activeOption(open.getAttribute("data-open"));
    if (!selected) return;

    var rawUrl = selected.getAttribute("data-url") || "";
    var openUrl = absoluteTestUrl(rawUrl);
    var shownUrl = displayTestUrl(rawUrl) || openUrl || rawUrl;
    var variation = (selected.textContent || "").trim() || "selected URL";
    startConsole(open, "swg-audit open-url");
    terminalLine(open, "selected variation: " + variation);
    terminalLine(open, "destination URL: " + shownUrl);
    terminalLine(open, "opening destination in a new tab ...");
    var openedTab = openNewTab(openUrl || rawUrl);
    if (openedTab) {
      terminalFail(open, "new tab opened and loaded the destination login page.");
    } else {
      terminalPass(open, "browser blocked the new tab before the destination could open.");
    }
  });
})();
