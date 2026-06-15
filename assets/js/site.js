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
    .test-banner {
      position: fixed;
      inset: 0 0 auto;
      padding: 12px 18px;
      color: #fff;
      background: #b00020;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.02em;
    }
    main { width: min(660px, calc(100% - 36px)); }
    .panel {
      margin-top: 52px;
      padding: 44px 66px 72px;
      background: #fff;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #737373;
      font-size: 29px;
      font-weight: 600;
    }
    .mark {
      width: 34px;
      height: 34px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3px;
    }
    .mark span:nth-child(1) { background: #f35325; }
    .mark span:nth-child(2) { background: #81bc06; }
    .mark span:nth-child(3) { background: #05a6f0; }
    .mark span:nth-child(4) { background: #ffba08; }
    h1 {
      margin: 30px 0 24px;
      font-size: 34px;
      font-weight: 600;
    }
    label {
      display: block;
      color: #666;
      font-size: 24px;
    }
    input {
      width: 100%;
      height: 44px;
      border: 0;
      border-bottom: 1px solid #0067b8;
      font-size: 21px;
      outline: 0;
    }
    .links {
      display: grid;
      gap: 26px;
      margin: 28px 0 42px;
      font-size: 20px;
    }
    .links a {
      color: #0067b8;
      text-decoration: none;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    button {
      min-width: 162px;
      min-height: 48px;
      border: 0;
      font-size: 22px;
      cursor: pointer;
    }
    .back { background: #ccc; }
    .next { color: #fff; background: #0067b8; }
    .options {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: 28px;
      padding: 20px 72px;
      background: #fff;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
      font-size: 22px;
    }
    .key {
      width: 36px;
      height: 36px;
      border: 2px solid #333;
      border-radius: 50%;
      position: relative;
    }
    .key::after {
      content: "";
      position: absolute;
      width: 25px;
      height: 10px;
      left: 23px;
      top: 19px;
      border-top: 3px solid #333;
      border-right: 3px solid #333;
      transform: rotate(38deg);
    }
    .notice {
      margin-top: 18px;
      padding: 12px 14px;
      border-left: 4px solid #b00020;
      background: #fff3f3;
      color: #5f000f;
      font-size: 16px;
      line-height: 1.45;
    }
    @media (max-width: 640px) {
      .panel { padding: 32px 24px 46px; }
      .brand { font-size: 24px; }
      h1 { font-size: 30px; }
      label, .links, button, .options { font-size: 18px; }
      .actions { flex-direction: column; }
      button { width: 100%; }
      .options { padding: 18px 24px; }
    }
  </style>
</head>
<body>
  <div class="test-banner">SWG AUDIT TEST - DUMMY LOGIN PAGE - DO NOT ENTER REAL CREDENTIALS</div>
  <main>
    <section class="panel" aria-labelledby="dummy-login-title">
      <div class="brand" aria-label="Microsoft-style dummy brand">
        <span class="mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        <span>Microsoft</span>
      </div>
      <h1 id="dummy-login-title">Sign in</h1>
      <form>
        <label for="dummy-account">Email, phone, or Skype</label>
        <input id="dummy-account" name="dummy-account" type="text" autocomplete="off" inputmode="email">
        <div class="links">
          <span>No account? <a href="#" aria-disabled="true">Create one!</a></span>
          <a href="#" aria-disabled="true">Can't access your account?</a>
        </div>
        <div class="actions">
          <button class="back" type="button">Back</button>
          <button class="next" type="button">Next</button>
        </div>
      </form>
      <p class="notice">This page is a labelled SWG Audit phishing simulation. It is a dummy Microsoft-style HTML page rendered from stored content and no data is submitted.</p>
    </section>
    <section class="options" aria-label="Dummy sign-in options">
      <span class="key" aria-hidden="true"></span>
      <span>Sign-in options</span>
    </section>
  </main>
</body>
</html>`;

const makeMhtmlPayload = (html) => [
  "MIME-Version: 1.0",
  "Content-Type: multipart/related; boundary=\"----SWGAuditDummyMhtmlBoundary\"; type=\"text/html\"",
  "X-SWG-Audit-Test: Dummy phishing page stored as MHTML-style content",
  "",
  "------SWGAuditDummyMhtmlBoundary",
  "Content-Type: text/html; charset=\"utf-8\"",
  "Content-Location: https://dummy-login.invalid/swg-audit-test.html",
  "",
  html,
  "------SWGAuditDummyMhtmlBoundary--",
].join("\r\n");

const extractHtmlFromMhtml = (mhtml) => {
  const match = mhtml.match(/Content-Type:\s*text\/html[^\r\n]*[\s\S]*?\r?\n\r?\n([\s\S]*?)\r?\n------SWGAuditDummyMhtmlBoundary--/i);
  return match ? match[1] : "";
};

document.querySelectorAll("[data-phishing-stored-site-launch]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;
    const select = card ? card.querySelector("[data-stored-site-format]") : null;
    const selectedFormat = select ? select.value : "html";
    const dummyHtml = makeDummyMicrosoftLoginHtml();
    const storedPayload = selectedFormat === "mhtml" ? window.btoa(makeMhtmlPayload(dummyHtml)) : window.btoa(dummyHtml);
    const renderedHtml = selectedFormat === "mhtml" ? extractHtmlFromMhtml(window.atob(storedPayload)) : window.atob(storedPayload);
    const blobUrl = URL.createObjectURL(new Blob([renderedHtml], { type: "text/html" }));
    const openedWindow = window.open(blobUrl, "_blank");

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");

    if (openedWindow) {
      output.textContent = `Opened dummy ${selectedFormat.toUpperCase()} phishing-page rendering test in a new tab.`;
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      return;
    }

    URL.revokeObjectURL(blobUrl);
    output.classList.add("is-fail");
    output.textContent = "Test launch was blocked by the browser.";
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
