// トップページ divider-1〜3 の背景を視差移動させる最小限のJS（CLAUDE.md 設計思想の例外規定）
// background-attachment:fixed はiOS等のモバイルで不安定なため不採用とし、IntersectionObserver+rAFで
// .js-parallax要素のtransformを更新する方式に一本化する（SP/PC共通の挙動）。
// prefers-reduced-motion時は何もしない（index.css側でもtransform:noneを強制済み）。
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = Array.from(document.querySelectorAll('.js-parallax'));
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const SPEED = 0.2;
  const active = new Set();
  let ticking = false;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function update() {
    ticking = false;
    const viewportCenter = window.innerHeight / 2;
    active.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const maxOffset = rect.height * 0.18;
      const offset = clamp((viewportCenter - elementCenter) * SPEED, -maxOffset, maxOffset);
      el.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
    });
  }

  function requestUpdate() {
    if (!active.size || ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.add(entry.target);
        } else {
          active.delete(entry.target);
        }
      });
      requestUpdate();
    },
    { rootMargin: '20% 0px' }
  );

  targets.forEach((el) => io.observe(el));

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();
