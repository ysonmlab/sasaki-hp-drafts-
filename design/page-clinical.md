# page-clinical.md

臨床・診療ページ（clinical.html）レイアウト設計書
参照元：drafts/existing/clinical.html（既存HPソース・参照専用）

---

## header（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。
本ページでは nav-item「臨床・診療」に `is-current` を付与する。

---

## page-hero（複数ページ共通・common.css既存を流用）

┃ department : page-hero
{ bleed + board : }
  < img : 背景画像（object-fit:cover・中央固定） >
  ⟦ zone : page-hero-inner ⟧
    < p : eyebrow ("CLINICAL") >
    < h1 : title ("Clinical Practice") >
    < p : title-ja ("臨床・診療") >

(SP: height 300px程度・フォント縮小 / PC: height 460px)
(オーバーレイ：標準仕様どおり linear-gradient オーバーレイあり)

images:
- assets/img/hero_clinical.png → clinical-hero_bg1.png（背景・alt不要）
  （logs/PATTERNS.md「hero画像でjpg/pngが併存する場合はpngを優先する」方針により png を採用）

---

## accent-bar（全ページ共通・common.css側）

index.html / research.html / staff.html / corporate.html / education.html と同じ実装を流用（変更なし）。

---

## content-panel（複数ページ共通・common.css既存を流用）

本ページでは1つの content-panel（標準）のみ使用する。
他ページと異なり `cta-block` は使用しない（デモに無く、staff.html と同じ方針）。

---

## sect-clinical-lab

┃ section : lab
⟦ zone : section-head ⟧
  < span : title-en ("Clinical Laboratory") >
  < span : title-ja ("臨床検査部門") >
{ rack : }
  < p : リード文（"臨床検査医学分野は、東京科学大学病院の検査部と密接に連携し、患者さんの診断・治療に
        不可欠な臨床検査を提供しています。血液学・生化学・免疫学・微生物学など幅広い検査領域において、
        高精度な検査の実施と検査医学の発展に取り組んでいます。"） >
  < p : 案内文（"臨床検査に関する詳細・診療案内はこちらからご覧ください"） >
  < a : link-outline（"東京科学大学病院検査部" + 外部リンクアイコンSVG）
        href="https://www.tmd.ac.jp/med/mlah/" target="_blank" rel="noopener noreferrer" >

(見出し英日の大小関係は common.css 標準のまま（en=大・ja=小）。education.css のような
 上書きは不要。デモの section-title-en/ja の値が common.css の既定値と一致することを確認済み)
(SP/PC共通1カラム。他ページの lead + 案内ボックス相当だが、本ページは案内ボックスの
 枠なし・アウトラインボタンのみのシンプルな構成)
(link-outline は本ページ固有の新規パーツ。他ページで未使用のため common.css 化しない)

images: なし

---

## clinical-photo（department・bleed）

┃ department : clinical-photo
{ bleed : }
  < img : 集合写真（object-fit:cover・object-position:center 70%） >

(画面幅いっぱいのbleed。content-wrap の外側に置き、コンテンツ幅に収めない)
(aspect-ratio 16/6・上下に border線・背景は content-panel と同系色)
(SP/PC共通。差異なし)

images:
- assets/img/allmember3.jpg → clinical-photo_pht1.jpg（alt="検査部集合写真"）
  （allmember.jpg/allmember2.jpg も存在するが、デモが採用している allmember3.jpg を使用する）

---

## footer（全ページ共通・common.css側）

index.html / research.html / staff.html / corporate.html / education.html と同じ実装を流用（変更なし）。

---

## 備考

- content-wrap（コンテンツ幅）：他の内側ページと同じく common.css の `.content-wrap`（1100px）を使用（clinical-photo は例外でbleed）。
- cta-block：本ページは使用しない（drafts/existing/clinical.html に無く、staff.html と同じ方針。
  他の内側ページ（corporate/education/research）とはこの点で構成が異なる）。
- link-outline（アウトラインボタン）は clinical ページ固有の装飾のため common.css 化はせず
  clinical.css 内に留める（drafts/existing 全体を確認し、他ページで未使用であることを確認済み）。
- fade-up（スクロールフェードイン）：**使用しない**。デモには演出があるが、
  `logs/PATTERNS.md`（「スクロールフェードイン（fade-up）は index.html と research.html のみ」）の
  既存ルールにより、下層ページ（clinical含む）には付与しない方針を踏襲する。
- 外部リンク（東京科学大学病院検査部）は実際に存在するURLのため、他ページの `#` 仮リンクとは異なり
  そのまま実装する（`target="_blank" rel="noopener noreferrer"` を付与）。
