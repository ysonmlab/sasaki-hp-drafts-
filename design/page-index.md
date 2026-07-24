# page-index.md

トップページ（index.html）レイアウト設計書
参照元：drafts/existing/index.html（既存HPソース・参照専用／2026-07-24 デモv4に差し替え）

---

## header（全ページ共通・common.css側）

┃ department : site-header
{ chest : }
  ⟦ zone : nav-brand ⟧
    < p : ブランド名（日本語） >
    < p : ブランド名（英語） >
  ⟦ zone : global-nav ⟧
    { shelf : }
      [ nav-item ] × 6（ホーム / 研究内容 / スタッフ / 企業の方へ / 教育・大学院 / 臨床・診療 / お問い合わせ）
    < span : nav-lang ("EN") >（言語切替の見た目のみ。実機能なし・デモ準拠）
    [ nav-toggle ]（SP：ハンバーガー開閉。JS最小限で実装）

(SP: nav-links は nav-toggle クリックで開閉。PC: 常時横並び表示)

---

## sect-top-hero

┃ section : hero
{ bleed : }
  < div : 背景画像 (assets/img/idx-hero_bg1.jpg) >
  ⟦ zone : hero-content ⟧
    < p : eyebrow ("Science Tokyo") >
    < h1 : title ("Laboratory Medicine") >
    < p : title-ja ("Advancing the Frontiers of Hematologic Cancer Research") >
    < p : description ("Decoding blood cancers. Developing tomorrow's therapies. Advancing the future of cancer care.") >

(SP: 縦積み・中央寄せ、フォントサイズ縮小 / PC: 同一構成、背景フルブリードで高さ確保)
(背景画像はスクロールに追従せず静止。パララックス・JSは使用しない)
(デモにCTAボタンは無いため実装しない)

images:
- assets/img/idx-hero_bg1.jpg → コーディング時 top-hero_bg1.jpg にリネーム（背景・alt不要）

---

## department : sect-accent-bar

┃ department : accent-bar
ゴールド(72px)＋ネイビー(残り幅)の3px装飾バー。hero直後・profileの前に挿入。

---

## sect-top-profile

┃ section : profile
{ fluid : }
  ⟦ zone : photo ⟧
    < img : assets/img/idx-profile_pht1.jpg (alt="佐々木 宏治") >
  ⟦ zone : text ⟧
    < p : label ("PROFESSOR") >
    < h2 : name ("佐々木 宏治 / Koji Sasaki, MD, PhD") >
    < p : affiliation ("東京科学大学 医学部 / 臨床検査医学分野 教授") >
    < p : quote (経歴・メッセージ本文・冒頭2段落は常時表示) >
    { SPのみ } < details : 続きを読む >（残り3段落。summary「全文を読む→／閉じる↑」で開閉）
    { PCのみ } < p : quote-rest >（続きの3段落を常時表示。SP用detailsの中身と文面を揃える）

(SP: 縦積み・写真→テキスト、中央寄せ・本文は2段落目までのみ表示し「全文を読む」で開閉 /
 PC: 横並び・写真固定幅＋テキスト可変幅 grid・本文は常に全文表示)
(SP/PC表示の切替は、SP用<details>とPC用<p>を別々にDOMへ用意しCSSで出し分ける方式。
 Chromeはclosedな<details>の中身をcontent-visibility:hiddenで隠すため、display上書きだけでは
 PCで常時表示にできなかったため、この構成にした。文面はSP/PC双方で揃えて保守すること)
(fade-up：profile-inner全体に付与。scroll-inでフェードイン)

images:
- assets/img/idx-profile_pht1.jpg → common_pht1.jpg（index.html/staff.htmlで共用のため「common」命名）（alt="佐々木 宏治"）

---

## department : sect-top-divider-1

┃ department : divider-1
{ bleed : }
  < div : 背景画像 (assets/img/idx-bgzone_bg1.jpg) >

(PC: background-attachment: fixed でパララックス表現（CSSのみ・JS不要） / SP: scroll に切り替え（fixed特有の描画不具合・パフォーマンス低下を回避）)

images:
- assets/img/idx-bgzone_bg1.jpg → top-divider_bg1.jpg（装飾帯・alt不要）

---

## sect-top-research

┃ section : research
⟦ zone : section-head ⟧
  < span : title-en ("Research") >
  < span : title-ja ("主な研究テーマ") >
{ tile : }
  [ card ] × 3
    ⟦ zone : head ⟧
      < span : number ("01" / "02" / "03") >
      < img : DNAアイコン（装飾・alt空） >
    < h3 : title >
    < p : body >

