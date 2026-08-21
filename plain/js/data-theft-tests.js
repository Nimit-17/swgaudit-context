/* Data Theft: file upload, encode/encrypt/chunk, DNS + path tunneling. */
(function () {
  "use strict";

  var selectedFileState = {};
  var outputState = {};
  var serverFileState = {};

  /* ---- console helpers ------------------------------------------------- */

  function runConsoleFor(el) {
    var run = el && el.closest && el.closest(".swg-run");
    return run ? run.querySelector("[data-test-console]") : null;
  }

  function startConsole(el, command) {
    var consoleEl = runConsoleFor(el);
    if (!consoleEl) return;
    consoleEl.innerHTML =
      '<div class="swg-console-line"><span class="swg-console-prompt">$</span> ' +
      command +
      "</div>";
  }

  function terminalLine(el, text, state) {
    var consoleEl = runConsoleFor(el);
    if (!consoleEl) return;
    var line = document.createElement("div");
    line.className = "swg-console-line";
    if (state) line.classList.add("swg-console-" + state);
    line.textContent = text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function sentenceCase(text) {
    var value = String(text || "").trim();
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
  }

  function terminalPass(el, text) {
    terminalLine(el, "Your perimeter security has passed. " + sentenceCase(text), "pass");
  }

  function terminalFail(el, text) {
    terminalLine(el, "Your perimeter security has failed. " + sentenceCase(text), "fail");
  }

  function readyConsoles() {
    document.querySelectorAll("[data-test-console]").forEach(function (consoleEl) {
      if (!consoleEl.textContent.trim()) {
        consoleEl.innerHTML =
          '<div class="swg-console-line"><span class="swg-console-prompt">$</span> swg-audit ready</div>';
      }
    });
  }

  /* ---- output / server-file helpers ------------------------------------ */

  function isBlockedFetchError(err) {
    if (!err) return false;
    var msg = String(err.message || err);
    if (err instanceof TypeError) return true;
    if (msg === "Failed to fetch" || msg.indexOf("NetworkError") !== -1) return true;
    if (/Unable to load|Request blocked|Upload returned HTTP|Submission returned HTTP/.test(msg)) return true;
    if (/HTTP (403|451|502|503)\b/.test(msg)) return true;
    return false;
  }

  function isBlockedHttpError(err) {
    if (!err) return false;
    if (isBlockedFetchError(err)) return true;
    var msg = String(err.message || err);
    return /HTTP (400|403|404|405|408|410|451|502|503)\b/.test(msg);
  }

  function cardOutput(form, selector) {
    var run = form.closest(".swg-run") || form;
    return run.querySelector(selector || "[data-test-output]");
  }

  function outputMarker(out) {
    if (!out) return "swg-output";
    if (out.hasAttribute("data-test-output")) return "data-test-output";
    if (out.hasAttribute("data-dns-tunnel-status")) return "data-dns-tunnel-status";
    if (out.hasAttribute("data-path-tunnel-status")) return "data-path-tunnel-status";
    return "swg-output";
  }

  function pagePathFor(el) {
    var run = el && el.closest && el.closest(".swg-run");
    return (run && run.getAttribute("data-page-path")) || location.pathname;
  }

  function bindRunPage(runOrChild) {
    var run = runOrChild && runOrChild.closest ? runOrChild.closest(".swg-run") || runOrChild : runOrChild;
    if (run && !run.getAttribute("data-page-path")) {
      run.setAttribute("data-page-path", location.pathname);
    }
    return run;
  }

  function outputKey(out) {
    if (!out) return "";
    return pagePathFor(out) + "::" + outputMarker(out);
  }

  function setOutput(out, text, state) {
    if (!out) return;
    out.hidden = false;
    out.removeAttribute("hidden");
    out.style.display = "block";
    out.classList.remove("is-pass", "is-fail");
    if (state) out.classList.add(state);
    out.textContent = text;
  }

  function setPersistentOutput(out, text, state, pagePath) {
    var key = (pagePath || pagePathFor(out)) + "::" + outputMarker(out);
    if (key) outputState[key] = { text: text, state: state };
    setOutput(out, text, state);
  }

  function clearPersistentOutput(out) {
    var key = outputKey(out);
    if (key) delete outputState[key];
  }

  function serverFileKey(button) {
    return button ? pagePathFor(button) + "::open-server-file" : "";
  }

  function safeUploadUrl(url) {
    return typeof url === "string" && /^\/data-theft\/uploads\/[^/?#]+$/.test(url);
  }

  function showServerFileButton(button, fileUrl) {
    if (!button || !safeUploadUrl(fileUrl)) return;
    button.hidden = false;
    button.removeAttribute("hidden");
    button.style.display = "block";
    button.setAttribute("data-file-url", fileUrl);
    serverFileState[serverFileKey(button)] = fileUrl;
  }

  function clearServerFileButton(button) {
    if (!button) return;
    delete serverFileState[serverFileKey(button)];
    button.removeAttribute("data-file-url");
    button.style.display = "";
    button.hidden = true;
    button.setAttribute("hidden", "");
  }

  function serverFileButtonFor(el) {
    var run = el && el.closest && el.closest(".swg-run");
    return run && run.querySelector("[data-open-server-file]");
  }

  function clearRunResult(form, out) {
    clearPersistentOutput(out);
    clearServerFileButton(serverFileButtonFor(form));
  }

  function revealServerFile(fromEl, fileUrl) {
    if (!safeUploadUrl(fileUrl)) return;
    var button = serverFileButtonFor(fromEl);
    if (!button) return;
    showServerFileButton(button, fileUrl);
    terminalLine(fromEl, "server file is available at " + fileUrl);
  }

  function reportBlockedSubmission(el, out, pagePath, passText, outputText) {
    terminalPass(el, passText);
    setPersistentOutput(out, outputText || "Test passed.", "is-pass", pagePath);
  }

  function reportIncompleteSubmission(el, out, detail) {
    terminalLine(el, detail || "submission could not complete.");
    setOutput(out, "Test could not complete. Please retry.");
  }

  function openNewTab(url) {
    var opened = window.open(url, "_blank");
    if (opened) {
      try {
        opened.opener = null;
      } catch (error) {}
    }
    return opened;
  }

  function readJson(response) {
    return response.text().then(function (text) {
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch (error) {
        return { raw: text };
      }
    });
  }

  function restorePersistentResults() {
    document.querySelectorAll(".swg-output").forEach(function (out) {
      var saved = outputState[outputKey(out)];
      if (saved) setOutput(out, saved.text, saved.state);
    });
    document.querySelectorAll("[data-open-server-file]").forEach(function (button) {
      var fileUrl = serverFileState[serverFileKey(button)];
      if (fileUrl) showServerFileButton(button, fileUrl);
    });
  }

  /* ---- file input handling --------------------------------------------- */

  function fileInputKey(input) {
    if (!input) return "";
    var marker =
      input.getAttribute("name") ||
      (input.hasAttribute("data-dns-tunnel-file") ? "dns-tunnel-file" : "") ||
      (input.hasAttribute("data-path-tunnel-file") ? "path-tunnel-file" : "") ||
      "file";
    return pagePathFor(input) + "::" + marker;
  }

  function selectedFile(input) {
    if (!input) return null;
    var nativeFile = input.files && input.files[0];
    var key = fileInputKey(input);
    if (nativeFile) {
      selectedFileState[key] = nativeFile;
      return nativeFile;
    }
    return selectedFileState[key] || null;
  }

  function updateFileLabel(input, file) {
    var field = input && input.closest(".swg-file-field");
    var label = field && field.querySelector("[data-file-name]");
    if (label) label.textContent = file ? file.name : "No file chosen";
  }

  function restoreFileInput(input, file) {
    if (!input || !file || (input.files && input.files[0])) return;
    try {
      var transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
    } catch (error) {}
  }

  function initFileControls() {
    document.querySelectorAll('.swg-file-field input[type="file"]').forEach(function (input) {
      var file = selectedFile(input);
      if (file) restoreFileInput(input, file);
      updateFileLabel(input, file);
    });
  }

  function clearSelectedFile(input) {
    if (!input) return;
    delete selectedFileState[fileInputKey(input)];
    input.value = "";
    updateFileLabel(input, null);
  }

  function fileBytes(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(new Uint8Array(reader.result));
      });
      reader.addEventListener("error", function () {
        reject(reader.error);
      });
      reader.readAsArrayBuffer(file);
    });
  }

  /* ---- chip / dropdown helpers ----------------------------------------- */

  function closeAllDropdowns() {
    document.querySelectorAll("[data-dd].is-open").forEach(function (dd) {
      dd.classList.remove("is-open");
      var menu = dd.querySelector("[data-dd-menu]");
      if (menu) menu.hidden = true;
    });
  }

  function activeMode(form) {
    var option =
      form.querySelector("[data-dd-opt].is-active") ||
      form.querySelector("[data-chip].is-active") ||
      form.querySelector("[data-dd-opt]") ||
      form.querySelector("[data-chip]");
    return option ? option.getAttribute("data-mode") : "";
  }

  /* ---- encoding / encryption / chunking builders ----------------------- */

  function bytesToBase64(bytes) {
    var binary = "";
    for (var offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode.apply(null, bytes.subarray(offset, offset + 0x8000));
    }
    return window.btoa(binary);
  }

  function bytesToHex(bytes) {
    return Array.from(bytes, function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  function metadata(file) {
    return JSON.stringify({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
    });
  }

  function submitEvasion(formData) {
    return fetch("/data-theft/process_evasion_upload.php", {
      method: "post",
      body: formData,
      headers: { Accept: "application/json" },
    }).then(function (response) {
      if (!response.ok) throw new Error("Submission returned HTTP " + response.status);
      return response.json();
    });
  }

  function buildEncodingForm(file, form) {
    return fileBytes(file).then(function (bytes) {
      var mode = activeMode(form) || "base64";
      var encoded;
      var filename = file.name + "." + mode + ".txt";
      if (mode === "base64") encoded = bytesToBase64(bytes);
      else if (mode === "double-base64") encoded = window.btoa(bytesToBase64(bytes));
      else if (mode === "hex") {
        encoded = bytesToHex(bytes);
        filename = file.name + ".hex.txt";
      } else if (mode === "url") encoded = encodeURIComponent(bytesToBase64(bytes));
      else throw new Error("Unsupported encoding mode.");

      var formData = new FormData();
      formData.append("test_type", "encoding");
      formData.append("encoding_mode", mode);
      formData.append("metadata", metadata(file));
      formData.append("encoded_payload", new Blob([encoded], { type: "text/plain" }), filename);
      return formData;
    });
  }

  function buildEncryptionForm(file, form) {
    return fileBytes(file).then(function (bytes) {
      var salt = crypto.getRandomValues(new Uint8Array(16));
      var iv = crypto.getRandomValues(new Uint8Array(12));
      return crypto.subtle
        .importKey("raw", new TextEncoder().encode("123456"), "PBKDF2", false, ["deriveKey"])
        .then(function (material) {
          return crypto.subtle.deriveKey(
            { name: "PBKDF2", hash: "SHA-256", salt: salt, iterations: 200000 },
            material,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt"]
          );
        })
        .then(function (key) {
          return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, bytes);
        })
        .then(function (encryptedBuffer) {
          var encrypted = new Uint8Array(encryptedBuffer);
          var tagLength = 16;
          var formData = new FormData();
          formData.append("test_type", "encryption");
          formData.append("encryption_mode", activeMode(form) || "aes-gcm");
          formData.append("metadata", metadata(file));
          formData.append("password", "123456");
          formData.append("salt", bytesToBase64(salt));
          formData.append("iv", bytesToBase64(iv));
          formData.append("tag", bytesToBase64(encrypted.subarray(encrypted.length - tagLength)));
          formData.append(
            "ciphertext",
            new Blob([encrypted.subarray(0, encrypted.length - tagLength)], {
              type: "application/octet-stream",
            }),
            file.name + ".aes-gcm"
          );
          return formData;
        });
    });
  }

  function makeChunks(bytes, mode) {
    var base = Math.max(1, Math.ceil(bytes.length / 6));
    var chunks = [];
    if (mode === "randomized-size") {
      var ratios = [0.09, 0.21, 0.13, 0.27, 0.17, 0.13];
      var offset = 0;
      ratios.forEach(function (ratio, index) {
        var remaining = bytes.length - offset;
        var size =
          index === ratios.length - 1
            ? remaining
            : Math.max(1, Math.min(remaining, Math.floor(bytes.length * ratio)));
        chunks.push({ order: index + 1, include: true, bytes: bytes.subarray(offset, offset + size) });
        offset += size;
      });
    } else {
      for (var start = 0, order = 1; start < bytes.length; start += base, order += 1) {
        chunks.push({
          order: order,
          include: true,
          bytes: bytes.subarray(start, Math.min(bytes.length, start + base)),
        });
      }
    }
    if (mode === "reverse-order") return chunks.reverse();
    if (mode === "mixed-noise") {
      return [{ order: 0, include: false, bytes: new TextEncoder().encode("benign decoy before file\n") }]
        .concat(chunks)
        .concat([{ order: 999, include: false, bytes: new TextEncoder().encode("benign decoy after file\n") }]);
    }
    return chunks;
  }

  function buildChunkingForm(file, form) {
    return fileBytes(file).then(function (bytes) {
      var mode = activeMode(form) || "straight-split";
      var chunks = makeChunks(bytes, mode);
      var formData = new FormData();
      formData.append("test_type", "chunking");
      formData.append("chunking_mode", mode);
      formData.append("metadata", metadata(file));
      formData.append(
        "manifest",
        JSON.stringify(
          chunks.map(function (chunk, index) {
            return { field: "chunk_" + index, order: chunk.order, include: chunk.include };
          })
        )
      );
      chunks.forEach(function (chunk, index) {
        formData.append(
          "chunk_" + index,
          new Blob([chunk.bytes], { type: "application/octet-stream" }),
          "chunk-" + (index + 1) + ".part"
        );
      });
      return formData;
    });
  }

  function runDataTheftForm(form, build, transformKind) {
    bindRunPage(form);
    var pagePath = location.pathname;
    var out = cardOutput(form);
    var button = form.querySelector('button[type="submit"]');
    var input = form.querySelector('input[type="file"]');
    var file = selectedFile(input);
    if (!file) {
      setOutput(out, "Choose a file before running the test.");
      return;
    }
    var mode = activeMode(form) || transformKind;
    clearRunResult(form, out);
    startConsole(form, "swg-audit data-theft submit --file=" + file.name);
    terminalLine(form, "selected file: " + file.name);
    terminalLine(form, "preparing file (" + mode + ") ...");
    setOutput(out, "Preparing file (" + mode + ")...");
    if (button) button.disabled = true;
    build(file, form)
      .then(function (formData) {
        terminalLine(form, "sending " + mode + " payload to collector ...");
        setOutput(out, "Sending " + mode + " payload...");
        return submitEvasion(formData);
      })
      .then(function (result) {
        terminalLine(form, "checking collector reconstruction ...");
        if (result && result.reconstructed) {
          terminalFail(form, "collector rebuilt the submitted file.");
          revealServerFile(form, result.fileUrl);
          setPersistentOutput(out, "Test failed.", "is-fail", pagePath);
          return;
        }
        terminalPass(form, "collector did not rebuild the submitted file.");
        setPersistentOutput(out, "Test passed.", "is-pass", pagePath);
      })
      .catch(function (err) {
        if (isBlockedHttpError(err)) {
          reportBlockedSubmission(form, out, pagePath, "collector did not rebuild the submitted file.");
          return;
        }
        reportIncompleteSubmission(form, out, "submission could not complete.");
      })
      .finally(function () {
        if (button) button.disabled = false;
      });
  }

  /* ---- DNS tunneling --------------------------------------------------- */

  var dnsAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  function testId() {
    if (crypto.randomUUID) return crypto.randomUUID().replace(/-/g, "");
    var bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, function (b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }

  function base32(bytes) {
    var output = "";
    var value = 0;
    var bits = 0;
    bytes.forEach(function (byte) {
      value = (value << 8) | byte;
      bits += 8;
      while (bits >= 5) {
        output += dnsAlphabet[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    });
    if (bits > 0) output += dnsAlphabet[(value << (5 - bits)) & 31];
    return output;
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function runLimited(items, limit, worker) {
    var index = 0;
    var active = 0;
    return new Promise(function (resolve) {
      function next() {
        if (index >= items.length && active === 0) return resolve();
        while (active < limit && index < items.length) {
          var item = items[index++];
          active += 1;
          Promise.resolve(worker(item))
            .catch(function () {})
            .finally(function () {
              active -= 1;
              next();
            });
        }
      }
      next();
    });
  }

  function dnsTunnelParentDomain() {
    return "t.swgaudit.com";
  }

  function buildDnsChunks(id, file, encodedData) {
    var suffix = "." + dnsTunnelParentDomain();
    var maxDataLength = 253 - id.length - suffix.length - 5;
    var chunks = [];
    for (var offset = 0, chunkNumber = 1; offset < encodedData.length; chunkNumber += 1) {
      var labels = [];
      var remainingLength = maxDataLength;
      while (offset < encodedData.length && remainingLength > 0) {
        var labelLength = Math.min(60, remainingLength, encodedData.length - offset);
        labels.push(encodedData.slice(offset, offset + labelLength));
        remainingLength -= labelLength + 1;
        offset += labelLength;
      }
      chunks.push({ number: chunkNumber, labels: labels });
    }
    var safeName = (file.name || "dns-tunnel-file").replace(/[^\w.-]+/g, "_");
    if (safeName.length > 48) {
      var dot = safeName.lastIndexOf(".");
      var ext = dot > 0 && safeName.length - dot <= 12 ? safeName.slice(dot) : "";
      safeName = safeName.slice(0, 48 - ext.length) + ext;
    }
    var meta = new TextEncoder().encode(
      JSON.stringify({
        n: safeName,
        t: (file.type || "").slice(0, 48),
        s: file.size,
        c: chunks.length,
        l: encodedData.length,
      })
    );
    var metaPayload = base32(meta);
    if (metaPayload.length > maxDataLength) {
      meta = new TextEncoder().encode(
        JSON.stringify({
          n: "dns-tunnel-file",
          t: "",
          s: file.size,
          c: chunks.length,
          l: encodedData.length,
        })
      );
      metaPayload = base32(meta);
    }
    return [{ number: 0, labels: metaPayload.match(/.{1,60}/g) || [] }].concat(chunks);
  }

  function checkDnsResult(id, form, attempts) {
    var out = cardOutput(form, "[data-dns-tunnel-status]");
    var last = null;
    var chain = Promise.resolve();
    for (var i = 1; i <= attempts; i += 1) {
      (function (attempt) {
        chain = chain
          .then(function () {
            setOutput(out, "Checking collector reconstruction (" + attempt + "/" + attempts + ")...");
            terminalLine(form, "checking collector reconstruction (" + attempt + "/" + attempts + ") ...");
            return fetch("/data-theft/fetch_uploaded_data.php?id=" + encodeURIComponent(id), {
              headers: { Accept: "application/json" },
            })
              .then(function (r) {
                return r.json();
              })
              .then(function (result) {
                last = result;
                if (result.success && result.fileUrl) return result;
                if (result.partial) return result;
                if (attempt < attempts) return wait(2000);
                return null;
              });
          })
          .then(function (result) {
            if (result && ((result.success && result.fileUrl) || result.partial)) {
              throw { done: true, result: result };
            }
          });
      })(i);
    }
    return chain
      .then(function () {
        return (
          last || {
            success: false,
            message: "No complete file could be reconstructed from the received DNS chunks.",
          }
        );
      })
      .catch(function (marker) {
        if (marker.done) return marker.result;
        throw marker;
      });
  }

  function runDnsTunnel(form) {
    bindRunPage(form);
    var pagePath = location.pathname;
    var out = cardOutput(form, "[data-dns-tunnel-status]");
    var input = form.querySelector("[data-dns-tunnel-file]");
    var submit = form.querySelector("[data-dns-tunnel-submit]");
    var reset = form.querySelector("[data-dns-tunnel-reset]");
    var file = selectedFile(input);
    if (!file) {
      return setOutput(out, "Choose a file before running the test.");
    }
    if (file.size > 100 * 1024) {
      startConsole(form, "swg-audit dns-tunnel --file=" + file.name);
      terminalLine(form, "selected file: " + file.name);
      terminalLine(form, "file exceeds 100 KB limit.");
      return setOutput(out, "Choose a file smaller than 100 KB.");
    }
    submit.disabled = true;
    if (reset) reset.hidden = true;
    clearRunResult(form, out);
    startConsole(form, "swg-audit dns-tunnel --file=" + file.name);
    terminalLine(form, "selected file: " + file.name);
    terminalLine(form, "preparing file (dns tunneling) ...");
    setOutput(out, "Preparing file (dns tunneling)...");
    var id = testId().slice(0, 16);
    fileBytes(file)
      .then(function (bytes) {
        var chunks = buildDnsChunks(id, file, base32(bytes));
        var attempted = 0;
        return runLimited(chunks, 8, function (chunk) {
          var url = "https://" + id + "." + chunk.number + "." + chunk.labels.join(".") + "." + dnsTunnelParentDomain();
          return fetch(url, { mode: "no-cors" })
            .catch(function () {})
            .finally(function () {
              attempted += 1;
              setOutput(
                out,
                "Sending DNS request " + attempted + "/" + chunks.length + "..."
              );
              if (attempted === 1 || attempted === chunks.length || attempted % 10 === 0) {
                terminalLine(form, "sending DNS request " + attempted + "/" + chunks.length + " ...");
              }
            });
        });
      })
      .then(function () {
        return checkDnsResult(id, form, 8);
      })
      .then(function (result) {
        if (result.success && result.fileUrl) {
          terminalFail(form, "collector rebuilt the file from DNS queries.");
          revealServerFile(form, result.fileUrl);
          setPersistentOutput(
            out,
            "Test failed: the full file was reconstructed from DNS queries.",
            "is-fail",
            pagePath
          );
        } else if (result.partial) {
          terminalPass(form, "collector did not fully rebuild the file from DNS queries.");
          setPersistentOutput(out, "Test passed.", "is-pass", pagePath);
        } else {
          terminalPass(form, "collector did not rebuild the file from DNS queries.");
          setPersistentOutput(out, "Test passed.", "is-pass", pagePath);
        }
      })
      .catch(function () {
        terminalLine(form, "DNS tunnel test could not complete.");
        setOutput(out, "Test could not complete. Please retry.");
      })
      .finally(function () {
        submit.disabled = false;
        if (reset) reset.hidden = false;
      });
  }

  /* ---- HTTP path tunneling --------------------------------------------- */

  function buildPathChunks(file, bytes) {
    var encoded = bytesToBase64(bytes)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    var chunks = [];
    for (var offset = 0, num = 1; offset < encoded.length; offset += 1500, num += 1) {
      chunks.push({ number: num, payload: encoded.slice(offset, offset + 1500) });
    }
    var meta = bytesToBase64(
      new TextEncoder().encode(
        JSON.stringify({
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
          totalDataChunks: chunks.length,
          encodedLength: encoded.length,
        })
      )
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return [{ number: 0, payload: meta }].concat(chunks);
  }

  function runPathTunnel(form) {
    bindRunPage(form);
    var pagePath = location.pathname;
    var out = cardOutput(form, "[data-path-tunnel-status]");
    var input = form.querySelector("[data-path-tunnel-file]");
    var submit = form.querySelector("[data-path-tunnel-submit]");
    var reset = form.querySelector("[data-path-tunnel-reset]");
    var file = selectedFile(input);
    if (!file) {
      return setOutput(out, "Choose a file before running the test.");
    }
    if (file.size === 0) {
      startConsole(form, "swg-audit path-tunnel --file=" + file.name);
      terminalLine(form, "selected file: " + file.name);
      terminalLine(form, "empty file was not sent.");
      return setOutput(out, "Choose a non-empty file before running the test.");
    }
    if (file.size > 200 * 1024) {
      startConsole(form, "swg-audit path-tunnel --file=" + file.name);
      terminalLine(form, "selected file: " + file.name);
      terminalLine(form, "file exceeds 200 KB limit.");
      return setOutput(out, "Choose a file smaller than 200 KB.");
    }
    var id = testId().slice(0, 16);
    submit.disabled = true;
    input.disabled = true;
    if (reset) reset.hidden = true;
    clearRunResult(form, out);
    startConsole(form, "swg-audit path-tunnel --file=" + file.name);
    terminalLine(form, "selected file: " + file.name);
    terminalLine(form, "preparing file (http path tunneling) ...");
    setOutput(out, "Preparing file (http path tunneling)...");
    fileBytes(file)
      .then(function (bytes) {
        var chunks = buildPathChunks(file, bytes);
        var delivered = 0;
        var chain = Promise.resolve();
        chunks.forEach(function (chunk) {
          chain = chain.then(function () {
            var url =
              "/data-theft/path-tunnel.php/" +
              encodeURIComponent(id) +
              "/" +
              chunk.number +
              "/" +
              encodeURIComponent(chunk.payload);
            terminalLine(form, "sending path chunk " + chunk.number + "/" + (chunks.length - 1) + " ...");
            return fetch(url, {
              method: "GET",
              cache: "no-store",
              headers: { Accept: "application/json" },
            })
              .then(function (response) {
                if (response.ok) delivered += 1;
              })
              .catch(function () {});
          });
        });
        return chain.then(function () {
          return { total: chunks.length, delivered: delivered };
        });
      })
      .then(function (delivery) {
        var last = null;
        var chain = Promise.resolve();
        for (var i = 1; i <= 5; i += 1) {
          (function (attempt) {
            chain = chain
              .then(function () {
                setOutput(out, "Checking collector reconstruction (" + attempt + "/5)...");
                terminalLine(form, "checking collector reconstruction (" + attempt + "/5) ...");
                return fetch(
                  "/data-theft/path-tunnel.php?status=1&id=" + encodeURIComponent(id),
                  { cache: "no-store", headers: { Accept: "application/json" } }
                )
                  .then(function (r) {
                    return r.json();
                  })
                  .then(function (result) {
                    last = result;
                    if (result.success && result.reconstructed) return result;
                    if (result.partial) return result;
                    if (attempt < 5) return wait(1000);
                    return null;
                  })
                  .catch(function () {
                    last = { success: false, reconstructed: false };
                  });
              })
              .then(function (result) {
                if (result && ((result.success && result.reconstructed) || result.partial)) {
                  throw { done: true, result: result };
                }
              });
          })(i);
        }
        return chain
          .then(function () {
            return { result: last, delivery: delivery };
          })
          .catch(function (marker) {
            if (marker.done) return { result: marker.result, delivery: delivery };
            throw marker;
          });
      })
      .then(function (payload) {
        var result = payload && payload.result;
        var partialExfil = result && result.partial;
        var fullReconstruction = result && result.success && result.reconstructed;
        if (fullReconstruction) {
          terminalFail(form, "collector rebuilt the file from URL path chunks.");
          revealServerFile(form, result.fileUrl);
          setPersistentOutput(
            out,
            "Test failed: the full file was reconstructed from URL path chunks.",
            "is-fail",
            pagePath
          );
        } else if (partialExfil) {
          terminalPass(form, "collector did not fully rebuild the file from URL path chunks.");
          setPersistentOutput(out, "Test passed.", "is-pass", pagePath);
        } else {
          terminalPass(form, "collector did not rebuild the file from URL path chunks.");
          setPersistentOutput(out, "Test passed.", "is-pass", pagePath);
        }
      })
      .catch(function () {
        terminalLine(form, "HTTP path tunnel test could not complete.");
        setOutput(out, "Test could not complete. Please retry.");
      })
      .finally(function () {
        submit.disabled = false;
        input.disabled = false;
        if (reset) reset.hidden = false;
      });
  }

  /* ---- events ---------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    readyConsoles();
    initFileControls();
    restorePersistentResults();
  });

  document.addEventListener("change", function (event) {
    var fileInput = event.target.closest('.swg-file-field input[type="file"]');
    if (!fileInput) return;
    var file = fileInput.files && fileInput.files[0];
    var key = fileInputKey(fileInput);
    if (file) selectedFileState[key] = file;
    else delete selectedFileState[key];
    updateFileLabel(fileInput, file || null);
  });

  document.addEventListener("click", function (event) {
    var ddToggle = event.target.closest("[data-dd-toggle]");
    if (ddToggle) {
      var dd = ddToggle.closest("[data-dd]");
      var wasOpen = dd.classList.contains("is-open");
      closeAllDropdowns();
      if (!wasOpen) {
        dd.classList.add("is-open");
        var menu = dd.querySelector("[data-dd-menu]");
        if (menu) menu.hidden = false;
      }
      return;
    }

    var ddOpt = event.target.closest("[data-dd-opt]");
    if (ddOpt) {
      var group = ddOpt.closest("[data-dd]");
      group.querySelectorAll("[data-dd-opt]").forEach(function (option) {
        option.classList.toggle("is-active", option === ddOpt);
      });
      var label = group.querySelector("[data-dd-label]");
      if (label) label.textContent = ddOpt.textContent.trim();
      var pickDesc =
        (group.parentElement && group.parentElement.querySelector("[data-pick-desc]")) ||
        (group.closest(".swg-form") && group.closest(".swg-form").querySelector("[data-pick-desc]"));
      if (pickDesc && ddOpt.getAttribute("data-desc")) {
        pickDesc.textContent = ddOpt.getAttribute("data-desc");
      }
      closeAllDropdowns();
      return;
    }

    if (!event.target.closest("[data-dd]")) closeAllDropdowns();

    var chip = event.target.closest("[data-chip]");
    if (chip) {
      var pickGroup = chip.closest("[data-pick]");
      if (pickGroup) {
        pickGroup.querySelectorAll("[data-chip]").forEach(function (c) {
          c.classList.toggle("is-active", c === chip);
        });
      }
      return;
    }

    var serverFile = event.target.closest("[data-open-server-file]");
    if (serverFile) {
      event.preventDefault();
      var serverUrl = serverFile.getAttribute("data-file-url");
      if (safeUploadUrl(serverUrl)) {
        terminalLine(serverFile, "opening " + serverUrl);
        openNewTab(serverUrl);
      }
      return;
    }

    var dnsReset = event.target.closest("[data-dns-tunnel-reset]");
    if (dnsReset) {
      var dnsForm = dnsReset.closest("[data-dns-tunnel-form]");
      var dnsOut = dnsForm && cardOutput(dnsForm, "[data-dns-tunnel-status]");
      if (dnsForm) dnsForm.reset();
      clearSelectedFile(dnsForm && dnsForm.querySelector('input[type="file"]'));
      if (dnsOut) {
        clearPersistentOutput(dnsOut);
        dnsOut.hidden = true;
        dnsOut.textContent = "";
        dnsOut.classList.remove("is-pass", "is-fail");
      }
      clearServerFileButton(serverFileButtonFor(dnsForm));
      dnsReset.hidden = true;
      return;
    }

    var pathReset = event.target.closest("[data-path-tunnel-reset]");
    if (pathReset) {
      var pathForm = pathReset.closest("[data-path-tunnel-form]");
      var pathOut = pathForm && cardOutput(pathForm, "[data-path-tunnel-status]");
      if (pathForm) pathForm.reset();
      clearSelectedFile(pathForm && pathForm.querySelector('input[type="file"]'));
      if (pathOut) {
        clearPersistentOutput(pathOut);
        pathOut.hidden = true;
        pathOut.textContent = "";
        pathOut.classList.remove("is-pass", "is-fail");
      }
      clearServerFileButton(serverFileButtonFor(pathForm));
      pathReset.hidden = true;
    }
  });

  document.addEventListener(
    "submit",
    function (event) {
      var normalFile = event.target.closest("[data-file-submission-form]");
      if (normalFile) {
        event.preventDefault();
        bindRunPage(normalFile);
        var uploadPagePath = location.pathname;
        var fileOut = cardOutput(normalFile);
        var fileInput = normalFile.querySelector('input[type="file"]');
        var normalSelectedFile = selectedFile(fileInput);
        if (!fileInput || !normalSelectedFile) {
          setOutput(fileOut, "Choose a file before running the test.");
          return;
        }
        clearRunResult(normalFile, fileOut);
        startConsole(normalFile, "swg-audit file-upload --file=" + normalSelectedFile.name);
        terminalLine(normalFile, "selected file: " + normalSelectedFile.name);
        terminalLine(normalFile, "preparing file (plain upload) ...");
        terminalLine(normalFile, "sending file to collector ...");
        setOutput(fileOut, "Sending file to collector...");
        var normalFormData = new FormData(normalFile);
        if (!fileInput.files || !fileInput.files[0]) {
          normalFormData.set(
            fileInput.name || "personal_data_file",
            normalSelectedFile,
            normalSelectedFile.name
          );
        }
        fetch(normalFile.action || "/data-theft/upload.php", {
          method: "post",
          body: normalFormData,
          headers: { Accept: "application/json, text/plain, */*" },
        })
          .then(function (response) {
            if (!response.ok) throw new Error("Upload returned HTTP " + response.status);
            return readJson(response);
          })
          .then(function (result) {
            terminalLine(normalFile, "checking collector receipt ...");
            terminalFail(normalFile, "collector received and stored the uploaded file.");
            revealServerFile(normalFile, result.fileUrl);
            setPersistentOutput(fileOut, "Test failed.", "is-fail", uploadPagePath);
          })
          .catch(function (err) {
            if (isBlockedHttpError(err)) {
              reportBlockedSubmission(
                normalFile,
                fileOut,
                uploadPagePath,
                "collector did not receive the uploaded file."
              );
              return;
            }
            reportIncompleteSubmission(normalFile, fileOut, "file upload could not complete.");
          });
        return;
      }

      var encoding = event.target.closest("[data-data-theft-encoding-form]");
      if (encoding) {
        event.preventDefault();
        runDataTheftForm(encoding, buildEncodingForm, "encoding");
        return;
      }

      var encryption = event.target.closest("[data-data-theft-encryption-form]");
      if (encryption) {
        event.preventDefault();
        runDataTheftForm(encryption, buildEncryptionForm, "encryption");
        return;
      }

      var chunking = event.target.closest("[data-data-theft-chunking-form]");
      if (chunking) {
        event.preventDefault();
        runDataTheftForm(chunking, buildChunkingForm, "chunking");
        return;
      }

      var dns = event.target.closest("[data-dns-tunnel-form]");
      if (dns) {
        event.preventDefault();
        runDnsTunnel(dns);
        return;
      }

      var pathForm = event.target.closest("[data-path-tunnel-form]");
      if (pathForm) {
        event.preventDefault();
        runPathTunnel(pathForm);
      }
    },
    true
  );
})();
