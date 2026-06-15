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
  const detail = document.getElementById(card.getAttribute("aria-controls"));

  if (!detail) return;

  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    card.setAttribute("aria-expanded", String(open));
    detail.hidden = !open;
  };

  const toggleCard = () => {
    const willOpen = card.getAttribute("aria-expanded") !== "true";
    const grid = card.closest(".test-card-grid");

    if (grid) {
      grid.querySelectorAll("[data-test-card]").forEach((otherCard) => {
        if (otherCard === card) return;

        const otherDetail = document.getElementById(otherCard.getAttribute("aria-controls"));
        otherCard.classList.remove("is-open");
        otherCard.setAttribute("aria-expanded", "false");
        if (otherDetail) otherDetail.hidden = true;
      });
    }

    setOpen(willOpen);
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("button, a, .test-card-detail")) return;
    toggleCard();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target.closest("button, a")) return;
    event.preventDefault();
    toggleCard();
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

document.querySelectorAll("[data-credential-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const card = form.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");
    output.textContent = "Submitting test credentials...";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method || "post",
        body: new FormData(form),
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Submission returned HTTP ${response.status}`);
      }

      output.classList.add("is-fail");
      output.textContent = "Test Failed: credential form submission succeeded.";
    } catch (error) {
      output.classList.add("is-pass");
      output.textContent = "Pass: credential form submission did not complete.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

const dummyMicrosoftKeyIcon = "data:image/png;base64,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";

const makeDummyMicrosoftLoginHtml = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SWG Audit Test - Dummy Microsoft Login</title>
  <style>
    * { box-sizing: border-box; }
    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      color: #1b1b1b;
      background:
        radial-gradient(circle at 12% 15%, rgba(0, 120, 215, 0.12), transparent 32rem),
        radial-gradient(circle at 85% 72%, rgba(243, 119, 53, 0.11), transparent 26rem),
        linear-gradient(135deg, #f6f8fc, #fff);
      font-family: "Segoe UI", Arial, sans-serif;
    }
    main { width: min(440px, calc(100% - 36px)); }
    .panel {
      width: 100%;
      min-height: 338px;
      padding: 44px;
      background: #fff;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 7px;
      color: #737373;
      font-size: 26px;
      font-weight: 600;
    }
    .mark {
      width: 24px;
      height: 24px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
    }
    .mark span:nth-child(1) { background: #f35325; }
    .mark span:nth-child(2) { background: #81bc06; }
    .mark span:nth-child(3) { background: #05a6f0; }
    .mark span:nth-child(4) { background: #ffba08; }
    h1 {
      margin: 24px 0 16px;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.18;
    }
    input {
      width: 100%;
      height: 36px;
      border: 0;
      border-bottom: 1px solid #666;
      color: #1b1b1b;
      font-size: 15px;
      outline: 0;
    }
    input::placeholder {
      color: #666;
      opacity: 1;
    }
    input:focus {
      border-bottom-color: #0067b8;
    }
    .links {
      display: grid;
      gap: 18px;
      margin: 18px 0 0;
      font-size: 13px;
    }
    .links a {
      color: #0067b8;
      text-decoration: none;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      margin-top: 34px;
    }
    button {
      min-width: 108px;
      min-height: 32px;
      border: 0;
      font-size: 15px;
      cursor: pointer;
    }
    .back { background: #ccc; }
    .next { color: #fff; background: #0067b8; }
    .options {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 48px;
      margin-top: 20px;
      padding: 0 44px;
      background: #fff;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
      font-size: 15px;
    }
    .key {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }
    .result {
      margin-top: 18px;
      padding: 12px;
      border-left: 4px solid #b00020;
      color: #5f000f;
      background: #fff3f3;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
    }
    @media (max-width: 640px) {
      .panel { min-height: auto; padding: 42px 28px 48px; }
      .brand { font-size: 24px; }
      .mark { width: 28px; height: 28px; }
      h1 { font-size: 30px; }
      input { font-size: 20px; }
      .links, button, .options { font-size: 18px; }
      .actions { flex-direction: column; }
      button { width: 100%; }
      .options { min-height: 64px; padding: 0 28px; }
      .key { width: 28px; height: 28px; }
    }
  </style>
</head>
<body>
  <main>
    <section class="panel" aria-labelledby="dummy-login-title">
      <div class="brand" aria-label="Microsoft-style dummy brand">
        <span class="mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        <span>Microsoft</span>
      </div>
      <h1 id="dummy-login-title">Sign in</h1>
      <div class="result" id="dummy-microsoft-result" hidden></div>
      <form id="dummy-microsoft-form">
        <input id="dummy-account" name="dummy-account" type="text" autocomplete="off" inputmode="email" placeholder="Email, phone, or Skype" aria-label="Email, phone, or Skype">
        <input id="dummy-password" name="dummy-password" type="password" autocomplete="off" placeholder="Password" aria-label="Password">
        <div class="links">
          <span>No account? <a href="#" aria-disabled="true">Create one!</a></span>
          <a href="#" aria-disabled="true">Can't access your account?</a>
        </div>
        <div class="actions">
          <button class="back" type="button">Back</button>
          <button class="next" type="submit">Next</button>
        </div>
      </form>
    </section>
    <section class="options" aria-label="Dummy sign-in options">
      <img class="key" src="${dummyMicrosoftKeyIcon}" alt="" aria-hidden="true">
      <span>Sign-in options</span>
    </section>
  </main>
  <script>
    const form = document.getElementById("dummy-microsoft-form");
    const result = document.getElementById("dummy-microsoft-result");
    const account = document.getElementById("dummy-account");
    const password = document.getElementById("dummy-password");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      result.hidden = false;
      result.innerHTML = "<strong>Test Failed: credential submission was supposed to be blocked.</strong><br>Username: " + account.value + "<br>Password: " + password.value;
    });
  </script>
</body>
</html>`;

