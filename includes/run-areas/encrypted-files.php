<div class="test-card-detail" id="malware-advanced-threat-simulation-test-2-detail">
            <div class="test-picker">
              <label for="encrypted-file-select">Choose encrypted file</label>
              <select id="encrypted-file-select" data-download-target="encrypted-file-download">
                <option value="/assets/test-files/malware/client-side/payloads/decrypt-eicar-txt.json">AES-256 EICAR TXT</option>
                <option value="/assets/test-files/malware/client-side/payloads/decrypt-eicar-docm.json">AES-256 EICAR DOCM</option>
                <option value="/assets/test-files/malware/encrypted-files/eicar-docm-aes256.zip">AES ZIP > EICAR DOCM</option>
                <option value="/assets/test-files/malware/encrypted-files/eicar-docm-encrypted.7z">Encrypted 7Z > EICAR DOCM</option>
              </select>
            </div>
            <div class="test-actions">
              <a class="primary-action" id="encrypted-file-download" href="#" download data-assembled-download data-source-select="encrypted-file-select">Download Sample</a>
            </div>
            <p class="test-output">Password: <code>123456</code></p>
          </div>
