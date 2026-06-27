<div class="test-card-detail" id="phishing-advanced-threat-simulation-test-5-detail">
            <form class="credential-test-form" method="post" action="/phishing/" data-credential-form>
              <input type="hidden" name="swg_audit_test" value="credential-form-submission">
              <div class="form-row">
                <label for="phishing-credential-username">Username or email</label>
                <input id="phishing-credential-username" name="username" type="text" autocomplete="username" value="test.user@example.com" required>
              </div>
              <div class="form-row">
                <label for="phishing-credential-password">Password</label>
                <input id="phishing-credential-password" name="password" type="password" autocomplete="current-password" value="SWGAudit-Test-Password" required>
              </div>
              <p class="test-note">Submitted data is immediately discarded and is not stored.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit">Submit Test Form</button>
              </div>
            </form>
            <p class="test-output" aria-live="polite" data-test-output hidden></p>
          </div>
