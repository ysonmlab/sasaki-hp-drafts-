# page-education.md

教育・大学院ページ（education.html）レイアウト設計書
参照元：drafts/existing/education.html（既存HPソース・参照専用）

---

## header（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。
本ページでは nav-item「教育・大学院」に `is-current` を付与する。

---

## page-hero（複数ページ共通・common.css既存を流用）

┃ department : page-hero
{ bleed + board : }
  < img : 背景画像（object-fit:cover・中央固定） >
  ⟦ zone : page-hero-inner ⟧
    < p : eyebrow ("EDUCATION & GRADUATE SCHOOL") >
    < h1 : title ("Join Us!") >
    < p : title-ja ("教育・大学院への参加") >

(SP: height 300px程度・フォント縮小 / PC: height 460px)
(オーバーレイ：標準仕様どおり linear-gradient オーバーレイあり)

images:
- assets/img/hero_education.png → education-hero_bg1.png（背景・alt不要）
  （ユーザー指示によりpng優先方針に変更。透過線画のためpage-heroのbackground:#002144と
   組み合わせて表示する。jpg版（hero_education.jpg）は不使用のまま残置）

---

## accent-bar（全ページ共通・common.css側）

index.html / research.html / staff.html / corporate.html と同じ実装を流用（変更なし）。

---

## content-panel（複数ページ共通・common.css既存を流用）

本ページでは4つの content-panel を使用する（ユーザー指摘により policy と faq を別パネルに分離）：
1. 標準（lead + undergrad）
2. `.content-panel.dark`（admission）
3. 標準（policy）
4. `.content-panel.dark`（faq）

（standard/darkを交互に配置し、隣接セクション同士の境目を常に背景色で示す構成）

---

## sect-education-lead

┃ section : lead
{ rack : }
  < p : リード文（"血液腫瘍学・感染症・検査医学のフロンティアを、ともに切り拓きませんか。
        臨床検査医学分野は、東京科学大学の複数の大学院・専攻を通じて、様々なバックグラウンドを
        持つ学生・研究者を受け入れています。基礎研究から臨床応用まで幅広い研究環境で、
        次世代の研究者・臨床家を育成します。"） >

(SP/PC共通1カラム。corporate-lead と同じく左寄せ・下部を区切り線で次セクションと分ける。
 research-lead（中央寄せ）とは異なる)

images: なし

---

## sect-education-undergrad

┃ section : undergrad
⟦ zone : section-head ⟧
  < span : title-ja ("学部生の方へ") >
  < span : title-en ("For Undergraduate Students") >
< p : lead（"卒業研究・学外実習・研究室見学を随時受け付けています。血液悪性腫瘍の研究や
      臨床検査医学に興味のある学部生の方は、まずはお気軽にご連絡ください。"） >
{ chest : }（枠線＋左3pxゴールドアクセントボーダーの案内ボックス）
  < p : dept-label ("DEPT.") >
  < p : title ("東京科学大学 医学部 医学科") >
  < p : body（"医学部生の研究室配属・卒業論文研究として当分野への参加が可能です。
        臨床実習との両立もサポートします。研究に興味のある医学部生は担当教員までご連絡ください。"） >
  < a : link ("東京科学大学 医学部 公式サイト")（リンク先未指定のため `#` の仮リンク） >

(SP/PC共通1カラム)

images: なし

---

## sect-education-admission

┃ section : admission
⟦ zone : section-head ⟧
  < span : title-ja ("大学院への進学経路") >
  < span : title-en ("Graduate School Admission") >
< p : lead（"当研究分野には、以下の大学院・専攻を通じて進学することができます。
      それぞれの募集要項・選考方法については各専攻の公式サイトをご確認ください。"） >
{ tile : }（列数固定：PC 2カラム／SP 1カラム）
  [ card ] × 2（修士課程／博士課程）
    < span : badge ("修士課程" / "博士課程") >
    < p : title（大学院・研究科名） >
    < p : body（説明文） >
    < a : link ("募集要項・詳細はこちら")（詳細ページ未作成のため `#` の仮リンク） >

(SP: 1カラム縦積み / PC: 2カラム grid・gap 16px)
(バッジ色：ユーザー指摘により修士・博士とも同色（navy）に統一。デモの`.badge.en`修飾子相当の
 区別色は不採用)

images: なし

---

## sect-education-policy

