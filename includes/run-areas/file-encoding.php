<div class="test-card-detail" id="data-theft-evasion-detection-test-1-detail">
            <form class="credential-test-form" data-data-theft-encoding-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-encoding-file">Choose file to encode</label>
                <input id="data-theft-encoding-file" name="source_file" type="file" required>
              </div>
            <div class="test-picker">
              <label for="data-theft-encoding-mode">Choose encoding</label>
              <select id="data-theft-encoding-mode" name="encoding_mode">
                <option value="base64">Base64</option>
                <option value="double-base64">Double Base64</option>
                <option value="hex">Hex</option>
                <option value="url">URL Encoded</option>
              </select>
            </div>
              <p class="test-note">The browser encodes your selected file, uploads the encoded form, and the server decodes it back to the original file.</p>
            <div class="test-actions">
                <button class="primary-action" type="submit">Upload Sample</button>
            </div>
            </form>
            <p class="test-output" aria-live="polite" data-test-output hidden></p>
          </div>
