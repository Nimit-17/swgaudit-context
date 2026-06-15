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

const downloadBytes = (bytes, filename, mimeType) => {
  const blob = new Blob([bytes], { type: mimeType || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
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

document.querySelectorAll("[data-assembled-download]").forEach((button) => {
  button.addEventListener("click", async () => {
    const select = document.getElementById(button.getAttribute("data-source-select"));
    if (!select) return;

    const selectedUrl = select.value;

    if (!selectedUrl.endsWith(".json")) {
      const link = document.createElement("a");
      link.href = selectedUrl;
      link.download = selectedUrl.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    button.disabled = true;

    try {
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

      downloadBytes(bytes, payload.filename, payload.mime);
    } finally {
      button.disabled = false;
    }
  });
});

document.querySelectorAll("[data-smuggling-download]").forEach((link) => {
  link.addEventListener("click", async (event) => {
    const select = document.getElementById(link.getAttribute("data-source-select"));
    const selectedOption = select ? select.options[select.selectedIndex] : null;

    if (!selectedOption || selectedOption.getAttribute("data-inline-smuggling") !== "html") return;

    event.preventDefault();

    try {
      const response = await fetch("/assets/test-files/malware/smuggling/html-smuggling.js", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("HTML smuggling payload request failed.");
      }

      const source = await response.text();
      const payloadMatch = source.match(/const docmPayloadBase64 =([\s\S]*?);\s*const docmFilename/);
      const filenameMatch = source.match(/const docmFilename = '([^']+)'/);
      const mimeMatch = source.match(/const docmMimeType = '([^']+)'/);

      if (!payloadMatch) {
        throw new Error("HTML smuggling payload was not found.");
      }

      const payload = Array.from(payloadMatch[1].matchAll(/'([^']*)'/g))
        .map((match) => match[1])
        .join("");

      downloadBytes(
        base64ToBytes(payload),
        filenameMatch ? filenameMatch[1] : "swgaudit-html-smuggling.docm",
        mimeMatch ? mimeMatch[1] : "application/vnd.ms-word.document.macroEnabled.12"
      );
    } catch (error) {
      window.alert(`HTML smuggling test failed: ${error.message}`);
    }
  });
});

document.querySelectorAll("[data-chunk-attack-download]").forEach((button) => {
  button.addEventListener("click", async () => {
    const select = document.getElementById(button.getAttribute("data-source-select"));

    if (!select) return;

    button.disabled = true;

    try {
      const manifestResponse = await fetch(select.value, { cache: "no-store" });

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

      downloadBytes(
        new TextEncoder().encode(assembledText),
        manifest.filename || "eicar-chunk-attack.txt",
        manifest.mime || "text/plain"
      );
    } catch (error) {
      window.alert(`Chunk test failed: ${error.message}`);
    } finally {
      button.disabled = false;
    }
  });
});
