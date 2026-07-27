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
})();