const extractHtmlFromMhtml = (mhtml) => {
  const match = mhtml.match(/Content-Type:\s*text\/html[^\r\n]*[\s\S]*?\r?\n\r?\n([\s\S]*?)\r?\n------SWGAuditDummyMhtmlBoundary--/i);
  return match ? match[1] : "";
};

const fetchHtmlFromMhtml = async (url) => {
  const response = await fetch(url, {
    headers: {
      "Accept": "multipart/related,text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`MHTML fetch returned HTTP ${response.status}`);
  }

  const html = extractHtmlFromMhtml(await response.text());

  if (!html) {
    throw new Error("MHTML payload did not contain an HTML part");
  }

  return html;
};

document.querySelectorAll("[data-phishing-stored-site-launch]").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;
    const select = card ? card.querySelector("[data-stored-site-format]") : null;
    const selectedFormat = select ? select.value : "html";

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");
    output.textContent = selectedFormat === "mhtml" ? "Fetching server MHTML payload..." : "Preparing raw HTML payload...";

    try {
      const renderedHtml = selectedFormat === "mhtml"
        ? await fetchHtmlFromMhtml("/assets/tests/phishing/linkedin-login.mhtml")
        : makeDummyMicrosoftLoginHtml();
      const blobUrl = URL.createObjectURL(new Blob([renderedHtml], { type: "text/html" }));
      const openedWindow = window.open(blobUrl, "_blank");

      if (openedWindow) {
        output.textContent = `Opened dummy ${selectedFormat.toUpperCase()} phishing-page rendering test in a new tab.`;
        window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
        return;
      }

      URL.revokeObjectURL(blobUrl);
      output.classList.add("is-fail");
      output.textContent = "Test launch was blocked by the browser.";
    } catch (error) {
      output.classList.add("is-fail");
      output.textContent = `Test launch failed: ${error.message}`;
    }
  });
});

document.querySelectorAll("[data-phishing-canvas-launch]").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");
    output.textContent = "Fetching server MHTML payload...";

    try {
      const renderedHtml = await fetchHtmlFromMhtml("/assets/tests/phishing/github-canvas.mhtml");
      const blobUrl = URL.createObjectURL(new Blob([renderedHtml], { type: "text/html" }));
      const openedWindow = window.open(blobUrl, "_blank");

      if (openedWindow) {
        output.textContent = "Opened dummy GitHub-style canvas rendering test in a new tab from fetched MHTML.";
        window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
        return;
      }

      URL.revokeObjectURL(blobUrl);
      output.classList.add("is-fail");
      output.textContent = "Test launch was blocked by the browser.";
    } catch (error) {
      output.classList.add("is-fail");
      output.textContent = `Test launch failed: ${error.message}`;
    }
  });
});

document.querySelectorAll("[data-download-select]").forEach((select) => {
  const targetId = select.getAttribute("data-download-target");
  const link = targetId ? document.getElementById(targetId) : null;

  if (!link) return;

  select.addEventListener("change", () => {
    link.href = select.value;
  });
});

