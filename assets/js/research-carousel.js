// Researchカルーセル：矢印クリックで該当カードへスクロールする
(function () {
  const list = document.getElementById('researchCarouselList');
  if (!list) return;
  const prev = document.querySelector('.sect-top-research__nav--prev');
  const next = document.querySelector('.sect-top-research__nav--next');
  const cards = Array.from(list.querySelectorAll('.sect-top-research__card'));

  let currentIndex = 0;
  // scrollIntoViewだとページ全体を縦方向にも動かしてしまうことがあるため、
  // list自身の横スクロールだけをgetBoundingClientRectの差分で計算して動かす
  function goTo(index) {
    currentIndex = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[currentIndex];
    const cardRect = card.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    const delta = (cardRect.left + cardRect.width / 2) - (listRect.left + listRect.width / 2);
    list.scrollBy({ left: delta, behavior: 'smooth' });
  }
  if (prev) prev.addEventListener('click', () => goTo(currentIndex - 1));
  if (next) next.addEventListener('click', () => goTo(currentIndex + 1));

  // 指でスワイプした場合もcurrentIndexを合わせておく（矢印クリックの起点がズレないように）
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        currentIndex = cards.indexOf(entry.target);
      });
    }, { root: list, threshold: 0.6 });
    cards.forEach((card) => observer.observe(card));
  }

  // fade-up.js は各カードをブラウザのビューポート基準で個別に監視しているが、
  // 2・3枚目はカルーセルの横スクロールで隠れているだけでも画面外（右側）扱いになり、
  // 矢印を押して初めて画面内に入った瞬間にfade-upの出現アニメーションが遅れて発火し、
  // 「カードが跳ねる」ように見えてしまう。1枚目（常に画面内にある）を代表として監視し、
  // セクションが画面に入った時点で3枚とも先にis-inviewを付けてしまうことでこれを防ぐ。
  if (cards[0] && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        cards.forEach((card) => card.classList.add('is-inview'));
        obs.disconnect();
      });
    }, { threshold: 0.1 });
    revealObserver.observe(cards[0]);
  }
})();
