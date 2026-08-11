<?php
require_once __DIR__ . '/helpers.php';

if (!isset($pageScripts)) {
    $pageScripts = [];
}
?>
        <?php require __DIR__ . '/footer.php'; ?>
      </main>
    </div>

    <button
      class="swg-mobile-sb-backdrop"
      type="button"
      data-mobile-sb-close
      aria-label="Close tests menu"
    ></button>
  </div>

  <script src="<?php echo swg_h(swg_asset('js/nav.js')); ?>" defer></script>
<?php foreach ($pageScripts as $script): ?>
  <script src="<?php echo swg_h(swg_asset($script)); ?>" defer></script>
<?php endforeach; ?>
</body>
</html>
