# 佐々木研究室HP

# PATTERNS.md

再利用可能なレイアウト・知見、修正理由や今後の注意点を記録する。  
ユーザーから修正指摘を受けた場合は、同じミスを防ぐルールをここに記録する。

記録形式（新しいものを上に追記）：

    ## {タイトル}
    - 状況：
    - 知見 / ルール：
    - 適用先：

## 1つのcontent-panelに複数セクションを詰め込むと、境目が無く「くっついて見える」ことがある
- 状況：education実装で、policy（研究室の教育方針）とfaq（FAQ）を設計書どおり同じ1つの`content-panel`（標準背景）にまとめて実装したところ、ユーザーから「研究室の教育方針とFAQがくっついてしまっているので、別コンテンツとして離して背景色も変えて」と指摘された。同じ背景色のパネル内に見出しの異なる2セクションを並べると、余白だけでは十分な区切りとして機能しない場合がある。
- 知見 / ルール：性質の異なる2つ以上のセクションを1つの`content-panel`にまとめる設計にする場合、実装後に「本当に1つの塊として自然に見えるか」を確認する。くっついて見える場合は、`content-panel`を分割し、standard/darkを交互に配置して背景色で区切りを作る（このサイトは元々隣接パネルの境目を`.content-panel.dark`の僅差の背景色で示す設計のため、区切りたい箇所ごとにパネルを分けるのが素直な解決策）。設計書に「◯◯+◯◯を1つのpanelにまとめる」と書いてあっても、それは絶対ではなく実装結果を見て調整してよい。
- 適用先：複数セクションを1つのcontent-panelにまとめる設計を持つ全ページ（clinical/contact実装時も、隣接セクションの見た目の区切りを実装後に確認する）

## hero画像でjpg/pngが併存する場合はpngを優先する（ユーザー方針として確定）
- 状況：education実装時、設計段階では「jpg版は紺地に線画が焼き込み済みで単体表示でも崩れない」という理由でjpgを採用し、透過pngは不使用のまま残置する方針にしていた。しかしユーザーから「hero部分は、pngがある場合はpngを優先して使ってください」と明確な指示があり、jpgではなくpngを採用する方針に修正した（`education-hero_bg1.jpg`→`education-hero_bg1.png`に差し替え）。
- 知見 / ルール：hero画像でjpg/pngが同名で併存している場合、"崩れないから""安全だから"という理由でjpg（フル画像）を安易に選ばず、pngが存在するなら基本的にpngを優先して採用する。pngは透過線画のことが多く、`.page-hero{background:#002144}`（common.css）と組み合わせて表示される設計になっている（下記「assets/img内で同名.png/.jpgが併存する場合〜」の知見と合わせて、pngが壊れているように見えても即座にjpgへ逃げない）。
- 適用先：clinical.html・contact.html実装時（hero_clinical.png/hero_contact.pngが既に存在するため、同様にpngを優先して採用する）

## section-head の英日大小関係はページごとに異なる場合がある。common.cssは変えずページ側でスコープを絞って上書きする
- 状況：education.html設計時、デモ(drafts/existing/education.html)の見出しは日本語が大・英語が小（研究/企業ページと逆）だった。common.cssの`.section-title-en`(大)/`.section-title-ja`(小)はresearch/corporate準拠で固定済みのため、そのままだとeducationのデモ再現ができない。ユーザーに確認し「デモ通り日本語を大きくする」方針で確定。
- 知見 / ルール：デモ間で英日の大小関係が逆転しているケースは、common.cssの共通クラス自体を変えず（他ページに影響するため）、該当ページの`.pg-{page} .sect-{name} .section-title-en/.section-title-ja`のようにセクション単位でスコープを絞ってフォントサイズのみ上書きする。テキストの`title-en`/`title-ja`への割り当て自体は「英語→en／日本語→ja」で統一し続け、割り当てを入れ替えない（クラス名とテキスト言語の対応がずれると保守時に混乱するため）。
- 適用先：education.css（sect-education-undergrad/admission/policyの3セクションのみ上書き、sect-education-faqは英語=大のままでデモと一致するため対象外）。今後同様のズレが他ページのデモにもあれば同じ手法で対応する。

