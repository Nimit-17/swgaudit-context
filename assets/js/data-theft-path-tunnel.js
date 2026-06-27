const pathTunnelMaxFileSize = 200 * 1024;
const pathTunnelChunkSize = 1500;
const pathTunnelRequestTimeoutMs = 8000;

const pathTunnelReadFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => resolve(reader.result));
  reader.addEventListener("error", () => reject(reader.error));
  reader.readAsArrayBuffer(file);
});

const pathTunnelRandomId = () => {
  const bytes = new Uint8Array(8);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const pathTunnelBytesToBase64Url = (bytes) => {
  let binary = "";
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return window.btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
};

const pathTunnelWait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const pathTunnelBuildChunks = (id, file, encodedData) => {
  const chunks = [];

  for (let offset = 0, chunkNumber = 1; offset < encodedData.length; chunkNumber += 1) {
    chunks.push({
      number: chunkNumber,
      payload: encodedData.slice(offset, offset + pathTunnelChunkSize),
    });
    offset += pathTunnelChunkSize;
  }

  const metadata = {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    totalDataChunks: chunks.length,
    encodedLength: encodedData.length,
  };
  const metadataBytes = new TextEncoder().encode(JSON.stringify(metadata));

  return [
    { number: 0, payload: pathTunnelBytesToBase64Url(metadataBytes) },
    ...chunks,
  ];
};

const pathTunnelSendChunk = async (id, chunk) => {
  const url = `/data-theft/path-tunnel.php/${encodeURIComponent(id)}/${chunk.number}/${encodeURIComponent(chunk.payload)}`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), pathTunnelRequestTimeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { "Accept": "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Chunk ${chunk.number} returned HTTP ${response.status}`);
    }

    return response.json();
  } finally {
    window.clearTimeout(timeout);
  }
};

const pathTunnelCheckResult = async (id, status, attempts = 5, delayMs = 1000) => {
  let lastResult = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    status.textContent = `Checking server result (${attempt}/${attempts})...`;

    try {
      const response = await fetch(`/data-theft/path-tunnel.php?status=1&id=${encodeURIComponent(id)}`, {
        cache: "no-store",
        headers: { "Accept": "application/json" },
      });
      lastResult = await response.json();

      if (lastResult.success && lastResult.reconstructed) {
        return lastResult;
      }
    } catch (error) {
      lastResult = {
        success: false,
        reconstructed: false,
        message: "The server result could not be confirmed.",
      };
    }

    if (attempt < attempts) {
      await pathTunnelWait(delayMs);
    }
  }

  return lastResult || {
    success: false,
    reconstructed: false,
    message: "No complete file could be reconstructed from the received URL path chunks.",
  };
};

const pathTunnelIsSafeFileUrl = (url) => (
  typeof url === "string"
  && /^\/data-theft\/uploads\/[^/?#]+$/.test(url)
);

document.querySelectorAll("[data-path-tunnel-form]").forEach((form) => {
  const fileInput = form.querySelector("[data-path-tunnel-file]");
  const submitButton = form.querySelector("[data-path-tunnel-submit]");
  const detail = form.closest(".test-card-detail");
  const status = detail ? detail.querySelector("[data-path-tunnel-status]") : null;
  const resetButton = detail ? detail.querySelector("[data-path-tunnel-reset]") : null;

  if (!fileInput || !submitButton || !status) return;

  const setStatus = (message, state, fileUrl = null) => {
    status.hidden = false;
    status.classList.remove("is-pass", "is-fail");
    if (state) status.classList.add(state);
    status.textContent = message;

    if (pathTunnelIsSafeFileUrl(fileUrl)) {
      status.append(" ");
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "View reconstructed file";
      status.append(link);
    }
  };

  const runTest = async () => {
    const file = fileInput.files[0];
    if (!file) {
      setStatus("Choose a file before running the test.");
      return;
    }

    if (file.size === 0) {
      setStatus("Choose a non-empty file before running the test.");
      return;
    }

    if (file.size > pathTunnelMaxFileSize) {
      setStatus("Choose a file smaller than 200 KB.");
      return;
    }

    submitButton.disabled = true;
    fileInput.disabled = true;
    if (resetButton) resetButton.hidden = true;

    try {
      setStatus("Preparing HTTP path tunneling test...");
      const id = pathTunnelRandomId();
      const fileBytes = new Uint8Array(await pathTunnelReadFile(file));
      const encodedData = pathTunnelBytesToBase64Url(fileBytes);
      const chunks = pathTunnelBuildChunks(id, file, encodedData);
      setStatus("Sending URL path chunks...");

      for (const chunk of chunks) {
        try {
          await pathTunnelSendChunk(id, chunk);
        } catch (error) {
          // Blocked or modified chunk requests are valid outcomes; the final status check decides pass/fail.
        }
      }

      const result = await pathTunnelCheckResult(id, status);

      if (result.success && result.reconstructed) {
        setStatus(
          "Test Failed: the file was reconstructed from URL path chunks.",
          "is-fail",
          result.fileUrl,
        );
      } else {
        setStatus("Pass: the full file did not reach the server through URL path chunks.", "is-pass");
      }
    } catch (error) {
      setStatus("Test could not complete. Please retry.");
    } finally {
      submitButton.disabled = false;
      fileInput.disabled = false;
      if (resetButton) resetButton.hidden = false;
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runTest();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length === 0 || submitButton.disabled) return;
    runTest();
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      form.reset();
      status.hidden = true;
      status.textContent = "";
      status.classList.remove("is-pass", "is-fail");
      resetButton.hidden = true;
    });
  }
});
