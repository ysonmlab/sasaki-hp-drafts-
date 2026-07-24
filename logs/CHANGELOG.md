# 佐々木研究室HP

# CHANGELOG.md

設計・実装の作業内容を記録する。

記録形式（新しいものを上に追記）：

    ## YYYY-MM-DD {page-name}
    - 内容

## 2026-07-24 index/research（機能追加：ResearchカードからResearch内容ページへのリンク）
- 「ホームのResearchカードをクリックすると研究内容ページのそれぞれの部分にリンクするようにしたい」との要望を受け実装
- research.html側は既に各プロジェクトに `id="detail-01/02/03"` が付与済みだったため、index.html のカードタイトル（`sect-top-research__title`）内テキストを `<a href="research.html#detail-0N" class="sect-top-research__link">` でラップ
- カード全体をクリック可能にするため、`.sect-top-research__link::after`に`position:absolute;inset:0`のstretched-link（親の`.sect-top-research__card`は既にposition:relative）を追加。JS不要でCSSのみで実装（CLAUDE.mdのJS最小方針に準拠）
- ホバー時のフィードバックとして `:has(.sect-top-research__link:hover)` でカードのborder-color/box-shadowを変化させる演出を追加
- research.css側は、アンカー遷移時にfixedヘッダーで見出しが隠れないよう `.sect-research-projects__item` に `scroll-margin-top: 90px` を追加
- Chrome headlessでindex.htmlのカード表示崩れが無いことを確認。研究内容ページ側のアンカー遷移はheadlessのフラグメントスクロールの挙動が不安定だったため、DOM上のid一致とhref一致を確認する形で検証（実ブラウザでの最終確認を推奨）

## 2026-07-24 education（修正：仮リンクの一部を実リンク化）
- サイト内に残っていた仮リンク（`href="#"`）6箇所を洗い出し、1つずつ実リンクに差し替える方針で着手
- education.html「東京科学大学 医学部 公式サイト」（sect-education-undergrad__link）を `https://www.med.tmd.ac.jp/` に更新（外部リンクのため`target="_blank" rel="noopener noreferrer"`付与）
- 未対応（保留）：education.html の大学院進学経路2件（修士課程・博士課程の募集要項リンク、URL未確定のため後日対応）、research.html の「View More →」3件（詳細ページ未作成のため保留）

## 2026-07-24 assets/img（整理：未使用画像をoldフォルダへ移動）
- 「imgフォルダ内にoldフォルダを作成して、今回使われていない画像を移動」との指示を受け、全HTML（ルート直下）・全CSS（assets/css）を走査し参照の無い画像14点を `assets/img/old/` へ移動
- 対象：research-projects_pht1〜3.pngへリネーム前の原本3点（Development of Novel In Vitro Drug Sensitivity Assays.png／Infectious Disease and Pathogen Typing Technologies.png／Molecular Mechanisms of Leukemia and Lymphoma.png）、clinical-photo_pht1.jpgへリネーム前の原本3点（allmember.jpg／allmember2.jpg／allmember3.jpg）、各ページの{page}-hero_bg1.*へリネームコピー前の原本8点（hero_clinical.jpg/png、hero_contact.jpg/png、hero_education.jpg/png、hero_research.jpg、hero_staff.jpg）
- 移動後、現行の全ページで参照している画像パスに変更が無いことを確認済み（元々参照0件だったファイルのみを移動したため表示への影響なし）
- 追加指示を受け、野上　彩子.pdf（画像ではないがassets/img直下にあった未使用ファイル）も同様に assets/img/old/ へ移動

## 2026-07-24 corporate（修正：Process文言変更）
- 「まずはメールまたはお問い合わせフォームよりご連絡ください。」を「まずはメールでご連絡ください。」に変更（sect-corporate-process「お問い合わせ」ノードの本文）。お問い合わせフォームは実装されていないため、実態に合わせて文言を修正

## 2026-07-24 contact（修正：メールアドレス確定）
- 「お問い合わせのアドレスを nogami.a.615d@m.isct.ac.jp に差し替えて」との指示を受け、contact.html の mailto リンク・表示テキストをプレースホルダー xxx@tmd.ac.jp から実アドレスに差し替え。design/page-contact.md の記載も合わせて更新（「実アドレス未確定」の注記を削除）

## 2026-07-24 common（修正：ヘッダーの半透明化を廃止）
- 「ヘッダーの色がホーム以外違う色になっていそう」との指摘を受け調査。`.site-header` の背景がデモ準拠で半透明＋`backdrop-filter:blur`になっており、hero画像（写真 or イラスト、位置・色調がページごとに違う）が透けて見えるため、ページごとにヘッダーの見え方が微妙に異なっていたことが原因と判明
- デモ自体はスクロール40pxで不透明度0.88→0.98に切り替える`.scrolled`演出を持つが、現行のcommon.css/nav.jsには未移植だった。再現も検討したが、「最初からネイビーで良い」「JSは最低限」というユーザー判断・CLAUDE.md方針により不採用
- `.site-header`の`background`を`rgba(11,31,58,0.92)`→`var(--color-navy)`（不透明固定）に変更し、`backdrop-filter`/`-webkit-backdrop-filter`を削除。スクロール連動JSは追加せず、常時同一色になる方針で解決
- 全7ページ（index/research/staff/corporate/education/clinical/contact）でPC幅のヘッダーをChrome headlessで比較し、色が統一されたことを確認

## 2026-07-24 contact（コーディング）
- design/page-contact.md に沿って contact.html / assets/css/contact.css を実装
- セクション構成：header(共通/is-current付与) → page-hero → accent-bar → content-panel[ lead(rack：単一連絡先) ] → content-panel.dark[ access(chest：PC 3カラムgrid「1fr 2fr 1.5fr」／SP 1カラム縦積み・DOM順のまま：住所／Google Mapsのiframe埋め込み／交通手段) ] → footer(共通)
- cta-block・related-grid（デモにCSSのみ残置され実体が無い関連ページ）は設計書どおり不採用。fade-upも既存ルール（logs/PATTERNS.md）通り不使用
- 画像：hero_contact.png を contact-hero_bg1.png としてコピーして採用（設計書のpng優先方針を踏襲）
- sect-contact-lead__desc/name/mail・sect-contact-access__row 配下の各要素は contact 固有のため common化せず。Google Maps iframe は実在URLのままloading="lazy"・referrerpolicy="no-referrer-when-downgrade"で実装
- Chrome headlessでPC(1440px)/SP(390px)のスクリーンショットを確認。access-rowのPC 3カラム/SP 1カラム切替、単一連絡先の表示に崩れが無いことを確認（オフライン環境のためGoogle Fonts・Maps iframeは実際には読み込まれず代替表示だったが、レイアウト自体は意図通り）