## スクロールフェードイン（fade-up）は index.html と research.html のみ。他の下層ページには付与しない
- 状況：staff.html実装時にユーザーから「スクロールで表示される動きは不要」と指摘されfade-upを削除した。その後corporate.html実装時にデモに合わせてfade-upを一旦付与したところ、改めて「下層ページはresearch以外スクロール時の動きは不要」と方針が明確化された。
- 知見 / ルール：fade-up（`assets/js/fade-up.js`＋`.fade-up`クラス）は、トップページ（index.html）と研究内容ページ（research.html）にのみ使う。それ以外の下層ページ（staff/corporate/education/clinical/contact）は、たとえdrafts/existingのデモ側にfade-up相当の演出があっても実装しない（デモより実際のユーザー方針を優先する）。新規ページの実装時、最初からfade-upクラスやscriptタグを付けない。
- 適用先：education.html・clinical.html・contact.html の実装時（コーディング開始時点でfade-up不使用を前提にする）

## デモの複数のnavy系トークン（--navy/--navy-mid/--navy-light）を見分けずに使わない。値は毎回:root定義に当たって裏取りする
- 状況：index v4実装時、news-listの枠線色をデモの「`--navy-light`」だと思い込み、うろ覚えで近い色`#1A3557`をそのまま採用したが、実際に:root定義を確認すると`--navy-mid:#1A3557`／`--navy-light:#2B4E7A`であり、`--navy-light`は`#2B4E7A`だった。取り違えたまま実装し、corporate実装時にcollab-item-linkの色を確認するため改めてデモの:rootを見直したことでミスが発覚した。
- 知見 / ルール：このデザインの配色トークンには見た目が近い暗い青系が3種（`--navy` #0B1F3A／`--navy-mid` #1A3557／`--navy-light` #2B4E7A）あり、目視や記憶だけでは取り違えやすい。ページ固有CSSで`var(--navy-light)`のような値をハードコードで再現する際は、都度該当デモの`:root{}`定義を実際にgrepして数値を確認し、名前だけで「だいたいこの色」と推測しない。
- 適用先：navy系トークンを使うデモの値をページ固有CSSに書き写す全ての場面（education/clinical/contact実装時も同様に確認する）

## 閉じた<details>の中身を「PCでは常時表示」にしたい場合、display上書きだけでは足りない（content-visibility:hiddenで隠されている）
- 状況：index（トップページ）のprofile本文で、SPのみ「全文を読む」で開閉し、PCでは常に全文表示にしたい要件があった。CLAUDE.mdの方針（アコーディオンは`<details>/<summary>`）に従い`<details>`で実装し、PC用に`.more summary{display:none}`＋`.more p{display:block}`でclosed状態でも中身を強制表示させようとしたが、実際には表示されなかった。原因はChromeがclosedな`<details>`の非summary子要素を`content-visibility:hidden`で隠しており（`display:none`ではない）、`display`だけを上書きしても効果が無かったため。`content-visibility:visible`を明示的に追加しても改善しなかった（要再検証・原因未特定の部分あり）。
- 知見 / ルール：`<details>`のclosed状態の中身をCSSだけで「特定のブレークポイントでは常時表示」にしようとするのは避ける。確実な代替策は、SP用の`<details>`（開閉あり）とPC用の通常要素（`<p>`等、常時表示）を別々にDOMへ用意し、`display:none`の出し分けで見せる/隠すブレークポイントを制御する方式（内容が重複するので、コメントで「文面を揃えること」と明記する）。`<details>`はあくまで「実際に開閉が必要な状態」でのみ使い、「常に開いた状態」を前提にした強制表示のハックは信頼しない。
- 適用先：`<details>/<summary>`でSP限定の開閉UIを作り、PCでは常時展開したい全ての場面

