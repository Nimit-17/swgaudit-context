const dataTheftBase64ToBytes = (value) => {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const dataTheftDerivePayloadKey = async (password, salt) => {
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

const dataTheftBuildAssembledPayload = async (selectedUrl) => {
  const response = await fetch(selectedUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Payload request failed.");
  }

  const payload = await response.json();

  if (payload.mode !== "decrypt-aes-gcm") {
    throw new Error("Unsupported assembly mode.");
  }

  const salt = dataTheftBase64ToBytes(payload.salt);
  const iv = dataTheftBase64ToBytes(payload.iv);
  const ciphertext = dataTheftBase64ToBytes(payload.payload);
  const key = await dataTheftDerivePayloadKey(payload.password || "123456", salt);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);

  return {
    bytes: new Uint8Array(decrypted),
    filename: payload.filename || "pii-decrypted.txt",
    mime: payload.mime || "text/plain",
  };
};

const dataTheftFetchFilePayload = async (selectedUrl) => {
  if (selectedUrl.endsWith(".json")) {
    return dataTheftBuildAssembledPayload(selectedUrl);
  }

  const response = await fetch(selectedUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("File request failed.");
  }

  const blob = await response.blob();

  return {
    bytes: new Uint8Array(await blob.arrayBuffer()),
    filename: selectedUrl.split("/").pop() || "data-theft-upload.bin",
    mime: blob.type || "application/octet-stream",
  };
};

const dataTheftBuildChunkPayload = async (selectedUrl) => {
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
    filename: manifest.filename || "pii-chunk-upload.txt",
    mime: manifest.mime || "text/plain",
  };
};

const dataTheftUploadPayload = async ({ bytes, filename, mime }) => {
  const formData = new FormData();
  const file = new File([bytes], filename, { type: mime || "application/octet-stream" });

  formData.append("swg_audit_test", "normal-file-submission");
  formData.append("personal_data_file", file);

  const response = await fetch("/data-theft/", {
    method: "post",
    body: formData,
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Submission returned HTTP ${response.status}`);
  }

  return response.json();
};

const dataTheftRunUpload = async (button, buildPayload) => {
  const card = button.closest("[data-test-card]");
  const output = card ? card.querySelector("[data-test-output]") : null;
  const select = document.getElementById(button.getAttribute("data-source-select"));

  if (!output || !select) return;

  output.hidden = false;
  output.classList.remove("is-pass", "is-fail");
  output.textContent = "Preparing selected file...";
  button.disabled = true;

  try {
    const payload = await buildPayload(select.value);
    output.textContent = "Uploading selected file...";
    const result = await dataTheftUploadPayload(payload);

    if (!result.stored) {
      throw new Error("Server did not store the uploaded file.");
    }

    output.classList.add("is-fail");
    output.textContent = "Test Failed: selected file upload succeeded. The uploaded file will be deleted from the server after 10 minutes.";
  } catch (error) {
    output.classList.add("is-pass");
    output.textContent = `Pass: selected file upload did not complete. ${error.message}`;
  } finally {
    button.disabled = false;
  }
};

document.querySelectorAll("[data-data-theft-file-upload]").forEach((button) => {
  button.addEventListener("click", () => {
    dataTheftRunUpload(button, dataTheftFetchFilePayload);
  });
});

document.querySelectorAll("[data-data-theft-chunk-upload]").forEach((button) => {
  button.addEventListener("click", () => {
    dataTheftRunUpload(button, dataTheftBuildChunkPayload);
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