┃ section : policy
⟦ zone : section-head ⟧
  < span : title-ja ("研究室の教育方針") >
  < span : title-en ("Our Educational Philosophy") >
< p : lead（"当研究室では、自立した研究者・臨床家を育てることを目標に、
      以下の3点を重視した教育を行っています。"） >
{ tile : }（列数固定：PC 3カラム／SP 1カラム）
  [ item ] × 3（自律的な研究姿勢／国際的な発信力／臨床と研究の融合）
    < p : num ("01"/"02"/"03"・装飾数字) >
    < p : title >
    < p : body >

(SP: 1カラム縦積み / PC: 3カラム grid・gap 16px、各itemの上端に2pxアクセントボーダー)

images: なし

---

## sect-education-faq

┃ section : faq
⟦ zone : section-head ⟧
  < span : title-en ("FAQ") >
  < span : title-ja ("よくある質問") >
{ rack : }
  < dl : faq-list >
    [ item ] × 4（Q&Aペア）
      < dt : q（"Q"マーク＋質問文） >
      < dd : a（"A"マーク＋回答文） >

質問4件：
1. 医学部以外の出身でも参加できますか？
2. 研究室見学は可能ですか？
3. 奨学金やフェローシップのサポートはありますか？
4. 英語が得意でなくても大丈夫ですか？

(SP/PC共通1カラム。各itemの下に区切り線、最初のitemの上にも区切り線)
(開閉なし・常時全文表示。デモ通りアコーディオンにはしない)
(デモは div+div の非構造化マークアップだが、Q&Aとして意味を持たせるため `<dl><dt><dd>` に構造化する。
 見た目・レイアウトはデモのまま変更しない)

images: なし

---

## cta-block（複数ページ共通・common.css側／文言はeducation固有）

┃ department : cta-block
- label : "GET IN TOUCH"
- title : "お気軽にお問い合わせください"
- body  : "研究室見学・大学院進学・ポスドク応募など、どのようなご相談でも歓迎します。"
- btn   : "お問い合わせはこちら" → contact.html

---

## footer（全ページ共通・common.css側）

index.html / research.html / staff.html / corporate.html と同じ実装を流用（変更なし）。

---

## 備考

- **見出しの大小関係（ユーザー確認済み・デモ優先）**：
  デモでは日本語見出しが大(2rem太字)・英語見出しが小(添え字)だが、common.css の
  `.section-title-en`(大)/`.section-title-ja`(小) は research/corporate 準拠で逆の前提になっている。
  common.css 自体は変更せず（他ページへの影響を避けるため）、education.css 側で
  `.sect-education-undergrad` / `.sect-education-admission` / `.sect-education-policy` の
  3セクションに限定して `.section-title-ja` を大・`.section-title-en` を小に上書きする
  （セレクタを `.pg-education .sect-education-{name} .section-title-en/.section-title-ja` で
  スコープし、他ページ・他セクションに影響させない）。
  `sect-education-faq` は上書き対象外（"FAQ"(英語)=大のままで元々デモと一致するため）。
  各見出しの `<span>` へのクラス割り当ては全セクション共通で「英語→title-en／日本語→title-ja」を維持し、
  上書きするのはあくまでフォントサイズ側とする（クラスとテキストの対応は入れ替えない）。
  ただしユーザー指摘により、DOM上の並び順（＝視覚上の表示順）は大きい文字が先に来るよう
  undergrad/admission/policyの3セクションのみ `<span class="section-title-ja">`（大）を先、
  `<span class="section-title-en">`（小）を後に配置する（faqは英語が大のため元の順（en→ja）のまま）。
- content-wrap（コンテンツ幅）：他の内側ページ5枚と同じく common.css の `.content-wrap`（1100px）を使用。
- undergrad-box / grad-card / policy-item / faq-item は education ページ固有の装飾のため
  common.css 化はせず education.css 内に留める。
- 大学院・研究室見学の詳細ページ・外部リンク先（医学部公式サイト／募集要項）は未作成のため、
  research/corporate の View More リンクと同様に `#` の仮リンクとする。
- ハンバーガーメニュー・EN表記はヘッダー共通のため変更なし（JSはハンバーガー開閉のみ）。
- fade-up（スクロールフェードイン）：**使用しない**。デモには演出があるが、
  `logs/PATTERNS.md`（「スクロールフェードイン（fade-up）は index.html と research.html のみ」）の
  既存ルールにより、下層ページ（education含む）には付与しない方針が確定済みのため踏襲する。
