# page-contact.md

お問い合わせページ（contact.html）レイアウト設計書
参照元：drafts/existing/contact.html（既存HPソース・参照専用）

---

## header（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。
本ページでは nav-item「お問い合わせ」に `is-current` を付与する。

---

## page-hero（複数ページ共通・common.css既存を流用）

┃ department : page-hero
{ bleed + board : }
  < img : 背景画像（object-fit:cover・中央固定） >
  ⟦ zone : page-hero-inner ⟧
    < p : eyebrow ("CONTACT") >
    < h1 : title ("Contact Us") >
    < p : title-ja ("お問い合わせ") >

(SP: height 300px程度・フォント縮小 / PC: height 460px)
(オーバーレイ：標準仕様どおり linear-gradient オーバーレイあり)

images:
- assets/img/hero_contact.png → contact-hero_bg1.png（背景・alt不要）
  （logs/PATTERNS.md「hero画像でjpg/pngが併存する場合はpngを優先する」方針により png を採用）

---

## accent-bar（全ページ共通・common.css側）

index.html / research.html / staff.html / corporate.html / education.html / clinical.html と同じ実装を流用（変更なし）。

---

## content-panel（複数ページ共通・common.css既存を流用）

本ページでは2つの content-panel を使用する：
1. 標準（lead：連絡先）
2. `.content-panel.dark`（access：所在地・アクセス）

他ページと異なり `cta-block` は使用しない（本ページ自体が問い合わせ先のため対象外）。

---

## sect-contact-lead

┃ section : lead
⟦ zone : section-head ⟧
  < span : title-en ("Contact") >
  < span : title-ja ("連絡先") >
{ rack : }
  < p : 説明文（"研究内容・産学連携・大学院進学など、お問い合わせはこちらにご連絡ください。"） >
  < p : 担当者名（"担当：野上彩子"） >
  < a : メールリンク（"nogami.a.615d@m.isct.ac.jp"）href="mailto:nogami.a.615d@m.isct.ac.jp" >

(見出し英日の大小関係は common.css 標準のまま（en=大・ja=小）。上書き不要)
(SP/PC共通1カラム)
(デモには「連絡先3カードグリッド版」がコメントアウトで併存しているが非表示のため不採用。
 実際にレンダリングされる「単一連絡先パターン」のみを採用する。メールアドレスは
 nogami.a.615d@m.isct.ac.jp を使用する（実アドレス確定済み）)

images: なし

---

## sect-contact-access

┃ section : access
⟦ zone : section-head ⟧
  < span : title-en ("Access") >
  < span : title-ja ("所在地・アクセス") >
{ chest : }（3カラム：住所ブロック／地図埋め込み／交通手段ブロック）
  ⟦ zone : address ⟧
    < p : label ("ADDRESS") >
    < p : name ("臨床検査医学分野") >
    < p : body（"〒113-8519 / 東京都文京区湯島1-5-45 / 東京科学大学病院MDタワー10階"） >
    < a : map-btn（"Google マップで見る →"）href="https://maps.google.com/?q=..." target="_blank" rel="noopener noreferrer" >
  < iframe : Google Maps埋め込み（loading="lazy" referrerpolicy="no-referrer-when-downgrade"） >
  ⟦ zone : transport ⟧
    < p : label ("TRANSPORT") >
    < p : body（"JR 御茶ノ水駅 下車 / 東京メトロ丸ノ内線 御茶ノ水駅 下車 / 東京メトロ千代田線 新御茶ノ水駅 下車"） >

(PC: 3カラム grid（1fr 2fr 1.5fr：住所／地図／交通手段）
 SP: 1カラム縦積み（住所→地図→交通手段の順、DOM順のまま））
(地図はGoogle Mapsの実URLをiframe埋め込みする。実在するリンクのため他ページの`#`仮リンクとは異なりそのまま実装する)

images: なし

---

## footer（全ページ共通・common.css側）

index.html / research.html / staff.html / corporate.html / education.html / clinical.html と同じ実装を流用（変更なし）。

---

## 備考

- content-wrap（コンテンツ幅）：他の内側ページと同じく common.css の `.content-wrap`（1100px）を使用。
- cta-block：本ページは使用しない（自身が問い合わせ先のため、他の内側ページとはこの点で構成が異なる）。
- contact-single（単一連絡先ブロック）・access-row（3カラムのアクセス情報+地図）は
  contact ページ固有の装飾のため common.css 化はせず contact.css 内に留める。
- CSSに定義がある `.related-grid` / `.related-link`（関連ページ）はHTML本文に実体が無い
  （デモ側で未実装のまま残置されたCSS）ため、本設計書には含めない。
- fade-up（スクロールフェードイン）：**使用しない**。`logs/PATTERNS.md`
  （「スクロールフェードイン（fade-up）は index.html と research.html のみ」）の
  既存ルールにより、下層ページ（contact含む）には付与しない方針を踏襲する。
- Google Maps iframe はレンダリング崩れ防止のため `access-map-embed` 相当のCSSで
  `width:100%; height:100%; min-height` を明示し、SP/PCどちらでも高さが潰れないようにする。