## 2026-07-24 clinical（コーディング）
- design/page-clinical.md に沿って clinical.html / assets/css/clinical.css を実装
- セクション構成：header(共通/is-current付与) → page-hero → accent-bar → content-panel[ sect-clinical-lab(rack：リード文＋案内文＋link-outlineボタン、SP/PC共通1カラム) ] → clinical-photo(department・bleed：content-wrapの外・画面幅いっぱい) → footer(共通)
- 他ページと異なりcta-block・content-panel.darkは使用しない（設計書どおりstaff.htmlと同方針）。見出し英日の大小は common.css 標準のまま上書きなし。fade-upも既存ルール通り不使用
- 画像：hero_clinical.png を clinical-hero_bg1.png、allmember3.jpg を clinical-photo_pht1.jpg としてコピーして採用
- link-outline（アウトラインボタン）・clinical-photo（bleed写真、aspect-ratio 16/6・object-position center 70%・上下border）は clinical 固有のため common化せず
- Chrome headlessでPC(1440px)/SP(390px)のスクリーンショットを確認。集合写真のbleed表示・アウトラインボタンのレイアウトに崩れが無いことを確認

## 2026-07-24 contact（設計）
- drafts/existing/contact.html を実HTML構造まで確認し、design/page-contact.md を作成
- デモには「連絡先3カードグリッド版」がコメントアウトで併存していたが、実際にレンダリングされるのは「単一連絡先パターン」のみと確認し、後者を採用（コメントアウト部分は設計書に含めない）。メールアドレスはデモ上のプレースホルダー xxx@tmd.ac.jp のまま実装する方針とした
- CSSにのみ定義があり実際のHTML本文には存在しない `.related-grid`/`.related-link`（関連ページ）は、実体が無いため設計書に含めない方針とした
- 見出し英日の大小は common.css 標準のまま（他ページと同様、上書き不要）と確認
- cta-block はデモに無く、本ページ自身が問い合わせ先のため不使用の方針とした（clinical/staffと同じ考え方）
- アクセスセクション（3カラム：住所+リンク／Google Mapsのiframe埋め込み／交通手段）はcontact固有のため共通化せず、Google Maps iframeは実在URLのためそのまま実装する方針とした
- 画像リネーム方針：hero_contact.png → contact-hero_bg1.png（PATTERNS.mdの「hero画像はpng優先」方針を適用）
- 次はコーディングフェーズ（新しいセッションで docs/workflow-coding.md）

## 2026-07-24 clinical（設計）
- drafts/existing/clinical.html を実HTML構造まで確認し、design/page-clinical.md を作成
- 他の内側ページと異なり、見出し英日の大小は common.css 標準のまま（en=大・ja=小、education.cssのような上書き不要）と確認
- cta-block はデモに無く、staff.html と同じく本ページも不使用の方針とした（corporate/education/researchとは構成が異なる点として明記）
- link-outline（アウトラインボタン）と clinical-photo（集合写真の全幅bleed）は clinical ページ固有の新規パーツ。drafts/existing全体をgrepし、他ページで未使用のため common.css 化しない方針を確認
- 画像リネーム方針：hero_clinical.png → clinical-hero_bg1.png（PATTERNS.mdの「hero画像はpng優先」方針を適用）、allmember3.jpg → clinical-photo_pht1.jpg
- 外部リンク（東京科学大学病院検査部・https://www.tmd.ac.jp/med/mlah/）は実在URLのため他ページの`#`仮リンクとは異なりそのまま実装する方針
- 次はコーディングフェーズ（新しいセッションで docs/workflow-coding.md）

## 2026-07-24 education（修正：見出し順序／バッジ色統一／policy・faqのパネル分離）
- 「タイトルの英語と日本語の配置だけ逆にして（日本語の大きい文字が先）」を受け、undergrad/admission/policyの3セクション（section-title-jaを大きく上書きしている箇所）で`<span>`の順序を`ja→en`に入れ替え（クラスとテキストの対応は変更せず、DOM順＝視覚上の順序のみ変更）。faqは元々英語(FAQ)が大きく既に大きい方が先のため変更なし
- 「大学院への進学経路の博士課程の色を修士課程の色に合わせて」を受け、`sect-education-admission__badge.is-doctor`（accent-blue）を廃止し、修士・博士とも共通のnavy背景に統一。HTML側の`is-doctor`クラスとCSS側の対応ルールを削除
- 「研究室の教育方針とFAQがくっついてしまっているので、別コンテンツとして離して背景色も変えて」を受け、従来1つの`content-panel`にまとめていたpolicy+faqを、`content-panel`（policy）→`content-panel dark`（faq）の2枚に分離。ページ全体でstandard/darkが交互に配置される構成になった（4パネル構成：standard[lead+undergrad]→dark[admission]→standard[policy]→dark[faq]）
- design/page-education.md（content-panel構成・バッジ色・見出し順序の備考）を更新。Chrome headlessで再確認し、見出し順序・バッジ色・パネル分離いずれも意図通り反映されていることを確認

## 2026-07-24 education（修正：hero画像はpng優先）
- 「hero部分は、pngがある場合はpngを優先して使ってください」との指示を受け、設計時点でjpgを採用していた方針を変更。`education-hero_bg1.jpg`（hero_education.jpgのコピー）を削除し、`hero_education.png`を`education-hero_bg1.png`としてコピー、education.htmlのimg srcをpngに差し替え。common.cssの`.page-hero{background:#002144}`と組み合わさり透過線画が正しく表示されることをChrome headlessで確認
- design/page-education.md の images 記述もpng採用に修正
- この方針（png優先）は今後のclinical/contact実装時にも適用する（詳細はlogs/PATTERNS.md参照）

