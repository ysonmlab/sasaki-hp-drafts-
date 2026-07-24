# 佐々木研究室HP

# ERRORLOG.md

発生したエラーと解決策を記録する。

記録形式（新しいものを上に追記）：

    ## YYYY-MM-DD {page-name}
    - 症状：
    - 原因：
    - 解決策：

## 2026-07-23 index（2回目）
- 症状：ユーザーレビューで以下5点を指摘。「ヘッダーフッターのコンテンツ幅」「ヒーロー部分の表記」「ヒーロー部分に不要なリンクボタンがある」「ヒーロー部分の下に余白があり、bg-zoneが見える部分がずれている」「researchカードの見た目」。
- 原因：
  1. header/footerに `.container`（max-width:1200px中央寄せ）を使ったが、デモは中央寄せせず画面幅いっぱいに余白のみ（edge-to-edge）だった。
  2. hero descをデザイン意図から日本語で意訳してしまい、デモの実際の英文コピーと異なっていた。
  3. design/page-index.md にCTAボタン（詳しくはこちら／お問い合わせ）の記載があったが、実際のデモ index の hero にはボタンが存在しなかった（CSSクラスのみ定義され未使用）。設計書を作る際にデモのHTMLでなくCSSクラス名から類推してしまった。
  4. **セクション順序の取り違えが根本原因**：design/page-index.md を書いた際、デモの実際の並び順（hero→accent-bar→profile→divider(bg1)→research→divider(bg2)→news→divider(bg3)→footer）を確認せず、「hero→divider→profile→divider→research→divider→news」という誤った順序で設計書を作ってしまった。結果、hero直後にdividerが来て、本来profileの後にあるべきbg-zoneがhero直後に繰り上がって見えた。
  5. researchセクション自体に背景色を設定し忘れ、profile/newsのsurfaceトーンと不揃いになっていた。
- 解決策：header/footerを.containerを使わず`padding-inline: var(--gutter)`のみに変更。heroのdescをデモの英文に修正しCTAボタンを削除。design/page-index.md ごとセクション順序を訂正。research セクションに`--color-surface`背景を追加。

## 2026-07-23 index（1回目）
- 症状：ユーザーレビューで「不要な部分が増えている」「デモに忠実でない」と指摘。固定ヘッダーの下に白い帯が出る／余白やフォントサイズがデモと違う／common.cssに使っていない変数・汎用クラスが増えていた。
- 原因：(1) body に padding-top を入れてヘッダー分オフセットしたため、hero画像に重なるはずの半透明ヘッダーの背後が白背景になった。(2) layout-system のパターン名（fluid/shelf/tile/rack/board）をそのまま common.css の汎用ユーティリティクラスとして実装し、指示にない抽象化を追加した。(3) デモのCSS値（余白・フォントサイズ・写真幅・profileのgridレイアウト・accent-bar・prof-divider等）を精査せず概算値で実装していた。
- 解決策：body の padding-top を廃止しヘッダーをhero画像に重ねる方式に修正。common.css の汎用レイアウトクラスを削除し、各セクション専用のクラスに書き直し（PATTERNS.md参照）。デモの数値を再抽出してindex.cssを全面的に合わせ、accent-bar・prof-dividerなど欠けていた装飾要素を追加。未使用トークン・未使用フォント読み込みを削除。