## position:relativeだけではスタッキングコンテキストは生成されない。z-index:-1の子を独立させたいなら親にもz-index:0が要る
- 状況：`.page-hero`に`background:#002144`を追加したところ、`z-index:-1`で背面に置いていた`.page-hero__img`が逆にその背景色の下に隠れて見えなくなった。`.page-hero`は`position:relative`のみでz-indexを指定しておらず、スタッキングコンテキストを生成していなかったため、子の`z-index:-1`が「.page-hero自身の背景より下」ではなく「.page-hereが属する外側の祖先コンテキストの負の層」まで沈み込み、.page-hero自身の背景（z-index:autoな要素として外側コンテキストのz-index:0相当の層に属する）より下に描画されてしまっていた。
- 知見 / ルール：ある要素の背景の上に、負のz-indexを持つ子要素だけを重ねて表示したい場合（画像を最背面に置きつつ、その要素自身にも背景色を敷くパターン）、親要素は`position:relative`だけでなく`z-index:0`（など auto以外の値）も明示し、必ずスタッキングコンテキストを生成させる。デモのCSSに`position:relative;z-index:0;`のようにzindexが併記されていた場合、それを「冗長な指定」と判断して省略しない（意味のある指定である可能性を疑う）。
- 適用先：`.page-hero`のようなbleed+board構成（背景色/背景画像＋z-index:-1の要素＋オーバーレイ＋前面テキスト）を使う全ページ

## flex行内で1つの子要素だけstretchから除外したい場合は、親のalign-itemsではなくその子のalign-selfを使う
- 状況：メンバーカード（写真+テキスト横並び）で「テキスト側を上下端いっぱいに広げて内容を上寄せ・リンクを下寄せにしたい」という要望と、「写真はaspect-ratioを保ったまま伸縮させたくない（既存のPATTERNS参照：align-items:stretchで写真が潰れる）」という制約が両立する必要があった。親のalign-itemsを一括でflex-startにすると写真は守れるがテキスト側が伸びず上下端配置ができず、逆にstretchのままだと写真が潰れる、という二択に見えた。
- 知見 / ルール：親の`align-items`はデフォルトの`stretch`のままにしておき、伸ばしたくない特定の子要素（aspect-ratio等で高さを固定したいもの）にだけ`align-self:flex-start`を指定する。こうすることで、その子だけstretchから除外されつつ、他の兄弟（テキスト側等）は行の高さいっぱいにstretchされる。「一部の子要素だけ挙動を変えたい」場面では、親のalign-itemsで全体を制御しようとする前に、対象の子のalign-selfで個別に上書きできないか検討する。
- 適用先：写真+テキストの横並びカードで、写真側は比率固定・テキスト側は高さいっぱいに使って上下配置したい全ての場面

## position:absoluteの幅をコンテンツにフィットさせつつ上限を付けたい場合はwidth:fit-content + max-width。ただし子要素のpercentage幅に注意
- 状況：SPのハンバーガーメニュー（`.nav-links`）を「最小:文字が全部見える幅、最大:画面半分」にしたく、`left:0;right:0`（画面幅いっぱい）をやめて`right:0`のみ＋`width:fit-content;max-width:50vw;`に変更した。この時、子要素の`.nav-item`に残っていた`width:100%`が原因で、`fit-content`の計算がコンテンツの実際の文字幅を使えず、メニューが数十pxまで潰れる不具合が出た。
- 知見 / ルール：`width:fit-content`（またはposition:absoluteでleft/rightの片方だけ指定した際の自動shrink-to-fit）で子孫のテキスト幅から自動サイジングしたい場合、その子孫（および祖先）にpercentage指定のwidthが挟まっていないか確認する。percentage幅は「親の確定した幅」に依存するため、親をfit-contentで決めようとしている状況とは循環参照になり、多くのブラウザでその子は自身のテキスト幅をfit-content計算に正しく反映できない。対象要素とその直接の子には`width:auto`（またはwidth指定なし）を保ち、必要なら`white-space:nowrap`で折り返し禁止を明示する。
- 適用先：フローティングメニュー・ツールチップなど、コンテンツ幅に自動フィットさせたい全てのUI