## 2026-07-24 education（コーディング）
- design/page-education.md に沿って education.html / assets/css/education.css を実装
- セクション構成：header(共通/is-current付与) → page-hero → accent-bar → content-panel[ lead(rack) / undergrad(rack+chest) ] → content-panel.dark[ admission(tile, PC2col/SP1col) ] → content-panel[ policy(tile, PC3col/SP1col) / faq(rack, dl/dt/dd) ] → cta-block(共通・文言差し替え) → footer(共通)
- 見出し大小上書き：設計書の確定方針どおり、education.css側で`.pg-education .sect-education-{undergrad|admission|policy} .section-title-en/.section-title-ja`のみフォントサイズを上書き（faqは対象外・common.css自体は変更なし）
- undergrad-box/grad-card(admission)/policy-item/faq-listはeducation固有のためcommon化せず。faqはQ&Aの意味を持たせるため`<dl><dt><dd>`で構造化（デモはdiv構成だが見た目・レイアウトは変更なし）
- 画像：hero_education.jpg を education-hero_bg1.jpg にコピーして採用（透過pngは不使用、設計書の判断を踏襲）
- fade-upは既存ルール（logs/PATTERNS.md）通り不使用
- Chrome headlessでPC(1440px)/SP(390px)のスクリーンショットを確認。hero・admissionの2カラム/1カラム切替・policyの3カラム/1カラム切替・FAQ・CTAの表示崩れが無いことを確認

## 2026-07-24 education（設計）
- drafts/existing/education.html と、他の内側ページ（research/staff/corporate/clinical/contact）を
  突き合わせ、design/page-education.md を作成
- セクション構成：header(共通) → page-hero → accent-bar → content-panel(lead+undergrad)
  → content-panel.dark(admission) → content-panel(policy+faq) → cta-block → footer(共通)
- 見出し大小関係の相違を確認：デモは日本語見出しが大・英語が添え字（研究/企業ページとは逆）。
  ユーザーに確認し「デモ通り日本語を大きくする」方針で確定。common.css自体は変更せず、
  education.css側で対象3セクション（undergrad/admission/policy）のみスコープを絞って
  `.section-title-ja`(大)/`.section-title-en`(小)に上書きする方針とした（FAQセクションは
  「FAQ」(英語)=大のままデモと一致するため上書き対象外）
- 画像リネーム方針：hero_education.jpg → education-hero_bg1.jpg（透過pngは不使用）
- fade-upは既存ルール（logs/PATTERNS.md）通り不使用（デモにはあるが下層ページ非適用の方針を踏襲）
- 次はコーディングフェーズ（新しいセッションで docs/workflow-coding.md）

## 2026-07-24 全ページ共通（修正：page-hero__imgの最大幅をmin(1600px,100%)に）
- 「.page-hero-imgはwidth: min(1600px, 100%)にしてください」との指示を受け、common.cssの`.page-hero__img`を修正。widthの値だけでなく、位置指定も`inset:0`（左右0で伸縮）から`top:50%;left:50%;transform:translate(-50%,-50%)`（中央配置）に変更した。理由：`inset:0`のままwidthを100%未満に制限すると、left:0が優先されて画像が左端に張り付いてしまう（over-constrained時の仕様）。デモの`.page-hero-img`も同じtranslate中央配置＋`width:min(1600px,100%)`の組み合わせだった
- common.css側の共通パーツのため、research/staff/corporateの3ページをChrome headlessで1920px幅（1600pxを超える）と1440px幅（超えない）の両方で確認。1600px超では画像が中央配置で1600px幅にキャップされ左右にpage-heroの背景色が見えること、1440px以下では従来通り画面幅いっぱいに表示されることを確認

## 2026-07-24 全ページ横断（方針確定：スクロールフェードインはresearch.html以外の下層ページでは不要）
- 「下層ページについてはresearchページ以外はスクロール時の動きは不要」との指示を受け方針確定。index.html（トップページ・下層ページではない）とresearch.htmlのみfade-upを維持し、corporate.htmlから`fade-up`クラス（lead-text／section-head×2／cta-block）と`assets/js/fade-up.js`の読み込みを削除。staff.htmlは既に削除済みで対応不要だった
- 今後のeducation/clinical/contact実装時も、fade-upは付与しない方針で統一する

## 2026-07-24 corporate（修正：連携メニューのリンク解除）
- 「Collaboration Menuのリンク先が無いためリンク解除、＞ボタンも削除」との指摘を受け修正。各collab-itemの`<a href="#" class="sect-corporate-collab__header">`を`<div>`に変更し、丸矢印リンク（`sect-corporate-collab__link`）のspan/svgを4件とも削除
- CSS側もリンク前提だった装飾（丸矢印ボタンのスタイル、ホバー時のタイトル下線アニメーション）を削除。クリック不可の見出し表示のみのシンプルな構成に整理

## 2026-07-24 corporate（設計・コーディング）
- drafts/existing/corporate.html を実HTML構造まで確認し、design/page-corporate.md を作成
- `.content-panel.dark`（隣接パネルとの境目を示す僅差の背景色）が corporate/education/contact の3ページで共通して使われているパターンと確認し、common.css側に新規共通化（`--color-surface-alt:#F7F9FC`トークン追加）
- セクション構成：header(共通) → page-hero(標準仕様) → accent-bar → content-panel[ lead(rack) / collab(tile, 2x2) ] → content-panel.dark[ process(shelf, 5ステップ+矢印区切り) ] → cta-block(共通・文言差し替え) → footer(共通)
- collab-item（アイコン+タイトル+丸矢印リンクのヘッダー、PC2カラム/SP1カラム、行末のみ区切り線なし）、process（PC横一列+矢印区切り/SP縦積み+矢印非表示）はcorporate固有のためcommon化せず。オレンジ系アイコン色`#ffa66d`もページ限定
- 画像リネーム：hero_collaboration.jpg → corporate-hero_bg1.jpg
- アイコンは全て装飾目的のインラインSVG（aria-hidden="true"）。画像化はしない
- **バグ修正**：index.htmlのnews-list実装時に「デモの`--navy-light`」として誤って`--navy-mid`の値（#1A3557）を使っていたことが、corporate実装時にデモのroot変数を再確認した際に発覚。正しい`--navy-light`の値`#2B4E7A`に修正（`assets/css/index.css`のnews-list border-color）
- Chrome headlessでPC/SP表示を確認（collab-listの区切り線が行末のみ消えること、processの矢印がSPで非表示になることを含む）