document.querySelectorAll("[data-chunk-attack-description]").forEach((description) => {
  const picker = description.closest(".test-picker");
  const select = picker ? picker.querySelector("select") : null;

  if (!select) return;

  const updateDescription = () => {
    const selectedOption = select.options[select.selectedIndex];
    description.textContent = selectedOption ? selectedOption.getAttribute("data-description") || "" : "";
  };

  select.addEventListener("change", updateDescription);
  updateDescription();
});

const base64ToBytes = (value) => {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const downloadBytes = (bytes, filename, mimeType, openInNewTab = false) => {
  const blob = new Blob([bytes], { type: mimeType || "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  if (openInNewTab) {
    window.open(url, "_blank", "noopener");
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    return;
  }

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const derivePayloadKey = async (password, salt) => {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: 200000,
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
};

const makeBlobLinkPreparer = (link, buildBlob) => {
  let preparedUrl = "";
  let preparingPromise = null;
  let preparedKey = "";

  const revokePreparedUrl = () => {
    if (!preparedUrl) return;

    URL.revokeObjectURL(preparedUrl);
    preparedUrl = "";
  };

  const setDirectLink = (url) => {
    revokePreparedUrl();
    preparedKey = url;
    link.href = url;
    link.download = url.split("/").pop() || "download";
  };

  const prepareLink = async () => {
    const select = document.getElementById(link.getAttribute("data-source-select"));
    if (!select) return false;

    const selectedUrl = select.value;

    if (!selectedUrl.endsWith(".json")) {
      setDirectLink(selectedUrl);
      return true;
    }

    if (preparedKey === selectedUrl && preparedUrl) return true;
    if (preparingPromise) return preparingPromise;

    link.setAttribute("aria-busy", "true");
    preparingPromise = buildBlob(selectedUrl)
      .then(({ bytes, filename, mime }) => {
        revokePreparedUrl();
        preparedUrl = URL.createObjectURL(new Blob([bytes], { type: mime || "application/octet-stream" }));
        preparedKey = selectedUrl;
        link.href = preparedUrl;
        link.download = filename || selectedUrl.split("/").pop() || "download";
        return true;
      })
      .catch((error) => {
        window.alert(`Download test failed: ${error.message}`);
        return false;
      })
      .finally(() => {
        link.removeAttribute("aria-busy");
        preparingPromise = null;
      });

    return preparingPromise;
  };

  const warmLink = () => {
    prepareLink();
  };

  const hasPreparedHref = () => link.href && link.href !== "#" && link.href !== window.location.href + "#";

  const openPreparedLinkInNewTab = async (event) => {
    event.preventDefault();

    const newTab = window.open("about:blank", "_blank", "noopener");
    if (await prepareLink()) {
      if (newTab) {
        newTab.location = link.href;
      } else {
        window.open(link.href, "_blank", "noopener");
      }
    } else if (newTab) {
      newTab.close();
    }
  };

  ["pointerenter", "focus", "mousedown", "contextmenu"].forEach((eventName) => {
    link.addEventListener(eventName, warmLink);
  });

  link.addEventListener("auxclick", (event) => {
    if (event.button === 1 && !hasPreparedHref()) {
      openPreparedLinkInNewTab(event);
    }
  });

  link.addEventListener("click", async (event) => {
    if ((event.ctrlKey || event.metaKey) && !hasPreparedHref()) {
      openPreparedLinkInNewTab(event);
      return;
    }

    if (hasPreparedHref()) return;

    event.preventDefault();
    if (await prepareLink()) {
      link.click();
    }
  });

  const select = document.getElementById(link.getAttribute("data-source-select"));
  if (select) {
    select.addEventListener("change", () => {
      revokePreparedUrl();
      preparedKey = "";
      link.href = "#";
      warmLink();
    });
  }

  window.addEventListener("pagehide", revokePreparedUrl);
  warmLink();
};

const buildAssembledPayload = async (selectedUrl) => {
  const response = await fetch(selectedUrl, { cache: "no-store" });
  const payload = await response.json();
  let bytes;

  if (payload.mode === "decode-base64") {
    bytes = base64ToBytes(payload.payload);
  } else if (payload.mode === "decrypt-aes-gcm") {
    const salt = base64ToBytes(payload.salt);
    const iv = base64ToBytes(payload.iv);
    const ciphertext = base64ToBytes(payload.payload);
    const key = await derivePayloadKey(payload.password || "123456", salt);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
    bytes = new Uint8Array(decrypted);
  } else {
    throw new Error("Unsupported assembly mode.");
  }

  return { bytes, filename: payload.filename, mime: payload.mime };
};

document.querySelectorAll("[data-assembled-download]").forEach((link) => {
  makeBlobLinkPreparer(link, buildAssembledPayload);
});

const extractSmugglingPayload = (format) => {
  const carrier = document.querySelector(`[data-smuggling-carrier="${format}"]`);

  if (!carrier) return "";

  if (format === "html" || format === "js") {
    return carrier.getAttribute("data-smuggling-payload") || "";
  }

  if (format === "css") {
    const payloadMatch = carrier.textContent.match(/--smuggled-payload:\s*["']([A-Za-z0-9+/=\s]+)["']/);
    return payloadMatch ? payloadMatch[1] : "";
  }

  if (format === "svg") {
    const payload = carrier.querySelector("metadata");
    return payload ? payload.textContent : "";
  }

  return "";
};

document.querySelectorAll("[data-smuggling-download]").forEach((link) => {
  let smugglingUrl = "";

  const revokeSmugglingUrl = () => {
    if (!smugglingUrl) return;

    URL.revokeObjectURL(smugglingUrl);
    smugglingUrl = "";
  };

  const prepareSmugglingLink = () => {
    const select = document.getElementById(link.getAttribute("data-source-select"));
    const selectedOption = select ? select.options[select.selectedIndex] : null;

    if (!selectedOption) return false;

    const format = selectedOption.value || "html";
    const filename = selectedOption.getAttribute("data-smuggling-filename") || `${format}_smuggling.docm`;
    const payload = extractSmugglingPayload(format).replace(/\s+/g, "");

    if (!payload) {
      throw new Error(`${format.toUpperCase()} smuggling payload was not found on the page.`);
    }

    revokeSmugglingUrl();
    smugglingUrl = URL.createObjectURL(
      new Blob([base64ToBytes(payload)], { type: "application/vnd.ms-word.document.macroEnabled.12" })
    );
    link.href = smugglingUrl;
    link.download = filename;
    return true;
  };

  const safelyPrepareSmugglingLink = () => {
    try {
      return prepareSmugglingLink();
    } catch (error) {
      window.alert(`Smuggling test failed: ${error.message}`);
      return false;
    }
  };

  ["pointerenter", "focus", "mousedown", "contextmenu"].forEach((eventName) => {
    link.addEventListener(eventName, safelyPrepareSmugglingLink);
  });

  link.addEventListener("click", (event) => {
    if (!safelyPrepareSmugglingLink()) {
      event.preventDefault();
    }
  });

  const select = document.getElementById(link.getAttribute("data-source-select"));
  if (select) {
    select.addEventListener("change", safelyPrepareSmugglingLink);
  }

  window.addEventListener("pagehide", revokeSmugglingUrl);
  safelyPrepareSmugglingLink();
});

const buildChunkAttackPayload = async (selectedUrl) => {
  const manifestResponse = await fetch(selectedUrl, { cache: "no-store" });

  if (!manifestResponse.ok) {
    throw new Error("Manifest request failed.");
  }

  const manifest = await manifestResponse.json();
  const fetchChunk = async (chunk) => {
    const response = await fetch(chunk.url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Chunk request failed: ${chunk.url}`);
    }

    return {
      include: chunk.include !== false,
      order: Number(chunk.order),
      text: (await response.text()).replace(/\r?\n$/, ""),
    };
  };
  let chunkResponses;

  if (manifest.fetchMode === "parallel") {
    chunkResponses = await Promise.all(manifest.chunks.map(fetchChunk));
  } else {
    chunkResponses = [];

    for (const chunk of manifest.chunks) {
      chunkResponses.push(await fetchChunk(chunk));
    }
  }

  const assembledText = chunkResponses
    .filter((chunk) => chunk.include)
    .sort((left, right) => left.order - right.order)
    .map((chunk) => chunk.text)
    .join("");

  return {
    bytes: new TextEncoder().encode(assembledText),
    filename: manifest.filename || "eicar-chunk-attack.txt",
    mime: manifest.mime || "text/plain",
  };
};

document.querySelectorAll("[data-chunk-attack-download]").forEach((link) => {
  makeBlobLinkPreparer(link, buildChunkAttackPayload);
});
