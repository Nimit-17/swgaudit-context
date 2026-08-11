<?php
require_once __DIR__ . '/helpers.php';

$activeCategory = isset($activeCategory) ? $activeCategory : '';
$activeTest = isset($activeTest) ? $activeTest : '';
$groups = swg_nav_groups();
?>
<aside class="swg-sb" id="swg-mobile-tests" data-swg-sidebar role="navigation" aria-label="Tests">
<?php foreach ($groups as $index => $group): ?>
<?php
  $isOpen = ($group['id'] === $activeCategory);
  $groupId = 'sbg-' . $group['id'];
?>
<?php if ($index > 0): ?>
  <div class="swg-sb-sep"></div>
<?php endif; ?>
  <div class="swg-sb-cat <?php echo $isOpen ? 'is-open' : 'is-collapsed'; ?>">
    <a
      class="swg-sb-cat-link"
<?php if ($isOpen && $activeTest === ''): ?>
      aria-current="page"
<?php endif; ?>
      href="<?php echo swg_h(swg_asset($group['href'])); ?>"
    ><?php echo swg_h($group['label']); ?></a>
    <button
      class="swg-sb-toggle"
      type="button"
      data-sb-toggle="<?php echo swg_h($groupId); ?>"
      aria-label="<?php echo swg_h(($isOpen ? 'Collapse ' : 'Expand ') . $group['label'] . ' tests'); ?>"
      aria-expanded="<?php echo $isOpen ? 'true' : 'false'; ?>"
    >
      <span class="swg-caret" aria-hidden="true"></span>
    </button>
  </div>
  <div class="swg-sb-group<?php echo $isOpen ? '' : ' is-collapsed'; ?>" id="<?php echo swg_h($groupId); ?>">
<?php foreach ($group['tests'] as $test): ?>
<?php $isActive = ($activeTest === $test['href']); ?>
    <a
      class="swg-si<?php echo $isActive ? ' is-active' : ''; ?>"
<?php if ($isActive): ?>
      aria-current="page"
<?php endif; ?>
      href="<?php echo swg_h(swg_asset($test['href'])); ?>"
    ><?php echo swg_h($test['title']); ?></a>
<?php endforeach; ?>
  </div>
<?php endforeach; ?>
</aside>
