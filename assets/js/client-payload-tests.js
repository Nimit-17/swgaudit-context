(async () => {
  const config = document.querySelector("[data-payload-test]");
  const button = document.querySelector("[data-run-payload-test]");
  const status = document.querySelector("[data-status]");

  if (!config || !button) return;

  const textToBytes = (text) => Uint8Array.from(text, (char) => char.charCodeAt(0));
  const base64ToBytes = (value) => textToBytes(atob(value));
  const setStatus = (message) => {
    if (status) status.textContent = message;
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

  const deriveKey = async (password, salt) => {
    const keyMaterial = await crypto.subtle.importKey(
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
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
  };

  const runTest = async () => {
    try {
      const mode = config.getAttribute("data-mode");
      const filename = config.getAttribute("data-filename") || "payload.bin";
      const mimeType = config.getAttribute("data-mime") || "application/octet-stream";
      let bytes;

      if (mode === "decode-base64") {
        bytes = base64ToBytes(config.textContent.trim());
      } else if (mode === "decrypt-aes-gcm") {
        const salt = base64ToBytes(config.getAttribute("data-salt"));
        const iv = base64ToBytes(config.getAttribute("data-iv"));
        const ciphertext = base64ToBytes(config.textContent.trim());
        const key = await deriveKey(config.getAttribute("data-password") || "123456", salt);
        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
        bytes = new Uint8Array(decrypted);
      } else {
        throw new Error("Unsupported test mode.");
      }

      downloadBytes(bytes, filename, mimeType);
      setStatus(`Generated ${filename} in the browser.`);
    } catch (error) {
      setStatus(`Test failed: ${error.message}`);
    }
  };

  button.addEventListener("click", runTest);
  window.setTimeout(runTest, 250);
})();
