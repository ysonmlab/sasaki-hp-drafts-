// ポインタ追従カーソル演出（ホバーでドットがリング状に拡大）を担う最小限のJS（CLAUDE.md 設計思想の例外規定）
// タッチデバイス・prefers-reduced-motion では無効化する。
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  document.body.appendChild(dot);

  const pos = { mouseX: 0, mouseY: 0, dotX: 0, dotY: 0 };

  document.addEventListener('mousemove', function (e) {
    pos.mouseX = e.clientX;
    pos.mouseY = e.clientY;
    document.documentElement.classList.add('is-active');
  });

  document.documentElement.addEventListener('mouseleave', function () {
    document.documentElement.classList.remove('is-active');
  });
  document.documentElement.addEventListener('mouseenter', function () {
    document.documentElement.classList.add('is-active');
  });

  document.querySelectorAll('a, button').forEach(function (target) {
    target.addEventListener('mouseenter', function () {
      document.documentElement.classList.add('is-hover');
    });
    target.addEventListener('mouseleave', function () {
      document.documentElement.classList.remove('is-hover');
    });
  });

  function tick() {
    pos.dotX += (pos.mouseX - pos.dotX) * 0.35;
    pos.dotY += (pos.mouseY - pos.dotY) * 0.35;

    dot.style.transform = 'translate(' + pos.dotX + 'px, ' + pos.dotY + 'px)';

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
