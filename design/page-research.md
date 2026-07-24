# page-research.md

研究内容ページ（research.html）レイアウト設計書
参照元：drafts/existing/research.html（既存HPソース・参照専用）

---

## header（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。
本ページでは nav-item「研究内容」に `is-current` を付与する。

---

## page-hero（複数ページ共通・common.css側に新規追加）

┃ department : page-hero
{ bleed + board : }
  < img : 背景画像（object-fit:cover・中央固定） >
  ⟦ zone : page-hero-inner ⟧
    < p : eyebrow ("Research") >
    < h1 : title ("Our Research") >
    < p : title-ja ("研究内容") >

(SP: height 300px程度・フォント縮小 / PC: height 460px)
(オーバーレイ：staff/corporate/education/clinical/contact は linear-gradient オーバーレイあり。
 research.html のみオーバーレイ無し（背景写真の地の暗さで十分なため）→ ページ固有CSSで `background:none` に上書き)

images:
- assets/img/hero_research.jpg → research-hero_bg1.jpg（背景・alt不要）

---

## accent-bar（全ページ共通・common.css側に新規追加）

┃ department : accent-bar
ゴールド(72px)＋ネイビー(残り幅)の3px装飾バー。page-hero直後に配置。

備考：現状 index.css にページ固有として実装されてしまっているため、
コーディング時に common.css 側へ移設する（index.html 側のクラス名・見た目は変えない）。

---

## sect-research-lead

┃ section : lead
{ rack : }
  < p : リード文（血液悪性腫瘍の克服に向け、基礎・臨床・検査医学の融合によって
        新たな診断・治療法の開発に取り組んでいます） >

(SP/PC共通の1カラム。下部を border-bottom で次セクションと区切る)

images: なし

---

## sect-research-projects

┃ section : projects
⟦ zone : section-head ⟧
  < span : title-en ("Research Projects") >
  < span : title-ja ("研究プロジェクト") >
{ fluid : } × 3（研究テーマごとに1ブロック）
  ⟦ zone : left ⟧（タイトル＋写真を縦積み）
    < h3 : title-ja >
    < p : title-en >
    < img : プロジェクト写真 (aspect-ratio 4/3) >
  ⟦ zone : right ⟧（説明文＋タグ＋リンクを下端に寄せる）
    < p : description-ja >
    < p : description-en >
    { shelf : }
      [ tag ] × 5〜6
    < a : View More → >（詳細ページ未作成のため `#` の仮リンク）

(SP: 1カラム縦積み・left→right（タイトル→写真→説明文の順） / PC: 2カラム grid・写真固定比率4:3)
(3件目以降は区切り線（border-bottom相当）で分ける。最後の項目には区切り線なし)
(right zoneはflex-direction:columnかつjustify-content:space-betweenで、View Moreリンクを常に下端に揃える)

images:
- assets/img/Molecular Mechanisms of Leukemia and Lymphoma.png
  → research-projects_pht1.png（alt="白血病・リンパ腫の発症メカニズム解明"）
- assets/img/Development of Novel In Vitro Drug Sensitivity Assays.png
  → research-projects_pht2.png（alt="新規in vitro薬剤感受性試験の開発"）
- assets/img/Infectious Disease and Pathogen Typing Technologies.png
  → research-projects_pht3.png（alt="感染症とタイピング技術"）

---

## cta-block（複数ページ共通・common.css側に新規追加。文言はページごとにHTML側で指定）

┃ department : cta
{ rack : }（中央寄せ）
  < p : label ("SUPPORT US") >
  < h2 : title ("研究活動へのご支援のお願い") >
  < p : body ("当分野の研究・教育活動は、皆様からのご寄付に支えられています。
        血液悪性腫瘍の克服に向けた研究の発展のため、ご支援をお願いいたします。") >
  [ btn ] < a : 寄付に関するお問い合わせ → contact.html >

備考：corporate.html / education.html でも同じ構造・別文言で使用される想定（common.css化）。

---

## footer（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。

---

## 備考

- **content-wrap（コンテンツ幅）**：research を含む内側ページ6枚（research/staff/corporate/
  education/clinical/contact）は共通で max-width:1100px（PC: padding-inline 48px／SP: 24px）。
  common.css に新規クラス `.content-wrap` として追加する。
  index.html のみ 860px の例外（既存の `.container` 上書き実装のまま・不変性ルールにより変更しない）。
- page-hero / accent-bar / cta-block は common.css 側の共通パーツとして新規実装する。
  既存 index.css の accent-bar 実装は、コーディング時に common.css へ移設する。
- View More リンクは詳細ページが未作成のため `#` の仮リンク。
  `id="detail-01"`〜`03` 相当のIDは将来の詳細ページ／アンカー用に予約しておく。
- ハンバーガーメニュー・EN表記はヘッダー共通のため変更なし（JSはハンバーガー開閉のみ）。
- research.html 独自：page-hero にオーバーレイ無し（他の内側ページはlinear-gradientオーバーレイあり）。
