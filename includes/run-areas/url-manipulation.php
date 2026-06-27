<div class="test-card-detail" id="phishing-evasion-detection-test-1-detail">
            <div class="test-picker">
              <label for="phishing-url-manipulation-case">URL manipulation case</label>
              <select id="phishing-url-manipulation-case" data-url-manipulation-select>
                <option value="/phishing/rnicrosoft-Iogin/" data-description="Lookalike path using rn for m and uppercase i in place of lowercase L. Opens the controlled Microsoft-style page directly.">Lookalike path - rnicrosoft-Iogin</option>
                <option value="/phishing/micrоsoft-Iogin/" data-description="Homograph path using a Cyrillic o in micrоsoft. Opens the same controlled Microsoft-style page directly.">Homograph path - micrоsoft-Iogin</option>
                <option value="/phishing/redirect/?url=/phishing/rnicrosoft-Iogin/" data-description="Redirect parameter test. The first URL contains a url parameter, then the server redirects to the controlled Microsoft-style page.">Redirect parameter - url=</option>
                <option value="/go/ms-login/" data-description="Shortener-style test. A short same-site URL redirects to the controlled Microsoft-style page.">Short URL - /go/ms-login</option>
              </select>
            </div>
            <p class="test-note" data-url-manipulation-description>Lookalike path using rn for m and uppercase I for l. Opens the controlled Microsoft-style page directly.</p>
            <div class="test-actions">
              <a class="primary-action" href="/phishing/rnicrosoft-Iogin/" target="_blank" rel="noopener" data-url-manipulation-run>Open Test Page</a>
            </div>
            <p class="test-output" aria-live="polite" data-test-output hidden></p>
          </div>
