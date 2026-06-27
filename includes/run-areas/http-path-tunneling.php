<div class="test-card-detail" id="data-theft-advanced-threat-simulation-test-3-detail">
            <form class="credential-test-form" novalidate data-path-tunnel-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-path-tunnel-file">Choose file for HTTP path tunneling</label>
                <input id="data-theft-path-tunnel-file" name="path_tunnel_file" type="file" required data-path-tunnel-file>
              </div>
              <p class="test-note">Maximum file size: 200 KB. Reconstructed files are deleted from the server after 10 minutes.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit" data-path-tunnel-submit>Upload Sample</button>
                <button class="primary-action" type="button" data-path-tunnel-reset>Reset Test</button>
              </div>
            </form>
            <p class="test-output" aria-live="polite" data-path-tunnel-status hidden></p>
          </div>