## 2026-07-24 index（修正：「閉じる」の位置を全文の末尾に）
- 「全文を読むを開いた後、閉じるの位置は全文の最後に」との指示を受け修正。`<details>`はsummaryが常に最初の子要素になる仕様のため、open時に`display:flex;flex-direction:column;`にした上でsummaryに`order:2`、続きの本文`<p>`に`order:1`を指定し、視覚的な順序だけ「本文→閉じる」に入れ替えた（DOM構造・アクセシビリティ上の順序（summaryが先）は変更していない）
- open属性を付与した検証用コピーで確認し、「閉じる ↑」が全文の一番下に表示されることを確認

## 2026-07-24 index（修正：本文セクションの幅を1100pxに拡大）
- 「コンテンツ幅を広げて。デモは1200pxだが他ページに合わせて1100pxに」との指示を受け、`.pg-index .sect-top-profile/.sect-top-research/.sect-top-news .container`のmax-widthを860px→1100pxに変更（デモの新しい値1200pxではなく、research.html/staff.htmlの`.content-wrap`と同じ1100pxに統一）

## 2026-07-24 index（ドラフト差し替え対応：research/newsデザイン刷新・profile続き読み）
- ユーザーがdrafts/existing/index.htmlを新デモ（v4）に差し替え。旧実装（index.html/index.css）との差分を洗い出して反映
- **research セクション**：背景色を`--color-surface`（オフホワイト）から`--color-navy`（紺）に反転。見出し文字色も白系に反転（`.section-title-en`/`ja`をindex固有に上書き、common.cssは変更なし）。カードを角丸16px＋ゴールド枠＋上部ゴールド帯のデザインに刷新し、fade-up表示時に角丸が30pxまで広がるアニメーションを追加。カード見出し部に番号＋DNAアイコン画像（`assets/img/dna1〜3.png`を`top-research_pic1〜3.png`にリネーム）を横並び配置（コンテナクエリ`cqw`でアイコンサイズを数字に連動）。カードの分類タグ（HEMATOLOGY等）は新デモで廃止されていたため削除
- **news セクション**：リストに角丸16px＋2px枠線（`#1A3557`、デモの`--navy-light`。index固有の値としてハードコードし、他ページのnews的UIには波及させない）を追加。タグの既定色を紺からゴールド系（`#c49a3a`）に変更（「論文」タグのみ従来通り青系のまま）
- **profile セクション**：本文の続き3段落をSPのみ「全文を読む」で開閉する仕様に変更。`<details>/<summary>`で実装（JS不使用、CLAUDE.mdのアコーディオン方針に準拠）。ただしPCで常時全文表示にする際、closedな`<details>`の中身をdisplay上書きだけでは表示できない問題に遭遇（Chromeは`content-visibility:hidden`で隠しており`content-visibility:visible`を明示してもなお表示されなかった）。最終的にSP用`<details>`とPC用の通常`<p>`を別々にDOMに用意し、CSSで出し分ける方式に変更して解決（詳細はPATTERNS.md参照）。教授名（日本語部分）のフォントサイズ・色もデモに合わせて25px・#000に調整
- **fade-up演出**：index.htmlに`assets/js/fade-up.js`を新規読み込みし、profile-inner・section-head（research/news）・research-card・news-itemに`fade-up`クラスを付与。research-cardは2枚目0.1s・3枚目0.2s、news-itemは2件目0.08s・3件目0.16s・4件目0.24sの遅延を追加し、順番に表示されるようにした
- 検証はChrome headless（`--virtual-time-budget`でJS/トランジション完了を待機、iframeで固定幅のSP検証）で実施。PC/SP双方、および続きを読むの開閉状態を確認
- `design/page-index.md`を新デモの構成に合わせて更新

## 2026-07-24 全ページ共通（再修正：SPハンバーガーメニューの幅の優先順位）
- ユーザーより「基本は画面幅の50%、50%だと文字が折り返される場合のみ文字幅に合わせる」と優先順位を明確化する指摘があり、`.nav-links`を`width:fit-content; max-width:50vw;`（常にコンテンツ幅基準・50%を上限）から`width:50vw; min-width:max-content;`（常に50%基準・コンテンツ幅を下限）に変更
- iframeで固定幅を用意し、通常幅（390px）では50%ちょうどの幅になること／極端に狭い幅（220px、50vw=110pxが「教育・大学院」等のラベル幅を下回るケース）では50%を超えて文字幅まできちんと広がり折り返さないことの両方を確認

## 2026-07-24 全ページ共通（修正：SPハンバーガーメニューの幅）
- 「最小:文字が全部見える幅、最大:画面半分」の要望を受け、common.cssの`.nav-links`（SP用ドロップダウン）を修正。従来は`left:0; right:0`で画面幅いっぱいに引き伸ばしていたが、`left`指定を外し`width: fit-content; max-width: 50vw;`に変更（`right:0`はそのまま維持し、右端をヘッダーに揃える）
- `.nav-item`の`width:100%`を削除（`white-space:nowrap`を追加）。子要素にpercentage幅が残っているとfit-contentの計算でコンテンツ本来の幅が使われず極端に潰れる不具合があったため
- デモの`.nav-links`にあった`border-left`と`box-shadow`も合わせて追加（従来は画面幅いっぱいの実装だったため省略していたが、幅が可変になったことで浮遊するドロップダウンとして意味を持つようになった）
- 検証時、Chrome headlessの`--window-size`が最上位ウィンドウに対して正しく適用されない現象に遭遇し（`window.innerWidth`が指定値と異なる値になる環境依存の不具合）、一時的にiframeで固定幅を強制して検証することで実装自体は正しいことを確認した（詳細はPATTERNS.md参照）

