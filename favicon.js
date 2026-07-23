/* Ensure the browser tab shows the SWG Audit favicon.
   Mintlify custom-mode pages often omit <link rel="icon"> tags. */
(function () {
  if (window.__swgFavicon) return;
  window.__swgFavicon = true;
  if (document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')) return;
  var head = document.head || document.getElementsByTagName("head")[0];
  if (!head) return;
  [
    { rel: "icon", type: "image/png", href: "/favicon.png", sizes: "48x48" },
    { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ].forEach(function (spec) {
    var link = document.createElement("link");
    Object.keys(spec).forEach(function (k) { link.setAttribute(k, spec[k]); });
    head.appendChild(link);
  });

  /* Keep the historical /cyberslacking route stable, but present the current
     product label in the UI. This avoids rewriting Mintlify/Next export
     metadata, which can break browser hydration. */
  var oldLabel = "Cyberslacking";
  var newLabel = "Facility Abuse";
  var blockedParents = /^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION)$/;
  var attrs = ["aria-label", "title", "data-title", "alt"];

  function replaceValue(value) {
    return value && value.indexOf(oldLabel) !== -1 ? value.split(oldLabel).join(newLabel) : value;
  }

  function normalize(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (root.parentElement && blockedParents.test(root.parentElement.tagName)) return;
      root.nodeValue = replaceValue(root.nodeValue);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) {
      attrs.forEach(function (attr) {
        var value = root.getAttribute(attr);
        var updated = replaceValue(value);
        if (updated !== value) root.setAttribute(attr, updated);
      });
    }

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (node.parentElement && blockedParents.test(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue && node.nodeValue.indexOf(oldLabel) !== -1
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
    var node;
    while ((node = walker.nextNode())) {
      node.nodeValue = replaceValue(node.nodeValue);
    }
  }

  function runLabelUpdate() {
    normalize(document.body || document.documentElement);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runLabelUpdate);
  } else {
    runLabelUpdate();
  }
  setTimeout(runLabelUpdate, 250);
  setTimeout(runLabelUpdate, 1000);

  if (window.MutationObserver) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "characterData") normalize(mutation.target);
        mutation.addedNodes && mutation.addedNodes.forEach(normalize);
        if (mutation.type === "attributes") normalize(mutation.target);
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: attrs,
    });
  }
})();