## Chrome headlessの`--window-size`は最上位ウィンドウに対して不安定なことがある。狭い幅の検証はiframeで固定する
- 状況：ハンバーガーメニューの幅修正を検証する際、`chrome --headless(=new) --window-size=400,1000 --screenshot=...`で撮ったスクリーンショットでは、出力PNGは指定通り400x1000pxなのに、ページ内JSで`window.innerWidth`を測ると500になっており、`right:0`で配置した要素が画面右端からはみ出して見える（実際には正しく配置されているが、Chromeが実際に使っているレイアウト用ビューポート幅と、書き出されるスクリーンショットの画素幅が一致しない）という現象に遭遇した。800pxなど大きめのwindow-sizeでは横スクロールバー分（約18px）を除いた妥当な値が返り、400px前後の小さい値でだけ乖離が大きかった。
- 知見 / ルール：Chrome headlessで狭い（スマホ相当の）ビューポートを`--window-size`で厳密に検証したい場合、値をそのまま信用せず、まずページ内で`window.innerWidth`をデバッグ表示させて実際のレイアウト幅を確認する。ズレている場合は、`<iframe style="width:390px;height:800px">`で対象ページを埋め込んだラッパーHTMLを別途用意し、そのiframe越しに検証すると、iframeの内部ビューポートは指定した幅に正しく固定されるため信頼できる。
- 適用先：Chrome headlessで狭いビューポート（SPレイアウト）のレンダリングを検証する全ての場面

## assets/img内で同名.png/.jpgが併存する場合、.pngは「背景色に乗せて使う透過線画」の可能性がある（安易に壊れたファイル扱いしない）
- 状況：staff実装で設計書どおり`hero_staff.png`を使ったところ、hero部分の背景画像が表示されない（真っ白）ように見えたため、当初「pngの中身が空の壊れたファイル」と誤って判断し、同名.jpg（フル写真）に差し替えてしまった。しかしユーザーから「pngは線のみの透過画像で、背景色を敷くことで表示される仕様の画像」と訂正を受けた。実際は`.page-hero{background:#002144}`という背景色指定がcommon.css実装時に漏れていたのが真因で、pngファイル自体は正常（意図的な透過デザイン）だった。
- 知見 / ルール：assets/img内の画像が「真っ白/何も見えない」ように見えても、ファイルが壊れていると即断しない。透過PNGは背景色が無ければ何も表示されないのが正常な挙動であるため、まず該当要素（page-hero等）に指定されるべき`background`が実装から漏れていないか（drafts/existing側で該当セレクタをgrepして裏取りする）を先に疑う。ファイルサイズが小さい.pngが同名.jpgと併存している場合、それは「壊れた版」ではなく「透過素材版」の可能性が高く、対応する背景色とセットで使うのが正しい可能性がある。判断に迷ったら実装を差し替える前にユーザーに確認する。
- 適用先：今後のcorporate/education/clinical/contactページ実装時（hero_clinical.png/hero_education.png/hero_contact.pngなど、.jpgと併存しているhero画像を使う全ての場面。使う前に対応する`background`指定がcommon.css/ページ固有CSSに存在するか確認する）

## 共通パーツの一部だけpaddingを上書きしたい場合、専用クラスを増やす前に`:has()`で狙えないか検討する
- 状況：staff実装で、common.css化した`.content-panel`（profile用/members用の2箇所で使う）のうち片方だけpadding-bottomを、もう片方だけpadding-topを24pxに上書きしたかった。素直にやると`sect-*__panel`のような専用クラスをHTML側に追加することになるが、CLAUDE.mdの「JSやクラスを不必要に増やさずCSS標準機能で完結させる」方針（`:has()`等の例示あり）に立ち返り、`.pg-staff .content-panel:has(.sect-sasaki-lab-staff-profile){padding-bottom:24px}`のように、中身の子孫セレクタで`.content-panel`自体を狙う形にした。HTML側に余計なクラスを一切増やさずに済んだ。
- 知見 / ルール：同じ共通クラス（`.content-panel`等）を1ページ内で複数回使い、それぞれ微妙に違う上書きをしたい場合、HTML側に識別用の専用クラスを追加する前に、中身の子孫要素を目印にした`:has()`セレクタで狙えないか検討する。マークアップを増やさない分、非エンジニアが見たときのHTML構造もシンプルに保てる。
- 適用先：`.content-panel`や`.cta-block`のような複数ページ・複数箇所で使い回す共通ラッパーを、ページごとに微調整したい全ての場面