## 2026-07-24 research（修正：プロジェクトのタイトルを写真+本文の上に独立配置）
- ユーザー提案「タイトルは写真・本文と別に上にあったほうが良いのでは」を受け、research.htmlのprojectsセクションを修正。従来は`__left`（タイトル+タイトルen+写真）と`__right`（本文+タグ+リンク）の2カラム構成でタイトルが写真と同じカラムに属していたが、タイトルを`__head`として全幅で独立させ、その下に`__body`（写真+本文の2カラムgrid）を配置する構成に変更
- research.css：`__item`のgridレイアウトを`__body`に移動（`__item`はpadding/border-bottomのみのシンプルな縦積みコンテナに）。`__head`には新規のmargin-bottom指定を追加せず、`__title-en`の既存margin-bottom（28px）をマージン相殺（collapsing）でそのまま`__head`→`__body`間の間隔として利用
- Chrome headlessでレンダリングし、タイトル全幅化とレイアウト崩れが無いことを確認

## 2026-07-24 staff（修正：メンバーの学位表記追加）
- 教授の`name-en`（"Koji Sasaki, MD, PhD"）と同じ形式で、メンバーカードにも学位を追記。野上彩子・叶内匡は「, MD, PhD」、渡部悟は「, PhD」を`sect-staff-members__name-en`に追加

## 2026-07-24 全ページ横断（命名規則変更：識別コード撤廃）
- ユーザーが `claude/CLAUDE.md` の命名規則を改訂（「識別コード」`sasaki-lab` の概念を撤廃）。新ルール：セクションは `sect-{section-name}`、画像は `{section-name}_{image-type}{number}.{ext}`、複数ページ共通画像は `common_{image-type}{number}.{ext}`。既存3ページ（index/research/staff）とその画像・設計書を新ルールに合わせて修正
- クラス名：`sect-sasaki-lab-accent-bar` → `sect-accent-bar`（共通）。index.html固有セクションは「トップページ」を表す`top-`を付与（例 `sect-sasaki-lab-hero` → `sect-top-hero`、`sect-sasaki-lab-profile` → `sect-top-profile`、`sect-sasaki-lab-divider-1〜3` → `sect-top-divider-1〜3`、`sect-sasaki-lab-research` → `sect-top-research`、`sect-sasaki-lab-news` → `sect-top-news`）。research.html/staff.htmlは元々セクション名に`research-`/`staff-`を含んでいたため識別コードを外すのみ（例 `sect-sasaki-lab-research-projects` → `sect-research-projects`、`sect-sasaki-lab-staff-members` → `sect-staff-members`）
- 画像リネーム：`sasaki-lab-hero_bg1.jpg`→`top-hero_bg1.jpg`、`sasaki-lab-divider_bg1〜3.jpg`→`top-divider_bg1〜3.jpg`、`sasaki-lab-common_pht1.jpg`→`common_pht1.jpg`、`sasaki-lab-research-hero_bg1.jpg`→`research-hero_bg1.jpg`、`sasaki-lab-research-projects_pht1〜3.png`→`research-projects_pht1〜3.png`、`sasaki-lab-staff-hero_bg1.png`→`staff-hero_bg1.png`、`sasaki-lab-staff-members_pht1〜3.jpg`→`staff-members_pht1〜3.jpg`。HTML/CSS（url()参照含む）の該当パスもすべて修正
- `design/page-index.md`・`design/page-research.md`・`design/page-staff.md` 内の「識別コード：sasaki-lab」の記載・旧クラス名・旧画像名もあわせて新ルールに修正（今後のcorporate/education/clinical/contact設計時に古い規則を参照しないようにするため）
- 修正後、Chrome headlessで index.html / research.html / staff.html を再レンダリングしスクリーンショットで見た目に変化が無いことを確認。HTMLタグの開閉数も一致することを確認
- 過去のCHANGELOG/PATTERNS内の「識別コード」記述は当時の事実として原文のまま残す（このエントリが命名規則移行の記録）

## 2026-07-24 staff（修正：hero部分の高さがデモより低い件）
- 「デモよりhero部分の高さが低い」との指摘を受け、Chrome headlessでstaff.htmlとdrafts/existing/staff.htmlをそれぞれレンダリングしピクセル比較。CSSの`.page-hero{height:460px}`自体は両者一致していたが、デモは`.page-hero`に対してJSで`margin-top = ヘッダーの高さ`をインラインで設定しており、固定ヘッダーとheroが重ならず、heroがヘッダー分下に押し出される実装だった（ヘッダー＋heroの合計見た目の高さがデモ520px、こちら460pxで約60px＝ヘッダー高さ分の差）。過去のPATTERNS.md記載「固定ヘッダーはbodyをオフセットせずhero画像に重ねる」はindex.htmlのhero（`.sect-sasaki-lab-hero`、demoでは実際にヘッダーが重なる仕様）についての正しい調査だったが、内側ページの`.page-hero`（research/staff等）については別実装（オフセットあり）だったことを見落としていたことが判明。該当のPATTERNS.mdの記述はこの区別を明記する形に修正が必要（要追記）
- `assets/js/nav.js`にデモと同じ`setHeroOffset`処理を追加（`.site-header`の実測高さ分だけ`.page-hero`にmargin-topを設定。`.page-hero`が存在しないindex.htmlでは何もしない）。common.css/nav.jsは全ページ共通で読み込まれるため、この修正はresearch.html等の他の内側ページにも同時に反映される
- Chrome headlessでの修正後スクリーンショットとピクセル解析により、ヘッダー下からのhero高さがデモとほぼ一致（誤差2px程度）することを確認

## 2026-07-24 staff（再々修正：hero画像のz-index／上下端配置は教授ではなくメンバーカード側）
- 「pngが1番上に表示されるようz-indexを直して」の指摘を受け調査。原因は`.page-hero`がposition:relativeのみでz-indexを持たずスタッキングコンテキストを生成していなかったため、子の`.page-hero__img`（z-index:-1）が`.page-hero`自身の背景色（前回追加した#002144）より下に沈んでいた。common.cssの`.page-hero`に`z-index:0`を追加してスタッキングコンテキストを生成し、img（背景色より上）→::before（オーバーレイ）→page-hero__inner（テキスト）の正しい重なり順に修正（デモのCSSにも同じz-index:0の指定があり、common化時の見落としだった）
- 「教授ではなくメンバーのプロフィールカードの指摘だった」との訂正を受け、前回PI profile（sect-sasaki-lab-staff-profile）に加えた変更（div分割・flex space-between化・PC gridレイアウト化）を完全に元へ戻した
- 本来の対象であるメンバーカード（sect-sasaki-lab-staff-members__card）側に「本文（氏名+所属）を上端、リンクを下端に配置」を実装。カード全体のalign-items:flex-startは廃止し、代わりに写真だけ`align-self:flex-start`で個別に stretch から除外（aspect-ratioを保護する目的は維持）。テキスト側は既定のstretchでカードの高さいっぱいに広がるようにし、内部をflex-column+justify-content:space-betweenにして氏名/所属ブロックとリンクブロックを上下に配置。リンクが無い渡部氏のカードでは単に上端に寄る（意図通り、リンクが無ければ何も下端に来ない）

