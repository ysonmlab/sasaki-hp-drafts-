# page-staff.md

スタッフページ（staff.html）レイアウト設計書
参照元：drafts/existing/staff.html（既存HPソース・参照専用）

---

## header（全ページ共通・common.css側）

index.html と同じ実装を流用（変更なし）。
本ページでは nav-item「スタッフ」に `is-current` を付与する。

---

## page-hero（複数ページ共通・common.css既存を流用）

┃ department : page-hero
{ bleed + board : }
  < img : 背景画像（object-fit:cover・中央固定） >
  ⟦ zone : page-hero-inner ⟧
    < p : eyebrow ("STAFF") >
    < h1 : title ("Staff") >
    < p : title-ja ("スタッフ・メンバー紹介") >

(SP: height 300px程度・フォント縮小 / PC: height 460px)
(オーバーレイ：staff.html は標準仕様どおり linear-gradient オーバーレイあり。research.htmlのみ例外でオーバーレイ無し)

images:
- assets/img/hero_staff.png → staff-hero_bg1.png（背景・alt不要）

---

## accent-bar（全ページ共通・common.css側）

index.html / research.html と同じ実装を流用（変更なし）。

---

## content-panel（複数ページ共通・common.css側に新規追加）

┃ department : content-panel
{ chest : }（背景色 var(--color-surface) ＋ 上下 padding 80px(PC)/56px(SP) の共通ラッパー）

備考：drafts/existing 全7ページ（index含む）で使われている共通パターンと確認済みのためcommon.css化する。
staffページでは以下の2ブロックに分けて使用し、それぞれ標準paddingを一部上書きする：
- profileブロック：padding-bottom を 24px に上書き（Membersブロックとの間隔を詰めるため）
- membersブロック：padding-top を 24px に上書き

あわせて research.css 側もこの共通クラスを使う形にリファクタする（見た目は変えない）。

---

## sect-staff-profile

┃ section : profile
⟦ zone : section-head ⟧
  < span : title-en ("Principal Investigator") >
  < span : title-ja ("教授・主宰") >
{ fluid : }
  ⟦ zone : photo ⟧
    < img : 教授写真（等倍表示・aspect-ratio指定なし） >
  ⟦ zone : text ⟧
    < p : name-ja + name-en ("佐々木 宏治" / "Koji Sasaki, MD, PhD") >
    < p : affiliation ("東京科学大学 医学部 / 臨床検査医学分野 教授") >
    < p : bio（経歴・抱負の長文） >
    < a : 研究業績（researchmap） → >（外部リンク・新規タブ）

(SP: 縦積み・写真は最大260px中央寄せ / PC: 横並び・写真40% + テキスト60%)
(テキスト側の背景は半透明の薄いsurface色。写真との重なりはなく単純に横並び)

images:
- assets/img/idx-profile_pht1.jpg → common_pht1.jpg にリネーム
  （index.html の profile セクションと共用のため「common」命名に統一。index.html 側の
  img src 参照も本ページのコーディング時にあわせて修正する。見た目・構造は変更しない）

---

## sect-staff-members

┃ section : members
⟦ zone : section-head ⟧
  < span : title-en ("Members") >
  < span : title-ja ("メンバー") >
{ rack : }（役職グループを縦に並べる）
  ⟦ group : 准教授 ⟧
    < p : group-label ("ASSOCIATE PROFESSOR　准教授") >
    { fluid : } メンバーカード × 1（野上 彩子）
  ⟦ group : 講師 ⟧
    < p : group-label ("LECTURER　講師") >
    { fluid : } メンバーカード × 1（叶内 匡）
  ⟦ group : 助教 ⟧
    < p : group-label ("ASSISTANT PROFESSOR　助教") >
    { fluid : } メンバーカード × 1（渡部 悟）

メンバーカード内訳：
  ⟦ zone : photo ⟧
    < img : メンバー写真 (aspect-ratio 7/10) >
  ⟦ zone : text ⟧
    < p : name-ja + name-en >
    < p : affiliation >
    { rack : }
      < a : 関連リンク → >（0〜2件・外部リンク・新規タブ。無い場合は非表示）

(SP: カードは写真30%+テキストの横並びを維持（400px未満のみ縦積みに切替） / PC: 横並び・写真30% + テキスト70%)
(カードの写真＋テキスト行は align-items:flex-start を明示指定し、
 テキスト量の違いで写真のaspect-ratioが潰れないようにする。デモCSSには無い意図的な差分)
(将来メンバー追加用の博士課程/修士課程/学部生/研究員グループは、デモ同様に現時点では実装しない
 ＝コンテンツが無いグループは作らない)

images:
- assets/img/staff_nogami.jpg → staff-members_pht1.jpg（alt="野上 彩子"）
- assets/img/staff_kanouchi.jpg → staff-members_pht2.jpg（alt="叶内 匡"）
- assets/img/staff_watanabe.jpg → staff-members_pht3.jpg（alt="渡部 悟"）

---

## 集合写真セクション（非実装）

デモ（drafts/existing/staff.html）では該当HTMLがまるごとコメントアウトされ非表示になっている。
実画像（assets/img/allmember.jpg 等）は存在するが、デモの現状に合わせて本ページでも実装しない
（ユーザー確認済み）。将来必要になった場合は別途セクションを追加する。

---

## footer（全ページ共通・common.css側）

index.html / research.html と同じ実装を流用（変更なし）。

---

## 備考

- content-wrap（コンテンツ幅）：research と同じく max-width:1100px（common.css既存の`.content-wrap`をそのまま使用）。
- page-hero / accent-bar / content-wrap / cta-block（本ページ未使用）は既存の common.css 共通パーツをそのまま使う。
- content-panel は本ページのコーディングで新規に common.css へ追加する（研究ページ実装時に見落としていた共通化）。
- メンバーの関連リンク数はメンバーごとに異なる（准教授2件／講師1件／助教0件）。0件の場合はリンクブロック自体を出力しない。
