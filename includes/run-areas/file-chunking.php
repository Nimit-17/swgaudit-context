<div class="test-card-detail" id="data-theft-evasion-detection-test-3-detail">
            <form class="credential-test-form" data-data-theft-chunking-form>
              <div class="form-row">
                <label class="sr-only" for="data-theft-chunking-file">Choose file to chunk</label>
                <input id="data-theft-chunking-file" name="source_file" type="file" required>
              </div>
            <div class="test-picker">
              <label for="data-theft-chunking-mode">Choose chunking</label>
              <select id="data-theft-chunking-mode" name="chunking_mode">
                <option value="straight-split" data-description="Splits your file into equal pieces and uploads them in normal order.">Straight Split</option>
                <option value="reverse-order" data-description="Splits your file into equal pieces and uploads them in reverse request order.">Reverse Order Split</option>
                <option value="randomized-size" data-description="Splits your file into uneven chunk sizes before upload.">Randomized Size Chunks</option>
                <option value="mixed-noise" data-description="Uploads your file chunks mixed with benign decoy chunks that the server ignores during reassembly.">Mixed Noise Chunks</option>
                <option value="parallel-burst" data-description="Prepares all chunks together and uploads them as a burst in one multipart request.">Parallel Burst Upload</option>
              </select>
              <p class="test-output" aria-live="polite" data-data-theft-chunk-description>Fetches sensitive-data fragments one by one in normal order, then joins them in the browser before upload.</p>
            </div>
              <p class="test-note">The browser chunks your selected file, uploads the chunks, and the server reassembles them back to the original file.</p>
            <div class="test-actions">
                <button class="primary-action" type="submit">Upload Sample</button>
            </div>
            </form>
            <p class="test-output" aria-live="polite" data-test-output hidden></p>
          </div>
