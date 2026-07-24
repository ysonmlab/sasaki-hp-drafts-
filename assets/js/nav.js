// ハンバーガーメニューの開閉のみを担う最小限のJS（CLAUDE.md 設計思想の例外規定）
(function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// page-hero（内側ページ共通）を固定ヘッダーの高さ分だけ押し下げる（デモ準拠・CSSで代替不可のため）
// .page-heroが無いページ（index.html等）では何もしない
(function () {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.page-hero');
  if (!header || !hero) return;

  function setHeroOffset() {
    hero.style.marginTop = header.offsetHeight + 'px';
  }
  setHeroOffset();
  window.addEventListener('resize', setHeroOffset);
})();