## 2026-07-24 staff（再修正：hero画像は.pngのまま・背景色追加／プロフィール本文とリンクの上下端配置）
- 前回「hero画像が表示されない」の修正で.pngから.jpgに差し替えたが、ユーザーより「.pngは線画の透過画像で、背景色を敷いて表示する仕様」と訂正を受けた。.jpg差し替えは取り消し、staff.htmlのimg srcを`sasaki-lab-staff-hero_bg1.png`に戻した（未使用になった`sasaki-lab-staff-hero_bg1.jpg`は元の`hero_staff.jpg`に戻して破棄）
- drafts/existing の全6ページの`.page-hero`が共通で`background:#002144`を持っていたことをgrepで確認（common.css実装時の見落とし）。common.cssの`.page-hero`に`background:#002144`を追加。この共通パーツを使う全ページ（staff/研究以降の内側ページ）に影響する修正
- プロフィールカード（PI profile）で「本文とリンクをコンテンツの上下端に配置」の指摘を受け、`.sect-sasaki-lab-staff-profile__text`をflex-column化し、内部を「本文をまとめたdiv」と「リンク」の2ブロックに分割してjustify-content:space-betweenで上下に振り分ける構成に変更（research.cssのprojects__rightと同じ既存パターンを踏襲）。あわせてPCレイアウトをflex rowからgrid（grid-template-columns:40% 1fr）に変更し、写真列とテキスト列の高さを揃えて余白ができるようにした（gridはデフォルトでalign-items:stretchのため）
- HTML側で本文3要素（name/affiliation/bio）を`<div>`でグルーピングし、`<a>`をそのdivの兄弟要素にする構造に変更

## 2026-07-24 staff（修正：hero画像/フェードイン/プロフィールリンク間隔）
- ユーザー指摘「hero画像が表示されない」を調査した結果、design/page-staff.mdで指定していた`assets/img/hero_staff.png`（→リネーム後`sasaki-lab-staff-hero_bg1.png`）が実質白紙（透過/空）の壊れたファイルだったと判明。同じディレクトリに実写真の`hero_staff.jpg`（2MB、staff.pngは33KB）が存在していたためこちらを採用し、`sasaki-lab-staff-hero_bg1.jpg`にリネームしてstaff.htmlのimg srcを差し替え
- 同様の.png/.jpg併存パターン（hero_clinical/hero_education/hero_contactにも両方存在）を確認したところ、hero_clinical.pngも同じく白紙だった。今後corporate/education/clinical/contactページ実装時は、hero画像を使う前に必ず実際に画像を開いて中身を確認する（詳細はPATTERNS.md参照）
- ユーザー指摘「スクロールで表示される動きは不要」を受け、staff.htmlから`fade-up`クラスと`assets/js/fade-up.js`の読み込みを削除（common.css側の`.fade-up`定義・fade-up.js自体は他ページ（research.html等）で使用中のため変更しない）
- ユーザー指摘「プロフィールカードのテキストとリンクを離す」を受け、`.sect-sasaki-lab-staff-profile__link`のmargin-topを28px→48pxに拡大

## 2026-07-24 staff（コーディング）
- design/page-staff.md に沿って staff.html / assets/css/staff.css を実装
- common.css に `.content-panel`（背景 var(--color-surface) ＋ padding-block 56px/80px）を新規追加
- research.html / research.css をリファクタし、lead + projects セクションを1つの`.content-panel > .content-wrap`で包む構成に統一（見た目は変更なし。padding-blockのハードコードを撤去し、lead側は下端56pxのpadding-bottomのみ残した）
- 画像リネーム：hero_staff.png → sasaki-lab-staff-hero_bg1.png／staff_nogami.jpg → sasaki-lab-staff-members_pht1.jpg／staff_kanouchi.jpg → sasaki-lab-staff-members_pht2.jpg／staff_watanabe.jpg → sasaki-lab-staff-members_pht3.jpg／sasaki-lab-profile_pht1.jpg → sasaki-lab-common_pht1.jpg（index.html側のimg srcもあわせて修正）
- profile/membersブロック間のpadding調整（24px上書き）は、HTMLにクラスを増やさず `.content-panel:has(.sect-sasaki-lab-staff-profile)` / `:has(.sect-sasaki-lab-staff-members)` で実現
- メンバーカードは設計書どおり align-items:flex-start を明示指定。写真の顔クロップ位置（野上・叶内の2名分）はデモのobject-position実測値を`:nth-of-type`で再現
- 集合写真セクションはデモに合わせて非実装、関連リンク0件（渡部氏）はリンクブロック自体を出力しない対応
- ブラウザで表示確認（file:// で直接オープン。自動スクリーンショットは本機にNode/Python環境が無いため未実施、タグの開閉整合性チェックとデモ数値の突き合わせで代替）

## 2026-07-24 staff（設計）
- drafts/existing/staff.html を実HTML構造まで確認し、design/page-staff.md を作成
- `.content-panel`（背景色+上下padding 80px/56px）が drafts/existing 全7ページ（index含む）で使われている共通パターンであることをgrepで確認し、common.css側に新規共通化する方針とした（research実装時に見落としていたもの。research.cssもあわせて軽くリファクタ予定）
- ユーザー確認の上で決定した2点：
  1. デモでコメントアウトされている「集合写真」セクション（実画像はassets/imgに存在）は、デモの現状（非表示）に合わせて本ページでも実装しない
  2. 教授プロフィール写真（index.htmlのprofileセクションと共用）は`sasaki-lab-common_pht1.jpg`にリネームし、index.html側の参照もあわせて修正する
