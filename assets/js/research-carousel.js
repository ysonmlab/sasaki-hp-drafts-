// Researchカルーセル：矢印クリックでのスクロール、ドットクリックでのジャンプ、
// 現在表示中のカードに応じたドットのハイライト同期（fade-up.jsと同様のIntersectionObserverを使用）
(function () {
  const list = document.getElementById('researchCarouselList');
  if (!list) return;
  const prev = document.querySelector('.sect-top-research__nav--prev');
  const next = document.querySelector('.sect-top-research__nav--next');
  const dots = document.querySelectorAll('.sect-top-research__dot');
  const cards = list.querySelectorAll('.sect-top-research__card');

  function scrollByCard(direction) {
    const card = cards[0];
    if (!card) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  }
  if (prev) prev.addEventListener('click', () => scrollByCard(-1));
  if (next) next.addEventListener('click', () => scrollByCard(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  if (dots.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Array.from(cards).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
      });
    }, { root: list, threshold: 0.6 });
    cards.forEach((card) => observer.observe(card));
  }
})();