## common化の判断は毎ページの設計時に必ずやり直す（1ページ実装時の見落としは後続ページで拾う）
- 状況：research実装時、`.content-panel`（背景色+上下padding 80px/56px、6ページ全てで使われるラッパー）が実は index.html を含む全7ページで使われている共通パターンだったにも関わらず、common.css化を見落として research.css 側に直接ハードコードしてしまっていた。staffページの設計時に改めてdrafts/existing全体をgrepし直したことで発覚。
- 知見 / ルール：「common化の判断は複数ページをgrepして確認する」というルール（本ファイル内の別項目）は、1ページ実装時に一度やれば終わりではなく、後続ページの設計のたびに毎回やり直す。前のページで共通化し忘れたパーツがあれば、気づいた時点でcommon.css化し、既存ページ側もリファクタして揃える（見た目は変えない）。
- 適用先：2ページ目以降の設計・実装全て（corporate/education/clinical/contactの設計時も、その時点までに実装済みの全ページを再度grepし直す）

## 「zone分割」で設計書を書く際、デモの実際のHTMLの親子関係を潰さない
- 状況：research.htmlのprojectsセクションで、デモの実HTMLは `.project-left`（h3タイトルja＋pタイトルen＋写真を1つの縦積みカラムに格納）と`.project-right`（説明文＋タグ＋リンク）という2カラムgrid構造だったが、design/page-research.md 作成時に「zone:photo」「zone:text（タイトルもここに含む）」という独立した2ゾーンとして書いてしまった。実際にはタイトルは写真と同じ左カラムに属し、テキスト側（右カラム）には説明文以降しか無い。設計書のこの誤りに気づかないまま実装まで進めてしまい、ユーザーから「タイトルの下に画像とテキストが並ぶはずでは」と指摘されて発覚した。
- 知見 / ルール：「写真＋テキスト」のfluidパターンを設計書に落とし込む際、どの要素がどちらのzone（カラム）に属するかは、デモのHTMLの実際の親要素（div等のグルーピング）をそのまま踏襲する。「タイトルは見出しだからテキストゾーンに違いない」という直感的な再分類をせず、デモのDOM上の親子構造をzoneの単位としてそのまま転記する。
- 適用先：drafts/existing の2カラム構成を持つ全ページ（staff/corporate/education/clinical/contact の設計書作成時も、zone分けの前に対象HTMLの親div構造を先に確認する）

## flexの横並び行で片方だけ aspect-ratio を使う場合、align-items:stretch（既定）で潰れる
- 状況：research.htmlのprojects（PC:写真+テキスト横並びflex-row）で、写真ボックスに`aspect-ratio:4/3`を指定していたが、親`.item`のalign-itemsを何も指定していなかった。flexの既定値align-items:stretchにより、写真ボックス（flexアイテム）は隣のテキスト列（説明文+タグ+リンクで縦に長い）と同じ高さまで引き伸ばされ、`aspect-ratio`は「高さがautoの場合にのみ幅から逆算する」仕様のため、stretchで高さが確定した時点で無効化された。結果、写真が縦に間延びした箱の中でobject-fit:coverにより大きく（左右を）クロップされ、画像内のタイトル文字が欠ける形で表示された。ユーザーから「画像のサイズと配置がおかしい」と指摘されて発覚。
- 知見 / ルール：flex/gridの横並びで、一方の子要素にだけ`aspect-ratio`を使って比率を保ちたい場合、親コンテナに明示的に`align-items:flex-start`（または`align-items:start`）を指定する。align-items:stretch（既定）のままだと、隣の要素の内容量次第でaspect-ratio指定要素が思わぬ高さに引き伸ばされ、内部の画像がobject-fit:coverで過剰にクロップされる。実装時は「文章量が多い側と画像側を横並びにする」パターン全般でこの既定値に注意する。
- 適用先：fluidパターン（画像+テキスト横並び）で片方にaspect-ratio付き画像を使う全ページ

