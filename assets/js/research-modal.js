// 研究プロジェクトの「Read More」モーダルを担う最小限のJS（CLAUDE.md 設計思想の例外規定）
// 本文はHTMLに1箇所（.sect-research-projects__text）だけ記述し、初期化時にJSが複製して
// 空の<dialog>へ差し込む（非エンジニアが編集する箇所を1つに保つため）。
// Escapeキーで閉じる・フォーカスをモーダル内に留める、はいずれも<dialog>のブラウザ標準機能。
(function () {
  const items = document.querySelectorAll('.sect-research-projects__item');
  if (!items.length) return;

  items.forEach((item, index) => {
    const dialog = item.querySelector('.sect-research-projects__dialog');
    const trigger = item.querySelector('.sect-research-projects__more');
    const sourcePhoto = item.querySelector('.sect-research-projects__photo');
    const sourceTitle = item.querySelector('.sect-research-projects__title');
    const sourceText = item.querySelector('.sect-research-projects__text');
    const photoSlot = dialog && dialog.querySelector('[data-modal-photo]');
    const titleSlot = dialog && dialog.querySelector('[data-modal-title]');
    const bodySlot = dialog && dialog.querySelector('[data-modal-body]');
    const closeBtn = dialog && dialog.querySelector('[data-modal-close]');
    if (!dialog || !trigger || !sourceText || !titleSlot || !bodySlot) return;

    // 初期化時に1回だけ複製する（開くたびにクローンし直さない）。写真も一緒に複製し、
    // モーダル内で「画像＋全文」がまとまって読めるようにする。
    if (sourcePhoto && photoSlot) {
      photoSlot.appendChild(sourcePhoto.cloneNode(true));
    }
    if (sourceTitle) {
      const titleClone = sourceTitle.cloneNode(true);
      const titleId = 'detail-modal-title-' + (index + 1);
      titleClone.id = titleId;
      titleSlot.appendChild(titleClone);
      dialog.setAttribute('aria-labelledby', titleId);
    }
    bodySlot.appendChild(sourceText.cloneNode(true));

    trigger.addEventListener('click', () => {
      // 既にopen属性が付いた状態でshowModal()を呼ぶとInvalidStateErrorになるため確認する
      if (dialog.open) return;
      dialog.showModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => dialog.close());
    }

    // 背景（::backdrop）クリックで閉じる。内部コンテンツのクリックではevent.targetが
    // その子要素になるため、dialog自身がtargetの時（=backdrop相当）のみ閉じる。
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    // 閉じたあとはトリガーへフォーカスを戻す（標準動作の保険）。
    dialog.addEventListener('close', () => trigger.focus());
  });
})();
