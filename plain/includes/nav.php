<?php
require_once __DIR__ . '/helpers.php';
?>
<header class="swg-nav" role="banner">
  <button
    class="swg-mobile-menu"
    type="button"
    data-mobile-sb-toggle
    aria-expanded="false"
    aria-controls="swg-mobile-tests"
    aria-label="Open tests menu"
  >
    <span class="swg-mobile-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="swg-mobile-menu-text">Tests</span>
  </button>

  <a class="swg-brand" href="<?php echo swg_h(swg_asset('')); ?>">
    <img class="swg-brand-mark" src="<?php echo swg_h(swg_asset('images/logo.png')); ?>" alt="" width="42" height="42" />
    <span>SWG Audit</span>
  </a>

  <div class="swg-nav-actions">
    <a class="swg-nl swg-about-link" href="/about">About us</a>
    <a class="swg-nl swg-contribute-link" href="/contribute">Contribute</a>
    <a
      class="swg-gh"
      href="https://github.com/Nimit-17/swgaudit-context"
      target="_blank"
      rel="noreferrer"
    >
      <img src="<?php echo swg_h(swg_asset('images/github-mark.svg')); ?>" alt="" width="23" height="23" />
      <span class="swg-sr-only">GitHub</span>
    </a>
  </div>
</header>