## スクロールフェードイン演出は、CSSのみ(animation-timeline:view())より実績のあるIntersectionObserverを優先する
- 状況：research実装時、まず「CSSで代替不可能な場合のみJSを使う」方針を字義通りに適用し、`animation-timeline:view()`によるCSSのみのスクロール駆動アニメーションで実装した。しかしユーザー環境では実際には動作せず、「スクロール時の動きが実装されていない」と2回指摘された。CSSのみのスクロール駆動アニメーションは仕様として存在するが、2026年時点でも全ブラウザで安定して動くとは限らず、動かない場合の見た目上の失敗モードが「アニメーションしないだけ」で気づきにくい。
- 知見 / ルール：「CSSで代替不可能な場合のみJSを使う」は、机上でCSS実現手段が"存在する"かどうかではなく、その手段が対象ブラウザで実際に安定動作するかどうかで判断する。スクロール連動の表示演出（フェードイン等）は、元デモや既存の実装がJSのIntersectionObserverを使っている場合、それが「CSSでは実務上代替不可能」と判断してJS側を踏襲してよい。真新しいCSS機能（animation-timeline等）を使う場合は、実装後に実機・実ブラウザでスクロールして動作確認するまでは「実装完了」と報告しない。
- 適用先：スクロールでのフェードイン演出を使う全ページ（fade-upクラスはcommon.css側でtransitionベースの定義、`assets/js/fade-up.js`のIntersectionObserverで`is-inview`を付与する構成に統一する）

