<div class="test-card-detail" id="data-theft-evasion-detection-test-2-detail">
            <form class="credential-test-form" data-data-theft-encryption-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-encryption-file">Choose file to encrypt</label>
                <input id="data-theft-encryption-file" name="source_file" type="file" required>
              </div>
            <div class="test-picker">
              <label for="data-theft-encryption-mode">Choose encryption</label>
              <select id="data-theft-encryption-mode" name="encryption_mode">
                <option value="aes-gcm">AES-256 GCM</option>
                <option value="aes-gcm-password">AES-256 GCM with password</option>
              </select>
            </div>
              <p class="test-note">The browser encrypts your selected file, uploads ciphertext and metadata, and the server decrypts it back to the original file.</p>
            <div class="test-actions">
                <button class="primary-action" type="submit">Upload Sample</button>
            </div>
            </form>
            <p class="test-output">Password for password mode: <code>123456</code></p>
            <p class="test-output" aria-live="polite" data-test-output hidden></p>
          </div>
