<div class="test-card-detail" id="data-theft-advanced-threat-simulation-test-2-detail">
            <form class="credential-test-form" data-dns-tunnel-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-dns-file">Choose file for DNS tunnelling</label>
                <input id="data-theft-dns-file" name="dns_tunnel_file" type="file" accept=".pdf,.jpg,.jpeg,.png,.gif,.txt,.doc,.docx" required data-dns-tunnel-file>
              </div>
              <p class="test-note">Maximum file size: 100 KB. Reconstructed files are deleted from the server after 10 minutes.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit" data-dns-tunnel-submit>Upload Sample</button>
                <button class="primary-action" type="button" data-dns-tunnel-reset>Reset Test</button>
              </div>
            </form>
            <p class="test-output" aria-live="polite" data-dns-tunnel-status hidden></p>
          </div>
