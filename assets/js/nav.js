// ハンバーガーメニューの開閉を担う最小限のJS（CLAUDE.md 設計思想の例外規定）
(function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  function closeMenu({ returnFocus = false } = {}) {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) navToggle.focus();
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-item, .nav-lang').forEach((item) => {
    item.addEventListener('click', () => {
      closeMenu();
    });
  });

  // キーボード利用者は Escape で閉じ、操作の起点へ戻れるようにする。
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeMenu({ returnFocus: true });
    }
  });

  // メニュー外を選択した場合は開いた状態を残さない。
  document.addEventListener('click', (event) => {
    if (
      navLinks.classList.contains('is-open') &&
      !navLinks.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // SPで開いた状態のままPC幅へ切り替わった場合も、ARIAの状態を整える。
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
})();