## common.css化する共通パーツは、実装時にも複数ページのデモを横断grepして数値を裏取りする
- 状況：research実装時、page-hero/cta-block/content-wrapをcommon.css化する判断自体は設計フェーズで既にgrep確認済みだった（下記「common化の判断は〜」参照）が、実装フェーズでは page-research.md の記述（「フォント縮小」等の定性的な指示）だけを頼りに数値（font-size・line-height・margin・text-shadow・オーバーレイのgradient値）を目分量で書いてしまい、後から drafts/existing/*.html の実測CSSと突き合わせたところ project タイトルのfont-size（1.125rem→正しくは1.625rem）や各種margin/line-heightに複数のズレが見つかった。特に text-shadow は設計書に一切記載が無かったが、実際は全6ページの page-hero で共通して使われており、overlay（グラデーション）と併用してテキストの可読性を担保する重要な要素だった。
- 知見 / ルール：「共通パーツ化する/しない」の判断だけでなく、共通パーツの実装時の具体的な数値（px/em/color/text-shadow等）も、設計書の定性的な言葉を信用せず、対象になっている全ページのdrafts/existingを実際にgrepして実測値を突き合わせてから確定する。特にcommon.css行きのパーツは1箇所の誤りが複数ページに波及するため、実装直後に横断確認する一手間を省略しない。
- 適用先：common.css に新規パーツを追加する全ての実装（staff/corporate/education/clinical/contact のコーディング時、page-hero・content-wrap・cta-blockを流用する際も同様に確認する）

## common化の判断は「複数ページのdrafts/existingをgrepして実際に同じ構造か」で決める
- 状況：index実装時は「layout-systemのパターン名だから」という思い込みでcommon.cssに汎用クラスを追加し失敗した（PATTERNS.md参照）。research設計時は逆に、`grep -l "page-hero\|accent-bar\|cta-block" drafts/existing/*.html` で他ページの既存デモを横断確認し、実際に同一クラス名・同一構造で複数ページに存在することを確認してからcommon.css化を決めた。
- 知見 / ルール：「これは複数ページで使うはず」という推測ではなく、`drafts/existing/` 内の全ページを実際にgrepして同一構造が何ページに存在するか確認してから common.css 化を判断する。1ページにしか無ければページ固有CSSに留める。今回は page-hero(6ページ)・accent-bar(7ページ)・cta-block(3ページ)・content-wrap 1100px(6ページ) を確認の上でcommon化した。
- 適用先：複数ページ構成の既存HPリニューアル全般（設計フェーズで実施する）

## ヘッダー/フッターの高さは固定pxで決め打ちしない。bodyのline-heightも引き継がせない
- 状況：`.site-header{height:var(--header-height)}`と`--header-height:64px`という独自の固定値を決め打ちしていたが、デモの`.floating-nav`/`.footer`はどちらも高さ指定が無く、中身のpadding（nav-brand:12px 0、nav-item:15px 11px、footer:24px）と行間だけで自然に高さが決まる作りだった。さらに`body{line-height:1.7}`という本文用の行間がヘッダー/フッターの短いテキストにも継承され、デモ（既定の詰まった行間）より縦に間延びしていた。ユーザーから「ヘッダーフッターの高さが微妙に違う」と指摘されて発覚。
- 知見 / ルール：ヘッダー・フッターのような「中身のpaddingで高さが決まる」UIチャンクは、height を固定pxで決め打ちしない（実際の見た目と数値がズレる元）。また、本文用のline-height（読みやすさ重視で1.6〜1.8程度になりがち）をUIチャンクにそのまま継承させず、`.site-header`/`.site-footer`側でline-height（1.3程度）を明示的に引き締める。SP用ドロップダウンメニューの位置合わせも、`--header-height`のような固定値に頼らず、`position:fixed`な親に対して`position:absolute; top:100%`で追従させれば高さを知らなくても正しく配置できる。
- 適用先：固定ヘッダー・フッターを使う全ページ

## 見出しタグ(h1〜h4)を使うと、中の子要素にも既定でboldが継承される
- 状況：.section-title-ja を <h2 class="section-head"> の中に span で入れたところ、自身にfont-weight指定が無いためブラウザ既定のh2太字を継承し、デモ（太字ではない）と見た目が変わっていた。
- 知見 / ルール：見出しタグの中に複数のスタイル違いのテキストを入れる場合（英語タイトル+日本語サブタイトルなど）、太字にしたくない子要素には必ず明示的に font-weight を指定する（継承任せにしない）。デモがdivやspanなど非見出し要素で組んでいる箇所を、アクセシビリティのためにh1〜h4へ格上げする際は、フォントサイズだけでなくfont-weightの既定差にも注意する。
- 適用先：section-headパターンを使う全ページ

## 見出しフォントは要素ごとに「本当にデモで指定されているか」を確認する（一律 heading フォントにしない）
- 状況：common.css の `h1,h2,h3,h4{font-family:var(--font-heading)}` により全見出しに Inter を適用していたが、デモを再確認すると Inter を使うのは hero の大見出し（h1相当）1箇所だけで、section-head・profile名・research card titleなど他の見出しはすべて本文と同じ Noto Sans JP だった。ユーザーから「文字の大きさとかが違いそう」と指摘されて発覚。
- 知見 / ルール：デモに複数フォントがある場合、「見出しタグだから全部同じ特別フォント」と決めつけない。デモのCSSで実際にそのクラスに font-family 指定があるか、無ければ何を継承しているか（多くの場合 body の既定フォント）を一つずつ確認する。h1〜h4への一律のfont-family指定は避け、本当にフォントが違う要素だけ個別にsect側で明示指定する。
- 適用先：複数フォントを使うデザインの全ページ

## 設計書（design/page-*.md）はデモのHTMLの実際の並び順・実際の要素を1行ずつ確認して書く
- 状況：design/page-index.md 作成時、デモ（drafts/existing/index.html）のCSSクラス定義（.hero-cta等）から「あるはず」と類推してhero部にCTAボタンを設計書に書いてしまった。また、セクションの並び順（divider帯がcontentの前か後か）も確認不足で誤った順序のまま設計書化し、そのまま実装まで引き継いでしまった。
- 知見 / ルール：デモを参照する設計書は、CSSではなく実際にレンダリングされるHTML本文（<body>内の要素とその出現順）を上から1行ずつ突き合わせて書く。「このクラスがあるから使われているはず」という推測をしない。特に装飾帯（divider/bg-zone）のような繰り返し要素は、コンテンツセクションの前後どちらに置かれているかをHTMLの出現順で必ず確認する。
- 適用先：既存HPリニューアル全般（drafts/existing を参照するすべてのページ）

## header/footerはコンテンツ幅を絞らず画面幅いっぱいにする（デモが .container 相当を使っていない場合）
- 状況：common.css実装時、header/footerにも他セクションと同様「コンテンツ幅を中央に収める場合は.containerを使う」というHTMLルールを機械的に適用したが、デモのfloating-nav/footerは中央寄せコンテナを持たずpaddingのみのedge-to-edgeレイアウトだった。
- 知見 / ルール：「.containerを使う」ルールは万能ではなく、デモ側が実際に中央寄せしているか（max-widthがあるか）を確認してから適用する。ヘッダー・フッターのような画面幅いっぱいのUIには.containerを使わず、`padding-inline`のみで余白を取る。
- 適用先：ヘッダー・フッターを実装する全ページ

## layout-system のパターンはページ固有CSS側にsect-スコープで直接書く（commonに汎用クラスを増やさない）
- 状況：bleed/board/fluid/shelf/tile/rack のパターン名につられて、初回実装で `.fluid` `.shelf` `.tile` `.rack` `.board` を common.css の汎用ユーティリティクラスとして追加してしまい、「指示にない部分が増えた」とユーザーから指摘を受けた。
- 知見 / ルール：claude/skills/layout-system/patterns/*.md のクラス名はあくまで構造を考えるための「型」の例示であり、そのまま common.css に汎用クラスとして実装するものではない。実装時は `.pg-{page} .sect-{code}-{name}__list` のように意味のある名前でそのセクション専用に直接 display:flex/grid を書く（chest.md の指針 `.pg-{page} .sect-{code}-{name} .chest {}` が示す通り、パターンはsect-スコープに閉じる）。header/footer/button のような「本当に全ページで使う共通部品」だけを common.css に置く。
- 適用先：今後全ページのコーディング（research.html 等）。レイアウトで迷ったら SKILL.md の判定フローは使うが、生成するCSSクラスは毎回そのセクション用に新規に書く。

## 固定ヘッダーとhero/heroの重なり方は、index.htmlの`.hero`と内側ページの`.page-hero`で仕様が異なる（一方の結論をもう一方に適用しない）
- 状況：index実装時、`body{padding-top:var(--header-height)}`を入れてheader分コンテンツ全体を下げたところ、index.htmlの`.sect-sasaki-lab-hero`背景の手前が白背景になりデモと見た目が変わった（ユーザー指摘で発覚）。この時「ヘッダーはhero画像に重なる実装」と結論づけ、bodyへのpadding-topを撤去して解決した。ところがstaff実装時、内側ページ共通の`.page-hero`（research/staff/corporate/education/clinical/contact用）で「デモよりhero部分の高さが低い」と再度指摘を受け、実際にChrome headlessでdrafts/existing側をピクセル解析したところ、`.page-hero`はJSで`hero.style.marginTop = nav.offsetHeight + 'px'`を設定しており、**ヘッダーとは重ならず、hero自体がヘッダー分下に押し出される**仕様だと判明した（index実装時に見た`nav.offsetHeight`計測処理を「単なる高さ追従用」と誤って一般化し、`.page-hero`側にも同じ「重なる」結論を適用してしまっていた）。
- 知見 / ルール：同じ「ヘッダー＋hero」の見た目でも、index.htmlの`.hero`（bleed全面）と内側ページ共通の`.page-hero`（bleed+board、page-hero-imgをposition:absoluteで敷く構成）とではデモの実装方針が異なりうる。一方のページで確認した「ヘッダーが重なる/重ならない」という結論を、クラス名やレイアウトパターンが違う別のhero実装に安易に転用しない。`nav.offsetHeight`を測るJSがある場合、それが実際に何に使われているか（単なるリサイズ追従か、marginTop等でオフセットを作っているか）をコード上で確認してから「重なる/重ならない」を判断する。
- 適用先：固定ヘッダー＋hero画像を使う全ページ（index.htmlの`.sect-sasaki-lab-hero`はヘッダーが重なる実装のまま／research・staff等の内側ページ共通`.page-hero`は`assets/js/nav.js`の`setHeroOffset`でヘッダー分オフセットする実装に統一済み。corporate/education/clinical/contactも`.page-hero`を使うため、実装時に同じオフセット処理が既に効いていることを前提にしてよい）

## 既存画像の接頭辞が識別コードと不一致
- 状況：assets/img/ に配置済みの既存画像（idx-hero_bg1.jpg 等）が、正式な識別コード（sasaki-lab）と異なる接頭辞のまま置かれていた。
- 知見 / ルール：既存HPソースを流用する際、画像配置が識別コード確定より先行することがある。コーディング開始前に assets/img 内の命名が現在の識別コードと一致しているか必ず確認し、不一致なら {識別コード}-{section-name}_{type}{番号}.{ext} にリネームする。
- 適用先：drafts/existing を参照するリニューアル案件全般
