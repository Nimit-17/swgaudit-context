const dataTheftEvasionEndpoint = "/data-theft/process_evasion_upload.php";
const dataTheftEvasionPassword = "123456";

const dataTheftBytesToBase64 = (bytes) => {
  let binary = "";
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return window.btoa(binary);
};

const dataTheftBytesToHex = (bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const dataTheftReadFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => resolve(new Uint8Array(reader.result)));
  reader.addEventListener("error", () => reject(reader.error));
  reader.readAsArrayBuffer(file);
});

const dataTheftBuildMetadata = (file) => ({
  name: file.name,
  type: file.type || "application/octet-stream",
  size: file.size,
});

const dataTheftSubmitFormData = async (formData) => {
  const response = await fetch(dataTheftEvasionEndpoint, {
    method: "post",
    body: formData,
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Submission returned HTTP ${response.status}`);
  }

  return response.json();
};

const dataTheftRunForm = async (form, buildFormData, preparingText) => {
  const card = form.closest("[data-test-card]");
  const output = card ? card.querySelector("[data-test-output]") : null;
  const submitButton = form.querySelector('button[type="submit"]');
  const fileInput = form.querySelector('input[type="file"]');

  if (!output || !fileInput) return;

  const file = fileInput.files[0];
  if (!file) {
    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");
    output.textContent = "Choose a file before running the test.";
    return;
  }

  output.hidden = false;
  output.classList.remove("is-pass", "is-fail");
  output.textContent = preparingText;
  if (submitButton) submitButton.disabled = true;

  try {
    const formData = await buildFormData(file, form);
    output.textContent = "Submitting transformed file...";
    const result = await dataTheftSubmitFormData(formData);

    if (!result.reconstructed) {
      throw new Error(result.message || "Server did not reconstruct the original file.");
    }

    output.classList.add("is-fail");
    output.textContent = "Test Failed: the transformed upload was reconstructed into the original file on the server. The file will be deleted after 10 minutes.";
  } catch (error) {
    output.classList.add("is-pass");
    output.textContent = `Pass: the transformed file did not reconstruct on the server. ${error.message}`;
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
};

const dataTheftEncodingFormData = async (file, form) => {
  const mode = form.querySelector("[name='encoding_mode']").value;
  const bytes = await dataTheftReadFile(file);
  let encoded;
  let filename = `${file.name}.${mode}.txt`;

  if (mode === "base64") {
    encoded = dataTheftBytesToBase64(bytes);
  } else if (mode === "double-base64") {
    encoded = window.btoa(dataTheftBytesToBase64(bytes));
  } else if (mode === "hex") {
    encoded = dataTheftBytesToHex(bytes);
    filename = `${file.name}.hex.txt`;
  } else if (mode === "url") {
    encoded = encodeURIComponent(dataTheftBytesToBase64(bytes));
  } else {
    throw new Error("Unsupported encoding mode.");
  }

  const formData = new FormData();
  formData.append("test_type", "encoding");
  formData.append("encoding_mode", mode);
  formData.append("metadata", JSON.stringify(dataTheftBuildMetadata(file)));
  formData.append("encoded_payload", new Blob([encoded], { type: "text/plain" }), filename);

  return formData;
};

const dataTheftEncryptionFormData = async (file, form) => {
  const mode = form.querySelector("[name='encryption_mode']").value;
  const bytes = await dataTheftReadFile(file);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(dataTheftEvasionPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 200000 },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, bytes));
  const tagLength = 16;
  const ciphertext = encrypted.subarray(0, encrypted.length - tagLength);
  const tag = encrypted.subarray(encrypted.length - tagLength);
  const formData = new FormData();

  formData.append("test_type", "encryption");
  formData.append("encryption_mode", mode);
  formData.append("metadata", JSON.stringify(dataTheftBuildMetadata(file)));
  formData.append("password", dataTheftEvasionPassword);
  formData.append("salt", dataTheftBytesToBase64(salt));
  formData.append("iv", dataTheftBytesToBase64(iv));
  formData.append("tag", dataTheftBytesToBase64(tag));
  formData.append("ciphertext", new Blob([ciphertext], { type: "application/octet-stream" }), `${file.name}.aes-gcm`);

  return formData;
};

const dataTheftMakeChunks = (bytes, mode) => {
  const baseChunkSize = Math.max(1, Math.ceil(bytes.length / 6));
  const chunks = [];

  if (mode === "randomized-size") {
    const ratios = [0.09, 0.21, 0.13, 0.27, 0.17, 0.13];
    let offset = 0;

    ratios.forEach((ratio, index) => {
      const remaining = bytes.length - offset;
      const size = index === ratios.length - 1 ? remaining : Math.max(1, Math.min(remaining, Math.floor(bytes.length * ratio)));
      chunks.push({ order: index + 1, include: true, bytes: bytes.subarray(offset, offset + size) });
      offset += size;
    });
  } else {
    for (let offset = 0, order = 1; offset < bytes.length; offset += baseChunkSize, order += 1) {
      chunks.push({ order, include: true, bytes: bytes.subarray(offset, Math.min(bytes.length, offset + baseChunkSize)) });
    }
  }

  if (mode === "reverse-order") {
    return chunks.reverse();
  }

  if (mode === "mixed-noise") {
    return [
      { order: 0, include: false, bytes: new TextEncoder().encode("benign decoy before file\n") },
      ...chunks,
      { order: 999, include: false, bytes: new TextEncoder().encode("benign decoy after file\n") },
    ];
  }

  return chunks;
};

const dataTheftChunkingFormData = async (file, form) => {
  const mode = form.querySelector("[name='chunking_mode']").value;
  const bytes = await dataTheftReadFile(file);
  const chunks = dataTheftMakeChunks(bytes, mode);
  const manifest = chunks.map((chunk, index) => ({
    field: `chunk_${index}`,
    order: chunk.order,
    include: chunk.include,
  }));
  const formData = new FormData();

  formData.append("test_type", "chunking");
  formData.append("chunking_mode", mode);
  formData.append("metadata", JSON.stringify(dataTheftBuildMetadata(file)));
  formData.append("manifest", JSON.stringify(manifest));

  chunks.forEach((chunk, index) => {
    formData.append(`chunk_${index}`, new Blob([chunk.bytes], { type: "application/octet-stream" }), `chunk-${index + 1}.part`);
  });

  return formData;
};

document.querySelectorAll("[data-data-theft-encoding-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dataTheftRunForm(form, dataTheftEncodingFormData, "Encoding selected file...");
  });
});

document.querySelectorAll("[data-data-theft-encryption-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dataTheftRunForm(form, dataTheftEncryptionFormData, "Encrypting selected file...");
  });
});

document.querySelectorAll("[data-data-theft-chunking-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dataTheftRunForm(form, dataTheftChunkingFormData, "Chunking selected file...");
  });
});

document.querySelectorAll("[data-data-theft-chunk-description]").forEach((description) => {
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