- メンバーカード（写真+テキスト横並び）は、research projectsで踏んだ「align-items:stretchでaspect-ratioが潰れる」バグを未然に防ぐため、align-items:flex-startを明示指定する方針をあらかじめ設計書に明記
- セクション構成：header(共通) → page-hero(オーバーレイあり・標準仕様) → accent-bar → content-panel[ profile(fluid) / members(rack+fluid×3) ] → footer(共通)
- 次はコーディングフェーズ（新しいセッションで docs/workflow-coding.md）

## 2026-07-24 research（修正：スクロールフェードインが機能していなかった件）
- ユーザーから再度「スクロール時の動きが実装されていない」と指摘。前回common.cssに実装したCSSのみのスクロール駆動アニメーション（`animation-timeline:view()`）は、ブラウザの対応状況が実運用に耐えるほど十分ではなく機能していなかったと判断
- CLAUDE.mdの「CSSで代替不可能な場合のみJSを使う」という例外規定に従い、元デモと同じ実績のある方式（IntersectionObserver）に切り替え
  - common.cssの`.fade-up`を「初期状態opacity:0+translateY(28px)、`.is-inview`付与でtransitionにより表示」というtransitionベースの定義に変更
  - `assets/js/fade-up.js`を新規作成（IntersectionObserverで`.fade-up`要素の交差を検知し`is-inview`クラスを付与する最小限のJS。IntersectionObserver非対応環境では即座に表示するフォールバック付き）
  - research.htmlに`<script src="assets/js/fade-up.js">`を追加
- ヘッドレスChromeのフルページスクリーンショットでJSエラーなく全コンテンツが表示されることを確認（IntersectionObserverの実際のスクロール挙動は本機での自動検証が困難だったため、目視確認をユーザーに依頼）
- 詳細は logs/PATTERNS.md 参照

## 2026-07-24 research（修正：projectsのカラム構造の誤り）
- ユーザー指摘「画像のサイズは直ったが配置がおかしい。タイトルの下に画像とテキストが並ぶはず」を受けて再修正
- 原因：design/page-research.md 作成時に、drafts/existing/research.html の実際のHTML構造（`.project-left`＝タイトルja/en+写真を縦積み、`.project-right`＝説明文+タグ+View Moreを下寄せ、の2カラムgrid）を「zone:photo」「zone:text（タイトルも含む）」という誤った2分割で設計書化してしまい、そのまま実装まで引き継いでいた
- 修正：research.html を `__left`（タイトルja/en＋写真）／`__right`（説明文＋タグ＋View More、flex-column+justify-content:space-betweenでリンクを下端に揃える）の2カラムgrid構造に書き換え。research.css・design/page-research.md も実際の構造に合わせて修正
- 前回修正した`align-items:flex-start`のハックは不要になったため削除（写真が独立したaspect-ratio要素として親.leftの中に収まる構造になり、隣列の文章量に引き伸ばされる問題が構造的に発生しなくなったため）
- Chromeヘッドレススクリーンショット（PC/SP）で、タイトル→写真→説明文の正しい並びを確認
- 詳細は logs/PATTERNS.md 参照

## 2026-07-24 research（修正：画像クロップ崩れ・スクロールフェードイン復元）
- ユーザー指摘「画像のサイズと配置がおかしい」「スクロール時のフェードで表示される動きが無い」を受けて修正
- 画像クロップ崩れ：`.sect-sasaki-lab-research-projects__item`（PC・flex-direction:row）に`align-items`未指定で既定のstretchが効き、写真ボックスが隣接するテキスト量に応じて縦に引き伸ばされ、`aspect-ratio:4/3`が実質無効化されて画像が大きくクロップされていた。`align-items:flex-start`を追加して修正
- スクロールフェードイン：デモはJS（IntersectionObserver）で`.project-item`に`visible`クラスを付与する実装だったが、コーディング時に未実装のまま漏れていた。CLAUDE.mdの「CSSで代替可能ならJSを使わない」方針に沿い、JSを使わずモダンCSSのスクロール駆動アニメーション（`animation-timeline:view()`）で実装。common.cssに`.fade-up`ユーティリティとして追加し、lead文・projectsの各item・cta-blockに付与（未対応ブラウザでは行が無視され、fill-mode:bothによりページ読込時に通常表示されるだけでコンテンツが非表示のまま固まることはない）
- Chromeヘッドレススクリーンショット（PC 1440px／SP 390px）で修正を確認。Node/Playwrightが無い環境のため、ローカルのGoogle Chrome/Edgeを`--headless=new --screenshot`で直接起動して検証した
- 詳細は logs/PATTERNS.md 参照

## 2026-07-24 research（コーディング）
- design/page-research.md に沿って research.html / assets/css/research.css を実装
- common.css に新規共通パーツを追加：`.page-hero`（bleed+board、内側6ページ共通）・`.content-wrap`（max-width:1100px）・`.cta-block`（寄付等の呼びかけ、文言はHTML側）
- `.sect-sasaki-lab-accent-bar` を index.css からcommon.cssへ移設（クラス名・見た目は不変。index.htmlは変更なし）
- 画像を識別コード命名にリネーム：hero_research.jpg → sasaki-lab-research-hero_bg1.jpg、研究テーマ写真3点 → sasaki-lab-research-projects_pht1〜3.png（元ファイルは残置、リポジトリ内に併存）
- セクション構成：header(共通/is-current付与) → page-hero(オーバーレイ無し) → accent-bar → lead(rack) → projects(fluid×3・写真+テキスト+tags(shelf)+View More) → cta-block → footer(共通)
- 実装後、drafts/existing/research.html・staff.html・corporate.html・education.html・contact.html を横断grepし、page-hero/cta-block/content-wrapの実測CSS値（フォントサイズ・line-height・margin・padding・text-shadow・オーバーレイのgradient値等）を再確認し、最初の実装値とズレていた箇所（projectタイトルのfont-size等）を実測値に合わせて修正
- ブラウザで表示確認（file:// で直接オープン。自動スクリーンショットは本機にNode/Playwright環境が無いため未実施、目視確認とデモ数値の突き合わせで代替）

