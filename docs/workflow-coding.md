# workflow-coding.md

Task: `{page-name}` ページのコーディング を開始します。

---

## Task 1: Explore（探索・理解）

以下のドキュメントを読んで、実装内容を理解してください。

- `claude/CLAUDE.md`
- `design/page-{page-name}.md`（設計書）
- `drafts/` 内のデザインカンプ（PDF / JPG / PNG）・デモHTML
- `assets/img/`（本番画像）
- `claude/skills/layout-system/SKILL.md`
- `docs/layout-design-spec.md`
- `docs/css-architecture.md`
- `assets/css/common.css`（既存の共通トークン・共通パーツを把握する）
- `docs/css-gotchas.md`

重要：

- この段階ではコードを書かない
- 不明点があれば実装前に質問する
- 既存ルールを優先する

完了後、Task 2 に進む。

---

## Task 2: Plan（計画）

実装前に以下を整理してください。

- セクション名
- 使用レイアウト
- SP / PC の差異
- 使用画像
- common.css の共通パーツで賄える部分 / ページ固有で書く部分の切り分け

以下の形式で実装計画をまとめる。

    section: sect-{section-name}

    layout:
    - fluid
    - shelf

    SP:
    - 縦積み

    PC:
    - 2カラム grid

    images:
    - hero-main_pht1.jpg
    - hero-main_logo1.svg

完了後、Task 3 に進む。

---

## Task 3: Code（実装）

以下のファイルを実装する。

- `{page-name}.html`（ルート直下）
- `assets/css/{page-name}.css`（ページ固有）

共通のもの（トークン・基本タイポ・ヘッダー/フッター・使い回しパーツ）は `assets/css/common.css` に書く。
ページ単体でしか使わない装飾は `{page-name}.css` に `sect-*` スコープで書く。

---

## 共通ルール

- `CLAUDE.md` のルールを遵守する
- `SKILL.md` のレイアウト判断に従う
- `layout-design-spec.md` の記法に従う

---

## common / ページ固有 の切り分けルール

- 実装前に `assets/css/common.css` を参照し、既存の共通パーツ（ボタン・カード等）があれば再利用する
- 複数ページで使う共通要素・全ページ共通のヘッダー/フッターは `common.css` に書く
- そのページだけの装飾は `{page-name}.css` の `sect-*` スコープ内に書く

---

## CSSルール

```css
.pg-{page-name} .sect-{section-name} {

}
```

- section scope を守る
- common.css の共通パーツと詳細度で競合させない
- media query は SP → PC の順で記述する

---

## HTMLルール

```html
<section class="sect-{section-name}">
  <div class="container">

  </div>
</section>
```

- `<head>` のCSS読み込みは reset → common → ページ固有（相対パス・`docs/css-architecture.md`）
- `<body>` に `pg-{page-name}` クラスを付ける
- コンテンツ幅を中央に収める場合は common.css の `.container` を使う
- semantic HTML を使用する
- alt を必ず設定する
- section / heading hierarchy を守る
- 不要な div を増やさない

完了後、検証に進む。

---

## 検証（確認）

実装したページを表示確認する。

- ルート直下の `{page-name}.html` をブラウザで直接開く（ダブルクリック／`file://`）。
  - CSS・画像パスは相対指定（`assets/...`）のため、ローカルサーバーがなくても読み込まれる。
- SP 表示の確認は、ウィンドウ幅を狭める or DevTools のデバイスモード（Ctrl+Shift+M）。
- **ローカルサーバー・自動プレビューは任意**。環境に Node / Python が無ければ不要で、
  直接開けば十分に確認できる（使える環境なら任意で利用してよい）。
- レイアウト崩れ・固定要素・レスポンシブ切替を確認する際は `docs/css-gotchas.md` を参照する。

完了後、Task 4 に進む。

---

## Task 4: Record（記録）

以下を記録する。

- 実装内容 → `logs/CHANGELOG.md`
- エラーと解決策 → `logs/ERRORLOG.md`
- 再利用可能なレイアウトや知見 → `logs/PATTERNS.md`
- 修正理由や今後の注意点 → `logs/PATTERNS.md`

ユーザーから修正指摘を受けた場合：

- 同じミスを防ぐルールを `logs/PATTERNS.md` に記録する
- 必要なら `CLAUDE.md` 更新を提案する

最後に：

`Task: {page-name} ページのコーディング → 完了`

と報告する。