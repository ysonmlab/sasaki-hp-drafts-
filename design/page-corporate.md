# page-corporate.md

企業の方へページ（corporate.html）レイアウト設計書
参照元：drafts/existing/corporate.html（既存HPソース・参照専用）

---

## header（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。
本ページでは nav-item「企業の方へ」に `is-current` を付与する。

---

## page-hero（複数ページ共通・common.css既存を流用）

┃ department : page-hero
{ bleed + board : }
  < img : 背景画像（object-fit:cover・中央固定） >
  ⟦ zone : page-hero-inner ⟧
    < p : eyebrow ("FOR COMPANIES") >
    < h1 : title ("Collaboration") >
    < p : title-ja ("企業の方へ・産学連携") >

(SP: height 300px程度・フォント縮小 / PC: height 460px)
(オーバーレイ：標準仕様どおり linear-gradient オーバーレイあり)

images:
- assets/img/hero_collaboration.jpg → corporate-hero_bg1.jpg（背景・alt不要）

---

## accent-bar（全ページ共通・common.css側）

index.html / research.html / staff.html と同じ実装を流用（変更なし）。

---

## content-panel（複数ページ共通・common.css既存を流用／dark修飾子を新規追加）

┃ department : content-panel
{ chest : }（背景色 var(--color-surface) ＋ 上下 padding 80px(PC)/56px(SP) の共通ラッパー）

本ページでは2つのcontent-panelを使用する：
- 1つ目（lead + collab）：標準の content-panel（背景 var(--color-surface) = #FAFDFD）
- 2つ目（process）：`.content-panel.dark` 修飾子（背景 #F7F9FC・common.cssに新規追加）

備考：`.content-panel.dark` は drafts/existing の corporate.html / education.html / contact.html
の3ページで共通して使われているパターンと確認済みのため、common.css側に共通化する
（新規トークン `--color-surface-alt: #F7F9FC` を追加）。見た目はごく僅かにしか違わない
（#FAFDFD と #F7F9FC）が、隣接パネルの境目を示す目的の意図的な差分のため踏襲する。

---

## sect-corporate-lead

┃ section : lead
{ rack : }（リード文のみ・中央寄せではなく左寄せ）
  < p : リード文（産学連携についての説明文） >

(SP/PC共通1カラム。下部を区切り線で分ける。text-alignはleft（research-leadのcenterとは異なる））

images: なし

---

## sect-corporate-collab

┃ section : collab
⟦ zone : section-head ⟧
  < span : title-en ("Collaboration Menu") >
  < span : title-ja ("連携メニュー") >
{ tile : }（列数固定：PC 2カラム／SP 1カラム）
  [ item ] × 4（共同研究／受託研究／技術移転・ライセンス／研究費支援・寄附講座）
    ⟦ zone : header ⟧（アイコン＋タイトル＋丸矢印リンク。header全体が<a>）
      < svg : アイコン（装飾・aria-hidden） >
      < span : title >
      < span : 丸矢印リンク（装飾・aria-hidden） >
    < p : body（説明文） >

(SP: 1カラム縦積み・各itemの下に区切り線 / PC: 2カラム grid・列内の最終行のみ区切り線なし)
(アイコンはインラインSVG。ページ固有の装飾のため画像化しない)
(リンク先は各連携メニューの詳細ページが無いため、デモに合わせて href="#" のプレースホルダーとする)

images: なし

---

## sect-corporate-process

┃ section : process
⟦ zone : section-head ⟧
  < span : title-en ("Process") >
  < span : title-ja ("連携の流れ") >
{ shelf : }（横並び・PCは矢印区切り、SPは縦積みで矢印非表示）
  [ node ] × 5（お問い合わせ／ヒアリング・打ち合わせ／契約締結／研究実施・報告／成果の活用・継続連携）
    < svg : 丸背景アイコン（オレンジ系 #ffa66d・装飾） >
    < p : title >
    < p : body >
  [ arrow-sep ] × 4（node間の "›" 区切り。装飾・aria-hidden・SPでは非表示）

(SP: 縦積み・矢印非表示 / PC: 横一列・flex・矢印区切り)
(アイコン背景色 #ffa66d はこのセクション専用の色。common.cssのトークンには追加せず、corporate.css内に留める)

images: なし

---

## cta-block（複数ページ共通・common.css側／文言はcorporate固有）

┃ department : cta-block
研究活動へのご支援ではなく「産学連携・共同研究のご相談」文言に差し替え。
ボタンは contact.html へのリンク。

---

## footer（全ページ共通・common.css側）

index.html / research.html / staff.html と同じ実装を流用（変更なし）。

---

## 備考

- content-wrap（コンテンツ幅）：他の内側ページと同じく max-width:1100px（common.cssの`.content-wrap`をそのまま使用）。
- page-hero / accent-bar / content-wrap / content-panel / cta-block は既存の common.css 共通パーツをそのまま使う（content-panelのみdark修飾子を新規追加）。
- collab-item・flow-diagram・オレンジ系アイコン色（#ffa66d）はこのページ限定のデザインのため、corporate.css側に留め、common.css化はしない。
