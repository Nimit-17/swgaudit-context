<?php
$base = '../../';
$pageTitle = 'Video content category simulation';
$pageDescription = 'Streaming category policy';
$appClass = 'swg-app--test';
$activeCategory = 'cyberslacking';
$activeTest = 'cyberslacking/video-content-category-simulation';
$pageScripts = [
  'js/cyberslacking-tests.js',
];
require __DIR__ . '/../../includes/layout-start.php';
?>
<div class="swg-content">
  <nav class="swg-bc" aria-label="Breadcrumb">
    <a class="swg-bc-home" href="<?php echo swg_h(swg_asset('')); ?>">Home</a>
    <span class="swg-bc-sep">/</span>
    <a class="swg-bc-category" href="<?php echo swg_h(swg_asset('cyberslacking/')); ?>">Facility Abuse</a>
    <span class="swg-bc-sep">/</span>
    <span class="swg-bc-cur swg-bc-current">Video content category simulation</span>
  </nav>

  <h1>Video content category simulation</h1>
  <div class="swg-divider"></div>

  <div class="swg-info">
    <section class="swg-block">
      <div class="swg-block-label">Video type vs website name</div>
      <p class="swg-block-text">One streaming host can serve many video categories. Allowing the website does not prove every category is allowed.</p>
    </section>
    <section class="swg-block">
      <div class="swg-block-label">Load different video categories</div>
      <p class="swg-block-text">Pick a category. The player loads a matching sample so policy must follow the media type, not only the host name.</p>
    </section>
  </div>

  <div class="swg-run swg-run--no-terminal swg-run--media">
    <div class="swg-run-label">Try it yourself</div>
    <div class="swg-run-body swg-run-body--solo">
      <div class="swg-run-controls">
        <div class="swg-dd" data-dd data-dd-frame="video-frame">
          <button class="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>Entertainment</span><span class="swg-caret" aria-hidden="true"></span></button>
          <div class="swg-dd-menu" data-dd-menu hidden>
            <button class="swg-dd-opt is-active" type="button" data-dd-opt data-video="https://www.youtube.com/embed/YjlgahImVwI">Entertainment</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/zQGOcOUBi6s">Education</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/cqGjhVJWtEg">Film &amp; Animation</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/ootFmPxtBIo">Autos &amp; Vehicles</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/kJQP7kiw5Fk">Music</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/B3u4EFTwprM">Pets &amp; Animals</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/K3o2QaaXN0o">Sports</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/WT5JvAq50OE">Travel &amp; Events</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/QdBZY2fkU-0">Gaming</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/H-1HEyPr4Ew">People &amp; Blogs</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/SQD7AO3_nmU">News &amp; Politics</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/Mg7aJdnbY48">Howto &amp; Style</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/9hWQpY-656M">Science &amp; Technology</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/uYPbbksJxIg">Movies</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/TcMBFSGVi1c">Action/Adventure</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/D30r0CwtIKc">Drama</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/LEjhY15eCx0">Family</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/isOGD_7hNIY">Foreign</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/k10ETZ41q5o">Horror</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/WR7cc5t7tv8">Thriller</button>
            <button class="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/LembwKDo1Dk">Trailers</button>
          </div>
        </div>
        <div class="swg-video">
          <iframe
            id="video-frame"
            src="https://www.youtube.com/embed/YjlgahImVwI"
            title="SWG Audit Facility Abuse video test"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div class="swg-pf">
          <div class="swg-pf-card swg-pf-pass">
            <span class="swg-pf-glyph" aria-hidden="true">&#10003;</span>
            <div>
              <div class="swg-pf-label">Test pass condition</div>
              <p class="swg-pf-text">The category is blocked, or the video does not play.</p>
            </div>
          </div>
          <div class="swg-pf-card swg-pf-fail">
            <span class="swg-pf-glyph" aria-hidden="true">&#10007;</span>
            <div>
              <div class="swg-pf-label">Test fail condition</div>
              <p class="swg-pf-text">The video loads and plays.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php require __DIR__ . '/../../includes/layout-end.php'; ?>