(SP: 1カラム縦積み / PC: 3カラム grid・列数固定)
(research セクションの背景色は navy（他セクションと反転）。見出し文字色も白系に反転。
 カードは白系(#FAFDFD)・ゴールド枠・角丸・上部にゴールドの帯。fade-up表示時に角丸が16px→30pxに変化)
(カード内 head は数字＋DNAアイコンを横並びで配置。アイコン幅はコンテナクエリ（cqw）で数字サイズに連動)
(タグ（HEMATOLOGY等の分類ラベル）は廃止。カードにタグ要素は無い)
(fade-up：section-head・card各要素に付与。カードは2枚目0.1s・3枚目0.2s遅延)

images:
- assets/img/dna1.png → top-research_pic1.png（card 1・装飾・alt空）
- assets/img/dna2.png → top-research_pic2.png（card 2・装飾・alt空）
- assets/img/dna3.png → top-research_pic3.png（card 3・装飾・alt空）

---

## department : sect-top-divider-2

┃ department : divider-2
{ bleed : }
  < div : 背景画像 (assets/img/idx-bgzone_bg2.jpg) >

(PC: background-attachment: fixed でパララックス表現（CSSのみ・JS不要） / SP: scroll に切り替え)

images:
- assets/img/idx-bgzone_bg2.jpg → top-divider_bg2.jpg（装飾帯・alt不要）

---

## sect-top-news

┃ section : news
⟦ zone : section-head ⟧
  < span : title-en ("News") >
  < span : title-ja ("お知らせ・新着情報") >
{ rack : }
  [ item ] × 4
    < span : date >
    < span : tag （論文 / お知らせ / 学会） >
    < span : title >

(SP: 項目内 flex-wrap で折り返し / PC: 日付・タグ・タイトルを横一列表示)
(news-list は角丸16px＋navy-light系の2px枠線で囲む（index限定の値。他ページには適用しない）。
 タグ色は「論文」のみ青系（--color-primary）、それ以外（お知らせ/学会等）はゴールド系（#c49a3a）)
(fade-up：section-head・item各要素に付与。2件目0.08s・3件目0.16s・4件目0.24s遅延)

images: なし

---

## department : sect-top-divider-3

┃ department : divider-3
{ bleed : }
  < div : 背景画像 (assets/img/idx-bgzone_bg3.jpg) >

(PC: background-attachment: fixed でパララックス表現（CSSのみ・JS不要） / SP: scroll に切り替え)

images:
- assets/img/idx-bgzone_bg3.jpg → top-divider_bg3.jpg（装飾帯・alt不要）

---

## footer（全ページ共通・common.css側）

┃ department : site-footer
{ chest : }
  < p : 組織名（日本語） >
  < p : 所在地・機関名 >
  < p : コピーライト（margin-topで区切るのみ。右寄せ等の別グループ化はしない） >

(SP: 縦積み中央寄せ / PC: 縦積み・左寄せ。3行とも同一カラムに縦積みで、デモに横並びの構成はない)

---

## 備考

- ハンバーガーメニューの開閉のみ最小限の Vanilla JS を使用（CLAUDE.md 設計思想の例外規定に準拠）。
- スクロールでのフェードイン表示（fade-up／assets/js/fade-up.js）をprofile-inner・section-head・research-card・news-itemに使用（デモv4での追加。research.html等で既に使っている共通の仕組みをそのまま再利用）。
- 「全文を読む」の開閉のみ `<details>/<summary>` を使用（JS不使用。CLAUDE.mdのアコーディオン例に準拠）。
- accent-bar-blue の色はデモv4のみ `--navy-light` になっていたが、research.html/staff.htmlのデモは従来通り `--navy` のままだったため、common.css側は変更せず（`--navy`のまま）。index固有の差分として追わない方針とした。
- セクション順序はデモに忠実に：hero → accent-bar → profile → divider-1 → research → divider-2 → news → divider-3 → footer
  （divider は直前のコンテンツセクションの「後」に置く区切り帯であり、コンテンツの「前」には置かない）。
- 装飾帯（divider-1〜3）はコンテンツを持たない補助ブロック（department）として scroll 区切りに使用。
- idx- 接頭辞の画像はコーディング段階で命名規則（`{section-name}_{image-type}{number}.{ext}`）に沿った名前にリネームする。
- 背景スクロール演出：divider帯は CSS `background-attachment: fixed`（PC）のみで実現し JS は使わない。hero背景は静止のまま固定・パララックスなし
  （参照元デモに `#heroBg` を translateY させるJSがあったが、対象要素が `display:none` で常に非表示のため実際には無効なコードだった。本設計では踏襲しない）。
- header / footer はデモ同様、中央寄せコンテナ（.container）を使わず画面幅いっぱいに余白のみで構成する（他ページのコンテンツ幅とは独立）。