## 2026-07-24 research（設計）
- drafts/existing/research.html と、他の内側ページ（staff/corporate/education/clinical/contact）を突き合わせ、design/page-research.md を作成
- page-hero・accent-bar・cta-blockが複数ページで共通利用されている構造であることを確認し、common.css側の共通パーツとして新規追加する方針をユーザーと確認
- content-wrap（コンテンツ幅）は index.html のみ860pxの例外で、他の内側ページ6枚は共通1100pxであることを確認。common.cssに`.content-wrap`（1100px）を新規追加し、index側の860px実装は変更しない方針をユーザーと確認
- セクション構成：header(共通) → page-hero → accent-bar → lead(rack) → projects(fluid×3) → cta-block → footer(共通)
- 画像リネーム方針：hero_research.jpg → sasaki-lab-research-hero_bg1.jpg、研究テーマ写真3点 → sasaki-lab-research-projects_pht1〜3.png
- 次はコーディングフェーズ（新しいセッションで docs/workflow-coding.md）

## 2026-07-23 index（修正5回目：ヘッダー/フッターの高さ）
- `.site-header`の固定height（`--header-height:64px`という独自の決め打ち値）を撤廃し、デモ同様nav-brand/nav-itemのpaddingだけで自然に高さが決まる作りに変更
- `.site-header__inner`/`.site-footer`にline-height:1.3を明示し、bodyのline-height:1.7がヘッダー/フッターの短いテキストに継承されて間延びしていた問題を修正
- SPのnav-linksドロップダウンは`--header-height`依存の固定top値をやめ、`position:absolute; top:100%`（親.site-headerがposition:fixedのため追従可能）に変更。max-heightもデモ準拠の70vhに変更
- 未使用になった`--header-height`トークンを削除
- 詳細は logs/PATTERNS.md 参照

## 2026-07-23 index（修正4回目：EN表記・footer構造・section-title-ja太字）
- ヘッダーに「EN」（.nav-lang、デモ準拠の見た目のみ・実機能なし）を追加
- フッターの構造をデモに合わせて修正：footer-name/univ/copyを1つの縦積みカラムに統一し、copyはmargin-topで区切るのみに変更（PCで右寄せグループ化していた誤りを修正）。design/page-index.mdの「PC:横並び」記述も修正
- .section-title-ja が h2 の中にあるため既定で太字になっていた問題を修正（font-weight:400を明示）
- 詳細は logs/PATTERNS.md 参照

## 2026-07-23 index（修正3回目：フォント再確認）
- common.css の `h1,h2,h3,h4{font-family:var(--font-heading)}`（Inter一律適用）を撤廃し、既定は本文と同じ Noto Sans JP（--font-base）に変更。デモでInterを使うのはhero大見出し1箇所のみと確認し、そこだけ個別指定
- section-title-en のフォントも Inter → Noto Sans JP に修正
- hero title-ja のフォントサイズをSP/PCで変えていた誤りを修正（デモは常に0.875rem固定）
- 細部：nav-brand-ja の letter-spacing、footer-copy の opacity をデモの値に合わせて微調整
- 詳細は logs/PATTERNS.md 参照

## 2026-07-23 index（修正2回目：ヘッダー/フッター幅・hero表記・セクション順序・研究カード配色）
- header/footer：.container（中央寄せ）を撤廃し、デモ通り画面幅いっぱい＋padding-inlineのみに変更
- hero：description をデモの英文（"Decoding blood cancers...）に修正し、デモに存在しないCTAボタンを削除
- セクション順序をデモ実物に合わせて修正：hero→accent-bar→profile→divider-1(bg1)→research→divider-2(bg2)→news→divider-3(bg3)→footer（旧実装はdividerがcontentの前に来ており、bg-zoneの出現位置がずれていた）
- research セクションに profile/news と同じ surface 背景色を追加し、見た目の統一感を修正
- design/page-index.md も上記の正しい順序・hero内容に合わせて修正
- 詳細は logs/PATTERNS.md・logs/ERRORLOG.md 参照

## 2026-07-23 index（修正：デモへの忠実度向上）
- ユーザー指摘「不要な部分が増えている／デモに忠実でない」を受けて修正
- common.css：未使用トークン（navy-mid/navy-light/font-serif/font-display）と未使用フォント読み込み（Noto Serif JP / DM Serif Display）を削除。layout-system由来の汎用ユーティリティクラス（.fluid/.shelf/.tile/.rack/.board）を削除し、各セクション固有クラスに書き直し
- 固定ヘッダー：body の padding-top オフセットを廃止し、デモ同様にhero画像へ半透明で重なる実装に変更
- index.css：デモ（drafts/existing/index.html）の実測値に合わせて全面調整（hero/divider/profileの余白・フォントサイズ・写真幅96px・profileをgridレイアウト化）。欠けていた装飾（accent-bar、prof-divider）を追加
- 詳細は logs/PATTERNS.md・logs/ERRORLOG.md 参照

## 2026-07-23 index（コーディング）
- design/page-index.md に沿って index.html / assets/css/index.css を実装
- common.css を初期構築：デザイントークンを navy/gold の学術系配色に設定、Google Fonts（Noto Serif JP / Noto Sans JP / Inter / Oswald / DM Serif Display / Roboto）をCDN読み込みで採用
- ヘッダーは全ページ共通で position:fixed の半透明ヘッダー（スクロールでの濃色化JSは採用せず、常時同一背景色に簡略化）。SPはハンバーガーメニュー（assets/js/nav.js、開閉のみの最小限JS）
- common.css に layout-system 準拠のレイアウトユーティリティ（.fluid / .shelf / .tile / .rack / .board）を追加し、全ページで再利用可能にした
- セクション構成：header(共通) → hero(bleed+board) → divider-1(bleed) → profile(fluid) → divider-2(bleed) → research(tile--3) → divider-3(bleed) → news(rack) → footer(共通)
- 画像を idx- 接頭辞から識別コード sasaki-lab- にリネームして反映（PATTERNS.md参照）
- ブラウザで表示確認（file:// で直接オープン）

## 2026-07-23 index
- 新規プロジェクト初期化完了（識別コード：sasaki-lab）
- drafts/existing/index.html（既存HPデモ）を参照し、design/page-index.md を作成
- セクション構成：hero(bleed) → divider-1(bleed) → profile(fluid) → divider-2(bleed) → research(tile) → divider-3(bleed) → news(rack)
- 画像は idx- 接頭辞のまま配置済み。コーディング段階で sasaki-lab- にリネーム予定
