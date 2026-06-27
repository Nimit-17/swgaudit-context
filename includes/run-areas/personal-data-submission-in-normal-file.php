<div class="test-card-detail" id="data-theft-bare-minimum-test-1-detail">
            <form class="credential-test-form" method="post" action="/data-theft/" enctype="multipart/form-data" data-file-submission-form>
              <input type="hidden" name="swg_audit_test" value="normal-file-submission">
              <div class="form-row">
                <label class="sr-only" for="data-theft-normal-file">Choose file</label>
                <input id="data-theft-normal-file" name="personal_data_file" type="file" required>
              </div>
              <p class="test-note">Submitted files are deleted from the server after 10 minutes.</p>
              <div class="test-actions">
                <button class="primary-action" type="submit">Upload Sample</button>
              </div>
            </form>
            <p class="test-output" aria-live="polite" data-test-output hidden></p>
          </div>
