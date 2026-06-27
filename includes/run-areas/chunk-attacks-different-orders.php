<div class="test-card-detail" id="malware-advanced-threat-simulation-test-3-detail">
            <div class="test-picker">
              <label for="chunk-attack-select">Choose chunk attack</label>
              <select id="chunk-attack-select" data-download-target="chunk-attack-download">
                <option value="/assets/test-files/malware/chunk-attacks/straight-split/manifest.json" data-description="Fetches EICAR fragments one by one in normal order, then joins them in the browser.">Straight Split</option>
                <option value="/assets/test-files/malware/chunk-attacks/reverse-order/manifest.json" data-description="Fetches EICAR fragments in normal order with each fragment's contents reversed, then reverses each fragment back before assembly.">Reverse Content Split</option>
                <option value="/assets/test-files/malware/chunk-attacks/randomized-size/manifest.json" data-description="Fetches unevenly sized EICAR fragments one by one, then rebuilds the original file from the manifest order.">Randomized Size Chunks</option>
                <option value="/assets/test-files/malware/chunk-attacks/mixed-noise/manifest.json" data-description="Fetches real EICAR fragments mixed with benign decoy chunks, then ignores the noise during browser reassembly.">Mixed Noise Chunks</option>
                <option value="/assets/test-files/malware/chunk-attacks/parallel-burst/manifest.json" data-description="Fires all EICAR chunk requests at once, then assembles the responses after the burst completes.">Parallel Burst Fetch</option>
              </select>
              <p class="test-output" aria-live="polite" data-chunk-attack-description>Fetches EICAR fragments one by one in normal order, then joins them in the browser.</p>
            </div>
            <div class="test-actions">
              <a class="primary-action" id="chunk-attack-download" href="#" download data-chunk-attack-download data-source-select="chunk-attack-select">Run Selected Chunk Test</a>
            </div>
          </div>
