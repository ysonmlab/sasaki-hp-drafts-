// スクロールで .fade-up 要素をフェードインさせる最小限のJS（CLAUDE.md 設計思想の例外規定）
// CSSのみのスクロール駆動アニメーション(animation-timeline:view())はブラウザ対応が不十分なため、
// IntersectionObserverでの代替に留める。
(function () {
  // CSS の初期非表示は、JavaScript が実行できる環境に限る。
  // JS 無効・取得失敗時にも本文を読めるようにするため、先に状態クラスを付与する。
  document.documentElement.classList.add('js');

  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-inview'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el) => io.observe(el));
})();
