<?php
$footerVariant = isset($footerVariant) ? $footerVariant : 'safety';
?>
<footer class="swg-foot">
<?php if ($footerVariant === 'legal'): ?>
  All tests are non-malicious and safe for production environments. By continuing, you agree to our
  <a class="swg-foot-link" href="/terms">Terms of Use</a>
  and
  <a class="swg-foot-link" href="/privacy">Privacy Policy</a>.
<?php else: ?>
  Use SWG Audit only in authorized environments with dummy data. By continuing, you agree to our
  <a class="swg-foot-link" href="/terms">Terms of Use</a>
  and
  <a class="swg-foot-link" href="/privacy">Privacy Policy</a>.
<?php endif; ?>
</footer>
