# CLAUDE.md

## プロジェクト基本設定
- 詳細ルールは（標準の `.claude` ではなく）`claude/` フォルダにまとめている。
- ルート直下の `CLAUDE.md` が自動読み込みされ、`@claude/CLAUDE.md`（本ファイル）を取り込む構成。
- skill は `claude/skills/` 配下を参照すること。

## 設計思想（メンテナンス方針）

- このプロジェクトは **非エンジニアがメンテナンスする** ことを前提とする。
- **HTML + モダンCSS を中心**に構築し、できる限りCSSだけで実現する。
  - 例：アコーディオンは `<details>/<summary>`、スムーススクロールは `scroll-behavior`、
    開閉・状態変化は `:has()` / `:target` / `transition` などCSSで代替する。
- **JavaScript は最低限**に抑える。CSS・HTML標準機能で実現できる場合はJSを使わない。
  - JSを使うのは、ハンバーガーメニューの開閉やフォーム制御など、CSSで代替不可能な場合のみ。
  - JSを使う場合も、依存ライブラリを増やさず素のJS（Vanilla JS）で簡潔に書く。
- ビルド工程を必要としない静的サイト（`file://` で直接開ける）を維持する。

## ファイル配置（小規模サイト・FTP納品前提）

- HTML は **ルート直下にフラット**に置く（`index.html` / `about.html` …）。`index.html` がトップページの実体。
- CSS は `assets/css/`、JS は `assets/js/`、画像は `assets/img/`（小規模サイトのためフラット。ページ別サブフォルダは作らない）。
- CSS・画像はすべて **相対パス**で参照する（全ページ共通で `assets/...`）。
- CSS は **reset / common / ページ固有 の2層構成**（詳細 → `docs/css-architecture.md`）。
  - 共通のもの（トークン・基本タイポ・ヘッダー/フッター・使い回しパーツ）は `common.css` に集約。
  - そのページだけのものは `assets/css/{page-name}.css` に `sect-*` スコープで書く。
- 最終納品はレンタルサーバーへのFTP配置。GitHub Pages はデモ共有・確認用の補助。

## 命名規則

- **ページクラス**: `pg-{page-name}`（bodyタグ等に付与）
- **セクション**: `sect-{section-name}`
- **画像命名**: `{section-name}_{image-type}{number}.{ext}`（配置先 `assets/img/`）
  - フラット配置のため、`{section-name}` はサイト内で重複させない（例 `top-hero` / `about-hero`）。
  - 複数ページで共通利用する画像は `common_{image-type}{number}.{ext}`（例 `common_logo1.svg`）。

**画像種別:**
- pht = 写真
- bg = 背景
- pic = 図版・イラスト
- ttl = タイトル（ロゴ以外）
- txt = テキスト画像
- logo = ロゴ
- icon = アイコン

## 絶対ルール

- **レイアウト**: flex / grid ベースで構築し、レスポンシブ対応を必須とする。
- **float**: 特殊なテキストの回り込みを除き、使用禁止。
- **画像**: `loading="lazy"` を付与し、`alt` 属性を必ず記述すること。
- **CSS設計**: ページ固有CSSは `.pg-{page} .sect-*` スコープ内に閉じ、他のエリアに影響を与えないこと。共通のものは `common.css` に書く。
- **不変性**: 指示されたセクション以外のコードは、リファクタリング目的であっても勝手に変更しないこと。
- **フレームワーク**: Tailwind / Bootstrap 等の外部フレームワークは一切使用せず、Vanilla CSS（純粋なCSS）で書くこと。

## レイアウトシステム

実装の判断に迷った際は、必ず以下のドキュメントをロードして参照すること。
`claude/skills/layout-system/SKILL.md`

## 参照ドキュメント

- キット全体の使い方 → `docs/how-to-use.md`
- 新規プロジェクトの初期化手順 → `docs/project-setup.md`
- 既存ページのコード改善（レスポンシブ / 整理 / 崩れ修正・単ページ / サイト全体の両対応）→ `docs/workflow-edit.md`
- CSS 構成・読み込み順 → `docs/css-architecture.md`
- 実装でつまずきやすい横断的な落とし穴 → `docs/css-gotchas.md`
- デモ共有（GitHub Pages）の手順 → `docs/deploy-github-pages.md`
- 共同作業者むけ作業ガイド → `docs/for-collaborators.md`