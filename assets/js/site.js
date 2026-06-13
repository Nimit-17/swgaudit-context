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
